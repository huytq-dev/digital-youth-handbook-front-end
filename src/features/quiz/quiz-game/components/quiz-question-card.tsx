import { motion, AnimatePresence } from "framer-motion";
import type { QuizQuestion } from "@/features/quiz/quiz.type";

interface QuizQuestionCardProps {
  question: QuizQuestion;
  questionNumber: number;
  isSubmitted: boolean;
}

// Animation variants cho Stack Cards effect - Bay vút như lá bài
const cardVariants = {
  initial: {
    x: 1000,
    opacity: 0,
    scale: 0.8,
    rotate: 15,
    filter: "blur(10px)",
  },
  animate: {
    x: 0,
    opacity: 1,
    scale: 1,
    rotate: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 25,
      mass: 0.8,
    },
  },
  exit: {
    x: -1500,
    opacity: 0,
    scale: 0.6,
    rotate: -25,
    filter: "blur(10px)",
    transition: {
      duration: 0.5,
      ease: "easeIn" as const,
    },
  },
};

export const QuizQuestionCard = ({
  question,
  questionNumber,
  isSubmitted,
}: QuizQuestionCardProps) => {
  return (
    <div className="mb-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          variants={cardVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="rounded-2xl border-2 border-black bg-white p-8 shadow-[8px_8px_0px_black]"
        >
          {/* Question Number Badge */}
          <div className="mb-4 inline-block rounded-lg border-2 border-black bg-blue-400 px-4 py-1.5 shadow-[2px_2px_0px_black]">
            <span className="text-sm font-black uppercase text-black">
              Câu {questionNumber}
            </span>
          </div>

          {/* Question Text */}
          <h2 className="mb-6 text-2xl font-black leading-tight text-slate-900 md:text-3xl">
            {question.question}
          </h2>

          {/* Explanation (chỉ hiện sau khi submit) */}
          {isSubmitted && question.explanation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-4"
            >
              <p className="text-sm font-bold text-slate-700">
                <span className="font-black uppercase text-slate-900">💡 Giải thích: </span>
                {question.explanation}
              </p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

