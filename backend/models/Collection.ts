import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema({
  name: { type: String, required: true }, // 問題集名
  description: String, // 問題集の説明
  currentIndex: { type: Number, default: 1 },
  completed: { type: Boolean, default: false },
  timesCompleted: { type: Number, default: 0 },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
});

export default mongoose.model('Collection', collectionSchema);
