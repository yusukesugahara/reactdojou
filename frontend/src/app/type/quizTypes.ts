// URL パラメータの型定義
// 'Params' の行を削除

export type QuizPageProps = {
  // params が Promise<Params> として渡される場合
  params: {
    collectionId: string;
  };
};

// 各選択肢の型定義
export type Option = {
  number: number;
  text: string;
};

// 問題の型定義
export interface Question {
  _id: string;
  title: string;
  content: string;
  options: Option[];
  sampleCode?: string;
  explanation?: string;
  collectionName?: string;
  isCorrect?: boolean;
}
