import { SignupFormSchema, LoginFormSchema, FormState } from '@/app/lib/definitions'
 
export async function signup(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })
 
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
 
  // 検証済みデータを取り出す
  const { name, email, password } = validatedFields.data;

  // バックエンドへのユーザー作成リクエスト
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const response = await fetch(`${backendUrl}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    // レスポンスが正常でない場合、エラー情報を返す
    if (!response.ok) {
      const errorData = await response.json();
      return {
        errors: {
          general: [errorData.message || "サインアップに失敗しました"],
        },
      }
    }

    // 正常にユーザーが作成できた場合は成功を返す
    return { success: true };
  } catch (error) {
    console.error("サインアップエラー:", error);
    return {
      errors: {
        general: ["ネットワークエラーが発生しました。"],
      },
    }
  }
}

export async function login(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })
 
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
 
  // 検証済みデータを取り出す
  const { email, password } = validatedFields.data;

  // バックエンドへのユーザー作成リクエスト
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const response = await fetch(`${backendUrl}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    // レスポンスが正常でない場合、エラー情報を返す
    if (!response.ok) {
      const errorData = await response.json();
      return {
        errors: {
          general: [errorData.message || "ログインに失敗しました"],
        },
      }
    }

    // 正常にユーザーが作成できた場合は成功を返す
    return { success: true };
  } catch (error) {
    console.error("ログインエラー:", error);
    return {
      errors: {
        general: ["ネットワークエラーが発生しました。"],
      },
    }
  }
}