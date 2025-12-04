import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/scroll-to-top";

// Landing & Home
const LandingPage = lazy(() => import("@/pages/landing-page"));
const HomePage = lazy(() => import("@/pages/home"));

// Learning Topics
const LearningTopicsPage = lazy(() => import("@/pages/learning-topics"));

// Quiz Pages
const QuizListingPage = lazy(() => import("@/pages/quiz"));
const QuizIntroPage = lazy(() => import("@/pages/quiz/intro"));
const QuizGamePage = lazy(() => import("@/pages/quiz/game"));
const QuizResultPage = lazy(() => import("@/pages/quiz/result"));

// Profile
const ProfilePage = lazy(() => import("@/pages/profile"));

// Auth Pages
const SignInPage = lazy(() => import("@/pages/auth/sign-in"));
const SignUpPage = lazy(() => import("@/pages/auth/sign-up"));
const ForgotPasswordPage = lazy(() => import("@/pages/auth/forgot-password"));
const ResetPasswordPage = lazy(() => import("@/pages/auth/reset-password"));
const VerifyEmailPage = lazy(() => import("@/pages/auth/verify-email"));

const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-[hsl(var(--blue-600))]" />
  </div>
);

export const Router = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <ScrollToTop />
      <Routes>
        {/* Landing & Home */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />

        {/* Learning Topics */}
        <Route path="/learning-topics" element={<LearningTopicsPage />} />
        <Route path="/learning-topics/:slug" element={<LearningTopicsPage />} />

        {/* Quiz Routes */}
        <Route path="/quizzes" element={<QuizListingPage />} />
        <Route path="/quizzes/:id" element={<QuizIntroPage />} />
        <Route path="/quizzes/:id/game" element={<QuizGamePage />} />
        <Route path="/quizzes/:id/result" element={<QuizResultPage />} />

        {/* Profile */}
        <Route path="/profile" element={<ProfilePage />} />

        {/* Auth Routes */}
        <Route path="/auth/sign-in" element={<SignInPage />} />
        <Route path="/auth/sign-up" element={<SignUpPage />} />
        <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
        <Route path="/auth/verify-email" element={<VerifyEmailPage />} />
      </Routes>
    </Suspense>
  );
};
