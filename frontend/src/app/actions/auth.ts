"use server"
import { SignupFormSchema, LoginFormSchema, FormState } from '@/app/lib/definitions'
import { cookies } from 'next/headers'

// 安全なフェッチ関数の実装
async function safeFetch(url: string, options: RequestInit) {
  try {
    const response = await fetch(url, options);
    return { response, error: null };
  } catch (error) {
    console.error(`フェッチエラー (${url}):`, error);
    return { 
      response: null, 
      error: error instanceof Error ? error : new Error('フェッチに失敗しました') 
    };
  }
}

// クライアントサイドとサーバーサイドで異なる値を使用
const getBackendUrl = () => {
  // サーバーサイドレンダリング時はコンテナ名を使用
  if (typeof window === 'undefined') {
    return process.env.BACKEND_URL || 'http://backend:5000';
  }
  // ブラウザからのアクセス時はホスト名を使用
  return process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
};

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
    const backendUrl = getBackendUrl();
    
    const { response, error } = await safeFetch(`${backendUrl}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // ★ Cookie の送受信用
      credentials: 'include',
      body: JSON.stringify({ name, email, password }),
    });

    // フェッチ自体が失敗した場合
    if (error) {
      console.error('ネットワークエラー:', error);
      return {
        success: false,
        errors: {
          general: ['ネットワークエラーが発生しました', error.message || 'サーバーに接続できません']
        }
      };
    }

    // レスポンスが失敗した場合
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        console.error('JSONパース失敗:', e);
        errorData = { message: `${response.status}: ${response.statusText}` };
      }
      
      return {
        errors: {
          general: [errorData.message || 'サインアップに失敗しました'],
        },
        success: false
      };
    }

    return { success: true , errors: {} }
  } catch (error: unknown) {
    console.error('予期せぬエラー:', error);
    return {
      success: false,
      errors: {
        general: ['予期せぬエラーが発生しました', (error as Error).message || '不明なエラー']
      }
    };
  }
}

// ★ ログイン
export async function login(_state: FormState, formData: FormData): Promise<FormState> {
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

  try {
    const API_BASE_URL = getBackendUrl();
    console.log('ログイン試行URL:', `${API_BASE_URL}/api/auth/login`);
    
    const { response, error } = await safeFetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });

    // フェッチ自体が失敗した場合
    if (error) {
      console.error('ネットワークエラー:', error);
      return {
        success: false,
        errors: {
          general: ['サーバーに接続できません', error.message]
        }
      };
    }

    // レスポンスが失敗した場合
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        console.error('JSONパース失敗:', e);
        errorData = { message: `${response.status}: ${response.statusText}` };
      }
      
      return {
        success: false,
        errors: {
          general: [errorData.message || 'ログインに失敗しました']
        }
      };
    }

    let data;
    try {
      data = await response.json();
    } catch (e) {
      console.error('レスポンスJSONパース失敗:', e);
      return {
        success: false,
        errors: {
          general: ['サーバーからの応答形式が不正です']
        }
      };
    }

    // データの存在確認
    if (!data.token || !data.userId) {
      return {
        success: false,
        errors: {
          general: ['認証情報が不完全です']
        }
      };
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

    return { success: true, errors: {} };
  } catch (error) {
    console.error('予期せぬエラー:', error);
    return {
      success: false,
      errors: {
        general: ['予期せぬエラーが発生しました', (error as Error).message || '不明なエラー']
      }
    };
  }
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
    const res = await fetch(`${getBackendUrl()}/api/auth/request-reset`, {
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
    const res = await fetch(`${getBackendUrl()}/api/auth/reset-password`, {
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
