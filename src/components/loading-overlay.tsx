import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react"; // Sử dụng icon spinner tiêu chuẩn
import { useTranslation } from "react-i18next";
import { AnimatedText } from "./animated-text";
import { cn } from "@/lib/utils";

interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
}

export function LoadingOverlay({ isLoading, message }: LoadingOverlayProps) {
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          // Fade in/out cho toàn bộ overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
        >
          {/* 1. Minimalist Backdrop: Nền tối nhẹ và mờ */}
          <div className="absolute inset-0 bg-[var(--color-dark-blue)]/40 backdrop-blur-sm" />

          {/* 2. Minimalist Card: Hộp nội dung sạch sẽ */}
          <motion.div
            // Hiệu ứng scale nhẹ nhàng khi xuất hiện
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 30,
            }}
            className={cn(
              "relative flex flex-col items-center justify-center p-6 rounded-2xl",
              "bg-white shadow-xl border border-gray-100",
              "min-w-[200px] max-w-[80vw]"
            )}
          >
            {/* Spinner đơn giản */}
            <Loader2 className="w-10 h-10 text-[var(--color-dark-blue)] animate-spin mb-4" />

            {/* Nội dung text */}
            <div className="text-center space-y-1">
              <h3 className="text-base font-semibold text-gray-900">
                <AnimatedText>
                  {message || t("common.loading", "Đang xử lý...")}
                </AnimatedText>
              </h3>

              {/* Chỉ hiện dòng phụ nếu có message chính, giúp gọn gàng hơn */}
              <p className="text-sm text-gray-500">
                <AnimatedText>
                  {t("common.pleaseWait", "Vui lòng đợi")}
                </AnimatedText>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
