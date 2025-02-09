"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User = require('../models/User');
const router = express_1.default.Router();
// サインアップエンドポイント
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    const bodyText = await Request.text(); // リクエストボディをテキスト形式で確認
    console.log('リクエストボディ:', bodyText);
    // 入力バリデーション
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'すべてのフィールドを入力してください' });
    }
    try {
        // 既存ユーザーの確認
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'このメールアドレスは既に登録されています' });
        }
        // パスワードのハッシュ化
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        // 新しいユーザーの作成
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });
        // データベースに保存
        await newUser.save();
        res.status(201).json({ message: 'アカウント作成に成功しました' });
    }
    catch (error) {
        console.error('サインアップエラー:', error);
        res.status(500).json({ message: 'サーバーエラーが発生しました' });
    }
});
const jwt = require('jsonwebtoken');
// JWT秘密鍵（環境変数に格納するのが推奨）
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
// ログインエンドポイント
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    // 入力バリデーション
    if (!email || !password) {
        return res.status(400).json({ message: 'すべてのフィールドを入力してください' });
    }
    try {
        // ユーザーをデータベースから検索
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'ユーザーが見つかりません' });
        }
        // パスワードを検証
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'パスワードが正しくありません' });
        }
        // JWTトークンを生成
        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
            expiresIn: '1h', // トークンの有効期限
        });
        // クライアントにトークンをクッキーとして返す
        res.cookie('authToken', token, {
            httpOnly: true, // JavaScriptからのアクセスを禁止
            secure: process.env.NODE_ENV === 'production', // 本番環境ではセキュア属性を有効
            maxAge: 3600 * 1000, // 1時間
        });
        res.status(200).json({ message: 'ログイン成功' });
    }
    catch (error) {
        console.error('ログインエラー:', error);
        res.status(500).json({ message: 'サーバーエラーが発生しました' });
    }
});
router.post('/logout', (req, res) => {
    res.clearCookie('authToken');
    res.status(200).json({ message: 'ログアウト成功' });
});
module.exports = router;
