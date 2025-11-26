import type { ReactNode } from "react";

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: "light" | "dark";
  storageKey?: string;
}

export const ThemeProvider = ({
  children,
}: ThemeProviderProps) => {
  // Simple passthrough for now. You can extend with real theme logic later.
  return <>{children}</>;
};


