'use server'

import { apiClient } from "@/app/lib/apiClient";

export async function verifyEmail(token: string) {
  try {
    const res = await apiClient.post(`/api/auth/verify-email`, {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token })
    })
    
    if (!res.ok) {
      return { success: false }
    }

    return { success: true }
  } catch (error) {
    console.error('メール認証エラー:', error)
    return { success: false }
  }
}