import { Trophy, Calendar, CheckCircle2, XCircle } from "lucide-react";
import { AnimatedText } from "@/components/animated-text";
import { Card, CardContent } from "@/components/ui/primitives";
import type { QuizAttempt } from "@/features/profile/profile.type";

interface QuizHistoryProps {
  attempts: QuizAttempt[];
}

export const QuizHistory = ({ attempts }: QuizHistoryProps) => {
  return (
    <Card className="overflow-hidden rounded-xl border-2 border-black bg-white shadow-[6px_6px_0px_black]">
      {/* Header Style Neo-brutalism */}
      <div className="flex items-center justify-between border-b-2 border-black bg-yellow-300 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-black bg-white shadow-[2px_2px_0px_black]">
            <Trophy size={20} className="text-yellow-600 fill-yellow-100" />
          </div>
          <div>
            <h2 className="text-lg font-black uppercase text-black tracking-tight">
              Lịch sử làm bài
            </h2>
            <p className="text-xs font-bold text-slate-700">
              Thành tích học tập của bạn
            </p>
          </div>
        </div>
        
        {/* Badge số lượng */}
        <div className="rounded-full border-2 border-black bg-black px-3 py-1 text-xs font-bold text-white shadow-[2px_2px_0px_white]">
          Tổng: {attempts.length}
        </div>
      </div>

      <CardContent className="p-6">
        <div className="space-y-4">
          {attempts.map((attempt) => (
            <div
              key={attempt.id}
              className="group relative flex items-center justify-between rounded-xl border-2 border-black bg-white p-4 transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_black]"
            >
              {/* Left Side: Icon & Info */}
              <div className="flex items-center gap-4">
                {/* Status Icon Box */}
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border-2 border-black ${
                    attempt.isPassed
                      ? "bg-green-400 text-black"
                      : "bg-red-400 text-black"
                  }`}
                >
                  {attempt.isPassed ? (
                    <CheckCircle2 size={24} strokeWidth={2.5} />
                  ) : (
                    <XCircle size={24} strokeWidth={2.5} />
                  )}
                </div>

                <div>
                  <h3 className="font-black text-slate-900 line-clamp-1 group-hover:text-blue-600 group-hover:underline decoration-2 underline-offset-2 transition-colors">
                    <AnimatedText>{attempt.quizTitle}</AnimatedText>
                  </h3>
                  
                  <div className="mt-1 flex items-center gap-3 text-xs font-bold text-slate-500">
                    <div className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded border border-black/10">
                        <Calendar size={12} />
                        <span>
                        {new Date(attempt.completedAt).toLocaleDateString(
                            "vi-VN"
                        )}
                        </span>
                    </div>
                    
                    <span
                      className={`uppercase tracking-wider ${
                        attempt.isPassed
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {attempt.isPassed ? "Đạt Yêu Cầu" : "Cần Cố Gắng"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Side: Score Badge */}
              <div className="ml-4 flex flex-col items-end">
                <div className="flex items-baseline">
                    <span className={`text-2xl font-black ${
                        attempt.isPassed ? "text-green-600" : "text-red-500"
                    }`}>
                        {attempt.score}
                    </span>
                    <span className="text-sm font-bold text-slate-400 ml-1">/10</span>
                </div>
                {/* Decor line */}
                <div className={`h-1.5 w-full rounded-full border border-black ${
                    attempt.isPassed ? "bg-green-400" : "bg-red-400"
                }`} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};