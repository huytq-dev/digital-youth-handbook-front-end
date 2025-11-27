import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const LandingPage = lazy(() => import("@/pages/landing-page"));

const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-[hsl(var(--blue-600))]" />
  </div>
);

export const Router = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Suspense>
  );
};




