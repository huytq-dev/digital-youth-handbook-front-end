import { baseApi } from "@/redux/baseApi";
import type { ApiResponse } from "@/features/common/common.type";
import type {
  QuizSummary,
  QuizDetail,
} from "./quiz.type";

// ==========================================
// Request Types
// ==========================================

export interface GetQuizzesRequest {
  search?: string;
  page?: number;
  pageSize?: number;
}

export interface QuizOption {
  id: string;
  content: string;
}

export interface QuizQuestionResponse {
  id: string;
  content: string;
  points: number;
  type: "SingleChoice";
  options: QuizOption[];
}

export interface SubmitQuizRequest {
  attemptId: string;
  answers: {
    questionId: string;
    selectedOptionId: string;
  }[];
}

// ==========================================
// Response Types
// ==========================================

export interface GetQuizzesResponse {
  items: QuizSummary[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface StartQuizResponse {
  attemptId: string;
  quizId: string;
  title: string;
  timeLimitMinutes: number;
  questions: QuizQuestionResponse[];
}

export interface SubmitQuizResponse {
  attemptId: string;
  totalScore: number;
  isPassed: boolean;
}

export interface QuestionOptionDetail {
  id: string;
  content: string;
  isCorrect: boolean;
  isSelected: boolean;
}

export interface QuestionResultDetail {
  questionId: string;
  content: string;
  points: number;
  earnedPoints: number;
  isCorrect: boolean;
  selectedOptionId: string | null;
  selectedOptionContent: string | null;
  correctOptionId: string;
  correctOptionContent: string;
  options: QuestionOptionDetail[];
}

export interface QuizResultDetailResponse {
  attemptId: string;
  quizId: string;
  quizTitle: string;
  totalScore: number;
  maxScore: number;
  isPassed: boolean;
  durationSeconds: number;
  startedAt: string;
  completedAt: string;
  questions: QuestionResultDetail[];
}

export interface QuizHistoryItem {
  attemptId: string;
  quizId: string;
  quizTitle: string;
  totalScore: number;
  maxScore: number;
  isPassed: boolean;
  durationSeconds: number;
  completedAt: string;
}

export interface QuizHistoryResponse {
  items: QuizHistoryItem[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  quizTitle: string;
  score: number;
  totalQuestions: number;
  completedAt: string;
  isPassed: boolean;
}

// ==========================================
// RTK Query API Endpoints
// ==========================================

/**
 * Quiz API - RTK Query API endpoints for quiz functionality
 */
export const quizApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /api/quizs - Lấy danh sách quiz với search và pagination (Public endpoint)
    getQuizzes: builder.query<
      ApiResponse<GetQuizzesResponse>,
      GetQuizzesRequest | void
    >({
      query: (params: GetQuizzesRequest = {}) => {
        const searchParams = new URLSearchParams();
        if (params.search) searchParams.append("search", params.search);
        if (params.page) searchParams.append("page", String(params.page));
        if (params.pageSize)
          searchParams.append("pageSize", String(params.pageSize));

        const queryString = searchParams.toString();
        return {
          url: `quizs${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
      providesTags: ["Quizzes"],
    }),

    // GET /api/quizs/:id - Lấy chi tiết quiz
    getQuizById: builder.query<ApiResponse<QuizDetail>, string>({
      query: (id) => ({
        url: `quizs/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Quiz", id }],
    }),

    // POST /api/quizs/:quizId/start - Bắt đầu quiz
    startQuiz: builder.mutation<
      ApiResponse<StartQuizResponse>,
      string
    >({
      query: (quizId) => ({
        url: `quizs/${quizId}/start`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, quizId) => [
        { type: "Quiz", id: quizId },
      ],
    }),

    // POST /api/quizs/submit - Nộp bài quiz
    submitQuiz: builder.mutation<
      ApiResponse<SubmitQuizResponse>,
      SubmitQuizRequest
    >({
      query: (data) => ({
        url: `quizs/submit`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Quizzes", "Auth"],
    }),

    // GET /api/quizs/attempts/:attemptId/result - Lấy kết quả chi tiết
    getQuizResult: builder.query<
      ApiResponse<QuizResultDetailResponse>,
      string
    >({
      query: (attemptId) => ({
        url: `quizs/attempts/${attemptId}/result`,
        method: "GET",
      }),
      providesTags: (_result, _error, attemptId) => [
        { type: "Quiz", id: attemptId },
      ],
    }),

    // GET /api/users/quiz-history - Lấy lịch sử quiz của user
    getUserQuizHistory: builder.query<
      ApiResponse<QuizHistoryResponse>,
      { page?: number; pageSize?: number }
    >({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();
        if (params.page) searchParams.append("page", String(params.page));
        if (params.pageSize)
          searchParams.append("pageSize", String(params.pageSize));

        const queryString = searchParams.toString();
        return {
          url: `users/quiz-history${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
      providesTags: ["Quizzes"],
    }),
  }),
});

// Export hooks
export const {
  useGetQuizzesQuery,
  useLazyGetQuizzesQuery,
  useGetQuizByIdQuery,
  useLazyGetQuizByIdQuery,
  useStartQuizMutation,
  useSubmitQuizMutation,
  useGetQuizResultQuery,
  useLazyGetQuizResultQuery,
  useGetUserQuizHistoryQuery,
  useLazyGetUserQuizHistoryQuery,
} = quizApi;
