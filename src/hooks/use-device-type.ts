import { useState, useEffect } from "react";

export const useDeviceType = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind's md breakpoint
    };

    // Check on mount
    checkIsMobile();

    // Add listener for window resize
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return {
    isMobile,
    isDesktop: !isMobile,
  };
};
