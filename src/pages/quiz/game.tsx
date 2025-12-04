import { useParams, useNavigate } from "react-router-dom";
import { useGetQuizByIdQuery } from "@/features/quiz/quiz.service";
import { QuizGamePage } from "@/features/quiz/quiz-game/components/quiz-game-page";

// Wrapper component để fetch data và handle routing
const QuizGamePageWrapper = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: quiz, isLoading, error } = useGetQuizByIdQuery(id || "", {
    skip: !id,
  });

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#fff9f0] flex items-center justify-center font-sans">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-900 border-t-transparent"></div>
      </main>
    );
  }

  if (error || !quiz) {
    return (
      <main className="min-h-screen bg-[#fff9f0] pb-24 pt-32 font-sans text-slate-900">
        <div className="mx-auto max-w-4xl px-4">
          <div className="rounded-2xl border-2 border-black bg-white p-8 text-center shadow-[4px_4px_0px_black]">
            <p className="font-bold text-slate-600">
              Không tìm thấy quiz hoặc có lỗi xảy ra.
            </p>
            <button
              onClick={() => navigate(`/quizzes/${id}`)}
              className="mt-4 rounded-lg border-2 border-black bg-yellow-400 px-6 py-2 font-black uppercase text-black shadow-[4px_4px_0px_black] transition-all hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0px_black] active:translate-y-1 active:translate-x-1 active:shadow-none"
            >
              Quay lại
            </button>
          </div>
        </div>
      </main>
    );
  }

  return <QuizGamePage quiz={quiz} />;
};

export default QuizGamePageWrapper;
