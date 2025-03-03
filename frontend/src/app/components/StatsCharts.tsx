import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// ChartJSの登録
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface StatsChartsProps {
  totalStats: {
    correct: number;
    total: number;
    collections: {
      [key: string]: {
        correct: number;
        total: number;
      };
    };
  };
}

const StatsCharts: React.FC<StatsChartsProps> = ({ totalStats }) => {
  // 棒グラフデータ
  const barData = {
    labels: Object.keys(totalStats.collections),
    datasets: [
      {
        label: '正解数',
        data: Object.values(totalStats.collections).map(stats => stats.correct),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: '不正解数',
        data: Object.values(totalStats.collections).map(stats => stats.total - stats.correct),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  // 円グラフデータ
  const pieData = {
    labels: ['正解数', '不正解数'],
    datasets: [
      {
        data: [totalStats.correct, totalStats.total - totalStats.correct],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
      },
    ],
  };

  return (
    <div className="charts-container">
      <h2 className="text-lg font-bold text-white mb-4">成績チャート</h2>
      <div className="flex flex-row gap-4 justify-center">
        <div className="mb-8" style={{ width: '300px', height: '300px' }}>
          <Bar data={barData} options={{ responsive: true, maintainAspectRatio: true }} />
        </div>
        <div style={{ width: '300px', height: '300px' }}>
          <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: true }} />
        </div>
      </div>
    </div>
  );
};

export default StatsCharts; 