import nodemailer from 'nodemailer';
import 'dotenv/config';

const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.NEXT_PUBLIC_GMAIL_USER,
    pass: process.env.NEXT_PUBLIC_GMAIL_PASSWORD
  },
  // 開発環境での証明書エラーを回避
  tls: {
    rejectUnauthorized: false
  }
});

// 接続テスト
transporter.verify((error, success) => {
  if (error) {
    console.log('SMTP設定エラー:', error);
  } else {
    console.log('SMTP設定OK: メール送信の準備完了');
  }
});

export default transporter; 