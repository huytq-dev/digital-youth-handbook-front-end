import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import type { QuizDetail } from "@/features/quiz/quiz.type";
import { useStartQuizMutation } from "@/features/quiz/quiz.api";
import { isApiResponseSuccess } from "@/features/common/common.type";
import { useAppDispatch } from "@/redux/hooks";
import { startAttempt } from "@/features/quiz/quiz.slice";
import { QuizIntroHeader } from "./quiz-intro-header";
import { QuizIntroInfo } from "./quiz-intro-info";
import { QuizIntroActions } from "./quiz-intro-actions";

interface QuizIntroPageProps {
  quiz: QuizDetail;
}

// Animation variants cho hiệu ứng Pop-up (Card Pop-up & Bounce)
const pageVariants = {
  initial: {
    scale: 0.8,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 25,
    },
  },
  exit: {
    scale: 0.9,
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

export const QuizIntroPage = ({ quiz }: QuizIntroPageProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [startQuiz] = useStartQuizMutation();
  const [error, setError] = useState<string | null>(null);

  const handleStart = async () => {
    try {
      setError(null);
      const response = await startQuiz(quiz.id).unwrap();
      
      // Lưu attempt vào Redux
      if (isApiResponseSuccess(response) && response.data) {
        const startData = response.data;
        dispatch(startAttempt({
          attemptId: startData.attemptId,
          quizId: startData.quizId,
          title: startData.title,
          timeLimitMinutes: startData.timeLimitMinutes,
          startedAt: new Date(),
          questions: startData.questions,
        }));

        // Navigate to game page
        navigate(`/quizzes/${quiz.id}/game`);
      }
    } catch (err) {
      setError("Không thể bắt đầu quiz. Vui lòng thử lại.");
      console.error(err);
    }
  };

  return (
    <main
      className="min-h-screen bg-[#fff9f0] pb-24 pt-32 font-sans text-slate-900 selection:bg-yellow-400 selection:text-black"
      style={{
        backgroundImage: "radial-gradient(#cbd5e1 2px, transparent 2px)",
        backgroundSize: "32px 32px",
      }}
    >
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="mx-auto max-w-4xl px-4"
      >
        {/* Header với title, category, difficulty */}
        <QuizIntroHeader quiz={quiz} />

        {/* Thông tin mô tả */}
        <QuizIntroInfo quiz={quiz} />

        {/* Error message */}
        {error && (
          <div className="mb-6 rounded-lg border-2 border-red-500 bg-red-100 p-4 text-red-800">
            {error}
          </div>
        )}

        {/* Actions - Nút bắt đầu */}
        <QuizIntroActions onStart={handleStart} />
      </motion.div>
    </main>
  );
};

