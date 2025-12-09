import { baseApi } from "@/redux/baseApi";
import type { ApiResponse } from "@/features/common/common.type";
import type { LeaderboardItem } from "./honor.type";

export interface GetLeaderboardRequest {
  quizId: string;
  top?: number;
}

/**
 * Honor API - RTK Query endpoints for leaderboard
 */
export const honorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /api/quizs/:quizId/leaderboard - Lấy bảng xếp hạng của một quiz
    getQuizLeaderboard: builder.query<
      ApiResponse<LeaderboardItem[]>,
      GetLeaderboardRequest
    >({
      query: ({ quizId, top = 10 }) => ({
        url: `quizs/${quizId}/leaderboard?top=${top}`,
        method: "GET",
      }),
      providesTags: (_result, _error, { quizId }) => [
        { type: "Quiz", id: quizId },
      ],
    }),
  }),
});

export const { useGetQuizLeaderboardQuery, useLazyGetQuizLeaderboardQuery } =
  honorApi;

