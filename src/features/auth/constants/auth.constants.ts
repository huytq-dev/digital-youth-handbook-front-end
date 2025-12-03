import { cn } from "@/lib/utils";

// --- ANIMATION VARIANTS ---
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

// Animation rung lắc khi lỗi
export const shakeVariants = {
  idle: { x: 0 },
  error: {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.4 },
  },
};

// Icon animation variants
export const iconVariants = {
  // Sử dụng muted-foreground cho trạng thái thường
  initial: { scale: 1, color: "hsl(var(--muted-foreground))" },
  // Sử dụng primary (Youth Blue) cho trạng thái focus
  focus: { scale: 1.1, color: "hsl(var(--primary))" },
};

// [UPDATE] Page Transition Variants - Cartoonish Style với Direction
// direction = 1: Đi tới (Login -> Signup)
// direction = -1: Đi lùi (Signup -> Login)
export const pageTransitionVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%", // Nếu đi tới thì vào từ phải, đi lùi thì vào từ trái
    opacity: 0,
    scale: 0.8, // Thêm scale nhẹ để tạo cảm giác "nảy" ra
    rotate: direction > 0 ? 5 : -5, // Nghiêng nhẹ cho giống hoạt hình
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300, // Lò xo cứng
      damping: 25, // Giảm rung chấn nhanh
      mass: 1,
    },
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? "100%" : "-100%", // Logic ngược lại khi thoát
    opacity: 0,
    scale: 0.8,
    rotate: direction < 0 ? 5 : -5,
    transition: {
      duration: 0.3,
      ease: "easeInOut" as const,
    },
  }),
};

// --- STYLING CLASSES ---
// Sử dụng CSS variables từ global.css
export const LABEL_CLASSES =
  "text-xs font-bold text-[hsl(var(--muted-foreground))] uppercase tracking-wider pl-1";

// Style Input Dynamic: Thay đổi dựa trên trạng thái lỗi
// Sử dụng CSS variables từ global.css
export const getInputClasses = (hasError: boolean) =>
  cn(
    // Base styles
    "rounded-xl transition-all duration-300 pl-10 h-12 border",
    "placeholder:text-[hsl(var(--muted-foreground))]/50",
    "focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none",

    // Normal State
    !hasError && [
      // Background & Border: Sử dụng background/50 để có hiệu ứng kính nhẹ
      "bg-[hsl(var(--background))]/50 border-[hsl(var(--input))]", // Sử dụng CSS variables từ global.css
      "text-[hsl(var(--foreground))]",

      // Hover state: Ám xanh nhẹ khi hover
      "hover:bg-[hsl(var(--accent))]/50 hover:border-[hsl(var(--primary))]/30",

      // Focus state: Viền Primary (Blue), nền sáng hơn, shadow nhẹ
      "focus:border-[hsl(var(--primary))] focus:bg-[hsl(var(--background))] focus:shadow-md focus:shadow-[hsl(var(--primary))]/10",
      "focus:text-[hsl(var(--foreground))]",
    ],

    // Error State
    hasError && [
      // Sử dụng biến --destructive (đỏ) từ global.css
      "bg-[hsl(var(--destructive))]/5 border-[hsl(var(--destructive))]",
      "text-[hsl(var(--destructive))] placeholder:text-[hsl(var(--destructive))]/40",

      // Focus state khi lỗi
      "focus:border-[hsl(var(--destructive))] focus:ring-1 focus:ring-[hsl(var(--destructive))]/30",
    ]
  );

