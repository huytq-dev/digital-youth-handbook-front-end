import type { ApiResponse } from "@/features/common/common.type";

// Backend enum: Male = 1, Female = 2, Other = 3
export type GenderType = 1 | 2 | 3;

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

// ==========================================
// Update Profile API Types
// ==========================================

// PATCH /api/users/profile
// Request body - Tất cả fields đều optional
export interface UpdateUserProfileRequest {
  name?: string | null;
  dob?: string | null; // ISO 8601 date string (YYYY-MM-DDTHH:mm:ssZ)
  gender?: GenderType | null;
  address?: string | null;
  pictureUrl?: string | null;
}

// Response data từ backend
export interface UserProfileResponse {
  id: string;
  name: string;
  email: string;
  picture?: string | null;
  gender?: GenderType | null;
  dob?: string | null; // ISO 8601 date string
  address?: string | null;
  isVerified: boolean;
  roles: UserRole[];
  quizAttempts: QuizAttempt[];
}

export type UpdateUserProfileResponseModel = ApiResponse<UserProfileResponse>;


