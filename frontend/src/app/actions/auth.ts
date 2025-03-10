"use server"
import { SignupFormSchema, LoginFormSchema} from '@/app/lib/definitions'
import { cookies } from 'next/headers'
import { apiClient } from '@/app/lib/apiClient'
import { redirect } from 'next/navigation'

interface signupFormState {
  success: boolean;
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    general?: string[];
  };
}


// ★ サインアップ
export async function signup(_state: signupFormState, formData: FormData): Promise<signupFormState> {

  // フォームデータを検証
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;

  try {
    const res = await apiClient.post(`/api/auth/signup`, {
      name,
      email,
      password,
    });


    if (res.status === 400) {
      return {
        success: false,
        errors: {
          general: ['サインアップに失敗しました']
        }
      }
    }

    if (res.status === 200) {
      return { success: true, errors: {} };
    }
    
  } catch (error) {
    console.error('サインアップエラー:', error);
    return {
      success: false,
      errors: {
        general: ['サインアップに失敗しました'],
      },
    };
  }
  return { success: true, errors: {} };
}

interface loginFormState {
  success: boolean;
  errors?: {
    email?: string[];
    password?: string[];
    general?: string[];
  };
}
// ★ ログイン
export async function login(_state: loginFormState, formData: FormData): Promise<loginFormState> {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  const { email, password } = validatedFields.data;

    const res = await apiClient.post(`/api/auth/login`, {
      email,
      password,
    });
      // データの存在確認
  if (!res.token || !res.userId) {
    return {
      success: false,
      errors: {
        general: ['認証情報が不完全です']
      }
    };
  }

  // サーバーサイドでHTTPOnlyクッキーを設定
  const cookieStore = await cookies();
  cookieStore.set('authToken', res.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 24 * 60 * 60
  });

  cookieStore.set('userId', res.userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 24 * 60 * 60
  });

  redirect('/dashboard');
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

interface FormState {
  success: boolean;
  error?: {
    message: string;
  };
}
// パスワードリセットメールの送信
export async function requestPasswordReset(_state: FormState, formData: FormData) {
  const email = formData.get('email') as string
  try {

    const res = await apiClient.post(`/api/auth/request-reset`, {
      email
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
    const res = await apiClient.post(`/api/auth/reset-password`, {
      token,
      newPassword
    })

    if (!res.ok) {
      return {
        success: false,
        errors: {
          general: ['パスワードのリセットに失敗しました']
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
