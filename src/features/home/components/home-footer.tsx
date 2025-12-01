import { Star, Facebook, Youtube, Instagram } from "lucide-react";
import { Button } from "@/components/ui/primitives";
import { AnimatedText } from "@/components/animated-text";

export const HomeFooter = () => {
  return (
    <footer className="relative overflow-hidden border-t border-[hsl(var(--border))] bg-white pb-8 pt-10 font-sans">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-50 opacity-40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-orange-50 opacity-40 blur-3xl" />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[hsl(var(--primary))] text-white shadow-md shadow-blue-500/30">
            <Star size={18} fill="currentColor" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">
              <AnimatedText>Digital Youth Handbook</AnimatedText>
            </p>
            <p className="text-sm font-bold text-[hsl(var(--foreground))]">
              <AnimatedText>
                Đồng hành cùng bạn trên hành trình trưởng thành.
              </AnimatedText>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {[Facebook, Youtube, Instagram].map((Icon, idx) => (
            <Button
              key={idx}
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-full border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-white"
            >
              <Icon size={16} />
            </Button>
          ))}
        </div>
      </div>

      <div className="relative mx-auto mt-6 max-w-7xl px-4 text-xs text-[hsl(var(--muted-foreground))] sm:px-6 lg:px-8">
        <p>
          <AnimatedText>
            © 2025 Digital Youth Handbook. Dự án định hướng và hỗ trợ kỹ năng
            cho thanh niên Việt Nam.
          </AnimatedText>
        </p>
      </div>
    </footer>
  );
};


