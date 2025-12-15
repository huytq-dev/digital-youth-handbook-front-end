import { useState, useRef, useEffect, useMemo, memo, useCallback } from "react";
import { createPortal } from "react-dom";
import { Send, Bot, X, Loader2, LogIn } from "lucide-react";
import { GEMINI_API_KEY, GEMINI_MODEL } from "@/config";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@/features/auth/auth.slice";
import { useNavigate } from "react-router-dom";
import { useMenu } from "@/contexts/menu-context";
import { SYSTEM_DATA, SYSTEM_INSTRUCTION } from "./gemini-instruction";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

// --- 1. ĐƯA HÀM API RA NGOÀI (Tránh khởi tạo lại mỗi lần render) ---
const callGeminiAPI = async (
  userMessage: string,
  chatHistory: Message[]
): Promise<string> => {
  if (!GEMINI_API_KEY) {
    return "❌ Lỗi: Chưa cấu hình Gemini API Key.";
  }

  try {
    // 1. Chuẩn bị Dữ liệu (Context) và Luật (Instruction)
    // Gộp SYSTEM_DATA vào System Instruction để Bot "học thuộc lòng" ngay từ đầu
    const fullSystemInstruction = `
${SYSTEM_INSTRUCTION}

=== DỮ LIỆU HỆ THỐNG ===
${SYSTEM_DATA}
========================
`;

    // 2. Chuẩn bị Lịch sử Chat (History)
    // Chuyển đổi state 'messages' của React thành format của Gemini API
    // Bỏ qua tin nhắn welcome mặc định ban đầu để tránh Bot chào lại
    const history = chatHistory
      .filter((msg) => msg.id !== "welcome") // Lọc bỏ tin chào mặc định
      .map((msg) => ({
        role: msg.type === "user" ? "user" : "model", // Gemini dùng 'model' thay vì 'bot'
        parts: [{ text: msg.content }],
      }));

    // 3. Tạo Payload gửi đi
    // Gồm: Lịch sử cũ + Câu hỏi mới nhất của user
    const apiContents = [
      ...history,
      {
        role: "user",
        parts: [{ text: userMessage }],
      },
    ];

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: apiContents, // Gửi cả lịch sử
        systemInstruction: {
          parts: [{ text: fullSystemInstruction }], // Luật + Kiến thức bài học
        },
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.3,
        },
        // Cấu hình an toàn - Bộ lọc nội dung
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT", // Quấy rối
            threshold: "BLOCK_LOW_AND_ABOVE", // Chặn ngay từ mức thấp
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH", // Ngôn từ thù ghét
            threshold: "BLOCK_LOW_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", // Khiêu dâm
            threshold: "BLOCK_LOW_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT", // Nguy hiểm
            threshold: "BLOCK_LOW_AND_ABOVE",
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error?.message || `HTTP error! status: ${response.status}`
      );
    }

    const data = await response.json();

    // KIỂM TRA NẾU BỊ CHẶN (Finish Reason)
    // Nếu Gemini từ chối trả lời vì vi phạm chính sách an toàn
    if (data.candidates?.[0]?.finishReason === "SAFETY") {
      return "⚠️ Nội dung tin nhắn của bạn có chứa từ ngữ không phù hợp với tiêu chuẩn cộng đồng. Vui lòng sử dụng ngôn từ văn minh hơn nhé! 🛡️";
    }

    // Lấy text từ response
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    return text || "Xin lỗi, mình không thể phản hồi tin nhắn này.";
  } catch (error: any) {
    console.error("Gemini API error:", error);
    return `❌ Lỗi kết nối: ${error.message || "Không thể kết nối với API"}`;
  }
};

// --- 2. TÁCH COMPONENT MESSAGE ITEM & DÙNG MEMO (Quan trọng nhất để tối ưu render) ---
// Component này chỉ render lại khi props 'msg' thay đổi
const MessageBubble = memo(
  ({
    msg,
    markdownComponents,
  }: {
    msg: Message;
    markdownComponents: any;
  }) => {
    return (
      <div
        className={cn(
          "flex gap-2",
          msg.type === "user" ? "justify-end" : "justify-start"
        )}
      >
        {msg.type === "bot" && (
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black bg-blue-100">
            <Bot size={16} className="text-blue-600" />
          </div>
        )}
        <div
          className={cn(
            "max-w-[85%] sm:max-w-[80%] rounded-lg px-3 py-2 text-sm border border-black shadow-[2px_2px_0px_rgba(0,0,0,0.1)]",
            msg.type === "user"
              ? "bg-blue-600 text-white rounded-br-none"
              : "bg-white text-slate-900 rounded-bl-none"
          )}
        >
          <div className="text-sm break-words">
            {/* Chỉ render Markdown nếu là tin nhắn của BOT */}
            {msg.type === "bot" ? (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={markdownComponents}
              >
                {msg.content}
              </ReactMarkdown>
            ) : (
              /* Tin nhắn của USER thì giữ nguyên text thường */
              <p className="whitespace-pre-wrap">{msg.content}</p>
            )}
          </div>
        </div>
      </div>
    );
  }
);

MessageBubble.displayName = "MessageBubble";

export const GeminiChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "bot",
      content:
        "Xin chào! 👋 Tôi là trợ lý AI của Hành Trang Số. Tôi có thể giúp gì cho bạn về ứng dụng, bài học hoặc các cuộc thi?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  const { isMenuOpen } = useMenu();

  // --- 3. TỐI ƯU DETECT MOBILE (Dùng matchMedia thay vì resize event) ---
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    setIsMobileDevice(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobileDevice(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // --- 4. TỐI ƯU MARKDOWN COMPONENTS (Dùng useMemo) ---
  // Giúp ReactMarkdown không phải tạo lại object components mỗi lần render
  const markdownComponents = useMemo(
    () => ({
      p: ({ children }: any) => (
        <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>
      ),
      strong: ({ children }: any) => (
        <span className="font-bold text-blue-700">{children}</span>
      ),
      ul: ({ children }: any) => (
        <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>
      ),
      ol: ({ children }: any) => (
        <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>
      ),
      li: ({ children }: any) => <li className="pl-1">{children}</li>,
      a: ({ href, children }: any) => (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800"
        >
          {children}
        </a>
      ),
    }),
    []
  );

  // Auto scroll - Dùng requestAnimationFrame mượt hơn setTimeout
  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, [messages, isOpen]);

  // Lock scroll on mobile
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

  const handleSendMessage = useCallback(async () => {
    if (!input.trim()) return;

    if (!isAuthenticated) {
      setInput("");
      setIsOpen(false);
      navigate("/auth/sign-in");
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    // Lưu messages hiện tại trước khi thêm userMessage
    const currentMessages = messages;
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Truyền messages cũ (chưa có userMessage) vào hàm
      const botContent = await callGeminiAPI(input, currentMessages);

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
  }, [input, isAuthenticated, messages, navigate]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Render logic (Conditional rendering sớm để giảm tải)
  if (isMobileDevice) {
    return null;
  }

  return createPortal(
    <>
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

      <AnimatePresence>
        {isOpen && (
          <motion.div
            style={{
              transformOrigin: isMobileDevice
                ? "bottom center"
                : "bottom right",
            }}
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
            className={cn(
              "fixed z-[10002] flex flex-col bg-white overflow-hidden",
              "inset-0 h-[100dvh] w-full rounded-none border-0",
              "sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[500px] sm:w-[350px] sm:rounded-xl sm:border-2 sm:border-black sm:shadow-[8px_8px_0px_black]"
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

            {/* Chat Content */}
            <div className="flex-1 flex flex-col overflow-y-auto bg-slate-50 min-h-0">
              <div className="flex-1 p-4 space-y-3">
                {!isAuthenticated ? (
                  <div className="flex flex-col items-center justify-center h-full gap-4 py-8">
                    <div className="p-4 rounded-full bg-blue-100 border-2 border-blue-600">
                      <LogIn size={32} className="text-blue-600" />
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-slate-900 mb-1">
                        Vui lòng đăng nhập
                      </p>
                      <p className="text-sm text-slate-600">
                        Để sử dụng trợ lý AI
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        navigate("/auth/sign-in");
                      }}
                      className="mt-4 px-6 py-2 bg-blue-600 text-white font-bold rounded-lg border-2 border-black shadow-[2px_2px_0px_black] hover:bg-blue-700 transition-all"
                    >
                      Đăng nhập ngay
                    </button>
                  </div>
                ) : (
                  <>
                    {messages.map((msg) => (
                      <MessageBubble
                        key={msg.id}
                        msg={msg}
                        markdownComponents={markdownComponents}
                      />
                    ))}
                    {isLoading && (
                      <div className="flex gap-2 items-center">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black bg-blue-100">
                          <Bot size={16} className="text-blue-600" />
                        </div>
                        <div className="bg-white border border-black rounded-lg rounded-bl-none px-3 py-2 shadow-sm">
                          <Loader2
                            size={16}
                            className="animate-spin text-blue-600"
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}
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
                  placeholder={
                    isAuthenticated
                      ? "Nhập câu hỏi..."
                      : "Vui lòng đăng nhập..."
                  }
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