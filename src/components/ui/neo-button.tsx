import * as React from "react";
import { cn } from "@/lib/utils";

interface NeoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "default" | "yellow" | "purple" | "pink" | "green" | "cyan";
}

const NeoButton = ({ 
  children, 
  className = "", 
  variant = "default", 
  ...props 
}: NeoButtonProps) => {

  // Bảng màu Pop Art / Neo-Brutalism
  const variants = {
    default: "bg-white text-black",
    yellow: "bg-[#FFDE00] text-black", // Vàng chanh đặc trưng
    purple: "bg-[#D6BCFA] text-black", // Tím Pastel đậm
    pink:   "bg-[#FF90E8] text-black", // Hồng Neon nhẹ
    green:  "bg-[#4ADE80] text-black", // Xanh lá tươi
    cyan:   "bg-[#67E8F9] text-black", // Xanh dương sáng
  };

  return (
    <button
      className={cn(
        // --- CẤU TRÚC CƠ BẢN ---
        "relative px-8 py-3 font-black text-lg uppercase tracking-wider rounded-xl border-2 border-black",
        
        // --- MÀU SẮC (Dựa trên variant) ---
        variants[variant],

        // --- PHYSICS ANIMATION (QUAN TRỌNG) ---
        // 1. Default: Bóng cứng lệch 4px
        "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
        "transition-all duration-200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]", // Easing function cho mượt

        // 2. Hover: Nổi lên (Lift)
        "hover:-translate-y-[2px] hover:-translate-x-[2px]",
        "hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",

        // 3. Active: Lún xuống (Press)
        "active:translate-x-[4px] active:translate-y-[4px]",
        "active:shadow-none", // Bóng biến mất khi chạm đáy

        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default NeoButton;

