"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Collection } from "@/app/type/collections";
import { checkAuth, getCollections } from "@/app/dashboard/actions";
import Link from "next/link";
import Header from "@/app/components/Header";

export default function DashboardPage() {
  const [collections, setCollections] = useState<Array<Collection>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        await checkAuth();
        const data = await getCollections();
        setCollections(data);
        setError(null);
      } catch (error) {
        console.error("エラー:", error);
        setError(error instanceof Error ? error.message : "認証エラーが発生しました");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      <Header title="ダッシュボード" />
      <main className="w-full max-w-4xl p-5 caret-transparent">
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
                  <div className="flex-grow">
                    <h4 className="text-lg font-bold">{collection.name}</h4>
                    <p className="text-gray-600">{collection.description}</p>
                    <div className="mt-2 text-sm">
                      <p className="text-gray-500">
                        完了回数: {collection.timesCompleted || 0}回
                      </p>
                      <p className="text-gray-500 mb-1">
                        現在の問題: {collection.currentIndex || 1}問目
                      </p>
                      <div className="mt-1">
                        <div className="flex items-center">
                          <div className="flex-grow bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{
                                width: `${(((collection.currentIndex ?? 1) - 1) / (collection.totalQuestions || 100)) * 100}%`
                              }}
                            />
                          </div>
                          <span className="ml-2 text-gray-500">
                            {((collection.currentIndex ?? 1) - 1)}/{collection.totalQuestions || 100}問
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Link
                    href={`/collections/${collection.id}`}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ml-4"
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
