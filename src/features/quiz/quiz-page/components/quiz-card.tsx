import { motion } from "framer-motion";
import { Clock, Users, Trophy, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { QuizSummary, QuizDifficulty } from "@/features/quiz/quiz.type";

interface QuizCardProps extends QuizSummary {}

// Màu sắc rực rỡ hơn, chữ đen để tạo tương phản mạnh
const difficultyColors: Record<QuizDifficulty, string> = {
  Easy: "bg-green-400",
  Medium: "bg-yellow-400",
  Hard: "bg-red-400",
};

// Animation variants cho card
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 20,
    },
  },
  hover: {
    scale: 1.02,
    y: -4,
    boxShadow: "8px 8px 0px black",
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 17,
    },
  },
};

const QuizCard = ({
  id,
  title,
  difficulty,
  durationMinutes,
  totalQuestions,
  plays,
}: QuizCardProps) => {
  return (
    <Link to={`/quizzes/${id}`} className="group block h-full">
      <motion.div
        className="relative flex h-full flex-col overflow-hidden rounded-2xl border-2 border-black bg-white"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        style={{
          boxShadow: "4px 4px 0px black",
        }}
      >
        {/* --- Content Section --- */}
        <div className="flex flex-1 flex-col p-5">
          
          {/* Meta Info Row */}
          <div className="mb-3 flex items-center justify-between">
            <span
              className={`${difficultyColors[difficulty]} rounded-md border-2 border-black px-2 py-0.5 text-[10px] font-black uppercase text-black`}
            >
              {difficulty}
            </span>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
              <Users size={14} className="text-black" />
              <span>{plays}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="mb-4 line-clamp-2 text-xl font-black leading-tight text-slate-900 transition-colors group-hover:text-blue-700">
            {title}
          </h3>

          {/* Footer Info (Đẩy xuống đáy bằng mt-auto) */}
          <div className="mt-auto flex items-center justify-between border-t-2 border-dashed border-slate-200 pt-4">
            <div className="flex gap-3 text-xs font-bold text-slate-600">
              <div className="flex items-center gap-1">
                <Clock size={14} className="text-black" /> 
                <span>{durationMinutes}'</span>
              </div>
              <div className="flex items-center gap-1">
                <Trophy size={14} className="text-black" /> 
                <span>{totalQuestions} câu</span>
              </div>
            </div>

            {/* Action Button: Vuông bo góc thay vì tròn */}
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-black bg-black text-white transition-all group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">
              <ArrowRight size={16} strokeWidth={3} className="transition-transform group-hover:-rotate-45" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default QuizCard;
export { QuizCard };