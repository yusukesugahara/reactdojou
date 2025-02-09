"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Collection } from "@/app/type/collections";

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchCollections() {
      setLoading(true);
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        const response = await fetch(
          `${backendUrl}/api/collections/`
        );
        if (!response.ok) {
          throw new Error("問題集の取得に失敗しました");
        }
        const data = await response.json();
        setCollections(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCollections();
  }, []);


  if (loading) {
    return <p className="text-center mt-10">読み込み中...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-5">
      <h1 className="text-3xl font-bold mb-6">問題集一覧</h1>
      {collections.length === 0 ? (
        <p>問題集が見つかりません。</p>
      ) : (
        <ul className="space-y-4" >
          {collections.map((collection) => (
            <Link href={`/collections/${collection.id}`}>
              <li key={collection.id} className="p-4 border rounded shadow">
                <h2 className="text-2xl font-semibold">
                  
                    {collection.name}
                  
                </h2>
                <p className="mt-2 text-gray-600">{collection.description}</p>
                {collection.questionCount !== undefined && (
                  <p className="mt-2 text-sm text-gray-500">
                    {collection.questionCount} 問
                  </p>
                )}
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}
