import express, { Request, Response,  NextFunction } from "express";
import mongoose from "mongoose";
const Collection = require('../models/Collection');
const Question = require('../models/Question');

const router = express.Router();

type Collection = {
  _id: string;
  name: string;
  description: string,
  count: number,
}

// 問題集一覧を取得
router.get('/', async (req, res) => {
  try {
    const collections = await Collection.find();

    // 各問題集に属する問題数をカウント
    const result = await Promise.all(
      collections.map(async (collection: Collection) => {
        const count = await Question.countDocuments({ collectionId: collection._id });
        return {
          id: collection._id,
          name: collection.name,
          description: collection.description,
          count,
        };
      })
    );

    res.json(result);
  } catch (error) {
    console.error('問題集の取得エラー:', error);
    res.status(500).json({ message: '問題集の取得に失敗しました' });
  }
});


// ランダムな問題を取得
router.get('/random', async (req: Request, res: Response): Promise<void> => {
  const { collectionId } = req.query;

  try {
    // collectionId の検証
    if (!mongoose.Types.ObjectId.isValid(collectionId as string)) {
      res.status(400).json({ message: '無効なコレクションIDです' });
      return;
    }

    // ランダムな問題を取得
    const randomQuestion = await Question.aggregate([
      { $match: { collectionId: new mongoose.Types.ObjectId(collectionId as string) } }, // コレクションIDでフィルタ
      { $sample: { size: 1 } }, // ランダムに1件を取得
    ]);

    if (randomQuestion.length === 0) {
      res.status(404).json({ message: '問題が見つかりませんでした' });
      return;
    }

    res.json(randomQuestion[0]);
  } catch (error) {
    console.error('ランダム問題の取得エラー:', error);
    res.status(500).json({ message: '問題の取得に失敗しました' });
  }
});



// 回答を送信して正誤を返す
router.post('/:collectionId/questions/:questionId/submit', async (req: Request, res: Response): Promise<void> => {
  const { questionId } = req.params;
  const { answer } = req.body;

  try {
    const question = await Question.findById(questionId);
    if (!question) {
      res.status(404).json({ message: '問題が見つかりません' });
      return;
    }

    const isCorrect = question.answerCode === answer;
    res.json({
      correct: isCorrect,
      correctAnswer: question.answerCode,
    });
  } catch (error) {
    console.error('回答送信エラー:', error);
    res.status(500).json({ message: '回答の送信に失敗しました' });
  }
});

module.exports = router;
