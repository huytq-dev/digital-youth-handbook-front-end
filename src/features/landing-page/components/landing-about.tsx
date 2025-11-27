import {
  Users,
  Lightbulb,
  Heart,
  Rocket,
  ShieldCheck,
  Zap,
  Code,
  PenTool,
} from "lucide-react";
import { Card, CardContent, Badge, Button } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";
import { AnimatedText } from "@/components/animated-text";

// Dữ liệu Giá trị cốt lõi (Sứ mệnh & Tầm nhìn)
const CORE_VALUES = [
  {
    title: "Tâm Trong",
    description: "Giữ vững đạo đức, sự tử tế và lòng trung thực trong từng dòng tin.",
    icon: Heart,
    color: "bg-red-100 text-red-600",
  },
  {
    title: "Trí Sáng",
    description: "Không ngừng học hỏi, đổi mới tư duy và làm chủ công nghệ.",
    icon: Lightbulb,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Hoài Bão Lớn",
    description: "Khát vọng cống hiến và kiến tạo những giá trị bền vững cho cộng đồng.",
    icon: Rocket,
    color: "bg-blue-100 text-blue-600",
  },
];

// Dữ liệu Sơ đồ tổ chức
const DEPARTMENTS = [
  {
    name: "Ban Nội Dung",
    role: "Sáng tạo & Biên tập",
    icon: PenTool,
    border: "border-orange-200",
    bg: "bg-orange-50",
    text: "text-orange-700",
  },
  {
    name: "Ban Công Nghệ",
    role: "Phát triển & Bảo mật",
    icon: Code,
    border: "border-blue-200",
    bg: "bg-blue-50",
    text: "text-blue-700",
  },
  {
    name: "Ban Đối Ngoại",
    role: "Kết nối & Cộng đồng",
    icon: Users,
    border: "border-green-200",
    bg: "bg-green-50",
    text: "text-green-700",
  },
];

export const LandingAbout = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-white">
      {/* Background Decor (Blob mờ phía sau) */}
      <div className="absolute top-1/4 -left-24 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-orange-50 rounded-full blur-3xl opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- PHẦN 1: GIỚI THIỆU & SỨ MỆNH --- */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Badge variant="outline" className="mb-4 text-[hsl(var(--primary))] border-[hsl(var(--primary))] bg-blue-50">
            <AnimatedText>VỀ CHÚNG TÔI</AnimatedText>
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-black mb-6 leading-tight">
            <AnimatedText animationType="slideUp">
              Khát Vọng Tiên Phong <br />
              <span className="text-[hsl(var(--primary))]">Lan Tỏa Giá Trị Việt</span>
            </AnimatedText>
          </h2>
          <p className="text-lg text-[hsl(var(--muted-foreground))] leading-relaxed">
            <AnimatedText>Tuổi Trẻ Online không chỉ là trang tin tức, mà là ngôi nhà chung của Gen Z - nơi kết nối những trái tim nhiệt huyết, chia sẻ tri thức và cùng nhau kiến tạo tương lai.</AnimatedText>
          </p>
        </div>

        {/* 3 Thẻ Giá Trị Cốt Lõi (Tâm - Trí - Hoài Bão) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {CORE_VALUES.map((val, idx) => (
            <Card key={idx} className="border-none shadow-lg hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden group">
              <div className={cn("absolute top-0 left-0 w-full h-1", val.color.split(" ")[0].replace("bg-", "bg-opacity-100 bg-"))} />
              <CardContent className="p-8 flex flex-col items-center text-center h-full">
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition-transform", val.color)}>
                  <val.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  <AnimatedText>{val.title}</AnimatedText>
                </h3>
                <p className="text-[hsl(var(--muted-foreground))]">
                  <AnimatedText>{val.description}</AnimatedText>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* --- PHẦN 2: INFOGRAPHIC SƠ ĐỒ TỔ CHỨC --- */}
        <div className="flex flex-col items-center">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">
              <AnimatedText>Bộ Máy Vận Hành</AnimatedText>
            </h3>
            <p className="text-[hsl(var(--muted-foreground))]">
              <AnimatedText>Cấu trúc tinh gọn, linh hoạt và chuyên nghiệp</AnimatedText>
            </p>
          </div>

          {/* Sơ đồ cây (Tree Diagram) */}
          <div className="w-full max-w-4xl relative">
            
            {/* LEVEL 1: BAN BIÊN TẬP (ROOT) */}
            <div className="flex justify-center mb-12 relative z-20">
              <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-[hsl(var(--primary))] flex flex-col items-center w-64 text-center relative">
                <div className="bg-[hsl(var(--primary))] text-white p-3 rounded-xl mb-3 shadow-lg shadow-blue-500/30">
                  <ShieldCheck size={28} />
                </div>
                <h4 className="font-bold text-xl text-[hsl(var(--foreground))]">
                  <AnimatedText>Ban Biên Tập</AnimatedText>
                </h4>
                <p className="text-xs font-semibold text-[hsl(var(--primary))] uppercase tracking-wide mt-1">
                  <AnimatedText>Định hướng chiến lược</AnimatedText>
                </p>
                
                {/* Connector Point Bottom */}
                <div className="absolute -bottom-12 left-1/2 w-0.5 h-12 bg-gray-300"></div>
              </div>
            </div>

            {/* LEVEL 2: CÁC BAN CHUYÊN MÔN */}
            <div className="relative">
              {/* Horizontal Connector Line */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-[80%] md:w-[70%] h-8 border-t-2 border-l-2 border-r-2 border-gray-300 rounded-t-3xl pointer-events-none" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 pt-4">
                {DEPARTMENTS.map((dept, idx) => (
                  <div key={idx} className="flex flex-col items-center group">
                    {/* Connector Point Top (Mobile hidden, Desktop visible) */}
                    <div className="h-4 w-0.5 bg-gray-300 mb-2 md:block hidden"></div>

                    <div className={cn("bg-white p-6 rounded-2xl shadow-md border hover:shadow-xl transition-all w-full text-center group-hover:-translate-y-1", dept.border)}>
                      <div className={cn("w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3", dept.bg, dept.text)}>
                        <dept.icon size={20} />
                      </div>
                      <h5 className="font-bold text-lg">
                        <AnimatedText>{dept.name}</AnimatedText>
                      </h5>
                      <p className="text-sm text-[hsl(var(--muted-foreground))]">
                        <AnimatedText>{dept.role}</AnimatedText>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
          
          {/* CTA Button */}
          <div className="mt-16">
            <Button size="lg" className="rounded-full px-8 gap-2 shadow-lg shadow-blue-500/20 animate-bounce">
              <Zap size={18} fill="currentColor" /> <AnimatedText>Gia nhập đội ngũ ngay</AnimatedText>
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
};