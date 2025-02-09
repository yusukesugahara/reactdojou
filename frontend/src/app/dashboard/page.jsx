'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const [collections, setCollections] = useState([]); 

  useEffect(() => {
    // 問題集データの取得
    const fetchCollections = async () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        const response = await fetch(`${backendUrl}/api/collections`);
        const data = await response.json();
        setCollections(data);
      } catch (error) {
        console.error('問題集の取得に失敗しました:', error);
      }
    };

    fetchCollections();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      <header className="bg-blue-500 text-white w-full py-4 text-center">
        <h1 className="text-3xl font-bold">ダッシュボード</h1>
      </header>
      <main className="w-full max-w-4xl p-5">
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
        </nav>
        <section>
          <h3 className="text-xl font-bold mb-4 mt-4">問題集一覧</h3>
          {collections.length === 0 ? (
            <p className="text-gray-700">問題集が見つかりません。</p>
          ) : (
            <ul className="space-y-3">
              {collections.map((collection) => (
                <li
                  key={collection.id}
                  className="bg-white p-4 shadow rounded flex justify-between items-center"
                >
                  <div>
                    <h4 className="text-lg font-bold">{collection.name}</h4>
                    <p className="text-gray-600">{collection.description}</p>
                  </div>
                  <Link
                    href={`/collections/${collection.id}`}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  >
                    選択
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
