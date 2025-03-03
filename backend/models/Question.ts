import mongoose, { Schema, Document } from 'mongoose';

// サブスキーマ定義: { number, text } の形
const OptionSchema = new mongoose.Schema(
  {
    number: { type: Number, required: true },
    text: { type: String, required: true },
  },
  { _id: false } // サブドキュメントに _id を付与しない設定
);

export interface Question extends Document {
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

const QuestionSchema = new Schema<Question>({
  title: { type: String, required: true },
  difficulty: { type: String, required: true },
  content: { type: String, required: true },
  sampleCode: { type: String },
  answerCode: { type: Number, required: true }, // 正解は数字で持つなら Number
  explanation: { type: String, required: true },
  options: {
    type: [OptionSchema], // ← ここを [String] から [OptionSchema] に変更
    required: true,
  },
  tags: { type: [String], default: [] },
  collectionId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Collection',
    required: true 
  },
  createdAt: { type: Date, default: Date.now },
});

const QuestionModel = mongoose.model<Question>('Question', QuestionSchema);
export default QuestionModel;
