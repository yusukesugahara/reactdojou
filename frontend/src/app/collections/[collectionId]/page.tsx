"use client";

import React, { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getQuestionServerAction, getQuestionAnswerServerAction } from "@/app/collections/[collectionId]/actions";
import { Question } from "@/app/type/quizTypes";
import { Progress } from "@/app/type/progress";
import Link from "next/link";
import Header from "@/app/components/Header";

export default function QuizPage({ params }: { params: Promise<{ collectionId: string }> }) {
  // -----------------------------
  // State管理やuseEffectなど、すべてクライアント側で使える
  // -----------------------------
  const collectionId  = use(params).collectionId;
  // クイズ関連
  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [progress, setProgress] = useState<Progress | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Question[]>([]);

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
      setProgress(data.progress);
      if (data.completed) {
        // 全問終了
        setCompleted(true);
        setQuestion(null);
        setQuestions(data.questions);
      } else {
        setQuestion(data.question);
        setCompleted(false);
        setQuestions(data.questions);
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

      const isCorrect = result.isCorrect;
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
    const totalQuestions = questions.length;
    const correctAnswers = questions.filter(q => q.isCorrect).length;
    const accuracy = Math.round((correctAnswers / totalQuestions) * 100);

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-center mb-6">学習完了！</h2>
          
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">
                {accuracy}%
              </div>
              <p className="text-gray-600">正答率</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-xl font-semibold text-gray-800">
                  {correctAnswers}
                </div>
                <p className="text-sm text-gray-600">正解</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-xl font-semibold text-gray-800">
                  {totalQuestions - correctAnswers}
                </div>
                <p className="text-sm text-gray-600">不正解</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center space-x-4">
            <Link
              href="/collections"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              コレクション一覧へ
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              もう一度挑戦
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 問題表示
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      <Header title="クイズチャレンジ" />
      
      <div className="max-w-2xl w-full p-6 bg-white shadow rounded mt-10 caret-transparent">
        {question ? (
          <>
            {/* タイトルや問題文 */}
            <div className="mb-4 text-gray-700">
              <span className="font-bold mr-2">
                {question.collectionName || "問題集"}
              </span>
                <p>100問中{progress?.currentIndex || 1}問目</p>
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
