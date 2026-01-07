import { useSelector } from "react-redux";
import {
  selectCurrentUser,
  selectIsAuthenticated,
} from "@/features/auth/auth.slice";

interface PublicRouteGuardProps {
  children: React.ReactNode;
}

/**
 * PublicRouteGuard
 *
 * Logic:
 * - Nếu CHƯA đăng nhập: Cho phép truy cập (render children)
 * - Nếu ĐÃ đăng nhập: Luôn cho phép truy cập tất cả trang public (không redirect)
 */
const PublicRouteGuard = ({ children }: PublicRouteGuardProps) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectCurrentUser);

  // Nếu đã đăng nhập, cho phép truy cập tất cả trang public (không redirect)
  if (isAuthenticated && user) {
    return <>{children}</>;
  }

  // Nếu chưa đăng nhập, cho phép truy cập
  return <>{children}</>;
};

export default PublicRouteGuard;
