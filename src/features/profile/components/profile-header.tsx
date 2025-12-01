import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sparkles, ChevronDown, User, LogOut } from "lucide-react";
import { Button, Card } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";
import { AnimatedText } from "@/components/animated-text";

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
  { label: "Trang chủ", href: "/home" },
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

const SheetOverlay = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => (
  <>
    {isOpen && (
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
    )}
    <div
      className={cn(
        "fixed inset-y-0 right-0 z-50 flex h-full w-3/4 flex-col gap-4 border-l bg-[hsl(var(--background))] p-6 shadow-2xl transition-transform duration-300 ease-in-out sm:max-w-sm",
        isOpen ? "translate-x-0" : "translate-x-full",
      )}
    >
      {children}
    </div>
  </>
);

export const ProfileHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full border-b border-transparent transition-all duration-500",
        scrolled
          ? "border-[hsl(var(--border))] bg-white/70 py-3 shadow-sm backdrop-blur-xl"
          : "bg-transparent py-5",
      )}
    >
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/home"
          className="group flex cursor-pointer items-center gap-3"
        >
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(var(--primary))] text-white shadow-lg shadow-blue-500/30 transform transition-transform group-hover:rotate-12">
              <Sparkles size={20} />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-[hsl(var(--accent))]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold leading-none text-[hsl(var(--foreground))]">
              <AnimatedText>Digital Youth</AnimatedText>
            </span>
            <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-500">
              <AnimatedText>Handbook</AnimatedText>
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center space-x-1 rounded-full border border-white/40 bg-white/40 px-2 py-1.5 shadow-sm/5 backdrop-blur-lg lg:flex">
          {NAVIGATION.map((item: NavItem) => (
            <div key={item.label} className="group relative">
              {item.href ? (
                <Link to={item.href}>
                  <Button
                    variant="ghost"
                    className="rounded-full px-4 text-sm font-semibold text-[hsl(var(--muted-foreground))] transition-all duration-300 hover:bg-white/70 hover:text-[hsl(var(--primary))]"
                  >
                    <AnimatedText>{item.label}</AnimatedText>
                    {item.subItems && (
                      <ChevronDown className="ml-1 h-3.5 w-3.5 opacity-50 transition-all group-hover:rotate-180 group-hover:opacity-100" />
                    )}
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="ghost"
                  className="rounded-full px-4 text-sm font-semibold text-[hsl(var(--muted-foreground))] transition-all duration-300 hover:bg-white/70 hover:text-[hsl(var(--primary))]"
                >
                  <AnimatedText>{item.label}</AnimatedText>
                  {item.subItems && (
                    <ChevronDown className="ml-1 h-3.5 w-3.5 opacity-50 transition-all group-hover:rotate-180 group-hover:opacity-100" />
                  )}
                </Button>
              )}

              {item.subItems && (
                <div className="invisible absolute left-1/2 top-full z-40 w-64 -translate-x-1/2 translate-y-4 pt-2 opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-2 group-hover:opacity-100">
                  <Card className="overflow-hidden rounded-2xl border border-white/60 bg-white/95 p-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-xl">
                    {item.subItems.map((subItem) => (
                      <Button
                        key={subItem.label}
                        variant="ghost"
                        className="h-auto w-full justify-start rounded-xl py-2.5 text-sm font-medium text-[hsl(var(--muted-foreground))] hover:bg-white/60 hover:text-[hsl(var(--primary))] transition-colors"
                      >
                        <AnimatedText>{subItem.label}</AnimatedText>
                      </Button>
                    ))}
                  </Card>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Avatar dropdown */}
        <div className="relative hidden items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={() => setIsAvatarOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-2 py-1 shadow-sm backdrop-blur-md hover:bg-white"
          >
            <div className="h-8 w-8 overflow-hidden rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-orange-400">
              <img
                src="https://i.pravatar.cc/100?img=12"
                alt="User avatar"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="hidden flex-col text-left sm:flex">
              <span className="text-xs font-semibold text-[hsl(var(--muted-foreground))]">
                <AnimatedText>Xin chào,</AnimatedText>
              </span>
              <span className="text-sm font-bold text-[hsl(var(--foreground))]">
                <AnimatedText>Thanh niên</AnimatedText>
              </span>
            </div>
            <ChevronDown
              size={14}
              className={cn(
                "ml-1 text-[hsl(var(--muted-foreground))] transition-transform",
                isAvatarOpen ? "rotate-180" : "rotate-0",
              )}
            />
          </button>

          {isAvatarOpen && (
            <div className="absolute right-0 top-full mt-3 w-56 overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-white shadow-[0_10px_40px_rgba(15,23,42,0.12)]">
              <div className="border-b border-[hsl(var(--border))] px-4 py-3">
                <p className="text-xs font-semibold text-[hsl(var(--muted-foreground))]">
                  <AnimatedText>Tài khoản của bạn</AnimatedText>
                </p>
                <p className="text-sm font-bold text-[hsl(var(--foreground))]">
                  <AnimatedText>digital.youth@example.com</AnimatedText>
                </p>
              </div>
              <div className="flex flex-col py-1 text-sm">
                <Link
                  to="/profile"
                  onClick={() => setIsAvatarOpen(false)}
                  className="flex w-full items-center gap-2 px-4 py-2 text-left text-[hsl(var(--foreground))] hover:bg-gray-50"
                >
                  <User
                    size={16}
                    className="text-[hsl(var(--muted-foreground))]"
                  />
                  <AnimatedText>Trang cá nhân</AnimatedText>
                </Link>
                <button
                  type="button"
                  className="mt-1 flex w-full items-center gap-2 border-t border-[hsl(var(--border))] px-4 py-2 text-left text-[hsl(var(--destructive))] hover:bg-red-50"
                  onClick={() => setIsAvatarOpen(false)}
                >
                  <LogOut size={16} />
                  <AnimatedText>Đăng xuất</AnimatedText>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <div className="lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(true)}
            aria-label="Mở menu"
          >
            <Menu size={22} />
          </Button>
        </div>
      </div>

      {/* Mobile sheet */}
      <SheetOverlay isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="mb-6 flex items-center justify-between">
          <span className="text-xl font-bold">
            <AnimatedText>Digital Youth</AnimatedText>
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            aria-label="Đóng menu"
          >
            <X size={22} />
          </Button>
        </div>

        <div className="flex-1 space-y-2 overflow-y-auto">
          {NAVIGATION.map((item) => (
            <div key={item.label}>
              <Button
                variant="ghost"
                className="w-full justify-start text-base font-semibold"
              >
                <AnimatedText>{item.label}</AnimatedText>
              </Button>
              {item.subItems && (
                <div className="ml-4 mt-1 space-y-1 border-l border-[hsl(var(--border))] pl-2">
                  {item.subItems.map((subItem) => (
                    <Button
                      key={subItem.label}
                      variant="ghost"
                      className="w-full justify-start text-sm text-[hsl(var(--muted-foreground))]"
                    >
                      <AnimatedText>{subItem.label}</AnimatedText>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-2 border-t border-[hsl(var(--border))] pt-4">
          <Button
            variant="outline"
            className="w-full rounded-xl border-[hsl(var(--border))] font-semibold"
          >
            <AnimatedText>Xem lộ trình gợi ý</AnimatedText>
          </Button>
          <Button className="w-full rounded-xl font-bold shadow-md">
            <AnimatedText>Lưu trang vào sổ tay</AnimatedText>
          </Button>
        </div>
      </SheetOverlay>
    </nav>
  );
};


