"use client";

import React, { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getQuestionServerAction, getQuestionAnswerServerAction } from "@/app/collections/[collectionId]/actions";
import { Question } from "@/app/type/quizTypes";

type QuizPageClientProps = {
};

export default function QuizPage({ params }: { params: Promise<{ collectionId: string }> }) {
  // -----------------------------
  // State管理やuseEffectなど、すべてクライアント側で使える
  // -----------------------------
  const collectionId  = use(params).collectionId;
  console.log(collectionId)
  // クイズ関連
  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);

  // -----------------------------
  // 1) 問題を取得
  // -----------------------------
  const fetchQuestion = async () => {
    if (!collectionId) return;

    setLoading(true);
    setError("");
    setFeedback("");
    setSelectedOption("");
    setIsAnswered(false);

    try {
      const data = await getQuestionServerAction(collectionId);

      if (!data) {
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
      console.error("クイズの取得に失敗:", err);
      setError(err.message || "クイズの取得に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // 2) 初回 & collectionId 変更時の呼び出し
  // -----------------------------
  useEffect(() => {
    // CookieにトークンがあるかどうかをチェックするならここでOK
    if (collectionId) {
      fetchQuestion();
    }
  }, [collectionId]);

  // -----------------------------
  // 3) 回答送信
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
      const result = await getQuestionAnswerServerAction(collectionId, question._id, selectedOption )

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
      console.error("回答の送信に失敗:", error);
      setFeedback("回答の送信に失敗しました");
    }
  };

  // -----------------------------
  // 4) 次の問題へ
  // -----------------------------
  const handleNextQuestion = () => {
    fetchQuestion();
  };

  // -----------------------------
  // 5) UI描画
  // -----------------------------
  // ローディング中
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">読み込み中...</div>;
  }

  // エラー
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
            {/* タイトルや問題文 */}
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

            {/* 選択肢 */}
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

            {/* 回答ボタン */}
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

            {/* フィードバック */}
            {feedback && <p className="mt-4 text-center">{feedback}</p>}

            {/* 解説 */}
            {isAnswered && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded">
                <h3 className="font-bold mb-2">解説</h3>
                <p>{question.explanation || "解説がありません"}</p>
              </div>
            )}

            {/* 次の問題ボタン */}
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
