import { useGetQuizLeaderboardQuery } from "../honor.api";
import { isApiResponseSuccess } from "@/features/common/common.type";
import { LeaderboardCard } from "./leaderboard-card";
import { Flame } from "lucide-react";

interface QuizLeaderboardSectionProps {
  quizId: string;
  quizTitle: string;
}

export const QuizLeaderboardSection = ({
  quizId,
  quizTitle,
}: QuizLeaderboardSectionProps) => {
  // Chỉ hiển thị top 5
  const topCount = 5;
  const {
    data: apiResponse,
    isLoading,
    error,
  } = useGetQuizLeaderboardQuery({
    quizId,
    top: topCount,
  });

  const leaderboard =
    apiResponse && isApiResponseSuccess(apiResponse) ? apiResponse.data : null;

  // Tách Top 3 và phần còn lại (top 4, 5)
  const topThree = leaderboard?.slice(0, 3) || [];
  const others = leaderboard?.slice(3, 5) || []; // Chỉ lấy top 4 và 5

  return (
    <div className="mb-10 sm:mb-12 md:mb-16">
      {/* Section Header */}
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 md:mb-6">
        <div className="bg-gradient-to-br from-orange-400 to-red-500 border-2 border-black rounded-lg sm:rounded-xl p-2 sm:p-3 shadow-[2px_2px_0px_black] sm:shadow-[3px_3px_0px_black]">
          <Flame size={20} className="text-white sm:w-6 sm:h-6" />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-lg sm:text-2xl md:text-3xl font-black uppercase text-black leading-tight">
            {quizTitle}
          </h2>
          <p className="text-xs sm:text-sm font-bold text-slate-600 mt-0.5 sm:mt-1">
            Bảng xếp hạng
          </p>
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
          {/* Thêm padding-top để tạo không gian cho Top 1 nổi lên mà không bị đè */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 sm:items-end pt-0 sm:pt-8 md:pt-10">
            {/* Rank 2 - Bên trái */}
            {topThree.find((x) => x.rank === 2) && (
              <div className="order-2 sm:order-1">
                <LeaderboardCard item={topThree.find((x) => x.rank === 2)!} />
              </div>
            )}

            {/* Rank 1 - Ở giữa, nhô lên cao */}
            {topThree.find((x) => x.rank === 1) && (
              <div className="order-1 sm:order-2 relative z-10 transform sm:-translate-y-4 md:-translate-y-8">
                {/* Dùng translate thay cho margin-top âm để mượt hơn và dễ kiểm soát z-index */}
                <LeaderboardCard item={topThree.find((x) => x.rank === 1)!} />

                {/* (Optional) Thêm vương miện hoặc icon trang trí nếu muốn */}
              </div>
            )}

            {/* Rank 3 - Bên phải */}
            {topThree.find((x) => x.rank === 3) && (
              <div className="order-3">
                <LeaderboardCard item={topThree.find((x) => x.rank === 3)!} />
              </div>
            )}
          </div>

          {/* 2. TOP 4 & 5 - COMPACT GRID LAYOUT */}
          {others.length > 0 && (
            <div className="mt-3 sm:mt-4">
              <p className="text-[10px] sm:text-xs font-black uppercase text-slate-500 mb-2 sm:mb-3 ml-1">
                Top 4 & 5
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {others.map((item) => (
                  <LeaderboardCard
                    key={item.userId}
                    item={item}
                    isCompact={true}
                  />
                ))}
              </div>
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
