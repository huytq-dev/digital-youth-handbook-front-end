import { baseApi } from '@/redux/baseApi';
import type {
  UpdateUserProfileRequest,
  UpdateUserProfileResponseModel,
} from './profile.type';
import type { ApiResponse } from '@/features/common/common.type';

/**
 * Profile API - RTK Query API endpoints for user profile
 */
export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // PATCH /api/users/profile
    updateUserProfile: builder.mutation<
      UpdateUserProfileResponseModel,
      UpdateUserProfileRequest
    >({
      query: (body) => ({
        url: 'users/profile',
        method: 'PATCH',
        body,
      }),
      // Khi update thành công thì mới refresh user data
      invalidatesTags: ['Auth'],
    }),
    
    // POST /api/users/avatar
    uploadAvatar: builder.mutation<ApiResponse<string>, File>({
      query: (file) => {
        const formData = new FormData();
        formData.append('file', file);

        return {
          url: 'users/avatar',
          method: 'POST',
          body: formData,
        };
      },
    }),
  }),
});

export const {
  useUpdateUserProfileMutation,
  useUploadAvatarMutation,
} = profileApi;