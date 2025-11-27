import { cn } from '@/lib/utils';

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
        <section className="py-12 md:py-16">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-10 text-center">
                 <h2 className="text-2xl md:text-3xl font-bold mb-2">Khám phá các Chuyên mục</h2>
                 <p className="text-[hsl(var(--muted-foreground))] text-sm">Nền tảng kiến thức toàn diện cho thế hệ trẻ</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                 {categories.map((cat) => (
                   <div 
                     key={cat.name} 
                     className={cn(
                       "flex flex-col items-center p-4 rounded-xl cursor-pointer transition-all duration-300 border border-[hsl(var(--border))] hover:shadow-md hover:border-[hsl(var(--primary))]",
                       cat.color
                     )}
                   >
                     <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl mb-2">
                       {cat.icon}
                     </div>
                     <span className="font-semibold text-sm text-center">{cat.name}</span>
                   </div>
                 ))}
              </div>
           </div>
        </section>
    );
};