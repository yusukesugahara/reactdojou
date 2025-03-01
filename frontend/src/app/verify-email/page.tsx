'use client'

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { verifyEmail } from './actions';

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>読み込み中...</div>}>
      <VerifyEmailContent />
    </Suspense>
  )
}

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    const token = searchParams.get('token');
    
    const verify = async () => {
      if (!token) {
        setVerificationStatus('error');
        return;
      }

      const result = await verifyEmail(token);
      
      if (result.success) {
        setVerificationStatus('success');
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } else {
        setVerificationStatus('error');
      }
    };

    verify();
  }, [searchParams, router]);

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      {verificationStatus === 'loading' && (
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent" />
      )}

      {verificationStatus === 'success' && (
        <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-md">
          <h3 className="font-bold mb-2">メール認証完了</h3>
          <p>メールアドレスの認証が完了しました。まもなくログインページへ移動します。</p>
        </div>
      )}

      {verificationStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-md">
          <h3 className="font-bold mb-2">認証エラー</h3>
          <p>メールアドレスの認証に失敗しました。<br />
          リンクの有効期限が切れているか、すでに認証済みの可能性があります。</p>
        </div>
      )}
    </div>
  );
}