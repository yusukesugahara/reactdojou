const nodeEnv = process.env.NODE_ENV;

// クライアントサイドとサーバーサイドで異なる値を使用
export const getBackendUrl = () => {
  if (nodeEnv === 'development') {
    // サーバーサイドレンダリング時はコンテナ名を使用
    if (typeof window === 'undefined') {
      return process.env.BACKEND_URL;
    }
    // ブラウザからのアクセス時はホスト名を使用
    return process.env.NEXT_PUBLIC_BACKEND_URL ;
  } else {
    return process.env.NEXT_PUBLIC_BACKEND_URL ;
  }
}; 

