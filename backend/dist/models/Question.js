"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// サブスキーマ定義: { number, text } の形
const OptionSchema = new mongoose_1.default.Schema({
    number: { type: Number, required: true },
    text: { type: String, required: true },
}, { _id: false } // サブドキュメントに _id を付与しない設定
);
const QuestionSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Collection',
        required: true
    },
    createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose_1.default.model('Question', QuestionSchema);
