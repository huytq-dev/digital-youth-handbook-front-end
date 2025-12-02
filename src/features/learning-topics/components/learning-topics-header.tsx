import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  Star,
  User,
  LogOut,
  Sparkles,
  LogIn,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { authService } from "@/features/auth/auth.service";

type NavSubItem = { label: string; href?: string };
type NavItem = { label: string; href?: string; subItems?: NavSubItem[] };

const NAVIGATION: NavItem[] = [
  { label: "Trang chủ", href: "/home" },
  {
    label: "Chủ đề học tập",
    href: "/learning-topics",
    subItems: [
      {
        label: "Lý tưởng & Hoài bão",
        href: "/learning-topics/ly-tuong",
      },
      {
        label: "Tư tưởng & Đạo đức",
        href: "/learning-topics/tu-tuong",
      },
      {
        label: "Văn hóa & Lối sống",
        href: "/learning-topics/van-hoa",
      },
      {
        label: "Mạng xã hội an toàn",
        href: "/learning-topics/an-toan-mang",
      },
      {
        label: "Thanh niên tình nguyện",
        href: "/learning-topics/tinh-nguyen",
      },
      {
        label: "Chuyển đổi số",
        href: "/learning-topics/chuyen-doi-so",
      },
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
  { label: "Thi hay", href: "#" },
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
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
    )}
    <div
      className={cn(
        "fixed inset-y-0 right-0 z-50 h-full w-[85%] sm:w-[400px] bg-[#fff9f0] border-l-4 border-black p-6 shadow-[-10px_0px_0px_rgba(0,0,0,0.2)] transition-transform duration-300 ease-in-out flex flex-col",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-yellow-400 to-red-500" />
      {children}
    </div>
  </>
);

const NavLinkBtn = ({ item }: { item: NavItem }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    // Nếu item có subItems và không có href, không làm gì cả (chỉ hiển thị dropdown)
    if (item.subItems && !item.href) {
      e.preventDefault();
    }
    // Nếu có href, cho phép navigation bình thường
  };

  return (
    <div
      className="relative group h-full flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link 
        to={item.href || "#"} 
        onClick={handleClick}
      >
        <Button
          variant="ghost"
          className="relative font-bold text-slate-700 hover:text-black hover:bg-transparent px-4 text-base"
        >
          <span className="relative z-10 flex items-center gap-1">
            {item.label}
            {item.subItems && (
              <ChevronDown
                size={14}
                strokeWidth={3}
                className={cn(
                  "transition-transform duration-200",
                  isHovered ? "rotate-180" : ""
                )}
              />
            )}
          </span>
          {isHovered && (
            <motion.div
              layoutId="nav-highlight-home"
              className="absolute inset-0 bg-yellow-300 border-2 border-black rounded-lg -z-0 shadow-[2px_2px_0px_black]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            />
          )}
        </Button>
      </Link>

      <AnimatePresence>
        {item.subItems && isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, rotateX: -15 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-64"
          >
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l-2 border-t-2 border-black rotate-45 z-20" />
            <div className="bg-white border-2 border-black shadow-[6px_6px_0px_black] rounded-xl overflow-hidden p-2 relative z-10">
              {item.subItems.map((subItem) => (
                <Link
                  key={subItem.label}
                  to={subItem.href || "#"}
                  className="block"
                >
                  <div className="px-4 py-3 hover:bg-blue-50 hover:text-blue-700 rounded-lg font-bold text-sm transition-colors border-2 border-transparent hover:border-black/10 flex items-center justify-between group/item">
                    {subItem.label}
                    <div className="w-2 h-2 rounded-full bg-blue-500 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const LearningTopicsHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated());
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 font-sans",
        scrolled
          ? "bg-[#fff9f0]/95 backdrop-blur-md py-2 border-b-4 border-black shadow-sm"
          : "bg-[#fff9f0] py-4 border-b-4 border-black/10"
      )}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/home"
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="relative">
            <div className="bg-blue-600 w-11 h-11 rounded-lg border-2 border-black flex items-center justify-center text-white shadow-[3px_3px_0px_black] group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-none transition-all">
              <Star
                fill="currentColor"
                size={22}
                className="group-hover:rotate-180 transition-transform duration-500"
              />
            </div>
            <div className="absolute -top-1 -right-1 bg-red-500 w-3 h-3 rounded-full border-2 border-black" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xl leading-none text-slate-900 tracking-tight">
              HÀNH TRANG <span className="text-blue-600">SỐ</span>
            </span>
            <span className="text-[10px] font-black text-white bg-orange-500 px-1 py-0.5 border border-black rounded-sm tracking-widest uppercase mt-1 w-fit rotate-[-2deg] group-hover:rotate-0 transition-transform">
              Khát Vọng
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-2">
          {NAVIGATION.map((item) => (
            <NavLinkBtn key={item.label} item={item} />
          ))}
        </div>

        {/* Right side: Auth or Avatar */}
        <div className="hidden lg:flex items-center gap-4">
          {isAuthenticated ? (
            <div className="relative flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsAvatarOpen((prev) => !prev)}
                className={cn(
                  "flex items-center gap-2 rounded-full border-2 border-black bg-white pl-1 pr-3 py-1 shadow-[3px_3px_0px_black] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[1px_1px_0px_black] transition-all",
                  isAvatarOpen &&
                    "translate-y-[2px] translate-x-[2px] shadow-[1px_1px_0px_black] bg-blue-50"
                )}
              >
                <div className="h-8 w-8 overflow-hidden rounded-full border border-black bg-gray-200">
                  <img
                    src="https://i.pravatar.cc/100?img=12"
                    alt="User avatar"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="hidden flex-col text-left sm:flex">
                  <span className="text-[10px] font-bold text-slate-500 uppercase leading-none">
                    Xin chào
                  </span>
                  <span className="text-sm font-black text-slate-900 leading-none">
                    Thanh niên
                  </span>
                </div>
                <ChevronDown
                  size={16}
                  strokeWidth={3}
                  className={cn(
                    "ml-1 text-slate-900 transition-transform duration-200",
                    isAvatarOpen ? "rotate-180" : "rotate-0"
                  )}
                />
              </button>

              <AnimatePresence>
                {isAvatarOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-64 overflow-hidden rounded-xl border-2 border-black bg-white shadow-[4px_4px_0px_black] z-50"
                  >
                    <div className="border-b-2 border-black bg-yellow-300 px-4 py-2.5">
                      <p className="text-[10px] font-bold text-slate-800 uppercase tracking-wider">
                        Tài khoản của bạn
                      </p>
                      <p className="text-xs font-black text-slate-900 truncate">
                        digital.youth@example.com
                      </p>
                    </div>

                    <div className="flex flex-col gap-1 p-1.5">
                      <Link
                        to="/profile"
                        onClick={() => setIsAvatarOpen(false)}
                        className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-left text-sm font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-700 border-2 border-transparent hover:border-black/10 transition-all"
                      >
                        <User size={16} strokeWidth={2.5} />
                        Trang cá nhân
                      </Link>
                      <button
                        type="button"
                        className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-left text-sm font-bold text-slate-700 hover:bg-purple-50 hover:text-purple-700 border-2 border-transparent hover:border-black/10 transition-all"
                        onClick={() => setIsAvatarOpen(false)}
                      >
                        <Sparkles size={16} strokeWidth={2.5} />
                        Kế hoạch đã lưu
                      </button>
                      <div className="my-1 border-t-2 border-dashed border-slate-200" />
                      <button
                        type="button"
                        className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-left text-sm font-bold text-red-600 hover:bg-red-50 hover:text-red-700 border-2 border-transparent hover:border-red-200 transition-all"
                        onClick={() => setIsAvatarOpen(false)}
                      >
                        <LogOut size={16} strokeWidth={2.5} />
                        Đăng xuất
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link to="/auth/sign-in">
                <motion.button
                  whileHover={{ y: -2, boxShadow: "2px 2px 0px 0px black" }}
                  whileTap={{ y: 0, boxShadow: "0px 0px 0px 0px black" }}
                  className="h-11 px-6 rounded-lg font-bold border-2 border-black bg-white text-slate-900 shadow-[1px_1px_0px_black] transition-all flex items-center justify-center"
                >
                  Đăng nhập
                </motion.button>
              </Link>
              <Link to="/auth/sign-up">
                <motion.button
                  whileHover={{ y: -2, boxShadow: "4px 4px 0px 0px black" }}
                  whileTap={{ y: 0, boxShadow: "0px 0px 0px 0px black" }}
                  className="h-11 px-6 bg-blue-600 text-white font-bold border-2 border-black rounded-lg shadow-[2px_2px_0px_black] transition-all flex items-center gap-2 justify-center"
                >
                  Đăng ký
                  <ArrowRightIcon className="w-4 h-4" />
                </motion.button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <div className="lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(true)}
            className="border-2 border-black bg-white shadow-[2px_2px_0px_black] hover:translate-y-0.5 hover:shadow-none transition-all active:bg-gray-100"
          >
            <Menu size={24} strokeWidth={2.5} />
          </Button>
        </div>
      </div>

      {/* Mobile Sheet */}
      <SheetOverlay isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-black border-dashed">
          <span className="font-black text-2xl flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-500 border-2 border-black rounded-full" />
            MENU
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="hover:bg-red-100 hover:text-red-600 rounded-full transition-colors"
          >
            <X size={28} strokeWidth={3} />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto flex flex-col gap-2 pr-2 custom-scrollbar">
          {NAVIGATION.map((item) => (
            <div
              key={item.label}
              className="border-2 border-black rounded-xl bg-white mb-3 shadow-[3px_3px_0px_rgba(0,0,0,0.1)] overflow-hidden"
            >
              {item.href && !item.subItems ? (
                <Link
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block"
                >
                  <div className="p-3 font-bold text-lg flex items-center justify-between bg-slate-50 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                    {item.label}
                  </div>
                </Link>
              ) : (
                <>
                  {item.href ? (
                    <Link
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block"
                    >
                      <div className="p-3 font-bold text-lg flex items-center justify-between bg-slate-50 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                        {item.label}
                      </div>
                    </Link>
                  ) : (
                    <div className="p-3 font-bold text-lg flex items-center justify-between bg-slate-50">
                      {item.label}
                    </div>
                  )}
                  {item.subItems && (
                    <div className="border-t-2 border-black divide-y-2 divide-dashed divide-slate-200">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.label}
                          to={subItem.href || "#"}
                          onClick={() => setIsOpen(false)}
                        >
                          <div className="p-3 pl-4 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-colors flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                            {subItem.label}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        <div className="mt-auto pt-6 border-t-2 border-black grid grid-cols-2 gap-3">
          {!isAuthenticated ? (
            <>
              <Link
                to="/auth/sign-in"
                className="w-full"
                onClick={() => setIsOpen(false)}
              >
                <Button
                  variant="outline"
                  className="w-full h-12 rounded-xl border-2 border-black font-bold hover:bg-slate-100 text-slate-900 shadow-sm"
                >
                  <LogIn size={18} className="mr-2" /> Đăng nhập
                </Button>
              </Link>
              <Link
                to="/auth/sign-up"
                className="w-full"
                onClick={() => setIsOpen(false)}
              >
                <Button
                  variant="default"
                  className="w-full h-12 rounded-xl border-2 border-black bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-[3px_3px_0px_black] hover:translate-y-0.5 hover:shadow-[1px_1px_0px_black] transition-all"
                >
                  <UserPlus size={18} className="mr-2" /> Đăng ký
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                className="w-full"
                onClick={() => setIsOpen(false)}
              >
                <Button
                  variant="outline"
                  className="w-full h-12 rounded-xl border-2 border-black font-bold hover:bg-slate-100 text-slate-900 shadow-sm"
                >
                  <User size={18} className="mr-2" /> Trang cá nhân
                </Button>
              </Link>
              <Button
                variant="default"
                className="w-full h-12 rounded-xl border-2 border-black bg-red-500 hover:bg-red-600 text-white font-bold shadow-[3px_3px_0px_black] hover:translate-y-0.5 hover:shadow-[1px_1px_0px_black] transition-all"
                onClick={() => setIsOpen(false)}
              >
                <LogOut size={18} className="mr-2" /> Đăng xuất
              </Button>
            </>
          )}
        </div>
      </SheetOverlay>
    </nav>
  );
};

const ArrowRightIcon = (props: any) => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    ></path>
  </svg>
);


