import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
  isCorrect: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Result = mongoose.model("Result", resultSchema);

export default Result;
