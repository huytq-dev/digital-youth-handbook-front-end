import { useNavigate } from "react-router-dom";
import { ShieldAlert, Home, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTE_PATH } from "@/routes/routePath";
import { ROLES } from "@/config/system-roles";
import { getUserRole } from "@/lib/auth.utils";
import { useDispatch } from "react-redux";
import { logout } from "@/features/auth/auth.slice";

export default function UnauthorizedPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  // 2. Xử lý về trang chủ (Dựa trên Role hiện tại)
  const handleGoHome = () => {
    const role = getUserRole();

    switch (role) {
      case ROLES.ADMIN:
        navigate(ROUTE_PATH.ADMIN);
        break;

      case ROLES.USER:
        navigate(ROUTE_PATH.HOME);
        break;

      default:
        // Nếu không xác định được role, đẩy về trang login để an toàn
        navigate(ROUTE_PATH.AUTH.SIGN_IN);
        break;
    }
  };

  // 3. Xử lý đăng xuất/Đổi tài khoản
  const handleLogout = () => {
    // Dispatch logout action để xóa Redux state và localStorage
    dispatch(logout());
    // Điều hướng về trang đăng nhập
    navigate(ROUTE_PATH.AUTH.SIGN_IN);
  };

  return (
    <div
      className={cn(
        "min-h-screen flex items-center justify-center",
        "bg-[hsl(var(--background))] text-[hsl(var(--foreground))]",
        "p-4"
      )}
    >
      <div
        className={cn(
          "max-w-2xl w-full",
          "bg-white border-2 border-black rounded-2xl",
          "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
          "p-8 md:p-12",
          "text-center"
        )}
      >
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div
            className={cn(
              "w-24 h-24 md:w-32 md:h-32",
              "bg-[#DBEAFE] border-2 border-black rounded-2xl",
              "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
              "flex items-center justify-center"
            )}
          >
            <ShieldAlert className="w-12 h-12 md:w-16 md:h-16 text-blue-600" strokeWidth={2.5} />
          </div>
        </div>

        {/* Error Code */}
        <h1
          className={cn(
            "text-8xl md:text-9xl font-black mb-4",
            "text-black tracking-tight",
            "drop-shadow-[2px_2px_0px_rgba(0,0,0,0.3)]"
          )}
        >
          401
        </h1>

        {/* Title */}
        <h2
          className={cn(
            "text-3xl md:text-4xl font-black mb-4",
            "text-black uppercase tracking-wider"
          )}
        >
          Không có quyền truy cập
        </h2>

        {/* Description */}
        <p
          className={cn(
            "text-lg md:text-xl mb-8",
            "text-slate-700 font-bold",
            "max-w-md mx-auto"
          )}
        >
          Bạn không có quyền truy cập trang này. Vui lòng đăng nhập bằng tài khoản có quyền cao hơn hoặc quay lại trang chủ.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleLogout}
            className={cn(
              "inline-flex items-center gap-3",
              "px-8 py-4 font-black text-lg uppercase tracking-wider",
              "rounded-xl border-2 border-black",
              "bg-[#4ADE80] text-black",
              "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
              "transition-all duration-200",
              "hover:-translate-y-[2px] hover:-translate-x-[2px]",
              "hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
              "active:translate-x-[4px] active:translate-y-[4px]",
              "active:shadow-none"
            )}
          >
            <LogOut className="w-5 h-5" />
            Đăng xuất
          </button>

          <button
            onClick={handleGoHome}
            className={cn(
              "inline-flex items-center gap-3",
              "px-8 py-4 font-black text-lg uppercase tracking-wider",
              "rounded-xl border-2 border-black",
              "bg-[#FFDE00] text-black",
              "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
              "transition-all duration-200",
              "hover:-translate-y-[2px] hover:-translate-x-[2px]",
              "hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
              "active:translate-x-[4px] active:translate-y-[4px]",
              "active:shadow-none"
            )}
          >
            <Home className="w-5 h-5" />
            Về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
}
