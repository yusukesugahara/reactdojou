import { getLearningStats } from "@/app/results/actions";
import Header from "@/app/components/Header";

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

export default async function ResultsPage() {
  const { monthlyStats, totalStats } = await getLearningStats();

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      <Header title="成績表" />
      
      <main className="w-full max-w-4xl p-5 caret-transparent">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">学習成績</h1>

          {/* 🔹 全期間の成績 */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold">全期間の成績</h2>
            <p className="mt-2 text-lg font-medium">
              <strong>総合正答率:</strong> 
              {totalStats.total > 0 
                ? ((totalStats.correct / totalStats.total) * 100).toFixed(1) + "%"
                : "データなし"}
              ({totalStats.correct} / {totalStats.total})
            </p>

            <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">問題集名</th>
                  <th className="border p-2">正答率</th>
                  <th className="border p-2">出題数</th>
                  <th className="border p-2">正解数</th>
                  <th className="border p-2">不正解数</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(totalStats.collections).map(([collectionName, stats]) => {
                  const typedStats = stats as StatsType;
                  return (
                    <tr key={collectionName} className="text-center">
                      <td className="border p-2">{collectionName}</td>
                      <td className="border p-2">
                        {((typedStats.correct / typedStats.total) * 100).toFixed(1)}%
                      </td>
                      <td className="border p-2">{typedStats.total}</td>
                      <td className="border p-2 text-green-500">{typedStats.correct}</td>
                      <td className="border p-2 text-red-500">{typedStats.total - typedStats.correct}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* 🔹 月ごとの成績 */}
          {Object.keys(monthlyStats).length > 0 ? (
            Object.entries(monthlyStats).map(([month, data]) => {
              const typedData = data as MonthlyDataType;
              return (
                <div key={month} className="mb-8">
                  <h2 className="text-xl font-semibold">{month}</h2>

                  <p className="mt-2 text-lg font-medium">
                    <strong>総合正答率:</strong> {((typedData.correct / typedData.total) * 100).toFixed(1)}% 
                    ({typedData.correct} / {typedData.total})
                  </p>

                  <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border p-2">問題集名</th>
                        <th className="border p-2">正答率</th>
                        <th className="border p-2">出題数</th>
                        <th className="border p-2">正解数</th>
                        <th className="border p-2">不正解数</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(typedData.collections).map(([collectionName, stats]: [string, StatsType]) => (
                        <tr key={collectionName} className="text-center">
                          <td className="border p-2">{collectionName}</td>
                          <td className="border p-2">
                            {((stats.correct / stats.total) * 100).toFixed(1)}%
                          </td>
                          <td className="border p-2">{stats.total}</td>
                          <td className="border p-2 text-green-500">{stats.correct}</td>
                          <td className="border p-2 text-red-500">{stats.total - stats.correct}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })
          ) : (
            <p>学習履歴がありません。</p>
          )}
        </div>
      </main>
    </div>
  );
}
