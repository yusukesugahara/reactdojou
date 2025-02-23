import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authService } from '../services/auth';

export const EmailVerification: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState('メールアドレスを確認中...');

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    }
  }, [token]);

  const verifyEmail = async (verificationToken: string) => {
    try {
      const response = await authService.verifyEmail(verificationToken);
      setStatus('success');
      setMessage('メールアドレスが確認されました');
      setTimeout(() => router.push('/login'), 3000);
    } catch (error) {
      setStatus('error');
      setMessage('メールアドレスの確認に失敗しました');
    }
  };

  return (
    <div className="email-verification">
      <h2>メール認証</h2>
      <div className={`status ${status}`}>
        <p>{message}</p>
        {status === 'error' && (
          <button onClick={() => router.push('/login')}>
            ログインページへ戻る
          </button>
        )}
      </div>
    </div>
  );
}; 