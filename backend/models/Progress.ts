import mongoose, { Schema } from 'mongoose';

export type IProgress = {
  userId: string;          // ユーザーID
  collectionId: string;    // 問題集ID
  questionOrder: string[]; // 問題ID配列(ランダム順)
  currentIndex: number;
  completed: boolean;
  completedQuestions: number;
}

const ProgressSchema = new Schema<IProgress>({
  userId: { type: String, required: true },
  collectionId: { type: String, required: true },
  questionOrder: [{ type: String }],
  currentIndex: { type: Number, default: 0 },
  completed: { type: Boolean, default: false },
  completedQuestions: { type: Number, default: 0 },
});

export default mongoose.model('Progress', ProgressSchema);
