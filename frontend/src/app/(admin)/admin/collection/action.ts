"use server"
import { z } from 'zod'
import { apiClient } from '@/app/lib/apiClient'

interface CollectionFormState {
  errors?: {
    general?: string[];
  };
  success?: boolean;
}

const CollectionFormSchema = z.object({
  name: z.string().min(1, { message: 'コレクション名は必須です。' }),
  description: z.string().min(1, { message: '説明は必須です。' }),
});

// コレクションの新規作成
export async function createCollection(_state: null, formData: FormData): Promise<CollectionFormState> {
  // フォームデータを検証
  const validatedFields = CollectionFormSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, description } = validatedFields.data;

  try {
    const res = await apiClient.post(`/api/admin/collections`, {
      name,
      description,
    });

    if (res.status === 400) {
      return {
        success: false,
        errors: {
          general: ['コレクションの作成に失敗しました']
        }
      }
    }

    if (res.status === 200) {
      return { success: true, errors: {} };
    }
    
  } catch (error) {
    console.error('コレクション作成エラー:', error);
    return {
      success: false,
      errors: {
        general: ['コレクションの作成に失敗しました'],
      },
    };
  }
}

