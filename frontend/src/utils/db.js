import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

if (!uri) {
  throw new Error('MONGODB_URI 環境変数が設定されていません');
}

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // 開発環境ではクライアントをグローバルに保存
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // 本番環境ではクライアントを新しく作成
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function connectToDatabase() {
  const client = await clientPromise;
  return client.db(); // デフォルトのデータベースオブジェクトを返す
}
