import { baseApi } from "@/redux/baseApi";
import type { ApiResponse } from "@/features/common/common.type";

// ==========================================
// Request Types
// ==========================================

export interface UpdateUserProfileRequest {
  name?: string;
  dob?: string; // ISO 8601: YYYY-MM-DD
  address?: string;
  gender?: number;
}

// ==========================================
// Response Types
// ==========================================

export interface UserProfileResponse {
  id: string;
  name: string;
  email: string;
  picture?: string | null;
  isVerified: boolean;
  gender?: number | null;
  dob?: string | null;
  address?: string | null;
  roleName: string;
}

export interface AvatarUploadResponse {
  url: string;
}

// ==========================================
// RTK Query API Endpoints
// ==========================================

/**
 * Profile API - RTK Query API endpoints for user profile management
 */
export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /api/users/profile - Lấy thông tin cá nhân user
    getUserProfile: builder.query<ApiResponse<UserProfileResponse>, void>({
      query: () => ({
        url: `users/profile`,
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),

    // PATCH /api/users/profile - Cập nhật thông tin cá nhân
    updateUserProfile: builder.mutation<
      ApiResponse<UserProfileResponse>,
      UpdateUserProfileRequest
    >({
      query: (data) => ({
        url: `users/profile`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),

    // POST /api/users/avatar - Upload avatar
    uploadAvatar: builder.mutation<ApiResponse<AvatarUploadResponse>, FormData>(
      {
        query: (formData) => ({
          url: `users/avatar`,
          method: "POST",
          body: formData,
        }),
        invalidatesTags: ["Auth"],
      }
    ),
  }),
});

// Export hooks
export const {
  useGetUserProfileQuery,
  useLazyGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useUploadAvatarMutation,
} = profileApi;
