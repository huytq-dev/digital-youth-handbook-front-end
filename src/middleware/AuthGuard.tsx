import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser, selectIsAuthenticated } from "@/features/auth/auth.slice";
import { ROUTE_PATH } from "@/routes/routePath";

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: string[]; // Array các role được phép truy cập
}

const AuthGuard = ({ children, allowedRoles }: AuthGuardProps) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectCurrentUser);
  const location = useLocation();

  // 2. CHECK 1: Chưa đăng nhập -> Đá về Login
  if (!isAuthenticated || !user) {
    // state={{ from: location }} giúp login xong quay lại đúng trang đang xem
    return <Navigate to={ROUTE_PATH.AUTH.SIGN_IN} state={{ from: location }} replace />;
  }

  // 3. CHECK 2: Kiểm tra Role (Authorization)
  // Nếu route này yêu cầu role cụ thể mà user không có
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.roleName)) {
    return <Navigate to={ROUTE_PATH.UNAUTHORIZED} replace />; // Trang báo lỗi không có quyền
  }

  // 4. Hợp lệ -> Render trang
  return children;
};

export default AuthGuard;