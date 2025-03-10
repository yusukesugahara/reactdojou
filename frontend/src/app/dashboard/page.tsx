"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Collection } from "@/app/type/collections";
import { checkAuth, getCollections } from "@/app/dashboard/actions";
import Link from "next/link";
import Header from "@/app/components/Header";
import { motion } from "framer-motion";
import { FaBook, FaArrowRight, FaCheckCircle, FaSpinner, FaExclamationTriangle } from "react-icons/fa";

export async function getServerSideProps() {
  try {
    await checkAuth();
    const data = await getCollections();
    return {
      props: {
        initialCollections: data,
        initialError: null,
      },
    };
  } catch (error) {
    console.error("エラー:", error);
    return {
      props: {
        initialCollections: [],
        initialError: error instanceof Error ? error.message : "認証エラーが発生しました",
      },
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
}

export default function DashboardPage({ initialCollections, initialError }: { initialCollections: Collection[], initialError: string | null }) {
  const [collections, setCollections] = useState<Array<Collection>>(initialCollections);
  const [error, setError] = useState<string | null>(initialError);
  const [loading, setLoading] = useState(false);
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, rotate: 360 }}
          transition={{ 
            duration: 0.8, 
            ease: "easeInOut",
            rotate: { repeat: Infinity, duration: 1.5, ease: "linear" }
          }}
          className="text-white text-6xl"
        >
          <FaSpinner />
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white bg-opacity-10 backdrop-blur-lg text-white border border-red-300 border-opacity-30 px-6 py-5 rounded-xl shadow-lg max-w-md"
        >
          <div className="flex items-center text-red-300 mb-3">
            <FaExclamationTriangle className="mr-2 text-xl" />
            <h3 className="text-xl font-semibold">エラーが発生しました</h3>
          </div>
          <p>{error}</p>
        </motion.div>
      </div>
    );
  }

  // アニメーションのバリアント
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <Header title="ダッシュボード" />
      
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto max-w-4xl p-5 pt-20"
      >
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white border-opacity-20 p-8"
        >
          <div className="flex items-center mb-6">
            <FaBook className="text-white text-2xl mr-3" />
            <h3 className="text-2xl font-bold text-white">問題集一覧</h3>
          </div>
          
          {collections.length === 0 ? (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-200 p-4 bg-white bg-opacity-5 rounded-xl"
            >
              問題集が見つかりません。
            </motion.p>
          ) : (
            <motion.ul 
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-4"
            >
              {collections.map((collection) => (
                <motion.li
                  key={collection.id}
                  variants={item}
                  className="bg-white bg-opacity-5 backdrop-blur-sm p-5 shadow-lg rounded-xl border border-white border-opacity-10 hover:bg-opacity-10 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-center">
                    <div className="flex-grow">
                      <h4 className="text-xl font-bold text-white mb-2">{collection.name}</h4>
                      <p className="text-gray-300 mb-4">{collection.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center text-gray-200">
                          <FaCheckCircle className="mr-2 text-green-400" />
                          <span>完了回数: {collection.timesCompleted || 0}回</span>
                        </div>
                        <div className="flex items-center text-gray-200">
                          <span className="mr-2">🔢</span>
                          <span>現在の問題: {collection.currentIndex || 1}問目</span>
                        </div>
                      </div>
                      
                      <div className="mb-2">
                        <div className="flex items-center">
                          <div className="flex-grow bg-gray-700 bg-opacity-50 rounded-full h-3 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ 
                                width: `${(((collection.currentIndex ?? 1) - 1) / (collection.totalQuestions || 50)) * 100}%` 
                              }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                              className="bg-gradient-to-r from-blue-400 to-indigo-500 h-3 rounded-full"
                            />
                          </div>
                          <span className="ml-3 text-gray-200 font-medium">
                            {((collection.currentIndex ?? 1) - 1)}/{collection.totalQuestions || 50}問
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <motion.div 
                      className="mt-4 md:mt-0 md:ml-4"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        href={`/collections/${collection.id}`}
                        className="block bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-xl font-medium shadow-lg hover:shadow-xl transition duration-300 ease-in-out flex items-center justify-center"
                      >
                        選択 <FaArrowRight className="ml-2" />
                      </Link>
                    </motion.div>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </motion.section>
      </motion.main>
    </div>
  );
}
