"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "@/app/actions/auth";

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
}

export default function Header({ title }: HeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // サーバーサイドでクッキー削除を実行
      const result = await logout();
      
      if (result.success) {
        // ログアウト成功時はホームページにリダイレクト
        router.push("/");
        router.refresh(); // Next.jsのルーターをリフレッシュ
      }
    } catch (error) {
      console.error("ログアウトエラー:", error);
      alert("ログアウトに失敗しました。もう一度お試しください。");
    }
  };

  return (
    <header className="w-full bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white shadow-md caret-transparent">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-xl font-bold hover:scale-105 transition-transform duration-300">
            Reactどじょう
          </Link>
          <h1 className="text-xl font-medium border-l border-white/30 pl-4">{title}</h1>
        </div>
        
        <nav className="flex items-center space-x-6">
          <Link 
            href="/dashboard" 
            className="hover:text-white/80 hover:-translate-y-0.5 transition-all duration-200"
          >
            ダッシュボード
          </Link>
          <Link 
            href="/results" 
            className="hover:text-white/80 hover:-translate-y-0.5 transition-all duration-200"
          >
            成績表
          </Link>
          <button 
            onClick={handleLogout}
            className="px-4 py-1.5 bg-white/10 rounded-full hover:bg-white/20 hover:-translate-y-0.5 transition-all duration-200"
          >
            ログアウト
          </button>
        </nav>
      </div>
    </header>
  );
} 