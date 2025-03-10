"use client";

import { login } from "@/app/actions/auth"
import { useActionState } from "react";
import { ErrorResponse } from "@/app/type/errorResponse"; 
import Link from "next/link";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaSignInAlt, FaUserPlus, FaQuestionCircle } from "react-icons/fa";

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, {
    success: false,
    errors: {} as ErrorResponse
  });

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="w-full max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <motion.h1 
            className="text-3xl font-extrabold text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            ログイン
          </motion.h1>
        </div>
        
        <motion.div 
          className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white border-opacity-20 p-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* エラーがあれば表示 */}
          {state?.errors?.general && (
            <motion.div 
              className="mb-6 p-4 bg-red-500 bg-opacity-20 border border-red-500 border-opacity-30 rounded-xl text-white"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <p>{state.errors.general.join(", ")}</p>
            </motion.div>
          )}

          {state && state.success && (
            <motion.div 
              className="mb-6 p-4 bg-green-500 bg-opacity-20 border border-green-500 border-opacity-30 rounded-xl text-white"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <p>ログインに成功しました。</p>
            </motion.div>
          )}

          <form action={action} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2 flex items-center">
                <FaEnvelope className="mr-2" /> メールアドレス
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="w-full p-3 pl-4 bg-white bg-opacity-10 border border-gray-300 border-opacity-20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  required
                  placeholder="your-email@example.com"
                />
              </div>
              {state?.errors?.email && (
                <p className="mt-2 text-sm text-red-300">{state.errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2 flex items-center">
                <FaLock className="mr-2" /> パスワード
              </label>
              <p className="text-xs text-gray-300 mb-2">
                ※ 8文字以上、大文字小文字を含む必要があります
              </p>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="w-full p-3 pl-4 bg-white bg-opacity-10 border border-gray-300 border-opacity-20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  required
                  placeholder="••••••••"
                />
              </div>
              {state?.errors?.password && (
                <div className="mt-2 text-sm text-red-300">
                  <p>Password must:</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    {state.errors.password.map((err) => (
                      <li key={err}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={pending}
              className="w-full flex justify-center items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition duration-300 ease-in-out disabled:opacity-70"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaSignInAlt className="mr-2" />
              {pending ? "ログイン中..." : "ログイン"}
            </motion.button>
          </form>

          <div className="mt-8 space-y-4">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Link href="/forgot-password" className="text-blue-300 hover:text-white flex items-center justify-center">
                <FaQuestionCircle className="mr-2" />
                パスワードをお忘れの方はこちら
              </Link>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Link href="/signup" className="text-blue-300 hover:text-white flex items-center justify-center">
                <FaUserPlus className="mr-2" />
                サインアップはこちら
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
