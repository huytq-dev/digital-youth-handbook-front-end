import React, { useState, useEffect } from 'react';
import { Search, Menu, X, ChevronDown, Star, Zap } from 'lucide-react';
import { Button, Card } from '../../../components/ui/primitives';
import { cn } from '../../../lib/utils';

type NavSubItem = {
  label: string;
};

type NavItem = {
  label: string;
  subItems?: NavSubItem[];
};

const NAVIGATION: NavItem[] = [
  { label: "Trang chủ" },
  {
    label: "Tin tức",
    subItems: [
      { label: "Thời sự" },
      { label: "Giới trẻ" },
      { label: "Gương sáng" },
    ],
  },
  {
    label: "Học tập & Khởi nghiệp",
    subItems: [
      { label: "Kỹ năng" },
      { label: "Khởi nghiệp" },
      { label: "Học bổng" },
    ],
  },
  {
    label: "Hoạt động đoàn",
    subItems: [
      { label: "Chiến dịch tình nguyện" },
      { label: "Câu lạc bộ - Đội nhóm" },
    ],
  },
  {
    label: "Kho tri thức",
    subItems: [
      { label: "Tài liệu" },
      { label: "Câu chuyện truyền cảm hứng" },
    ],
  },
];

const SheetOverlay = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => (
  <>
    {isOpen && (
      <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" onClick={onClose} />
    )}
    <div className={cn("fixed inset-y-0 right-0 z-50 h-full w-3/4 gap-4 border-l bg-[hsl(var(--background))] p-6 shadow-2xl transition-transform duration-300 ease-in-out sm:max-w-sm", isOpen ? "translate-x-0" : "translate-x-full")}>
      <div className="flex flex-col h-full">{children}</div>
    </div>
  </>
);

export const LandingHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Mobile submenu state sẽ dùng sau nếu mở rộng menu
  // const [activeMobileSubmenu, setActiveMobileSubmenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn("fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent", scrolled ? "glass-effect border-[hsl(var(--border))] py-2" : "bg-transparent py-4")}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="relative">
              <div className="bg-[hsl(var(--primary))] w-10 h-10 rounded-xl flex items-center justify-center text-white transform group-hover:rotate-12 transition-transform shadow-lg shadow-blue-500/30">
                <Star fill="currentColor" size={20} />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-[hsl(var(--accent))] w-4 h-4 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl leading-none text-[hsl(var(--foreground))]">
                TUỔI TRẺ <span className="text-[hsl(var(--primary))]">ONLINE</span>
              </span>
              <span className="text-[10px] font-bold text-orange-500 tracking-[0.2em] uppercase">
                Khát Vọng
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 bg-white/50 backdrop-blur-md px-2 py-1.5 rounded-full border border-white/50 shadow-sm">
            {NAVIGATION.map((item: NavItem) => (
              <div key={item.label} className="relative group">
                <Button variant="ghost" className="text-[hsl(var(--muted-foreground))] font-semibold hover:text-[hsl(var(--primary))] rounded-full">
                  {item.label}
                  {item.subItems && <ChevronDown className="ml-1 w-3 h-3 transition-transform group-hover:rotate-180" />}
                </Button>
                {item.subItems && (
                  <div className="absolute left-0 top-full w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 pt-2">
                    <Card className="p-1 overflow-hidden shadow-xl border-none ring-1 ring-black/5">
                      {item.subItems.map((subItem) => (
                        <Button key={subItem.label} variant="ghost" className="w-full justify-start text-sm font-medium rounded-lg h-auto py-2.5">
                          {subItem.label}
                        </Button>
                      ))}
                    </Card>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full"><Search size={20} /></Button>
            <Button variant="default" className="gap-2 rounded-full shadow-lg shadow-blue-500/25"><Zap size={16} fill="currentColor" /> Kết Nối</Button>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}><Menu size={24} /></Button>
          </div>
        </div>
      </div>

      {/* Mobile Sheet Logic Here (Simplified for brevity) */}
       <SheetOverlay isOpen={isOpen} onClose={() => setIsOpen(false)}>
         <div className="flex items-center justify-between mb-8">
            <span className="font-bold text-xl">Menu</span>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}><X size={24} /></Button>
         </div>
         {/* ... Render mobile menu items from NAVIGATION ... */}
       </SheetOverlay>
    </nav>
  );
};