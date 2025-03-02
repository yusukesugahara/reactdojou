"use client";

import { signup } from "@/app/actions/auth"
import { useActionState } from 'react'
import { ErrorResponse } from "@/app/type/errorResponse"; 
import Link from "next/link";

export default function SignupPage() {
  const [state, action, pending] = useActionState(signup, 
    { success: false, errors: {} as ErrorResponse  });
  
  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded shadow">
      <h1 className="text-2xl font-bold mb-5">サインアップ</h1>
      {state?.errors?.general && (
        <p className="text-red-500 mb-4">
          {state.errors.general.join(", ")}
        </p>
      )}
      <form action={action} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-2">名前</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        {state?.errors?.name && <p className="text-red-500 mb-4">{state.errors.name}</p>}
        <div>
          <label htmlFor="email" className="block mb-2">メールアドレス</label>
          <input id="email" name="email" type="email" className="w-full p-2 border rounded" required />
        </div>
        {state?.errors?.email && <p className="text-red-500 mb-4">{state.errors.email}</p>}
        <div>
          <label htmlFor="password" className="block mb-2">パスワード</label>
          <input id="password" name="password" type="password" className="w-full p-2 border rounded" required />
        </div>
        {state?.errors?.password && (
        <div>
          <p className="text-red-500 mb-4">Password must:</p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}
        <button type="submit" disabled={pending} className="w-full bg-green-500 text-white py-2 rounded">
          サインアップ
        </button>
      </form>
      {state.success && !state.errors?.general && (
        <p className="text-green-500 mb-4">
          サインアップに成功しました。メールを確認してください。
        </p>
      )}
      <div className="mt-4 text-center">
        <Link href="/login" className="text-blue-500 hover:text-blue-600">
          ログインはこちら
        </Link>
      </div>
    </div>
  );
}
