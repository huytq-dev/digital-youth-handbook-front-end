import { useMemo } from "react";
import { Quote } from "lucide-react";
import { AnimatedText } from "@/components/animated-text";
import { QUOTES } from "@/data/landing-quote-data";

export const LandingQuote = () => {
  const dailyQuote = useMemo(() => {
    const today = new Date().getDate();
    if (QUOTES.length === 0) return { content: "Loading...", author: "" };
    const index = today % QUOTES.length;
    return QUOTES[index];
  }, []);

  return (
    <section className="py-16">
      {/* Container max-w-7xl để thẳng hàng với header/hero của trang */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Khối Quote căn trái */}
        <div className="relative max-w-3xl">
          
          {/* 1. Icon Quote to mờ làm nền (dính trái) */}
          <div className="absolute -top-6 -left-2 text-gray-100 -z-10">
            <Quote size={80} fill="currentColor" />
          </div>

          {/* 2. Nội dung chính: Border trái đậm */}
          <div className="border-l-[6px] border-blue-600 pl-6 md:pl-8 py-2">
            
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[hsl(var(--foreground))] leading-tight mb-4">
              <AnimatedText animationType="fade">
                "{dailyQuote.content}"
              </AnimatedText>
            </blockquote>

            {/* 3. Tác giả */}
            <div className="flex items-center gap-3">
               {/* Decor line nhỏ màu cam */}
               <div className="w-8 h-1 bg-orange-500 rounded-full"></div>
               <cite className="not-italic text-sm font-bold text-[hsl(var(--muted-foreground))] uppercase tracking-widest">
                 <AnimatedText>{dailyQuote.author}</AnimatedText>
               </cite>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};