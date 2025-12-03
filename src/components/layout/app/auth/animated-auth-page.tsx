import { type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { pageTransitionVariants } from "@/features/auth/constants/auth.constants";

interface AnimatedAuthPageProps {
  children: ReactNode;
}

const PAGE_ORDER: Record<string, number> = {
  "/auth/sign-in": 0,
  "/auth/sign-up": 1,
  "/auth/forgot-password": 2, // Quên mật khẩu nằm xa nhất
};

export function AnimatedAuthPage({ children }: AnimatedAuthPageProps) {
  const location = useLocation();
  const pathname = location.pathname;

  const pageIndex = PAGE_ORDER[pathname] ?? 0;

  const direction = pageIndex === 1 ? 1 : -1;

  return (
    // mode="wait": Chờ cái cũ biến mất rồi cái mới mới hiện ra (tránh bị vỡ layout do 2 form cùng lúc)
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={pathname} // Key quan trọng để React biết là component đã đổi
        custom={direction} // Truyền direction vào variant
        variants={pageTransitionVariants}
        initial="enter"
        animate="center"
        exit="exit"
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}