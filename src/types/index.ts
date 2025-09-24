export interface Answer {
  text: string;
  score: number;
}

export interface Question {
  id: number;
  blockId: number;
  text: string;
  answers: Answer[];
  feedback: string;
}

export interface Block {
  id: number;
  title: string;
  description: string;
  color: string;
  icon: string;
  questions: Question[];
}

export interface UserAnswer {
  questionId: number;
  selectedAnswerIndex: number;
  score: number;
}

export interface Assessment {
  answers: UserAnswer[];
  totalScore: number;
  completedBlocks: number[];
  isComplete: boolean;
}

export interface ScoreRange {
  min: number;
  max: number;
  level: "muito baixo" | "baixo" | "moderado" | "alto" | "muito alto";
  message: string;
  color: string;
}

export interface ImprovementPoint {
  questionText: string;
  feedback: string;
  blockTitle: string;
}
