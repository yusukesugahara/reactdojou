import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// ルートの型定義 (Express.Router) を想定
const authRoutes = require('./routes/auth');
const questionRoutes = require('./routes/questions');
const collectionRoutes = require('./routes/collections');

// .env の読み込み
dotenv.config();

const app = express();
console.log(process.env.FRONTEND_URL)
// CORS 設定
app.use(
  cors({
    origin: process.env.FRONTEND_URL, 
    credentials: true,
  })
);

// JSON ボディパーサー
app.use(express.json());

// MongoDB 接続
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error("MONGODB_URIが定義されていません");
  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(() => console.log("MongoDBに接続されました"))
  .catch((err) => console.error("MongoDB接続エラー:", err));

// ルート設定
app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/collections", collectionRoutes);

// サーバー起動
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`サーバーがポート${PORT}で起動しました`);
});