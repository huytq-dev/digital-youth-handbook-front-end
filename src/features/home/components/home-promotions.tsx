import { Heart, MessageCircle, ArrowRight, Bookmark } from "lucide-react";
import { Card, CardContent, CardHeader, Badge, Button } from "@/components/ui/primitives";
import { AnimatedText } from "@/components/animated-text";

const SAMPLE_ITEMS = [
  {
    id: 1,
    title: "Lộ trình tự học Frontend trong 6 tháng cho sinh viên",
    category: "Lập trình",
    author: "Digital Youth Team",
    time: "15 phút đọc",
    imageUrl: "https://picsum.photos/600/400?random=71",
  },
  {
    id: 2,
    title: "Checklist kỹ năng mềm cần có trước khi ra trường",
    category: "Kỹ năng mềm",
    author: "Digital Youth Team",
    time: "10 phút đọc",
    imageUrl: "https://picsum.photos/600/400?random=72",
  },
  {
    id: 3,
    title: "Bí kíp học tiếng Anh đều đặn mỗi ngày mà không chán",
    category: "Ngoại ngữ",
    author: "Digital Youth Team",
    time: "12 phút đọc",
    imageUrl: "https://picsum.photos/600/400?random=73",
  },
];

export const HomePromotions = () => {
  return (
    <section
      id="career"
      className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8"
    >
      <div className="mb-10 text-center">
        <Badge variant="accent" className="mb-3">
          <AnimatedText>GỢI Ý NỔI BẬT</AnimatedText>
        </Badge>
        <h2 className="text-3xl font-black tracking-tight lg:text-4xl">
          <AnimatedText animationType="slideUp">
            Bắt đầu từ những chủ đề được nhiều bạn quan tâm
          </AnimatedText>
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 grid grid-cols-1 gap-6 md:grid-cols-2">
          {SAMPLE_ITEMS.map((item) => (
            <Card
              key={item.id}
              className="group flex h-full flex-col overflow-hidden transition-all duration-300 hover:border-[hsl(var(--primary))/30]"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute left-4 top-4">
                  <Badge className="bg-white/90 text-[hsl(var(--primary))] shadow-sm backdrop-blur hover:bg-white">
                    <AnimatedText>{item.category}</AnimatedText>
                  </Badge>
                </div>
                <button className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white shadow-lg backdrop-blur hover:bg-black/65">
                  <Bookmark size={16} />
                </button>
              </div>
              <CardContent className="flex flex-1 flex-col pt-5">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(var(--muted-foreground))]">
                  <AnimatedText>{item.time}</AnimatedText>
                </p>
                <h3 className="mb-3 line-clamp-2 text-lg font-bold leading-snug transition-colors group-hover:text-[hsl(var(--primary))]">
                  <AnimatedText>{item.title}</AnimatedText>
                </h3>
                <p className="mb-4 text-xs font-medium text-[hsl(var(--muted-foreground))]">
                  <AnimatedText>Tác giả: {item.author}</AnimatedText>
                </p>
                <div className="mt-auto flex items-center justify-between border-t border-dashed border-[hsl(var(--border))] pt-3">
                  <div className="flex gap-3 text-xs font-semibold text-[hsl(var(--muted-foreground))]">
                    <span className="flex items-center gap-1 hover:text-red-500">
                      <Heart size={14} /> <AnimatedText>Yêu thích</AnimatedText>
                    </span>
                    <span className="flex items-center gap-1 hover:text-blue-500">
                      <MessageCircle size={14} />{" "}
                      <AnimatedText>Thảo luận</AnimatedText>
                    </span>
                  </div>
                  <button className="inline-flex items-center gap-1 text-xs font-bold text-[hsl(var(--primary))] hover:translate-x-1">
                    <AnimatedText>Đọc chi tiết</AnimatedText>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <Card className="sticky top-24 border-blue-100 bg-gradient-to-b from-blue-50 to-white shadow-sm">
            <CardHeader>
              <CardContent className="p-0">
                <h3 className="mb-2 text-xl font-bold">
                  <AnimatedText>Thử lộ trình nhanh</AnimatedText>
                </h3>
                <p className="mb-4 text-sm text-[hsl(var(--muted-foreground))]">
                  <AnimatedText>
                    Chọn mục tiêu, nhận gợi ý bước đi đầu tiên chỉ trong 30 giây.
                  </AnimatedText>
                </p>
                <Button className="w-full rounded-xl font-semibold">
                  <AnimatedText>Bắt đầu ngay</AnimatedText>
                </Button>
              </CardContent>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
};


