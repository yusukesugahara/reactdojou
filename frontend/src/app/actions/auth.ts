"use server"
import { SignupFormSchema, LoginFormSchema, FormState } from '@/app/lib/definitions'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// ★ サインアップ
export async function signup(_state: FormState, formData: FormData) : Promise<FormState> {
  // Validate form fields
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
  } catch (error) {
    console.error('サインアップエラー:', error)
    return {
      errors: {
        general: ['ネットワークエラーが発生しました。'],
      },
      success: false
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

  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    })

    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.message || 'ログインに失敗しました')
    }

    const data = await res.json()

    // データの存在確認を追加
    if (!data.token || !data.userId) {
      throw new Error('認証情報が不完全です')
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
  } catch (error) {
    console.error('ログインエラー:', error)
    throw error
  }
}

// ログアウト処理を修正
export async function logout(): Promise<{ success: boolean }> {
  try {
    const response = NextResponse.json({})
    response.cookies.set('authToken', '', { 
      path: '/',
      maxAge: 0,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    })
    response.cookies.set('userId', '', { 
      path: '/',
      maxAge: 0,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    })

    // シンプルなオブジェクトを返す
    return { success: true }
  } catch (error) {
    console.error('ログアウトエラー:', error)
    throw error
  }
}
