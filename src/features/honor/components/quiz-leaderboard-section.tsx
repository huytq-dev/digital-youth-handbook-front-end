import { useState } from "react";
import { useGetQuizLeaderboardQuery } from "../honor.api";
import { isApiResponseSuccess } from "@/features/common/common.type";
import { LeaderboardCard } from "./leaderboard-card";
import { cn } from "@/lib/utils";
import { ChevronDown, Flame } from "lucide-react";

interface QuizLeaderboardSectionProps {
  quizId: string;
  quizTitle: string;
}

export const QuizLeaderboardSection = ({
  quizId,
  quizTitle,
}: QuizLeaderboardSectionProps) => {
  const [topCount, setTopCount] = useState(13); // Mặc định hiển thị Top 3 + 10 người tiếp theo
  const { data: apiResponse, isLoading, error } = useGetQuizLeaderboardQuery({
    quizId,
    top: topCount,
  });

  const leaderboard =
    apiResponse && isApiResponseSuccess(apiResponse)
      ? apiResponse.data
      : null;
  
  // Tách Top 3 và phần còn lại
  const topThree = leaderboard?.slice(0, 3) || [];
  const others = leaderboard?.slice(3) || [];

  return (
    <div className="mb-10 sm:mb-12 md:mb-16">
      {/* Section Header */}
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 md:mb-6">
        <div className="bg-gradient-to-br from-orange-400 to-red-500 border-2 border-black rounded-lg sm:rounded-xl p-2 sm:p-3 shadow-[2px_2px_0px_black] sm:shadow-[3px_3px_0px_black]">
          <Flame size={20} className="text-white sm:w-6 sm:h-6" />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-lg sm:text-2xl md:text-3xl font-black uppercase text-black leading-none truncate">
            {quizTitle}
          </h2>
          <p className="text-xs sm:text-sm font-bold text-slate-600 mt-0.5 sm:mt-1">Bảng xếp hạng</p>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-8 sm:py-12">
          <div className="h-10 w-10 sm:h-12 sm:w-12 animate-spin rounded-full border-4 border-slate-300 border-t-black"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-100 border-2 border-red-400 rounded-lg sm:rounded-xl p-4 sm:p-6 text-center">
          <p className="font-bold text-red-700 text-sm sm:text-base">
            Không thể tải bảng xếp hạng.
          </p>
        </div>
      )}

      {/* Leaderboard Content */}
      {leaderboard && leaderboard.length > 0 ? (
        <div className="space-y-4 sm:space-y-6">
          
          {/* 1. TOP 3 - GRID LAYOUT */}
          {/* Mobile: stack theo thứ tự 1-2-3, Tablet+: 2-1-3 để tạo hiệu ứng bục vinh quang */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 sm:items-end">
             {/* Rank 2 */}
             {topThree.find(x => x.rank === 2) && (
                <div className="order-2 sm:order-1">
                   <LeaderboardCard item={topThree.find(x => x.rank === 2)!} />
                </div>
             )}
             
             {/* Rank 1 (Luôn ở giữa và to nhất trên tablet+) */}
             {topThree.find(x => x.rank === 1) && (
                <div className="order-1 sm:order-2 sm:-mt-4 md:-mt-8 relative z-10">
                   <LeaderboardCard item={topThree.find(x => x.rank === 1)!} />
                </div>
             )}

             {/* Rank 3 */}
             {topThree.find(x => x.rank === 3) && (
                <div className="order-3">
                   <LeaderboardCard item={topThree.find(x => x.rank === 3)!} />
                </div>
             )}
          </div>

          {/* 2. THE REST - COMPACT GRID LAYOUT */}
          {others.length > 0 && (
            <div className="mt-3 sm:mt-4">
              <p className="text-[10px] sm:text-xs font-black uppercase text-slate-500 mb-2 sm:mb-3 ml-1">Những người nổi bật khác</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {others.map((item) => (
                  <LeaderboardCard key={item.userId} item={item} isCompact={true} />
                ))}
              </div>
            </div>
          )}

          {/* Load More Button */}
          {leaderboard.length >= topCount && (
            <div className="flex justify-center mt-4 sm:mt-6">
                <button
                onClick={() => setTopCount((prev) => prev + 10)}
                className={cn(
                    "px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 font-black uppercase text-[10px] sm:text-xs tracking-wider",
                    "border-2 border-black bg-white text-black rounded-full",
                    "shadow-[2px_2px_0px_black] sm:shadow-[3px_3px_0px_black] transition-all duration-200",
                    "hover:shadow-[3px_3px_0px_black] sm:hover:shadow-[5px_5px_0px_black] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[2px_2px_0px_black]",
                    "flex items-center gap-1.5 sm:gap-2"
                )}
                >
                <ChevronDown size={14} className="sm:w-4 sm:h-4" />
                Xem thêm xếp hạng
                </button>
            </div>
          )}
        </div>
      ) : !isLoading && !error ? (
        <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg sm:rounded-xl p-5 sm:p-6 md:p-8 text-center">
          <p className="text-slate-600 font-bold text-sm sm:text-base">
            Chưa có ai hoàn thành bài quiz này. Hãy là người đầu tiên!
          </p>
        </div>
      ) : null}
    </div>
  );
};