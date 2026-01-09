import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { LearningTopic } from "@/features/learning-topics/learning-topics.type";
import {
  loadLearningTopicById,
  loadLearningTopics,
  prefetchLearningTopic,
} from "@/data/learning-topics";
import { UnifiedHeader } from "@/components/layout/unified-header";
import { TopicDetailTemplate } from "@/features/learning-topics/components/topic-detail-template";
import { BookOpen, ArrowRight, Frown, Sparkles, Star, Zap } from "lucide-react";
import { AnimatedText } from "@/components/animated-text";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

// SVG Doodle Pattern cho nền (Chấm bi vẽ tay)
const doodleDotPattern = "data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2394a3b8' fill-opacity='0.2' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='2'/%3E%3Ccircle cx='13' cy='13' r='2'/%3E%3C/g%3E%3C/svg%3E";

// SVG Gạch chân vẽ tay
const SquiggleLine = () => (
  <svg className="absolute -bottom-4 left-0 w-full h-6 text-blue-500/50" viewBox="0 0 100 20" preserveAspectRatio="none">
    <path d="M0,10 Q25,0 50,10 T100,10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

// --- 2. [NEW] Định nghĩa Animation Variants ---

// Variant cho container (lưới chứa các thẻ)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Thời gian trễ giữa mỗi thẻ (0.15s)
      delayChildren: 0.2,    // Đợi 0.2s sau khi vào trang mới bắt đầu
    },
  },
};

// Variant cho từng thẻ (Item)
const cardVariants = {
  hidden: { 
    y: 100,      // Bắt đầu từ dưới sâu
    opacity: 0, 
    scale: 0.8,  // Hơi nhỏ
    rotate: -5   // Hơi nghiêng sang trái
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    rotate: 0,   // Trở về thẳng hàng
    transition: {
      type: "spring" as const,
      stiffness: 150, // Độ cứng lò xo (càng cao càng nảy nhanh)
      damping: 12,    // Độ cản (thấp thì rung nhiều) -> 12 là rung vừa phải kiểu hoạt hình
      mass: 1,
    },
  },
};

const LearningTopicsPage = () => {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const [topics, setTopics] = useState<LearningTopic[]>([]);
  const [topic, setTopic] = useState<LearningTopic | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    const load = async () => {
      setIsLoading(true);

      if (slug) {
        const data = await loadLearningTopicById(slug);
        if (!isActive) return;
        setTopic(data);
        setTopics([]);
        setIsLoading(false);
        return;
      }

      const data = await loadLearningTopics();
      if (!isActive) return;
      setTopics(data);
      setTopic(undefined);
      setIsLoading(false);
    };

    load();
    return () => {
      isActive = false;
    };
  }, [slug]);

  const isDetail = !!slug;

  return (
    <>
      <UnifiedHeader />
      
      {!isDetail && (
        <main 
          className="min-h-screen bg-[#fff9f0] pb-20 pt-24 font-sans relative overflow-hidden"
          style={{ backgroundImage: `url("${doodleDotPattern}")` }}
        >
          
          {/* Background Decor (Doodle nổi) */}
          <div className="absolute top-24 left-[10%] text-yellow-400 opacity-30 pointer-events-none animate-pulse">
             <Star size={80} strokeWidth={2.5} fill="currentColor" />
          </div>
          <div className="absolute bottom-40 right-[5%] text-blue-400 opacity-30 pointer-events-none rotate-12">
             <Zap size={100} strokeWidth={2.5} fill="currentColor" />
          </div>

          <div className="mx-auto max-w-5xl px-4 relative z-10">
            {/* Header Section */}
            <header className="mb-16 text-center relative">
              <motion.div 
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: -3 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
                className="inline-block bg-yellow-300 border-2 border-black px-5 py-2 rounded-tl-xl rounded-br-xl shadow-[4px_4px_0px_black] mb-6 hover:rotate-0 transition-transform cursor-default origin-center"
              >
                <p className="text-sm font-black uppercase tracking-widest text-black flex items-center gap-2">
                  <Sparkles size={16} /> Hành trang số
                </p>
              </motion.div>
              
              <div className="relative inline-block">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-3 text-4xl md:text-6xl font-black leading-none text-slate-900 uppercase tracking-tight relative z-10"
                >
                  <span className="text-blue-600">6 Chủ đề</span> học tập
                  <br /> cho thanh niên
                </motion.h1>
                <SquiggleLine />
              </div>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 mx-auto max-w-2xl text-lg font-bold text-slate-700 leading-relaxed bg-white/60 backdrop-blur-sm p-4 rounded-2xl border-2 border-dashed border-slate-300"
              >
                Mỗi chủ đề là một “chặng đường nhỏ” giúp bạn hiểu rõ hơn về lý
                tưởng, đạo đức, lối sống và kỹ năng công dân số trong thời kỳ
                mới.
              </motion.p>
            </header>

            {/* 3. Grid Topics v?i Animation */}
            {isLoading ? (
              <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="relative h-full">
                    <div className="absolute inset-0 bg-black rounded-2xl translate-x-3 translate-y-3 border-2 border-black" />
                    <div className="relative h-full flex flex-col rounded-2xl border-2 border-black bg-white p-6 overflow-hidden">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-blue-100 rounded-bl-full border-l-2 border-b-2 border-black -z-10" />

                      <div className="mb-5 flex items-start justify-between">
                        <span className="inline-flex items-center justify-center bg-blue-200 border-2 border-black px-3 py-1.5 rounded-lg text-sm font-black uppercase tracking-widest text-black shadow-[2px_2px_0px_black]">
                          Ch? d? {index + 1}
                        </span>
                        <div className="h-7 w-7 rounded bg-slate-200 animate-pulse" />
                      </div>

                      <div className="mb-3 h-7 w-4/5 rounded bg-slate-200 animate-pulse" />
                      <div className="mb-2 h-4 w-full rounded bg-slate-200 animate-pulse" />
                      <div className="mb-6 h-4 w-5/6 rounded bg-slate-200 animate-pulse" />

                      <div className="mt-auto flex items-center justify-between border-t-2 border-black bg-slate-50 -mx-6 -mb-6 px-6 py-4">
                        <div className="h-5 w-32 rounded bg-slate-200 animate-pulse" />
                        <div className="h-5 w-24 rounded bg-slate-200 animate-pulse" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <motion.section
                className="grid gap-8 md:grid-cols-2 lg:gap-10"
                variants={containerVariants}
                initial="hidden"
                {...(!shouldReduceMotion && {
                  whileInView: "visible",
                  viewport: { once: true, margin: "-100px" },
                })}
              >
                {topics.map((topicItem, index) => (
                  // B?c Link trong motion.div d?  p d?ng animation cho t?ng item
                  <motion.div key={topicItem.id} variants={cardVariants} className="h-full">
                      <Link
                        to={`/learning-topics/${topicItem.id}`}
                        className="group relative block h-full"
                        onMouseEnter={() => prefetchLearningTopic(topicItem.id)}
                        onFocus={() => prefetchLearningTopic(topicItem.id)}
                        onTouchStart={() => prefetchLearningTopic(topicItem.id)}
                      >
                        {/* Shadow Layer (N‚t v? c?ng) */}
                        <div className="absolute inset-0 bg-black rounded-2xl translate-x-3 translate-y-3 transition-transform group-hover:translate-x-4 group-hover:translate-y-4 border-2 border-black" />
                        
                        {/* Main Card */}
                        <div className="relative h-full flex flex-col rounded-2xl border-2 border-black bg-white p-6 transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1 overflow-hidden">
                          
                          {/* Doodle Decor g¢c th? */}
                          <div className="absolute top-0 right-0 w-16 h-16 bg-blue-100 rounded-bl-full border-l-2 border-b-2 border-black -z-10 group-hover:bg-yellow-200 transition-colors" />

                          {/* Header Card */}
                          <div className="mb-5 flex items-start justify-between">
                              <span className="inline-flex items-center justify-center bg-blue-200 border-2 border-black px-3 py-1.5 rounded-lg text-sm font-black uppercase tracking-widest text-black shadow-[2px_2px_0px_black] rotate-[-2deg] group-hover:rotate-0 transition-all">
                                  Ch? d? {index + 1}
                              </span>
                              <BookOpen className="text-slate-900 group-hover:text-blue-600 transition-colors" size={28} strokeWidth={2.5} />
                          </div>

                          {/* Content */}
                          <h2 className="mb-3 text-2xl font-black text-slate-900 leading-tight group-hover:text-blue-700 transition-colors flex items-center gap-2">
                            <AnimatedText>{topicItem.title}</AnimatedText>
                            <Star size={20} className="fill-yellow-400 text-black hidden group-hover:block animate-spin-slow" />
                          </h2>
                          <p className="mb-6 line-clamp-3 text-sm font-bold text-slate-600 leading-relaxed flex-1 border-l-4 border-blue-200 pl-3">
                            {topicItem.content.summary}
                          </p>

                          {/* Footer Card */}
                          <div className="mt-auto flex items-center justify-between border-t-2 border-black bg-slate-50 -mx-6 -mb-6 px-6 py-4 group-hover:bg-blue-50 transition-colors">
                            <span className="text-sm font-black text-slate-700 flex items-center gap-2">
                              <Star size={16} className="fill-yellow-400 text-black" strokeWidth={2} />
                              {topicItem.objectives.length} M?C TIEU
                            </span>
                            <span className="flex items-center text-base font-black text-blue-700 group-hover:underline decoration-4 underline-offset-4">
                              XEM NGAY <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                            </span>
                          </div>
                        </div>
                      </Link>
                  </motion.div>
                ))}
              </motion.section>
            )}
          </div>
        </main>
      )}

      {isDetail && (
        <main 
          className="min-h-screen bg-[#fff9f0] pb-12 pt-24 font-sans relative"
          style={{ backgroundImage: `url("${doodleDotPattern}")` }}
        >
          {isLoading ? (
            <div className="flex min-h-[60vh] items-center justify-center px-4 text-center relative z-10">
              <p className="text-lg font-black text-slate-700">Dang tai...</p>
            </div>
          ) : !topic ? (
            // Not Found State Style Cartoon
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center relative z-10"
            >
              <div className="mb-6 rounded-full border-4 border-black bg-slate-200 p-8 shadow-[6px_6px_0px_black] rotate-[-5deg]">
                 <Frown size={80} className="text-black" strokeWidth={2.5} />
              </div>
              <h1 className="mb-4 text-4xl font-black text-black md:text-5xl uppercase tracking-tight bg-white border-2 border-black px-4 py-2 shadow-[4px_4px_0px_black]">
                Hic! Không tìm thấy chủ đề
              </h1>
              <p className="mb-10 max-w-md text-lg font-bold text-slate-700 bg-white/80 p-4 rounded-xl border-2 border-dashed border-black">
                Có thể đường dẫn đã bị thay đổi hoặc chủ đề này đang đi vắng.
              </p>
              <button
                type="button"
                onClick={() => navigate("/learning-topics")}
                className="rounded-xl border-2 border-black bg-blue-600 px-10 py-4 text-lg font-black text-white shadow-[6px_6px_0px_black] transition-all hover:bg-blue-700 hover:translate-y-[3px] hover:translate-x-[3px] hover:shadow-[3px_3px_0px_black] active:shadow-none active:translate-y-[6px] active:translate-x-[6px] rotate-2 hover:rotate-0"
              >
                QUAY LẠI DANH SÁCH
              </button>
            </motion.div>
          ) : (
            <TopicDetailTemplate topic={topic} />
          )}
        </main>
      )}
    </>
  );
};

export default LearningTopicsPage;
