import {
  Star,
  Facebook,
  Youtube,
  Instagram,
  ArrowRight,
} from "lucide-react";
import { Button, Input } from "@/components/ui/primitives";

export const LandingFooter = () => (
  <footer className="relative bg-white pt-24 pb-12 border-t border-[hsl(var(--border))] overflow-hidden">
    {/* Decor Background (Làm nền nhẹ cho sinh động) */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-[hsl(var(--primary))] to-transparent opacity-50" />
    <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-orange-50 rounded-full blur-3xl opacity-50 pointer-events-none" />

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
        {/* Cột 1: Brand & Slogan (Chiếm 5 phần) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-3">
            <div className="bg-[hsl(var(--primary))] w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 rotate-3">
              <Star size={20} fill="currentColor" />
            </div>
            <div>
              <span className="font-extrabold text-2xl tracking-tight text-[hsl(var(--foreground))]">
                TUỔI TRẺ{" "}
                <span className="text-[hsl(var(--primary))]">ONLINE</span>
              </span>
              <p className="text-[10px] font-bold text-[hsl(var(--muted-foreground))] tracking-[0.3em] uppercase">
                Khát Vọng Tiên Phong
              </p>
            </div>
          </div>
          <p className="text-[hsl(var(--muted-foreground))] text-base leading-relaxed max-w-md">
            Không gian số dành cho thế hệ Gen Z - Nơi kết nối lý tưởng, lan tỏa
            giá trị sống đẹp và định hướng tương lai vững vàng.
          </p>
          <div className="flex gap-4">
            {[Facebook, Youtube, Instagram].map((Icon, idx) => (
              <Button
                key={idx}
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-[hsl(var(--primary))] hover:text-white transition-all hover:-translate-y-1"
              >
                <Icon size={20} />
              </Button>
            ))}
          </div>
        </div>

        {/* Cột 2: Links (Chiếm 3 phần) - Gọn gàng hơn */}
        <div className="lg:col-span-3 lg:pl-8">
          <h4 className="font-bold text-[hsl(var(--foreground))] mb-6 text-lg">
            Khám Phá
          </h4>
          <ul className="space-y-4">
            {["Gương Sáng", "Kỹ Năng Số", "Thư Viện", "Phong Trào"].map(
              (item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--border))] group-hover:bg-[hsl(var(--primary))] transition-colors" />
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Cột 3: Newsletter (Chiếm 4 phần) - Điểm nhấn */}
        <div className="lg:col-span-4">
          <div className="bg-[hsl(var(--secondary))]/50 p-6 rounded-3xl border border-[hsl(var(--border))]">
            <h4 className="font-bold text-[hsl(var(--foreground))] mb-2 text-lg">
              Đừng bỏ lỡ tin hay! ⚡
            </h4>
            <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
              Nhận thông báo về các cuộc thi và bài viết mới nhất hàng tuần.
            </p>
            <div className="flex w-full items-center space-x-2 bg-white p-1 rounded-full border border-[hsl(var(--input))] focus-within:ring-2 focus-within:ring-[hsl(var(--ring))] transition-all shadow-sm">
              <Input
                type="email"
                placeholder="Email của bạn..."
                className="border-none bg-transparent h-10 focus-visible:ring-0 px-4"
              />
              <Button
                size="icon"
                className="rounded-full w-10 h-10 shrink-0 shadow-md"
              >
                <ArrowRight size={16} />
              </Button>
            </div>
            <p className="text-xs text-[hsl(var(--muted-foreground))] mt-3 opacity-80">
              *Không spam, chỉ gửi những điều thú vị.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-[hsl(var(--border))] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-[hsl(var(--muted-foreground))] font-medium">
          © 2025 Cổng Thông Tin Tuổi Trẻ.
        </p>
        <div className="flex gap-6 text-sm text-[hsl(var(--muted-foreground))] font-medium">
          <a href="#" className="hover:text-[hsl(var(--foreground))]">
            Điều khoản
          </a>
          <a href="#" className="hover:text-[hsl(var(--foreground))]">
            Bảo mật
          </a>
        </div>
      </div>
    </div>
  </footer>
);
