import mongoose, { Schema, Document } from 'mongoose';
// Question 型をエクスポート
export interface Question extends Document {
  _id: string;
  title: string;
  difficulty: string;
  content: string;
  sampleCode: string;
  answerCode: number;
  explanation: string;
  options: { number: number; text: string }[];
  tags: string[];
  collectionId: mongoose.Schema.Types.ObjectId; // Collection との関連付け
  createdAt: Date;
}