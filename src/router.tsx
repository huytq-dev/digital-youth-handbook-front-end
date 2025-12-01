import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/scroll-to-top";

const LandingPage = lazy(() => import("@/pages/landing-page"));
const SignInPage = lazy(() => import("@/pages/home/sign-in"));
const SignUpPage = lazy(() => import("@/pages/home/sign-up"));
const ForgotPasswordPage = lazy(() => import("@/pages/home/forgot-password"));
const ResetPasswordPage = lazy(() => import("@/pages/home/reset-password"));
const VerifyEmailPage = lazy(() => import("@/pages/home/verify-email"));

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
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/sign-in" element={<SignInPage />} />
        <Route path="/auth/sign-up" element={<SignUpPage />} />
        <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
        <Route path="/auth/verify-email" element={<VerifyEmailPage />} />
      </Routes>
    </Suspense>
  );
};




