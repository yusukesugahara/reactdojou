// app/serverActions.js
"use server";

import { cookies } from "next/headers";

// 環境変数から正しいバックエンドURLを取得
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

// 認証チェック用のアクション
export async function checkAuth() {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('authToken');

    const res = await fetch(`${API_BASE_URL}/api/auth/check`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Cookie": `authToken=${authToken?.value || ''}`
      },
      cache: 'no-store'  // キャッシュを無効化
    });
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "認証エラーが発生しました");
    }
    
    return await res.json();
  } catch (error) {
    console.error("認証チェックエラー:", error);
    throw error;
  }
}

// 問題集データ取得用のアクション
export async function getCollections() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get('authToken');

  const res = await fetch(`${API_BASE_URL}/api/collections`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Cookie": `authToken=${authToken?.value || ''}`
    },
    cache: 'no-store'
  });
  
  if (!res.ok) {
    throw new Error("問題集の取得に失敗しました");
  }
  
  return res.json();
}
