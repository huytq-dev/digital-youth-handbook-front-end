import { Link } from "react-router-dom";
import { Star, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedText } from "@/components/animated-text";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";

// Helper Icon cho nút Trợ giúp (hoặc dùng HelpCircle có sẵn)
const HelpIcon = ({ className }: { className?: string }) => (
  <HelpCircle className={className} />
);

const AUTH_HEADER_ANIMATED_KEY = "auth-header-animated";

export function AuthHeader() {
  // Sử dụng sessionStorage để track xem header đã animate trong session này chưa
  // Đảm bảo header chỉ animate 1 lần khi vào auth layout, không animate lại khi chuyển trang
  const shouldAnimate = useState(() => {
    if (typeof window === "undefined") return true;
    const hasAnimated = sessionStorage.getItem(AUTH_HEADER_ANIMATED_KEY);
    if (!hasAnimated) {
      sessionStorage.setItem(AUTH_HEADER_ANIMATED_KEY, "true");
      return true;
    }
    return false;
  })[0];

  return (
    <motion.header
      className={cn(
        "sticky top-0 z-50",
        "h-20", // Chiều cao cố định
        "bg-[#fff9f0]", // Nền màu kem sáng
        "border-b-2 border-black", // Viền đen dày
      )}
      initial={shouldAnimate ? { y: -100, opacity: 0 } : false}
      animate={{ y: 0, opacity: 1 }}
      transition={shouldAnimate ? { type: "spring", stiffness: 200, damping: 20 } : { duration: 0 }}
    >
      <nav className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          
          {/* Logo Section: Giống hệt LandingHeader */}
          <Link to="/" className="flex items-center gap-3 cursor-pointer group select-none relative z-10">
            <div className="relative">
              {/* Logo Box phong cách Neo-brutalism */}
              <div className="bg-blue-600 w-11 h-11 rounded-lg border-2 border-black flex items-center justify-center text-white shadow-[3px_3px_0px_black] group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-none transition-all">
                <Star fill="currentColor" size={22} className="group-hover:rotate-180 transition-transform duration-500" />
              </div>
              {/* Chấm đỏ trang trí */}
              <div className="absolute -top-1 -right-1 bg-red-500 w-3 h-3 rounded-full border-2 border-black" />
            </div>
            
            <div className="flex flex-col">
              <span className="font-black text-xl leading-none text-blue-600 tracking-tight">
                HÀNH TRANG SỐ
              </span>
              <span className="text-[10px] font-black text-white bg-orange-500 px-1 py-0.5 border border-black rounded-sm tracking-widest uppercase mt-1 w-fit rotate-[-2deg] group-hover:rotate-0 transition-transform">
                <AnimatedText>Khát Vọng</AnimatedText>
              </span>
            </div>
          </Link>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              className={cn(
                  "font-bold text-black border-2 border-transparent hover:border-black hover:bg-yellow-300 hover:shadow-[3px_3px_0px_black] transition-all active:translate-y-1 active:shadow-none hidden sm:flex items-center gap-2 rounded-xl px-4",
              )}
            >
              <HelpIcon className="h-5 w-5" />
              <AnimatedText>Trợ giúp</AnimatedText>
            </Button>
          </div>
        </div>
      </nav>
    </motion.header>
  );
}