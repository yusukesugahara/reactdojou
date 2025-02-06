// src/app/quiz/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// props の型定義
interface QuizPageProps {
  params: {
    collectionId: string;
  };
}

// 問題の各選択肢の型定義
interface Option {
  number: number;
  text: string;
}

// 問題の型定義
interface Question {
  _id: string;
  collectionName?: string;
  totalQuestions?: number;
  currentIndex?: number;
  title: string;
  content: string;
  sampleCode?: string;
  explanation?: string;
  options: Option[];
}

export default function QuizPage({ params }: QuizPageProps) {
  const { collectionId } = params;
  const router = useRouter();

  // 各種ステート定義
  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  // 問題取得関数
  const fetchQuestion = async () => {
    setLoading(true);
    setError("");
    setFeedback("");
    setSelectedOption("");
    setIsAnswered(false);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await fetch(
        `${backendUrl}/api/questions/random?collectionId=${collectionId}`
      );
      const data = await response.json();
      if (!response.ok || !data) {
        throw new Error(data.message || "問題が見つかりませんでした");
      }
      setQuestion(data as Question);
    } catch (err: any) {
      console.error("クイズの取得に失敗しました:", err);
      setError(err.message || "クイズの取得に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  // 初回または collectionId 変更時に問題取得
  useEffect(() => {
    if (collectionId) {
      fetchQuestion();
    }
  }, [collectionId]);

  // 回答送信
  const handleSubmit = async () => {
    if (!selectedOption) {
      setFeedback("選択肢を選んでください");
      return;
    }

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      if (!question) {
        throw new Error("問題が未設定です");
      }
      const response = await fetch(
        `${backendUrl}/api/questions/${question._id}/submit`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answer: selectedOption }),
        }
      );
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "回答送信エラー");
      }
      const isCorrect: boolean = result.correct;
      const correctNumber: number = result.correctNumber;

      // 正解の選択肢を番号で検索
      const correctOption = question.options.find(
        (opt) => opt.number === correctNumber
      );

      if (!correctOption) {
        setFeedback(isCorrect ? "正解です！" : "不正解です...");
      } else {
        if (isCorrect) {
          setFeedback(
            `正解です！ 正解は「${correctOption.number}番：${correctOption.text}」です。`
          );
        } else {
          setFeedback(
            `不正解です... 正解は「${correctOption.number}番：${correctOption.text}」です。`
          );
        }
      }
      setIsAnswered(true);
    } catch (error: any) {
      console.error("回答の送信に失敗しました:", error);
      setFeedback("回答の送信に失敗しました");
    }
  };

  // 次の問題へ
  const handleNextQuestion = () => {
    fetchQuestion();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p>読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      <div className="max-w-2xl w-full p-6 bg-white shadow rounded mt-10">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {question ? (
          <>
            {/* 問題集タイトルや問題番号の表示 */}
            <div className="mb-4 text-gray-700">
              <span className="font-bold mr-2">
                {question.collectionName || "問題集"}
              </span>
              {question.totalQuestions
                ? ` (${question.totalQuestions}問中${question.currentIndex || 1}問目)`
                : ""}
            </div>

            <h1 className="text-2xl font-bold mb-4">クイズに挑戦</h1>
            <h2 className="text-xl font-bold mb-2">{question.title}</h2>
            <p className="text-gray-700 mb-4">{question.content}</p>

            {question.sampleCode && (
              <pre className="p-3 bg-gray-100 rounded overflow-x-auto mb-4">
                <code>{question.sampleCode}</code>
              </pre>
            )}

            <div className="space-y-2 mb-4">
              {question.options.map((option) => (
                <label key={option.number} className="block">
                  <input
                    type="radio"
                    name="option"
                    value={option.number.toString()}
                    checked={parseInt(selectedOption, 10) === option.number}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="mr-2"
                    disabled={isAnswered}
                  />
                  {option.number}. {option.text}
                </label>
              ))}
            </div>

            <button
              onClick={handleSubmit}
              className={`w-full py-2 rounded ${
                isAnswered
                  ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                  : "bg-green-500 text-white hover:bg-green-600"
              }`}
              disabled={isAnswered}
            >
              {isAnswered ? "回答済み" : "回答を送信"}
            </button>

            {feedback && <p className="mt-4 text-center">{feedback}</p>}

            {/* 解説表示：回答後に必ず表示 */}
            {isAnswered && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded">
                <h3 className="font-bold mb-2">解説</h3>
                <p>{question.explanation || "解説がありません"}</p>
              </div>
            )}

            {/* 次の問題へボタン */}
            {isAnswered && (
              <button
                onClick={handleNextQuestion}
                className="w-full mt-6 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                次の問題へ
              </button>
            )}
          </>
        ) : (
          <p className="text-center">問題が見つかりませんでした。</p>
        )}
      </div>
    </div>
  );
}
