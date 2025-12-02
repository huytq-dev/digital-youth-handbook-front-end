import { useRef } from "react";
import {
  Sparkles, Monitor, Heart, Scale, Rocket,
  Landmark, Waves, Flame, Zap, ArrowUpRight
} from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";

// --- 1. CÁC COMPONENT TRANG TRÍ (DOODLES) ---

const DoodleUnderline = () => (
  <svg width="200" height="15" viewBox="0 0 200 15" fill="none" className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[120%] h-4 z-[-1]">
    <path d="M2 10C50 15 150 15 198 5" stroke="#FDE047" strokeWidth="12" strokeLinecap="round" strokeOpacity="0.8" />
  </svg>
);

const DecorativeShape = ({ className, delay }: { className: string, delay: number }) => (
  <motion.div
    className={`absolute pointer-events-none opacity-60 ${className}`}
    animate={{ 
      y: [0, -10, 0],
      rotate: [0, 5, -5, 0]
    }}
    transition={{ 
      duration: 5, 
      delay: delay,
      repeat: Infinity, 
      ease: "easeInOut" 
    }}
  >
    {/* Hình vẽ minh họa đơn giản */}
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
      <path d="M20 2 L24 14 L38 14 L26 22 L30 36 L20 28 L10 36 L14 22 L2 14 L16 14 Z" />
    </svg>
  </motion.div>
);

// --- 2. COMPONENT CHÍNH ---

export const LandingUSP = () => {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const categories = [
    { name: "Gương Sáng", icon: Sparkles, color: "bg-yellow-100", accent: "text-yellow-600" },
    { name: "Kỹ Năng Số", icon: Monitor, color: "bg-blue-100", accent: "text-blue-600" },
    { name: "Sống Đẹp", icon: Heart, color: "bg-pink-100", accent: "text-pink-600" },
    { name: "Pháp Luật", icon: Scale, color: "bg-purple-100", accent: "text-purple-600" },
    { name: "Khởi Nghiệp", icon: Rocket, color: "bg-orange-100", accent: "text-orange-600" },
    { name: "Văn Hóa", icon: Landmark, color: "bg-green-100", accent: "text-green-600" },
    { name: "Biển Đảo", icon: Waves, color: "bg-cyan-100", accent: "text-cyan-600" },
    { name: "Tình Nguyện", icon: Flame, color: "bg-red-100", accent: "text-red-600" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, rotate: 5 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { type: "spring" as const, bounce: 0.4, duration: 0.8 },
    },
  };

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden font-sans bg-[#fff9f0] border-b-4 border-black">
      
      {/* Background Texture (Chấm bi) */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "20px 20px" }}
      />

      {/* Decorative Floating Elements */}
      <DecorativeShape className="top-10 left-10 text-blue-400" delay={0} />
      <DecorativeShape className="bottom-20 right-10 text-pink-400" delay={2} />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- HEADER SECTION --- */}
        <motion.div
          className="mb-16 text-center space-y-4 relative z-10"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
          animate={isInView && !shouldReduceMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block relative">
             <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 relative z-10">
               Khám phá <span className="text-blue-600">Chuyên mục</span>
             </h2>
             <DoodleUnderline />
             {/* Sticker trang trí */}
             <motion.div 
               className="absolute -top-6 -right-8 hidden md:block"
               animate={{ rotate: [0, 10, 0] }}
               transition={{ duration: 3, repeat: Infinity }}
             >
                <Zap size={32} className="fill-yellow-400 text-black drop-shadow-sm" />
             </motion.div>
          </div>
          
          <p className="text-slate-600 text-lg md:text-xl font-bold max-w-2xl mx-auto font-handwriting">
             Nền tảng kiến thức toàn diện, khơi nguồn cảm hứng cho thế hệ trẻ.
          </p>
        </motion.div>

        {/* --- GRID CARDS --- */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8"
          variants={shouldReduceMotion ? undefined : containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={idx}
                variants={shouldReduceMotion ? undefined : itemVariants}
                className="group relative h-full"
              >
                {/* Layer bóng đen cứng phía sau (để tạo hiệu ứng 3D khi hover) */}
                <div className="absolute inset-0 bg-black rounded-xl translate-x-2 translate-y-2 transition-transform duration-200 group-hover:translate-x-3 group-hover:translate-y-3" />

                {/* Main Card Content */}
                <motion.div
                  className={`
                    relative h-full flex flex-col items-center justify-center p-6 rounded-xl border-2 border-black bg-white
                    transition-transform duration-200 cursor-pointer
                    group-hover:-translate-y-1 group-hover:-translate-x-1
                  `}
                  whileTap={{ scale: 0.95, x: 0, y: 0 }}
                >
                    {/* Icon Container */}
                    <div className={`mb-4 p-4 rounded-full border-2 border-black ${cat.color} shadow-[2px_2px_0px_black] group-hover:scale-110 transition-transform duration-300`}>
                      <Icon
                        size={32}
                        strokeWidth={2}
                        className={`${cat.accent}`}
                      />
                    </div>
                  
                    {/* Text Content */}
                    <span className="font-black text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                      {cat.name}
                    </span>
                    
                    {/* Arrow Icon xuất hiện khi hover */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ArrowUpRight size={20} className="text-slate-400" />
                    </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
        
      </div>
    </section>
  );
};