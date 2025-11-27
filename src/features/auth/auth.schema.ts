import { z } from "zod";
import {
  SocialProvider,
  EmailType,
  EmailAction,
} from "./auth.type";

// UUID/Guid validation regex
const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Sign In Schema
// Backend: Email (Required, Valid email), Password (Required, Min 6 chars)
export const signInSchema = z.object({
  Email: z
    .string()
    .min(1, "Email is required")
    .email("Email is not a valid email format"),
  Password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export type SignInFormData = z.infer<typeof signInSchema>;

// Sign Up Schema
// Backend: Name (Required), Email (Required, Valid email), Password (Required, Min 6 chars)
export const signUpSchema = z
  .object({
    Name: z.string().min(1, "Name is required"),
    Email: z
      .string()
      .min(1, "Email is required")
      .email("Email is not a valid email format"),
    Password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters"),
    PasswordConfirm: z.string().min(1, "Password confirmation is required"),
    TermsAccepted: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.Password === data.PasswordConfirm, {
    message: "Passwords do not match",
    path: ["PasswordConfirm"],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;

// Sign Out Schema
// Backend: UserId (Required, must be valid Guid)
export const signOutSchema = z.object({
  UserId: z
    .string()
    .min(1, "UserId is required")
    .regex(uuidRegex, "UserId has an invalid format"),
});

export type SignOutFormData = z.infer<typeof signOutSchema>;

// Refresh Token Schema
// Backend: UserId (Required, valid Guid), RefreshToken (Required, Min 10 chars)
export const refreshTokenSchema = z.object({
  UserId: z
    .string()
    .min(1, "UserId is required")
    .regex(uuidRegex, "UserId has an invalid format"),
  RefreshToken: z
    .string()
    .min(1, "RefreshToken is required")
    .min(10, "RefreshToken must be at least 10 characters"),
});

export type RefreshTokenFormData = z.infer<typeof refreshTokenSchema>;

// Social Login Schema
// Backend: AccessToken (Required), Provider (Required, enum: 1=Google, 2=Facebook)
export const socialSignInSchema = z.object({
  AccessToken: z.string().min(1, "AccessToken is required"),
  Provider: z.union([
    z.literal(SocialProvider.Google),
    z.literal(SocialProvider.Facebook),
  ], {
    message: "Provider has an invalid format",
  }),
});

export type SocialSignInFormData = z.infer<typeof socialSignInSchema>;

// Send Verification Email Schema
// Backend: Email (Required, Valid email), EmailType (Required, enum), Action (Required, enum)
export const sendVerificationEmailSchema = z.object({
  Email: z
    .string()
    .min(1, "Email is required")
    .email("Email is not a valid email format"),
  EmailType: z.union([
    z.literal(EmailType.Verification),
    z.literal(EmailType.ForgotPassword),
    z.literal(EmailType.Notification),
  ], {
    message: "EmailType has an invalid format",
  }),
  Action: z.union([
    z.literal(EmailAction.Send),
    z.literal(EmailAction.Resend),
  ], {
    message: "Action has an invalid format",
  }),
});

export type SendVerificationEmailFormData = z.infer<
  typeof sendVerificationEmailSchema
>;

// Verify Email Schema
// Backend: Token (Required)
export const verifyEmailSchema = z.object({
  Token: z.string().min(1, "Token is required"),
});

export type VerifyEmailFormData = z.infer<typeof verifyEmailSchema>;

// Forgot Password Schema
// Backend: Email (Required, Valid email)
export const forgotPasswordSchema = z.object({
  Email: z
    .string()
    .min(1, "Email is required")
    .email("Email is not a valid email format"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

// Reset Password Schema
// Backend: Token (Required), NewPassword (Required, Min 6 chars), ConfirmPassword (Required, Must match NewPassword)
export const resetPasswordSchema = z
  .object({
    Token: z.string().min(1, "Token is required"),
    NewPassword: z
      .string()
      .min(1, "NewPassword is required")
      .min(6, "NewPassword must be at least 6 characters"),
    ConfirmPassword: z.string().min(1, "ConfirmPassword is required"),
  })
  .refine((data) => data.NewPassword === data.ConfirmPassword, {
    message: "ConfirmPassword must match NewPassword",
    path: ["ConfirmPassword"],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

