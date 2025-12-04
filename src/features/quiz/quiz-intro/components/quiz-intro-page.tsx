import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import type { QuizDetail } from "@/features/quiz/quiz.type";
import { QuizIntroHeader } from "./quiz-intro-header";
import { QuizIntroInfo } from "./quiz-intro-info";
import { QuizIntroRules } from "./quiz-intro-rules";
import { QuizIntroLeaderboard } from "./quiz-intro-leaderboard";
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
      // Spring sẽ tạo hiệu ứng 'bung' ra quá mức rồi co lại (bounce effect)
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

  const handleStart = () => {
    // Navigate to game page
    navigate(`/quizzes/${quiz.id}/game`);
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
        {/* Header với thumbnail và title */}
        <QuizIntroHeader quiz={quiz} />

        {/* Thông tin mô tả */}
        <QuizIntroInfo quiz={quiz} />

        {/* Quy định */}
        <QuizIntroRules quiz={quiz} />

        {/* Leaderboard */}
        <QuizIntroLeaderboard quiz={quiz} />

        {/* Actions - Nút bắt đầu */}
        <QuizIntroActions onStart={handleStart} />
      </motion.div>
    </main>
  );
};

