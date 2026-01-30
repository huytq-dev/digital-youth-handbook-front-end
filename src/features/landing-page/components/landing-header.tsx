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
  ArrowRight
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
import { useMenu } from "@/contexts/menu-context";
import headerImage from "@/assets/landing-images/header.png";
import headerImageMobile from "@/assets/landing-images/header_mobile.png";

// --- Types & Navigation Data ---
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
      { label: "Phòng ngừa bạo lực & xâm hại", href: "/learning-topics/phong-ngua-bao-luc-xam-hai" },
      { label: "Chuyển đổi số", href: "/learning-topics/chuyen-doi-so" },
    ],
  },
  { label: "Vinh danh", href: "/honor" },
  { label: "Thi hay", href: "/quizzes" },
  { label: "Điều em muốn nói", href: "/#" },
];

// --- Sub-components ---

// 1. SHEET OVERLAY - ĐÃ TỐI ƯU LOGIC
interface SheetOverlayProps {
  isOpen: boolean;
  isMobile: boolean;
  onClose: () => void;
  children: ReactNode;
}

const SheetOverlay = memo(
  ({ isOpen, isMobile, onClose, children }: SheetOverlayProps) => {
    // Animation variants tách biệt để quản lý dễ hơn
    const variants = {
      overlay: {
        open: { opacity: 1 },
        closed: { opacity: 0 },
      },
      drawer: {
        open: { x: 0 },
        closed: { x: "100%" },
      },
    };

    // Mobile dùng tween (nhẹ), PC dùng spring (nảy)
    const drawerTransition = isMobile
      ? { type: "tween" as const, ease: "circOut" as const, duration: 0.3 }
      : { type: "spring" as const, damping: 30, stiffness: 300, mass: 0.8 };

    return (
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            {/* Backdrop Layer */}
            <motion.div
              key="overlay"
              initial="closed"
              animate="open"
              exit="closed"
              variants={variants.overlay}
              transition={{ duration: 0.2 }}
              className={cn(
                "fixed inset-0 z-[10000] cursor-pointer", // cursor-pointer để user biết bấm vào đây sẽ đóng
                isMobile ? "bg-black/40" : "bg-black/40 backdrop-blur-md"
              )}
              onClick={onClose}
            />

            {/* Drawer Layer */}
            <motion.div
              key="drawer"
              initial="closed"
              animate="open"
              exit="closed"
              variants={variants.drawer}
              transition={drawerTransition}
              className="fixed inset-y-0 right-0 h-[100dvh] w-full sm:w-[400px] border-l-4 border-black shadow-[-10px_0px_20px_rgba(0,0,0,0.3)] flex flex-col z-[10001]"
              style={{
                background: isMobile
                  ? "rgba(255, 249, 240, 1)"
                  : "rgba(255, 249, 240, 0.95)",
                ...(isMobile
                  ? {}
                  : {
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                  }),
              }}
              // Ngăn chặn nổi bọt sự kiện click từ drawer ra overlay (tránh đóng nhầm khi bấm vào menu)
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-yellow-400 to-red-500 z-10" />
              <div className="flex h-full flex-col overflow-hidden px-6 py-6 relative z-0">
                {children}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }
);
SheetOverlay.displayName = "SheetOverlay";

// 2. NAV LINK BUTTON
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

// 3. USER PROFILE DROPDOWN
interface UserProfileDropdownProps {
  user: UserDomainModel;
  onSignOut: () => void;
}
const UserProfileDropdown = memo(
  ({ user, onSignOut }: UserProfileDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
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
    const displayName = user.name?.trim().split(" ").pop() || user.name;
    return (
      <div className="relative">
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
          <div className="hidden flex-col text-left sm:flex">
            <span className="text-[10px] font-bold text-slate-500 uppercase leading-none">
              Xin chào
            </span>
            <span
              className="text-sm font-black text-slate-900 leading-none max-w-[120px] truncate"
              title={user.name}
            >
              {displayName}
            </span>
          </div>
          <ChevronDown
            size={16}
            strokeWidth={3}
            className={cn(
              "ml-1 text-slate-900 transition-transform duration-200",
              isOpen ? "rotate-180" : "rotate-0"
            )}
          />
        </button>
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
              <div className="border-b-2 border-black bg-yellow-300 px-4 py-2.5">
                <p className="text-[10px] font-bold text-slate-800 uppercase tracking-wider">
                  Tài khoản của bạn
                </p>
                <p
                  className="text-xs font-black text-slate-900 truncate"
                  title={user.username}
                >
                  {user.username}
                </p>
              </div>
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

// 4. MOBILE ITEMS
const MobileMenuItem = ({ item, onClose }: { item: NavItem; onClose: () => void }) => {
  return (
    <div className="mb-3 last:mb-0">
      <div className="relative z-10 bg-white border-2 border-black rounded-xl shadow-[3px_3px_0px_rgba(0,0,0,0.1)] overflow-hidden group">
        {item.subItems ? (
          item.href ? (
            <Link
              to={item.href}
              onClick={onClose}
              className="block px-4 py-2.5 bg-yellow-300 border-b-2 border-black hover:bg-yellow-400 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-black" />
              <span className="font-black text-base text-slate-900 uppercase tracking-wide flex-1">
                {item.label}
              </span>
              <ArrowRight size={16} />
            </Link>
          ) : (
            <div className="px-4 py-2.5 bg-yellow-300 border-b-2 border-black flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-black" />
              <span className="font-black text-base text-slate-900 uppercase tracking-wide">
                {item.label}
              </span>
            </div>
          )
        ) : (
          <Link
            to={item.href || "#"}
            onClick={onClose}
            className="block px-4 py-2.5 bg-white hover:bg-yellow-50 transition-colors font-black text-base text-slate-900 flex items-center justify-between"
          >
            {item.label}
            <ArrowRight size={16} />
          </Link>
        )}
        {item.subItems && (
          <div className="bg-white p-1.5">
            <div className="flex flex-col gap-0.5">
              {item.subItems.map((subItem) => (
                <Link
                  key={subItem.label}
                  to={subItem.href || "#"}
                  onClick={onClose}
                  className="group/sub flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 transition-all border border-transparent hover:border-black/10"
                >
                  <div className="w-6 flex justify-center">
                    <div className="w-1 h-1 rounded-full bg-slate-300 group-hover/sub:bg-blue-600 group-hover/sub:scale-125 transition-all" />
                  </div>
                  <span className="font-bold text-slate-600 group-hover/sub:text-blue-700 text-sm">
                    {subItem.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const MobileUserCard = ({ user, onSignOut, onClose }: { user: any, onSignOut: any, onClose: any }) => (
  <div className="bg-white border-2 border-black rounded-xl p-4 shadow-[3px_3px_0px_black] relative overflow-hidden mt-4">
    <div className="absolute top-0 left-0 w-full h-14 bg-blue-600 border-b-2 border-black" />
    <div className="absolute top-2 right-2 flex gap-1">
      <div className="w-1.5 h-1.5 rounded-full bg-red-500 border border-black" />
      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 border border-black" />
      <div className="w-1.5 h-1.5 rounded-full bg-green-500 border border-black" />
    </div>
    <div className="relative flex flex-col items-center mt-6">
      <div className="w-14 h-14 rounded-xl border-2 border-black bg-white p-0.5 mb-2 shadow-sm">
        <div className="w-full h-full rounded-lg bg-gray-200 overflow-hidden">
          {user.picture ? (
            <img src={user.picture} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-black text-lg text-slate-400">
              {user.name?.charAt(0)}
            </div>
          )}
        </div>
      </div>

      <h3 className="font-black text-base text-slate-900">{user.name}</h3>
      <p className="font-bold text-xs text-slate-500 mb-3">@{user.username}</p>
      <div className="grid grid-cols-2 gap-2 w-full">
        <Link to="/profile" onClick={onClose}>
          <button className="w-full py-1.5 bg-yellow-300 border-2 border-black rounded-lg font-bold text-sm shadow-[2px_2px_0px_black] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all">
            Hồ sơ
          </button>
        </Link>
        <button
          onClick={() => { onSignOut(); onClose(); }}
          className="w-full py-1.5 bg-red-100 text-red-700 border-2 border-black rounded-lg font-bold text-sm shadow-[2px_2px_0px_black] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all"
        >
          Đăng xuất
        </button>
      </div>
    </div>
  </div>
);

// --- MAIN COMPONENT ---
export const LandingHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [signOut] = useSignOutMutation();
  const dispatch = useDispatch();
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const { setIsMenuOpen } = useMenu();
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // Sync menu state
  useEffect(() => {
    setIsMenuOpen(isOpen);
  }, [isOpen, setIsMenuOpen]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle body scroll lock - Fixed logic
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  const handleSignOut = useCallback(async () => {
    try {
      if (user?.id) {
        await signOut({ userId: user.id }).unwrap();
      }
    } catch (error) {
      import.meta.env.DEV && console.error("Logout API error:", error);
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
          : "bg-transparent py-2 sm:py-3 lg:py-4 border-b-4 border-transparent"
      )}
      style={{
        background: scrolled ? undefined : "transparent",
        backdropFilter: scrolled ? undefined : "none",
        WebkitBackdropFilter: scrolled ? undefined : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12 sm:h-14 lg:h-16">
          {/* Logo Section */}
          <Link
            to="/"
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group select-none flex-shrink-0"
          >
            <div className="relative">
              <div className="bg-blue-600 w-9 sm:w-10 lg:w-11 h-9 sm:h-10 lg:h-11 rounded-lg border-2 border-black flex items-center justify-center text-white shadow-[2px_2px_0px_black] sm:shadow-[3px_3px_0px_black] group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-none transition-all">
                <Star
                  fill="currentColor"
                  size={18}
                  className={cn(
                    "sm:w-5 sm:h-5 lg:w-6 lg:h-6 transition-transform duration-500",
                    shouldReduceMotion || isMobile
                      ? ""
                      : "group-hover:rotate-180"
                  )}
                />
              </div>
              <div className="absolute -top-1 -right-1 bg-red-500 w-2 sm:w-2.5 lg:w-3 h-2 sm:h-2.5 lg:h-3 rounded-full border-2 border-black" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-sm sm:text-base lg:text-xl leading-none text-blue-600 tracking-tight">
                HÀNH TRANG SỐ
              </span>
              <span className="text-[7px] sm:text-[9px] lg:text-[10px] font-black text-white bg-orange-500 px-1 py-0.5 border border-black rounded-sm tracking-widest uppercase mt-0.5 lg:mt-1 w-fit rotate-[-2deg] group-hover:rotate-0 transition-transform">
                Khát Vọng
              </span>
            </div>
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAVIGATION.map((item) => (
              <NavLinkBtn key={item.label} item={item} />
            ))}
          </div>
          {/* Right Side: Auth Buttons or User Avatar */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4">
            {!isAuthenticated ? (
              <>
                <Link to="/auth/sign-in">
                  <button className="h-10 xl:h-11 px-4 xl:px-6 rounded-lg font-black text-xs xl:text-base border-2 border-black bg-white text-slate-900 shadow-[4px_4px_0px_black] transition-all hover:bg-slate-50 hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0px_black] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none flex items-center justify-center">
                    Đăng nhập
                  </button>
                </Link>
                <Link to="/auth/sign-up">
                  <button className="h-10 xl:h-11 px-4 xl:px-6 bg-blue-600 text-white font-black text-xs xl:text-base border-2 border-black rounded-lg shadow-[4px_4px_0px_black] transition-all hover:bg-blue-700 hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0px_black] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none flex items-center gap-1 xl:gap-2 justify-center">
                    Đăng ký <ArrowRight className="w-3 h-3 xl:w-4 xl:h-4" />
                  </button>
                </Link>
              </>
            ) : user ? (
              <UserProfileDropdown user={user} onSignOut={handleSignOut} />
            ) : null}
          </div>
          {/* Mobile/Tablet Toggle Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(true)}
              className="border-2 border-black bg-white shadow-[2px_2px_0px_black] hover:translate-y-0.5 hover:shadow-none transition-all active:bg-gray-100 w-9 h-9 sm:w-10 sm:h-10"
            >
              <Menu size={20} strokeWidth={2.5} className="sm:w-6 sm:h-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* MOBILE SHEET CONTENT */}
      <SheetOverlay
        isOpen={isOpen}
        isMobile={isMobile}
        onClose={() => setIsOpen(false)}
      >
        <div className="flex items-center justify-between mb-5 pb-3 border-b-2 border-black border-dashed">
          <div className="bg-orange-500 text-white px-3 py-1 border-2 border-black shadow-[2px_2px_0px_black] rotate-[-2deg]">
            <span className="font-black text-lg tracking-wider">MENU</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="bg-red-500 text-white border-2 border-black hover:bg-red-600 hover:text-white shadow-[2px_2px_0px_black] active:shadow-none active:translate-y-[2px] active:translate-x-[2px] transition-all rounded-lg w-8 h-8"
          >
            <X size={20} strokeWidth={3} />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto pr-1 pb-4 custom-scrollbar">
          <div className="flex flex-col">
            {NAVIGATION.map((item) => (
              <MobileMenuItem key={item.label} item={item} onClose={() => setIsOpen(false)} />
            ))}
          </div>
        </div>
        <div className="mt-2">
          {!isAuthenticated ? (
            <div className="flex flex-col gap-3 pt-4 border-t-2 border-black border-dashed">
              <p className="text-center font-bold text-slate-500 text-xs">Tham gia cùng cộng đồng Gen Z!</p>
              <div className="grid grid-cols-2 gap-2">
                <Link to="/auth/sign-in" onClick={() => setIsOpen(false)}>
                  <button className="w-full h-10 rounded-lg border-2 border-black bg-white font-black text-sm shadow-[4px_4px_0px_black] transition-all hover:bg-gray-50 active:translate-y-[4px] active:translate-x-[4px] active:shadow-none">
                    Đăng nhập
                  </button>
                </Link>
                <Link to="/auth/sign-up" onClick={() => setIsOpen(false)}>
                  <button className="w-full h-10 rounded-lg border-2 border-black bg-blue-600 text-white font-black text-sm shadow-[4px_4px_0px_black] transition-all hover:bg-blue-700 active:translate-y-[4px] active:translate-x-[4px] active:shadow-none">
                    Đăng ký
                  </button>
                </Link>
              </div>
            </div>
          ) : user ? (
            <MobileUserCard user={user} onSignOut={handleSignOut} onClose={() => setIsOpen(false)} />
          ) : null}
        </div>
      </SheetOverlay>
    </nav>
  );
};

// --- HERO BANNER COMPONENT ---
export const LandingHeroBanner = () => {
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const reduceMotion = shouldReduceMotion || isMobile;
  return (
    <section
      // Đã thêm items-center để căn giữa dọc nội dung trên mobile
      className="relative w-full min-h-[45vh] sm:min-h-[55vh] md:min-h-[70vh] overflow-hidden flex items-center justify-center"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <picture className="block w-full h-full">
          <source media="(min-width: 768px)" srcSet={headerImage} />
          <img
            src={headerImageMobile}
            alt="Background"
            className="w-full h-full object-cover"
          />
        </picture>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/30 via-transparent to-blue-500/40" />
        <div className="absolute inset-0 bg-[#87CEEB]/60" />
      </div>

      {/* Cloud Decorations */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {/* (Bạn có thể thêm code mây ở đây nếu cần) */}
      </div>

      {/* Content */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center gap-4 z-10 w-full"
        >
          {/* DÒNG 1: HỘP VÀNG */}
          <motion.div
            initial={reduceMotion ? false : { scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.4 }}
            className="relative transform -rotate-1 hover:rotate-0 transition-transform duration-300 w-full px-2"
          >
            <div
              className="bg-[#FDE047] border-[3px] md:border-4 border-black px-3 py-2 sm:px-6 sm:py-2 md:px-8 md:py-3 rounded-xl"
              style={{
                boxShadow: "6px 6px 0px #FDE047",
              }}
            >
              <h1 className="text-4xl sm:text-3xl md:text-5xl lg:text-7xl font-black text-slate-900 leading-tight sm:leading-none uppercase tracking-tight break-words overflow-wrap-anywhere">
                Hành Trang Số
              </h1>
            </div>
            <div className="absolute -top-2 -left-2 text-white hidden sm:block">
              <Sparkles size={24} className="fill-white stroke-black stroke-2" />
            </div>
          </motion.div>
          {/* DÒNG 2: TEXT - NHÍ NHẢNH VỚI NEOBRUTALISM */}
          <div className="flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-3 gap-y-2 mt-3 px-3 sm:px-4">
            {(() => {
              const text = "Cho Thanh Thiếu Niên Trong Thời Đại Mới";
              const words = text.split(" ");
              const neobrutalismColors = [
                { bg: "#2563EB", text: "#ffffff", border: "#000000", shadow: "#1e40af" },
                { bg: "#f97316", text: "#ffffff", border: "#000000", shadow: "#ea580c" },
                { bg: "#ef4444", text: "#ffffff", border: "#000000", shadow: "#dc2626" },
                { bg: "#22c55e", text: "#ffffff", border: "#000000", shadow: "#16a34a" },
                { bg: "#a855f7", text: "#ffffff", border: "#000000", shadow: "#9333ea" },
                { bg: "#ec4899", text: "#ffffff", border: "#000000", shadow: "#db2777" },
                { bg: "#06b6d4", text: "#ffffff", border: "#000000", shadow: "#0891b2" },
                { bg: "#14b8a6", text: "#ffffff", border: "#000000", shadow: "#0f766e" },
                { bg: "#f43f5e", text: "#ffffff", border: "#000000", shadow: "#be123c" },
                { bg: "#6366f1", text: "#ffffff", border: "#000000", shadow: "#4338ca" },
              ];

              return words.map((word, idx) => {
                const color = neobrutalismColors[idx % neobrutalismColors.length];
                return (
                  <motion.span
                    key={idx}
                    initial={
                      reduceMotion
                        ? { opacity: 1, y: 0, scale: 1, rotate: 0 }
                        : { opacity: 0, y: 20, scale: 0.8 }
                    }
                    animate={
                      reduceMotion
                        ? { opacity: 1 }
                        : {
                          opacity: 1,
                          y: [0, -8, 0],
                          scale: [1, 1.05, 1],
                          rotate: [0, -2, 2, -1, 1, 0],
                        }
                    }
                    transition={{
                      opacity: { duration: 0.5, delay: 0.6 + idx * 0.1 },
                      y: reduceMotion
                        ? undefined
                        : {
                          duration: 2.5,
                          repeat: Infinity,
                          delay: 1.2 + idx * 0.15,
                          ease: "easeInOut",
                        },
                      scale: reduceMotion
                        ? undefined
                        : {
                          duration: 2,
                          repeat: Infinity,
                          delay: 1.2 + idx * 0.15,
                          ease: "easeInOut",
                        },
                      rotate: reduceMotion
                        ? undefined
                        : {
                          duration: 3,
                          repeat: Infinity,
                          delay: 1.2 + idx * 0.15,
                          ease: "easeInOut",
                        },
                    }}
                    className="inline-block px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border-2 font-black uppercase tracking-wide text-base sm:text-lg md:text-2xl lg:text-3xl"
                    style={{
                      backgroundColor: color.bg,
                      color: color.text,
                      borderColor: color.border,
                      borderWidth: "3px",
                      boxShadow: `4px 4px 0px ${color.shadow}`,
                      fontFamily: "\"Baloo 2\", cursive",
                      textShadow: "none",
                    }}
                  >
                    {word}
                  </motion.span>
                );
              });
            })()}
          </div>
        </motion.div>
      </div>
    </section>
  );
};