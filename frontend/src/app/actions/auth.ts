"use server"
import { SignupFormSchema, LoginFormSchema, FormState } from '@/app/lib/definitions'
import { cookies } from 'next/headers'


// ★ サインアップ
export async function signup(_state: FormState, formData: FormData) : Promise<FormState> {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false
    }
  }

  // データを取り出す
  const { name, email, password } = validatedFields.data

  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
    console.log(backendUrl);
    const response = await fetch(`${backendUrl}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // ★ Cookie の送受信用
      credentials: 'include',
      body: JSON.stringify({ name, email, password }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return {
        errors: {
          general: [errorData.message || 'サインアップに失敗しました'],
        },
        success: false
      }
    }

    // 正常にユーザーが作成できた
    return { success: true , errors: {} }
  } catch (error: unknown) {
    console.error('サインアップエラー:', error)
    return {
      success: false,
      errors: {
        general: ['ネットワークエラーが発生しました', (error as Error).message || '不明なエラーが発生しました'] ,
      }
    }
  }
}

// ★ ログイン
export async function login(_state: FormState,  formData: FormData): 
  Promise<FormState> {

  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    }
  }

  const { email, password } = validatedFields.data


  const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  })
  console.log(res);
  if (!res.ok) {
    const error = await res.json()
    return {
      success: false,
      errors: {
        general: [error.message || 'ログインに失敗しました']
      }
    }
  }

  const data = await res.json()
  // データの存在確認を追加
  if (!data.token || !data.userId) {
    return {
      success: false,
      errors: {
        general: ['認証情報が不完全です']
      }
    }
  }

  // サーバーサイドでHTTPOnlyクッキーを設定
  const cookieStore = await cookies();  
  cookieStore.set('authToken', data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 24 * 60 * 60
  });

  cookieStore.set('userId', data.userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 24 * 60 * 60
  });

  return { success: true, errors: {} }

}

// ログアウト処理を修正
export async function logout(): Promise<{ success: boolean }> {
  try {
    const cookieStore = await cookies()
    
    // クッキーを削除（引数を1つに）
    cookieStore.delete('authToken')
    cookieStore.delete('userId')

    return { success: true }
  } catch (error) {
    console.error('ログアウトエラー:', error)
    throw error
  }
}

// パスワードリセットメールの送信
export async function requestPasswordReset(_state: FormState, formData: FormData) {
  const email = formData.get('email') as string

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/request-reset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })

    if (!res.ok) {
      return {
        success: false,
        errors: {
          general: ['パスワードリセットメールの送信に失敗しました']
        }
      }
    }

    return { success: true, errors: {} }
  } catch {
    return {
      success: false,
      errors: {
        general: ['ネットワークエラーが発生しました']
      }
    }
  }
}

// パスワードのリセット
export async function resetPassword(_state: FormState, formData: FormData) {
  const token = formData.get('token') as string
  const newPassword = formData.get('newPassword') as string

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, newPassword })
    })

    if (!res.ok) {
      const error = await res.json()
      return {
        success: false,
        errors: {
          general: error.message || 'パスワードのリセットに失敗しました'
        }
      }
    }

    return { success: true, errors: {} }
  } catch{
    return {
      success: false,
      errors: {
        general: ['ネットワークエラーが発生しました']
      }
    }
  }
}
