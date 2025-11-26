import { Zap, Heart, MessageCircle, ArrowRight, Users, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardFooter, Badge, Button } from '../../../components/ui/primitives';

type Article = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  author: string;
  date: string;
  likes: number;
  comments: number;
  isHot?: boolean;
};

const ARTICLES: Article[] = [
  {
    id: 1,
    title: "Thanh niên tiên phong trong chuyển đổi số cộng đồng",
    description:
      "Những câu chuyện truyền cảm hứng về các bạn trẻ mang công nghệ đến với người dân vùng sâu vùng xa.",
    imageUrl:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&q=80&w=1000",
    category: "Chuyển đổi số",
    author: "Trung ương Đoàn",
    date: "Hôm nay",
    likes: 1234,
    comments: 210,
    isHot: true,
  },
  {
    id: 2,
    title: "Khởi nghiệp xanh: Hành trình bảo vệ môi trường của Gen Z",
    description:
      "Từ những dự án nhỏ đến các startup triệu đô, thanh niên Việt Nam đang thay đổi tương lai xanh.",
    imageUrl:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000",
    category: "Khởi nghiệp",
    author: "Báo Tuổi Trẻ",
    date: "Hôm qua",
    likes: 980,
    comments: 150,
  },
  {
    id: 3,
    title: "Tình nguyện mùa hè: Những bước chân không mỏi",
    description:
      "Hàng ngàn chiến sĩ áo xanh tỏa về khắp mọi miền Tổ quốc, để lại dấu ấn đẹp trong lòng người dân.",
    imageUrl:
      "https://images.unsplash.com/photo-1529101091764-c3526daf38fe?auto=format&fit=crop&q=80&w=1000",
    category: "Tình nguyện",
    author: "Thành Đoàn TP.HCM",
    date: "3 ngày trước",
    likes: 756,
    comments: 89,
  },
  {
    id: 4,
    title: "Kỹ năng số cho thanh niên nông thôn",
    description:
      "Các lớp tập huấn miễn phí giúp bạn trẻ nông thôn tiếp cận tri thức mới, nắm bắt cơ hội việc làm.",
    imageUrl:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&q=80&w=1000",
    category: "Kỹ năng",
    author: "Tỉnh Đoàn Đồng Tháp",
    date: "1 tuần trước",
    likes: 432,
    comments: 45,
  },
];

const ArticleCard = ({ article }: { article: typeof ARTICLES[0] }) => (
  <Card className="overflow-hidden group hover:border-[hsl(var(--primary))/30] h-full flex flex-col">
    <div className="relative h-60 overflow-hidden">
      <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute top-4 left-4">
         <Badge className="bg-white/90 text-[hsl(var(--primary))] backdrop-blur shadow-sm hover:bg-white">{article.category}</Badge>
      </div>
      {article.isHot && (
         <div className="absolute top-4 right-4 animate-pulse">
          <Badge variant="destructive" className="gap-1 shadow-lg"><Zap size={12} fill="currentColor"/> HOT</Badge>
       </div>
      )}
    </div>
    <CardContent className="flex flex-col flex-1 pt-6">
      <div className="flex items-center gap-2 text-xs font-semibold text-[hsl(var(--muted-foreground))] mb-3">
        <span className="text-[hsl(var(--accent))] flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-md"><Users size={12} /> {article.author}</span>
        <span>•</span>
        <span>{article.date}</span>
      </div>
      <h3 className="text-xl font-bold leading-tight mb-3 group-hover:text-[hsl(var(--primary))] transition-colors line-clamp-2">{article.title}</h3>
      <p className="text-sm text-[hsl(var(--muted-foreground))] line-clamp-3 mb-6 flex-1">{article.description}</p>
      <div className="flex items-center justify-between pt-4 border-t border-dashed border-[hsl(var(--border))] mt-auto">
         <div className="flex gap-4 text-[hsl(var(--muted-foreground))] text-xs font-bold">
           <span className="flex items-center gap-1 group/icon hover:text-red-500 transition-colors cursor-pointer"><Heart size={14}/> {article.likes}</span>
           <span className="flex items-center gap-1 group/icon hover:text-blue-500 transition-colors cursor-pointer"><MessageCircle size={14}/> {article.comments}</span>
         </div>
         <Button variant="link" className="p-0 h-auto gap-1 text-xs font-bold group-hover:translate-x-1 transition-transform">Đọc tiếp <ArrowRight size={14} /></Button>
      </div>
    </CardContent>
  </Card>
);

const QuoteSection = () => (
    <section className="bg-[hsl(var(--primary))] py-24 relative overflow-hidden my-12 rounded-3xl">
      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center text-white">
        <div className="mb-8 flex justify-center">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-inner border border-white/20"><Award className="text-yellow-300 w-12 h-12" /></div>
        </div>
        <blockquote className="text-3xl md:text-5xl font-black leading-tight mb-10 tracking-tight">"Thanh niên là người chủ tương lai của nước nhà... Nước nhà thịnh hay suy, yếu hay mạnh một phần lớn là do các thanh niên."</blockquote>
        <Badge variant="outline" className="text-white border-white/30 px-6 py-2 text-base uppercase tracking-widest backdrop-blur-md">Hồ Chí Minh</Badge>
      </div>
    </section>
);

export const LandingPromotions = () => {
  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
          <Badge variant="accent" className="mb-3">CẬP NHẬT 24/7</Badge>
          <h2 className="text-3xl lg:text-5xl font-black tracking-tight">Tiêu Điểm Nổi Bật</h2>
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
                    <div className="bg-[hsl(var(--accent))] p-2 rounded-lg text-white"><Zap size={20} fill="currentColor"/></div>
                    <h3 className="font-bold text-xl">Tin Mới Nhất</h3>
                  </div>
                  <div className="space-y-4">
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} className="group flex gap-4 p-2 rounded-xl hover:bg-white hover:shadow-md transition-all cursor-pointer">
                         <div className="w-16 h-16 rounded-lg bg-gray-200 overflow-hidden shrink-0">
                            <img src={`https://source.unsplash.com/random/100x100?sig=${i}`} alt="" className="w-full h-full object-cover" />
                         </div>
                         <div>
                            <h4 className="font-bold text-sm line-clamp-2 mb-1 group-hover:text-[hsl(var(--primary))] transition-colors">Hội nghị tuyên dương thanh niên tiên tiến làm theo lời Bác</h4>
                            <span className="text-xs text-[hsl(var(--muted-foreground))]">2 giờ trước</span>
                         </div>
                      </div>
                    ))}
                  </div>
              </CardContent>
            </CardHeader>
            <CardFooter>
               <Button variant="outline" className="w-full border-[hsl(var(--primary))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-white">Xem Tất Cả</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <QuoteSection />
    </section>
  );
};