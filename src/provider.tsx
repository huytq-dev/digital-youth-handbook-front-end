import type { ReactNode } from "react";

import { Provider } from "react-redux";
import { BrowserRouter, useLocation } from "react-router-dom";

import { store } from "@/redux/store";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { LoadingProvider } from "@/contexts/loading-context";
import { MenuProvider } from "@/contexts/menu-context";
import { GeminiChatbot } from "@/components/chatbot/gemini-chatbot";

interface ProvidersProps {
  children: ReactNode;
}

// Component wrapper để check route và ẩn chatbot trên trang auth và profile
const ChatbotWrapper = () => {
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith("/auth");
  const isProfilePage = location.pathname === "/profile";
  
  if (isAuthPage || isProfilePage) return null;
  
  return <GeminiChatbot />;
};

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider defaultTheme="light" storageKey="digi-transport-theme">
          <LoadingProvider>
            <MenuProvider>
              {children}
              <Toaster />
              <ChatbotWrapper />
            </MenuProvider>
          </LoadingProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};


