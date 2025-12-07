import { Link } from "react-router-dom";
import { WifiOff, Home, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTE_PATH } from "@/routes/routePath";

export default function DisconnectedPage() {
  const handleRefresh = () => {
    window.location.reload();
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
              "bg-[#FEF3C7] border-2 border-black rounded-2xl",
              "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
              "flex items-center justify-center"
            )}
          >
            <WifiOff className="w-12 h-12 md:w-16 md:h-16 text-amber-600" strokeWidth={2.5} />
          </div>
        </div>

        {/* Title */}
        <h1
          className={cn(
            "text-4xl md:text-5xl font-black mb-4",
            "text-black uppercase tracking-wider"
          )}
        >
          Mất kết nối
        </h1>

        {/* Description */}
        <p
          className={cn(
            "text-lg md:text-xl mb-8",
            "text-slate-700 font-bold",
            "max-w-md mx-auto"
          )}
        >
          Có vẻ như bạn đang ngoại tuyến. Vui lòng kiểm tra kết nối mạng và thử lại.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleRefresh}
            className={cn(
              "inline-flex items-center gap-3",
              "px-8 py-4 font-black text-lg uppercase tracking-wider",
              "rounded-xl border-2 border-black",
              "bg-[#67E8F9] text-black",
              "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
              "transition-all duration-200",
              "hover:-translate-y-[2px] hover:-translate-x-[2px]",
              "hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
              "active:translate-x-[4px] active:translate-y-[4px]",
              "active:shadow-none"
            )}
          >
            <RefreshCw className="w-5 h-5" />
            Thử lại
          </button>

          <Link to={ROUTE_PATH.ROOT}>
            <button
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
              Trang chủ
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}