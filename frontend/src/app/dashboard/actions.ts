// app/serverActions.js
"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { apiClient } from "@/app/lib/apiClient";

// 認証チェック用のアクション
export async function checkAuth() {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('authToken');
    const userId = cookieStore.get('userId');

    if (!authToken) {
      redirect('/login');
    }

    const res = await apiClient.get(`/api/auth/check`, {
      headers: {
        "Content-Type": "application/json",
        "Cookie": `authToken=${authToken?.value || ''}`
      },
      cache: 'no-store'  // キャッシュを無効化
    });

    if (res.user.id !== userId?.value) {
      throw new Error(res.message || "認証エラーが発生しました");
    }
    
    return res;
  } catch (error) {
    console.error("認証チェックエラー:", error);
    throw error;
  }
}

// 問題集データ取得用のアクション
export async function getCollections() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get('authToken');

  const res = await apiClient.get(`/api/collections`, {
    headers: {
      "Content-Type": "application/json",
      "Cookie": `authToken=${authToken?.value || ''}`
    },
    cache: 'no-store'
  });

  if (res.status === 500 || res.status === 401) {
    throw new Error("問題集の取得に失敗しました");
  }
  
  return res;
}
