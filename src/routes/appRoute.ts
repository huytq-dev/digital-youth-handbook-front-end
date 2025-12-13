import { lazy } from "react";
import { ROUTE_PATH } from "./routePath";

// Landing & Home
const LandingPage = lazy(() => import("@/pages/landing-page"));
const HomePage = lazy(() => import("@/pages/home"));

// Learning
const LearningTopicsPage = lazy(() => import("@/pages/learning-topics"));

// Quiz
const QuizListingPage = lazy(() => import("@/pages/quiz"));
const QuizIntroPage = lazy(() => import("@/pages/quiz/intro"));
const QuizGamePage = lazy(() => import("@/pages/quiz/game"));
const QuizResultPage = lazy(() => import("@/pages/quiz/result"));

// Profile
const ProfilePage = lazy(() => import("@/pages/profile"));

// Honor
const HonorPage = lazy(() => import("@/pages/honor"));

// Auth
const SignInPage = lazy(() => import("@/pages/auth/sign-in"));
const SignUpPage = lazy(() => import("@/pages/auth/sign-up"));
const ForgotPasswordPage = lazy(() => import("@/pages/auth/forgot-password"));
const ResetPasswordPage = lazy(() => import("@/pages/auth/reset-password"));

// Error
const ServerErrorPage = lazy(() => import("@/pages/error/server-error"));
const DisconnectedPage = lazy(() => import("@/pages/error/disconnected"));
const NotFoundPage = lazy(() => import("@/pages/error/not-found"));
const UnauthorizedPage = lazy(() => import("@/pages/error/unauthorized"));

export const publicRoutes = [
  { path: ROUTE_PATH.ROOT, component: LandingPage },
  { path: ROUTE_PATH.AUTH.SIGN_IN, component: SignInPage },
  { path: ROUTE_PATH.AUTH.SIGN_UP, component: SignUpPage },
  { path: ROUTE_PATH.AUTH.FORGOT_PASSWORD, component: ForgotPasswordPage },
  { path: ROUTE_PATH.AUTH.RESET_PASSWORD, component: ResetPasswordPage },
  { path: ROUTE_PATH.SERVER_ERROR, component: ServerErrorPage },
  { path: ROUTE_PATH.DISCONNECTED, component: DisconnectedPage },
  { path: ROUTE_PATH.NOT_FOUND, component: NotFoundPage },
  { path: ROUTE_PATH.UNAUTHORIZED, component: UnauthorizedPage },
];

export const protectedRoutes = {
  main: {
    layout: null,
    routes: [
      { path: ROUTE_PATH.HOME, component: HomePage },

      // Learning
      { path: ROUTE_PATH.LEARNING.INDEX, component: LearningTopicsPage },
      { path: ROUTE_PATH.LEARNING.DETAIL, component: LearningTopicsPage },

      // Quiz
      { path: ROUTE_PATH.QUIZ.INDEX, component: QuizListingPage },
      { path: ROUTE_PATH.QUIZ.INTRO, component: QuizIntroPage },
      { path: ROUTE_PATH.QUIZ.GAME, component: QuizGamePage },
      { path: ROUTE_PATH.QUIZ.RESULT, component: QuizResultPage },

      // Profile
      { path: ROUTE_PATH.PROFILE, component: ProfilePage },

      // Honor
      { path: ROUTE_PATH.HONOR, component: HonorPage },
    ],
  },
};
