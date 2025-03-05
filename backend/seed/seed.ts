const mongoose = require('mongoose');
import Question from '../models/Question';
import Collection from '../models/Collection';

require('dotenv').config();

import ReactBeginner from './problemsReactBeginner';
import ReactIntermediate from './problemsReactIntermediate';
import ReactAdvanced from './problemsReactAdvanced';


const questions = [
  ...ReactBeginner,
  ...ReactIntermediate,
  ...ReactAdvanced,
];

// MongoDB接続
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('MongoDBに接続されました');
  } catch {
    console.error('MongoDB接続エラー:');
    process.exit(1);
  }
}

async function seedDatabase() {
  await connectDB();

  console.log(ReactBeginner.length);
  console.log(ReactIntermediate.length);
  console.log(ReactAdvanced.length);

  try {
    // 既存データの削除
    await Collection.deleteMany({});
    await Question.deleteMany({});
    console.log('既存データを削除しました');

    // 問題集データ（カテゴリー）
    const collections = [
      {
        name: 'React 初級',
        description: 'Reactの基本的な内容を学べる問題集です。'
      },
      {
        name: 'React 中級',
        description: 'Reactフックや状態管理など中級的なトピックを学べる問題集です。'
      },
      {
        name: 'React 上級',
        description: 'パフォーマンス最適化やSSRなど高度なトピックを学べる問題集です。'
      },
    ];

    const insertedCollections = await Collection.insertMany(collections);
    console.log('問題集を挿入しました:', insertedCollections);

    // 問題データに collectionId を追加
    const questionsWithCollectionIds = questions.map((question) => {
      const collection = insertedCollections.find((col) => col.name === question.collectionName);
      if (!collection) {
        throw new Error(`コレクションが見つかりません: ${question.collectionName}`);
      }
      return {
        ...question,
        collectionId: collection._id,
      };
    });

    await Question.insertMany(questionsWithCollectionIds);
    console.log('問題を挿入しました');
  } catch {
    console.error('データ挿入エラー:');
  } finally {
    mongoose.connection.close();
    console.log('MongoDB接続を終了しました');
  }
}

seedDatabase();
