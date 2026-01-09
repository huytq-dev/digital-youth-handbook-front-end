import { Suspense, lazy, type ReactNode } from "react";

import { Provider } from "react-redux";
import { BrowserRouter, useLocation } from "react-router-dom";
import { ROUTE_PATH } from "@/routes/routePath";

import { store } from "@/redux/store";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { LoadingProvider } from "@/contexts/loading-context";
import { MenuProvider } from "@/contexts/menu-context";

const LazyGroqChatbot = lazy(() =>
  import("@/components/chatbot/groq-chatbot").then((mod) => ({
    default: mod.GroqChatbot,
  }))
);

interface ProvidersProps {
  children: ReactNode;
}

// Component wrapper: hide chatbot on auth / profile / quiz game & result pages
const ChatbotWrapper = () => {
  const location = useLocation();
  const path = location.pathname;
  const isAuthPage = path.startsWith(ROUTE_PATH.AUTH.SIGN_IN.split("/auth")[0] + "/auth");
  const isProfilePage = path === ROUTE_PATH.PROFILE;
  const isQuizGamePage = path.startsWith(ROUTE_PATH.QUIZ.INDEX) && path.includes("/game");
  const isQuizResultPage = path.startsWith(ROUTE_PATH.QUIZ.INDEX) && path.includes("/result");

  const shouldHide = isAuthPage || isProfilePage || isQuizGamePage || isQuizResultPage;

  // No useMemo needed for JSX; return directly or null.
  if (shouldHide) return null;

  return (
    <Suspense fallback={null}>
      <LazyGroqChatbot />
    </Suspense>
  );
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
