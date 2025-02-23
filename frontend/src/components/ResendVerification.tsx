import React, { useState } from 'react';
import { authService } from '../services/auth';

export const ResendVerification: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    try {
      await authService.resendVerification(email);
      setStatus('success');
      setMessage('認証メールを再送信しました。メールをご確認ください。');
    } catch (error) {
      setStatus('error');
      setMessage('認証メールの再送信に失敗しました。');
    }
  };

  return (
    <div className="resend-verification">
      <h2>認証メール再送信</h2>
      <form onSubmit={handleResend}>
        <div>
          <label htmlFor="email">メールアドレス:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button 
          type="submit" 
          disabled={status === 'sending'}
        >
          {status === 'sending' ? '送信中...' : '再送信'}
        </button>
      </form>
      {message && (
        <p className={`message ${status}`}>{message}</p>
      )}
    </div>
  );
}; 