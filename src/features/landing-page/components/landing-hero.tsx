import React from "react";
import { ArrowRight, Star, Sun, Laptop, Rocket, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/primitives";
import heroImageDesktop from "@/assets/landing-images/hero_desktop.png";
import heroImageMobile from "@/assets/landing-images/hero_mobile.jpg";

// --- CÁC COMPONENT PHỤ (Giữ nguyên) ---
const PaperPlaneSVG = React.memo(() => (
  <svg
    width="50"
    height="50"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 12l20-9-9 20-2-9-9-2z" />
    <path d="M22 3L11 13" />
  </svg>
));

const CreativeBadge = React.memo(() => {
  return (
    <div className="relative w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 flex items-center justify-center">
      <svg
        viewBox="0 0 100 100"
        className="absolute top-2 left-2 w-full h-full z-0 opacity-100"
      >
        <path
          d="M30 5 L70 5 L95 30 L95 70 L70 95 L30 95 L5 70 L5 30 Z"
          fill="black"
        />
      </svg>
      <svg
        viewBox="0 0 100 100"
        className="absolute top-0 left-0 w-full h-full z-10"
      >
        <path
          d="M30 5 L70 5 L95 30 L95 70 L70 95 L30 95 L5 70 L5 30 Z"
          fill="#FDE047"
          stroke="black"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </svg>
      <div className="relative z-20 text-center -rotate-6">
        <span className="block text-3xl md:text-4xl font-black text-black leading-none tracking-tighter">
          GenZ
        </span>
        <span className="text-[9px] md:text-[10px] font-bold text-black uppercase tracking-widest bg-white/50 px-1 rounded-sm">
          Công dân số
        </span>
      </div>
      <motion.div
        className="absolute -top-2 -right-2 z-30"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 15, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Star size={24} fill="white" stroke="black" strokeWidth={2} />
      </motion.div>
    </div>
  );
});

const PaperPlane = React.memo(() => {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      className="absolute top-20 left-[-10%] text-white z-0 opacity-80"
      style={{ willChange: "transform" }}
      animate={
        shouldReduceMotion
          ? {}
          : {
              x: ["0vw", "110vw"],
              y: [0, -40, 0, 40, -10],
              rotate: [5, 15, 0, 10],
            }
      }
      transition={{
        duration: 18,
        repeat: Infinity,
        ease: "linear",
        repeatDelay: 1,
      }}
    >
      <PaperPlaneSVG />
    </motion.div>
  );
});

const FloatingIcon = React.memo(
  ({ children, className, delay = 0, duration = 4, type = "drift" }: any) => {
    const shouldReduceMotion = useReducedMotion();
    const animations: any = {
      drift: { y: [0, -10, 0], rotate: [0, 2, -2, 0] },
      bounce: { y: [0, -8, 0], scale: [1, 1.02, 0.98, 1] },
      shake: { rotate: [0, 1, -1, 1, 0] },
      spin: { rotate: [0, 360] },
    };
    return (
      <motion.div
        className={`absolute z-20 ${className}`}
        style={{ willChange: "transform" }}
        animate={shouldReduceMotion ? {} : animations[type]}
        transition={{
          duration: duration,
          repeat: Infinity,
          delay: delay,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.div>
    );
  }
);

const CartoonCloud = ({
  className,
  delay = 0,
  scale = 1,
}: {
  className?: string;
  delay?: number;
  scale?: number;
}) => (
  <motion.div
    className={`absolute text-white opacity-70 ${className}`}
    initial={{ x: -50, opacity: 0 }}
    animate={{ x: 0, opacity: 0.7, y: [0, -10, 0] }}
    transition={{
      x: { duration: 1, delay: delay },
      opacity: { duration: 1, delay: delay },
      y: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: delay + 2 },
    }}
  >
    <svg
      width={100 * scale}
      height={60 * scale}
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
    >
      <path d="M17.5 19c0-1.7-1.3-3-3-3h-11c-1.7 0-3 1.3-3 3 .6 1.6 2.1 2.7 3.9 2.7h10.3c1.7 0 3.3-1.1 3.8-2.7z" />
      <path d="M9.5 16c0-2.8 2.2-5 5-5s5 2.2 5 5" />
      <path d="M5.5 16c0-2.2 1.8-4 4-4" />
      <path d="M14.5 11c0-2.2-1.8-4-4-4-2.2 0-4 1.8-4 4" />
    </svg>
  </motion.div>
);

// --- HERO IMAGE ---
const HeroImage = () => {
  return (
    // Thêm padding y để tránh bị cắt bóng đổ khi thu nhỏ trên mobile
    <div className="flex justify-center py-2">
      <div
        className="relative w-[85%] sm:w-[80%] md:w-full max-w-4xl overflow-hidden rounded-xl border-4 border-black bg-slate-200 shadow-[6px_6px_0px_black] group-hover:shadow-[8px_8px_0px_black] group-hover:-translate-y-1 transition-all"
      >
        {/* Desktop Image - giữ nguyên */}
        <motion.img
          src={heroImageDesktop}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hidden md:block relative w-full h-auto object-contain"
          alt="Hành trang số cho thanh thiếu niên"
        />

        {/* Mobile Image - giữ nguyên */}
        <motion.img
          src={heroImageMobile}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          // Ảnh bên trong vẫn là w-full để nó lấp đầy cái khung đã bị thu nhỏ
          className="block md:hidden relative w-full h-auto object-contain"
          alt="Hành trang số cho thanh thiếu niên"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-xl pointer-events-none" />
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---

export const LandingHero = () => {
  return (
    <section
      className="relative overflow-x-hidden bg-[#87CEEB] 
        pt-20 sm:pt-28 md:pt-40 lg:pt-28 
        pb-16 sm:pb-24 md:pb-32 lg:pb-16
        font-sans text-slate-900 border-b-4 border-black min-h-screen flex flex-col items-center justify-start"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <CartoonCloud
          className="hidden sm:block top-[5%] left-[2%]"
          scale={0.8}
        />
        <CartoonCloud
          className="hidden md:block top-[8%] right-[2%] lg:top-[15%] lg:right-[5%]"
          scale={0.8}
          delay={1}
        />
        <CartoonCloud
          className="hidden lg:block bottom-[30%] left-[10%]"
          scale={0.8}
          delay={2}
        />

        <FloatingIcon
          className="hidden md:block top-[15%] right-[15%] lg:top-[12%] lg:right-[20%] text-blue-500 opacity-70 font-handwriting text-2xl rotate-12 z-0"
          type="drift"
        >
          Học tập suốt đời!
        </FloatingIcon>
      </div>

      <div className="hidden lg:block">
        <PaperPlane />
      </div>

      <FloatingIcon
        className="hidden md:block top-32 lg:top-28 left-[5%] lg:left-[8%] text-orange-500 z-0"
        type="drift"
        duration={7}
      >
        <Rocket
          size={36}
          strokeWidth={2.5}
          className="fill-white rotate-45 opacity-80"
        />
      </FloatingIcon>

      {/* --- CONTENT CONTAINER --- */}
      <div className="relative z-10 w-full mx-auto px-4 md:px-8 flex flex-col items-center text-center max-w-5xl">
        {/* HEADER SECTION - BỐ CỤC 2 DÒNG */}
        <motion.div
          className="mb-8 md:mb-12 flex flex-col items-center relative w-full"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Sun Icon */}
          <FloatingIcon
            className="hidden md:block -top-10 -right-4 lg:-right-12 text-yellow-300 z-0"
            type="spin"
            duration={20}
          >
            <Sun
              size={64}
              strokeWidth={3}
              className="fill-yellow-200 stroke-black"
            />
          </FloatingIcon>

          <div className="flex flex-col items-center gap-4 z-10 w-full">
            {/* DÒNG 1: HỘP VÀNG "HÀNH TRANG SỐ" */}
            <div className="relative transform -rotate-1 hover:rotate-0 transition-transform duration-300 w-full px-2">
              <div className="bg-[#FDE047] border-[3px] md:border-4 border-black px-3 py-2 sm:px-6 sm:py-2 md:px-8 md:py-3 rounded-xl shadow-[6px_6px_0px_black]">
                <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-7xl font-black text-slate-900 leading-tight sm:leading-none uppercase tracking-tight break-words overflow-wrap-anywhere">
                  Hành Trang Số
                </h1>
              </div>
              {/* Decor góc hộp */}
              <div className="absolute -top-2 -left-2 text-white hidden sm:block">
                <Sparkles
                  size={24}
                  className="fill-white stroke-black stroke-2"
                />
              </div>
            </div>

            {/* DÒNG 2: CHỮ NỐI LIỀN - KHÔNG CÓ HỘP */}
            <h2
              className="text-base sm:text-xl md:text-3xl lg:text-4xl font-black text-white uppercase tracking-wide leading-snug sm:leading-tight md:leading-relaxed mt-3 px-3 sm:px-4 text-center break-words overflow-wrap-anywhere"
              style={{
                WebkitTextStroke: "0.8px black",
                textShadow: "1.5px 1.5px 0px black",
              }}
            >
              Cho Thanh Thiếu Niên Trong Thời Đại Mới
            </h2>
          </div>
        </motion.div>

        {/* White Box - KHUNG NỘI DUNG CHÍNH */}
        <motion.div
          className="relative w-full bg-white 
            border-[3px] md:border-4 border-black rounded-xl md:rounded-2xl lg:rounded-[2rem] 
            p-4 sm:p-5 md:p-8 lg:p-8 
            shadow-[6px_6px_0px_0px_rgba(0,0,0,0.25)] md:shadow-[10px_10px_0px_0px_rgba(0,0,0,0.25)] 
            mb-6 sm:mb-10 z-20 mt-2 mx-2 sm:mx-0"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
        >
          <FloatingIcon
            className="hidden sm:block -top-3 sm:-top-5 -left-3 sm:-left-5 text-blue-400 z-30"
            type="bounce"
            duration={3}
          >
            <Star
              size={32}
              fill="yellow"
              strokeWidth={3}
              className="text-black"
            />
          </FloatingIcon>
          <FloatingIcon
            className="hidden lg:block -bottom-6 -right-6 z-30"
            delay={0.5}
            type="drift"
          >
            <CreativeBadge />
          </FloatingIcon>

          <div className="flex flex-col gap-6 items-center text-center">
            {/* Hero Image */}
            <div className="relative w-full group">
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 md:w-40 h-7 md:h-8 bg-blue-200/80 border-2 border-blue-400 rotate-[-2deg] z-20 backdrop-blur-sm shadow-[2px_2px_0px_black] flex items-center justify-center">
                <span className="font-handwriting font-bold text-blue-900 text-xs md:text-sm flex items-center gap-1">
                  <Laptop size={14} /> E-Learning
                </span>
              </div>
              <HeroImage />
            </div>

            {/* Text Section */}
            <div className="w-full space-y-4 px-2 sm:px-1 md:px-6">
              <div className="flex items-center justify-center gap-2"></div>

              <p className="text-slate-700 font-bold text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed break-words overflow-wrap-anywhere">
                Trong kỷ nguyên số, thanh thiếu niên (Gen Z) không chỉ cần được
                trang bị kiến thức mà còn cần một nền tảng đạo đức và lý tưởng
                cách mạng vững chắc.
              </p>

              <p className="text-slate-600 font-medium leading-relaxed text-base md:text-lg hidden sm:block">
                "Hành trang số cho thanh thiếu niên trong thời đại mới" là giải
                pháp giáo dục trực tuyến toàn diện, bồi đắp lý tưởng, đạo đức
                cách mạng và trách nhiệm xã hội.
              </p>

              <div className="inline-block bg-yellow-100 border-2 border-black p-3 sm:p-4 md:p-5 rounded-lg shadow-[3px_3px_0px_black] rotate-[-1deg] mt-2 max-w-2xl mx-auto w-full sm:w-auto">
                <p className="text-black font-bold text-xs sm:text-sm md:text-base lg:text-lg leading-snug sm:leading-tight break-words overflow-wrap-anywhere">
                  Hãy cùng chúng tôi xây dựng một thế hệ thanh, thiếu niên Việt
                  Nam: Vững vàng về đạo đức, giàu có về tri thức!
                </p>
              </div>
            </div>

            <div className="pt-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Button
                  size="lg"
                  className="bg-blue-600 text-white font-black uppercase rounded-lg border-2 border-black shadow-[4px_4px_0px_black] hover:bg-blue-700 hover:shadow-[6px_6px_0px_black] hover:-translate-y-0.5 transition-all gap-2 text-sm md:text-base px-6 py-3"
                >
                  Tham Gia Ngay <ArrowRight size={18} strokeWidth={3} />
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
