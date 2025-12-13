import type { ReactNode } from "react";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { store } from "@/redux/store";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { LoadingProvider } from "@/contexts/loading-context";
import { GeminiChatbot } from "@/components/chatbot/gemini-chatbot";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider defaultTheme="light" storageKey="digi-transport-theme">
          <LoadingProvider>
            {children}
            <Toaster />
            <GeminiChatbot />
          </LoadingProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};


