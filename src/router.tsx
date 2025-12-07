import { Suspense, type ComponentType, type ReactNode } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { ScrollToTop } from "@/components/scroll-to-top";
import { publicRoutes, protectedRoutes } from "./routes/appRoute";
import PublicRouteGuard from "@/middleware/PublicRouteGuard";
import AuthGuard from "@/middleware/AuthGuard";
import { ROUTE_PATH } from "./routes/routePath";

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
        
        {/* 1. Map Public Routes */}
        {publicRoutes.map((route, index) => {
          // Error pages được phép truy cập ngay cả khi đã đăng nhập
          const isErrorPage =
            route.path === ROUTE_PATH.SERVER_ERROR ||
            route.path === ROUTE_PATH.DISCONNECTED ||
            route.path === ROUTE_PATH.NOT_FOUND ||
            route.path === ROUTE_PATH.UNAUTHORIZED;

          return (
            <Route 
              key={`public-${index}`} 
              path={route.path} 
              element={
                <PublicRouteGuard allowWhenAuthenticated={isErrorPage}>
                  <route.component />
                </PublicRouteGuard>
              }
            />
          );
        })}

        {/* 2. Map Protected Routes */}
        {Object.entries(protectedRoutes).map(([key, group]) => {
          const Layout = group.layout as ComponentType<{ children: ReactNode }> | null;

          if (Layout) {
            return (
              <Route key={key} element={<Layout><Outlet /></Layout>}>
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
