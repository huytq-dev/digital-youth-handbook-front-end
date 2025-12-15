import { HonorHeader } from "./honor-header";
import { QuizLeaderboardSection } from "./quiz-leaderboard-section";
import { useGetQuizzesQuery } from "@/features/quiz/quiz.api";
import { isApiResponseSuccess } from "@/features/common/common.type";

export const HonorPage = () => {
  const { data: quizzesResponse, isLoading } = useGetQuizzesQuery({
    pageSize: 100,
  });

  const quizzes =
    quizzesResponse && isApiResponseSuccess(quizzesResponse) && quizzesResponse.data
      ? quizzesResponse.data.items
      : [];

  return (
    <main className="min-h-screen bg-[#FDF6E3] pb-16 sm:pb-20 md:pb-24 pt-20 sm:pt-24 md:pt-32 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Header */}
        <HonorHeader />

        {/* Leaderboards */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12 sm:py-16 md:py-20">
            <div className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 animate-spin rounded-full border-4 border-slate-300 border-t-black"></div>
          </div>
        ) : quizzes.length > 0 ? (
          <div className="space-y-10 sm:space-y-12 md:space-y-16 mt-6 sm:mt-8 md:mt-12">
            {quizzes.map((quiz) => (
              <QuizLeaderboardSection
                key={quiz.id}
                quizId={quiz.id}
                quizTitle={quiz.title}
              />
            ))}
          </div>
        ) : (
          <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg sm:rounded-xl p-6 sm:p-8 md:p-12 text-center mt-6 sm:mt-8 md:mt-12">
            <p className="text-slate-600 font-bold text-sm sm:text-base md:text-lg">
              Không có bài quiz nào
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

