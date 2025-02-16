export type Progress = {
  userId: string;
  collectionId: string;
  questionOrder: string[];
  currentIndex: number;
  completed: boolean;
}
