import React from "react";
import {
  Zap,
  Heart,
  MessageCircle,
  ArrowRight,
  Users,
  Clock,
  Flame,
} from "lucide-react";
import { ARTICLES, SIDEBAR_NEWS } from "@/data/landing-promotion-data";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

// --- 1. CÁC COMPONENT PHỤ TRỢ ---

const DoodleHighlight = () => (
  <svg
    className="absolute -z-10 -bottom-2 left-0 w-full h-4"
    viewBox="0 0 100 10"
    preserveAspectRatio="none"
  >
    <path
      d="M0 5 Q 50 10, 100 5"
      stroke="#FDE047"
      strokeWidth="8"
      fill="none"
      opacity="0.6"
    />
  </svg>
);

const StickerBadge = ({ children, className, rotate = 0 }: any) => (
  <div
    className={`inline-flex items-center justify-center px-3 py-1 font-black text-xs uppercase border-2 border-black shadow-[2px_2px_0px_black] ${className}`}
    style={{ transform: `rotate(${rotate}deg)` }}
  >
    {children}
  </div>
);

const BrutalistButton = ({ children, className, ...props }: any) => (
  <button
    className={`
      relative px-4 py-2 font-bold text-sm border-2 border-black bg-white transition-all
      hover:bg-blue-50 hover:-translate-y-1 hover:shadow-[4px_4px_0px_black]
      active:translate-y-0 active:shadow-none
      flex items-center gap-2
      ${className}
    `}
    {...props}
  >
    {children}
  </button>
);

// --- 2. ARTICLE CARD COMPONENT ---

const ArticleCard = ({ article, index }: { article: any; index: number }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 50 }}
      whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative h-full"
    >
      <div className="absolute inset-0 bg-black rounded-sm translate-x-2 translate-y-2 transition-transform duration-300 group-hover:translate-x-3 group-hover:translate-y-3" />
      <div className="relative h-full flex flex-col bg-white border-2 border-black transition-transform duration-300 group-hover:-translate-y-1 group-hover:-translate-x-1">
        <div className="relative h-56 overflow-hidden border-b-2 border-black bg-slate-200">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover grayscale-[20%] transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110"
          />
          <div className="absolute top-3 left-3 z-10">
            <StickerBadge className="bg-blue-200 text-blue-900" rotate={-3}>
              {article.category}
            </StickerBadge>
          </div>
          {article.isHot && (
            <motion.div
              className="absolute top-3 right-3 z-10"
              animate={{ scale: [1, 1.1, 1], rotate: [5, 10, 5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <StickerBadge className="bg-red-500 text-white" rotate={5}>
                <Flame
                  size={12}
                  className="mr-1 fill-yellow-300 text-yellow-300"
                />{" "}
                HOT
              </StickerBadge>
            </motion.div>
          )}
        </div>
        <div className="flex flex-col flex-1 p-5">
          <div className="flex items-center gap-3 text-xs font-bold text-slate-500 mb-3 font-mono">
            <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 border border-black rounded-sm shadow-[1px_1px_0px_black]">
              <Users size={12} /> {article.author}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} /> {article.date}
            </span>
          </div>
          <h3 className="text-xl font-black leading-tight mb-3 text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-sm font-medium text-slate-600 line-clamp-3 mb-6 flex-1">
            {article.description}
          </p>
          <div className="mt-auto pt-4 border-t-2 border-dashed border-slate-300 flex items-center justify-between">
            <div className="flex gap-4 text-slate-500 text-xs font-black">
              <span className="flex items-center gap-1 hover:text-red-500 transition-colors cursor-pointer group/icon">
                <Heart size={16} className="group-hover/icon:fill-red-500" />{" "}
                {article.likes}
              </span>
              <span className="flex items-center gap-1 hover:text-blue-500 transition-colors cursor-pointer group/icon">
                <MessageCircle
                  size={16}
                  className="group-hover/icon:fill-blue-500"
                />{" "}
                {article.comments}
              </span>
            </div>
            <div className="text-sm font-black flex items-center gap-1 group-hover:underline decoration-2 decoration-blue-500 underline-offset-4 cursor-pointer">
              Đọc tiếp{" "}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- 3. SIDEBAR COMPONENT (ĐÃ SỬA LỖI PAUSE ON HOVER) ---

const SidebarNews = () => {
  // 1. Nhân đôi data để tạo vòng lặp không vết nối
  const SCROLL_ITEMS = [...SIDEBAR_NEWS, ...SIDEBAR_NEWS];

  return (
    <div className="relative sticky top-24">
      {/* Định nghĩa CSS Animation cục bộ */}
      <style>{`
        @keyframes scroll-vertical {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        /* Class chạy animation */
        .animate-scroll {
          animation: scroll-vertical 60s linear infinite;
        }
        /* Class dừng animation khi hover vào cha */
        .group-scroll:hover .animate-scroll {
          animation-play-state: paused;
        }
      `}</style>
      {/* Background Decor */}
      <div className="absolute inset-0 bg-yellow-100 border-2 border-black translate-x-2 translate-y-2" />
      <div className="absolute inset-0 bg-yellow-50 border-2 border-black translate-x-1 translate-y-1" />

      {/* Container Chính */}
      <div className="relative bg-[#fffbeb] border-2 border-black p-0 shadow-sm flex flex-col">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 border-b-2 border-black flex items-center justify-between z-20 relative">
          <div className="flex items-center gap-2">
            <Zap className="fill-yellow-400 text-yellow-400 animate-pulse" />
            <h3 className="font-black text-xl uppercase tracking-wider">
              Tin Nhanh
            </h3>
          </div>
          {/* Icon chỉ dẫn */}
          <div className="opacity-80 group-scroll:hover:opacity-100 transition-opacity">
            {/* Icon Play sẽ hiện mặc định, Icon Pause hiện khi hover (xử lý bằng CSS group nếu muốn, hoặc để tĩnh trang trí) */}
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          </div>
        </div>
        {/* --- KHU VỰC CUỘN (SCROLL AREA) --- */}
        {/* Thêm class 'group-scroll' để làm mốc bắt sự kiện hover */}
        <div className="relative h-[400px] overflow-hidden group-scroll">
          {/* Gradient mờ 2 đầu để làm mềm */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-[#fffbeb] to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#fffbeb] to-transparent z-10 pointer-events-none" />
          {/* Div chứa nội dung cuộn (Dùng CSS Class thay vì Framer Motion) */}
          <div className="p-4 space-y-4 animate-scroll will-change-transform">
            {SCROLL_ITEMS.map((item, i) => (
              <div
                key={`${item.id}-${i}`}
                className="group/item flex gap-3 pb-4 border-b-2 border-dashed border-slate-300 last:border-0 cursor-pointer hover:bg-white/80 p-2 rounded-lg transition-colors"
              >
                <div className="w-16 h-16 bg-slate-200 border-2 border-black shrink-0 overflow-hidden relative group-hover/item:-rotate-2 transition-transform">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-sm leading-snug text-slate-800 group-hover/item:text-blue-600 group-hover/item:underline decoration-2 transition-all line-clamp-2">
                    {item.title}
                  </h4>
                  <span className="text-xs font-mono text-slate-500 mt-1 block">
                    {item.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t-2 border-black z-20 relative">
          <BrutalistButton className="w-full justify-center bg-white">
            Xem Tất Cả Tin <ArrowRight size={16} />
          </BrutalistButton>
        </div>
      </div>
    </div>
  );
};

// --- 4. MAIN LAYOUT ---

export const LandingPromotions = () => {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = React.useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-20 overflow-hidden bg-[#fff9f0] border-b-4 border-black"
    >
      {/* Background Decor */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
        style={{
          backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      <motion.div
        className="absolute top-20 -left-20 w-80 h-80 bg-blue-200 rounded-full blur-[80px] opacity-40 pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 -right-20 w-96 h-96 bg-yellow-200 rounded-full blur-[80px] opacity-40 pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Nội dung chính */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-16 text-center"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
          animate={isInView && !shouldReduceMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block mb-4">
            <StickerBadge className="bg-green-300 text-black rotate-[-2deg]">
              CẬP NHẬT 24/7
            </StickerBadge>
          </div>
          <h2 className="relative inline-block text-4xl lg:text-6xl font-black tracking-tight text-slate-900">
            <span className="relative z-10">Tiêu Điểm Nổi Bật</span>
            <DoodleHighlight />
            <div className="absolute -top-6 -right-8 text-orange-500 hidden md:block animate-spin-slow">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </div>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cột bài viết chính */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
            {ARTICLES.map((article, index) => (
              <ArticleCard
                key={article.id || index}
                article={article}
                index={index}
              />
            ))}
          </div>

          {/* Cột Sidebar (Đã có scroll) */}
          <motion.div
            className="lg:col-span-1"
            initial={shouldReduceMotion ? {} : { opacity: 0, x: 50 }}
            animate={
              isInView && !shouldReduceMotion ? { opacity: 1, x: 0 } : {}
            }
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <SidebarNews />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
