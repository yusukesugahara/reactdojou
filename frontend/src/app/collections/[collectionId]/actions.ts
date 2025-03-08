"use server";

import { cookies } from "next/headers";
import { apiClient } from "@/app/lib/apiClient";
import { getBackendUrl } from "@/app/utils/backendUrl";

/** Server Action */
export async function getQuestionServerAction(collectionId: string) {

  // クライアントの Cookie からトークンを取得
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken")?.value || "";

  // 外部の Express API にリクエスト

  const res = await apiClient.get(`/api/questions/${collectionId}`, {
    headers: {
      "Content-Type": "application/json",
      Cookie: `authToken=${authToken}`,
    },
  });

  if (!res.success) {
    console.error("問題取得エラー:", await res);
    throw new Error("問題取得エラー");
  }

  return await res;
}


export async function getQuestionAnswerServerAction(collectionId: string, questionId: string, selectedOption: string) {

  // クライアントの Cookie からトークンを取得
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken")?.value || "";
  const userId = cookieStore.get("userId")?.value || "";

  // 外部の Express API にリクエスト
  const res = await apiClient.post(`/api/questions/submit`, {
    headers: {
      "Content-Type": "application/json",
      Cookie: `authToken=${authToken}`, 
    },
    userId,
    questionId,
    answer: selectedOption
  });
  console.log(res);
  if (res.status === 500 || res.status === 404) {
    console.error("問題取得エラー:");
    throw new Error("問題取得エラー");
  }

  return await res;
}
