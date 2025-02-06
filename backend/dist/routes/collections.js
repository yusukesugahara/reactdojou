"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const Collection = require('../models/Collection');
const Question = require('../models/Question');
const router = express_1.default.Router();
// 問題集一覧を取得
router.get('/', async (req, res) => {
    try {
        const collections = await Collection.find();
        // 各問題集に属する問題数をカウント
        const result = await Promise.all(collections.map(async (collection) => {
            const count = await Question.countDocuments({ collectionId: collection._id });
            return {
                id: collection._id,
                name: collection.name,
                description: collection.description,
                count,
            };
        }));
        res.json(result);
    }
    catch (error) {
        console.error('問題集の取得エラー:', error);
        res.status(500).json({ message: '問題集の取得に失敗しました' });
    }
});
// ランダムな問題を取得
router.get('/random', async (req, res) => {
    const { collectionId } = req.query;
    try {
        // collectionId の検証
        if (!mongoose_1.default.Types.ObjectId.isValid(collectionId)) {
            return res.status(400).json({ message: '無効なコレクションIDです' });
        }
        // ランダムな問題を取得
        const randomQuestion = await Question.aggregate([
            { $match: { collectionId: new mongoose_1.default.Types.ObjectId(collectionId) } }, // コレクションIDでフィルタ
            { $sample: { size: 1 } }, // ランダムに1件を取得
        ]);
        if (randomQuestion.length === 0) {
            return res.status(404).json({ message: '問題が見つかりませんでした' });
        }
        res.json(randomQuestion[0]);
    }
    catch (error) {
        console.error('ランダム問題の取得エラー:', error);
        res.status(500).json({ message: '問題の取得に失敗しました' });
    }
});
// 回答を送信して正誤を返す
router.post('/:collectionId/questions/:questionId/submit', async (req, res) => {
    const { questionId } = req.params;
    const { answer } = req.body;
    try {
        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({ message: '問題が見つかりません' });
        }
        const isCorrect = question.answerCode === answer;
        res.json({
            correct: isCorrect,
            correctAnswer: question.answerCode,
        });
    }
    catch (error) {
        console.error('回答送信エラー:', error);
        res.status(500).json({ message: '回答の送信に失敗しました' });
    }
});
module.exports = router;
