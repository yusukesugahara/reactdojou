"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CollectionSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true }, // 問題集名
    description: { type: String }, // 問題集の説明
});
module.exports = mongoose_1.default.model('Collection', CollectionSchema);
