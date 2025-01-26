'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // エラーメッセージの状態管理
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // エラーメッセージをリセット

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        alert('アカウント作成成功');
        router.push('/login');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'アカウント作成に失敗しました');
      }
    } catch (error) {
      console.error('ネットワークエラー:', error);
      setErrorMessage('ネットワークエラーが発生しました。もう一度お試しください。');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded shadow">
      <h1 className="text-2xl font-bold mb-5">サインアップ</h1>
      {errorMessage && (
        <p className="text-red-500 mb-4">{errorMessage}</p>
      )}
      <form onSubmit={handleSignup} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium">
            名前
          </label>
          <input
            type="text"
            id="name"
            className="w-full p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          サインアップ
        </button>
      </form>
      <p className="mt-4 text-sm text-center">
        アカウントをお持ちの方は{' '}
        <Link href="/login" className="text-blue-500 underline hover:text-blue-600">
          ログイン
        </Link>
        してください。
      </p>
    </div>
  );
}
