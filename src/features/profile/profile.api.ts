import { baseApi } from '@/redux/baseApi';
import type {
  UpdateUserProfileRequest,
  UpdateUserProfileResponseModel,
} from './profile.type';

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
      // Invalidate auth cache để refresh user data
      invalidatesTags: ['Auth'],
    }),
  }),
});

export const {
  useUpdateUserProfileMutation,
} = profileApi;
