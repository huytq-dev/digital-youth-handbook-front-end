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
  
  // Sign In (Login)
  export interface SignInRequestModel {
    Email: string;
    Password: string;
  }
  
  export interface SignInResponseDataModel {
    AccessToken: string;
    ExpiresIn: number;
    RefreshToken: string | null;
  }
  
  export type SignInResponseModel = ApiResponse<SignInResponseDataModel>;
  
  // Sign Up (Register)
  export interface SignUpRequestModel {
    Name: string;
    Email: string;
    Password: string;
  }
  
  export interface SignUpResponseDataModel {
    Email: string;
    IsVerified: boolean;
  }
  
  export type SignUpResponseModel = ApiResponse<SignUpResponseDataModel>;
  
  // Sign Out (Logout)
  export interface SignOutRequestModel {
    UserId: string; // Guid
  }
  
  export interface SignOutResponseDataModel {
    Message: string;
  }
  
  export type SignOutResponseModel = ApiResponse<SignOutResponseDataModel>;
  
  // Refresh Token
  export interface RefreshTokenRequestModel {
    UserId: string; // Guid
    RefreshToken: string;
  }
  
  export type RefreshTokenResponseModel = SignInResponseModel;
  
  // Social Login
  // AccessToken có thể là:
  // - ID token (cho Google Identity Services)
  // - Access token (cho Facebook)
  // - Authorization code (cho Google OAuth Authorization Code Flow)
  export interface SocialSignInRequestModel {
    AccessToken: string; // ID token, access token, hoặc authorization code
    Provider: SocialProvider; // Google = 1, Facebook = 2
  }
  
  // Social Login Response - Backend trả về giống SignInResponseModel
  // (AccessToken, ExpiresIn, RefreshToken)
  export type SocialSignInResponseModel = SignInResponseModel;
  
  // Email Verification
  export interface EmailRequestModel {
    Email: string;
    EmailType: EmailType;
    Action: EmailAction;
  }
  
  export interface SendEmailVerificationResponseDataModel {
    Message: string;
  }
  
  export type SendEmailVerificationResponseModel =
    ApiResponse<SendEmailVerificationResponseDataModel>;
  
  export interface VerifyEmailRequestModel {
    Token: string;
  }
  
  export interface ConfirmEmailResponseDataModel {
    Message: string;
  }
  
  export type ConfirmEmailResponseModel =
    ApiResponse<ConfirmEmailResponseDataModel>;
  
  // Password Reset
  export interface ForgotPasswordRequestModel {
    Email: string;
  }
  
  export interface ForgotPasswordResponseDataModel {
    Message: string;
  }
  
  export type ForgotPasswordResponseModel =
    ApiResponse<ForgotPasswordResponseDataModel>;
  
  export interface ResetPasswordRequestModel {
    Token: string;
    NewPassword: string;
    ConfirmPassword: string;
  }
  
  export interface ResetPasswordResponseDataModel {
    Message: string;
  }
  
  export type ResetPasswordResponseModel =
    ApiResponse<ResetPasswordResponseDataModel>;
  
  // Other Models
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
  