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
  username?: string;
  picture?: string;
  gender?: GenderType;
  dob?: string;
  address?: string;
  isVerified: boolean;
  roles: UserRole[];
  quizAttempts: QuizAttempt[];
  schoolName?: string;  // Tên trường
  className?: string;   // Tên lớp
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
  schoolName?: string | null;  // Tên trường
  className?: string | null;   // Tên lớp
}

// Response data từ backend
export interface UserProfileResponse {
  id: string;
  name: string;
  email: string;
  username?: string;
  picture?: string | null;
  pictureUrl?: string | null;
  gender?: GenderType | null;
  dob?: string | null; // ISO 8601 date string
  address?: string | null;
  isVerified: boolean;
  roles: UserRole[];
  quizAttempts: QuizAttempt[];
  schoolName?: string | null;  // Tên trường
  className?: string | null;   // Tên lớp
}

export type UpdateUserProfileResponseModel = ApiResponse<UserProfileResponse>;


