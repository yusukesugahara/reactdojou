import express, { Request, Response,  NextFunction } from "express";
import mongoose from "mongoose";
import { decodeJwt } from 'jose';
import Collection from "../models/Collection";
import Question from "../models/Question";
import Progress from '../models/Progress';

const router = express.Router();

router.get('/', async (req: Request, res: Response): Promise<void> =>  {
  try {
    const user = decodeJwt(req.cookies?.authToken || '');
    const userId = user.id;
    if (!userId) {
      res.status(401).json({ message: 'ログインしてください' });
      return;
    }

    // 全コレクション(問題集)を取得
    const collections = await Collection.find();

    // 各問題集に対する進捗＆周回数を取得
    const result = await Promise.all(
      collections.map(async (collection) => {
        const currentProgress = await Progress.findOne({
          userId,
          collectionId: collection._id,
          completed: false,
        });

        const timesCompleted = await Progress.countDocuments({
          userId,
          collectionId: collection._id,
          completed: true,
        });

        const totalQuestions = collection.questions?.length || 0;
        const completedQuestions = currentProgress?.completedQuestions || 0;

        return {
          id: collection._id,
          name: collection.name,
          description: collection.description,
          currentIndex: currentProgress?.currentIndex || 1,
          completed: currentProgress?.completed || false,
          timesCompleted,
          totalQuestions,
          completedQuestions
        };
      })
    );

    res.json(result);
  } catch (error) {
    console.error('問題集の取得エラー:', error);
    res.status(500).json({ message: '問題集の取得に失敗しました' });
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

export default router; 
