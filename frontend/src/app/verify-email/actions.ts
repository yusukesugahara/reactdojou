'use server'

export async function verifyEmail(token: string) {
  try {
    const API_BASE_URL = process.env.BACKEND_URL
    const res = await fetch(`${API_BASE_URL}/api/auth/verify-email`, {
      method: 'POST',
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