import { Clock } from "lucide-react";
import { motion } from "framer-motion";

interface QuizGameHeaderProps {
  progress: number;
  currentQuestion: number;
  totalQuestions: number;
  timeLeft: number; // seconds
}

export const QuizGameHeader = ({
  progress,
  currentQuestion,
  totalQuestions,
  timeLeft,
}: QuizGameHeaderProps) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isTimeRunningOut = timeLeft <= 30; // Cảnh báo khi còn 30 giây

  return (
    <div className="mb-8">
      {/* Progress Bar với style Neo-Brutalism rực rỡ */}
      <div className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-base font-black uppercase text-slate-900">
            Câu hỏi {currentQuestion} / {totalQuestions}
          </span>
          <span className="text-base font-black uppercase text-yellow-500">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="relative h-8 overflow-hidden rounded-xl border-4 border-black bg-white shadow-[6px_6px_0px_black]">
          {/* Striped pattern background */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)",
            }}
          />
          <motion.div
            className="relative h-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              boxShadow: "inset -4px 0 0 rgba(0,0,0,0.2)",
            }}
          >
            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
              animate={{
                x: ["-100%", "200%"],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "linear",
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Timer Row */}
      <div className="flex items-center justify-start gap-4">
        {/* Timer với shake animation khi sắp hết giờ */}
        <motion.div
          className="flex items-center gap-3 rounded-xl border-2 border-black bg-white px-5 py-3 shadow-[4px_4px_0px_black]"
          animate={
            isTimeRunningOut
              ? {
                  x: [-3, 3, -3, 3, -2, 2, 0],
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    "4px 4px 0px black",
                    "6px 6px 0px #ef4444",
                    "4px 4px 0px black",
                  ],
                  borderColor: ["black", "#ef4444", "black"],
                  backgroundColor: ["white", "#fee2e2", "white"],
                }
              : {}
          }
          transition={
            isTimeRunningOut
              ? {
                  repeat: Infinity,
                  duration: 0.5,
                  ease: "easeInOut",
                }
              : {}
          }
        >
          <motion.div
            animate={
              isTimeRunningOut
                ? {
                    rotate: [-5, 5, -5, 5, 0],
                  }
                : {}
            }
            transition={
              isTimeRunningOut
                ? {
                    repeat: Infinity,
                    duration: 0.3,
                    ease: "easeInOut",
                  }
                : {}
            }
          >
            <Clock
              size={24}
              strokeWidth={3}
              className={isTimeRunningOut ? "text-red-500" : "text-slate-900"}
            />
          </motion.div>
          <span
            className={`text-2xl font-black tabular-nums ${
              isTimeRunningOut ? "text-red-500" : "text-slate-900"
            }`}
          >
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </span>
        </motion.div>
      </div>
    </div>
  );
};

