import express, { Request, Response, NextFunction } from "express";


const router = express.Router();

router.get("/admin/auth/login", async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "メールアドレスとパスワードを入力してください" });
    return;
  }
  const admin_user_email = process.env.admin_user_email;
  const admin_user_password = process.env.admin_user_password;
  
  if (email !== admin_user_email || password !== admin_user_password) {
    res.status(400).json({ message: "メールアドレスまたはパスワードが間違っています" });
    return;
  }

  if (email === admin_user_email && password === admin_user_password) {
    res.status(200).json({ message: "ログイン成功" });
  }
});

export default router;


