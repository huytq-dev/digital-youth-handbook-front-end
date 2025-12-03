import { useEffect, useState } from "react";

/**
 * Hook to detect if user prefers reduced motion (accessibility setting).
 * Returns true if animations should be reduced/disabled.
 *
 * KHÔNG còn tự động tắt animation chỉ vì thiết bị/màn hình nhỏ.
 */
export function useReducedMotion(): boolean {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const checkReducedMotion = () => {
      setShouldReduceMotion(mediaQuery.matches);
    };

    // Initial check
    checkReducedMotion();

    // Listen for accessibility changes
    mediaQuery.addEventListener("change", checkReducedMotion);

    return () => {
      mediaQuery.removeEventListener("change", checkReducedMotion);
    };
  }, []);

  return shouldReduceMotion;
}

/**
 * Hook to detect if device is mobile
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) ||
        ("ontouchstart" in window || navigator.maxTouchPoints > 0)
      );
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return isMobile;
}

