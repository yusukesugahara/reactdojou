'use client'

import { useState } from 'react'
import { requestPasswordReset } from '../actions/auth'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    // FormDataを作成
    const formData = new FormData()
    formData.append('email', email)

    try {
      // _stateに適切な初期値を渡す
      await requestPasswordReset({ success: false, errors: {} }, formData) // ここで2つの引数を渡す
      setStatus('success')
      setMessage('パスワードリセットメールを送信しました')
    } catch {
      setStatus('error')
      setMessage('メール送信に失敗しました')
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">パスワードをお忘れの方</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">メールアドレス</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {status === 'loading' ? '送信中...' : 'リセットメールを送信'}
          </button>

          {status === 'success' && (
            <p className="mt-4 text-green-600">{message}</p>
          )}
          {status === 'error' && (
            <p className="mt-4 text-red-600">{message}</p>
          )}
        </form>
      </div>
    </div>
  )
} 