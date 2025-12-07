import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "@/config";
import { authService } from "@/features/auth/auth.storage";
import { baseQueryWithToast } from "./baseQueryWithToast";

/**
 * Create base query with authentication headers
 * Lấy token từ authService (localStorage) hoặc có thể lấy từ Redux state nếu cần
 *
 * Để lấy từ Redux state, uncomment và sửa như sau:
 * ```typescript
 * import type { RootState } from '@/redux/store';
 * prepareHeaders: (headers, { getState }) => {
 *   const state = getState() as RootState;
 *   const token = state.auth?.token; // Nếu có auth slice với token
 *   // ...
 * }
 * ```
 */
export const createQuery = () => {
  return fetchBaseQuery({
    baseUrl: baseUrl,
    credentials: "include", // Bắt buộc để gửi/nhận HttpOnly cookies
    prepareHeaders: (headers) => {
      // Lấy token từ authService (localStorage)
      const token = authService.getAccessToken();

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithToast,
  tagTypes: ["Auth", "Common", "Quiz", "Quizzes"],
  keepUnusedDataFor: 60,
  endpoints: () => ({}),
});
