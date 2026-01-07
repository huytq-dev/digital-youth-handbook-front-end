import { Suspense, type ComponentType, type ReactNode } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { ScrollToTop } from "@/components/scroll-to-top";
import { publicRoutes, protectedRoutes } from "./routes/appRoute";
import PublicRouteGuard from "@/middleware/PublicRouteGuard";
import AuthGuard from "@/middleware/AuthGuard";

// Optimized PageLoader với skeleton loading
const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-[#fff9f0]">
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 rounded-full bg-blue-600/20" />
        </div>
      </div>
      <p className="text-sm font-semibold text-slate-600 animate-pulse">
        Đang tải...
      </p>
    </div>
  </div>
);

export const Router = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <ScrollToTop />
      <Routes>
        {/* 1. Map Public Routes */}
        {publicRoutes.map((route, index) => {
          return (
            <Route
              key={`public-${index}`}
              path={route.path}
              element={
                <PublicRouteGuard>
                  <route.component />
                </PublicRouteGuard>
              }
            />
          );
        })}

        {/* 2. Map Protected Routes */}
        {Object.entries(protectedRoutes).map(([key, group]) => {
          const Layout = group.layout as ComponentType<{
            children: ReactNode;
          }> | null;

          if (Layout) {
            return (
              <Route
                key={key}
                element={
                  <Layout>
                    <Outlet />
                  </Layout>
                }
              >
                {group.routes.map((route, idx) => (
                  <Route
                    key={`${key}-${idx}`}
                    path={route.path}
                    element={
                      <AuthGuard>
                        <route.component />
                      </AuthGuard>
                    }
                  />
                ))}
              </Route>
            );
          }

          // Nếu không có Layout (Render trực tiếp)
          return group.routes.map((route, idx) => (
            <Route
              key={`standalone-${key}-${idx}`}
              path={route.path}
              element={
                <AuthGuard>
                  <route.component />
                </AuthGuard>
              }
            />
          ));
        })}
      </Routes>
    </Suspense>
  );
};
