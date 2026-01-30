import { useState, useEffect } from "react";
import {
  Star, Facebook, Globe,
  MapPin, Phone, Mail, Send, Heart, Cloud,
  TrendingUp
} from "lucide-react";
import { Input } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { scrollToTop } from "@/components/scroll-to-top";
import { Link } from "react-router-dom";

// --- Dữ liệu điều hướng ---
type NavSubItem = { label: string; href?: string; };
type NavItem = { label: string; href?: string; subItems?: NavSubItem[]; };

const NAVIGATION: NavItem[] = [
  { label: "Trang chủ", href: "/" },
  {
    label: "Chủ đề học tập",
    href: "/learning-topics",
    subItems: [
      { label: "Lý tưởng & Hoài bão", href: "/learning-topics/ly-tuong" },
      { label: "Tư tưởng & Đạo đức", href: "/learning-topics/tu-tuong" },
      { label: "Văn hóa & Lối sống", href: "/learning-topics/van-hoa" },
      { label: "Mạng xã hội an toàn", href: "/learning-topics/an-toan-mang" },
      { label: "Phòng ngừa bạo lực & xâm hại", href: "/learning-topics/phong-ngua-bao-luc-xam-hai" },
      { label: "Chuyển đổi số", href: "/learning-topics/chuyen-doi-so" },
    ],
  },
  {
    label: "Tài nguyên",
    subItems: [
      { label: "Ebook & Tài liệu" },
      { label: "Podcast chia sẻ" },
      { label: "Công cụ hỗ trợ" },
      { label: "Template mẫu" },
    ],
  },
  {
    label: "Vinh danh",
    subItems: [
      { label: "Gương mặt tiêu biểu" },
      { label: "Bảng vàng thành tích" },
      { label: "Câu chuyện truyền cảm hứng" },
    ],
  },
  { label: "Thi hay", href: "/thi-hay" },
];

// --- COMPONENTS PHỤ TRỢ ---

const SocialButton = ({ Icon, className, href }: { Icon: any; className?: string; href?: string }) => {
  const Component = href ? motion.a : motion.button;
  const props = href ? { href, target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Component
      whileHover={{ y: -4, boxShadow: "4px 4px 0px 0px black" }}
      whileTap={{ y: 0, boxShadow: "0px 0px 0px 0px black" }}
      className={cn(
        "w-10 h-10 flex items-center justify-center rounded-full border-2 border-black bg-white transition-all duration-200",
        className
      )}
      {...props}
    >
      <Icon size={18} />
    </Component>
  );
};

// --- COMPONENT: VISIT COUNTER (ĐÃ STYLE) ---
const VisitCounter = () => {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotalVisits = async () => {
      try {
        const response = await fetch("https://tuoitreonline.runasp.net/api/webstats/total");
        if (response.ok) {
          const data = await response.json();
          setCount(data);
        }
      } catch (error) {
        console.error("Failed to load visits", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalVisits();
  }, []);

  return (
    <div className="group flex items-center gap-3 p-1.5 pr-5 bg-white border-2 border-black rounded-full shadow-[4px_4px_0px_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-default select-none">

      {/* Icon Circle */}
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 border-2 border-black text-white group-hover:rotate-12 transition-transform duration-300">
        <TrendingUp size={20} strokeWidth={2.5} />
      </div>

      {/* Text Info */}
      <div className="flex flex-col items-start justify-center h-full">
        <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest leading-tight">
          Lượt truy cập
        </span>

        <div className="flex items-baseline gap-1">
          {loading ? (
            // Skeleton loading effect
            <div className="h-5 w-16 bg-slate-200 animate-pulse rounded mt-1" />
          ) : (
            <span className="font-black text-xl text-slate-900 leading-none mt-0.5 tabular-nums tracking-tight">
              {count ? new Intl.NumberFormat('vi-VN').format(count) : "0"}
            </span>
          )}
          {/* Decoration icon */}
          {/* {!loading && <Eye size={12} className="text-slate-400 ml-1 mb-0.5" />} */}
        </div>
      </div>
    </div>
  );
};

const FooterDoodle = () => (
  <div className="absolute top-0 w-full overflow-hidden leading-none rotate-180 -z-0 opacity-10">
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[60px]">
      <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor" className="text-black"></path>
    </svg>
  </div>
);

// --- COMPONENT CHÍNH ---

export const LandingFooter = () => {
  const FOOTER_SECTIONS = NAVIGATION.filter((item) => item.subItems && item.subItems.length > 0);

  return (
    <footer className="relative bg-[#fff9f0] pt-20 pb-10 border-t-4 border-black font-sans overflow-hidden">

      {/* Background Texture & Decor */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "20px 20px" }}
      />
      <FooterDoodle />

      {/* Hình vẽ mây trang trí */}
      <motion.div
        className="absolute top-10 left-10 text-blue-200 pointer-events-none hidden lg:block"
        animate={{ x: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <Cloud size={120} fill="currentColor" stroke="black" strokeWidth={2} className="text-black opacity-30" />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">

        {/* --- Phần 1: Grid Chính --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">

          {/* Cột 1: Brand & Liên Hệ */}
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-4">

              {/* Logo Section */}
              <div
                className="flex items-center gap-3 select-none group cursor-pointer w-fit"
                onClick={scrollToTop}
              >
                <div className="relative">
                  <div className="bg-blue-600 w-12 h-12 rounded-lg border-2 border-black flex items-center justify-center text-white shadow-[4px_4px_0px_black] group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-none transition-all">
                    <Star fill="currentColor" size={24} className="group-hover:rotate-180 transition-transform duration-500" />
                  </div>
                  <div className="absolute -top-1 -right-1 bg-red-500 w-3.5 h-3.5 rounded-full border-2 border-black" />
                </div>

                <div className="flex flex-col">
                  <span className="font-black text-2xl leading-none text-slate-900 tracking-tight">
                    HÀNH TRANG <span className="text-blue-600">SỐ</span>
                  </span>
                  <span className="text-[11px] font-black text-white bg-orange-500 px-1.5 py-0.5 border border-black rounded-sm tracking-widest uppercase mt-1 w-fit rotate-[-2deg] group-hover:rotate-0 transition-transform">
                    Khát Vọng
                  </span>
                </div>
              </div>

              <p className="text-slate-600 text-sm font-medium leading-relaxed border-l-4 border-slate-300 pl-3">
                Đồng hành cùng thanh niên Việt Nam trên hành trình chinh phục tri thức và xây dựng đất nước.
              </p>
            </div>

            {/* Thông tin liên hệ */}
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm text-slate-600 font-medium group">
                <MapPin size={18} className="shrink-0 text-red-500 fill-red-100 group-hover:bounce" />
                <span>Nhóm thực hiện đề tài Hành trang số cho thanh thiếu niên trong thời kì mới.</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 font-medium group">
                <Phone size={18} className="shrink-0 text-green-600 fill-green-100" />
                <span className="font-bold text-slate-900">0934315198, 0933482997, 0359030344</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 font-medium group cursor-pointer">
                <Mail size={18} className="shrink-0 text-blue-500 fill-blue-100" />
                <span className="group-hover:text-blue-600 group-hover:underline decoration-2 underline-offset-2">
                  banbientap@tuoitre.vn
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 font-medium group">
                <a
                  href="http://thanhdoandanang.org.vn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group-hover:text-blue-600 group-hover:underline decoration-2 underline-offset-2 font-bold text-slate-900"
                >
                  thanhdoandanang.org.vn
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3">
              <SocialButton
                Icon={Facebook}
                className="hover:bg-blue-600 hover:text-white"
                href="https://www.facebook.com/doanthanhnienubndtpdanang"
              />
              <SocialButton
                Icon={Globe}
                className="hover:bg-green-600 hover:text-white"
                href="http://thanhdoandanang.org.vn/"
              />
            </div>
          </div>

          {/* Cột 2, 3, 4: Các cột Link */}
          <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-8">
            {FOOTER_SECTIONS.map((section, idx) => (
              <div key={idx} className={cn(idx === 1 ? "hidden md:block" : "")}>
                {section.href ? (
                  <Link to={section.href}>
                    <h4 className="font-black text-slate-900 mb-5 text-sm uppercase tracking-wider border-b-2 border-dashed border-slate-300 pb-2 w-fit hover:text-blue-600 transition-colors">
                      {section.label}
                    </h4>
                  </Link>
                ) : (
                  <h4 className="font-black text-slate-900 mb-5 text-sm uppercase tracking-wider border-b-2 border-dashed border-slate-300 pb-2 w-fit">
                    {section.label}
                  </h4>
                )}
                <ul className="space-y-3">
                  {section.subItems?.map((item) => (
                    <li key={item.label}>
                      <Link
                        to={item.href || "#"}
                        className="text-sm font-bold text-slate-500 hover:text-blue-600 hover:translate-x-1 transition-all inline-block flex items-center gap-1 group"
                      >
                        <span className="w-1.5 h-1.5 bg-slate-300 rounded-full group-hover:bg-blue-600 transition-colors" />
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Cột 5: Newsletter Card */}
          <div className="lg:col-span-3">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-yellow-100 p-6 rounded-xl border-2 border-black shadow-[6px_6px_0px_black] relative"
            >
              {/* Sticker "NEW" */}
              <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-black px-2 py-1 rotate-12 border-2 border-black shadow-sm">
                HOT!
              </div>

              <h4 className="font-black text-slate-900 mb-2 text-lg flex items-center gap-2">
                <Send size={20} className="text-blue-600 rotate-[-10deg]" />
                Bản tin Gen Z
              </h4>
              <p className="text-xs font-bold text-slate-600 mb-4 leading-relaxed">
                Nhận thông tin học bổng, sự kiện và bí kíp sinh tồn hàng tuần. Không spam!
              </p>

              <div className="space-y-3">
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Email của bạn..."
                    className="border-2 border-black bg-white h-10 text-sm focus-visible:ring-0 focus-visible:border-blue-500 focus-visible:shadow-[2px_2px_0px_black] transition-all rounded-lg"
                  />
                </div>
                <button className="w-full h-10 bg-black text-white font-bold rounded-lg border-2 border-black hover:bg-blue-600 hover:border-black active:translate-y-1 transition-all flex items-center justify-center gap-2">
                  Đăng Ký Ngay <Heart size={14} fill="red" className="text-red-500" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* --- Phần 2: Bottom Bar --- */}
        <div className="border-t-2 border-black pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">

          {/* Copyright Text */}
          <div className="order-2 md:order-1">
            <p className="text-sm font-black text-slate-800">
              © 2025 Cổng Thông Tin Hành Trang Số.
            </p>
            <p className="text-xs font-bold text-slate-500 mt-1">
              Vì sự phát triển của thế hệ trẻ Việt Nam. 🇻🇳
            </p>
          </div>
          {/* Visit Counter Component */}
          <div className="order-1 md:order-2">
            <VisitCounter />
          </div>

        </div>
      </div>
    </footer>
  );
};