'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Reactどじょう</h1>
        <p className="text-lg text-gray-600">
          ReactやJavaScriptに関するクイズでスキルを試しましょう！
        </p>
      </header>

      <main className="w-full max-w-md p-5 bg-white shadow rounded">
        <nav className="flex flex-col space-y-4">
          <Link
            href="/signup"
            className="w-full bg-blue-500 text-white py-2 text-center rounded hover:bg-blue-600"
          >
            サインアップ
          </Link>
          <Link
            href="/login"
            className="w-full bg-green-500 text-white py-2 text-center rounded hover:bg-green-600"
          >
            ログイン
          </Link>
        </nav>
      </main>
    </div>
  );
}
