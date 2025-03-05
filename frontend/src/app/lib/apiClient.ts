export const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export const apiClient = {
  get: async (url: string, options: RequestInit = {}) => {
    const response = await fetch(url, {
      ...options,
      method: 'GET',
    });
    return handleResponse(response);
  },

  post: async (url: string, body: Record<string, unknown>, options: RequestInit = {}) => {
    const response = await fetch(url, {
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(body),
    });
    return handleResponse(response);
  },

  // 他のHTTPメソッドも必要に応じて追加
};

async function handleResponse(response: Response) {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'APIリクエストに失敗しました');
  }
  return response.json();
} 