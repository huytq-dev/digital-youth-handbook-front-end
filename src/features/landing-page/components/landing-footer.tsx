import {
  Star,
  Facebook,
  Youtube,
  Instagram,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { Button, Input } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

export const LandingFooter = () => {
  const FOOTER_LINKS = [
    {
      title: "Về Tòa Soạn",
      items: ["Giới thiệu chung", "Cơ cấu tổ chức", "Tuyển dụng", "Liên hệ"],
    },
    {
      title: "Chuyên Mục Hot",
      items: ["Gương mặt trẻ", "Khởi nghiệp", "Du học", "Kỹ năng số"],
    },
    {
      title: "Hỗ Trợ & Pháp Lý",
      items: ["Điều khoản", "Bảo mật", "Quyền riêng tư", "FAQs"],
    },
  ];

  return (
    // [UPDATE] Padding: Tăng lên pt-16 pb-10 (Trung bình)
    <footer className="relative bg-white pt-16 pb-10 border-t border-[hsl(var(--border))] overflow-hidden font-sans">
      
      {/* --- Decor Background --- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-[hsl(var(--primary))] to-transparent opacity-50" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-orange-50 rounded-full blur-3xl opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Phần 1: Grid Chính --- */}
        {/* [UPDATE] Gap: Tăng lên gap-10 cho thoáng hơn bản nhỏ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
          
          {/* Cột 1: Brand & Liên Hệ */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                {/* [UPDATE] Logo: Size 36px (w-9) cân đối */}
                <div className="bg-[hsl(var(--primary))] w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                  <Star size={18} fill="currentColor" />
                </div>
                <div>
                  <span className="font-extrabold text-xl tracking-tight text-[hsl(var(--foreground))]">
                    TUỔI TRẺ <span className="text-[hsl(var(--primary))]">ONLINE</span>
                  </span>
                  <p className="text-[10px] font-bold text-[hsl(var(--muted-foreground))] tracking-[0.25em] uppercase">
                    Khát Vọng Tiên Phong
                  </p>
                </div>
              </div>
              {/* [UPDATE] Text size: Về lại text-sm cho dễ đọc */}
              <p className="text-[hsl(var(--muted-foreground))] text-sm leading-relaxed">
                Cơ quan chủ quản: Thành Đoàn TP.HCM <br/>
                GP số: 123/GP-BTTTT cấp ngày 01/01/2025.
              </p>
            </div>

            {/* Thông tin liên hệ */}
            <div className="space-y-2.5">
              <div className="flex items-start gap-3 text-sm text-[hsl(var(--muted-foreground))]">
                <MapPin size={16} className="shrink-0 text-[hsl(var(--primary))] mt-0.5" />
                <span>60A Hoàng Văn Thụ, P.9, Q.Phú Nhuận, TP.HCM</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[hsl(var(--muted-foreground))]">
                <Phone size={16} className="shrink-0 text-[hsl(var(--primary))]" />
                <span className="font-medium text-[hsl(var(--foreground))]">(+84) 28 3997 1234</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[hsl(var(--muted-foreground))]">
                <Mail size={16} className="shrink-0 text-[hsl(var(--primary))]" />
                <span className="hover:text-[hsl(var(--primary))] cursor-pointer">toasoan@tuoitre.vn</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-2.5">
              {[Facebook, Youtube, Instagram].map((Icon, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="icon"
                  // [UPDATE] Button size: w-9 h-9 chuẩn UI
                  className="rounded-full w-9 h-9 border-[hsl(var(--border))] hover:border-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-white transition-all"
                >
                  <Icon size={16} />
                </Button>
              ))}
            </div>
          </div>

          {/* Cột 2, 3, 4: Các cột Link */}
          <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-8">
            {FOOTER_LINKS.map((section, idx) => (
              <div key={idx} className={cn(idx === 1 ? "hidden md:block" : "")}> 
                {/* [UPDATE] Header: text-base (16px) */}
                <h4 className="font-bold text-[hsl(var(--foreground))] mb-4 text-base">
                  {section.title}
                </h4>
                {/* [UPDATE] Spacing: space-y-3 để dễ click */}
                <ul className="space-y-3">
                  {section.items.map((item) => (
                    <li key={item}>
                      {/* [UPDATE] Link: text-sm (14px) */}
                      <a
                        href="#"
                        className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] hover:translate-x-1 transition-all inline-block"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Cột 5: Newsletter */}
          <div className="lg:col-span-3 space-y-6">
            {/* Newsletter Box */}
            <div className="bg-[hsl(var(--secondary))]/50 p-5 rounded-2xl border border-[hsl(var(--border))]">
              <h4 className="font-bold text-[hsl(var(--foreground))] mb-2 text-sm flex items-center gap-2">
                <Mail size={16} className="text-[hsl(var(--primary))]" /> Đăng ký nhận tin
              </h4>
              <p className="text-xs text-[hsl(var(--muted-foreground))] mb-3">
                Nhận tin tức mới nhất mỗi sáng thứ 2.
              </p>
              {/* [UPDATE] Input height: h-9 */}
              <div className="flex w-full items-center space-x-1 bg-white p-1 rounded-lg border border-[hsl(var(--input))] focus-within:border-[hsl(var(--primary))] transition-all">
                <Input
                  type="email"
                  placeholder="Email..."
                  className="border-none bg-transparent h-9 text-sm focus-visible:ring-0 px-2 w-full"
                />
                <Button size="sm" className="h-9 w-9 p-0 rounded-md shrink-0">
                  <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* --- Phần 2: Bottom Bar --- */}
        <div className="border-t border-[hsl(var(--border))] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div>
             <p className="text-sm text-[hsl(var(--foreground))] font-semibold">
               © 2025 Cổng Thông Tin Tuổi Trẻ Online.
             </p>
             <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
               Giữ toàn quyền bản quyền.
             </p>
          </div>
          
          <div className="flex items-center gap-4">
             {/* [UPDATE] Badge size: Lớn hơn xíu cho rõ chữ */}
             <div className="h-7 w-20 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-[10px] text-gray-500 font-bold">
               DMCA
             </div>
             <div className="h-7 w-20 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-[10px] text-gray-500 font-bold">
               BCT
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
};