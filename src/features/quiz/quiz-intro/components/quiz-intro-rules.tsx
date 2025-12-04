import { Clock, Heart, Target, AlertCircle, FileQuestion, Infinity } from "lucide-react";
import type { QuizDetail } from "@/features/quiz/quiz.type";

interface QuizIntroRulesProps {
  quiz: QuizDetail;
}

export const QuizIntroRules = ({ quiz }: QuizIntroRulesProps) => {
  // Logic kiểm tra thời gian
  const isUnlimitedTime = !quiz.durationMinutes || quiz.durationMinutes === 0;
  
  // Logic kiểm tra số mạng
  const hasLivesLimit = quiz.maxLives !== undefined && quiz.maxLives > 0;

  return (
    <div className="mb-8 rounded-2xl border-2 border-black bg-yellow-100 p-6 shadow-[4px_4px_0px_black]">
      <div className="mb-6 flex items-center gap-2">
        <AlertCircle size={24} className="text-black" strokeWidth={3} />
        <h2 className="text-xl font-black uppercase text-black">Quy định bài thi</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* 1. Số lượng câu hỏi */}
        <div className="flex items-start gap-3 rounded-lg border-2 border-black bg-white p-4 shadow-[2px_2px_0px_black]">
          <FileQuestion size={24} className="mt-0.5 text-indigo-600" strokeWidth={2.5} />
          <div>
            <p className="font-bold text-slate-900">Số lượng câu hỏi</p>
            <p className="text-sm text-slate-700">
              Tổng cộng <span className="font-bold text-black text-base">{quiz.totalQuestions}</span> câu hỏi.
            </p>
          </div>
        </div>

        {/* 2. Thời gian làm bài */}
        <div className="flex items-start gap-3 rounded-lg border-2 border-black bg-white p-4 shadow-[2px_2px_0px_black]">
          {isUnlimitedTime ? (
             <Infinity size={24} className="mt-0.5 text-blue-600" strokeWidth={2.5} />
          ) : (
             <Clock size={24} className="mt-0.5 text-blue-600" strokeWidth={2.5} />
          )}
          <div>
            <p className="font-bold text-slate-900">Thời gian</p>
            <p className="text-sm text-slate-700">
              {isUnlimitedTime ? (
                <span className="font-bold text-blue-700">Không giới hạn</span>
              ) : (
                <>
                  Bạn có <span className="font-bold text-black text-base">{quiz.durationMinutes} phút</span> để hoàn thành.
                </>
              )}
            </p>
          </div>
        </div>

        {/* 3. Điều kiện qua môn (Luôn hiển thị hoặc check null) */}
        {quiz.passingScore !== undefined && (
          <div className="flex items-start gap-3 rounded-lg border-2 border-black bg-white p-4 shadow-[2px_2px_0px_black]">
            <Target size={24} className="mt-0.5 text-green-600" strokeWidth={2.5} />
            <div>
              <p className="font-bold text-slate-900">Điều kiện qua môn</p>
              <p className="text-sm text-slate-700">
                Đạt tối thiểu <span className="font-bold text-green-700 text-base">{quiz.passingScore}%</span> điểm số.
              </p>
            </div>
          </div>
        )}

        {/* 4. Số mạng (Chỉ hiển thị khi có giới hạn) */}
        {hasLivesLimit ? (
          <div className="flex items-start gap-3 rounded-lg border-2 border-black bg-white p-4 shadow-[2px_2px_0px_black]">
            <Heart size={24} className="mt-0.5 text-red-500" strokeWidth={2.5} />
            <div>
              <p className="font-bold text-slate-900">Số mạng cho phép</p>
              <p className="text-sm text-slate-700">
                Tối đa <span className="font-bold text-red-600 text-base">{quiz.maxLives} mạng</span>. Sai 1 câu trừ 1 mạng.
              </p>
            </div>
          </div>
        ) : (
           /* Optional: Hiển thị không giới hạn mạng nếu muốn layout cân đối 4 ô */
           <div className="flex items-start gap-3 rounded-lg border-2 border-black bg-white p-4 shadow-[2px_2px_0px_black] opacity-60">
             <Heart size={24} className="mt-0.5 text-slate-400" strokeWidth={2.5} />
             <div>
               <p className="font-bold text-slate-900">Số mạng</p>
               <p className="text-sm text-slate-700">Không giới hạn số lần sai.</p>
             </div>
           </div>
        )}
      </div>
    </div>
  );
};