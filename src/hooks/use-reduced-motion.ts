import { useEffect, useState } from "react";

/**
 * Hook to detect if user prefers reduced motion or is on mobile device
 * Returns true if animations should be reduced/disabled
 */
export function useReducedMotion(): boolean {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion media query
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    
    // Check if device is mobile (screen width < 768px or touch device)
    const isMobile = 
      window.innerWidth < 768 || 
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) ||
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);

    const checkReducedMotion = () => {
      setShouldReduceMotion(mediaQuery.matches || isMobile);
    };

    // Initial check
    checkReducedMotion();

    // Listen for changes
    mediaQuery.addEventListener("change", checkReducedMotion);
    window.addEventListener("resize", checkReducedMotion);

    return () => {
      mediaQuery.removeEventListener("change", checkReducedMotion);
      window.removeEventListener("resize", checkReducedMotion);
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

