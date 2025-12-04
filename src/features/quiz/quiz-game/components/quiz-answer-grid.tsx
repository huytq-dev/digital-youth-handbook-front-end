import { motion } from "framer-motion";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";

interface QuizAnswerGridProps {
  options: string[];
  correctAnswerIndex: number;
  selectedAnswer: number | null;
  isSubmitted: boolean;
  onAnswerSelect: (optionIndex: number) => void;
  onAnswerSubmit: (optionIndex: number | null) => void;
  onNextQuestion: () => void;
  isLastQuestion: boolean;
}

// Animation variants cho nút đáp án
const answerButtonVariants = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: "4px 4px 0px black",
  },
  hover: {
    scale: 1.02,
    y: -2,
    x: -2,
    boxShadow: "6px 6px 0px black",
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 10,
    },
  },
  tap: {
    scale: 0.98,
    y: 4,
    x: 4,
    boxShadow: "0px 0px 0px black",
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 15,
    },
  },
};

export const QuizAnswerGrid = ({
  options,
  correctAnswerIndex,
  selectedAnswer,
  isSubmitted,
  onAnswerSelect,
  onAnswerSubmit,
  onNextQuestion,
  isLastQuestion,
}: QuizAnswerGridProps) => {
  const getAnswerState = (index: number): "correct" | "wrong" | "selected" | "default" => {
    if (!isSubmitted) {
      return selectedAnswer === index ? "selected" : "default";
    }
    if (index === correctAnswerIndex) return "correct";
    if (index === selectedAnswer && index !== correctAnswerIndex) return "wrong";
    return "default";
  };

  const getAnswerClasses = (index: number): string => {
    const state = getAnswerState(index);
    const baseClasses =
      "relative flex w-full items-center justify-between rounded-xl border-2 border-black px-6 py-4 text-left font-black uppercase text-black shadow-[4px_4px_0px_black] transition-all";
    
    if (state === "correct") {
      return `${baseClasses} bg-green-400`;
    }
    if (state === "wrong") {
      return `${baseClasses} bg-red-500`;
    }
    if (state === "selected") {
      return `${baseClasses} bg-indigo-400`;
    }
    return `${baseClasses} bg-white`;
  };

  const handleButtonClick = (index: number) => {
    if (isSubmitted) return;
    onAnswerSelect(index);
    // Auto submit after selecting
    setTimeout(() => {
      onAnswerSubmit(index);
    }, 300);
  };

  return (
    <div className="space-y-6">
      {/* Answer Grid - 2x2 cho desktop, 1 column cho mobile */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {options.map((option, index) => {
          const state = getAnswerState(index);
          const isCorrect = state === "correct";
          const isWrong = state === "wrong";
          const isSelected = state === "selected";

          return (
            <motion.button
              key={index}
              onClick={() => handleButtonClick(index)}
              disabled={isSubmitted}
              variants={answerButtonVariants}
              initial="rest"
              whileHover={!isSubmitted ? "hover" : "rest"}
              whileTap={!isSubmitted ? "tap" : "rest"}
              animate={
                isSubmitted
                  ? isCorrect
                    ? "correct"
                    : isWrong
                    ? "wrong"
                    : "rest"
                  : isSelected
                  ? "selected"
                  : "rest"
              }
              className={getAnswerClasses(index)}
            >
              {/* Option Label */}
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-black bg-black text-white shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="text-lg md:text-xl">{option}</span>
              </div>

              {/* Feedback Icons */}
              {isSubmitted && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 15,
                  }}
                >
                  {isCorrect ? (
                    <CheckCircle2 size={28} className="text-green-700" strokeWidth={3} />
                  ) : isWrong ? (
                    <XCircle size={28} className="text-red-700" strokeWidth={3} />
                  ) : null}
                </motion.div>
              )}

              {/* Confetti effect cho đáp án đúng - Nhiều màu sắc và chuyển động tự nhiên */}
              {isCorrect && isSubmitted && (
                <motion.div
                  className="pointer-events-none absolute inset-0 overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {[...Array(12)].map((_, i) => {
                    const colors = ["#fbbf24", "#f59e0b", "#ef4444", "#8b5cf6", "#3b82f6", "#10b981"];
                    const angle = (i / 12) * 360;
                    const distance = 80 + Math.random() * 40;
                    const randomDelay = Math.random() * 0.3;
                    
                    return (
                      <motion.div
                        key={i}
                        className="absolute left-1/2 top-1/2 h-3 w-3 rounded-full"
                        style={{
                          backgroundColor: colors[i % colors.length],
                          boxShadow: "0 0 4px rgba(0,0,0,0.3)",
                        }}
                        initial={{
                          x: 0,
                          y: 0,
                          rotate: 0,
                          scale: 1,
                          opacity: 1,
                        }}
                        animate={{
                          x: Math.cos((angle * Math.PI) / 180) * distance,
                          y: Math.sin((angle * Math.PI) / 180) * distance - 30,
                          rotate: 720,
                          scale: [1, 1.2, 0],
                          opacity: [1, 1, 0],
                        }}
                        transition={{
                          duration: 1,
                          delay: randomDelay,
                          ease: "easeOut" as const,
                        }}
                      />
                    );
                  })}
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Next Question Button */}
      {isSubmitted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-end"
        >
          <motion.button
            onClick={onNextQuestion}
            variants={answerButtonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            className="group flex items-center gap-3 rounded-xl border-2 border-black bg-yellow-400 px-8 py-4 text-xl font-black uppercase text-black shadow-[4px_4px_0px_black] transition-all"
          >
            {isLastQuestion ? "Xem kết quả" : "Câu tiếp theo"}
            <ArrowRight
              size={24}
              strokeWidth={3}
              className="transition-transform group-hover:translate-x-1"
            />
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

