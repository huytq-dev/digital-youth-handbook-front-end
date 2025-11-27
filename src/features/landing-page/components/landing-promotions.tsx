import { Zap, Heart, MessageCircle, ArrowRight, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  Badge,
  Button,
} from "@/components/ui/primitives";
import { ARTICLES } from "@/data/landing-promotion-data";
import { AnimatedText } from "@/components/animated-text";

// Component hiển thị thẻ bài viết
const ArticleCard = ({ article }: { article: (typeof ARTICLES)[0] }) => (
  <Card className="overflow-hidden group hover:border-[hsl(var(--primary))/30] h-full flex flex-col transition-all duration-300">
    <div className="relative h-60 overflow-hidden">
      <img
        src={article.imageUrl}
        alt={article.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute top-4 left-4">
        <Badge className="bg-white/90 text-[hsl(var(--primary))] backdrop-blur shadow-sm hover:bg-white">
          <AnimatedText>{article.category}</AnimatedText>
        </Badge>
      </div>
      {article.isHot && (
        <div className="absolute top-4 right-4 animate-pulse">
          <Badge variant="destructive" className="gap-1 shadow-lg">
            <Zap size={12} fill="currentColor" />{" "}
            <AnimatedText>HOT</AnimatedText>
          </Badge>
        </div>
      )}
    </div>
    <CardContent className="flex flex-col flex-1 pt-6">
      <div className="flex items-center gap-2 text-xs font-semibold text-[hsl(var(--muted-foreground))] mb-3">
        <span className="text-[hsl(var(--accent))] flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-md">
          <Users size={12} /> <AnimatedText>{article.author}</AnimatedText>
        </span>
        <span>•</span>
        <span>
          <AnimatedText>{article.date}</AnimatedText>
        </span>
      </div>
      <h3 className="text-xl font-bold leading-tight mb-3 group-hover:text-[hsl(var(--primary))] transition-colors line-clamp-2">
        <AnimatedText>{article.title}</AnimatedText>
      </h3>
      <p className="text-sm text-[hsl(var(--muted-foreground))] line-clamp-3 mb-6 flex-1">
        <AnimatedText>{article.description}</AnimatedText>
      </p>
      <div className="flex items-center justify-between pt-4 border-t border-dashed border-[hsl(var(--border))] mt-auto">
        <div className="flex gap-4 text-[hsl(var(--muted-foreground))] text-xs font-bold">
          <span className="flex items-center gap-1 group/icon hover:text-red-500 transition-colors cursor-pointer">
            <Heart size={14} /> <AnimatedText>{article.likes}</AnimatedText>
          </span>
          <span className="flex items-center gap-1 group/icon hover:text-blue-500 transition-colors cursor-pointer">
            <MessageCircle size={14} />{" "}
            <AnimatedText>{article.comments}</AnimatedText>
          </span>
        </div>
        <Button
          variant="link"
          className="p-0 h-auto gap-1 text-xs font-bold group-hover:translate-x-1 transition-transform"
        >
          <AnimatedText>Đọc tiếp</AnimatedText> <ArrowRight size={14} />
        </Button>
      </div>
    </CardContent>
  </Card>
);

export const LandingPromotions = () => {
  return (
    <section className="pt-12 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <Badge variant="accent" className="mb-3">
          <AnimatedText>CẬP NHẬT 24/7</AnimatedText>
        </Badge>
        <h2 className="text-3xl lg:text-5xl font-black tracking-tight">
          <AnimatedText animationType="slideUp">Tiêu Điểm Nổi Bật</AnimatedText>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Articles */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
          {ARTICLES.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        {/* Sidebar News */}
        <div className="space-y-8">
          <Card className="bg-gradient-to-b from-blue-50 to-white border-blue-100 shadow-sm sticky top-24">
            <CardHeader>
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-[hsl(var(--accent))] p-2 rounded-lg text-white">
                    <Zap size={20} fill="currentColor" />
                  </div>
                  <h3 className="font-bold text-xl">
                    <AnimatedText>Tin Mới Nhất</AnimatedText>
                  </h3>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3].map((_, i) => (
                    <div
                      key={i}
                      className="group flex gap-4 p-2 rounded-xl hover:bg-white hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className="w-16 h-16 rounded-lg bg-gray-200 overflow-hidden shrink-0">
                        <img
                          src={`https://picsum.photos/100/100?random=${i + 10}`}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm line-clamp-2 mb-1 group-hover:text-[hsl(var(--primary))] transition-colors">
                          <AnimatedText>
                            Hội nghị tuyên dương thanh niên tiên tiến làm theo
                            lời Bác
                          </AnimatedText>
                        </h4>
                        <span className="text-xs text-[hsl(var(--muted-foreground))]">
                          <AnimatedText>2 giờ trước</AnimatedText>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </CardHeader>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full border-[hsl(var(--primary))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-white"
              >
                <AnimatedText>Xem Tất Cả</AnimatedText>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};
