'use client';

import { useState, useEffect } from 'react';

export default function QuestionsPage() {
  const [questions, setQuestions] = useState([]); // 初期値を空配列に
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        const response = await fetch(`${backendUrl}/api/questions`);
        if (!response.ok) {
          throw new Error('データの取得に失敗しました');
        }
        const data = await response.json();
        setQuestions(data || []); // データが空の場合も [] を設定
      } catch (error) {
        console.error('質問の取得に失敗しました:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchQuestions();
  }, []);

  if (loading) {
    return <div className="text-center">読み込み中...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (questions.length === 0) {
    return <div className="text-center">質問が見つかりません。</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      <h1 className="text-3xl font-bold my-6">質問一覧</h1>
      <div className="grid grid-cols-1 gap-4 w-full max-w-3xl">
        {questions.map((question) => (
          <div
            key={question.id}
            className="p-4 bg-white border rounded shadow hover:shadow-md transition duration-200"
          >
            <h2 className="text-xl font-semibold">{question.title}</h2>
            <p className="text-sm text-gray-600">難易度: {question.difficulty}</p>
            <p className="text-sm text-gray-500 mt-2">{question.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
