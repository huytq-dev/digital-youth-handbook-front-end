import { Trophy } from "lucide-react";
import type { QuizDetail, QuizDifficulty } from "@/features/quiz/quiz.type";

interface QuizIntroHeaderProps {
  quiz: QuizDetail;
}

const difficultyColors: Record<QuizDifficulty, string> = {
  Easy: "bg-green-400",
  Medium: "bg-yellow-400",
  Hard: "bg-red-400",
};

export const QuizIntroHeader = ({ quiz }: QuizIntroHeaderProps) => {
  return (
    <div className="mb-8">
      {/* Title */}
      <h1 className="mb-4 text-3xl font-black uppercase leading-tight text-slate-900 md:text-4xl">
        {quiz.title}
      </h1>

      {/* Badges Row */}
      <div className="mb-6 flex flex-wrap gap-3">
        <span className="inline-block rounded-md border-2 border-black bg-white px-3 py-1.5 text-xs font-black uppercase tracking-wider text-black shadow-[2px_2px_0px_black]">
          {quiz.category}
        </span>
        <span
          className={`${difficultyColors[quiz.difficulty]} inline-block rounded-md border-2 border-black px-3 py-1.5 text-xs font-black uppercase text-black shadow-[2px_2px_0px_black]`}
        >
          {quiz.difficulty}
        </span>
      </div>

      {/* Quick Stats */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 rounded-lg border-2 border-black bg-white px-4 py-2 shadow-[2px_2px_0px_black]">
          <Trophy size={18} className="text-yellow-500" strokeWidth={3} />
          <span className="text-sm font-black text-slate-900">
            {quiz.plays.toLocaleString()} lượt chơi
          </span>
        </div>
        {quiz.highScore !== undefined && (
          <div className="flex items-center gap-2 rounded-lg border-2 border-black bg-yellow-300 px-4 py-2 shadow-[2px_2px_0px_black]">
            <Trophy size={18} className="text-black" strokeWidth={3} />
            <span className="text-sm font-black text-black">
              Điểm cao nhất: {quiz.highScore}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

