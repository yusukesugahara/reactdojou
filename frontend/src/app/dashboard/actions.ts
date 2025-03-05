// app/serverActions.js
"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { apiClient } from "@/app/lib/apiClient";
import { getBackendUrl } from "@/app/utils/backendUrl";

// 認証チェック用のアクション
export async function checkAuth() {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('authToken');
    const userId = cookieStore.get('userId');
    const backendUrl = getBackendUrl();

    if (!authToken) {
      redirect('/login');
    }

    const res = await apiClient.get(`${backendUrl}/api/auth/check`, {
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
  const backendUrl = getBackendUrl();

  const res = await apiClient.get(`${backendUrl}/api/collections`, {
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
