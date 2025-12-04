import { Trophy, Medal, Award } from "lucide-react";
import type { QuizDetail } from "@/features/quiz/quiz.type";

interface QuizIntroLeaderboardProps {
  quiz: QuizDetail;
}

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Trophy size={20} className="text-yellow-500" strokeWidth={3} />;
    case 2:
      return <Medal size={20} className="text-slate-400" strokeWidth={3} />;
    case 3:
      return <Award size={20} className="text-amber-600" strokeWidth={3} />;
    default:
      return <span className="text-sm font-black text-slate-500">#{rank}</span>;
  }
};

export const QuizIntroLeaderboard = ({ quiz }: QuizIntroLeaderboardProps) => {
  if (!quiz.leaderboard || quiz.leaderboard.length === 0) {
    return (
      <div className="mb-8 rounded-2xl border-2 border-black bg-white p-6 shadow-[4px_4px_0px_black]">
        <div className="mb-4 flex items-center gap-2">
          <Trophy size={20} className="text-yellow-500" strokeWidth={3} />
          <h2 className="text-xl font-black uppercase text-slate-900">Bảng xếp hạng</h2>
        </div>
        <p className="text-sm italic text-slate-500">Chưa có dữ liệu xếp hạng.</p>
      </div>
    );
  }

  const topThree = quiz.leaderboard.slice(0, 3);
  const rest = quiz.leaderboard.slice(3, 10); // Top 10

  return (
    <div className="mb-8 rounded-2xl border-2 border-black bg-white p-6 shadow-[4px_4px_0px_black]">
      <div className="mb-4 flex items-center gap-2">
        <Trophy size={20} className="text-yellow-500" strokeWidth={3} />
        <h2 className="text-xl font-black uppercase text-slate-900">Top người chơi</h2>
      </div>

      {/* Top 3 */}
      {topThree.length > 0 && (
        <div className="mb-4 grid gap-3 sm:grid-cols-3">
          {topThree.map((entry) => (
            <div
              key={entry.rank}
              className={`rounded-lg border-2 border-black p-4 shadow-[2px_2px_0px_black] ${
                entry.rank === 1
                  ? "bg-yellow-300"
                  : entry.rank === 2
                  ? "bg-slate-200"
                  : "bg-amber-100"
              }`}
            >
              <div className="mb-2 flex items-center justify-between">
                {getRankIcon(entry.rank)}
                <span className="text-xs font-black text-black">{entry.score}%</span>
              </div>
              <p className="mb-1 truncate text-sm font-bold text-black">{entry.playerName}</p>
              <p className="text-xs text-slate-600">
                {new Date(entry.completedAt).toLocaleDateString("vi-VN")}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Top 4-10 */}
      {rest.length > 0 && (
        <div className="space-y-2">
          {rest.map((entry) => (
            <div
              key={entry.rank}
              className="flex items-center justify-between rounded-lg border-2 border-black bg-slate-50 p-3 shadow-[2px_2px_0px_black]"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-black text-slate-500">#{entry.rank}</span>
                <span className="text-sm font-bold text-slate-900">{entry.playerName}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-slate-700">{entry.score}%</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

