"use server"
import { SignupFormSchema, LoginFormSchema, FormState } from '@/app/lib/definitions'

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
export async function login(_state: FormState,  formData: FormData): Promise<FormState> {
  // Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
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
  const { email, password } = validatedFields.data

  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
    const response = await fetch(`${backendUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // ★ Cookie の送受信用
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return {
        errors: {
          general: [errorData.message || 'ログインに失敗しました'],
        },
        success:false
      }
    }

    return { success: true , errors:{}}
  } catch (error) {
    console.error('ログインエラー:', error)
    return {
      errors: {
        general: ['ネットワークエラーが発生しました。'],
      },
      success: false
    }
  }
}
