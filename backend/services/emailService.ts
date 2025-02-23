import transporter from '../config/mail';

export class EmailService {
  async sendVerificationEmail(email: string, token: string) {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

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
} 