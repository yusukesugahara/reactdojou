'use server'

import { apiClient } from "@/app/lib/apiClient";
import { getBackendUrl } from "@/app/utils/backendUrl";

export async function verifyEmail(token: string) {
  try {
    const backendUrl = getBackendUrl();
    const res = await apiClient.post(`${backendUrl}/api/auth/verify-email`, {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token })
    })

    if (!res.ok) {
      return { success: false }
    }
    console.log(res)
    return { success: true }
  } catch (error) {
    console.error('メール認証エラー:', error)
    return { success: false }
  }
}