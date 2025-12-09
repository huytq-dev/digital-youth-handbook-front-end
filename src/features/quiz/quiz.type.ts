export type QuizDifficulty = "Easy" | "Medium" | "Hard";

export interface QuizSummary {
  id: string;
  title: string;
  description?: string | null;
  category: string;
  difficulty: QuizDifficulty;
  durationMinutes: number;
  timeLimitMinutes?: number;
  totalQuestions: number;
  plays: number;
  createdAt?: string;  // ISO 8601 DateTime
}

export interface QuizQuestion {
  id: string;
  quizId: string;
  order: number;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation?: string;
}

export interface QuizLeaderboardEntry {
  rank: number;
  playerName: string;
  score: number;
  completedAt: string;
}

export interface QuizDetail extends QuizSummary {
  // Optional fields - có thể có từ backend nếu cần
  questions?: QuizQuestion[];
  highScore?: number;
  authorName?: string;
  leaderboard?: QuizLeaderboardEntry[];
  maxLives?: number;
  passingScore?: number;
}

export type QuizStatus = "idle" | "in-progress" | "completed";

// Dữ liệu kết quả quiz từ backend
export interface QuizResultData {
  attemptId: string;
  totalScore: number;
  isPassed: boolean;
  totalQuestions: number;
  answeredQuestions: number;
  completedAt: Date;
}

export interface QuizAnswer {
  questionId: string;
  selectedOptionIndex: number;
  isCorrect: boolean;
}

export interface QuizSessionState {
  quizId: string | null;
  status: QuizStatus;
  startedAt: string | null;
  finishedAt: string | null;
  currentQuestionIndex: number;
  answers: QuizAnswer[];
  score: number;
}