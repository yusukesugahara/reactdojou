"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
// ルートの型定義 (Express.Router) を想定
const authRoutes = require('./routes/auth');
const questionRoutes = require('./routes/questions');
const collectionRoutes = require('./routes/collections');
// .env の読み込み
dotenv_1.default.config();
const app = (0, express_1.default)();
// CORS 設定
app.use((0, cors_1.default)({
    origin: process.env.BACKEND_URL,
    credentials: true,
}));
// JSON ボディパーサー
app.use(express_1.default.json());
// MongoDB 接続
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
    console.error("MONGODB_URIが定義されていません");
    process.exit(1);
}
mongoose_1.default
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
