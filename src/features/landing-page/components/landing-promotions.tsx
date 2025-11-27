import { useMemo } from "react";
// 1. Tối ưu Import Icons
import {
  Zap,
  Heart,
  MessageCircle,
  ArrowRight,
  Users,
} from "lucide-react";
// 2. Tối ưu Import UI Components
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  Badge,
  Button,
} from "@/components/ui/primitives";
// 3. Import Typography Component
import { TypographyBlockquote } from "@/components/ui/typography";
// 4. Import Data từ Mock Data
import { ARTICLES, QUOTES } from "@/data/mock-data";

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
          {article.category}
        </Badge>
      </div>
      {article.isHot && (
        <div className="absolute top-4 right-4 animate-pulse">
          <Badge variant="destructive" className="gap-1 shadow-lg">
            <Zap size={12} fill="currentColor" /> HOT
          </Badge>
        </div>
      )}
    </div>
    <CardContent className="flex flex-col flex-1 pt-6">
      <div className="flex items-center gap-2 text-xs font-semibold text-[hsl(var(--muted-foreground))] mb-3">
        <span className="text-[hsl(var(--accent))] flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-md">
          <Users size={12} /> {article.author}
        </span>
        <span>•</span>
        <span>{article.date}</span>
      </div>
      <h3 className="text-xl font-bold leading-tight mb-3 group-hover:text-[hsl(var(--primary))] transition-colors line-clamp-2">
        {article.title}
      </h3>
      <p className="text-sm text-[hsl(var(--muted-foreground))] line-clamp-3 mb-6 flex-1">
        {article.description}
      </p>
      <div className="flex items-center justify-between pt-4 border-t border-dashed border-[hsl(var(--border))] mt-auto">
        <div className="flex gap-4 text-[hsl(var(--muted-foreground))] text-xs font-bold">
          <span className="flex items-center gap-1 group/icon hover:text-red-500 transition-colors cursor-pointer">
            <Heart size={14} /> {article.likes}
          </span>
          <span className="flex items-center gap-1 group/icon hover:text-blue-500 transition-colors cursor-pointer">
            <MessageCircle size={14} /> {article.comments}
          </span>
        </div>
        <Button
          variant="link"
          className="p-0 h-auto gap-1 text-xs font-bold group-hover:translate-x-1 transition-transform"
        >
          Đọc tiếp <ArrowRight size={14} />
        </Button>
      </div>
    </CardContent>
  </Card>
);

// Component Quote (Tự động thay đổi theo ngày)
const QuoteSection = () => {
  // Logic: Lấy ngày hiện tại (1-31) chia lấy dư cho số lượng quote
  // Kết quả sẽ là index của quote cần hiển thị.
  // Ví dụ: Ngày 5, có 7 quote => 5 % 7 = 5 (hiện quote số 5)
  // Ngày 8, có 7 quote => 8 % 7 = 1 (hiện quote số 1)
  const dailyQuote = useMemo(() => {
    const today = new Date().getDate();
    const index = today % QUOTES.length;
    return QUOTES[index];
  }, []);

  return (
    <section className="py-12 md:py-16 my-12">
      <div className="max-w-4xl mx-auto px-6 md:px-8 relative z-10">
        {/* 1. Phần Quote Text */}
        <div className="mb-4">
          <TypographyBlockquote 
            className="text-2xl md:text-3xl font-medium leading-relaxed 
                       text-[hsl(var(--foreground))] border-l-4 
                       border-[hsl(var(--primary))] pl-6 mt-0 italic"
          >
            "{dailyQuote.content}"
          </TypographyBlockquote>
        </div>
        
        {/* 2. Phần Tác giả */}
        <div className="text-right mt-6">
          <p className="text-lg font-semibold text-[hsl(var(--muted-foreground))]">
            — {dailyQuote.author}
          </p>
        </div>
      </div>
    </section>
  );
};

export const LandingPromotions = () => {
  return (
    <section className="pt-12 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <Badge variant="accent" className="mb-3">
          CẬP NHẬT 24/7
        </Badge>
        <h2 className="text-3xl lg:text-5xl font-black tracking-tight">
          Tiêu Điểm Nổi Bật
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
                  <h3 className="font-bold text-xl">Tin Mới Nhất</h3>
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
                          Hội nghị tuyên dương thanh niên tiên tiến làm theo lời
                          Bác
                        </h4>
                        <span className="text-xs text-[hsl(var(--muted-foreground))]">
                          2 giờ trước
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
                Xem Tất Cả
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

    </section>
  );
};

// Export QuoteSection để sử dụng riêng biệt
export { QuoteSection };
