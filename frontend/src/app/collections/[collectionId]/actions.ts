"use server";

import { cookies } from "next/headers";

/** Server Action */
export async function getQuestionServerAction(collectionId: string) {
  console.log("Server Action: getQuestionServerAction");

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
  console.log("Server Action: getQuestionServerAction");

  // クライアントの Cookie からトークンを取得
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken")?.value || "";
  console.log(selectedOption)
  console.log(questionId)
  // 外部の Express API にリクエスト
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const res = await fetch(`${backendUrl}/api/questions/${questionId}/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `authToken=${authToken}`, 
    },
    body: JSON.stringify({ answer: selectedOption }),
  });

  if (!res.ok) {
    console.error("問題取得エラー:", await res.text());
    throw new Error("問題取得エラー");
  }

  return await res.json();
}
