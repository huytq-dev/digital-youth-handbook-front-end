import { cn } from "@/lib/utils";
import { Trophy, Flame, Clock, GraduationCap } from "lucide-react";
import type { LeaderboardItem } from "../honor.type";

interface LeaderboardCardProps {
  item: LeaderboardItem;
  isCompact?: boolean; // Thêm prop này để xác định giao diện nhỏ gọn
}

export const LeaderboardCard = ({ item, isCompact = false }: LeaderboardCardProps) => {
  // Logic màu sắc cho Top 3
  const getRankColor = (rank: number) => {
    if (rank === 1) return "bg-yellow-400 border-yellow-600 shadow-[3px_3px_0px_rgba(180,83,9,0.3)] sm:shadow-[4px_4px_0px_rgba(180,83,9,0.3)]";
    if (rank === 2) return "bg-slate-300 border-slate-600 shadow-[3px_3px_0px_rgba(71,85,105,0.3)] sm:shadow-[4px_4px_0px_rgba(71,85,105,0.3)]";
    if (rank === 3) return "bg-orange-300 border-orange-600 shadow-[3px_3px_0px_rgba(180,83,9,0.3)] sm:shadow-[4px_4px_0px_rgba(180,83,9,0.3)]";
    return "bg-white border-black shadow-[2px_2px_0px_black]"; // Style mặc định cho rank thấp
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  // --- COMPACT VIEW (Cho Rank 4 trở đi) ---
  if (isCompact) {
    return (
      <div className={cn(
        "flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg sm:rounded-xl border-2 border-black bg-white transition-all duration-200",
        "hover:shadow-[2px_2px_0px_black] sm:hover:shadow-[3px_3px_0px_black] hover:-translate-y-0.5"
      )}>
        {/* Rank Number Small */}
        <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-slate-100 border border-black flex items-center justify-center font-black text-xs sm:text-sm text-slate-700">
          {item.rank}
        </div>

        {/* Avatar Small */}
        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-black bg-blue-100 flex items-center justify-center overflow-hidden flex-shrink-0">
           {item.userPicture ? (
            <img src={item.userPicture} alt={item.userName} className="w-full h-full object-cover" />
          ) : (
            <span className="text-[10px] sm:text-xs font-bold">{item.userName.charAt(0).toUpperCase()}</span>
          )}
        </div>

        {/* Name & School Info */}
        <div className="flex-1 min-w-0">
          <p
            className="font-bold text-xs sm:text-sm text-black truncate"
            title={item.userName}
          >
            {item.userName}
          </p>
          {(item.schoolName || item.className) && (
            <div className="flex items-center gap-1 mt-0.5">
              <GraduationCap size={10} className="text-slate-400 flex-shrink-0 sm:w-3 sm:h-3" />
              <p
                className="text-[9px] sm:text-[10px] font-semibold text-slate-500 truncate"
                title={
                  item.schoolName && item.className
                    ? `${item.schoolName} - ${item.className}`
                    : item.schoolName || item.className || undefined
                }
              >
                {item.schoolName && item.className 
                  ? `${item.schoolName} - ${item.className}`
                  : item.schoolName || item.className}
              </p>
            </div>
          )}
        </div>

        {/* Stats Compact */}
        <div className="flex flex-col items-end gap-0.5">
          <div className="flex items-center gap-1">
            <Flame size={10} className="text-orange-600 sm:w-3 sm:h-3" />
            <span className="font-black text-xs sm:text-sm">{item.totalScore.toFixed(1)}</span>
          </div>
           <div className="flex items-center gap-1 text-slate-500">
            <Clock size={8} className="sm:w-2.5 sm:h-2.5" />
            <span className="text-[8px] sm:text-[10px] font-bold">{formatTime(item.durationSeconds)}</span>
          </div>
        </div>
      </div>
    );
  }

  // --- FULL VIEW (Cho Top 3) ---
  const bgColorClass = getRankColor(item.rank);

  return (
    <div
      className={cn(
        "relative border-2 sm:border-3 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 transition-all duration-200 h-full flex flex-col justify-center",
        "hover:shadow-[4px_4px_0px_black] sm:hover:shadow-[6px_6px_0px_black] hover:-translate-y-1",
        bgColorClass
      )}
    >
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
        {/* Rank Badge */}
        <div
          className={cn(
            "flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-lg sm:rounded-xl border-2 border-black flex items-center justify-center",
            "font-black text-xl sm:text-2xl md:text-3xl",
            item.rank === 1
              ? "bg-gradient-to-br from-yellow-300 to-yellow-500 text-white shadow-[2px_2px_0px_black] sm:shadow-[3px_3px_0px_black]"
              : item.rank === 2
              ? "bg-gradient-to-br from-slate-300 to-slate-400 text-slate-900 shadow-[2px_2px_0px_black] sm:shadow-[3px_3px_0px_black]"
              : "bg-gradient-to-br from-orange-300 to-orange-500 text-white shadow-[2px_2px_0px_black] sm:shadow-[3px_3px_0px_black]"
          )}
        >
          {getRankIcon(item.rank)}
        </div>

        {/* User Info & Stats Wrapper */}
        <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
           {/* User Info */}
            <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-2 border-black bg-blue-500 flex items-center justify-center text-white font-black overflow-hidden flex-shrink-0 text-xs sm:text-sm md:text-base">
                {item.userPicture ? (
                  <img src={item.userPicture} alt={item.userName} className="w-full h-full object-cover" />
                ) : (
                  <span>{item.userName.charAt(0).toUpperCase()}</span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p
                  className="font-black text-sm sm:text-base md:text-lg text-black truncate"
                  title={item.userName}
                >
                  {item.userName}
                </p>
                {(item.schoolName || item.className) && (
                  <div className="flex items-center gap-1 mt-0.5">
                    <GraduationCap size={10} className="text-slate-500 flex-shrink-0 sm:w-3 sm:h-3" />
                    <p
                      className="text-[9px] sm:text-[10px] font-bold text-slate-600 truncate"
                      title={
                        item.schoolName && item.className
                          ? `${item.schoolName} - ${item.className}`
                          : item.schoolName || item.className || undefined
                      }
                    >
                      {item.schoolName && item.className 
                        ? `${item.schoolName} - ${item.className}`
                        : item.schoolName || item.className}
                    </p>
                  </div>
                )}
                <p className="text-[10px] sm:text-xs font-bold text-black/60">
                  {new Date(item.completedAt).toLocaleDateString("vi-VN")}
                </p>
              </div>
            </div>

            {/* Stats Separator */}
            <div className="h-0.5 w-full bg-black/10 my-1.5 sm:my-2"></div>

            {/* Stats Row */}
            <div className="flex justify-between items-center">
               <div className="flex flex-col">
                  <span className="text-[8px] sm:text-[10px] uppercase font-bold text-black/60">Điểm số</span>
                  <div className="flex items-center gap-0.5 sm:gap-1">
                    <Flame size={12} className="text-red-600 sm:w-4 sm:h-4" fill="currentColor" />
                    <span className="font-black text-base sm:text-lg md:text-xl">{item.totalScore.toFixed(1)}</span>
                  </div>
               </div>
               <div className="flex flex-col items-end">
                  <span className="text-[8px] sm:text-[10px] uppercase font-bold text-black/60">Thời gian</span>
                  <div className="flex items-center gap-0.5 sm:gap-1">
                    <Clock size={10} className="text-blue-700 sm:w-3.5 sm:h-3.5" />
                    <span className="font-bold text-xs sm:text-sm">{formatTime(item.durationSeconds)}</span>
                  </div>
               </div>
            </div>
        </div>
      </div>

      {/* Top Trophy Icon Decoration */}
      <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 rotate-12">
          <Trophy
            size={18}
            className={cn(
              "drop-shadow-sm sm:w-6 sm:h-6",
              item.rank === 1 ? "text-yellow-500 fill-yellow-300" :
              item.rank === 2 ? "text-slate-400 fill-slate-200" : "text-orange-500 fill-orange-300"
            )}
            strokeWidth={2} 
          />
      </div>
    </div>
  );
};