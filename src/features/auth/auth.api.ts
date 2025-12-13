import { baseApi } from '@/redux/baseApi';
import type {
  SignInRequestModel,
  SignInResponseModel,
  SignUpRequestModel,
  SignUpResponseModel,
  SignOutRequestModel,
  SignOutResponseModel,
  RefreshTokenRequestModel,
  RefreshTokenResponseModel,
  SocialSignInRequestModel,
  SocialSignInResponseModel,
  SendVerificationEmailRequestModel,
  SendVerificationEmailResponseModel,
  VerifyEmailRequestModel,
  VerifyEmailResponseModel,
  ForgotPasswordRequestModel,
  ForgotPasswordResponseModel,
  ResetPasswordRequestModel,
  ResetPasswordResponseModel,
  GetCurrentUserResponseModel,
} from './auth.type';

/**
 * Auth API - RTK Query API endpoints for authentication
 */
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // POST /api/auth/login
    signIn: builder.mutation<SignInResponseModel, SignInRequestModel>({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
    }),

    // POST /api/auth/register
    signUp: builder.mutation<SignUpResponseModel, SignUpRequestModel>({
      query: (body) => ({
        url: 'auth/register',
        method: 'POST',
        body,
      }),
    }),

    // POST /api/auth/logout
    signOut: builder.mutation<SignOutResponseModel, SignOutRequestModel>({
      query: (body) => ({
        url: 'auth/logout',
        method: 'POST',
        body,
      }),
    }),

    // POST /api/auth/refresh-token
    // Request body is empty - refresh token comes from HttpOnly cookie
    // Expired access token must be sent in Authorization header
    refreshToken: builder.mutation<
      RefreshTokenResponseModel,
      RefreshTokenRequestModel
    >({
      query: () => ({
        url: 'auth/refresh-token',
        method: 'POST',
        body: {}, // Empty body - refresh token is in HttpOnly cookie
      }),
    }),

    // POST /api/auth/social-login
    // Nhận AccessToken (có thể là ID token, access token, hoặc authorization code)
    // và Provider (Google = 1, Facebook = 2)
    socialSignIn: builder.mutation<
      SocialSignInResponseModel,
      SocialSignInRequestModel
    >({
      query: (body) => ({
        url: 'auth/social-login',
        method: 'POST',
        body,
      }),
    }),

    // @deprecated Email verification no longer used - accounts are instantly activated
    // POST /api/auth/email/verification/send
    sendVerificationEmail: builder.mutation<
      SendVerificationEmailResponseModel,
      SendVerificationEmailRequestModel
    >({
      query: (body) => ({
        url: 'auth/email/verification/send',
        method: 'POST',
        body,
      }),
    }),

    // @deprecated Email verification no longer used - accounts are instantly activated
    // POST /api/auth/email/verification/confirm
    verifyEmail: builder.mutation<
      VerifyEmailResponseModel,
      VerifyEmailRequestModel
    >({
      query: (body) => ({
        url: 'auth/email/verification/confirm',
        method: 'POST',
        body,
      }),
    }),

    // POST /api/auth/password/forgot
    forgotPassword: builder.mutation<
      ForgotPasswordResponseModel,
      ForgotPasswordRequestModel
    >({
      query: (body) => ({
        url: 'auth/password/forgot',
        method: 'POST',
        body,
      }),
    }),

    // POST /api/auth/password/reset
    resetPassword: builder.mutation<
      ResetPasswordResponseModel,
      ResetPasswordRequestModel
    >({
      query: (body) => ({
        url: 'auth/password/reset',
        method: 'POST',
        body,
      }),
    }),

    // GET /api/auth/me - Get current user profile
    getCurrentUser: builder.query<GetCurrentUserResponseModel, void>({
      query: () => ({
        url: 'auth/me',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useSignOutMutation,
  useRefreshTokenMutation,
  useSocialSignInMutation,
  useSendVerificationEmailMutation,
  useVerifyEmailMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetCurrentUserQuery,
  useLazyGetCurrentUserQuery,
} = authApi;

