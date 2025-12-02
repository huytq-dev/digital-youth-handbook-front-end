import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedText } from "@/components/animated-text";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const ANIMATION_DURATION = 0.2;

export function AuthHeader() {
  return (
    <motion.header
      className={cn(
        "sticky top-0 z-50",
        "border-b border-white/50",
        "overflow-hidden"
      )}
      initial={false}
      animate={{
        height: "5rem", // h-20
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Background Blobs */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] bg-blue-400/20 rounded-full mix-blend-multiply filter blur-[80px]"
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
          className="absolute top-[10%] right-[-10%] w-[350px] h-[350px] bg-orange-300/25 rounded-full mix-blend-multiply filter blur-[80px]"
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
      </div>

      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Glass Overlay */}
      <motion.div
        className="absolute inset-0 w-full h-full border-b border-white/50"
        initial={false}
        animate={{
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(8px)",
          boxShadow:
            "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />

      {/* Content */}
      <nav className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo Section: Brand Hành Trang Số */}
          <Link to="/" className="flex items-center gap-3 cursor-pointer group">
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ opacity: 0.8 }}
              transition={{ duration: ANIMATION_DURATION }}
            >
              {/* Icon Container */}
              <motion.div
                initial={false}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-[hsl(var(--primary))] w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30"
              >
                <Star size={20} fill="currentColor" />
              </motion.div>

              {/* Text Brand */}
              <div className="flex flex-col">
                <motion.span
                  className="font-extrabold text-xl leading-none text-[hsl(var(--foreground))]"
                  initial={false}
                  transition={{ duration: 0.3 }}
                >
                  <AnimatedText>
                    HÀNH TRANG{" "}
                    <span className="text-[hsl(var(--primary))]">SỐ</span>
                  </AnimatedText>
                </motion.span>
                <span className="text-[10px] font-bold text-orange-500 tracking-[0.2em] uppercase mt-0.5">
                  <AnimatedText>Khát Vọng</AnimatedText>
                </span>
              </div>
            </motion.div>
          </Link>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Tạm ẩn LanguageToggle để tránh lỗi import */}
            <Button
              variant="ghost"
              className="text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] hover:bg-transparent hidden sm:flex"
            >
              <AnimatedText>Trợ giúp</AnimatedText>
            </Button>
          </div>
        </div>
      </nav>
    </motion.header>
  );
}
