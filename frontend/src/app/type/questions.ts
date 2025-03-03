export interface Question {
  title: string;
  difficulty: string;
  content: string;
  sampleCode: string;
  answerCode: number;
  explanation: string;
  options: { number: number; text: string }[];
  tags: string[];
  collectionId: string; // Collection との関連付け
  createdAt: Date;
} 