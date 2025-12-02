import { useRef } from "react";
import { Play, Sparkles, Star, ArrowRight } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";

// --- 1. CÁC SVG VẼ TAY (GIỮ NGUYÊN) ---

const DoodleUnderline = () => (
  <svg
    width="200"
    height="20"
    viewBox="0 0 200 20"
    fill="none"
    className="absolute -bottom-2 left-0 w-full h-4 z-[-1]"
  >
    <path
      d="M2 10C50 15 150 15 198 5"
      stroke="#FDE047"
      strokeWidth="12"
      strokeLinecap="round"
      strokeOpacity="0.6"
    />
  </svg>
);

const DoodleArrow = () => (
  <svg
    width="50"
    height="30"
    viewBox="0 0 50 30"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    className="text-black rotate-12"
  >
    <path d="M2 15 C 15 5, 30 25, 48 15" markerEnd="url(#arrow-intro)" />
    <defs>
      <marker
        id="arrow-intro"
        markerWidth="8"
        markerHeight="6"
        refX="7"
        refY="3"
        orient="auto"
      >
        <polygon points="0 0, 8 3, 0 6" fill="currentColor" />
      </marker>
    </defs>
  </svg>
);

// --- 2. COMPONENT CHÍNH ---

export const LandingIntroduction = () => {
  const shouldReduceMotion = useReducedMotion();
  const videoRef = useRef(null);
  const contentRef = useRef(null);
  const isVideoInView = useInView(videoRef, { once: true, margin: "-100px" });
  const isContentInView = useInView(contentRef, {
    once: true,
    margin: "-100px",
  });

  return (
    <section className="relative py-20 overflow-hidden font-sans bg-[#fff9f0] border-b-4 border-black">
      {/* Background Texture (Chấm bi) */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* --- CỘT TRÁI: VIDEO FRAME --- */}
          <motion.div
            ref={videoRef}
            className="relative group order-last lg:order-first"
            initial={
              shouldReduceMotion ? {} : { opacity: 0, x: -50, rotate: -2 }
            }
            animate={
              isVideoInView && !shouldReduceMotion
                ? { opacity: 1, x: 0, rotate: 0 }
                : {}
            }
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Họa tiết trang trí xung quanh Video */}
            <div className="absolute -top-8 -left-8 text-blue-500 animate-bounce hidden md:block">
              <Star
                size={40}
                fill="currentColor"
                stroke="black"
                strokeWidth={2}
              />
            </div>

            {/* KHUNG VIDEO STYLE RETRO/CARD */}
            <div className="relative">
              {/* Bóng cứng màu đen */}
              <div className="absolute top-2 left-2 w-full h-full bg-black rounded-xl z-0" />

              {/* Frame chính */}
              <div className="relative bg-white border-2 border-black rounded-xl overflow-hidden z-10 transition-transform duration-300 hover:-translate-y-1 hover:-translate-x-1">
                {/* Thanh tiêu đề giả lập cửa sổ trình duyệt */}
                <div className="h-8 border-b-2 border-black bg-blue-100 flex items-center px-3 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 border border-black" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400 border border-black" />
                  <div className="w-3 h-3 rounded-full bg-green-500 border border-black" />
                  <div className="ml-auto font-mono text-xs font-bold text-black/70">
                    intro_video.mp4
                  </div>
                </div>

                {/* Vùng chứa ảnh/video */}
                <div className="relative aspect-video group cursor-pointer bg-slate-100">
                  <img
                    src="https://picsum.photos/800/450?random=20"
                    alt="AI Video Thumbnail"
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />

                  {/* Nút Play phong cách Sticker */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="w-20 h-20 bg-red-500 rounded-full border-2 border-black flex items-center justify-center shadow-[4px_4px_0px_black]"
                      whileHover={{
                        scale: 1.1,
                        rotate: 10,
                        boxShadow: "2px 2px 0px black",
                        translate: "2px 2px",
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Play
                        size={32}
                        fill="white"
                        className="text-white ml-1"
                      />
                    </motion.div>
                  </div>

                  {/* [CẬP NHẬT] Badge "AI Powered" - Góc trái dưới, thẳng hàng + Animation lắc lư nhẹ */}
                  <motion.div
                    className="absolute bottom-3 left-3"
                    animate={{ rotate: [-2, 2, -2] }} // Lắc lư nhẹ quanh trục 0 để giữ cảm giác thẳng
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="bg-yellow-300 text-black font-black text-sm px-3 py-1 border-2 border-black shadow-[3px_3px_0px_black]">
                      AI POWERED ⚡
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Mũi tên chỉ dẫn vẽ tay */}
            <div className="absolute -bottom-8 right-10 hidden lg:block">
              <DoodleArrow />
              <span className="font-handwriting text-sm font-bold ml-2">
                Xem thử đi!
              </span>
            </div>
          </motion.div>

          {/* --- CỘT PHẢI: NỘI DUNG --- */}
          <motion.div
            ref={contentRef}
            className="space-y-8 relative"
            initial={shouldReduceMotion ? {} : { opacity: 0, x: 50 }}
            animate={
              isContentInView && !shouldReduceMotion ? { opacity: 1, x: 0 } : {}
            }
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Tag nhỏ */}
            <motion.div
              className="inline-block"
              whileHover={{ scale: 1.05, rotate: -2 }}
            >
              <span className="bg-orange-100 text-orange-900 border-2 border-black px-4 py-1.5 text-sm font-bold uppercase tracking-wider shadow-[4px_4px_0px_rgba(0,0,0,0.2)]">
                <Sparkles
                  size={14}
                  className="mr-2 inline-block fill-orange-400"
                />
                Trải nghiệm khác biệt
              </span>
            </motion.div>

            {/* Tiêu đề chính */}
            <h2 className="text-4xl md:text-5xl font-black text-black leading-[1.15]">
              Tiên phong ứng dụng <br className="hidden md:block" />
              <span className="relative inline-block px-2">
                {/* Hiệu ứng gạch chân màu vàng */}
                <DoodleUnderline />
                <span className="relative z-10 text-blue-600">
                  Trí tuệ nhân tạo (AI)
                </span>
              </span>
            </h2>

            {/* Đoạn văn mô tả */}
            <p className="text-slate-800 text-lg md:text-xl font-medium leading-relaxed border-l-4 border-black pl-4">
              Không còn là những bài học khô khan. Chúng tôi biến kiến thức
              thành những thước phim hoạt hình sống động, được cá nhân hóa bởi
              AI, giúp bạn tiếp thu nhanh hơn và ghi nhớ lâu hơn.
            </p>

            {/* Các điểm nổi bật (Bullet points) */}
            <ul className="space-y-3 font-bold text-slate-700">
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-400 border-2 border-black rounded-full flex items-center justify-center text-xs">
                  ✓
                </div>
                Cá nhân hóa lộ trình học
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-pink-400 border-2 border-black rounded-full flex items-center justify-center text-xs">
                  ✓
                </div>
                Tương tác thời gian thực
              </li>
            </ul>

            {/* Nút hành động */}
            <div className="pt-2">
              <button className="relative group px-6 py-3 bg-white text-black font-black text-lg border-2 border-black shadow-[5px_5px_0px_black] hover:shadow-[2px_2px_0px_black] hover:translate-x-[3px] hover:translate-y-[3px] transition-all flex items-center gap-2">
                Xem Demo Công nghệ <ArrowRight size={20} strokeWidth={3} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};