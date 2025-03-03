'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaUserPlus, FaSignInAlt, FaReact } from 'react-icons/fa';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <motion.header 
        className="text-center mb-12 text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center mb-6">
          <FaReact className="text-6xl mr-4 animate-spin-slow" />
          <h1 className="text-5xl font-bold">Reactどじょう</h1>
        </div>
        <p className="text-xl text-gray-100 max-w-md mx-auto">
          ReactやJavaScriptに関するクイズでスキルを試しましょう！
        </p>
      </motion.header>

      <motion.main 
        className="w-full max-w-md p-8 bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white border-opacity-20"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <nav className="flex flex-col space-y-5">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/signup"
              className="w-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 text-lg font-medium rounded-xl hover:shadow-lg transition duration-300 ease-in-out"
            >
              <FaUserPlus className="mr-2" /> サインアップ
            </Link>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/login"
              className="w-full flex items-center justify-center bg-gradient-to-r from-emerald-500 to-green-500 text-white py-3 px-6 text-lg font-medium rounded-xl hover:shadow-lg transition duration-300 ease-in-out"
            >
              <FaSignInAlt className="mr-2" /> ログイン
            </Link>
          </motion.div>
        </nav>
      </motion.main>
      
      <motion.footer
        className="mt-12 text-white text-sm opacity-80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        © 2023 Reactどじょう - すべての権利を保有
      </motion.footer>
    </div>
  );
}
