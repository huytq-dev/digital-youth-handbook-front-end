import { useParams, useLocation, useNavigate } from "react-router-dom";
import { UnifiedHeader } from "@/components/layout/unified-header";
import { useGetQuizByIdQuery } from "@/features/quiz/quiz.service";
import { QuizResultPage } from "@/features/quiz/quiz-result/components/quiz-result-page";
import type { QuizAnswer } from "@/features/quiz/quiz.type";

interface LocationState {
  answers: QuizAnswer[];
  score: number;
  totalQuestions: number;
  timeSpent: number; // seconds
}

// Trang kết quả quiz sau khi hoàn thành
const QuizResultPageWrapper = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;

  const { data: quiz, isLoading, error } = useGetQuizByIdQuery(id || "", {
    skip: !id,
  });

  // Redirect nếu không có data từ game page
  if (!state) {
    // Navigate back to quiz intro if no state
    if (id) {
      navigate(`/quizzes/${id}`);
    } else {
      navigate("/quizzes");
    }
    return null;
  }

  if (isLoading) {
    return (
      <>
        <UnifiedHeader />
        <main className="min-h-screen bg-[#fff9f0] flex items-center justify-center font-sans">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-900 border-t-transparent"></div>
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
              <button
                onClick={() => navigate(`/quizzes/${id || ""}`)}
                className="mt-4 rounded-lg border-2 border-black bg-yellow-400 px-6 py-2 font-black uppercase text-black shadow-[4px_4px_0px_black] transition-all hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0px_black] active:translate-y-1 active:translate-x-1 active:shadow-none"
              >
                Quay lại
              </button>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <UnifiedHeader />
      <QuizResultPage
        score={state.score}
        totalQuestions={state.totalQuestions}
        timeSpent={state.timeSpent}
        answers={state.answers}
        questions={quiz.questions}
        quizId={id || ""}
      />
    </>
  );
};

export default QuizResultPageWrapper;

