'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function QuizCollectionsPage() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  // 問題集リストを取得
  useEffect(() => {
    async function fetchCollections() {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        const response = await fetch(`${backendUrl}/api/collections`);
        if (!response.ok) {
          throw new Error('データの取得に失敗しました');
        }
        const data = await response.json();
        setCollections(data);
      } catch (error) {
        console.error('問題集の取得に失敗しました:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCollections();
  }, []);

  if (loading) {
    return <div className="text-center">読み込み中...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (collections.length === 0) {
    return <div className="text-center">問題集が見つかりません。</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      <h1 className="text-3xl font-bold my-6">問題集を選択してください</h1>
      <div className="grid grid-cols-1 gap-4 w-full max-w-lg">
        {collections.map((collection) => (
          <div
            key={collection.id || collection.id || index}
            className="p-4 bg-white border rounded shadow hover:shadow-md transition duration-200"
          >
            <h2 className="text-xl font-semibold">{collection.name}</h2>
            <p className="text-sm text-gray-600">{collection.description}</p>
            <button
              className="mt-2 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              onClick={() => router.push(`/quiz/collections/${collection.id}`)}
            >
              開始する（{collection.count}問）
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
