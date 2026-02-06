import { useEffect, useMemo, useState } from "react";
import { QuizSearchBar } from "./quiz-search-bar";
import { QuizGrid } from "./quiz-grid";
import { useGetQuizzesQuery } from "@/features/quiz/quiz.api";
import { isApiResponseSuccess } from "@/features/common/common.type";
import type { QuizSummary } from "@/features/quiz/quiz.type";
import { getDisplayQuizPlays } from "@/features/quiz/quiz.utils";

const QuizListingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  // Call API to fetch quizzes
  const { data: apiResponse, isLoading } = useGetQuizzesQuery({
    search: searchQuery || undefined,
    page: page,
    pageSize: pageSize,
  });

  // Extract quiz items from API response
  const quizzes: QuizSummary[] = useMemo(() => {
    if (apiResponse && isApiResponseSuccess(apiResponse) && apiResponse.data?.items) {
      return apiResponse.data.items.map((quiz) => ({
        ...quiz,
        plays: getDisplayQuizPlays(quiz.plays),
      }));
    }
    return [];
  }, [apiResponse]);

  // Extract pagination info from API response
  const totalCount = useMemo(() => {
    if (apiResponse && isApiResponseSuccess(apiResponse) && apiResponse.data?.totalCount) {
      return apiResponse.data.totalCount;
    }
    return 0;
  }, [apiResponse]);

  // Remove client-side filters - all filtering happens on backend via API
  const filteredQuizzes = quizzes; // Directly use API-filtered results

  const handleResetFilters = () => {
    setSearchQuery("");
    setPage(1);
  };

  // Reset to page 1 when search changes
  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  return (
    <main 
      className="min-h-screen bg-[#fff9f0] pb-24 pt-32 font-sans text-slate-900 selection:bg-yellow-400 selection:text-black"
      style={{
        backgroundImage: "radial-gradient(#cbd5e1 2px, transparent 2px)",
        backgroundSize: "32px 32px",
      }}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col gap-8">
          {/* --- MAIN CONTENT (Full width - no sidebar) --- */}
          <div className="flex-1">
            
            {/* --- HEADER --- */}
            <div className="mb-8 text-left">
              <h1 className="flex flex-wrap items-center gap-3 text-4xl font-black uppercase md:text-5xl">
                <span className="text-slate-900 drop-shadow-sm">Thư viện</span>
                
                {/* Chữ QUIZ style Sticker */}
                <span className="inline-block -rotate-3 transform rounded-lg border-2 border-black bg-blue-600 px-4 py-1 text-white shadow-[4px_4px_0px_black] transition-transform hover:rotate-2 hover:scale-105">
                  Quiz
                </span>
              </h1>
            </div>

            {/* Search Bar */}
            <div className="mb-8">
               <QuizSearchBar onSearchChange={setSearchQuery} placeholder="Tìm kiếm bài thi..." />
            </div>

            {/* Grid Component */}
            <QuizGrid 
                quizzes={filteredQuizzes}
                isLoading={isLoading}
                totalCount={totalCount}
                onResetFilter={handleResetFilters}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default QuizListingPage;
