// Types cho Honor (Vinh danh)

export interface LeaderboardItem {
  rank: number;
  userId: string;
  userName: string;
  userPicture?: string | null;
  schoolName?: string;
  className?: string;
  totalScore: number;
  correctCount: number;
  totalQuestions: number;
  durationSeconds: number;
  completedAt: string; // ISO 8601 DateTime
}

export interface QuizLeaderboard {
  quizId: string;
  quizTitle: string;
  items: LeaderboardItem[];
}

export interface HonorStats {
  totalQuizzes: number;
  totalAttempts: number;
  avgScore: number;
  topQuiz?: QuizLeaderboard;
}

