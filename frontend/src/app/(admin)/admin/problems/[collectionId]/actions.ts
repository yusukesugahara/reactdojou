'use server';

import { apiClient } from '@/app/lib/apiClient';

interface ProblemFormState {
  errors?: {
    general?: string[];
  };
  success?: boolean;
}

export const createProblem = async (_state: ProblemFormState, formData: FormData) => {
  const problem = formData.get('problem');
  const collectionId = formData.get('collectionId');
  if (!problem || !collectionId) {
    return {
      errors: {
        general: ['問題を入力してください'],
      },
    };
  }

  const res = await apiClient.post('/api/admin/problems', {
    problem,
    collectionId,
  });

  if (res.status === 400) {
    return {
      errors: {
        general: ['問題の登録に失敗しました'],
      },
    };
  }

  if (res.status === 200) {
    return {
      success: true,
      errors: {
        general: [],
      },
    };
  } 

  return {
    success: false,
    errors: {
      general: ['問題の登録に失敗しました'],
    },
  };
};
