import type { ReactNode } from "react";
import { memo, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  ChevronDown,
  Star,
  User,
  LogOut,
  X,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useSignOutMutation } from "@/features/auth/auth.api";
import { useSelector, useDispatch } from "react-redux";
import {
  logout,
  selectCurrentUser,
  selectIsAuthenticated,
} from "@/features/auth/auth.slice";
import type { UserDomainModel } from "@/features/common/common.type";
import { useIsMobile, useReducedMotion } from "@/hooks/use-reduced-motion";

// --- Types ---
type NavSubItem = { label: string; href?: string };
type NavItem = { label: string; href?: string; subItems?: NavSubItem[] };

const NAVIGATION: NavItem[] = [
  { label: "Trang chủ", href: "/" },
  {
    label: "Chủ đề học tập",
    href: "/learning-topics",
    subItems: [
      { label: "Lý tưởng & Hoài bão", href: "/learning-topics/ly-tuong" },
      { label: "Tư tưởng & Đạo đức", href: "/learning-topics/tu-tuong" },
      { label: "Văn hóa & Lối sống", href: "/learning-topics/van-hoa" },
      { label: "Mạng xã hội an toàn", href: "/learning-topics/an-toan-mang" },
      { label: "Thanh niên tình nguyện", href: "/learning-topics/tinh-nguyen" },
      { label: "Chuyển đổi số", href: "/learning-topics/chuyen-doi-so" },
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
  { label: "Vinh danh", href: "/honor" },
  { label: "Thi hay", href: "/quizzes" },
];

// --- Sub-components ---

interface SheetOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const SheetOverlay = memo(({ isOpen, onClose, children }: SheetOverlayProps) => (
  <>
    {isOpen && (
      <div
        className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
    )}
    <div
      className={cn(
        "fixed inset-y-0 right-0 z-[9999] h-[100dvh] w-full sm:w-[400px] bg-[#fff9f0] border-l-4 border-black shadow-[-10px_0px_20px_rgba(0,0,0,0.2)] transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-yellow-400 to-red-500 z-10" />
      <div className="flex h-full flex-col overflow-hidden px-6 py-6 relative z-0">
        {children}
      </div>
    </div>
  </>
));
SheetOverlay.displayName = "SheetOverlay";

const NavLinkBtn = memo(({ item }: { item: NavItem }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative group h-full flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={item.href || "#"}>
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
              layoutId="nav-highlight"
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
});
NavLinkBtn.displayName = "NavLinkBtn";

// --- MỚI: Component UserProfileDropdown ---
interface UserProfileDropdownProps {
  user: UserDomainModel;
  onSignOut: () => void;
}

const UserProfileDropdown = memo(
  ({ user, onSignOut }: UserProfileDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);

    // Xử lý click outside để đóng menu
    useEffect(() => {
      if (!isOpen) return;
      const handleClickOutside = () => setIsOpen(false);
      setTimeout(() => window.addEventListener("click", handleClickOutside), 0);
      return () => window.removeEventListener("click", handleClickOutside);
    }, [isOpen]);

    const initials =
      user.name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "U";

    // --- FIX: Lấy tên gọi (từ cuối) để hiển thị cho gọn ---
    // Ví dụ: "Trần Quang Huy" -> "Huy"
    const displayName = user.name?.trim().split(" ").pop() || user.name;

    return (
      <div className="relative">
        {/* Trigger Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen((prev) => !prev);
          }}
          className={cn(
            "flex items-center gap-2 rounded-full border-2 border-black bg-white pl-1 pr-3 py-1 shadow-[3px_3px_0px_black] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[1px_1px_0px_black] transition-all",
            isOpen &&
              "translate-y-[2px] translate-x-[2px] shadow-[1px_1px_0px_black] bg-blue-50"
          )}
        >
          {/* Avatar Circle */}
          <div className="h-8 w-8 overflow-hidden rounded-full border border-black bg-gray-200 flex items-center justify-center text-xs font-bold">
            {user.picture ? (
              <img
                src={user.picture}
                alt="User avatar"
                className="h-full w-full object-cover"
              />
            ) : (
              <span>{initials}</span>
            )}
          </div>

          {/* Text Info - Đã sửa logic hiển thị tên */}
          <div className="hidden flex-col text-left sm:flex">
            <span className="text-[10px] font-bold text-slate-500 uppercase leading-none">
              Xin chào
            </span>
            <span 
              className="text-sm font-black text-slate-900 leading-none max-w-[120px] truncate"
              title={user.name} // Hover vào sẽ hiện full tên
            >
              {displayName} 
            </span>
          </div>

          {/* Chevron Icon */}
          <ChevronDown
            size={16}
            strokeWidth={3}
            className={cn(
              "ml-1 text-slate-900 transition-transform duration-200",
              isOpen ? "rotate-180" : "rotate-0"
            )}
          />
        </button>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 w-64 overflow-hidden rounded-xl border-2 border-black bg-white shadow-[4px_4px_0px_black] z-50"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header màu vàng */}
              <div className="border-b-2 border-black bg-yellow-300 px-4 py-2.5">
                <p className="text-[10px] font-bold text-slate-800 uppercase tracking-wider">
                  Tài khoản của bạn
                </p>
                <p 
                  className="text-xs font-black text-slate-900 truncate" 
                  title={user.email}
                >
                  {user.email}
                </p>
              </div>

              {/* Menu Items */}
              <div className="flex flex-col p-1.5 gap-1">
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-left font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-700 border-2 border-transparent hover:border-black/10 transition-all text-sm"
                >
                  <User size={16} strokeWidth={2.5} />
                  Trang cá nhân
                </Link>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-left font-bold text-slate-700 hover:bg-purple-50 hover:text-purple-700 border-2 border-transparent hover:border-black/10 transition-all text-sm"
                >
                  <Sparkles size={16} strokeWidth={2.5} />
                  Kế hoạch đã lưu
                </button>

                <div className="my-1 border-t-2 border-dashed border-slate-200" />

                <button
                  type="button"
                  className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-left font-bold text-red-600 hover:bg-red-50 hover:text-red-700 border-2 border-transparent hover:border-red-200 transition-all text-sm"
                  onClick={() => {
                    setIsOpen(false);
                    onSignOut();
                  }}
                >
                  <LogOut size={16} strokeWidth={2.5} />
                  Đăng xuất
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
UserProfileDropdown.displayName = "UserProfileDropdown";

// --- MAIN COMPONENT ---

export const UnifiedHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [signOut] = useSignOutMutation();
  const dispatch = useDispatch();
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobile();

  // Use Redux state
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = useCallback(async () => {
    try {
      if (user?.id) {
        await signOut({ userId: user.id }).unwrap();
      }
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      dispatch(logout());
    }
  }, [signOut, user?.id, dispatch]);

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 font-sans",
        scrolled
          ? "bg-[#fff9f0]/95 backdrop-blur-md py-2 border-b-4 border-black shadow-sm"
          : "bg-[#fff9f0] py-4 border-b-4 border-black/10"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo Section */}
          <Link
            to="/"
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="relative">
              <div className="bg-blue-600 w-11 h-11 rounded-lg border-2 border-black flex items-center justify-center text-white shadow-[3px_3px_0px_black] group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-none transition-all">
                <Star
                  fill="currentColor"
                  size={22}
                  className={cn(
                    "transition-transform duration-500",
                    shouldReduceMotion || isMobile
                      ? ""
                      : "group-hover:rotate-180"
                  )}
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

          {/* Right Side: Auth Buttons or User Avatar */}
          <div className="hidden lg:flex items-center gap-4">
            {!isAuthenticated ? (
              <>
                <Link to="/auth/sign-in">
                  <button className="h-11 px-6 rounded-lg font-black text-base border-2 border-black bg-white text-slate-900 shadow-[4px_4px_0px_black] transition-all hover:bg-slate-50 hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0px_black] active:translate-y-1 active:translate-x-1 active:shadow-none flex items-center justify-center">
                    Đăng nhập
                  </button>
                </Link>
                <Link to="/auth/sign-up">
                  <button className="h-11 px-6 bg-blue-600 text-white font-black text-base border-2 border-black rounded-lg shadow-[4px_4px_0px_black] transition-all hover:bg-blue-700 hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0px_black] active:translate-y-1 active:translate-x-1 active:shadow-none flex items-center gap-2 justify-center">
                    Đăng ký <ArrowRightIcon className="w-4 h-4" />
                  </button>
                </Link>
              </>
            ) : user ? (
              <UserProfileDropdown user={user} onSignOut={handleSignOut} />
            ) : null}
          </div>

          {/* Mobile Toggle Button */}
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
      </div>

      {/* MOBILE SHEET CONTENT */}
      <SheetOverlay isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-black border-dashed">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-orange-500 rounded-full border-2 border-black shadow-[1px_1px_0px_black]" />
            <span className="font-black text-2xl tracking-tight text-slate-900">
              MENU
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="hover:bg-transparent text-slate-500 hover:text-black transition-colors"
          >
            <X size={24} strokeWidth={3} />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto flex flex-col gap-4 pr-1 pb-4 custom-scrollbar">
          {NAVIGATION.map((item) => (
            <div
              key={item.label}
              className="border-2 border-black rounded-xl bg-white shadow-[3px_3px_0px_rgba(0,0,0,0.1)] overflow-hidden"
            >
              {item.subItems ? (
                <>
                  <div className="px-5 py-4 bg-white border-b border-black/10">
                    <span className="font-bold text-lg text-slate-900 block">
                      {item.label}
                    </span>
                  </div>
                  <div className="px-5 py-4 flex flex-col gap-3.5 bg-white">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.label}
                        to={subItem.href || "#"}
                        onClick={() => setIsOpen(false)}
                        className="group flex items-center gap-3 text-slate-600 font-semibold text-[15px] hover:text-blue-600 transition-colors"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 group-hover:scale-125 transition-transform" />
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  to={item.href || "#"}
                  onClick={() => setIsOpen(false)}
                  className="block w-full px-5 py-4 font-bold text-lg text-slate-900 hover:bg-slate-50 transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="mt-auto pt-6 border-t-2 border-black">
          {!isAuthenticated ? (
            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/auth/sign-in"
                className="w-full"
                onClick={() => setIsOpen(false)}
              >
                <button className="w-full h-12 rounded-xl border-2 border-black font-black text-base bg-white text-slate-900 shadow-[3px_3px_0px_black] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transition-all">
                  Đăng nhập
                </button>
              </Link>
              <Link
                to="/auth/sign-up"
                className="w-full"
                onClick={() => setIsOpen(false)}
              >
                <button className="w-full h-12 rounded-xl border-2 border-black font-black text-base bg-blue-600 text-white shadow-[3px_3px_0px_black] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transition-all">
                  Đăng ký
                </button>
              </Link>
            </div>
          ) : user ? (
            <div className="space-y-3">
              <div className="px-4 py-3 bg-blue-50 border-2 border-black rounded-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-600 border-2 border-black flex items-center justify-center text-white font-black overflow-hidden">
                  {user.picture ? (
                    <img
                      src={user.picture}
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span>{user.name?.charAt(0)?.toUpperCase() || "U"}</span>
                  )}
                </div>
                <div className="overflow-hidden">
                  <p className="font-black text-sm text-slate-900 truncate" title={user.name}>
                    {user.name}
                  </p>
                  <p className="text-xs font-bold text-slate-600 truncate" title={user.email}>
                    {user.email}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Link to="/profile" onClick={() => setIsOpen(false)}>
                  <button className="w-full h-11 rounded-lg border-2 border-black bg-white font-bold text-sm shadow-[2px_2px_0px_black] active:shadow-none active:translate-y-[2px] transition-all">
                    Cá nhân
                  </button>
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsOpen(false);
                  }}
                  className="w-full h-11 rounded-lg border-2 border-black bg-red-100 text-red-700 font-bold text-sm shadow-[2px_2px_0px_black] active:shadow-none active:translate-y-[2px] transition-all"
                >
                  Đăng xuất
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </SheetOverlay>
    </nav>
  );
};

// Helper Icon
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