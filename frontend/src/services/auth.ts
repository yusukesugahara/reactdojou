// 認証関連のAPI呼び出しを管理するサービス
export const authService = {
  // メールアドレス認証
  verifyEmail: async (token: string) => {
    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
      return await response.json();
    } catch {
      throw new Error('メール認証に失敗しました');
    }
  },

  // 認証メールの再送信
  resendVerification: async (email: string) => {
    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      return await response.json();
    } catch {
      throw new Error('認証メールの再送信に失敗しました');
    }
  },
};