import express, { Request, Response,  NextFunction } from "express";
import mongoose from "mongoose";
import { decodeJwt } from 'jose';
import Question from '../models/Question';
import Collection from '../models/Collection';
import Progress from '../models/Progress';
import Result from '../models/Result';
const router = express.Router();


/**
 * GET /questions/:collectionId?userId=xxx
 * 
 * - 指定コレクションIDに対し、ユーザーの進捗があるか確認
 * - なければ新規に作成し、最初の問題を返す
 * - あれば currentIndex の問題を返し、次の問題へ進める (currentIndex++)
 * - 全問題を解き終わったら completed=true
 */
router.get('/:collectionId', async (req: Request, res: Response): Promise<void> => {
  try {
    const { collectionId } = req.params;
    const user = decodeJwt(req.cookies?.authToken || '');
    const userId = user.id;

    if (!userId) {
      res.status(400).json({ message: 'userIdが必要です' });
      return ;
    }

    // MongoDB の ObjectId として有効かチェック
    if (!mongoose.Types.ObjectId.isValid(collectionId)) {
      res.status(400).json({ message: '無効なコレクションIDです' });
      return ;
    }

    // 対象の問題集が存在するか確認 (任意)
    const collection = await Collection.findById(collectionId);
    if (!collection) {
      res.status(404).json({ message: '問題集が見つかりません' });
      return ;
    }

    // 1) Progress を検索 (未完了のもの)
    let progress = await Progress.findOne({
      userId,
      collectionId,
      completed: false,
    });

    if (!progress) {
      // 2) なければ新規作成 (問題をシャッフルして最初の問題を返す想定)
      const questions = await Question.find({ collectionId }).select('_id');
      if (questions.length === 0) {
        res.status(404).json({ message: '問題が存在しません' });
        return ;
      }

      // 必ず100問とする運用であれば判定は省略可。ここでは省いている。
      // ランダムシャッフル
      const questionIds = questions.map(q => q._id.toString());
      questionIds.sort(() => Math.random() - 0.5);

      progress = await Progress.create({
        userId,
        collectionId,
        questionOrder: questionIds,
        currentIndex: 0,
        completed: false,
      });

      // 最初の問題 => currentIndex=0 の問題を返す
      const firstQuestionId = progress.questionOrder[0];
      const firstQuestion = await Question.findById(firstQuestionId);
      // 次に備えて currentIndex を進める
      progress.currentIndex = 1;
      // まだ完了ではない
      await progress.save();

      res.json({
        success: true,
        completed: progress.completed,
        progress,
        question: firstQuestion,
      });
      return ;
    }

    // 3) Progress がすでにある場合 => 次の問題を返す
    // currentIndex の問題を取得 (現状の値を参照)
    if (progress.currentIndex >= progress.questionOrder.length) {
      // もう全問題解き終わっている状態 (まだ completed が false かもしれない)
      progress.completed = true;
      await progress.save();
      res.json({
        success: true,
        completed: true,
        progress,
        question: null,
        message: '全ての問題が終了しています',
      });
      return ;
    }

    // 現在のインデックスに該当する問題を取得
    const currentQuestionId = progress.questionOrder[progress.currentIndex];
    const currentQuestion = await Question.findById(currentQuestionId);

    if (!currentQuestion) {
      // DB不整合など
      progress.completed = true;
      await progress.save();
      res.status(404).json({ message: '問題が見つかりません' });
      return ;
    }

    // 次に備えて currentIndexを一つ進める
    progress.currentIndex += 1;
    // 全問題に到達した場合、completed=true
    if (progress.currentIndex >= progress.questionOrder.length) {
      progress.completed = true;
    }
    await progress.save();

    // 取得した問題を返す
    res.json({
      success: true,
      completed: progress.completed,
      progress,
      collection,
      question: currentQuestion,
    });
    return ;
  } catch (error) {
    console.error('次の問題取得エラー:', error);
    res.status(500).json({ message: '次の問題取得に失敗しました' });
  }
});

router.post('/submit', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { answer, userId, questionId } = req.body;

  try {
    const question = await Question.findById(questionId);

    if (!question) {
      res.status(404).json({ message: '問題が見つかりませんでした' });
      return;
    }

    const isCorrect = question.answerCode === parseInt(answer, 10);

    // 成績をデータベースに記録
    const result = new Result({ userId, questionId, isCorrect });
    await result.save();

    res.json({
      message: "回答が記録されました",
      isCorrect,
      correctNumber: question.answerCode,
    });

  } catch (error) {
    console.error('正解判定エラー:', error);
    res.status(500).json({ message: '正解判定に失敗しました' });
  }
});


export default router; 