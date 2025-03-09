import React, { useState } from 'react';

export default function QuestionForm() {
  const [question, setQuestion] = useState({
    title: '',
    difficulty: '中級',
    content: '',
    sampleCode: '',
    answerCode: 1,
    explanation: '',
    options: [{ number: 1, text: '' }],
    tags: ['React'],
    collectionName: 'React 中級'
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Question:', question);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...question.options];
    newOptions[index].text = value;
    setQuestion({ ...question, options: newOptions });
  };

  const addOption = () => {
    setQuestion({
      ...question,
      options: [...question.options, { number: question.options.length + 1, text: '' }]
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">質問の作成・編集</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 mb-2">
              タイトル
            </label>
            <input
              id="title"
              type="text"
              value={question.title}
              onChange={(e) => setQuestion({ ...question, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="content" className="block text-gray-700 mb-2">
              内容
            </label>
            <textarea
              id="content"
              value={question.content}
              onChange={(e) => setQuestion({ ...question, content: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="sampleCode" className="block text-gray-700 mb-2">
              サンプルコード
            </label>
            <textarea
              id="sampleCode"
              value={question.sampleCode}
              onChange={(e) => setQuestion({ ...question, sampleCode: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {question.options.map((option, index) => (
            <div key={index} className="mb-4">
              <label htmlFor={`option${index}`} className="block text-gray-700 mb-2">
                オプション {index + 1}
              </label>
              <input
                id={`option${index}`}
                type="text"
                value={option.text}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addOption}
            className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
          >
            オプションを追加
          </button>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            保存
          </button>
        </form>
      </div>
    </div>
  );
}
