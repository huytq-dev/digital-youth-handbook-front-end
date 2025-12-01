import { cn } from "@/lib/utils";
import {
  MonitorSmartphone,
  Languages,
  Briefcase,
  SmilePlus,
  Rocket,
  Globe2,
} from "lucide-react";
import { AnimatedText } from "@/components/animated-text";

const CATEGORIES = [
  { name: "Kỹ năng số", icon: MonitorSmartphone },
  { name: "Ngoại ngữ", icon: Languages },
  { name: "Sự nghiệp", icon: Briefcase },
  { name: "Sức khỏe tinh thần", icon: SmilePlus },
  { name: "Khởi nghiệp", icon: Rocket },
  { name: "Cơ hội quốc tế", icon: Globe2 },
];

export const HomeUSP = () => {
  return (
    <section
      id="digital-skills"
      className="relative overflow-hidden py-20 font-sans"
    >
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-blue-100 opacity-60 blur-[100px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-purple-100 opacity-60 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center space-y-4">
          <h2 className="text-3xl font-extrabold tracking-tight text-[hsl(var(--foreground))] md:text-4xl">
            <AnimatedText animationType="slideUp">
              Tất cả kỹ năng quan trọng{" "}
              <span className="text-[hsl(var(--primary))]">trong một nơi</span>
            </AnimatedText>
          </h2>
          <p className="mx-auto max-w-3xl text-lg font-medium text-[hsl(var(--muted-foreground))] md:text-xl">
            <AnimatedText>
              Không chỉ là lý thuyết. Mỗi chuyên mục đều có gợi ý khóa học, tài
              liệu, bài tập và checklist hành động.
            </AnimatedText>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.name}
                className={cn(
                  "group relative flex flex-col items-center justify-center rounded-2xl p-4 text-center transition-all duration-400",
                  "bg-white/60 backdrop-blur-md",
                  "border border-white/80",
                  "shadow-sm hover:-translate-y-1 hover:bg-white/90 hover:shadow-[0_10px_35px_rgba(15,23,42,0.08)] cursor-pointer"
                )}
              >
                <div className="mb-3 rounded-full bg-blue-50 p-3 shadow-inner transition-transform duration-300 group-hover:scale-110">
                  <Icon
                    size={26}
                    strokeWidth={1.6}
                    className="text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--primary))]"
                  />
                </div>
                <span className="text-sm font-semibold text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))]">
                  <AnimatedText>{cat.name}</AnimatedText>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};


