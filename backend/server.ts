import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"; // ← 追加

// ルート
const authRoutes = require("./routes/auth");
const questionRoutes = require("./routes/questions");
const collectionRoutes = require("./routes/collections");

dotenv.config();

const app = express();

// CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // .env などに定義
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`サーバーがポート${PORT}で起動しました`);
});
