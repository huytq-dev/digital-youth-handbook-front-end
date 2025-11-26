import { Star, Facebook, Youtube, Instagram, Send } from "lucide-react";
import { Button, Input, Badge } from "../../../components/ui/primitives";

export const LandingFooter = () => (
  <footer className="bg-white pt-20 border-t border-[hsl(var(--border))]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Grid Content ... (Giữ nguyên nội dung footer cũ) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="bg-[hsl(var(--primary))] w-8 h-8 rounded-lg flex items-center justify-center text-white">
              <Star size={16} fill="currentColor" />
            </div>
            <span className="font-extrabold text-2xl text-[hsl(var(--foreground))]">
              TUỔI TRẺ
            </span>
          </div>
          <p className="text-[hsl(var(--muted-foreground))] text-sm leading-relaxed font-medium">
            Cổng thông tin giáo dục lý tưởng cách mạng, đạo đức và lối sống văn
            hóa cho thanh thiếu niên.
          </p>
          <div className="flex gap-3 pt-2">
            {[Facebook, Youtube, Instagram].map((Icon, idx) => (
              <Button
                key={idx}
                variant="outline"
                size="icon"
                className="rounded-full hover:bg-[hsl(var(--primary))] hover:text-white hover:border-[hsl(var(--primary))]"
              >
                <Icon size={18} />
              </Button>
            ))}
          </div>
        </div>
        {/* ... Các cột khác ... */}
        <div>
          <h4 className="font-bold text-[hsl(var(--foreground))] mb-6 text-lg">
            Hashtag Hot
          </h4>
          <div className="flex flex-wrap gap-2">
            {[
              "#GenZ",
              "#YeuNuoc",
              "#KhoiNghiep",
              "#SongXanh",
              "#ChuyenDoiSo",
            ].map((tag) => (
              <Badge
                key={tag}
                className="hover:bg-[hsl(var(--primary))] hover:text-white cursor-pointer px-3 py-1"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-bold text-[hsl(var(--foreground))] mb-6 text-lg">
            Đăng Ký Tin
          </h4>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="email"
              placeholder="Email của bạn..."
              className="bg-[hsl(var(--secondary))] border-none"
            />
            <Button size="icon" className="shrink-0">
              <Send size={16} />
            </Button>
          </div>
        </div>
      </div>
      <div className="border-t border-[hsl(var(--border))] py-8 text-center bg-[hsl(var(--secondary))]/30">
        <p className="text-sm text-[hsl(var(--muted-foreground))] font-medium">
          © 2025 Bản quyền thuộc về Ban Biên Tập Cổng Thông Tin Tuổi Trẻ.
        </p>
      </div>
    </div>
  </footer>
);
