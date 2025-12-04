import { motion } from "framer-motion";
import QuizCard from "./quiz-card";
import type { QuizSummary } from "@/features/quiz/quiz.type";

interface QuizGridProps {
  quizzes: QuizSummary[];
  isLoading: boolean;
  totalCount: number; // Tổng số lượng quiz gốc (để hiển thị con số 5/10)
  onResetFilter: () => void; // Để gắn vào nút "Xóa bộ lọc" khi không tìm thấy kết quả
}

export const QuizGrid = ({ quizzes, isLoading, totalCount, onResetFilter }: QuizGridProps) => {
  // 1. Loading State
  if (isLoading) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-900 border-t-transparent"></div>
      </div>
    );
  }

  // 2. Empty State (Không tìm thấy kết quả)
  if (quizzes.length === 0) {
    return (
      <div className="rounded-xl border-2 border-black bg-white p-8 text-center shadow-[4px_4px_0px_black]">
        <p className="font-bold text-slate-600">Không tìm thấy kết quả nào phù hợp.</p>
        <button
          onClick={onResetFilter}
          className="mt-4 font-black text-blue-600 hover:underline decoration-2 underline-offset-4"
        >
          Xóa bộ lọc & thử lại
        </button>
      </div>
    );
  }

  // Animation variants cho container (stagger children)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Delay 0.1s giữa các card
      },
    },
  };

  // 3. Grid Display
  return (
    <div>
      <motion.div
        className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {quizzes.map((quiz) => (
          <QuizCard key={quiz.id} {...quiz} />
        ))}
      </motion.div>
      {/* Kết quả hiển thị */}
      <div className="mt-8 text-right text-sm font-bold text-slate-500">
        Hiển thị <span className="text-black">{quizzes.length}</span> / {totalCount} kết quả
      </div>
    </div>
  );
};
