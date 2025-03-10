"use client"; // クライアントコンポーネントとして宣言

import { useState, useEffect } from "react";
import Header from "@/app/components/Header";
import { FaChartBar, FaCalendarAlt, FaTrophy, FaBookOpen } from "react-icons/fa";
import dynamic from "next/dynamic";
import { getLearningStats } from "@/app/results/actions";


// チャートコンポーネントを動的インポート（クライアント側でのみ実行）
const StatsCharts = dynamic(() => import('@/app/components/StatsCharts'), { 
  ssr: false,
  loading: () => <div className="h-64 w-full bg-white bg-opacity-5 rounded-xl flex items-center justify-center text-white">チャート読み込み中...</div>
});

interface StatsType {
  correct: number;
  total: number;
}

interface MonthlyDataType {
  correct: number;
  total: number;
  collections: {
    [key: string]: StatsType;
  };
}

interface StatsData {
  monthlyStats: {
    [key: string]: MonthlyDataType;
  };
  totalStats: {
    correct: number;
    total: number;
    collections: {
      [key: string]: StatsType;
    };
  };
}

export default function ResultsPage() {
  const [statsData, setStatsData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getLearningStats();
        setStatsData(data);
      } catch (error) {
        console.error("統計データの取得に失敗:", error);
      } finally {
        setLoading(false); // ローディング状態を更新
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!statsData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        <div className="bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-xl text-white">
          データの読み込みに失敗しました。再度お試しください。
        </div>
      </div>
    );
  }

  const { monthlyStats = {}, totalStats = { correct: 0, total: 0, collections: {} } } = statsData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <Header title="成績表" />
      
      <main className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white border-opacity-20 p-8">
            <div className="flex items-center mb-8">
              <FaTrophy className="text-yellow-300 text-3xl mr-4" />
              <h1 className="text-3xl font-bold text-white">学習成績</h1>
            </div>

            {/* 全期間の成績 - カード形式 */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <FaChartBar className="text-white text-xl mr-3" />
                <h2 className="text-2xl font-semibold text-white">全期間の成績</h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* 総合正答率カード */}
                <div className="bg-white bg-opacity-5 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-10 shadow-lg">
                  <h3 className="text-lg font-medium text-gray-200 mb-3">総合正答率</h3>
                  <div className="flex items-center justify-between">
                    <div className="text-4xl font-bold text-white">
                      {totalStats.total > 0 
                        ? ((totalStats.correct / totalStats.total) * 100).toFixed(1) + "%"
                        : "データなし"}
                    </div>
                    <div className="text-gray-300">
                      {totalStats.correct} / {totalStats.total}
                    </div>
                  </div>
                  
                  {/* 進捗バー */}
                  {totalStats.total > 0 && (
                    <div className="mt-4">
                      <div className="w-full bg-gray-700 bg-opacity-40 h-3 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"
                          style={{ width: `${(totalStats.correct / totalStats.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                {/* 解答数カード */}
                <div className="bg-white bg-opacity-5 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-10 shadow-lg">
                  <h3 className="text-lg font-medium text-gray-200 mb-3">解答数</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-500 bg-opacity-20 rounded-xl p-4 border border-green-500 border-opacity-20">
                      <div className="text-sm text-gray-300 mb-1">正解</div>
                      <div className="text-3xl font-bold text-green-400">{totalStats.correct}</div>
                    </div>
                    <div className="bg-red-500 bg-opacity-20 rounded-xl p-4 border border-red-500 border-opacity-20">
                      <div className="text-sm text-gray-300 mb-1">不正解</div>
                      <div className="text-3xl font-bold text-red-400">{totalStats.total - totalStats.correct}</div>
                    </div>
                  </div>
                </div>
                
                {/* 問題集数カード */}
                <div className="bg-white bg-opacity-5 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-10 shadow-lg">
                  <h3 className="text-lg font-medium text-gray-200 mb-3">問題集</h3>
                  <div className="flex items-center">
                    <FaBookOpen className="text-blue-300 text-4xl mr-4" />
                    <div className="text-3xl font-bold text-white">{Object.keys(totalStats.collections).length}</div>
                  </div>
                  <div className="mt-2 text-gray-300">取り組んだ問題集の数</div>
                </div>
              </div>

              {/* チャート部分（クライアント側のみ） */}
              {totalStats.total > 0 && (
                <div className="mb-8">
                  <StatsCharts totalStats={totalStats} />
                </div>
              )}
              
              {/* テーブル部分 */}
              <div className="overflow-hidden rounded-xl">
                <table className="min-w-full">
                  <thead className="bg-black bg-opacity-30">
                    <tr>
                      <th className="px-4 py-3 text-left text-gray-200 font-medium">問題集名</th>
                      <th className="px-4 py-3 text-gray-200 font-medium">正答率</th>
                      <th className="px-4 py-3 text-gray-200 font-medium">出題数</th>
                      <th className="px-4 py-3 text-gray-200 font-medium">正解数</th>
                      <th className="px-4 py-3 text-gray-200 font-medium">不正解数</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700 divide-opacity-30">
                    {Object.entries(totalStats.collections).map(([collectionName, stats]) => {
                      const typedStats = stats as StatsType;
                      const percentage = typedStats.total > 0 
                        ? (typedStats.correct / typedStats.total) * 100 
                        : 0;
                      return (
                        <tr key={collectionName} className="bg-white bg-opacity-5">
                          <td className="px-4 py-3 text-gray-200">{collectionName}</td>
                          <td className="px-4 py-3 text-center">
                            <div className="inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium"
                              style={{
                                backgroundColor: `rgba(${percentage >= 70 ? '34, 197, 94' : percentage >= 40 ? '234, 179, 8' : '239, 68, 68'}, 0.2)`,
                                color: `rgb(${percentage >= 70 ? '34, 197, 94' : percentage >= 40 ? '234, 179, 8' : '239, 68, 68'})`
                              }}
                            >
                              {percentage.toFixed(1)}%
                            </div>
                          </td>
                          <td className="px-4 py-3 text-center text-gray-200">{typedStats.total}</td>
                          <td className="px-4 py-3 text-center text-green-400">{typedStats.correct}</td>
                          <td className="px-4 py-3 text-center text-red-400">{typedStats.total - typedStats.correct}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 月ごとの成績 */}
            {Object.keys(monthlyStats).length > 0 ? (
              <div>
                <div className="flex items-center mb-6">
                  <FaCalendarAlt className="text-white text-xl mr-3" />
                  <h2 className="text-2xl font-semibold text-white">月ごとの成績</h2>
                </div>
                
                <div className="space-y-8">
                  {Object.entries(monthlyStats).map(([month, data]) => {
                    const typedData = data as MonthlyDataType;
                    return (
                      <div key={month} className="bg-white bg-opacity-5 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-10 shadow-lg">
                        <h2 className="text-xl font-semibold text-white mb-4">{month}</h2>

                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
                          <div className="bg-black bg-opacity-20 rounded-xl p-5 md:w-64">
                            <h3 className="text-lg font-medium text-gray-200 mb-3">総合正答率</h3>
                            <div className="text-3xl font-bold text-white mb-1">
                              {typedData.total > 0 
                                ? ((typedData.correct / typedData.total) * 100).toFixed(1) + "%" 
                                : "0%"}
                            </div>
                            <div className="text-gray-300 text-sm">
                              ({typedData.correct} / {typedData.total})
                            </div>
                            
                            {/* 進捗バー */}
                            {typedData.total > 0 && (
                              <div className="mt-4">
                                <div className="w-full bg-gray-700 bg-opacity-40 h-2 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"
                                    style={{ width: `${(typedData.correct / typedData.total) * 100}%` }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex-grow">
                            <table className="min-w-full rounded-xl overflow-hidden">
                              <thead className="bg-black bg-opacity-30">
                                <tr>
                                  <th className="px-4 py-3 text-left text-gray-200 font-medium">問題集名</th>
                                  <th className="px-4 py-3 text-gray-200 font-medium">正答率</th>
                                  <th className="px-4 py-3 text-gray-200 font-medium">出題数</th>
                                  <th className="px-4 py-3 text-gray-200 font-medium">正解数</th>
                                  <th className="px-4 py-3 text-gray-200 font-medium">不正解数</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-700 divide-opacity-30">
                                {Object.entries(typedData.collections).map(([collectionName, stats]: [string, StatsType]) => {
                                  const percentage = stats.total > 0 
                                    ? (stats.correct / stats.total) * 100 
                                    : 0;
                                  return (
                                    <tr key={collectionName} className="bg-white bg-opacity-5">
                                      <td className="px-4 py-3 text-gray-200">{collectionName}</td>
                                      <td className="px-4 py-3 text-center">
                                        <div className="inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium"
                                          style={{
                                            backgroundColor: `rgba(${percentage >= 70 ? '34, 197, 94' : percentage >= 40 ? '234, 179, 8' : '239, 68, 68'}, 0.2)`,
                                            color: `rgb(${percentage >= 70 ? '34, 197, 94' : percentage >= 40 ? '234, 179, 8' : '239, 68, 68'})`
                                          }}
                                        >
                                          {percentage.toFixed(1)}%
                                        </div>
                                      </td>
                                      <td className="px-4 py-3 text-center text-gray-200">{stats.total}</td>
                                      <td className="px-4 py-3 text-center text-green-400">{stats.correct}</td>
                                      <td className="px-4 py-3 text-center text-red-400">{stats.total - stats.correct}</td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="bg-white bg-opacity-5 backdrop-blur-sm rounded-2xl p-8 text-center border border-white border-opacity-10 shadow-lg">
                <p className="text-gray-200 text-lg">月次の学習履歴がありません。</p>
                <p className="text-gray-300 mt-2">問題を解いて学習を始めましょう！</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
