'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 仮のユーザーデータ
    setUser({ name: '山田 太郎' });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      <header className="bg-blue-500 text-white w-full py-4 text-center">
        <h1 className="text-3xl font-bold">ダッシュボード</h1>
      </header>
      <main className="w-full max-w-4xl p-5">
        <h2 className="text-2xl font-bold mb-4">
          ようこそ、{user?.name || 'ユーザー'} さん！
        </h2>
        <nav className="space-y-4">
          <Link
            href="/quiz"
            className="block bg-yellow-500 text-white py-3 text-center rounded hover:bg-yellow-600"
          >
            クイズを始める
          </Link>
          <Link
            href="/profile"
            className="block bg-green-500 text-white py-3 text-center rounded hover:bg-green-600"
          >
            プロフィールを編集
          </Link>
          <Link
            href="/quiz/create"
            className="block bg-red-500 text-white py-3 text-center rounded hover:bg-red-600"
          >
            クイズを作成する
          </Link>
        </nav>
      </main>
    </div>
  );
}
