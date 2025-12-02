import { useMemo, useRef } from "react";
import { Quote, Star, Sparkles } from "lucide-react";
import { AnimatedText } from "@/components/animated-text";
import { QUOTES } from "@/data/landing-quote-data";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

// --- 1. CÁC COMPONENT TRANG TRÍ (ĐÃ THU NHỎ) ---

// Huy hiệu dấu ngoặc kép (Quote Icon) - Size nhỏ hơn
const QuoteBadge = () => (
  <motion.div 
    className="absolute -top-5 -left-4 md:-left-6 bg-yellow-400 border-2 border-black p-2.5 rounded-lg shadow-[3px_3px_0px_black] z-20 flex items-center justify-center"
    animate={{ rotate: [0, -5, 5, 0], scale: [1, 1.05, 1] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
  >
    <Quote size={24} className="fill-black text-black" />
  </motion.div>
);

// Họa tiết ngôi sao vẽ tay
const DoodleStar = ({ className, delay }: { className?: string; delay?: number }) => (
  <motion.div
    className={`absolute text-blue-500 ${className}`}
    animate={{ scale: [1, 1.2, 1], rotate: [0, 15, -15, 0] }}
    transition={{ duration: 3, delay: delay, repeat: Infinity }}
  >
    <Star size={24} strokeWidth={2.5} fill="currentColor" className="opacity-60" />
  </motion.div>
);

// --- 2. MAIN COMPONENT (COMPACT VERSION) ---

export const LandingQuote = () => {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const dailyQuote = useMemo(() => {
    if (!QUOTES || QUOTES.length === 0) {
      return { 
        content: "Học tập là hạt giống của kiến thức, kiến thức là hạt giống của hạnh phúc.", 
        author: "Ngạn ngữ Georgia" 
      };
    }
    const today = new Date().getDate();
    const index = today % QUOTES.length;
    return QUOTES[index];
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 overflow-hidden bg-[#fff9f0] border-b-4 border-black font-sans">
      
      {/* Background Texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "20px 20px" }}
      />

      {/* Trang trí nền (đẩy vị trí vào gần hơn vì khung nhỏ lại) */}
      <DoodleStar className="top-8 left-[15%]" delay={0} />
      <DoodleStar className="bottom-8 right-[15%] text-pink-500" delay={1.5} />
      
      {/* Container Chính - Giảm max-width xuống 3xl */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        
        <motion.div
          className="relative"
          initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.9 }}
          animate={isInView && !shouldReduceMotion ? { opacity: 1, scale: 1 } : {}}
          transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
        >
            {/* Lớp bóng đen cứng phía sau (Giảm độ lệch offset) */}
            <div className="absolute inset-0 bg-black rounded-sm translate-x-2 translate-y-2 md:translate-x-3 md:translate-y-3" />

            {/* Khung Quote chính - Giảm padding */}
            <div className="relative bg-white border-2 border-black p-6 md:p-10 shadow-none">
                
                {/* 1. Icon Quote Nổi */}
                <QuoteBadge />

                {/* 2. Nội dung Quote - Giảm font size */}
                <div className="relative z-10 text-center">
                    <motion.blockquote 
                        className="text-xl md:text-2xl lg:text-3xl font-black text-slate-900 leading-tight md:leading-snug"
                        initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                        animate={isInView && !shouldReduceMotion ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        {/* Dấu ngoặc kép trang trí nhỏ lại */}
                        <span className="text-blue-600 opacity-60 mr-2 text-4xl font-serif leading-none absolute -top-2 -left-1 select-none">“</span>
                        <AnimatedText animationType="fade">
                           {dailyQuote.content}
                        </AnimatedText>
                        <span className="text-blue-600 opacity-60 ml-2 text-4xl font-serif leading-none absolute -bottom-4 -right-1 select-none">”</span>
                    </motion.blockquote>
                </div>

                {/* 3. Tác giả & Decor */}
                <motion.div 
                    className="mt-6 flex flex-col items-center justify-center"
                    initial={shouldReduceMotion ? {} : { opacity: 0 }}
                    animate={isInView && !shouldReduceMotion ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6, duration: 0.6 }}
                >
                    <div className="relative inline-block">
                        {/* Tag tên tác giả - Font nhỏ hơn */}
                        <div className="bg-orange-100 border-2 border-black px-4 py-1.5 shadow-[2px_2px_0px_black] rotate-[-2deg] transform hover:rotate-0 hover:scale-105 transition-all cursor-default">
                             <cite className="not-italic text-sm md:text-base font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                                <Sparkles size={14} className="fill-yellow-400 text-black" />
                                {dailyQuote.author}
                             </cite>
                        </div>
                    </div>
                </motion.div>

                {/* Góc trang trí nhỏ lại */}
                <div 
                    className="absolute bottom-0 right-0 w-8 h-8 bg-slate-200 border-l-2 border-t-2 border-black"
                    style={{ 
                        background: "linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.1) 50%)" 
                    }}
                />
            </div>
        </motion.div>

      </div>
    </section>
  );
};