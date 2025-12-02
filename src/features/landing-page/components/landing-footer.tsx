import {
  Star, Facebook, Youtube, Instagram,
  MapPin, Phone, Mail, Send, Heart, Cloud
} from "lucide-react";
import { Input } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { scrollToTop } from "@/components/scroll-to-top";

// --- Dữ liệu điều hướng ---
type NavSubItem = { label: string; href?: string; };
type NavItem = { label: string; href?: string; subItems?: NavSubItem[]; };

const NAVIGATION: NavItem[] = [
  { label: "Trang chủ", href: "/" },
  {
    label: "Chủ đề học tập",
    subItems: [
      { label: "Lập trình & Công nghệ" },
      { label: "Ngoại ngữ & Du học" },
      { label: "Marketing & Kinh doanh" },
      { label: "Thiết kế & Sáng tạo" },
      { label: "Tài chính cá nhân" },
      { label: "Kỹ năng mềm & Lãnh đạo" },
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

const SocialButton = ({ Icon, className }: { Icon: any; className?: string }) => (
  <motion.button
    whileHover={{ y: -4, boxShadow: "4px 4px 0px 0px black" }}
    whileTap={{ y: 0, boxShadow: "0px 0px 0px 0px black" }}
    className={cn(
      "w-10 h-10 flex items-center justify-center rounded-full border-2 border-black bg-white transition-all duration-200",
      className
    )}
  >
    <Icon size={18} />
  </motion.button>
);

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
              
              {/* [UPDATED] Logo Section giống hệt Header */}
              <div 
                className="flex items-center gap-3 select-none group cursor-pointer w-fit"
                onClick={scrollToTop}
              >
                <div className="relative">
                  {/* Logo Box */}
                  <div className="bg-blue-600 w-12 h-12 rounded-lg border-2 border-black flex items-center justify-center text-white shadow-[4px_4px_0px_black] group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-none transition-all">
                    <Star fill="currentColor" size={24} className="group-hover:rotate-180 transition-transform duration-500" />
                  </div>
                  {/* Red Dot Decor */}
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
              {/* End Logo Section */}

              <p className="text-slate-600 text-sm font-medium leading-relaxed border-l-4 border-slate-300 pl-3">
                Đồng hành cùng thanh niên Việt Nam trên hành trình chinh phục tri thức và xây dựng đất nước.
              </p>
            </div>

            {/* Thông tin liên hệ */}
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm text-slate-600 font-medium group">
                <MapPin size={18} className="shrink-0 text-red-500 fill-red-100 group-hover:bounce" />
                <span>Trường THCS Nguyễn Thị Minh Khai, Q.Thanh Khê, Đà Nẵng</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 font-medium group">
                <Phone size={18} className="shrink-0 text-green-600 fill-green-100" />
                <span className="font-bold text-slate-900">(+84) 28 3997 1234</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 font-medium group cursor-pointer">
                <Mail size={18} className="shrink-0 text-blue-500 fill-blue-100" />
                <span className="group-hover:text-blue-600 group-hover:underline decoration-2 underline-offset-2">
                  banbientap@tuoitre.vn
                </span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3">
              <SocialButton Icon={Facebook} className="hover:bg-blue-600 hover:text-white" />
              <SocialButton Icon={Youtube} className="hover:bg-red-600 hover:text-white" />
              <SocialButton Icon={Instagram} className="hover:bg-pink-600 hover:text-white" />
            </div>
          </div>

          {/* Cột 2, 3, 4: Các cột Link */}
          <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-8">
            {FOOTER_SECTIONS.map((section, idx) => (
              <div key={idx} className={cn(idx === 1 ? "hidden md:block" : "")}> 
                <h4 className="font-black text-slate-900 mb-5 text-sm uppercase tracking-wider border-b-2 border-dashed border-slate-300 pb-2 w-fit">
                  {section.label}
                </h4>
                <ul className="space-y-3">
                  {section.subItems?.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href || "#"}
                        className="text-sm font-bold text-slate-500 hover:text-blue-600 hover:translate-x-1 transition-all inline-block flex items-center gap-1 group"
                      >
                        <span className="w-1.5 h-1.5 bg-slate-300 rounded-full group-hover:bg-blue-600 transition-colors" />
                        {item.label}
                      </a>
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
        <div className="border-t-2 border-black pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div>
              <p className="text-sm font-black text-slate-800">
                © 2025 Cổng Thông Tin Hành Trang Số.
              </p>
              <p className="text-xs font-bold text-slate-500 mt-1">
                 Vì sự phát triển của thế hệ trẻ Việt Nam. 🇻🇳
              </p>
          </div>
          
          <div className="flex items-center gap-3">
              {['DMCA', 'BIT'].map((tag) => (
                  <div key={tag} className="px-3 py-1 bg-slate-200 rounded border-2 border-black text-[10px] font-black text-slate-600 hover:bg-white hover:text-black cursor-pointer transition-colors shadow-[2px_2px_0px_rgba(0,0,0,0.1)]">
                    {tag} PROTECTED
                  </div>
              ))}
          </div>
        </div>
      </div>
    </footer>
  );
};