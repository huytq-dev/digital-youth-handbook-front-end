import { Sparkles, Target, BrainCircuit } from "lucide-react";
import { Badge, Card, CardContent } from "@/components/ui/primitives";
import { AnimatedText } from "@/components/animated-text";

const INTRO_ITEMS = [
  {
    title: "Định hướng rõ ràng",
    description:
      "Nhìn tổng quan hành trình từ THPT, đại học đến đi làm để không bị lạc hướng.",
    icon: Target,
  },
  {
    title: "Tư duy kỹ năng số",
    description:
      "Biết mình cần học gì về công nghệ, ngoại ngữ, kỹ năng mềm trong từng giai đoạn.",
    icon: BrainCircuit,
  },
  {
    title: "Hành động từng bước",
    description:
      "Chuyển mục tiêu lớn thành checklist nhỏ, dễ làm, dễ bám theo mỗi ngày.",
    icon: Sparkles,
  },
];

export const HomeIntroduction = () => {
  return (
    <section className="relative bg-white py-20">
      <div className="pointer-events-none absolute -right-24 top-1/4 h-72 w-72 rounded-full bg-blue-50 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-1/4 h-72 w-72 rounded-full bg-orange-50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <Badge
            variant="outline"
            className="mb-4 border-[hsl(var(--primary))] bg-blue-50 text-[hsl(var(--primary))]"
          >
            <AnimatedText>VÌ SAO CẦN SỔ TAY?</AnimatedText>
          </Badge>
          <h2 className="mb-4 text-3xl font-black leading-tight md:text-4xl">
            <AnimatedText animationType="slideUp">
              Mỗi bạn trẻ cần một{" "}
              <span className="text-[hsl(var(--primary))]">
                bản đồ phát triển
              </span>
            </AnimatedText>
          </h2>
          <p className="text-lg leading-relaxed text-[hsl(var(--muted-foreground))]">
            <AnimatedText>
              Thay vì học theo trào lưu, Digital Youth Handbook giúp bạn nhìn
              thấy bức tranh tổng thể: mình đang ở đâu, cần gì, và nên đi tiếp
              như thế nào.
            </AnimatedText>
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {INTRO_ITEMS.map((item) => (
            <Card
              key={item.title}
              className="group h-full border-none shadow-lg transition-transform duration-300 hover:-translate-y-2"
            >
              <CardContent className="flex h-full flex-col space-y-4 p-7">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white">
                  <item.icon size={24} />
                </div>
                <h3 className="text-xl font-bold">
                  <AnimatedText>{item.title}</AnimatedText>
                </h3>
                <p className="flex-1 text-sm text-[hsl(var(--muted-foreground))]">
                  <AnimatedText>{item.description}</AnimatedText>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};


