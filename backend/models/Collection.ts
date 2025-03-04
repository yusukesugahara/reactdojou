import mongoose, { Schema, Document } from 'mongoose';
import { Question } from '../type/question'; // デフォルトエクスポートとしてインポート

interface Collection extends Document {
  name: string;
  description: string;
  currentIndex: number;
  completed: boolean;
  timesCompleted: number;
  questions: Array<Question>; // ここで Question 型を使用
}

const collectionSchema = new Schema<Collection>({
  name: { type: String, required: true }, // 問題集名
  description: { type: String, required: true }, // 問題集の説明
  currentIndex: { type: Number, default: 1 },
  completed: { type: Boolean, default: false },
  timesCompleted: { type: Number, default: 0 },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }], // Question 型を参照
});

const CollectionModel = mongoose.model<Collection>('Collection', collectionSchema);
export default CollectionModel;
