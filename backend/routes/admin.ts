  import express, { Request, Response, NextFunction } from "express";
  import Collection from "../models/Collection";
  import jwt from "jsonwebtoken";
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
      const token = jwt.sign({ email: admin_user_email }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
      res.status(200).json({ message: "ログイン成功", token });
    }
  });



  router.get("/admin/dashboard", async (req: Request, res: Response, next: NextFunction) => {
    const collections = await Collection.find();
    res.status(200).json(collections);
  });

  router.post("/admin/collections", async (req: Request, res: Response, next: NextFunction) => {
    const { name, description } = req.body;
    const collection = new Collection({ name, description });
    await collection.save();
    if (!collection) {
      res.status(400).json({ message: "コレクションの作成に失敗しました" });
      return;
    }
    res.status(200).json(collection);
  });

  router.get("/admin/collections/:collectionId", async (req: Request, res: Response, next: NextFunction) => {
    const { collectionId } = req.params;
    const collection = await Collection.findById(collectionId);
    if (!collection) {
      res.status(404).json({ message: "コレクションが見つかりません" });
      return;
    }
    res.status(200).json(collection);
  });

  router.put("/admin/collections/:collectionId", async (req: Request, res: Response, next: NextFunction) => {
    const { collectionId } = req.params;
    const { name, description } = req.body;
    const collection = await Collection.findByIdAndUpdate(collectionId, { name, description });
    if (!collection) {
      res.status(404).json({ message: "コレクションが見つかりません" });
      return;
    }
    if (collection) {
      res.status(200).json(collection);
    }
  }); 

  router.delete("/admin/collections/:collectionId", async (req: Request, res: Response, next: NextFunction) => {
    const { collectionId } = req.params;
    const collection = await Collection.findByIdAndDelete(collectionId);
    if (!collection) {
      res.status(404).json({ message: "コレクションが見つかりません" });
      return;   
    }
    res.status(200).json({ message: "コレクションが削除されました" });
  });

  export default router;
