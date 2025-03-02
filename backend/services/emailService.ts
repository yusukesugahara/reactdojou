import transporter from '../config/mail';

export class EmailService {
  async sendVerificationEmail(email: string, token: string) {
    const verificationUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/verify-email?token=${token}`;

    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@example.com',
      to: email,
      subject: 'メールアドレスの確認',
      html: `
        <h1>メールアドレスの確認</h1>
        <p>以下のリンクをクリックしてメールアドレスを確認してください：</p>
        <a href="${verificationUrl}">メールアドレスを確認する</a>
        <p>このリンクは24時間有効です。</p>
      `
    });
  }

  async sendPasswordResetEmail(email: string, token: string) {
    const resetLink = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/forgot-password/confirm?token=${token}`;
    
    const mailOptions = {
      from: process.env.NEXT_PUBLIC_GMAIL_USER,
      to: email,
      subject: 'パスワードリセットのご案内',
      html: `
        <h2>パスワードリセットのリクエスト</h2>
        <p>以下のリンクをクリックしてパスワードをリセットしてください：</p>
        <a href="${resetLink}">パスワードをリセット</a>
        <p>このリンクは24時間有効です。</p>
        <p>リクエストした覚えがない場合は、このメールを無視してください。</p>
      `
    };

    return await transporter.sendMail(mailOptions);
  }
} 