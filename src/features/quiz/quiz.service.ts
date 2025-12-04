import { baseApi } from "@/redux/baseApi";
import type { QuizDetail, QuizSummary } from "./quiz.type";
import { createMockQuizDetail } from "./quiz.mock";

// Mock data cho development - sẽ được thay thế bằng API thật sau
const MOCK_QUIZZES: QuizSummary[] = [
  {
    id: "1",
    title: "Kiểm tra trình độ ReactJS cơ bản đến nâng cao",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    category: "Lập trình",
    difficulty: "Hard",
    durationMinutes: 15,
    totalQuestions: 20,
    plays: 1250,
  },
  {
    id: "2",
    title: "Bạn hiểu biết bao nhiêu về Lịch sử Việt Nam?",
    thumbnail: "https://images.unsplash.com/photo-1555952494-efd681c7a3f9?w=800&q=80",
    category: "Lịch sử",
    difficulty: "Medium",
    durationMinutes: 10,
    totalQuestions: 10,
    plays: 890,
  },
  {
    id: "3",
    title: "Tiếng Anh giao tiếp công sở",
    thumbnail: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&q=80",
    category: "Ngoại ngữ",
    difficulty: "Easy",
    durationMinutes: 20,
    totalQuestions: 15,
    plays: 2100,
  },
  {
    id: "4",
    title: "IQ Test: Logic và Tư duy hình ảnh",
    thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80",
    category: "Trí tuệ",
    difficulty: "Hard",
    durationMinutes: 45,
    totalQuestions: 30,
    plays: 3450,
  },
  {
    id: "5",
    title: "Kiến thức bóng đá Ngoại Hạng Anh",
    thumbnail: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80",
    category: "Thể thao",
    difficulty: "Easy",
    durationMinutes: 8,
    totalQuestions: 12,
    plays: 567,
  },
  {
    id: "6",
    title: "Kỹ năng số: An toàn thông tin trên mạng",
    thumbnail: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
    category: "Kỹ năng số",
    difficulty: "Medium",
    durationMinutes: 12,
    totalQuestions: 18,
    plays: 1234,
  },
  {
    id: "7",
    title: "Văn hóa và Phong tục Việt Nam",
    thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    category: "Văn hóa",
    difficulty: "Easy",
    durationMinutes: 15,
    totalQuestions: 20,
    plays: 987,
  },
  {
    id: "8",
    title: "Kiến thức về Biển Đảo Việt Nam",
    thumbnail: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&q=80",
    category: "Địa lý",
    difficulty: "Medium",
    durationMinutes: 10,
    totalQuestions: 15,
    plays: 678,
  },
  {
    id: "9",
    title: "Khởi nghiệp: Từ ý tưởng đến thành công",
    thumbnail: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80",
    category: "Khởi nghiệp",
    difficulty: "Hard",
    durationMinutes: 25,
    totalQuestions: 25,
    plays: 1456,
  },
];

export const quizApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getQuizzes: build.query<QuizSummary[], void>({
      query: () => ({
        url: "/quizzes",
        method: "GET",
      }),
      providesTags: ["Quizzes"],
    }),
    getQuizById: build.query<QuizDetail, string>({
      queryFn: async (id) => {
        // Tạm thời sử dụng mock data - sẽ thay bằng API call thật sau
        const mockQuiz = MOCK_QUIZZES.find((q) => q.id === id);
        
        if (!mockQuiz) {
          return {
            error: {
              status: 404,
              data: { message: "Quiz not found" },
            },
          };
        }

        const quizDetail = createMockQuizDetail(mockQuiz);
        
        return {
          data: quizDetail,
        };
      },
      providesTags: (_result, _error, id) => [{ type: "Quiz", id }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetQuizzesQuery, useGetQuizByIdQuery } = quizApi;


