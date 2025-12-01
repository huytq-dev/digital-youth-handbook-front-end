import { useMemo } from "react";
import { Quote } from "lucide-react";
import { AnimatedText } from "@/components/animated-text";

const QUOTES = [
  {
    content:
      "Bạn không cần phải giỏi mọi thứ ngay lập tức, nhưng hãy luôn tiến bộ hơn hôm qua một chút.",
    author: "Một người anh đi trước",
  },
  {
    content:
      "Kỹ năng quan trọng nhất là khả năng tự học và tự điều chỉnh chính mình.",
    author: "Digital Youth Handbook",
  },
  {
    content:
      "Thế giới thay đổi rất nhanh, nhưng giá trị của sự tử tế và nỗ lực thì không.",
    author: "Người thầy bạn luôn kính trọng",
  },
];

export const HomeQuote = () => {
  const dailyQuote = useMemo(() => {
    const today = new Date().getDate();
    const index = today % QUOTES.length;
    return QUOTES[index];
  }, []);

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-3xl">
          <div className="absolute -top-6 -left-2 -z-10 text-gray-100">
            <Quote size={80} fill="currentColor" />
          </div>

          <div className="border-l-[6px] border-blue-600 py-2 pl-6 md:pl-8">
            <blockquote className="mb-4 text-2xl font-extrabold leading-tight text-[hsl(var(--foreground))] md:text-3xl lg:text-4xl">
              <AnimatedText animationType="fade">
                "{dailyQuote.content}"
              </AnimatedText>
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="h-1 w-8 rounded-full bg-orange-500" />
              <cite className="not-italic text-sm font-bold uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
                <AnimatedText>{dailyQuote.author}</AnimatedText>
              </cite>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


