const express = require('express');
const mongoose = require('mongoose');
const Question = require('../models/Question');
const Collection = require('../models/Collection');
const router = express.Router();

// ランダムな問題を取得
router.get('/random', async (req, res) => {
  const { collectionId } = req.query;

  try {
    // collectionId を ObjectId に変換
    const objectId = mongoose.Types.ObjectId.isValid(collectionId)
      ? new mongoose.Types.ObjectId(collectionId)
      : null;

    if (!objectId) {
      return res.status(400).json({ message: '無効なコレクションIDです' });
    }

    const collection = await Collection.findById(objectId);

    if (!collection) {
      return res.status(404).json({ message: 'コレクションが見つかりませんでした' });
    }

    // ランダムな問題を取得
    const randomQuestion = await Question.aggregate([
      { $match: { _id: { $in: collection.questionIds } } },
      { $sample: { size: 1 } },
    ]);

    if (randomQuestion.length === 0) {
      return res.status(404).json({ message: '問題が見つかりませんでした' });
    }

    res.json(randomQuestion[0]);
  } catch (error) {
    console.error('ランダム問題の取得エラー:', error);
    res.status(500).json({ message: '問題の取得に失敗しました' });
  }
});


// 質問リストを取得
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });
    res.json(questions);
  } catch (error) {
    console.error('質問の取得エラー:', error);
    res.status(500).json({ message: '質問の取得に失敗しました' });
  }
});

module.exports = router;


router.post('/:id/submit', async (req, res) => {
  const { id } = req.params;
  const { answer } = req.body;

  try {
    const question = await Question.findById(id);

    if (!question) {
      return res.status(404).json({ message: '問題が見つかりませんでした' });
    }

    const isCorrect = question.answerCode === parseInt(answer, 10);

    res.json({ correct: isCorrect });
  } catch (error) {
    console.error('正解判定エラー:', error);
    res.status(500).json({ message: '正解判定に失敗しました' });
  }
});




module.exports = router;
