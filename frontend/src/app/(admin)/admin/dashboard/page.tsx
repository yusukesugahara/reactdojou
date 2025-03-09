'use client';

import React, { useState, useEffect } from 'react';
import { Collection } from '@/app/type/collections';
import { getCollections } from './action';

export default function AdminDashboard() {
  const [collections, setCollections] = useState<Array<Collection>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const data = await getCollections();
        setCollections(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'エラーが発生しました');
      } finally {
        setLoading(false);
      }
    };
    fetchCollections();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-6">管理者ダッシュボード</h1>
        {loading && <p>読み込み中...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {collections.map((collection) => (
          <div key={collection.id} className="flex flex-col md:flex-row md:items-center">
            <div className="flex-grow">
              <h4 className="text-xl font-bold text-white mb-2">{collection.name}</h4>
              <p className="text-gray-300 mb-4">{collection.description}</p>
              <a href={`/admin/problems/${collection.id}`} className="text-blue-500 hover:text-blue-700">問題を作成</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
