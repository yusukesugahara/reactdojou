import { Request, Response } from 'express';
import { EmailService } from '../services/emailService';
import User from '../models/User';
import jwt from 'jsonwebtoken';

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
    } catch (error) {
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
    } catch (error) {
      res.status(500).json({ message: 'メール送信に失敗しました' });
    }
  }
} 