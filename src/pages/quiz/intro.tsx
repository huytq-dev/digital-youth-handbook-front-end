import { useParams, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { UnifiedHeader } from "@/components/layout/unified-header";
import { useGetQuizByIdQuery } from "@/features/quiz/quiz.service";
import { QuizIntroPage } from "@/features/quiz/quiz-intro/components/quiz-intro-page";

// Trang chi tiết quiz trước khi bắt đầu làm bài
const QuizIntroPageWrapper = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { data: quiz, isLoading, error } = useGetQuizByIdQuery(id || "", {
    skip: !id,
  });

  if (isLoading) {
    return (
      <>
        <UnifiedHeader />
        <main className="min-h-screen bg-[#fff9f0] pb-24 pt-32 font-sans text-slate-900">
          <div className="mx-auto max-w-4xl px-4">
            <div className="flex h-64 items-center justify-center">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-900 border-t-transparent"></div>
            </div>
          </div>
        </main>
      </>
    );
  }

  if (error || !quiz) {
    return (
      <>
        <UnifiedHeader />
        <main className="min-h-screen bg-[#fff9f0] pb-24 pt-32 font-sans text-slate-900">
          <div className="mx-auto max-w-4xl px-4">
            <div className="rounded-2xl border-2 border-black bg-white p-8 text-center shadow-[4px_4px_0px_black]">
              <p className="font-bold text-slate-600">
                Không tìm thấy quiz hoặc có lỗi xảy ra.
              </p>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <UnifiedHeader />
      <AnimatePresence mode="wait">
        <QuizIntroPage key={location.pathname} quiz={quiz} />
      </AnimatePresence>
    </>
  );
};

export default QuizIntroPageWrapper;

