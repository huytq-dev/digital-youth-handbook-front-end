export type GenderType = 0 | 1 | 2;

export interface UserRole {
  id: string;
  roleName: string;
}

export interface QuizAttempt {
  id: string;
  quizTitle: string;
  score: number;
  completedAt: string;
  isPassed: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  picture?: string;
  gender?: GenderType;
  dob?: string;
  address?: string;
  isVerified: boolean;
  roles: UserRole[];
  quizAttempts: QuizAttempt[];
}

export interface SocialMediaLink {
  platform: string;
  url: string;
  followers?: number;
}


