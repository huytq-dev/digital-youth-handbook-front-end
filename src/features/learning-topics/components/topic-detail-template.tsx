import { motion, AnimatePresence } from "framer-motion";
import type { LearningTopic } from "../learning-topics.type";
import { QuizSection } from "./quiz-section";
import {
  BookOpen,
  Target,
  Video,
  Image as ImageIcon,
  Star,
  Share2,
  List,          // Thêm icon cho TableOfContents
  CheckCircle2,  // Thêm icon cho TableOfContents
} from "lucide-react";
// Bỏ import TableOfContents từ topic-widgets vì ta sẽ định nghĩa lại ở đây để tùy biến
import { FunFactCard, ResourceCard } from "./topic-widgets"; 
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { showToast } from "@/lib/toast";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface TopicDetailTemplateProps {
  topic: LearningTopic;
}

const doodleDotPattern =
  "data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2394a3b8' fill-opacity='0.2' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='2'/%3E%3Ccircle cx='13' cy='13' r='2'/%3E%3C/g%3E%3C/svg%3E";

// --- Dữ liệu Mục lục (Label + ID tương ứng) ---
const TOC_ITEMS = [
  { label: 'Mục tiêu chủ đề', id: 'section-objectives' },
  { label: 'Nội dung trọng tâm', id: 'section-content' },
  { label: 'Infographic ghi nhớ', id: 'section-infographic' },
  { label: 'Trắc nghiệm', id: 'section-quiz' },
];

// --- Component Mục lục (Đã tích hợp Active State) ---
const TableOfContents = ({ activeId }: { activeId: string }) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="bg-white border-2 border-black rounded-xl p-5 shadow-[4px_4px_0px_black]">
      <h3 className="font-black text-black uppercase mb-4 flex items-center gap-2 border-b-2 border-dashed border-slate-200 pb-2">
        <List size={20} /> Mục lục
      </h3>
      <ul className="space-y-3">
        {TOC_ITEMS.map((item, i) => {
          const isActive = activeId === item.id;
          return (
            <li 
              key={i} 
              onClick={() => scrollToSection(item.id)}
              className={`flex items-center gap-2 text-sm font-bold cursor-pointer transition-all duration-300 group ${
                isActive 
                  ? "text-blue-700 translate-x-2" // Active style: Màu xanh đậm + dịch sang phải
                  : "text-slate-600 hover:text-blue-600 hover:translate-x-1" // Inactive style
              }`}
            >
              <CheckCircle2 
                size={14} 
                className={`transition-colors duration-300 ${
                  isActive ? "text-blue-600 fill-blue-100" : "text-slate-300 group-hover:text-blue-400"
                }`} 
              />
              {item.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

// === TEXT ANIMATION VARIANTS ===
export const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

export const textH1Variants = {
  hidden: { y: 30, opacity: 0, scale: 0.95 },
  visible: {
    y: 0, opacity: 1, scale: 1,
    transition: { type: "spring" as const, stiffness: 200, damping: 15, bounce: 0.4 },
  },
};

export const textH2Variants = {
  hidden: { y: 25, opacity: 0, x: -10 },
  visible: {
    y: 0, x: 0, opacity: 1,
    transition: { type: "spring" as const, stiffness: 180, damping: 14, bounce: 0.35 },
  },
};

export const textPVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0, opacity: 1,
    transition: { type: "spring" as const, stiffness: 150, damping: 12, bounce: 0.3 },
  },
};

export const textSpanVariants = {
  hidden: { y: 15, opacity: 0, scale: 0.98 },
  visible: {
    y: 0, opacity: 1, scale: 1,
    transition: { type: "spring" as const, stiffness: 160, damping: 13, bounce: 0.25 },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const sectionVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0, opacity: 1,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 },
  },
};

export const TopicDetailTemplate = ({ topic }: TopicDetailTemplateProps) => {
  const [activeSection, setActiveSection] = useState<string>("");
  const shouldReduceMotion = useReducedMotion();

  // Logic theo dõi cuộn trang (Scroll Spy)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        // rootMargin giúp kích hoạt active sớm hơn một chút trước khi element chạm đỉnh
        rootMargin: "-20% 0px -50% 0px", 
        threshold: 0.1
      }
    );

    const sectionIds = TOC_ITEMS.map(item => item.id);
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Hàm xử lý chia sẻ - copy link và hiển thị thông báo
  const handleShare = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      showToast.success("Đã sao chép link!", "Link đã được sao chép vào clipboard.");
    } catch (error) {
      // Fallback cho các trình duyệt không hỗ trợ clipboard API
      const currentUrl = window.location.href;
      const textArea = document.createElement("textarea");
      textArea.value = currentUrl;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        showToast.success("Đã sao chép link!", "Link đã được sao chép vào clipboard.");
      } catch (err) {
        showToast.error("Không thể sao chép link", "Vui lòng sao chép thủ công.");
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={topic.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="min-h-screen bg-[#fff9f0] pb-24 pt-12 font-sans text-slate-900"
        style={{ backgroundImage: `url("${doodleDotPattern}")` }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.2, scale: 1 }}
            transition={{ duration: 1 }}
            className="absolute top-20 left-10 text-yellow-400 animate-spin-slow"
          >
            <Star size={100} strokeWidth={1} />
          </motion.div>
        </div>

        <div className="mx-auto max-w-6xl px-4 relative z-10">
          <motion.header
            className="mb-12 text-center"
            variants={textContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: -2 }}
              transition={{ type: "spring" as const, stiffness: 200, damping: 12 }}
              className="inline-block bg-yellow-300 border-2 border-black px-4 py-1.5 rounded-sm shadow-[4px_4px_0px_black] mb-6 cursor-default hover:rotate-0 transition-transform"
            >
              <motion.p 
                variants={textSpanVariants}
                className="text-xs font-black uppercase tracking-widest text-black"
              >
                Chuyên đề học tập
              </motion.p>
            </motion.div>
            <motion.h1
              variants={textH1Variants}
              className="text-3xl md:text-5xl font-black leading-tight text-slate-900 uppercase tracking-tight bg-white/80 backdrop-blur-sm inline-block px-8 py-4 rounded-2xl border-2 border-dashed border-slate-400"
            >
              {topic.title}
            </motion.h1>
          </motion.header>

        {/* --- MAIN LAYOUT GRID --- */}
        {/* Đã xóa 'items-start' để 2 cột cao bằng nhau (hỗ trợ sticky) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* === LEFT CONTENT (8 cols) === */}
          <motion.div
            className="lg:col-span-8 space-y-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* 1. OBJECTIVES */}
            <motion.section
              id="section-objectives"
              variants={sectionVariants}
              className="relative group scroll-mt-28" // Tăng scroll-mt để tránh bị header che
            >
              <div className="absolute inset-0 bg-blue-500 rounded-xl translate-x-2 translate-y-2 border-2 border-black transition-transform group-hover:translate-x-3 group-hover:translate-y-3" />
              <motion.div 
                className="relative rounded-xl border-2 border-black bg-white p-8"
                variants={textContainerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.h2 
                  variants={textH2Variants}
                  className="mb-6 flex items-center text-2xl font-black text-blue-600 uppercase border-b-2 border-dashed border-blue-200 pb-2 w-fit"
                >
                  <Target className="mr-3" size={28} strokeWidth={2.5} />
                  Mục tiêu
                </motion.h2>
                <motion.ul 
                  className="space-y-4"
                  variants={textContainerVariants}
                >
                  {topic.objectives.map((obj, index) => (
                    <motion.li
                      key={index}
                      variants={textSpanVariants}
                      className="flex items-start text-base font-bold text-slate-700"
                    >
                      <span className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 text-sm font-black text-blue-700 border-2 border-black shadow-[2px_2px_0px_black]">
                        {index + 1}
                      </span>
                      <span className="mt-1">{obj}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </motion.section>

            {/* 2. CONTENT TEXT & VIDEO */}
            <motion.section
              id="section-content"
              variants={sectionVariants}
              className="rounded-xl border-2 border-black bg-white p-6 shadow-[6px_6px_0px_black] scroll-mt-28"
              {...(!shouldReduceMotion && {
                viewport: { once: true, margin: "-100px" },
              })}
            >
              <motion.div
                variants={textContainerVariants}
                initial="hidden"
                {...(!shouldReduceMotion && {
                  whileInView: "visible",
                  viewport: { once: true, margin: "-50px" },
                })}
              >
                <motion.h2 
                  variants={textH2Variants}
                  className="mb-4 flex items-center text-xl font-black text-black uppercase bg-green-200 w-fit px-3 py-1 border-2 border-black rounded-lg -rotate-1"
                >
                  <BookOpen className="mr-2" size={20} strokeWidth={2.5} />
                  Nội dung trọng tâm
                </motion.h2>
                <motion.p 
                  variants={textPVariants}
                  className="mb-6 text-sm font-medium leading-relaxed text-slate-700 border-l-4 border-green-200 pl-4"
                >
                  {topic.content.summary}
                </motion.p>
              </motion.div>

              {topic.content.videoUrl && (
                <div className="group relative overflow-hidden rounded-lg border-2 border-black bg-black ring-offset-2 ring-black hover:ring-2 transition-all">
                  <div className="aspect-video">
                    <iframe
                      src={topic.content.videoUrl}
                      title="Video bài giảng"
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded border-2 border-black shadow-[2px_2px_0px_black] flex items-center gap-1 animate-pulse">
                    <Video size={12} /> LIVE
                  </div>
                </div>
              )}
            </motion.section>

            {/* 3. INFOGRAPHIC */}
            <motion.section
              id="section-infographic"
              variants={sectionVariants}
              className="rounded-xl border-2 border-black bg-white p-2 shadow-[6px_6px_0px_black] scroll-mt-28"
              {...(!shouldReduceMotion && {
                viewport: { once: true },
              })}
            >
              <motion.div
                className="border-b-2 border-black bg-purple-100 p-3 mb-2 flex items-center justify-between rounded-t-lg"
                variants={textContainerVariants}
                initial="hidden"
                {...(!shouldReduceMotion && {
                  whileInView: "visible",
                  viewport: { once: true },
                })}
              >
                <motion.h2 
                  variants={textH2Variants}
                  className="text-lg font-black text-purple-900 uppercase flex items-center"
                >
                  <ImageIcon className="mr-2" size={20} /> Infographic
                </motion.h2>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full border-2 border-black bg-red-400" />
                  <div className="w-3 h-3 rounded-full border-2 border-black bg-yellow-400" />
                </div>
              </motion.div>

              {(() => {
                const infographicUrls = topic.infographicUrls;
                if (infographicUrls && infographicUrls.length > 0) {
                  return (
                    <div className="px-4 py-4 bg-slate-50 rounded-lg border border-slate-200">
                      <Carousel
                        opts={{ align: "start", loop: true }}
                        className="w-full"
                      >
                        <CarouselContent className="-ml-2 md:-ml-4">
                          {infographicUrls.map((url, index) => (
                            <CarouselItem
                              key={index}
                              className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                            >
                              <div className="relative overflow-hidden rounded-lg border-2 border-black bg-white shadow-[2px_2px_0px_black] hover:-translate-y-1 hover:shadow-[4px_4px_0px_black] transition-all h-full group cursor-pointer">
                                <div className="aspect-[3/4] flex items-center justify-center bg-slate-100 overflow-hidden">
                                  <img
                                    src={url}
                                    alt={`${topic.title} - Ảnh ${index + 1}`}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                  />
                                </div>
                                <div className="absolute top-2 right-2 bg-yellow-300 text-black text-xs font-black px-2 py-1 rounded-md border-2 border-black z-10">
                                  Ảnh {index + 1}/{infographicUrls.length}
                                </div>
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious className="border-2 border-black bg-white hover:bg-yellow-300 text-black -left-4 disabled:opacity-0" />
                        <CarouselNext className="border-2 border-black bg-white hover:bg-yellow-300 text-black -right-4 disabled:opacity-0" />
                      </Carousel>
                    </div>
                  );
                } else if (topic.infographicUrl) {
                  return (
                    <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-slate-50 min-h-[300px] flex items-center justify-center">
                      <img
                        src={topic.infographicUrl}
                        alt={topic.title}
                        className="h-full w-full object-contain max-h-[500px]"
                      />
                    </div>
                  );
                }
                return null;
              })()}
            </motion.section>

            {/* 4. QUIZ */}
            <motion.section
              id="section-quiz"
              variants={sectionVariants}
              viewport={{ once: true }}
              className="scroll-mt-28"
            >
              <QuizSection questions={topic.quiz} />
            </motion.section>
          </motion.div>

          {/* === RIGHT SIDEBAR (4 cols) - Sticky === */}
          {/* Đã thêm 'h-full' để đảm bảo chiều cao sidebar bằng với nội dung chính */}
          <aside className="lg:col-span-4 h-full">
            {/* Sticky wrapper */}
            <div className="sticky top-24 space-y-8 h-fit">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="space-y-8"
              >
                {/* Truyền activeSection vào TableOfContents */}
                <TableOfContents activeId={activeSection} />
                <FunFactCard />
                <ResourceCard />

                <motion.button
                  onClick={handleShare}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full flex items-center justify-center gap-2 bg-black text-white font-black text-base uppercase py-3 rounded-xl border-2 border-black shadow-[4px_4px_0px_black] transition-all hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0px_black] hover:bg-slate-800 active:translate-y-1 active:translate-x-1 active:shadow-none"
                >
                  <Share2 size={18} /> CHIA SẺ CHỦ ĐỀ NÀY
                </motion.button>
              </motion.div>
            </div>
          </aside>
        </div>
      </div>
    </motion.div>
    </AnimatePresence>
  );
};