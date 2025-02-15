import express, { Request, Response } from "express";
import Result from "../models/Result";
import Question from "../models/Question";
import Collection from "../models/Collection";

const router = express.Router();

// 🔹 成績集計API（月ごと & 全期間）
router.post("/", async (req: Request, res: Response): Promise<void> =>  {
  try {
    const {userId} = req.body;

    if (!userId) {
      res.status(401).json({ message: "認証されていません" });
      return;
    }

    // 成績データ取得
    const results = await Result.find({ userId })
      .populate({
        path: "questionId",
        select: "title collectionId",
        populate: { path: "collectionId", select: "name" },
      })
      .lean()
      .sort({ createdAt: -1 });

    // **データを月ごと & 全期間で整理**
    const monthlyStats: { [key: string]: any } = {};
    const totalStats = {
      total: 0,
      correct: 0,
      collections: {} as Record<string, { total: number; correct: number }>,
    };

    results.forEach((result) => {
      const date = new Date(result.createdAt);
      const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`;

      const collection = (result.questionId as any).collectionId as { name?: string };
      const collectionName = collection?.name || "未分類";

      // **月ごとのデータを作成**
      if (!monthlyStats[monthKey]) {
        monthlyStats[monthKey] = {
          total: 0,
          correct: 0,
          collections: {},
        };
      }

      if (!monthlyStats[monthKey].collections[collectionName]) {
        monthlyStats[monthKey].collections[collectionName] = { total: 0, correct: 0 };
      }

      // **全期間のデータを作成**
      if (!totalStats.collections[collectionName]) {
        totalStats.collections[collectionName] = { total: 0, correct: 0 };
      }

      // **データを集計**
      monthlyStats[monthKey].total += 1;
      totalStats.total += 1;

      monthlyStats[monthKey].collections[collectionName].total += 1;
      totalStats.collections[collectionName].total += 1;

      if (result.isCorrect) {
        monthlyStats[monthKey].correct += 1;
        totalStats.correct += 1;

        monthlyStats[monthKey].collections[collectionName].correct += 1;
        totalStats.collections[collectionName].correct += 1;
      }
    });

    res.json({ monthlyStats, totalStats });
  } catch (error) {
    console.error("成績集計エラー:", error);
    res.status(500).json({ message: "成績集計に失敗しました" });
  }
});

export default router; 
