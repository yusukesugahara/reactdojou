"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { QuizPageProps, Question } from "@/app/type/quizTypes";

export default function QuizPage({ params }: QuizPageProps) {
  const { collectionId } = params;

  // ユーザーIDを持たせるステート
  const [userId, setUserId] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string>("");

  // クイズ用の状態管理
  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);

  const router = useRouter();

  // -----------------------------
  // 1) ログインチェック
  // -----------------------------
  useEffect(() => {
    async function checkLogin() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/check`,
          {
            // Cookieを送受信
            credentials: "include",
          }
        );
        if (!res.ok) {
          // 未ログイン or トークン無効など
          setAuthError("ログインが必要です。");
          return;
        }
        const data = await res.json();
        // 例: data.user.id がユーザーID
        setUserId(data.user.id);
      } catch (err) {
        console.error(err);
        setAuthError("認証情報を取得できませんでした。");
      }
    }
    checkLogin();
  }, []);

  // -----------------------------
  // 2) 問題を取得する関数
  // -----------------------------
  const fetchQuestion = async () => {
    if (!collectionId || !userId) return; // userId がまだ null なら待機

    setLoading(true);
    setError("");
    setFeedback("");
    setSelectedOption("");
    setIsAnswered(false);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      // クイズ取得 (Progress管理)
      // GET /questions/:collectionId?userId=USERID
      const response = await fetch(
        `${backendUrl}/api/questions/${collectionId}?userId=${userId}`,
        {
          credentials: "include", // Cookie送受信
        }
      );
      const data = await response.json();

      if (!response.ok || !data) {
        throw new Error(data.message || "問題が取得できませんでした");
      }

      if (data.completed) {
        // 全問終了
        setCompleted(true);
        setQuestion(null);
      } else {
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

  // -----------------------------
  // 3) 初回 or collectionId 変更時に fetchQuestion 呼び出し
  // -----------------------------
  useEffect(() => {
    // userId がセットされた後に fetchQuestion を呼ぶ
    // (userId が null の間は呼ばない)
    if (collectionId && userId) {
      fetchQuestion();
    }
  }, [collectionId, userId]);

  // -----------------------------
  // 4) 回答送信処理
  // -----------------------------
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
      const response = await fetch(
        `${backendUrl}/api/questions/${collectionId}/questions/${question._id}/submit`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // Cookie送受信
          body: JSON.stringify({ answer: selectedOption }),
        }
      );
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "回答送信エラー");
      }

      const isCorrect = result.correct;
      const correctNumber = result.correctNumber;
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

  // -----------------------------
  // 5) 次の問題へ
  // -----------------------------
  const handleNextQuestion = () => {
    fetchQuestion();
  };

  // -----------------------------
  // 6) UI描画
  // -----------------------------
  // ログインエラー時
  if (authError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-500">{authError}</p>
        <button onClick={() => router.push("/login")} className="ml-4">
          ログインへ
        </button>
      </div>
    );
  }

  // ローディング中
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p>読み込み中...</p>
      </div>
    );
  }

  // エラー(問題取得エラーなど)
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // 全問終了
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

            {isAnswered && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded">
                <h3 className="font-bold mb-2">解説</h3>
                <p>{question.explanation || "解説がありません"}</p>
              </div>
            )}

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
