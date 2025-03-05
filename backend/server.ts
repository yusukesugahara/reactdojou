import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// ルート
import authRoutes from "./routes/auth";
import questionRoutes from "./routes/questions";
import collectionRoutes from "./routes/collections";
import resultsRoutes from "./routes/results";

dotenv.config();

const app = express();

// CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000", // .env などに定義
    credentials: true,
  })
);

// 解析
app.use(express.json());
app.use(cookieParser());

// DB接続
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
app.use("/api/results", resultsRoutes);

// ローカル開発環境でのみサーバーを起動
if (process.env.NODE_ENV !== 'production') {
  const PORT = 5000;
  app.listen(PORT, () => {
    console.log(`サーバーがポート${PORT}で起動しました`);
  });
}

// 重要: Vercelのサーバーレス環境用にアプリケーションをエクスポート
export default app;