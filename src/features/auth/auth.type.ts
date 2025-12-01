import type {
  ApiResponse,
  ApiReponseSuccess,
  RoleName,
} from "@/features/common/common.type";

// Enums (using const objects for erasableSyntaxOnly compatibility)
export const SocialProvider = {
  Google: 1,
  Facebook: 2,
} as const;

export type SocialProvider = (typeof SocialProvider)[keyof typeof SocialProvider];

/**
 * @deprecated EmailType và EmailAction không còn được dùng trong API mới
 * Các endpoint đã được tách riêng:
 * - POST /api/auth/email/verification/send (không cần EmailType/Action)
 * - POST /api/auth/password/forgot (không cần EmailType/Action)
 * Giữ lại để backward compatibility với schema cũ
 */
export const EmailType = {
  Verification: 1,
  ForgotPassword: 2,
  Notification: 3,
} as const;

export type EmailType = (typeof EmailType)[keyof typeof EmailType];

export const EmailAction = {
  Send: 1,
  Resend: 2,
} as const;

export type EmailAction = (typeof EmailAction)[keyof typeof EmailAction];

// ==========================================
// 1️⃣ Authentication
// ==========================================

// POST /api/auth/login
export interface SignInRequestModel {
  email: string; // required
  password: string; // required
}

export interface SignInResponseDataModel {
  accessToken: string; // required
  expiresIn: number; // required (seconds)
  refreshToken?: string | null; // optional
}

export type SignInResponseModel = ApiResponse<SignInResponseDataModel>;

// POST /api/auth/register
export interface SignUpRequestModel {
  name: string; // required
  email: string; // required
  password: string; // required
}

export interface SignUpResponseDataModel {
  message: string; // required
}

export type SignUpResponseModel = ApiResponse<SignUpResponseDataModel>;

// POST /api/auth/logout
export interface SignOutRequestModel {
  userId: string; // required (Guid)
}

export interface SignOutResponseDataModel {
  message: string; // required
}

export type SignOutResponseModel = ApiResponse<SignOutResponseDataModel>;

// POST /api/auth/refresh-token
export interface RefreshTokenRequestModel {
  userId: string; // required (Guid)
  refreshToken: string; // required
}

export type RefreshTokenResponseModel = SignInResponseModel;

// POST /api/auth/social-login
// AccessToken có thể là:
// - ID token (cho Google Identity Services)
// - Access token (cho Facebook)
// - Authorization code (cho Google OAuth Authorization Code Flow)
export interface SocialSignInRequestModel {
  accessToken: string; // ID token, access token, hoặc authorization code
  provider: SocialProvider; // Google = 1, Facebook = 2
}

// Social Login Response - Backend trả về giống SignInResponseModel
// (accessToken, expiresIn, refreshToken)
export type SocialSignInResponseModel = SignInResponseModel;

// ==========================================
// 2️⃣ Email Verification
// ==========================================

// POST /api/auth/email/verification/send
export interface SendVerificationEmailRequestModel {
  email: string; // required
}

export interface SendVerificationEmailResponseDataModel {
  message: string; // required
}

export type SendVerificationEmailResponseModel =
  ApiResponse<SendVerificationEmailResponseDataModel>;

// POST /api/auth/email/verification/confirm
export interface VerifyEmailRequestModel {
  token: string; // required
}

export interface VerifyEmailResponseDataModel {
  message: string; // required
}

export type VerifyEmailResponseModel =
  ApiResponse<VerifyEmailResponseDataModel>;

// ==========================================
// 3️⃣ Password Reset
// ==========================================

// POST /api/auth/password/forgot
export interface ForgotPasswordRequestModel {
  email: string; // required
}

export interface ForgotPasswordResponseDataModel {
  message: string; // required
}

export type ForgotPasswordResponseModel =
  ApiResponse<ForgotPasswordResponseDataModel>;

// POST /api/auth/password/reset
export interface ResetPasswordRequestModel {
  token: string; // required
  newPassword: string; // required
  confirmPassword: string; // required
}

export interface ResetPasswordResponseDataModel {
  message: string; // required
}

export type ResetPasswordResponseModel =
  ApiResponse<ResetPasswordResponseDataModel>;

// ==========================================
// Other Models
// ==========================================

export interface RoleModel {
  roleId: string;
  roleName: RoleName;
}

export type RolesResponse = ApiReponseSuccess<RoleModel[]>;

export interface UserBanModel {
  userId: string;
  reasonId: string;
  createdAt: string;
}

// ==========================================
// Legacy/Deprecated Types (for backward compatibility)
// ==========================================

/**
 * @deprecated Use SendVerificationEmailRequestModel instead
 * Kept for backward compatibility
 */
export interface EmailRequestModel {
  email: string;
}

/**
 * @deprecated Use SendVerificationEmailResponseModel instead
 * Kept for backward compatibility
 */
export type SendEmailVerificationResponseModel = SendVerificationEmailResponseModel;

/**
 * @deprecated Use VerifyEmailResponseModel instead
 * Kept for backward compatibility
 */
export type ConfirmEmailResponseModel = VerifyEmailResponseModel;