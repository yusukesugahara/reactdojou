const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // CORS をインポート
const authRoutes = require('./routes/auth');
const questionRoutes = require('./routes/questions');
const collectionRoutes = require('./routes/collections');
require('dotenv').config();

const app = express();

// CORS 設定
app.use(cors({
  origin: 'http://localhost:3000', // フロントエンドのURL
  credentials: true, // クッキーや認証情報を含むリクエストを許可
}));

// ミドルウェア
app.use(express.json());

// MongoDB 接続
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDBに接続されました'))
  .catch((err) => console.error('MongoDB接続エラー:', err));

// ルート
app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/collections', collectionRoutes);


// サーバー起動
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`サーバーがポート${PORT}で起動しました`);
});
