'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // エラーメッセージの状態管理
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // エラーメッセージをリセット

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        alert('ログイン成功');
        router.push('/dashboard'); // ログイン後のリダイレクト先
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'ログインに失敗しました');
      }
    } catch (error) {
      console.error('ネットワークエラー:', error);
      setErrorMessage('ネットワークエラーが発生しました。もう一度お試しください。');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded shadow">
      <h1 className="text-2xl font-bold mb-5">ログイン</h1>
      {errorMessage && (
        <p className="text-red-500 mb-4">{errorMessage}</p>
      )}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium">
            メールアドレス
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium">
            パスワード
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          ログイン
        </button>
      </form>
      <p className="mt-4 text-sm text-center">
        アカウントをお持ちでない方は{' '}
        <Link href="/signup" className="text-blue-500 underline hover:text-blue-600">
          サインアップ
        </Link>
        してください。
      </p>
    </div>
  );
}
