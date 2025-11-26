import { Card, CardContent } from '../../../components/ui/primitives';
import { cn } from '../../../lib/utils';

export const LandingUSP = () => {
    const categories = [
        { name: 'Gương Sáng', icon: '🌟', color: 'bg-yellow-100' },
        { name: 'Kỹ Năng Số', icon: '💻', color: 'bg-blue-100' },
        { name: 'Sống Đẹp', icon: '❤️', color: 'bg-red-100' },
        { name: 'Pháp Luật', icon: '⚖️', color: 'bg-purple-100' },
        { name: 'Khởi Nghiệp', icon: '🚀', color: 'bg-orange-100' },
        { name: 'Văn Hóa', icon: '🇻🇳', color: 'bg-red-50' },
        { name: 'Biển Đảo', icon: '🌊', color: 'bg-cyan-100' },
        { name: 'Tình Nguyện', icon: '🔥', color: 'bg-green-100' },
    ];

    return (
        <section className="py-24 bg-[hsl(var(--secondary))]/30">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-12 text-center">
                 <h2 className="text-3xl font-bold mb-4">Hành Trang Gen Z</h2>
                 <p className="text-[hsl(var(--muted-foreground))]">Khám phá các chuyên mục được yêu thích nhất</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                 {categories.map((cat) => (
                   <Card key={cat.name} className="hover:-translate-y-1 hover:shadow-lg cursor-pointer border-[hsl(var(--border))] hover:border-[hsl(var(--primary))/50] transition-all duration-300">
                      <CardContent className="flex flex-col items-center justify-center p-8 text-center h-full">
                        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-4 transition-transform group-hover:scale-110", cat.color)}>
                          {cat.icon}
                        </div>
                        <span className="font-bold text-lg">{cat.name}</span>
                      </CardContent>
                   </Card>
                 ))}
              </div>
           </div>
        </section>
    );
};