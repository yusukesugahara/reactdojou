export type TypeProblems = {
  title: string;
  difficulty: string;
  content: string;
  sampleCode: string;
  answerCode: number;
  explanation: string;
  options: {
      number: number;
      text: string;
  }[];
  tags: string[];
  collectionName: string;
}[]