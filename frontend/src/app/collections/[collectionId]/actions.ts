"use server";

import { cookies } from "next/headers";

/** Server Action */
export async function getQuestionServerAction(collectionId: string) {

  // クライアントの Cookie からトークンを取得
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken")?.value || "";

  // 外部の Express API にリクエスト
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const res = await fetch(`${backendUrl}/api/questions/${collectionId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: `authToken=${authToken}`, 
    },
  });

  if (!res.ok) {
    console.error("問題取得エラー:", await res.text());
    throw new Error("問題取得エラー");
  }

  return await res.json();
}


export async function getQuestionAnswerServerAction(collectionId: string, questionId: string, selectedOption: string) {

  // クライアントの Cookie からトークンを取得
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken")?.value || "";
  const userId = cookieStore.get("userId")?.value || "";
  console.log(userId)
  // 外部の Express API にリクエスト
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const res = await fetch(`${backendUrl}/api/questions/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `authToken=${authToken}`, 
    },
    body: JSON.stringify({
      userId,
      questionId,
      answer: selectedOption
     }),
  });

  if (!res.ok) {
    console.error("問題取得エラー:", await res.text());
    throw new Error("問題取得エラー");
  }

  return await res.json();
}
