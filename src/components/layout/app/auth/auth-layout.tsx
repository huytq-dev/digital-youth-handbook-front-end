import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { AuthHeader } from "@/features/auth/components/auth-header";
import { AnimatedAuthPage } from "@/components/layout/app/auth/animated-auth-page";
import { cn } from "@/lib/utils";

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={cn(
        "relative w-full",
        // [FIX 1] Dùng dvh để fix lỗi thanh địa chỉ mobile
        // Mobile: min-h-[100dvh] để vừa khít màn hình nhưng vẫn scroll được nếu content dài
        // Desktop: h-screen để cố định
        "min-h-[100dvh] lg:h-screen", 
        "bg-[hsl(var(--background))] text-[hsl(var(--foreground))]",
        "flex flex-col", // Flex column để header và content xếp dọc
        "overflow-x-hidden" // Chỉ ẩn scroll ngang
      )}
    >
      {/* Auth Header - Fixed trên cùng */}
      <div className="fixed top-0 w-full z-20">
         <AuthHeader />
      </div>

      {/* Background Blobs */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] bg-[hsl(var(--primary))]/20 rounded-full blur-[80px]"
          animate={{
            x: [0, 80, 0],
            y: [0, 40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-[10%] right-[-10%] w-[350px] h-[350px] bg-[hsl(var(--secondary))]/30 rounded-full blur-[80px]"
          animate={{
            x: [0, -80, 0],
            y: [0, -40, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-[-30%] left-[30%] w-[450px] h-[450px] bg-[hsl(var(--primary))]/10 rounded-full blur-[90px]"
          animate={{
            x: [0, 50, 0],
            y: [0, 50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Content Container - [FIX QUAN TRỌNG TẠI ĐÂY] */}
      {/* 1. Bỏ 'min-h-screen' ở đây vì cha đã lo chiều cao.
         2. Dùng 'flex-1' để nó chiếm toàn bộ khoảng trống còn lại.
         3. Dùng 'flex items-center justify-center' để căn giữa form.
         4. Padding top/bottom chỉ để tránh header và tạo khoảng thở, không gây cộng dồn chiều cao lỗi.
      */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full px-4 pt-24 pb-8 sm:pt-20 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg">
          <AnimatedAuthPage>{children}</AnimatedAuthPage>
        </div>
      </div>
    </div>
  );
}