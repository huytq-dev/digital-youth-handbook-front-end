import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// [UPDATE] Đã xóa 'Search' khỏi import
import { Menu, X, ChevronDown, Star, LogIn, UserPlus } from 'lucide-react';
import { Button, Card } from '@/components/ui/primitives';
import { cn } from '@/lib/utils';
import { AnimatedText } from '@/components/animated-text';

type NavSubItem = {
  label: string;
  href?: string;
};

type NavItem = {
  label: string;
  href?: string;
  subItems?: NavSubItem[];
};

const NAVIGATION: NavItem[] = [
  { label: "Trang chủ", href: "/" },
  {
    label: "Chủ đề học tập",
    subItems: [
      { label: "Lập trình & Công nghệ" },
      { label: "Ngoại ngữ & Du học" },
      { label: "Marketing & Kinh doanh" },
      { label: "Thiết kế & Sáng tạo" },
      { label: "Tài chính cá nhân" },
      { label: "Kỹ năng mềm & Lãnh đạo" },
    ],
  },
  {
    label: "Tài nguyên",
    subItems: [
      { label: "Ebook & Tài liệu" },
      { label: "Podcast chia sẻ" },
      { label: "Công cụ hỗ trợ" },
      { label: "Template mẫu" },
    ],
  },
  {
    label: "Vinh danh",
    subItems: [
      { label: "Gương mặt tiêu biểu" },
      { label: "Bảng vàng thành tích" },
      { label: "Câu chuyện truyền cảm hứng" },
    ],
  },
];

const SheetOverlay = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => (
  <>
    {isOpen && (
      <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" onClick={onClose} />
    )}
    <div className={cn("fixed inset-y-0 right-0 z-50 h-full w-3/4 gap-4 border-l bg-[hsl(var(--background))] p-6 shadow-2xl transition-transform duration-300 ease-in-out sm:max-w-sm flex flex-col", isOpen ? "translate-x-0" : "translate-x-full")}>
      {children}
    </div>
  </>
);

export const LandingHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn("fixed top-0 w-full z-50 transition-all duration-500 border-b border-transparent", scrolled ? "bg-white/70 backdrop-blur-xl border-[hsl(var(--border))] py-3 shadow-sm" : "bg-transparent py-5")}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 cursor-pointer group">
            <div className="relative">
              <div className="bg-[hsl(var(--primary))] w-10 h-10 rounded-xl flex items-center justify-center text-white transform group-hover:rotate-12 transition-transform shadow-lg shadow-blue-500/30">
                <Star fill="currentColor" size={20} />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 bg-[hsl(var(--accent))] w-3.5 h-3.5 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl leading-none text-[hsl(var(--foreground))]">
                <AnimatedText>
                  TUỔI TRẺ <span className="text-[hsl(var(--primary))]">ONLINE</span>
                </AnimatedText>
              </span>
              <span className="text-[10px] font-bold text-orange-500 tracking-[0.2em] uppercase mt-1">
                <AnimatedText>Khát Vọng</AnimatedText>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 bg-white/40 backdrop-blur-lg px-2 py-1.5 rounded-full border border-white/40 shadow-sm/5">
            {NAVIGATION.map((item: NavItem) => (
              <div key={item.label} className="relative group">
                {item.href ? (
                  <Link to={item.href}>
                    <Button variant="ghost" className="text-[hsl(var(--muted-foreground))] font-semibold hover:text-[hsl(var(--primary))] hover:bg-white/50 rounded-full transition-all duration-300 px-4">
                      <AnimatedText>{item.label}</AnimatedText>
                    </Button>
                  </Link>
                ) : (
                  <Button variant="ghost" className="text-[hsl(var(--muted-foreground))] font-semibold hover:text-[hsl(var(--primary))] hover:bg-white/50 rounded-full transition-all duration-300 px-4">
                    <AnimatedText>{item.label}</AnimatedText>
                    {item.subItems && <ChevronDown className="ml-1 w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-all group-hover:rotate-180" />}
                  </Button>
                )}
                
                {item.subItems && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-2 translate-y-4 pt-2">
                    <Card className="p-2 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/60 bg-white/95 backdrop-blur-xl rounded-2xl">
                      {item.subItems.map((subItem) => (
                        <Button key={subItem.label} variant="ghost" className="w-full justify-start text-sm font-medium rounded-xl h-auto py-2.5 hover:bg-white/50 hover:text-[hsl(var(--primary))] transition-colors">
                            <AnimatedText>{subItem.label}</AnimatedText>
                        </Button>
                      ))}
                    </Card>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side: Auth Buttons (Đã xóa Search Icon) */}
          <div className="hidden lg:flex items-center gap-3">
            {/* [UPDATE] Đã xóa Button Search và Divider */}
            <div className="flex items-center gap-2">
                <Link to="/auth/sign-in">
                    <Button variant="ghost" className="font-semibold text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] hover:bg-white/50 rounded-full px-5">
                        Đăng nhập
                    </Button>
                </Link>
                <Link to="/auth/sign-up">
                    <Button variant="default" className="rounded-full shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all px-5 font-bold">
                        Đăng ký
                    </Button>
                </Link>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}><Menu size={24} /></Button>
          </div>
        </div>
      </div>

      {/* Mobile Sheet */}
       <SheetOverlay isOpen={isOpen} onClose={() => setIsOpen(false)}>
         <div className="flex items-center justify-between mb-6">
            <span className="font-bold text-xl"><AnimatedText>Menu</AnimatedText></span>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}><X size={24} /></Button>
         </div>
         
         <div className="flex-1 overflow-y-auto flex flex-col gap-2">
           {NAVIGATION.map((item) => (
             <div key={item.label}>
               <Button variant="ghost" className="w-full justify-start text-base font-semibold">
                   <AnimatedText>{item.label}</AnimatedText>
               </Button>
               {item.subItems && (
                 <div className="ml-4 mt-1 space-y-1 border-l border-[hsl(var(--border))] pl-2">
                   {item.subItems.map((subItem) => (
                      <Button key={subItem.label} variant="ghost" className="w-full justify-start text-sm text-[hsl(var(--muted-foreground))]">
                        <AnimatedText>{subItem.label}</AnimatedText>
                      </Button>
                   ))}
                 </div>
               )}
             </div>
           ))}
         </div>

         <div className="mt-auto pt-6 border-t border-[hsl(var(--border))] grid grid-cols-2 gap-3">
            <Link to="/auth/sign-in" className="w-full">
              <Button variant="outline" className="w-full rounded-xl border-[hsl(var(--border))] font-semibold">
                  <LogIn size={16} className="mr-2" /> Đăng nhập
              </Button>
            </Link>
            <Link to="/auth/sign-up" className="w-full">
              <Button variant="default" className="w-full rounded-xl font-bold shadow-md">
                  <UserPlus size={16} className="mr-2" /> Đăng ký
              </Button>
            </Link>
         </div>
       </SheetOverlay>
    </nav>
  );
};