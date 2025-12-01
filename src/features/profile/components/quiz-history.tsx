import { Trophy, Calendar } from "lucide-react";
import { AnimatedText } from "@/components/animated-text";
import { Card, CardContent, Badge } from "@/components/ui/primitives";
import type { QuizAttempt } from "@/features/profile/profile.type";

interface QuizHistoryProps {
  attempts: QuizAttempt[];
}

export const QuizHistory = ({ attempts }: QuizHistoryProps) => {
  return (
    <Card className="overflow-hidden border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-sm">
      <div className="flex items-center justify-between border-b border-[hsl(var(--border))] bg-[hsl(var(--secondary))]/40 px-6 py-4">
        <div>
          <h2 className="text-base font-bold text-[hsl(var(--foreground))]">
            Lịch sử làm bài
          </h2>
          <p className="text-xs text-[hsl(var(--muted-foreground))]">
            Kết quả các bài kiểm tra gần đây.
          </p>
        </div>
        <Badge
          variant="secondary"
          className="border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-xs"
        >
          Tổng: {attempts.length}
        </Badge>
      </div>

      <CardContent className="p-0">
        <div className="divide-y divide-[hsl(var(--border))]">
          {attempts.map((attempt) => (
            <div
              key={attempt.id}
              className="group flex items-center justify-between p-6 transition-colors hover:bg-[hsl(var(--secondary))]/50"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${
                    attempt.isPassed
                      ? "bg-emerald-100 text-emerald-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  <Trophy size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[hsl(var(--foreground))] transition-colors group-hover:text-[hsl(var(--primary))]">
                    <AnimatedText>{attempt.quizTitle}</AnimatedText>
                  </h3>
                  <div className="mt-1 flex items-center gap-2 text-xs text-[hsl(var(--muted-foreground))]">
                    <Calendar size={12} />
                    <span>
                      {new Date(attempt.completedAt).toLocaleDateString(
                        "vi-VN",
                      )}
                    </span>
                    <span className="text-gray-300">|</span>
                    <span
                      className={
                        attempt.isPassed
                          ? "font-medium text-emerald-600"
                          : "font-medium text-red-500"
                      }
                    >
                      {attempt.isPassed ? "Đạt" : "Chưa đạt"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span
                  className={`text-lg font-bold ${
                    attempt.isPassed ? "text-emerald-600" : "text-red-500"
                  }`}
                >
                  {attempt.score}
                </span>
                <span className="ml-1 text-xs font-medium text-gray-400">
                  / 10
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};


