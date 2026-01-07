import { motion, AnimatePresence } from "framer-motion";
import type { LearningTopic } from "../learning-topics.type";
import { QuizSection } from "./quiz-section";
import {
  BookOpen,
  Target,
  Video,
  Star,
  Share2,
  List, // Thêm icon cho TableOfContents
  CheckCircle2, // Thêm icon cho TableOfContents
} from "lucide-react";
// Bỏ import TableOfContents từ topic-widgets vì ta sẽ định nghĩa lại ở đây để tùy biến
import { FunFactCard, ResourceCard } from "./topic-widgets";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useEffect, useState, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { showToast } from "@/lib/toast";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useDeviceType } from "@/hooks/use-device-type";

interface TopicDetailTemplateProps {
  topic: LearningTopic;
}

const doodleDotPattern =
  "data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2394a3b8' fill-opacity='0.2' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='2'/%3E%3Ccircle cx='13' cy='13' r='2'/%3E%3C/g%3E%3C/svg%3E";

// --- Dữ liệu Mục lục (Label + ID tương ứng) ---
const TOC_ITEMS = [
  { label: "Mục tiêu chủ đề", id: "section-objectives" },
  { label: "Nội dung trọng tâm", id: "section-content" },
  { label: "Infographic ghi nhớ", id: "section-infographic" },
  { label: "Trắc nghiệm", id: "section-quiz" },
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
        behavior: "smooth",
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
                  ? "text-emerald-700 translate-x-2"
                  : "text-slate-600 hover:text-emerald-600 hover:translate-x-1"
              }`}
            >
              <CheckCircle2
                size={14}
                className={`transition-colors duration-300 ${
                  isActive
                    ? "text-emerald-600 fill-emerald-100"
                    : "text-slate-300 group-hover:text-emerald-400"
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
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 15,
      bounce: 0.4,
    },
  },
};

export const textH2Variants = {
  hidden: { y: 25, opacity: 0, x: -10 },
  visible: {
    y: 0,
    x: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 180,
      damping: 14,
      bounce: 0.35,
    },
  },
};

export const textPVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 150,
      damping: 12,
      bounce: 0.3,
    },
  },
};

export const textSpanVariants = {
  hidden: { y: 15, opacity: 0, scale: 0.98 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 160,
      damping: 13,
      bounce: 0.25,
    },
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
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 },
  },
};

// --- Component SubSections có thể đóng/mở ---
import type { LearningContentSubSection } from "../learning-topics.type";

interface CollapsibleSubSectionsProps {
  subSections: LearningContentSubSection[];
  parentIndex: number;
}

const CollapsibleSubSections = ({
  subSections,
  parentIndex,
}: CollapsibleSubSectionsProps) => {
  // State lưu trữ các mục đang mở (mặc định mở mục đầu tiên)
  const [openItems, setOpenItems] = useState<Set<number>>(new Set([0]));

  const toggleItem = useCallback((index: number) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  }, []);

  const expandAll = useCallback(() => {
    setOpenItems(new Set(subSections.map((_, i) => i)));
  }, [subSections]);

  const collapseAll = useCallback(() => {
    setOpenItems(new Set());
  }, []);

  return (
    <div className="space-y-3">
      {/* Nút điều khiển đóng/mở tất cả */}
      <div className="flex gap-2 justify-end mb-2">
        <button
          onClick={expandAll}
          className="text-xs font-bold text-sky-600 hover:text-sky-800 hover:underline transition-colors"
        >
          Mở tất cả
        </button>
        <span className="text-slate-300">|</span>
        <button
          onClick={collapseAll}
          className="text-xs font-bold text-sky-600 hover:text-sky-800 hover:underline transition-colors"
        >
          Đóng tất cả
        </button>
      </div>

      {/* Danh sách các mục con */}
      {subSections.map((subSection, subIndex) => {
        const isOpen = openItems.has(subIndex);
        return (
          <div
            key={subIndex}
            className="border-2 border-sky-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Header - Click để toggle */}
            <button
              onClick={() => toggleItem(subIndex)}
              className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-sky-50 hover:bg-sky-100 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-sky-500 text-xs font-black text-white border-2 border-sky-600 shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">
                  {parentIndex + 1}.{subIndex + 1}
                </span>
                <h4 className="text-sm font-black text-sky-900 leading-tight">
                  {subSection.title}
                </h4>
              </div>
              <ChevronDown
                size={20}
                className={`text-sky-600 transition-transform duration-300 flex-shrink-0 ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {/* Content - Collapsible */}
            <motion.div
              initial={false}
              animate={{
                height: isOpen ? "auto" : 0,
                opacity: isOpen ? 1 : 0,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-4 py-4 border-t-2 border-sky-100">
                <p className="text-sm font-medium leading-relaxed text-slate-600 whitespace-pre-line">
                  {subSection.content}
                </p>
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};

export const TopicDetailTemplate = ({ topic }: TopicDetailTemplateProps) => {
  const [activeSection, setActiveSection] = useState<string>("");
  const shouldReduceMotion = useReducedMotion();
  const { isMobile } = useDeviceType();

  // Logic theo dõi cuộn trang (Scroll Spy)
  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = TOC_ITEMS.map((item) => item.id);
      const headerOffset = 200; // Offset cho header + margin

      // Tìm section đang hiển thị nhiều nhất trong viewport
      let currentSection = "";
      let minDistance = Infinity;

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Tính khoảng cách từ top của element đến vùng trigger (headerOffset)
          const distance = Math.abs(rect.top - headerOffset);

          // Nếu element đang trong viewport (top < headerOffset và bottom > 0)
          if (rect.top <= headerOffset && rect.bottom > 100) {
            // Chọn section có top gần với headerOffset nhất
            if (distance < minDistance) {
              minDistance = distance;
              currentSection = id;
            }
          }
        }
      }

      // Fallback: nếu không tìm thấy, lấy section đầu tiên có trong viewport
      if (!currentSection) {
        for (const id of sectionIds) {
          const element = document.getElementById(id);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
              currentSection = id;
              break;
            }
          }
        }
      }

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    // Gọi ngay khi mount để set initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hàm xử lý chia sẻ - copy link và hiển thị thông báo
  const handleShare = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      showToast.success(
        "Đã sao chép link!",
        "Link đã được sao chép vào clipboard."
      );
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
        showToast.success(
          "Đã sao chép link!",
          "Link đã được sao chép vào clipboard."
        );
      } catch (err) {
        showToast.error(
          "Không thể sao chép link",
          "Vui lòng sao chép thủ công."
        );
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
              transition={{
                type: "spring" as const,
                stiffness: 200,
                damping: 12,
              }}
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
          {/* Mobile/Tablet: 1 cột full width | Desktop: 12 cols grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* === LEFT CONTENT === */}
            {/* Mobile/Tablet: full width | Desktop: 8 cols */}
            <motion.div
              className="col-span-1 lg:col-span-8 space-y-12"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* 1. OBJECTIVES - Màu Emerald (Xanh lá) */}
              <motion.section
                id="section-objectives"
                variants={sectionVariants}
                className="relative group scroll-mt-28"
              >
                <div className="absolute inset-0 bg-emerald-500 rounded-xl translate-x-2 translate-y-2 border-2 border-black transition-transform group-hover:translate-x-3 group-hover:translate-y-3" />
                <motion.div
                  className="relative rounded-xl border-2 border-black bg-white p-8"
                  variants={textContainerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.h2
                    variants={textH2Variants}
                    className="mb-6 flex items-center text-2xl font-black text-emerald-700 uppercase border-b-2 border-dashed border-emerald-200 pb-2 w-fit"
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
                        <span className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-sm font-black text-emerald-800 border-2 border-black shadow-[2px_2px_0px_black]">
                          {index + 1}
                        </span>
                        <span className="mt-1">{obj}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              </motion.section>

              {/* 2. CONTENT TEXT & VIDEO - Màu Sky Blue */}
              <motion.section
                id="section-content"
                variants={sectionVariants}
                className="space-y-6 scroll-mt-28"
                {...(!shouldReduceMotion && {
                  viewport: { once: true, margin: "-100px" },
                })}
              >
                {/* Header chung cho phần Nội dung trọng tâm */}
                <motion.div
                  variants={textContainerVariants}
                  initial="hidden"
                  {...(!shouldReduceMotion && {
                    whileInView: "visible",
                    viewport: { once: true, margin: "-50px" },
                  })}
                  className="flex items-center gap-3"
                >
                  <motion.h2
                    variants={textH2Variants}
                    className="flex items-center text-xl font-black text-black uppercase bg-sky-300 w-fit px-3 py-1 border-2 border-black rounded-lg -rotate-1"
                  >
                    <BookOpen className="mr-2" size={20} strokeWidth={2.5} />
                    Nội dung trọng tâm
                  </motion.h2>
                </motion.div>

                {/* Hiển thị các section nội dung chi tiết (nếu có) */}
                {topic.content.sections && topic.content.sections.length > 0 ? (
                  <div className="space-y-5">
                    {topic.content.sections.map((section, index) => (
                      <motion.div
                        key={index}
                        variants={sectionVariants}
                        initial="hidden"
                        {...(!shouldReduceMotion && {
                          whileInView: "visible",
                          viewport: { once: true, margin: "-50px" },
                        })}
                        className="group relative"
                      >
                        {/* Shadow layer - Sky Blue */}
                        <div className="absolute inset-0 bg-sky-500 rounded-xl translate-x-2 translate-y-2 border-2 border-black transition-transform group-hover:translate-x-3 group-hover:translate-y-3" />

                        {/* Main card */}
                        <div className="relative rounded-xl border-2 border-black bg-white overflow-hidden">
                          {/* Section header - Sky Blue */}
                          <div className="bg-sky-100 border-b-2 border-black px-5 py-3 flex items-center gap-3">
                            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-sky-500 text-sm font-black text-white border-2 border-black shadow-[2px_2px_0px_black]">
                              {index + 1}
                            </span>
                            <h3 className="text-base font-black text-sky-900 leading-tight">
                              {section.title}
                            </h3>
                          </div>

                          {/* Section content */}
                          <div className="p-5">
                            {/* Nếu có content trực tiếp */}
                            {section.content && (
                              <p className="text-sm font-medium leading-relaxed text-slate-700 whitespace-pre-line">
                                {section.content}
                              </p>
                            )}

                            {/* Nếu có subSections (mục con 4.1, 4.2...) - Collapsible */}
                            {section.subSections &&
                              section.subSections.length > 0 && (
                                <CollapsibleSubSections
                                  subSections={section.subSections}
                                  parentIndex={index}
                                />
                              )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  /* Fallback: hiển thị summary nếu không có sections */
                  <motion.div
                    variants={textContainerVariants}
                    initial="hidden"
                    {...(!shouldReduceMotion && {
                      whileInView: "visible",
                      viewport: { once: true, margin: "-50px" },
                    })}
                    className="rounded-xl border-2 border-black bg-white p-6 shadow-[6px_6px_0px_black]"
                  >
                    <motion.p
                      variants={textPVariants}
                      className="text-sm font-medium leading-relaxed text-slate-700 border-l-4 border-sky-200 pl-4"
                    >
                      {topic.content.summary}
                    </motion.p>
                  </motion.div>
                )}

                {/* Video section */}
                {topic.content.videoUrl && (
                  <motion.div
                    variants={sectionVariants}
                    initial="hidden"
                    {...(!shouldReduceMotion && {
                      whileInView: "visible",
                      viewport: { once: true, margin: "-50px" },
                    })}
                    className="rounded-xl border-2 border-black bg-white p-4 shadow-[6px_6px_0px_black]"
                  >
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
                  </motion.div>
                )}
              </motion.section>

              {/* 3. INFOGRAPHIC */}
              <motion.section
                id="section-infographic"
                variants={sectionVariants}
                className="rounded-xl border-2 border-black bg-white shadow-[6px_6px_0px_black] scroll-mt-28"
                {...(!shouldReduceMotion && {
                  viewport: { once: true },
                })}
              >

                {(() => {
                  const infographicUrls = topic.infographicUrls;
                  if (infographicUrls && infographicUrls.length > 0) {
                    // Filter ảnh dựa trên device type
                    const filteredUrls = infographicUrls.filter(url => {
                      // Kiểm tra tên file có chứa "desktop" hay "mobile"
                      const fileName = url.split('/').pop()?.toLowerCase() || '';
                      if (isMobile) {
                        return fileName.includes('mobile');
                      } else {
                        return fileName.includes('desktop');
                      }
                    });

                    // Nếu không có ảnh phù hợp với device type, hiển thị tất cả
                    const displayUrls = filteredUrls.length > 0 ? filteredUrls : infographicUrls;

                    return (
                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <Carousel
                          opts={{ align: "start", loop: true }}
                          className="w-full"
                        >
                          <CarouselContent className="ml-0">
                            {displayUrls.map((url, index) => (
                              <CarouselItem
                                key={index}
                                className="pl-0 basis-full"
                              >
                                <div className="relative overflow-hidden rounded-lg border-2 border-black bg-white shadow-[2px_2px_0px_black] h-[520px] sm:h-[600px]">
                                  {/* KHUNG ẢNH FULL */}
                                  <div className="w-full h-full bg-slate-100">
                                    <img
                                      src={url}
                                      alt={`${topic.title} - Ảnh ${index + 1}`}
                                      className="w-full h-full object-contain"
                                      // nếu bạn muốn full kín khung (có thể crop) thì đổi object-contain -> object-cover
                                    />
                                  </div>


                                </div>
                              </CarouselItem>
                            ))}
                          </CarouselContent>
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
                <QuizSection questions={topic.quiz} quizId={topic.quizId} />
              </motion.section>

              {/* 5. TÀI LIỆU THAM KHẢO */}
              {topic.references && topic.references.length > 0 && (
                <motion.section
                  id="section-references"
                  variants={sectionVariants}
                  viewport={{ once: true }}
                  className="scroll-mt-28"
                >
                  <div className="rounded-xl border-2 border-black bg-white overflow-hidden shadow-[4px_4px_0px_black]">
                    {/* Header */}
                    <div className="bg-slate-100 border-b-2 border-black px-5 py-3 flex items-center gap-2">
                      <BookOpen size={20} className="text-slate-700" />
                      <h2 className="text-lg font-black text-slate-800 uppercase">
                        Tài liệu tham khảo
                      </h2>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <ol className="space-y-3 list-none">
                        {topic.references.map((ref) => (
                          <li
                            key={ref.id}
                            className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed"
                          >
                            <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-700 border border-slate-300 mt-0.5">
                              {ref.id}
                            </span>
                            <span className="italic">{ref.text}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </motion.section>
              )}
            </motion.div>

            {/* === RIGHT SIDEBAR (4 cols) - Sticky === */}
            {/* Ẩn trên mobile và tablet, chỉ hiển thị trên desktop (lg trở lên) */}
            <aside className="hidden lg:block lg:col-span-4 h-full">
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
