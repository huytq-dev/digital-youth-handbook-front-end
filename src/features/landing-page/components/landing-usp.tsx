import { cn } from "@/lib/utils";
import {
  Sparkles,
  Monitor,
  Heart,
  Scale,
  Rocket,
  Landmark,
  Waves,
  Flame,
} from "lucide-react";

export const LandingUSP = () => {
  const categories = [
    { name: "Gương Sáng", icon: Sparkles },
    { name: "Kỹ Năng Số", icon: Monitor },
    { name: "Sống Đẹp", icon: Heart },
    { name: "Pháp Luật", icon: Scale },
    { name: "Khởi Nghiệp", icon: Rocket },
    { name: "Văn Hóa", icon: Landmark },
    { name: "Biển Đảo", icon: Waves },
    { name: "Tình Nguyện", icon: Flame },
  ];

  return (
    <section className="relative py-24 overflow-hidden font-sans">
      <div className="absolute top-0 -left-40 w-96 h-96 bg-blue-100 rounded-full blur-[100px] opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 -right-40 w-96 h-96 bg-purple-100 rounded-full blur-[100px] opacity-60 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-16 text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[hsl(var(--foreground))]">
            Khám phá <span className="text-[hsl(var(--primary))]">Chuyên mục</span>
          </h2>
          <p className="text-[hsl(var(--muted-foreground))] text-lg md:text-xl font-medium max-w-3xl mx-auto">
            Nền tảng kiến thức toàn diện, khơi nguồn cảm hứng cho thế hệ trẻ.
          </p>
        </div>

        {/* Grid Glass Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className={cn(
                  "group relative flex flex-col items-center justify-center p-6 rounded-2xl transition-all duration-500",
                  "bg-white/40 backdrop-blur-md", 
                  "border border-white/50", 
                  "shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]", 
                  "hover:-translate-y-1 hover:bg-white/60 cursor-pointer" 
                )}
              >
                <div className="mb-4 p-3 rounded-full bg-white/50 shadow-inner group-hover:scale-110 transition-transform duration-300">
                  <Icon
                    size={28}
                    strokeWidth={1.5}
                    className="text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--primary))] transition-colors duration-300"
                  />
                </div>
                
                <span className="font-semibold text-base text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))] transition-colors">
                  {cat.name}
                </span>

                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};