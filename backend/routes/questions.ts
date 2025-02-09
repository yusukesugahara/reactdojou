import express, { Request, Response,  NextFunction } from "express";

import mongoose from "mongoose";
import Question from '../models/Question';
import Collection from '../models/Collection';
const router = express.Router();

// ランダムな問題を取得
router.get('/random', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { collectionId } = req.query;
  
  try {
    // collectionId の検証
    if (!mongoose.Types.ObjectId.isValid(collectionId as string)) {
      res.status(400).json({ message: '無効なコレクションIDです' });
      return;
    }

    // コレクションの取得
    const collection = await Collection.findById(new mongoose.Types.ObjectId(collectionId as string));
    if (!collection) {
      res.status(404).json({ message: 'コレクションが見つかりませんでした' });
      return;
    }

    // ランダムな問題を取得
    const randomQuestion = await Question.aggregate([
      { $match: { collectionId: new mongoose.Types.ObjectId(collectionId as string) } },
      { $sample: { size: 1 } },
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


router.post('/:id/submit', async (req: Request, res: Response, next: NextFunction): Promise<void> =>{
  const { id } = req.params;
  const { answer } = req.body;

  try {
    const question = await Question.findById(id);

    if (!question) {
      res.status(404).json({ message: '問題が見つかりませんでした' });
      return;
    }

    const isCorrect = question.answerCode === parseInt(answer, 10);

    res.json({ 
      correct: isCorrect,
      correctNumber: question.answerCode,
    });
  } catch (error) {
    console.error('正解判定エラー:', error);
    res.status(500).json({ message: '正解判定に失敗しました' });
  }
});




module.exports = router;
