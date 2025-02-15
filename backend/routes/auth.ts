import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // ← require ではなく import で
import User from "../models/User";

const router = express.Router();

// 環境変数に JWT_SECRET を定義（.env推奨）
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

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

    // 既存ユーザーの確認
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({ message: "このメールアドレスは既に登録されています" });
      return;
    }

    // パスワードのハッシュ化
    const hashedPassword = await bcrypt.hash(password, 10);

    // 新しいユーザーの作成
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // データベースに保存
    await newUser.save();

    res.status(201).json({ message: "アカウント作成に成功しました" });
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
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h", // トークンの有効期限 1時間
    });

    // トークンをHTTPOnly Cookieに保存
    // ※Cookie名 "authToken" は任意
    res.cookie("authToken", token, {
      httpOnly: true, // JavaScriptからのアクセスを禁止
      // secure: process.env.NODE_ENV === "production", // HTTPS環境でのみ送信
      maxAge: 3600 * 1000, // 1時間 (ミリ秒)
      sameSite: "lax", 
    });
        
    // **ユーザーIDを別のクッキーに保存**
    res.cookie("userId", user._id.toString(), {
      httpOnly: true, // JavaScriptからのアクセスを禁止
      // secure: process.env.NODE_ENV === "production",
      maxAge: 3600 * 1000, // 1時間 (ミリ秒)
      sameSite: "lax",
    });

    res.status(200).json({ message: "ログイン成功" });
  } catch (error) {
    console.error("ログインエラー:", error);
    res.status(500).json({ message: "サーバーエラーが発生しました" });
  }
});

// ----------------------------
//  ログアウト
// ----------------------------
router.post("/logout", (req: Request, res: Response) => {
  // Cookieを削除
  res.clearCookie("authToken");
  res.status(200).json({ message: "ログアウト成功" });
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
    const decoded = jwt.verify(token, JWT_SECRET);
    // decoded には { id, email, iat, exp } などが含まれる
    res.json({ message: "ログイン中", user: decoded });
  } catch (err) {
    res.status(401).json({ message: "トークンが無効です" });
  }
});

// 例: routes/auth.ts
router.get('/check', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.cookies.authToken;
  if (!token) {
    res.status(401).json({ message: 'Not logged in' });
    return;
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string };
    res.json({ user: { id: decoded.id, email: decoded.email } });
    return;
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
    return;
  }
});


module.exports = router;
