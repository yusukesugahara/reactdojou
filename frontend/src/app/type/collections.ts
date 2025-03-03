import { Question } from './questions';

export interface Collection {
  id: string;
  name: string;
  description: string;
  currentIndex?: number;        // currentQuestionNumber の代わり
  completed?: boolean;          // 追加
  timesCompleted?: number;      // completionCount の代わり
  totalQuestions?: number;
  completedQuestions?: number;
  questionCount?: number;
  questions: Array<Question>;
}