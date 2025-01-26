'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function QuizPage({ params }) {
  const [question, setQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const { id } = params; // 問題集ID

  // 問題を取得
  useEffect(() => {
    async function fetchQuestion() {
      setLoading(true);
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        const response = await fetch(`${backendUrl}/api/questions/random?collectionId=${id}`);
        const data = await response.json();
        setQuestion(data);
      } catch (error) {
        console.error('クイズの取得に失敗しました:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchQuestion();
  }, [id]);

  // 回答送信
  const handleSubmit = async () => {
    if (!selectedOption) {
      setFeedback('選択肢を選んでください');
      return;
    }

    try {
      const response = await fetch(`/api/questions/${question.id}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer: selectedOption }),
      });

      const result = await response.json();
      if (response.ok) {
        setFeedback(result.correct ? '正解です！' : '不正解です...');
      } else {
        setFeedback(result.message || 'エラーが発生しました');
      }
    } catch (error) {
      setFeedback('回答の送信に失敗しました');
    }
  };

  if (loading) {
    return <div className="text-center">読み込み中...</div>;
  }

  if (!question) {
    return <div className="text-center">問題がありません</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="max-w-2xl p-5 bg-white shadow rounded">
        <h1 className="text-2xl font-bold mb-4">{question.title}</h1>
        <p className="text-gray-700 mb-4">難易度: {question.difficulty}</p>
        <div className="mb-4">
          <p>{question.content}</p>
          {question.sampleCode && (
            <pre className="p-3 bg-gray-100 rounded mt-2 overflow-x-auto">
              <code>{question.sampleCode}</code>
            </pre>
          )}
        </div>
        <div className="space-y-2 mb-4">
          {question.options.map((option, index) => (
            <label key={index} className="block">
              <input
                type="radio"
                name="option"
                value={option}
                checked={selectedOption === option}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          回答を送信
        </button>
        {feedback && <p className="mt-4 text-center">{feedback}</p>}
      </div>
      <button
        onClick={() => router.refresh()} // 次の問題をロード
        className="mt-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
      >
        次の問題
      </button>
    </div>
  );
}
