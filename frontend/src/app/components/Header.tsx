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
    <header className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg caret-transparent">
      <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-xl font-bold">
            Reactどじょう
          </Link>
        </div>
        
        <nav className="flex items-center space-x-6">
          <Link 
            href="/dashboard" 
            className="hover:text-blue-200 transition-colors"
          >
            ダッシュボード
          </Link>
          <Link 
            href="/results" 
            className="hover:text-blue-200 transition-colors"
          >
            成績表
          </Link>
          <button 
            onClick={handleLogout}
            className="hover:text-blue-200 transition-colors"
          >
            ログアウト
          </button>
        </nav>
      </div>
    </header>
  );
} 