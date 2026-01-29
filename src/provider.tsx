import { Suspense, lazy, type ReactNode, useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, useLocation } from "react-router-dom";
import { ROUTE_PATH } from "@/routes/routePath";

import { store } from "@/redux/store";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { LoadingProvider } from "@/contexts/loading-context";
import { MenuProvider } from "@/contexts/menu-context";

// --- Lazy Load Chatbot ---
const LazyGroqChatbot = lazy(() =>
  import("@/components/chatbot/groq-chatbot").then((mod) => ({
    default: mod.GroqChatbot,
  }))
);

interface ProvidersProps {
  children: ReactNode;
}

const VISIT_TRACK_KEY = "webstats:tracked";
// Định nghĩa cứng URL API ở đây
const TRACKING_API_URL = "https://tuoitreonline.runasp.net/api/webstats/track";

// --- Component: Chatbot Wrapper ---
const ChatbotWrapper = () => {
  const location = useLocation();
  const path = location.pathname;
  
  const isAuthPage = path.startsWith(ROUTE_PATH.AUTH.SIGN_IN.split("/auth")[0] + "/auth");
  const isProfilePage = path === ROUTE_PATH.PROFILE;
  const isQuizGamePage = path.startsWith(ROUTE_PATH.QUIZ.INDEX) && path.includes("/game");
  const isQuizResultPage = path.startsWith(ROUTE_PATH.QUIZ.INDEX) && path.includes("/result");

  const shouldHide = isAuthPage || isProfilePage || isQuizGamePage || isQuizResultPage;

  if (shouldHide) return null;

  return (
    <Suspense fallback={null}>
      <LazyGroqChatbot />
    </Suspense>
  );
};

// --- Component: Visit Tracker (Gọi API trực tiếp bằng fetch) ---
const VisitTracker = () => {
  const didTrack = useRef(false);

  useEffect(() => {
    // 1. Kiểm tra môi trường
    if (typeof window === "undefined") return;

    // 2. Chặn StrictMode chạy 2 lần
    if (didTrack.current) return;

    // 3. Kiểm tra Session Storage
    if (sessionStorage.getItem(VISIT_TRACK_KEY)) return;

    // 4. Đánh dấu đã chạy và lưu session ngay lập tức
    didTrack.current = true;
    sessionStorage.setItem(VISIT_TRACK_KEY, "1");
    
    // 5. Gọi API trực tiếp bằng fetch (Hardcode)
    const callTrackingApi = async () => {
      try {
        const response = await fetch(TRACKING_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // Nếu API cần body thì thêm vào đây, hiện tại là void nên để trống
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Backend trả 200 OK không có body
        console.log("📈 Visit tracked via Fetch.");

      } catch (error) {
        console.error("❌ Tracking error:", error);
        // Tùy chọn: Nếu lỗi thì xóa session để lần sau thử lại?
        // sessionStorage.removeItem(VISIT_TRACK_KEY); 
      }
    };

    callTrackingApi();
      
  }, []); // Empty dependency array: chỉ chạy 1 lần khi mount

  return null;
};

// --- Main Providers ---
export const Providers = ({ children }: ProvidersProps) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider defaultTheme="light" storageKey="digi-transport-theme">
          <LoadingProvider>
            <MenuProvider>
              {children}
              
              <VisitTracker /> 
              
              <Toaster />
              <ChatbotWrapper />
            </MenuProvider>
          </LoadingProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};
