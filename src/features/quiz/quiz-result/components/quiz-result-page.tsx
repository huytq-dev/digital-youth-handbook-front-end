import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  motion,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Trophy,
  CheckCircle2,
  Clock,
  RotateCcw,
  Home,
  Eye,
  EyeOff,
  Frown,
  Meh,
  Crown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { QuizAnswer, QuizQuestion } from "@/features/quiz/quiz.type";

interface QuizResultPageProps {
  score: number; // Nhận từ API: data.totalScore (ví dụ: 4)
  totalQuestions: number; // Có thể lấy từ data.questions.length
  timeSpent: number; // seconds
  answers: QuizAnswer[];
  questions: QuizQuestion[]; // List câu hỏi từ API start quiz
  quizId: string;
}

// Helper: Phân loại kết quả và tin nhắn dựa trên score/total
const getResultConfig = (score: number, total: number) => {
  const scorePercentage = total > 0 ? (score / total) * 100 : 0;
  
  if (scorePercentage === 100) {
    return {
      title: "TUYỆT ĐỐI!!!",
      desc: "Bạn là thánh Quiz rồi! 🏆",
      bg: "bg-yellow-400",
      text: "text-yellow-900",
      icon: Crown,
      showConfetti: true,
    };
  }
  if (scorePercentage >= 80) {
    return {
      title: "XUẤT SẮC!",
      desc: "Kiến thức quá uy tín! 💪",
      bg: "bg-green-400",
      text: "text-green-900",
      icon: Trophy,
      showConfetti: true,
    };
  }
  if (scorePercentage >= 50) {
    return {
      title: "TẠM ỔN",
      desc: "Đã qua môn, nhưng cần cố gắng thêm. 📚",
      bg: "bg-blue-300",
      text: "text-blue-900",
      icon: Meh,
      showConfetti: false,
    };
  }
  return {
    title: "ĐỪNG NẢN CHÍ!",
    desc: "THẤT BẠI LÀ MẸ THÀNH CÔNG!",
    bg: "bg-pink-200",
    text: "text-pink-900",
    icon: Frown,
    showConfetti: false,
  };
};

// Component số chạy (Count Up)
const AnimatedNumber = ({ value }: { value: number }) => {
  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => Math.round(current)); 

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span>{display}</motion.span>;
};

// Confetti Component
const Confetti = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(30)].map((_, i) => {
        const colors = [
          "#fbbf24", "#f59e0b", "#ef4444", "#8b5cf6",
          "#3b82f6", "#10b981", "#ec4899",
        ];
        const delay = Math.random() * 0.5;
        const duration = 2 + Math.random() * 1;
        const angle = (i / 30) * 360;
        const distance = 300 + Math.random() * 200;

        return (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 h-3 w-3 rounded-sm"
            style={{ backgroundColor: colors[i % colors.length] }}
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{
              x: Math.cos((angle * Math.PI) / 180) * distance,
              y: Math.sin((angle * Math.PI) / 180) * distance - 100,
              rotate: 720 + (Math.random() - 0.5) * 360,
              scale: [1, 1.2, 0],
              opacity: [1, 1, 0],
            }}
            transition={{ duration, delay, ease: "easeOut" }}
          />
        );
      })}
    </div>
  );
};

// --- MAIN COMPONENT ---
export const QuizResultPage = ({
  score,
  timeSpent,
  answers,
  questions,
  quizId,
}: QuizResultPageProps) => {
  const navigate = useNavigate();
  const [showReview, setShowReview] = useState(false);

  // Tính toán dựa trên số lượng câu hỏi (để hiển thị dạng 8/10)
  const questionCount = questions.length || 0;

  // Lấy config dựa trên score và questionCount
  const config = getResultConfig(score, questionCount);
  const IconComponent = config.icon;

  // Format time
  const minutes = Math.floor(timeSpent / 60);
  const seconds = timeSpent % 60;
  const timeFormatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const cardVariants = {
    hidden: { y: -500, opacity: 0, rotate: -10 },
    visible: {
      y: 0,
      opacity: 1,
      rotate: 0,
      transition: { type: "spring" as const, stiffness: 200, damping: 20 },
    },
  };

  const handlePlayAgain = () => navigate(`/quizzes/${quizId}`);
  const handleGoHome = () => navigate("/quizzes");

  const getAnswerForQuestion = (questionId: string) => {
    return answers.find((a) => a.questionId === questionId);
  };

  return (
    <main
      className="min-h-screen bg-[#fff9f0] font-sans text-slate-900 selection:bg-yellow-400 selection:text-black"
      style={{
        backgroundImage: "radial-gradient(#cbd5e1 2px, transparent 2px)",
        backgroundSize: "32px 32px",
      }}
    >
      <div className="mx-auto flex min-h-screen max-w-2xl items-center justify-center px-4 py-8">
        <motion.div
          className="w-full"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Confetti overlay */}
          {config.showConfetti && <Confetti />}

          {/* --- HEADER CARD: KẾT QUẢ --- */}
          <div
            className={cn(
              "relative overflow-hidden rounded-t-3xl border-4 border-black p-8 text-center shadow-[8px_8px_0px_black]",
              config.bg
            )}
          >
            {/* Icon nhảy nhảy */}
            <motion.div
              className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full border-4 border-black bg-white shadow-[4px_4px_0px_black]"
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <IconComponent
                size={48}
                strokeWidth={2.5}
                className={config.text}
              />
            </motion.div>

            <h1 className="text-4xl font-black uppercase tracking-tight text-black">
              {config.title}
            </h1>
            <p className="mt-2 font-bold text-black/70">{config.desc}</p>

            {/* HIỂN THỊ ĐIỂM SỐ CHÍNH: SCORE / QUESTION_COUNT */}
            <div className="mt-6 flex items-center justify-center rounded-2xl border-2 border-black bg-black/10 p-4 backdrop-blur-sm">
              <div className="flex items-baseline gap-1">
                {/* Số câu đúng */}
                <span className="text-6xl font-black text-black">
                  <AnimatedNumber value={score} />
                </span>
                {/* Tổng số câu hỏi */}
                <span className="text-3xl font-bold text-black/60">
                  / {questionCount}
                </span>
              </div>
            </div>
          </div>

          {/* --- BODY CARD: THỐNG KÊ --- */}
          <div className="rounded-b-3xl border-4 border-t-0 border-black bg-white p-6 shadow-[8px_8px_0px_black]">
            <div className="grid grid-cols-2 gap-4">
              {/* Box 1: Điểm số thực tế */}
              <div className="flex flex-col items-center rounded-xl border-2 border-black bg-green-100 p-3 shadow-[2px_2px_0px_black]">
                <CheckCircle2
                  size={24}
                  className="mb-1 text-green-600"
                  strokeWidth={3}
                />
                <span className="text-xs font-bold uppercase text-slate-500">
                  Số câu đúng
                </span>
                <span className="text-xl font-black text-slate-900">
                  {score}/{questionCount}
                </span>
              </div>

              {/* Box 2: Thời gian */}
              <div className="flex flex-col items-center rounded-xl border-2 border-black bg-blue-100 p-3 shadow-[2px_2px_0px_black]">
                <Clock size={24} className="mb-1 text-blue-600" strokeWidth={3} />
                <span className="text-xs font-bold uppercase text-slate-500">
                  Thời gian
                </span>
                <span className="text-xl font-black text-slate-900">
                  {timeFormatted}
                </span>
              </div>
            </div>

            {/* --- ACTION BUTTONS --- */}
            <div className="mt-8 space-y-3">
              <button
                onClick={() => setShowReview(!showReview)}
                className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-black bg-white py-3 font-bold text-black shadow-[4px_4px_0px_black] transition-all hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0px_black] active:translate-y-1 active:translate-x-1 active:shadow-none"
              >
                {showReview ? (
                  <>
                    <EyeOff size={20} strokeWidth={3} /> Ẩn đáp án
                  </>
                ) : (
                  <>
                    <Eye size={20} strokeWidth={3} /> Xem lại đáp án
                  </>
                )}
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handlePlayAgain}
                  className="flex items-center justify-center gap-2 rounded-xl border-2 border-black bg-amber-200 py-3 font-bold text-black shadow-[4px_4px_0px_black] transition-all hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0px_black] active:translate-y-1 active:translate-x-1 active:shadow-none"
                >
                  <RotateCcw size={20} strokeWidth={3} /> Chơi lại
                </button>

                <button
                  onClick={handleGoHome}
                  className="flex items-center justify-center gap-2 rounded-xl border-2 border-black bg-indigo-500 py-3 font-bold text-white shadow-[4px_4px_0px_black] transition-all hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0px_black] active:translate-y-1 active:translate-x-1 active:shadow-none"
                >
                  <Home size={20} strokeWidth={3} /> Trang chủ
                </button>
              </div>
            </div>
          </div>

          {/* --- REVIEW SECTION (Giữ nguyên logic của bạn) --- */}
          <AnimatePresence>
            {showReview && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-6 overflow-hidden"
              >
                <div className="rounded-2xl border-2 border-black bg-white p-4 shadow-[4px_4px_0px_black]">
                  <h3 className="mb-4 font-black uppercase text-slate-400">
                    Chi tiết bài làm
                  </h3>
                  <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                    {questions.map((question, index) => {
                      const answer = getAnswerForQuestion(question.id);
                      const isCorrect = answer?.isCorrect ?? false;
                      const selectedIndex = answer?.selectedOptionIndex ?? -1;

                      return (
                        <div
                          key={question.id}
                          className={cn(
                            "rounded-lg border-2 p-3",
                            isCorrect
                              ? "border-green-300 bg-green-50"
                              : "border-red-300 bg-red-50"
                          )}
                        >
                          <div className="mb-2 flex justify-between gap-2">
                            <p className="font-bold text-slate-800">
                              Câu {index + 1}: {question.question}
                            </p>
                            <span className="flex-shrink-0 text-xs font-bold text-slate-500">
                              [{question.points || 1} điểm]
                            </span>
                          </div>

                          <div className="space-y-1 text-sm">
                            {question.options.map((option, optIndex) => {
                              const isSelected = optIndex === selectedIndex;
                              const isCorrectOption = optIndex === question.correctOptionIndex;

                              return (
                                <div
                                  key={optIndex}
                                  className={cn(
                                    "rounded px-2 py-1 transition-colors",
                                    isCorrectOption
                                      ? "bg-green-200 font-bold text-green-800 border border-green-300"
                                      : isSelected && !isCorrectOption
                                        ? "bg-red-200 font-bold text-red-800 border border-red-300 line-through"
                                        : "text-slate-600 bg-white/50"
                                  )}
                                >
                                  {String.fromCharCode(65 + optIndex)}. {option}
                                  {isCorrectOption && " ✓"}
                                </div>
                              );
                            })}
                          </div>
                          {question.explanation && (
                            <div className="mt-2 rounded bg-white/60 p-2 text-xs text-slate-600">
                              <span className="font-bold">💡 Giải thích: </span>
                              {question.explanation}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
};