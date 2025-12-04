import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { QuizAnswer, QuizSessionState } from "./quiz.type";

const initialState: QuizSessionState = {
  quizId: null,
  status: "idle",
  startedAt: null,
  finishedAt: null,
  currentQuestionIndex: 0,
  answers: [],
  score: 0,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    startQuiz(state, action: PayloadAction<{ quizId: string }>) {
      state.quizId = action.payload.quizId;
      state.status = "in-progress";
      state.startedAt = new Date().toISOString();
      state.finishedAt = null;
      state.currentQuestionIndex = 0;
      state.answers = [];
      state.score = 0;
    },
    goToQuestion(state, action: PayloadAction<{ index: number }>) {
      state.currentQuestionIndex = action.payload.index;
    },
    answerQuestion(state, action: PayloadAction<QuizAnswer>) {
      const existingIndex = state.answers.findIndex(
        (a) => a.questionId === action.payload.questionId
      );
      if (existingIndex >= 0) {
        state.answers[existingIndex] = action.payload;
      } else {
        state.answers.push(action.payload);
      }
    },
    finishQuiz(state, action: PayloadAction<{ score: number }>) {
      state.status = "completed";
      state.finishedAt = new Date().toISOString();
      state.score = action.payload.score;
    },
    resetQuiz() {
      return initialState;
    },
  },
});

export const { startQuiz, goToQuestion, answerQuestion, finishQuiz, resetQuiz } =
  quizSlice.actions;

export const quizReducer = quizSlice.reducer;


