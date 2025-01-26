'use client';

import { useState, useEffect } from 'react';

export default function QuizPage() {
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState('');
  const [question, setQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchCollections() {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        const response = await fetch(`${backendUrl}/api/collections`);
        const data = await response.json();
        setCollections(data);
      } catch (error) {
        console.error('問題集の取得に失敗しました:', error);
        setError('問題集の取得に失敗しました');
      }
    }
    fetchCollections();
  }, []);

  const fetchQuestion = async () => {
    if (!selectedCollection) {
      setFeedback('問題集を選択してください');
      return;
    }

    setLoading(true);
    setError('');
    setFeedback('');
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await fetch(`${backendUrl}/api/collections/random?collectionId=${selectedCollection}`);
      const data = await response.json();
      if (!response.ok || !data) {
        throw new Error(data.message || '問題が見つかりませんでした');
      }
      setQuestion(data);
      setSelectedOption('');
    } catch (error) {
      console.error('クイズの取得に失敗しました:', error);
      setError(error.message || 'クイズの取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (selectedOption === '') {
      setFeedback('選択肢を選んでください');
      return;
    }
  
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await fetch(`${backendUrl}/api/questions/${question._id}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer: selectedOption }), // インデックス番号を送信
      });
  
      const result = await response.json();
      setFeedback(result.correct ? '正解です！' : '不正解です...');
    } catch (error) {
      console.error('回答の送信に失敗しました:', error);
      setFeedback('回答の送信に失敗しました');
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="max-w-3xl w-full p-6 bg-white shadow rounded mt-10">
        <h1 className="text-2xl font-bold mb-4">クイズに挑戦</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <select
          value={selectedCollection}
          onChange={(e) => setSelectedCollection(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        >
          <option value="">問題集を選択してください</option>
          {collections.map((collection,index) => (
            <option key={collection.id} value={collection.id}>
              {collection.name}
            </option>
          ))}
        </select>

        <button
          onClick={fetchQuestion}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mb-6"
        >
          問題を開始
        </button>

        {question && (
          <div>
            <h2 className="text-xl font-bold mb-2">{question.title}</h2>
            <p className="text-gray-700 mb-4">{question.content}</p>
            {/* ① sampleCode があればコードブロックとして表示 */}
              {question.sampleCode && (
                <pre className="p-3 bg-gray-100 rounded mt-2 overflow-x-auto">
                  <code>{question.sampleCode}</code>
                </pre>
              )}
            {question.options.map((option) => (
              <label key={option.number} className="block mb-2">
                <input
                  type="radio"
                  name="option"
                  value={option.number}
                  checked={selectedOption === String(option.number)}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="mr-2"
                />
                {`${option.number}. ${option.text}`}
              </label>
            ))}

            <button
              onClick={handleSubmit}
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
            >
              回答を送信
            </button>
          </div>
        )}

        {feedback && (
          <div className="mt-4">
            <p className="text-lg">
              {feedback} {/* '正解です！' or '不正解です...' */}
            </p>
            {/* 不正解の場合でも解説を表示するかどうかは要件次第 */}
            <h3 className="font-bold mt-2">正解コード:</h3>
            <pre className="p-2 bg-gray-100">
              <code>{question.answerCode}</code>
            </pre>

            <h3 className="font-bold mt-2">解説:</h3>
            <p>{question.explanation}</p>
          </div>
        )}

      </div>
    </div>
  );
}
