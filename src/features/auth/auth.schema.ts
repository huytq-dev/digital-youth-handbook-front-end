import { z } from "zod";
import {
  SocialProvider,
  EmailType,
  EmailAction,
} from "./auth.type";

// UUID/Guid validation regex
const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Sign In Schema
// Backend: email (Required, Valid email), password (Required, Min 6 chars)
export const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email là bắt buộc")
    .email("Email không đúng định dạng"),
  password: z
    .string()
    .min(1, "Mật khẩu là bắt buộc")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export type SignInFormData = z.infer<typeof signInSchema>;

// Sign Up Schema
// Backend: name (Required), email (Required, Valid email), password (Required, Min 6 chars)
export const signUpSchema = z
  .object({
    name: z.string().min(1, "Họ và tên là bắt buộc"),
    email: z
      .string()
      .min(1, "Email là bắt buộc")
      .email("Email không đúng định dạng"),
    password: z
      .string()
      .min(1, "Mật khẩu là bắt buộc")
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    passwordConfirm: z.string().min(1, "Xác nhận mật khẩu là bắt buộc"),
    termsAccepted: z.boolean().refine((val) => val === true, {
      message: "Bạn phải đồng ý với điều khoản dịch vụ",
    }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Mật khẩu không khớp",
    path: ["passwordConfirm"],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;

// Sign Out Schema
// Backend: userId (Required, must be valid Guid)
export const signOutSchema = z.object({
  userId: z
    .string()
    .min(1, "UserId là bắt buộc")
    .regex(uuidRegex, "UserId không đúng định dạng"),
});

export type SignOutFormData = z.infer<typeof signOutSchema>;

// Refresh Token Schema
// Backend: userId (Required, valid Guid), refreshToken (Required, Min 10 chars)
export const refreshTokenSchema = z.object({
  userId: z
    .string()
    .min(1, "UserId là bắt buộc")
    .regex(uuidRegex, "UserId không đúng định dạng"),
  refreshToken: z
    .string()
    .min(1, "RefreshToken là bắt buộc")
    .min(10, "RefreshToken phải có ít nhất 10 ký tự"),
});

export type RefreshTokenFormData = z.infer<typeof refreshTokenSchema>;

// Social Login Schema
// Backend: accessToken (Required), provider (Required, enum: 1=Google, 2=Facebook)
export const socialSignInSchema = z.object({
  accessToken: z.string().min(1, "AccessToken là bắt buộc"),
  provider: z.union([
    z.literal(SocialProvider.Google),
    z.literal(SocialProvider.Facebook),
  ], {
    message: "Nhà cung cấp không đúng định dạng",
  }),
});

export type SocialSignInFormData = z.infer<typeof socialSignInSchema>;

// Send Verification Email Schema
// Backend: Email (Required, Valid email), EmailType (Required, enum), Action (Required, enum)
export const sendVerificationEmailSchema = z.object({
  Email: z
    .string()
    .min(1, "Email là bắt buộc")
    .email("Email không đúng định dạng"),
  EmailType: z.union([
    z.literal(EmailType.Verification),
    z.literal(EmailType.ForgotPassword),
    z.literal(EmailType.Notification),
  ], {
    message: "Loại email không đúng định dạng",
  }),
  Action: z.union([
    z.literal(EmailAction.Send),
    z.literal(EmailAction.Resend),
  ], {
    message: "Hành động không đúng định dạng",
  }),
});

export type SendVerificationEmailFormData = z.infer<
  typeof sendVerificationEmailSchema
>;

// Verify Email Schema
// Backend: token (Required)
export const verifyEmailSchema = z.object({
  token: z.string().min(1, "Token là bắt buộc"),
});

export type VerifyEmailFormData = z.infer<typeof verifyEmailSchema>;

// Forgot Password Schema
// Backend: email (Required, Valid email)
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email là bắt buộc")
    .email("Email không đúng định dạng"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

// Reset Password Schema
// Backend: token (Required), newPassword (Required, Min 6 chars), confirmPassword (Required, Must match newPassword)
export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, "Token là bắt buộc"),
    newPassword: z
      .string()
      .min(1, "Mật khẩu mới là bắt buộc")
      .min(6, "Mật khẩu mới phải có ít nhất 6 ký tự"),
    confirmPassword: z.string().min(1, "Xác nhận mật khẩu là bắt buộc"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Xác nhận mật khẩu phải khớp với mật khẩu mới",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

