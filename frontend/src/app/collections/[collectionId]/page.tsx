"use client";

import React, { use, useState, useEffect, useCallback } from "react";
import { getQuestionServerAction, getQuestionAnswerServerAction } from "@/app/collections/[collectionId]/actions";
import { Question } from "@/app/type/quizTypes";
import { Progress } from "@/app/type/progress";
import Link from "next/link";
import Header from "@/app/components/Header";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaTimesCircle, FaArrowRight, FaCode, FaLightbulb, FaTrophy, FaHome, FaRedo } from "react-icons/fa";

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
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // -----------------------------
  // 1) 問題を取得
  // -----------------------------
  const fetchQuestion = useCallback(async () => {
    if (!collectionId) return;

    setLoading(true);
    setError("");
    setFeedback("");
    setSelectedOption("");
    setIsAnswered(false);
    setIsCorrect(null);

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
    } catch {

      setError("クイズの取得に失敗しました");
    } finally {
      setLoading(false);
    }
  }, [collectionId]);

  // -----------------------------
  // 2) 初回 & collectionId 変更時の呼び出し
  // -----------------------------
  useEffect(() => {
    // CookieにトークンがあるかどうかをチェックするならここでOK
    if (collectionId) {
      fetchQuestion();
    }
  }, [collectionId, fetchQuestion]);

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
      const result = await getQuestionAnswerServerAction(collectionId, question._id, selectedOption)

      const isCorrect = result.isCorrect;
      setIsCorrect(isCorrect);
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
    } catch {
      console.error("回答の送信に失敗:");
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
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            rotate: 360 
          }}
          transition={{ 
            duration: 0.8, 
            ease: "easeInOut",
            rotate: { repeat: Infinity, duration: 1.5, ease: "linear" }
          }}
          className="text-white text-6xl"
        >
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </motion.div>
      </div>
    );
  }

  // エラー
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white bg-opacity-10 backdrop-blur-lg text-white border border-red-300 border-opacity-30 px-6 py-5 rounded-xl shadow-lg max-w-md"
        >
          <div className="flex items-center text-red-300 mb-3">
            <FaTimesCircle className="mr-2 text-xl" />
            <h3 className="text-xl font-semibold">エラーが発生しました</h3>
          </div>
          <p>{error}</p>
        </motion.div>
      </div>
    );
  }

  // 全問終了
  if (completed) {
    const totalQuestions = questions.length;
    const correctAnswers = questions.filter(q => q.isCorrect).length;
    const accuracy = Math.round((correctAnswers / totalQuestions) * 100);

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white border-opacity-20 p-8 max-w-md w-full"
        >
          <div className="flex flex-col items-center mb-8">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="text-6xl text-yellow-400 mb-4"
            >
              <FaTrophy />
            </motion.div>
            <h2 className="text-3xl font-bold text-white text-center">学習完了！</h2>
          </div>
          
          <div className="space-y-6">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-center"
            >
              <div className="relative">
                <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300 mb-2">
                  {accuracy}%
                </div>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${accuracy}%` }}
                  transition={{ delay: 0.7, duration: 1.5, ease: "easeOut" }}
                  className="h-2 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full mx-auto mt-2 max-w-[200px]"
                />
              </div>
              <p className="text-gray-200 mt-2">正答率</p>
            </motion.div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="bg-white bg-opacity-5 border border-white border-opacity-10 p-4 rounded-xl text-center"
              >
                <div className="flex justify-center text-green-400 mb-2">
                  <FaCheckCircle className="text-2xl" />
                </div>
                <div className="text-2xl font-semibold text-white mb-1">
                  {correctAnswers}
                </div>
                <p className="text-sm text-gray-300">正解</p>
              </motion.div>
              <motion.div 
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="bg-white bg-opacity-5 border border-white border-opacity-10 p-4 rounded-xl text-center"
              >
                <div className="flex justify-center text-red-400 mb-2">
                  <FaTimesCircle className="text-2xl" />
                </div>
                <div className="text-2xl font-semibold text-white mb-1">
                  {totalQuestions - correctAnswers}
                </div>
                <p className="text-sm text-gray-300">不正解</p>
              </motion.div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/dashboard"
                className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center w-full"
              >
                <FaHome className="mr-2" /> ダッシュボードへ
              </Link>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 border border-white border-opacity-30 bg-white bg-opacity-10 text-white rounded-xl hover:bg-opacity-20 transition-all flex items-center justify-center w-full"
              >
                <FaRedo className="mr-2" /> もう一度挑戦
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  // 問題表示
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <Header title="クイズチャレンジ" />
      
      <div className="container mx-auto px-4 py-10 pt-20">
        <AnimatePresence mode="wait">
          {question && (
            <motion.div
              key={question._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white border-opacity-20 p-8"
            >
              {/* プログレスバーとタイトル */}
              <div className="mb-6">
                <div className="flex justify-between items-center text-white mb-2">
                  <span className="font-bold">
                    {question.collectionName || "問題集"}
                  </span>
                  <span>
                    {progress?.currentIndex || 1}/{50}問目
                  </span>
                </div>
                <div className="w-full bg-gray-700 bg-opacity-40 h-2 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((progress?.currentIndex || 1) / (50)) * 100}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"
                  />
                </div>
              </div>

              {/* 問題タイトルと内容 */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-3">{question.title}</h2>
                <p className="text-gray-200 leading-relaxed">{question.content}</p>
              </div>

              {/* サンプルコード */}
              {question.sampleCode && (
                <div className="mb-6">
                  <div className="flex items-center mb-2 text-gray-200">
                    <FaCode className="mr-2" />
                    <span>サンプルコード</span>
                  </div>
                  <pre className="p-4 bg-gray-800 bg-opacity-70 rounded-xl overflow-x-auto text-gray-200 font-mono text-sm">
                    <code>{question.sampleCode}</code>
                  </pre>
                </div>
              )}

              {/* 選択肢 */}
              <div className="space-y-3 mb-6">
                <p className="text-white font-medium mb-2">選択肢:</p>
                {question.options.map((option) => (
                  <motion.div
                    key={option.number}
                    whileHover={{ scale: isAnswered ? 1 : 1.02 }}
                    whileTap={{ scale: isAnswered ? 1 : 0.98 }}
                  >
                    <label 
                      className={`block p-3 rounded-xl border transition-all ${
                        isAnswered 
                          ? parseInt(selectedOption) === option.number
                            ? isCorrect
                              ? "bg-green-500 bg-opacity-20 border-green-500 border-opacity-50"
                              : "bg-red-500 bg-opacity-20 border-red-500 border-opacity-50"
                            : "bg-white bg-opacity-5 border-white border-opacity-20" 
                          : "bg-white bg-opacity-5 border-white border-opacity-20 hover:bg-opacity-10 cursor-pointer"
                      }`}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="option"
                          value={option.number.toString()}
                          checked={parseInt(selectedOption, 10) === option.number}
                          onChange={(e) => setSelectedOption(e.target.value)}
                          className="mr-3"
                          disabled={isAnswered}
                        />
                        <div className="text-white">
                          <span className="font-semibold">{option.number}.</span> {option.text}
                        </div>
                        {isAnswered && parseInt(selectedOption) === option.number && (
                          <div className="ml-auto">
                            {isCorrect 
                              ? <FaCheckCircle className="text-green-400" />
                              : <FaTimesCircle className="text-red-400" />
                            }
                          </div>
                        )}
                      </div>
                    </label>
                  </motion.div>
                ))}
              </div>

              {/* 回答ボタン */}
              <motion.button
                onClick={handleSubmit}
                className={`w-full py-3 rounded-xl font-medium flex items-center justify-center ${
                  isAnswered
                    ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg"
                }`}
                disabled={isAnswered}
                whileHover={isAnswered ? {} : { scale: 1.03 }}
                whileTap={isAnswered ? {} : { scale: 0.97 }}
              >
                {isAnswered ? "回答済み" : "回答を送信"}
              </motion.button>

              {/* フィードバック */}
              <AnimatePresence>
                {feedback && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`mt-6 p-4 rounded-xl ${
                      isCorrect 
                        ? "bg-green-500 bg-opacity-20 border border-green-500 border-opacity-30"
                        : "bg-red-500 bg-opacity-20 border border-red-500 border-opacity-30"
                    }`}
                  >
                    <p className="text-white text-center">{feedback}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 解説 */}
              <AnimatePresence>
                {isAnswered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="mt-6 p-5 bg-blue-500 bg-opacity-10 border border-blue-300 border-opacity-20 rounded-xl"
                  >
                    <div className="flex items-center text-white mb-2">
                      <FaLightbulb className="text-yellow-300 mr-2" />
                      <h3 className="font-bold">解説</h3>
                    </div>
                    <p className="text-gray-200">{question.explanation || "解説がありません"}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 次の問題ボタン */}
              <AnimatePresence>
                {isAnswered && (
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                    onClick={handleNextQuestion}
                    className="w-full mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl hover:shadow-lg flex items-center justify-center font-medium"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    次の問題へ <FaArrowRight className="ml-2" />
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
