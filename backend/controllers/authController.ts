import { Request, Response } from 'express';
import { EmailService } from '../services/emailService';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export class AuthController {
  private emailService: EmailService;

  constructor() {
    this.emailService = new EmailService();
  }

  async verifyEmail(req: Request, res: Response) {
    try {
      const { token } = req.body;

      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { email: string };
      const user = await User.findOne({ email: decoded.email });
      if (!user) {
        return res.status(404).json({ message: 'ユーザーが見つかりません' });
      }

      user.isEmailVerified = true;
      await user.save();
      
      res.json({ message: 'メール認証が完了しました' });
    } catch {
      res.status(400).json({ message: '無効なトークンです' });
    }
  }

  async resendVerification(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: 'ユーザーが見つかりません' });
      }

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET as string,
        { expiresIn: '24h' }
      );

      await this.emailService.sendVerificationEmail(email, token);
      res.json({ message: '認証メールを再送信しました' });
    } catch {
      res.status(500).json({ message: 'メール送信に失敗しました' });
    }
  }

  async requestPasswordReset(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: 'ユーザーが見つかりません' });
      }

      const token = jwt.sign(
        { userId: user._id, email },
        process.env.JWT_SECRET as string,
        { expiresIn: '24h' }
      );

      // パスワードリセットトークンを保存
      user.resetPasswordToken = token;
      user.resetPasswordExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
      await user.save();

      await this.emailService.sendPasswordResetEmail(email, token);
      res.json({ message: 'パスワードリセットメールを送信しました' });
    } catch {
      res.status(500).json({ message: 'パスワードリセットメールの送信に失敗しました' });
    }
  }

  async resetPassword(req: Request, res: Response) {
    try {
      const { token, newPassword } = req.body;

      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { email: string };
      const user = await User.findOne({
        email: decoded.email,
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
      });

      if (!user) {
        return res.status(400).json({ message: '無効なトークンまたは期限切れです' });
      }

      // 新しいパスワードをハッシュ化
      user.password = await bcrypt.hash(newPassword, 10);
      user.resetPasswordToken = undefined; // トークンをクリア
      user.resetPasswordExpires = undefined; // 有効期限をクリア
      await user.save();

      res.json({ message: 'パスワードが正常にリセットされました' });
    } catch {
      res.status(400).json({ message: '無効なトークンです' });
    }
  }
} 