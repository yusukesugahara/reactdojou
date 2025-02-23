import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // ← require ではなく import で
import User from "../models/User";
import { AuthController } from '../controllers/authController';
import { EmailService } from '../services/emailService';

const router = express.Router();

// 環境変数に JWT_SECRET を定義（.env推奨）
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// パスワードバリデーション関数の追加
const isPasswordValid = (password: string): boolean => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers;
};

const authController = new AuthController();

// ----------------------------
//  サインアップ
// ----------------------------
router.post("/signup", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // 入力バリデーション
    if (!name || !email || !password) {
      res.status(400).json({ message: "すべてのフィールドを入力してください" });
      return;
    }

    // パスワード強度チェックを追加
    if (!isPasswordValid(password)) {
      res.status(400).json({ 
        message: "パスワードは8文字以上で、大文字、小文字、数字を含む必要があります" 
      });
      return;
    }
    
    // 既存ユーザーの確認
    const existingUser = await User.findOne({ email });
    
    // 既存ユーザーが未認証の場合、新しい認証トークンを発行して再送信
    if (existingUser && !existingUser.isEmailVerified) {
      const newVerificationToken = jwt.sign(
        { email },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      // トークンを更新
      existingUser.verificationToken = newVerificationToken;
      existingUser.verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
      await existingUser.save();

      // 認証メールを再送信
      const emailService = new EmailService();
      await emailService.sendVerificationEmail(email, newVerificationToken);

      res.status(200).json({ 
        message: "未認証のアカウントが存在します。認証メールを再送信しました。" 
      });
      return;
    }

    // 既存の認証済みユーザーの場合
    if (existingUser && existingUser.isEmailVerified) {
      res.status(409).json({ message: "このメールアドレスは既に登録されています" });
      return;
    }

    // パスワードのハッシュ化
    const hashedPassword = await bcrypt.hash(password, 10);

    // 認証トークンの生成
    const verificationToken = jwt.sign(
      { email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // 新しいユーザーの作成
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpires: new Date(Date.now() + 24 * 60 * 60 * 1000)
    });

    // データベースに保存
    await newUser.save();

    // 認証メールの送信
    const emailService = new EmailService();
    await emailService.sendVerificationEmail(email, verificationToken);

    res.status(201).json({ 
      message: "アカウント作成に成功しました。メールを確認してください。" 
    });
  } catch (error) {
    console.error("サインアップエラー:", error);
    res.status(500).json({ message: "サーバーエラーが発生しました" });
  }
});

// ----------------------------
//  ログイン
// ----------------------------
router.post("/login", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    // 入力バリデーション
    if (!email || !password) {
      res.status(400).json({ message: "すべてのフィールドを入力してください" });
      return;
    }

    // ユーザーをDBから検索
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "ユーザーが見つかりません" });
      return;
    }

    // パスワードを検証
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "パスワードが正しくありません" });
      return;
    }

    // JWTトークンを生成
    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    // トークンとユーザー情報のみを返す
    res.status(200).json({
      message: "ログイン成功",
      token: token,
      userId: user._id.toString(),
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error("ログインエラー:", error);
    res.status(500).json({ message: "サーバーエラーが発生しました" });
  }
});


// ----------------------------
//  ログイン状態チェック (任意)
// ----------------------------
router.get("/check", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.cookies.authToken;
  if (!token) {
    res.status(401).json({ message: "トークンがありません" });
    return;
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string };
    res.json({ message: "ログイン中", user: decoded });
    return;
  } catch (err) {
    res.status(401).json({ message: "トークンが無効です" });
  }
});

// メール認証エンドポイントの型定義を追加
router.post('/verify-email', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await authController.verifyEmail(req, res);
  } catch (error) {
    console.error("メール認証エラー:", error);
    res.status(500).json({ message: "メール認証中にエラーが発生しました" });
  }
});

router.post('/resend-verification', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await authController.resendVerification(req, res);
  } catch (error) {
    console.error("認証メール再送信エラー:", error);
    res.status(500).json({ message: "認証メールの再送信中にエラーが発生しました" });
  }
});

export default router; 
