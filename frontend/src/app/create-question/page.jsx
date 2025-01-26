'use client';

import { useState } from 'react';

export default function CreateQuestionPage() {
  const [formData, setFormData] = useState({
    title: '',
    difficulty: '初級',
    content: '',
    sampleCode: '',
    answerCode: '',
    explanation: '',
    options: ['', '', '', ''],
    tags: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // フォームデータの変更を処理
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 選択肢の変更を処理
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...formData.options];
    updatedOptions[index] = value;
    setFormData((prev) => ({
      ...prev,
      options: updatedOptions,
    }));
  };

  // フォーム送信
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await fetch(`${backendUrl}/api/questions/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map((tag) => tag.trim()), // カンマ区切りのタグを配列に変換
        }),
      });

      if (response.ok) {
        setMessage('問題が正常に作成されました！');
        setFormData({
          title: '',
          difficulty: '初級',
          content: '',
          sampleCode: '',
          answerCode: '',
          explanation: '',
          options: ['', '', '', ''],
          tags: '',
        });
      } else {
        const result = await response.json();
        setError(result.message || '問題作成に失敗しました');
      }
    } catch (err) {
      setError('サーバーエラーが発生しました');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded shadow">
      <h1 className="text-2xl font-bold mb-5">問題作成</h1>
      {message && <p className="text-green-500 mb-4">{message}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-2 font-medium">
            タイトル
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="difficulty" className="block mb-2 font-medium">
            難易度
          </label>
          <select
            id="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="初級">初級</option>
            <option value="中級">中級</option>
            <option value="上級">上級</option>
          </select>
        </div>
        <div>
          <label htmlFor="content" className="block mb-2 font-medium">
            問題文
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="sampleCode" className="block mb-2 font-medium">
            サンプルコード
          </label>
          <textarea
            id="sampleCode"
            name="sampleCode"
            value={formData.sampleCode}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          ></textarea>
        </div>
        <div>
          <label htmlFor="answerCode" className="block mb-2 font-medium">
            解答コード
          </label>
          <textarea
            id="answerCode"
            name="answerCode"
            value={formData.answerCode}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          ></textarea>
        </div>
        <div>
          <label htmlFor="explanation" className="block mb-2 font-medium">
            解説
          </label>
          <textarea
            id="explanation"
            name="explanation"
            value={formData.explanation}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          ></textarea>
        </div>
        <div>
          <label className="block mb-2 font-medium">選択肢</label>
          {formData.options.map((option, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                placeholder={`選択肢${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          ))}
        </div>
        <div>
          <label htmlFor="tags" className="block mb-2 font-medium">
            タグ (カンマ区切り)
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          作成
        </button>
      </form>
    </div>
  );
}
