'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useActionState } from 'react'
import { resetPassword } from '../actions/auth'

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  
  const [newPassword, setNewPassword] = useState('')
  const [state, action, pending] = useActionState(resetPassword, {
    success: false,
    errors: {}
  })

  const handleSubmit = async (formData: FormData) => {
    if (!token) return
    formData.append('token', token)
    await action(formData)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">新しいパスワードの設定</h1>
        
        <form action={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">新しいパスワード</label>
            <input
              name="newPassword"
              type="password"
              className="w-full p-2 border rounded"
              required
              minLength={8}
            />
          </div>

          {state.errors?.general && (
            <p className="text-red-600 mb-4">{state.errors.general}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {pending ? '更新中...' : 'パスワードを更新'}
          </button>

          {state.success && (
            <p className="mt-4 text-green-600">パスワードを更新しました</p>
          )}
        </form>
      </div>
    </div>
  )
} 