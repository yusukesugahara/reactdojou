'use client';

import { useState } from 'react';

export default function UploadCSVPage() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // 認証状態

  // パスワードチェック
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_UPLOAD_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('パスワードが正しくありません');
    }
  };

  // ファイル変更時の処理
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
    setError('');
  };

  // ファイルアップロード処理
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setError('ファイルを選択してください');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

      const response = await fetch(`${backendUrl}/api/questions/upload-csv`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMessage('CSVのアップロードに成功しました！');
        setFile(null); // アップロード成功後、ファイル選択をリセット
      } else {
        const result = await response.json();
        setError(result.message || 'アップロードに失敗しました');
      }
    } catch (err) {
      setError('サーバーエラーが発生しました');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded shadow">
      {!isAuthenticated ? (
        // パスワード認証フォーム
        <div>
          <h1 className="text-2xl font-bold mb-5">パスワード認証</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handlePasswordSubmit}>
            <input
              type="password"
              placeholder="パスワードを入力"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              認証
            </button>
          </form>
        </div>
      ) : (
        // CSVアップロードフォーム
        <div>
          <h1 className="text-2xl font-bold mb-5">CSVアップロード</h1>
          {message && <p className="text-green-500 mb-4">{message}</p>}
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleUpload}>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="mb-4"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              アップロード
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
