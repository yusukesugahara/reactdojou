export const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export const apiClient = {
  get: async (url: string, options: RequestInit = {}) => {
    const res = await fetch(url, {
      ...options,
      method: 'GET',
    });
    return handleResponse(res);
  },

  post: async (url: string, body: Record<string, unknown>, options: RequestInit = {}) => {
    const res = await fetch(url, {
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(body),
    });
    return handleResponse(res);
  },

  // 他のHTTPメソッドも必要に応じて追加
};

async function handleResponse(res: Response) {
  if (!res.ok) {
    const error = await res.json();
    return { success: false, error: error.message || 'APIリクエストに失敗しました' };
  }
  return res.json();
}