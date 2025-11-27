import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { AuthHeader } from "@/features/auth/components/auth-header";
import { cn } from "@/lib/utils";

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={cn(
        "relative min-h-screen w-full",
        "bg-[hsl(var(--background))] text-[hsl(var(--foreground))]", // Sử dụng biến theme chuẩn
        "flex flex-col items-center justify-center", // Căn giữa nội dung
        "overflow-hidden transition-colors duration-300"
      )}
    >
      {/* Auth Header */}
      <div className="absolute top-0 w-full z-20">
         <AuthHeader />
      </div>

      {/* Background Blobs - Tự động theo màu Primary/Secondary của hệ thống */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Blob 1: Primary Color (Thay thế Blue) */}
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

        {/* Blob 2: Secondary/Accent Color (Thay thế Orange) */}
        {/* Dùng màu Secondary để tạo tương phản nhẹ hoặc Accent cho nổi bật */}
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

        {/* Blob 3: Primary Color (Hỗ trợ phần dưới) */}
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

      {/* Noise Texture - Giữ nguyên nhưng chỉnh opacity để hợp cả Dark mode */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Content Container */}
      <div className="relative z-10 w-full px-4 py-12 sm:px-6 lg:px-8 flex justify-center">
        <div className="w-full max-w-md space-y-8">
          {children}
        </div>
      </div>
    </div>
  );
}