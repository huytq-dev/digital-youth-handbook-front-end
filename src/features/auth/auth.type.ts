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
  refreshToken: string | null; // Always null - Backend set vào HttpOnly Cookie, không trả về trong JSON
  user: GetCurrentUserResponseDataModel; // User profile data from backend
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
  userId: string; // required (Guid) - Chỉ cần userId để Backend xóa session trong Redis
  // refreshToken không cần gửi - Backend sẽ đọc từ HttpOnly Cookie và tự xóa
}

export interface SignOutResponseDataModel {
  message: string; // required
}

export type SignOutResponseModel = ApiResponse<SignOutResponseDataModel>;

// POST /api/auth/refresh-token
// Request body is empty - refresh token is read from HttpOnly cookie
// Expired access token must be sent in Authorization header
export interface RefreshTokenRequestModel {
  // Empty - no body needed, refresh token comes from cookie
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
// 7️⃣ Get Current User
// ==========================================

// Gender type (match với backend Domain model)
// Backend enum: Male = 1, Female = 2, Other = 3
export type GenderType = 1 | 2 | 3; // 1=Nam, 2=Nữ, 3=Khác

// GET /api/auth/me
// Option 2 (Recommended): Bao gồm đầy đủ thông tin cho Header và Profile page
// Tránh waterfall requests - tất cả data cần thiết đã có sẵn
export interface GetCurrentUserResponseDataModel {
  // Bắt buộc
  id: string;                     // GUID - match với backend response "id"
  name: string;                   // Cho avatar initials & hiển thị
  email: string;                  // Cho hiển thị
  
  // Optional nhưng recommended - cho Header & Profile
  picture?: string | null;        // URL ảnh avatar hoặc null - cho Header avatar
  isVerified: boolean;            // Cho verified badge
  roleName: RoleName;             // Cho authorization checks
  
  // Optional - cho Profile page (pre-fill form)
  gender?: GenderType | null;     // 1=Nam, 2=Nữ, 3=Khác
  dob?: string | null;            // ISO 8601 date string (YYYY-MM-DDTHH:mm:ssZ)
  address?: string | null;
}

export type GetCurrentUserResponseModel =
  ApiResponse<GetCurrentUserResponseDataModel>;

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