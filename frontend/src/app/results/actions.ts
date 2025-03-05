"use server";

import { cookies } from "next/headers";
import { apiClient } from "@/app/lib/apiClient";
import { getBackendUrl } from "@/app/utils/backendUrl";

export async function getLearningStats() {
  // クライアントの Cookie からトークンを取得
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken")?.value || "";
  const userId = cookieStore.get("userId")?.value || "";

  if (!authToken) {
    throw new Error("認証情報が見つかりません");
  }

  const backendUrl = getBackendUrl();
  const res = await apiClient.post(`${backendUrl}/api/results/`, {
    headers: {
      "Content-Type": "application/json",
      Cookie: `authToken=${authToken}`,
    },
    userId,
  });

  return await res.json();
}
