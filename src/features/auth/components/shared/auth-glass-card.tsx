import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface AuthGlassCardProps {
  children: ReactNode;
  className?: string;
}

export function AuthGlassCard({ children, className }: AuthGlassCardProps) {
  return (
    <motion.div
      className={cn(
        "w-full max-w-md",
        // Glassmorphism Styles
        // Sử dụng biến theme: bg-card (Light: White, Dark: Dark Gray)
        // Thêm backdrop-blur để tạo hiệu ứng kính mờ
        "bg-[hsl(var(--card))]/80 backdrop-blur-2xl",
        
        // Border: Sử dụng biến border thay vì white/60 để nhìn rõ hơn trên nền sáng
        "border border-[hsl(var(--border))]/50",
        
        // Shadow & Spacing
        "shadow-2xl rounded-3xl p-8 sm:p-12",
        "transition-all duration-300",
        
        // Hover effect (optional): Tăng độ sáng viền khi hover
        "hover:border-[hsl(var(--border))]/80",
        
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        duration: 0.6,
        bounce: 0.2,
      }}
    >
      {children}
    </motion.div>
  );
}