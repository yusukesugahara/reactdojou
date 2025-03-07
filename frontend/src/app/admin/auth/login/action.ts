"use server";

import { z } from "zod";
import { apiClient } from "@/app/lib/apiClient";
import { FromState } from '@/app/lib/definitions';

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

  return response.data; 
}
