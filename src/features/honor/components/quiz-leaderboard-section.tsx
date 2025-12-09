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
    <div className="mb-16">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-br from-orange-400 to-red-500 border-2 border-black rounded-xl p-3 shadow-[3px_3px_0px_black]">
          <Flame size={24} className="text-white" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-black uppercase text-black leading-none">
            {quizTitle}
          </h2>
          <p className="text-sm font-bold text-slate-600 mt-1">Bảng xếp hạng</p>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-300 border-t-black"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-100 border-2 border-red-400 rounded-xl p-6 text-center">
          <p className="font-bold text-red-700">
            Không thể tải bảng xếp hạng.
          </p>
        </div>
      )}

      {/* Leaderboard Content */}
      {leaderboard && leaderboard.length > 0 ? (
        <div className="space-y-6">
          
          {/* 1. TOP 3 - GRID LAYOUT */}
          {/* Xếp theo thứ tự: 2 - 1 - 3 trên màn hình lớn để tạo hiệu ứng bục vinh quang */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-end">
             {/* Rank 2 (Trên mobile nó sẽ hiện thứ 2, ta có thể dùng order để chỉnh nếu muốn) */}
             {topThree.find(x => x.rank === 2) && (
                <div className="order-2 md:order-1">
                   <LeaderboardCard item={topThree.find(x => x.rank === 2)!} />
                </div>
             )}
             
             {/* Rank 1 (Luôn ở giữa và to nhất) */}
             {topThree.find(x => x.rank === 1) && (
                <div className="order-1 md:order-2 md:-mt-8 relative z-10"> {/* Nhích lên trên chút */}
                   <LeaderboardCard item={topThree.find(x => x.rank === 1)!} />
                </div>
             )}

             {/* Rank 3 */}
             {topThree.find(x => x.rank === 3) && (
                <div className="order-3 md:order-3">
                   <LeaderboardCard item={topThree.find(x => x.rank === 3)!} />
                </div>
             )}
          </div>

          {/* 2. THE REST - COMPACT GRID LAYOUT */}
          {others.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-black uppercase text-slate-500 mb-3 ml-1">Những người nổi bật khác</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
                {others.map((item) => (
                  <LeaderboardCard key={item.userId} item={item} isCompact={true} />
                ))}
              </div>
            </div>
          )}

          {/* Load More Button */}
          {leaderboard.length >= topCount && (
            <div className="flex justify-center mt-6">
                <button
                onClick={() => setTopCount((prev) => prev + 10)}
                className={cn(
                    "px-8 py-3 font-black uppercase text-xs tracking-wider",
                    "border-2 border-black bg-white text-black rounded-full",
                    "shadow-[3px_3px_0px_black] transition-all duration-200",
                    "hover:shadow-[5px_5px_0px_black] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[2px_2px_0px_black]",
                    "flex items-center gap-2"
                )}
                >
                <ChevronDown size={16} />
                Xem thêm xếp hạng
                </button>
            </div>
          )}
        </div>
      ) : !isLoading && !error ? (
        <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl p-8 text-center">
          <p className="text-slate-600 font-bold">
            Chưa có ai hoàn thành bài quiz này. Hãy là người đầu tiên!
          </p>
        </div>
      ) : null}
    </div>
  );
};