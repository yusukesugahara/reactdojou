import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/utils/db';

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'すべてのフィールドを入力してください' }, { status: 400 });
    }

    // データベース接続
    const db = await connectToDatabase();

    // ユーザー情報を取得
    const user = await db.collection('users').findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'ユーザーが見つかりません' }, { status: 404 });
    }

    // パスワードの照合
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'パスワードが正しくありません' }, { status: 401 });
    }

    // JWT トークンの生成
    const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, {
      expiresIn: '1h',
    });

    // トークンをクッキーに設定
    const response = NextResponse.json({ message: 'ログイン成功' });
    response.cookies.set('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600,
    });

    return response;
  } catch (error) {
    console.error('ログインエラー:', error);
    return NextResponse.json({ message: 'サーバーエラーが発生しました' }, { status: 500 });
  }
}
