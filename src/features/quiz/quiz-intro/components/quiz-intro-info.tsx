import { User, BookOpen } from "lucide-react";
import type { QuizDetail } from "@/features/quiz/quiz.type";

interface QuizIntroInfoProps {
  quiz: QuizDetail;
}

export const QuizIntroInfo = ({ quiz }: QuizIntroInfoProps) => {
  return (
    <div className="mb-8 rounded-2xl border-2 border-black bg-white p-6 shadow-[4px_4px_0px_black]">
      <div className="mb-4 flex items-center gap-2">
        <BookOpen size={20} className="text-blue-600" strokeWidth={3} />
        <h2 className="text-xl font-black uppercase text-slate-900">Mô tả</h2>
      </div>
      
      {quiz.description ? (
        <p className="mb-6 text-base leading-relaxed text-slate-700">
          {quiz.description}
        </p>
      ) : (
        <p className="mb-6 text-base italic text-slate-500">
          Chưa có mô tả cho quiz này.
        </p>
      )}

      {quiz.authorName && (
        <div className="flex items-center gap-2 rounded-lg border-2 border-black bg-slate-100 px-4 py-2">
          <User size={16} className="text-slate-700" strokeWidth={3} />
          <span className="text-sm font-bold text-slate-700">
            Tác giả: <span className="text-slate-900">{quiz.authorName}</span>
          </span>
        </div>
      )}
    </div>
  );
};

