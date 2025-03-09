"use server";

import { z } from "zod";
import { apiClient } from "@/app/lib/apiClient";
import { FromState } from '@/app/lib/definitions';
import { cookies } from 'next/headers';

const adminLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function adminLogin(_prevState: FromState, formData: FormData): Promise<FromState> {
  const email = formData.get('email');
  const password = formData.get('password');

  if (!email || !password) {
    return {
      success: false,
      error: {
        message: 'メールアドレスとパスワードを入力してください',
      },
    };
  }

  const validatedFields = adminLoginSchema.safeParse({
    email,
    password,
  });

  if (!validatedFields.success) {
    return {
      success: false,
        error: {
        message: 'メールアドレスとパスワードを入力してください',
      },
    };
  }
  const { email: validatedEmail, password: validatedPassword } = validatedFields.data;

  const response = await apiClient.post('/admin/login', {
    email: validatedEmail,
    password: validatedPassword,
  });

  if (response.status === 200) {
    const cookieStore = await cookies();
    cookieStore.set('admin_token', response.data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1日
      path: '/',
    });
  }

  return {
    success: true,
    error: undefined,
  }; 
}
