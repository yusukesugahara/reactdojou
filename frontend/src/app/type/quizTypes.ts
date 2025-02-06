// URL パラメータの型定義
type Params = {
  collectionId: string;
};

export type QuizPageProps = {
  // params が Promise<Params> として渡される場合
  params: Promise<Params>;
};

// 各選択肢の型定義
export type Option = {
  number: number;
  text: string;
};

// 問題の型定義
export type Question = {
  _id: string;
  collectionName?: string;
  totalQuestions?: number;
  currentIndex?: number;
  title: string;
  content: string;
  sampleCode?: string;
  explanation?: string;
  options: Option[];
};
