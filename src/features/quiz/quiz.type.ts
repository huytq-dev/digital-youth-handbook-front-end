export type QuizDifficulty = "Easy" | "Medium" | "Hard";

export interface QuizSummary {
  id: string;
  title: string;
  thumbnail: string;
  category: string;
  difficulty: QuizDifficulty;
  durationMinutes: number;
  totalQuestions: number;
  plays: number;
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
  description?: string;
  authorName?: string;
  questions: QuizQuestion[];
  highScore?: number;
  maxLives?: number; // Số mạng (nếu có)
  passingScore?: number; // Điểm tối thiểu để qua (ví dụ: 70%)
  leaderboard?: QuizLeaderboardEntry[]; // Top scores
}

export type QuizStatus = "idle" | "in-progress" | "completed";

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


