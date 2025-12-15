import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Send, Bot, X, Loader2, LogIn } from "lucide-react";
import { GEMINI_API_KEY, GEMINI_MODEL } from "@/config";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { GoogleGenAI } from "@google/genai";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@/features/auth/auth.slice";
import { useNavigate } from "react-router-dom";
import { useMenu } from "@/contexts/menu-context";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

export const GeminiChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "bot",
      content:
        "Xin chào! 👋 Tôi là chatbot trợ lý của Hành Trang Số. Có điều gì tôi có thể giúp bạn?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Lấy trạng thái đăng nhập
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  const { isMenuOpen } = useMenu();

  // Detect mobile/tablet device
  useEffect(() => {
    const checkDevice = () => {
      setIsMobileDevice(window.innerWidth < 640);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // Auto scroll to bottom với delay để layout kịp render
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [messages, isOpen]);

  // [UX Mobile] Khóa cuộn trang web nền khi mở chat trên mobile
  useEffect(() => {
    if (isOpen && isMobileDevice) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen, isMobileDevice]);

  const callGeminiAPI = async (userMessage: string): Promise<string> => {
    if (!GEMINI_API_KEY) {
      return "❌ Lỗi: Chưa cấu hình Gemini API Key.";
    }

    try {
      const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
      const systemPrompt = "Bạn là trợ lý thông minh cho ứng dụng Hành Trang. Trả lời ngắn gọn, hữu ích, bằng tiếng Việt.";
      const fullMessage = `${systemPrompt}\n\nNguời dùng: ${userMessage}`;
      const response = await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: fullMessage,
      });
      return response.text || "Xin lỗi, tôi không thể xử lý yêu cầu của bạn.";
    } catch (error: any) {
      console.error("Gemini API error:", error);
      return `❌ Lỗi: ${error.message}`;
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    if (!isAuthenticated) {
      setInput("");
      setIsOpen(false); // Đóng chat trên mobile để chuyển trang mượt hơn
      navigate("/auth/sign-in");
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const botContent = await callGeminiAPI(input);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: botContent,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Ẩn chatbot hoàn toàn trên mobile
  if (isMobileDevice) {
    return null;
  }

  // Sử dụng Portal để render chatbot ra ngoài DOM tree, trực tiếp vào document.body
  // Điều này đảm bảo position: fixed hoạt động đúng (không bị ảnh hưởng bởi parent transforms)
  return createPortal(
    <>
      {/* Floating Button - Ẩn khi menu mở */}
      <AnimatePresence>
        {!isOpen && !isMenuOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0, rotate: -180 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0, rotate: 180 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            id="gemini-chatbot-trigger"
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[10002] flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full border-2 border-black bg-blue-600 text-white shadow-[4px_4px_0px_black] hover:bg-blue-700 hover:shadow-[2px_2px_0px_black] transition-colors"
          >
            <Bot size={32} className="w-6 h-6 sm:w-8 sm:h-8" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            style={{ transformOrigin: isMobileDevice ? "bottom center" : "bottom right" }}
            // Mobile/Tablet: Slide up animation (tránh lỗi scale: 0)
            // Desktop: Scale animation (giữ nguyên hiệu ứng cũ)
            initial={
              isMobileDevice
                ? { opacity: 0, y: 100, scale: 0.95 }
                : { opacity: 0, scale: 0 }
            }
            animate={
              isMobileDevice
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 1, scale: 1 }
            }
            exit={
              isMobileDevice
                ? { opacity: 0, y: 100, scale: 0.95 }
                : { opacity: 0, scale: 0 }
            }
            transition={
              isMobileDevice
                ? { duration: 0.3, ease: "easeOut" }
                : { type: "spring", stiffness: 300, damping: 25 }
            }
            // FIX: Tăng z-index lên z-[10002] để cao hơn menu (z-[10000] và z-[10001])
            className={cn(
              "fixed z-[10002] flex flex-col bg-white overflow-hidden",
              "inset-0 h-[100dvh] w-full rounded-none border-0", // Mobile
              "sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[500px] sm:w-[350px] sm:rounded-xl sm:border-2 sm:border-black sm:shadow-[8px_8px_0px_black]" // Desktop
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b-2 border-black bg-blue-600 px-4 py-3 shrink-0">
              <div className="flex items-center gap-2">
                <div className="bg-white p-1 rounded-full border border-black">
                  <Bot size={20} className="text-blue-600" />
                </div>
                <span className="font-bold text-white">Trợ lý AI</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full bg-blue-500 p-1 hover:bg-blue-400 transition-colors border border-transparent hover:border-black"
              >
                <X size={18} className="text-white" />
              </button>
            </div>

            {/* Messages Container - Sửa lỗi scroll với min-h-0 */}
            <div className="flex-1 flex flex-col overflow-y-auto bg-slate-50 min-h-0">
              <div className="flex-1 p-4 space-y-3">
                {!isAuthenticated ? (
                  <div className="flex flex-col items-center justify-center h-full gap-4 py-8">
                  <div className="p-4 rounded-full bg-blue-100 border-2 border-blue-600">
                    <LogIn size={32} className="text-blue-600" />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-slate-900 mb-1">Vui lòng đăng nhập</p>
                    <p className="text-sm text-slate-600">Để sử dụng trợ lý AI</p>
                  </div>
                  <button
                    onClick={() => { setIsOpen(false); navigate("/auth/sign-in"); }}
                    className="mt-4 px-6 py-2 bg-blue-600 text-white font-bold rounded-lg border-2 border-black shadow-[2px_2px_0px_black] hover:bg-blue-700 transition-all"
                  >
                    Đăng nhập ngay
                  </button>
                </div>
              ) : (

                <>
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn("flex gap-2", msg.type === "user" ? "justify-end" : "justify-start")}
                    >
                      {msg.type === "bot" && (
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black bg-blue-100">
                          <Bot size={16} className="text-blue-600" />
                        </div>
                      )}
                      <div
                        className={cn(
                          "max-w-[85%] sm:max-w-[80%] rounded-lg px-3 py-2 text-sm border border-black shadow-[2px_2px_0px_rgba(0,0,0,0.1)]",
                          msg.type === "user" ? "bg-blue-600 text-white rounded-br-none" : "bg-white text-slate-900 rounded-bl-none"
                        )}
                      >
                        <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-2 items-center">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black bg-blue-100">
                         <Bot size={16} className="text-blue-600" />
                      </div>
                      <div className="bg-white border border-black rounded-lg rounded-bl-none px-3 py-2 shadow-sm">
                        <Loader2 size={16} className="animate-spin text-blue-600" />
                      </div>
                    </div>
                  )}
                </>
              )}
              {/* Dummy div để scroll xuống cuối */}
              <div ref={messagesEndRef} />
            </div>
          </div>

            {/* Input */}
            <div className="border-t-2 border-black bg-white p-3 shrink-0 safe-area-bottom">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={isAuthenticated ? "Nhập câu hỏi..." : "Vui lòng đăng nhập..."}
                  className="flex-1 rounded-lg border-2 border-black px-3 py-2 text-base sm:text-sm outline-none focus:shadow-[2px_2px_0px_black] transition-all bg-slate-50 focus:bg-white disabled:opacity-50"
                  disabled={isLoading || !isAuthenticated}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !input.trim()}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-2 border-black bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 transition-all hover:shadow-[2px_2px_0px_black]"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>,
    document.body
  );
};