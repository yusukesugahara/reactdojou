"use server"
import { z } from 'zod'
import { apiClient } from '@/app/lib/apiClient'

interface CollectionFormState {
  errors?: {
    general?: string[];
    name?: string[];
    description?: string[];
  };
  success?: boolean;
  data?: {
    name: string;
    description: string;
  };
}

const CollectionFormSchema = z.object({
  name: z.string().min(1, { message: 'コレクション名は必須です。' }),
  description: z.string().min(1, { message: '説明は必須です。' }),
});

// コレクションの新規作成
export async function createCollection(_state: CollectionFormState, formData: FormData): Promise<CollectionFormState> {
  // フォームデータを検証
  const validatedFields = CollectionFormSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
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

  // デフォルトの戻り値を追加
  return {
    success: false,
    errors: {
      general: ['予期しないエラーが発生しました'],
    },
  };
}

interface GetCollectionFormState {
  success?: boolean;
  data?: {
    name: string;
    description: string;
  };
  errors?: {
    general?: string[];
  };
}

// コレクションの取得
export async function getCollection(collectionId: string): Promise<GetCollectionFormState> {
  try {
    const res = await apiClient.get(`/api/admin/collections/${collectionId}`);
    if (res.status === 404) {
      return { success: false, errors: { general: ['コレクションが見つかりません'] } };
    }
    return { success: true, data: res.data };
  } catch (error) {
    console.error('コレクション取得エラー:', error);  
    return { success: false, errors: { general: ['コレクションの取得に失敗しました'] } };
  }
}

// コレクションの編集
export async function editCollection(_state: CollectionFormState, formData: FormData): Promise<CollectionFormState> {
  const collectionId = formData.get('collectionId') as string;

  // フォームデータを検証
  const validatedFields = CollectionFormSchema.safeParse({
    collectionId,
    name: formData.get('name'),
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, description } = validatedFields.data;

  try {
    const res = await apiClient.put(`/api/admin/collections/${collectionId}`, {
      name,
      description,
    });


    if (res.status === 404) {
      return { success: false, errors: { general: ['コレクションが見つかりません'] } };
    }

    if (res.status === 200) {
      return { success: true, errors: {} };
    }
    
  } catch (error) {
    console.error('コレクション編集エラー:', error);
    return {
      success: false,
      errors: {
        general: ['コレクションの編集に失敗しました'],
      },
    };
  }

  // デフォルトの戻り値を追加
  return {
    success: false,
    errors: {
      general: ['予期しないエラーが発生しました'],
    },
  };
}

export async function deleteCollection(collectionId: string): Promise<{ success: boolean, errors?: { general: string[] } }> {
  try {
    const res = await apiClient.delete(`/api/admin/collections/${collectionId}`);
    if (res.status === 200) {
      return { success: true };
    }
    if (res.status === 404) {
      return { success: false, errors: { general: ['コレクションが見つかりません'] } };
    }
    return { success: false, errors: { general: ['コレクションの削除に失敗しました'] } };
  } catch {
    return { success: false, errors: { general: ['コレクションの削除に失敗しました'] } };
  }

  // デフォルトの戻り値を追加
  return { success: false, errors: { general: ['予期しないエラーが発生しました'] } };
}