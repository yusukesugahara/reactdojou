"use client";

import { login } from "@/app/actions/auth"
import { useEffect, useActionState } from "react";
import { useRouter } from "next/navigation";
import { ErrorResponse } from "@/app/type/errorResponse"; 

export default function LoginPage() {
  // useActionState: [state, action, pending]
  //   - state: アクション実行結果 (success, errorsなど)
  //   - action: フォームの "action={action}" で使う関数
  //   - pending: 非同期処理中かどうか
  const [state, action, pending] = useActionState(login as any, {
    success: false,
    errors: {} as ErrorResponse
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      // ログイン成功時にダッシュボードへ遷移
      router.push("/dashboard");
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
    </div>
  );
}
