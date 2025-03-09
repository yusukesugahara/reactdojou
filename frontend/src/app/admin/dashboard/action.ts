import { cookies } from 'next/headers';
import { apiClient } from '@/app/lib/apiClient';

export async function getCollections() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get('authToken');

  const res = await apiClient.get('/api/admin/dashboard', {
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `authToken=${authToken?.value || ''}`
    }
  });

  if (res.status === 500 || res.status === 401) {
    throw new Error('問題集の取得に失敗しました');
  }

  return res.json();
}   