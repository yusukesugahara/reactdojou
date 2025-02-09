"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { QuizPageProps, Option, Question } from "@/app/type/quizTypes";

/**
 * 進捗ベースで1問ずつ問題を取得し、回答を送信するサンプル
 * - GET /questions/:collectionId?userId=... : Progressがなければ作成し、次の問題を返す
 * - POST /questions/:collectionId/questions/:questionId/submit : 回答を送信して正誤判定
 */

export default function QuizPage({ params }: QuizPageProps) {
  // URL パラメータから collectionId を取得
  const { collectionId } = params;

  // ユーザーID (本来はログイン情報から取得)
  const [userId] = useState("USER_123");

  // 状態管理
  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  // クイズが完了したかどうか
  const [completed, setCompleted] = useState<boolean>(false);

  // ---- 問題をバックエンドから取得する関数 ----
  const fetchQuestion = async () => {
    if (!collectionId || !userId) return;

    setLoading(true);
    setError("");
    setFeedback("");
    setSelectedOption("");
    setIsAnswered(false);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      // Progress管理で次の問題を取得するルート
      // 例: GET /questions/:collectionId?userId=USER_123
      const response = await fetch(
        `${backendUrl}/api/questions/${collectionId}?userId=${userId}`
      );
      const data = await response.json();

      if (!response.ok || !data) {
        throw new Error(data.message || "問題が取得できませんでした");
      }

      if (data.completed) {
        // すでに全問終了
        setCompleted(true);
        setQuestion(null);
      } else {
        // 取得した問題を state にセット
        setQuestion(data.question);
        setCompleted(false);
      }
    } catch (err: any) {
      console.error("クイズの取得に失敗しました:", err);
      setError(err.message || "クイズの取得に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  // 初回 or collectionId 変更時に問題を取得
  useEffect(() => {
    if (collectionId) {
      fetchQuestion();
    }
  }, [collectionId]);

  // ---- 回答送信処理 ----
  const handleSubmit = async () => {
    if (!selectedOption) {
      setFeedback("選択肢を選んでください");
      return;
    }

    if (!question) {
      setFeedback("問題が設定されていません");
      return;
    }

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      // 回答送信ルート: POST /questions/:collectionId/questions/:questionId/submit
      const response = await fetch(
        `${backendUrl}/api/questions/${collectionId}/questions/${question._id}/submit`,
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

      // 選択肢リストから正解の選択肢を検索
      const correctOption = question.options.find(
        (opt) => opt.number === correctNumber
      );

      if (!correctOption) {
        setFeedback(isCorrect ? "正解です！" : "不正解です...");
      } else {
        setFeedback(
          isCorrect
            ? `正解です！ 正解は「${correctOption.number}番：${correctOption.text}」です。`
            : `不正解です... 正解は「${correctOption.number}番：${correctOption.text}」です。`
        );
      }

      setIsAnswered(true);
    } catch (error: any) {
      console.error("回答の送信に失敗しました:", error);
      setFeedback("回答の送信に失敗しました");
    }
  };

  // ---- 次の問題へ移動 ----
  // 再度 fetchQuestion() を呼び、バックエンドがProgressを進める
  const handleNextQuestion = () => {
    fetchQuestion();
  };

  // ローディング中は読み込み中メッセージ
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p>読み込み中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // 全問完了している場合
  if (completed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-blue-600 text-lg">全ての問題が終了しました！</p>
      </div>
    );
  }

  // 問題表示
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      <div className="max-w-2xl w-full p-6 bg-white shadow rounded mt-10">
        {question ? (
          <>
            {/* 問題集名 & 問題番号 */}
            <div className="mb-4 text-gray-700">
              <span className="font-bold mr-2">
                {question.collectionName || "問題集"}
              </span>
              {question.totalQuestions
                ? ` (${question.totalQuestions}問中${
                    question.currentIndex || 1
                  }問目)`
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

            {/* 回答後に解説を表示 */}
            {isAnswered && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded">
                <h3 className="font-bold mb-2">解説</h3>
                <p>{question.explanation || "解説がありません"}</p>
              </div>
            )}

            {/* 次の問題へ */}
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
