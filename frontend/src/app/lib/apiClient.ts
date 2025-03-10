export const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';

export const apiClient = {
  get: async (url: string, options: RequestInit = {}) => {
    const res = await fetch(backendUrl + url, {
      ...options,
      method: 'GET',
    });
    return handleResponse(res);
  },

  post: async (url: string, body: Record<string, unknown>, options: RequestInit = {}) => {
    const res = await fetch(backendUrl + url, {
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

  put: async (url: string, body: Record<string, unknown>, options: RequestInit = {}) => {
    const res = await fetch(backendUrl + url, {
      ...options,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(body),
    });
    return handleResponse(res);
  },

  delete: async (url: string, options: RequestInit = {}) => {
    const res = await fetch(backendUrl + url, {
      ...options,
      method: 'DELETE',
    });
    return handleResponse(res);
  },
};

async function handleResponse(res: Response) {
  if (!res.ok) {
    const error = await res.json();
    return { success: false, error: error.message || 'APIリクエストに失敗しました' };
  }
  return res.json();
}