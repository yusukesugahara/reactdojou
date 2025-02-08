import mongoose from "mongoose";

const CollectionSchema = new mongoose.Schema({
  name: { type: String, required: true }, // 問題集名
  description: { type: String }, // 問題集の説明
});

export default mongoose.model('Collection', CollectionSchema);
