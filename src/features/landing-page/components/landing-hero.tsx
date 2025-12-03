import React from "react";
import {
  ArrowRight, Star, Zap, Sun, Laptop, BookOpen, Rocket,
  Pencil, Smartphone, Cloud, Ruler, FileDigit, AtSign,
  Heart, CheckSquare, Hash
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

// --- GIẢ LẬP CÁC IMPORT (Giữ nguyên) ---
const Button = ({ children, className, size, variant, ...props }: any) => (
  <button className={`px-6 py-3 rounded-lg flex items-center justify-center ${className}`} {...props}>
    {children}
  </button>
);
const AnimatedText = ({ children }: any) => <span>{children}</span>;

// --- 1. CÁC SVG VẼ TAY CUSTOM ---

const PaperPlaneSVG = React.memo(() => (
  <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12l20-9-9 20-2-9-9-2z" />
    <path d="M22 3L11 13" />
  </svg>
));

const DoodleCross = React.memo(({ className }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className={className}>
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
));

const DoodleSquiggle = React.memo(({ className }: { className?: string }) => (
  <svg width="50" height="10" viewBox="0 0 50 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 3" className={className}>
    <path d="M1 5 C 10 -2, 20 12, 49 5" />
  </svg>
));

const DoodleStarFour = React.memo(({ className }: { className?: string }) => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className}>
    <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10Z" />
  </svg>
));

const DoodleSpring = React.memo(({ className }: { className?: string }) => (
  <svg width="40" height="40" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className}>
    <path d="M10 5 Q 30 5, 30 15 T 30 25 T 30 35 T 30 45" />
  </svg>
));

const CreativeBadge = React.memo(() => {
  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="absolute top-2 left-2 w-full h-full z-0 opacity-100">
        <path d="M30 5 L70 5 L95 30 L95 70 L70 95 L30 95 L5 70 L5 30 Z" fill="black" />
      </svg>
      <svg viewBox="0 0 100 100" className="absolute top-0 left-0 w-full h-full z-10">
        <path d="M30 5 L70 5 L95 30 L95 70 L70 95 L30 95 L5 70 L5 30 Z" fill="#FDE047" stroke="black" strokeWidth="3" strokeLinejoin="round"/>
      </svg>
      <div className="relative z-20 text-center -rotate-6">
        <span className="block text-4xl font-black text-black leading-none tracking-tighter">4.0</span>
        <span className="text-[10px] font-bold text-black uppercase tracking-widest bg-white/50 px-1 rounded-sm">Thời đại số</span>
      </div>
      <motion.div className="absolute -top-2 -right-2 z-30" animate={{ scale: [1, 1.2, 1], rotate: [0, 15, 0] }} transition={{ duration: 2, repeat: Infinity }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
          <path d="M12 2L14 9L21 12L14 15L12 22L10 15L3 12L10 9L12 2Z" fill="white"/>
        </svg>
      </motion.div>
    </div>
  );
});

// --- 2. CÁC COMPONENT ANIMATION ---

const PaperPlane = React.memo(() => {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      className="absolute top-20 left-[-10%] text-blue-600 z-0 opacity-60"
      style={{ willChange: "transform" }}
      animate={shouldReduceMotion ? {} : { x: ["0vw", "110vw"], y: [0, -40, 0, 40, -10], rotate: [5, 15, 0, 10] }}
      transition={{ duration: 18, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
    >
      <PaperPlaneSVG />
    </motion.div>
  );
});

const FloatingIcon = React.memo(({ children, className, delay = 0, duration = 4, type = "drift" }: any) => {
  const shouldReduceMotion = useReducedMotion();
  const animations: any = {
    drift: { y: [0, -10, 0], rotate: [0, 2, -2, 0] },
    bounce: { y: [0, -8, 0], scale: [1, 1.02, 0.98, 1] },
    shake: { rotate: [0, 1, -1, 1, 0] },
    spin: { rotate: [0, 360] }
  };
  return (
    <motion.div
      className={`absolute z-20 ${className}`}
      style={{ willChange: "transform" }}
      animate={shouldReduceMotion ? {} : animations[type]}
      transition={{ duration: duration, repeat: Infinity, delay: delay, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
});

// --- [UPDATED] CÁC WIDGET TRANG TRÍ 2 BÊN ---

const MusicPlayerWidget = () => (
  <motion.div
    // SỬA ĐỔI TẠI ĐÂY: z-30, left-2, scale-90
    className="hidden xl:flex absolute left-2 2xl:left-8 top-1/3 z-30 flex-col items-center scale-90 2xl:scale-100 origin-left"
    initial={{ x: -100, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay: 0.5, duration: 0.8 }}
  >
    {/* NOTE GHI CHÚ HỌC TẬP */}
    <div className="bg-[#fffef5] border-2 border-black px-4 py-3 rounded-xl shadow-[4px_4px_0px_black] rotate-[-6deg] hover:rotate-0 transition-transform cursor-pointer w-44 relative">
      <div className="absolute -top-3 left-6 w-10 h-3 bg-orange-300/70 rounded-sm rotate-[-8deg]" />
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-black uppercase tracking-wide">Study note</span>
        <BookOpen size={16} className="text-blue-600" />
      </div>
      <div className="space-y-1 text-[11px] font-semibold text-slate-800">
        <p className="line-through text-slate-400">Lướt mạng vô định</p>
        <p className="flex items-center gap-1">
          Ôn từ vựng mới
          <Star size={10} className="text-yellow-500 fill-yellow-400" />
        </p>
        <p className="flex items-center gap-1">
          Luyện 30' code
          <Pencil size={10} className="text-pink-500" />
        </p>
      </div>
    </div>
    {/* ICON TRÁI TIM NHỎ BÊN DƯỚI */}
    <div className="mt-4 flex gap-2">
      <FloatingIcon type="bounce" duration={2}>
        <div className="bg-blue-100 p-1.5 rounded-full border border-black text-blue-600">
          <Heart size={16} fill="currentColor" />
        </div>
      </FloatingIcon>
    </div>
  </motion.div>
);

const CodingWidget = () => (
  <motion.div
    // SỬA ĐỔI TẠI ĐÂY: z-30, right-2, scale-90
    className="hidden xl:flex absolute right-2 2xl:right-12 top-1/4 z-30 flex-col items-center scale-90 2xl:scale-100 origin-right"
    initial={{ x: 100, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay: 0.7, duration: 0.8 }}
  >
    {/* THẺ SỔ TAY Ô LY */}
    <div className="bg-white border-2 border-black p-4 rounded-lg shadow-[5px_5px_0px_rgba(0,0,0,0.2)] rotate-[4deg] hover:rotate-0 transition-transform w-52 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.12] pointer-events-none bg-[radial-gradient(circle_at_1px_1px,#000_0.5px,transparent_0.5px)] bg-[length:10px_10px]" />
      <div className="relative flex items-center justify-between mb-2">
        <span className="text-[10px] font-black uppercase tracking-wide">Plan học tập</span>
        <Ruler size={14} className="text-yellow-600" />
      </div>
      <div className="relative space-y-1 text-[11px] font-mono text-slate-900">
        <p>// Tuần này</p>
        <p>1. Ôn lại JS cơ bản</p>
        <p>2. Hoàn thành 1 mini project</p>
        <p>3. Ghi chú lại điều học được ✍️</p>
      </div>
    </div>

    {/* TO-DO NOTE NHỎ GẮN KÈM */}
    <div className="absolute -bottom-16 -right-4 bg-[#fff9c4] border-2 border-black p-3 rounded-sm shadow-sm rotate-[-3deg] w-32">
      <div className="flex items-center gap-1 mb-1 border-b border-black/20 pb-1">
        <CheckSquare size={14} className="text-black" />
        <span className="font-bold text-xs">To-Do</span>
      </div>
      <ul className="text-[10px] font-handwriting space-y-1">
        <li className="line-through decoration-red-500 text-slate-500">Ngủ nướng</li>
        <li className="flex items-center gap-1">
          Ôn bài toán
          <Star size={8} fill="orange" stroke="none" />
        </li>
      </ul>
      <div className="absolute -top-3 left-1/2 w-3 h-8 bg-red-400/30 -rotate-45" />
    </div>
  </motion.div>
);

const BackgroundDoodles = React.memo(() => {
  const shouldReduceMotion = useReducedMotion();

  const doodles = [
    // --- Bên trái ---
    { icon: <span className="font-handwriting text-2xl font-bold text-blue-500 opacity-60">E=mc²</span>, top: "12%", left: "5%", delay: 0 },
    { icon: <DoodleCross className="text-yellow-500 opacity-70" />, top: "25%", left: "2%", delay: 1.2 },
    { icon: <DoodleSpring className="text-purple-400 opacity-60 rotate-12" />, top: "50%", left: "8%", delay: 2 },
    { icon: <Hash className="text-slate-400 opacity-40" />, bottom: "30%", left: "4%", delay: 3 },
    { icon: <Ruler size={32} className="text-blue-500 rotate-45 opacity-60" />, bottom: "15%", left: "10%", delay: 3 },

    // --- Bên phải ---
    { icon: <div className="text-red-500 font-black text-3xl -rotate-12 border-2 border-red-500 rounded-full px-2 opacity-50">A+</div>, top: "15%", right: "5%", delay: 1 },
    { icon: <DoodleStarFour className="text-yellow-600 opacity-70" />, top: "35%", right: "8%", delay: 0.5 },
    { icon: <DoodleSquiggle className="text-pink-400 opacity-60 rotate-45" />, top: "60%", right: "3%", delay: 2.5 },
    { icon: <span className="font-mono text-lg text-blue-600 opacity-60">#GenZ</span>, bottom: "25%", right: "12%", delay: 3 },
    { icon: <div className="text-lg font-mono text-green-700 opacity-50">&lt;code/&gt;</div>, bottom: "10%", right: "8%", delay: 5 },
    
    // --- Ở giữa (phụ) ---
    { icon: <AtSign size={20} className="text-orange-500 opacity-40" />, bottom: "5%", left: "40%", delay: 4.2 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {doodles.map((doodle, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top: doodle.top, left: doodle.left, right: doodle.right, bottom: doodle.bottom, willChange: "transform, opacity" }}
          animate={shouldReduceMotion ? {} : { y: [0, -5, 0], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 6 + (i % 4), repeat: Infinity, delay: doodle.delay, ease: "easeInOut" }}
        >
          {doodle.icon}
        </motion.div>
      ))}
    </div>
  );
});


// --- 3. MAIN COMPONENT ---

export const LandingHero = () => {
  return (
    <section className="relative overflow-hidden bg-[#fff9f0] pt-28 pb-16 lg:py-24 font-sans text-slate-900 border-b-4 border-black min-h-[600px]">
      
      {/* 1. LAYER NỀN */}
      <BackgroundDoodles />

      {/* 2. WIDGETS TRANG TRÍ 2 BÊN (Hiện khi màn hình > XL) */}
      <MusicPlayerWidget />
      <CodingWidget />

      {/* 3. CÁC HOẠT CẢNH BACKGROUND LỚN */}
      <PaperPlane />

      {/* Rocket */}
      <FloatingIcon className="bottom-32 right-[15%] xl:right-[20%] text-orange-500 hidden sm:block" type="drift" duration={5}>
         <div className="relative">
            <Rocket size={48} strokeWidth={2.5} className="fill-white rotate-45" />
            <motion.div 
               className="absolute -bottom-3 -left-3 text-red-500 font-bold text-lg rotate-45"
               animate={{ opacity: [0.6, 1, 0.6], scale: [0.8, 1.2, 0.8] }}
               transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
            >
               !!!
            </motion.div>
         </div>
      </FloatingIcon>

      {/* Laptop */}
      <FloatingIcon className="bottom-[10%] left-[15%] xl:left-[20%] text-gray-700 hidden sm:block" type="shake" duration={4}>
         <Laptop size={44} strokeWidth={2.5} className="fill-gray-200" />
         <motion.div 
            className="absolute top-2 left-3 w-5 h-3 bg-blue-400 opacity-50 rounded-sm"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
         />
      </FloatingIcon>

      {/* Bút chì */}
      <FloatingIcon className="top-[18%] left-[40%] text-pink-500 z-10 hidden lg:block" type="drift" duration={6} delay={1}>
         <Pencil size={36} className="fill-pink-200 -rotate-12" strokeWidth={2.5} />
      </FloatingIcon>

      {/* SHAPES & DECORATIONS BÊN PHẢI */}
      <motion.div
        className="absolute right-0 top-0 h-full w-1/2 bg-blue-50 opacity-60 border-l-2 border-black border-dashed"
        style={{ borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" }}
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* --- MAIN CONTENT CONTAINER --- */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
          
          {/* --- CONTENT BÊN TRÁI --- */}
          <motion.div className="space-y-8 lg:w-1/2 relative" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{duration: 0.6}}>
            
            {/* Tagline */}
            <motion.div
              className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-help"
              style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }} 
              whileHover={{ scale: 1.02, rotate: -1 }}
            >
              <motion.span 
                 className="h-3 w-3 rounded-full bg-blue-600 border border-black" 
                 animate={{ scale: [1, 1.2, 1] }}
                 transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="font-bold text-blue-900">Thanh niên Việt Nam</span>
            </motion.div>

            <motion.h1 className="relative text-4xl font-black leading-tight text-black lg:text-6xl drop-shadow-sm cursor-default">
              <FloatingIcon className="-top-8 -left-8 text-yellow-400" type="spin" duration={15}>
                <Sun size={56} strokeWidth={3} className="fill-yellow-100" />
              </FloatingIcon>

              <AnimatedText>
                Hành trang số cho <br className="hidden lg:block" />
                <span className="relative whitespace-nowrap px-2 mx-1 inline-block transform hover:-rotate-1 transition-transform cursor-default">
                  <span className="absolute inset-0 -skew-y-2 bg-blue-200 border border-black rounded-sm" />
                  <span className="relative text-blue-900">Thanh Thiếu Niên</span>
                  <span className="absolute -right-3 -top-3 text-2xl rotate-[20deg]">✏️</span>
                </span>
                <br />
                trong{" "}
                <span className="relative whitespace-nowrap px-2 mx-1 inline-block transform hover:rotate-1 transition-transform cursor-default">
                   <span className="absolute inset-0 skew-y-1 bg-orange-200 border border-black rounded-sm" />
                   <span className="relative text-orange-900">Kỷ Nguyên Mới</span>
                   <Zap className="absolute -right-5 top-0 text-black fill-yellow-400 rotate-12" size={24} />
                </span>
              </AnimatedText>
            </motion.h1>

            <p className="max-w-lg text-lg font-medium leading-relaxed text-gray-700 cursor-default">
               Kết nối tri thức, chia sẻ đam mê và lan tỏa năng lượng tích cực đến cộng đồng Gen Z.
            </p>

            <div className="relative flex flex-wrap gap-4 pt-4">
               {/* BUTTON 1 */}
               <div className="relative group">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      size="lg"
                      // Neo-Brutalism: Default shadow 4px, Hover lift 2px + shadow 6px, Active press 4px + no shadow
                      className="gap-2 bg-blue-600 text-white font-black text-lg uppercase rounded-lg border-2 border-black shadow-[4px_4px_0px_black] transition-all hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0px_black] hover:bg-blue-700 active:translate-y-1 active:translate-x-1 active:shadow-none"
                    >
                      Bắt Đầu Ngay <ArrowRight size={20} strokeWidth={3} />
                    </Button>
                  </motion.div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 hidden lg:block pointer-events-none z-20">
                    <div className="relative bg-yellow-200 border-2 border-black px-3 py-1 shadow-[3px_3px_0px_black] -rotate-6 animate-bounce">
                      <span className="font-handwriting text-sm font-bold whitespace-nowrap">Click nè!</span>
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-black" />
                      <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[6px] border-b-yellow-200" />
                    </div>
                  </div>
               </div>

               {/* BUTTON 2 */}
               <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  variant="outline"
                  // Neo-Brutalism: Default shadow 4px, Hover lift 2px + shadow 6px, Active press 4px + no shadow
                  className="bg-white text-black font-black text-lg uppercase rounded-lg border-2 border-black shadow-[4px_4px_0px_black] transition-all hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0px_black] hover:bg-gray-50 active:translate-y-1 active:translate-x-1 active:shadow-none"
                >
                  Tìm Hiểu Thêm
                </Button>
               </motion.div>
            </div>
          </motion.div>

          {/* --- ẢNH BÊN PHẢI --- */}
          <motion.div
            className="relative w-full lg:w-1/2 px-4 mt-12 lg:mt-0"
            initial={{ opacity: 0, x: 50, rotate: 1 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.8 }}
          >
             {/* Sticker ngôi sao */}
            <FloatingIcon className="top-2 -right-4 text-blue-400 z-30" delay={0.5} type="bounce" duration={3}>
              <Star size={56} fill="yellow" strokeWidth={3} className="text-black" />
            </FloatingIcon>

             {/* ICON TECH-BOOK */}
            <FloatingIcon className="top-[40%] -left-6 z-30 hidden sm:block" type="drift" duration={5}>
              <div className="relative bg-white p-3 border-2 border-black rounded-xl shadow-[4px_4px_0px_black] hover:scale-105 transition-transform">
                 <motion.div
                   animate={{ opacity: [1, 0, 0, 1], scale: [1, 0.8, 0.8, 1], rotateY: [0, 180, 180, 360] }}
                   transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute inset-0 flex items-center justify-center"
                 >
                    <BookOpen size={28} className="text-orange-500 fill-orange-100" />
                 </motion.div>
                 <motion.div
                   animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1, 1, 0.8], rotateY: [180, 360, 360, 540] }}
                   transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                   className="flex items-center justify-center w-10 h-10"
                 >
                    <Smartphone size={28} className="text-blue-500 fill-blue-100" />
                 </motion.div>
                 <motion.div 
                    className="absolute -top-3 -right-2 text-blue-600"
                    animate={{ y: [0, -5], opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                 >
                    <Cloud size={18} fill="white" />
                 </motion.div>
              </div>
            </FloatingIcon>

            {/* MAIN IMAGE FRAME */}
            <motion.div
              className="relative bg-white border-2 border-slate-800 pt-3 px-3 pb-24 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.2)] group"
              style={{ borderRadius: "3px" }}
              whileHover={{ rotate: 1, scale: 1.005, boxShadow: "12px 12px 0px 0px rgba(0,0,0,0.2)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-28 h-7 bg-yellow-200/90 border border-yellow-400 rotate-[-2deg] z-20 backdrop-blur-sm shadow-sm" />
              <div className="relative overflow-hidden border border-slate-200 bg-slate-100">
                  <img
                    src="https://picsum.photos/800/800?random=20"
                    alt="Youth Activities"
                    className="aspect-square w-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 border-2 border-black px-2 py-0.5 -rotate-3 shadow-[2px_2px_0px_black] z-10 backdrop-blur-md">
                      <span className="font-bold text-xs flex items-center gap-1">
                          <Zap size={12} className="fill-yellow-400 text-black" /> Năng động
                      </span>
                  </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-24 flex items-end justify-between px-5 pb-4 font-handwriting text-slate-800">
                  <div className="flex flex-col">
                     <h3 className="text-3xl font-black leading-none rotate-[-1deg] text-[#1a1a1a]">
                        Mùa hè xanh '25
                     </h3>
                     <p className="text-sm font-bold text-slate-500 ml-1 mt-1 rotate-[-1deg] flex items-center gap-1">
                        <FileDigit size={14} /> Nhật ký số... 🖊️
                     </p>
                  </div>
                  <div className="text-4xl rotate-12 opacity-80 filter grayscale-[30%] group-hover:grayscale-0 transition-all group-hover:rotate-[15deg]">
                    🌻
                  </div>
              </div>
            </motion.div>

            {/* HUY HIỆU BADGE */}
            <motion.div
              className="absolute -bottom-10 -right-8 hidden md:block"
              animate={{ rotate: [0, 5, -5, 0] }} 
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.1, rotate: 10 }}
            >
              <CreativeBadge />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};