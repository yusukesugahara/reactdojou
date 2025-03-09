import { z } from 'zod'
 
export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: '名前は2文字以上である必要があります。' })
    .trim(),
  email: z.string().email({ message: '有効なメールアドレスを入力してください。' }).trim(),
  password: z
    .string()
    .min(6, { message: '6文字以上' })
    .regex(/[a-zA-Z]/, { message: '少なくとも1字以上は' })
    .regex(/[0-9]/, { message: '少なくとも1字以上は数字を入力' })
    .regex(/[^a-zA-Z0-9]/, { message: '少なくとも一つ以上の特殊文字が含まれています。',})
    .trim(),
})

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "有効なメールアドレスを入力してください" }),
  password: z.string().min(6, { message: "パスワードは6文字以上必要です" }),
});

export interface FormState {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    general?: string[];
  };
  success?: boolean;
}

export interface FromState {
  success: boolean;
  error?: {
    message: string;
  };
}

export interface AdminFormState {
  success: boolean;
  error?: {
    message: string;
  };
}