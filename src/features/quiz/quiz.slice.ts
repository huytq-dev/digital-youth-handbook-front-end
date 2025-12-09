import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { QuizQuestionResponse } from "@/features/quiz/quiz.api";
import type { QuizResultData } from "@/features/quiz/quiz.type";

// ========================================
// Interfaces
// ========================================

export interface QuizAnswerData {
  questionId: string;
  selectedOptionId: string;
}

export interface CurrentAttempt {
  attemptId: string;
  quizId: string;
  title: string;
  timeLimitMinutes: number;
  startedAt: Date;
  questions: QuizQuestionResponse[];
  answers: QuizAnswerData[];
}

export interface QuizState {
  currentAttempt: CurrentAttempt | null;
  quizResult: QuizResultData | null;
}

// ========================================
// Initial State
// ========================================

const initialState: QuizState = {
  currentAttempt: null,
  quizResult: null,
};

// ========================================
// Slice
// ========================================

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    // Bắt đầu quiz - lưu attempt info và questions từ API
    startAttempt: (
      state,
      action: PayloadAction<Omit<CurrentAttempt, "answers">>
    ) => {
      state.currentAttempt = {
        ...action.payload,
        answers: [],
      };
      state.quizResult = null;
    },

    // Chọn đáp án cho một câu hỏi
    selectAnswer: (state, action: PayloadAction<QuizAnswerData>) => {
      if (!state.currentAttempt) return;

      const existingIndex = state.currentAttempt.answers.findIndex(
        (a) => a.questionId === action.payload.questionId
      );

      if (existingIndex >= 0) {
        // Cập nhật đáp án cũ
        state.currentAttempt.answers[existingIndex] = action.payload;
      } else {
        // Thêm đáp án mới
        state.currentAttempt.answers.push(action.payload);
      }
    },

    // Nộp quiz - lưu kết quả và xóa currentAttempt
    submitAttempt: (state, action: PayloadAction<QuizResultData>) => {
      state.quizResult = action.payload;
      state.currentAttempt = null;
    },

    // Reset quiz state
    resetQuiz: (state) => {
      state.currentAttempt = null;
      state.quizResult = null;
    },
  },
});

// ========================================
// Export Actions
// ========================================

export const { startAttempt, selectAnswer, submitAttempt, resetQuiz } =
  quizSlice.actions;

// ========================================
// Export Reducer
// ========================================

export default quizSlice.reducer;
