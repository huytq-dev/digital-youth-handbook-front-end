import { Play, Sparkles, ArrowRight } from "lucide-react";
import { Button, Badge } from "@/components/ui/primitives";

export const LandingIntroduction = () => {
  return (
    <section className="relative py-20 overflow-hidden font-sans bg-white/50">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Grid Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* --- [UPDATE 1] Đảo Video sang bên Trái (trên Desktop) --- */}
          {/* order-last lg:order-first: Trên mobile nằm dưới, trên máy tính nằm trước (bên trái) */}
          <div className="relative group order-last lg:order-first">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
            
            <div className="relative rounded-3xl overflow-hidden border border-white/50 bg-white/30 backdrop-blur-md shadow-2xl aspect-video cursor-pointer">
              <img 
                src="https://picsum.photos/800/450?random=20" 
                alt="AI Video Thumbnail" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg text-blue-600 pl-1">
                    <Play size={24} fill="currentColor" />
                  </div>
                </div>
              </div>
              <div className="absolute top-4 left-4">
                  {/* [UPDATE] Bỏ icon và chỉ để lại chữ "AI" */}
                  <Badge className="bg-black/50 text-white backdrop-blur-md border-none px-3 py-1">
                    AI
                  </Badge>
              </div>
            </div>
          </div>

          {/* --- [UPDATE 2] Nội dung Text (Bên Phải) --- */}
          <div className="space-y-6">
            <Badge className="bg-orange-50 text-orange-600 border-orange-100 px-3 py-1 text-xs font-bold uppercase tracking-wider mb-2">
               <Sparkles size={12} className="mr-1 inline-block" /> Trải nghiệm khác biệt
            </Badge>
            
            {/* Đổi tiêu đề khác đi để không bị lặp với Hero */}
            <h2 className="text-3xl md:text-4xl font-extrabold text-[hsl(var(--foreground))] leading-tight">
              Tiên phong ứng dụng <br />
              <span className="text-blue-600">Trí tuệ nhân tạo (AI)</span>
            </h2>
            
            <p className="text-[hsl(var(--muted-foreground))] text-lg leading-relaxed text-justify">
              Không còn là những bài học khô khan. Chúng tôi biến kiến thức thành những thước phim hoạt hình sống động, được cá nhân hóa bởi AI, giúp bạn tiếp thu nhanh hơn và ghi nhớ lâu hơn.
            </p>
{/* 
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
               <Button variant="outline" className="rounded-full border-blue-200 text-blue-700 hover:bg-blue-50">
                 Xem Demo Công nghệ <ArrowRight size={16} className="ml-2" />
               </Button>
            </div> */}
          </div>

        </div>
      </div>
    </section>
  );
};