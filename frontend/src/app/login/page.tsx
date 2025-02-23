"use client";

import { login } from "@/app/actions/auth"
import { useEffect, useActionState } from "react";
import { useRouter } from "next/navigation";
import { ErrorResponse } from "@/app/type/errorResponse"; 
import Link from "next/link";

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, {
    success: false,
    errors: {} as ErrorResponse
  });

  const router = useRouter();
  console.log(state)
  useEffect(() => {
    if (state.success) {
      router.push("/dashboard");
      console.log("ok")
    }
  }, [state.success, router]);

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded shadow">
      <h1 className="text-2xl font-bold mb-5">ログイン</h1>
      
      {/* エラーがあれば表示 */}
      {state?.errors?.general && (
        <p className="text-red-500 mb-4">{state.errors.general.join(", ")}</p>
      )}

      <form action={action} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-2">メールアドレス</label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        {/* フィールド単体のエラー */}
        {state?.errors?.email && (
          <p className="text-red-500 mb-4">{state.errors.email}</p>
        )}

        <div>
          <label htmlFor="password" className="block mb-2">パスワード</label>
          <p className="text-sm text-gray-600 mb-2">
            ※ 8文字以上、大文字小文字を含む必要があります
          </p>
          <input
            id="password"
            name="password"
            type="password"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        {state?.errors?.password && (
          <div>
            <p className="text-red-500 mb-4">Password must:</p>
            <ul>
              {state.errors.password.map((err) => (
                <li key={err}>- {err}</li>
              ))}
            </ul>
          </div>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full bg-green-500 text-white py-2 rounded"
        >
          {pending ? "ログイン中..." : "ログイン"}
        </button>
      </form>

      <div className="mt-4 text-center">
        <Link href="/forgot-password" className="text-blue-500 hover:text-blue-600">
          パスワードをお忘れの方はこちら
        </Link>
      </div>
    </div>
  );
}
