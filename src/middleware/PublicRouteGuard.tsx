import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser, selectIsAuthenticated } from "@/features/auth/auth.slice";
import { ROLES } from "@/config/system-roles";
import { ROUTE_PATH } from "@/routes/routePath";

interface PublicRouteGuardProps {
  children: React.ReactNode;
  /**
   * Nếu true, cho phép truy cập ngay cả khi đã đăng nhập (dùng cho error pages)
   */
  allowWhenAuthenticated?: boolean;
}

/**
 * PublicRouteGuard
 * 
 * Logic:
 * - Nếu CHƯA đăng nhập: Cho phép truy cập (render children)
 * - Nếu ĐÃ đăng nhập:
 *   - Nếu allowWhenAuthenticated = true: Cho phép truy cập (dùng cho error pages)
 *   - Nếu allowWhenAuthenticated = false: Redirect về trang home dựa trên role
 */
const PublicRouteGuard = ({ children, allowWhenAuthenticated = false }: PublicRouteGuardProps) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectCurrentUser);

  // Nếu đã đăng nhập và không cho phép truy cập khi authenticated
  if (isAuthenticated && user && !allowWhenAuthenticated) {
    // Redirect về trang home dựa trên role
    if (user.roleName === ROLES.ADMIN) {
      return <Navigate to={ROUTE_PATH.ADMIN} replace />;
    }

    return <Navigate to={ROUTE_PATH.HOME} replace />;
  }

  // Cho phép truy cập
  return <>{children}</>;
};

export default PublicRouteGuard;
