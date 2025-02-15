"use server";

import { cookies } from "next/headers";

export async function getLearningStats() {
  // クライアントの Cookie からトークンを取得
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken")?.value || "";
  const userId = cookieStore.get("userId")?.value || "";

  if (!authToken) {
    throw new Error("認証情報が見つかりません");
  }

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const res = await fetch(`${backendUrl}/api/results/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `authToken=${authToken}`,
    },
    body: JSON.stringify({
      userId,
     }),
  });

  if (!res.ok) {
    console.error("学習成績取得エラー:", await res.text());
    throw new Error("学習成績の取得に失敗しました");
  }

  return await res.json();
}
