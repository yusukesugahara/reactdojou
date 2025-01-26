import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/utils/db';

export async function POST(request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ message: 'すべてのフィールドを入力してください' }, { status: 400 });
  }

  try {
    const db = await connectToDatabase();
    const existingUser = await db.collection('users').findOne({ email });

    if (existingUser) {
      return NextResponse.json({ message: 'このメールアドレスは既に使用されています' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { email, password: hashedPassword, createdAt: new Date() };
    await db.collection('users').insertOne(newUser);

    return NextResponse.json({ message: 'アカウント作成成功' }, { status: 201 });
  } catch (error) {
    console.error('サインアップエラー:', error);
    return NextResponse.json({ message: 'サーバーエラーが発生しました' }, { status: 500 });
  }
}
