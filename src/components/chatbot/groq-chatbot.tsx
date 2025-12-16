import { useState, useRef, useEffect, useMemo, memo, useCallback } from "react";
import type { KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { Send, Bot, X, Loader2, LogIn } from "lucide-react";
import { GROQ_API_KEY } from "@/config";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../features/auth/auth.slice";
import { useNavigate } from "react-router-dom";
import { useMenu } from "@/contexts/menu-context";
import { SYSTEM_DATA, SYSTEM_INSTRUCTION } from "./ai-instruction";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MessageRole = "user" | "bot";

interface Message {
  id: string;
  type: MessageRole;
  content: string;
  timestamp: Date;
}

// Simple toxicity detection for Vietnamese profanity commonly used in chat
const TOXIC_PATTERNS = [
  /dm\b/i,
  /dmm\b/i,
  /địt mẹ/i,
  /d?mẹ mày/i,
  /con mẹ mày/i,
  /cmm\b/i,
  /fuck/i,
];

const TOXIC_RESPONSES = [
  "Chúng mình cùng giữ gìn sự trong sáng của Tiếng Việt và môi trường văn minh nhé! Bạn có thắc mắc gì về bài học không? 🌱",
  "Lời nói chẳng mất tiền mua, lựa lời mà nói cho vừa lòng nhau. Mình quay lại chủ đề chính nha! 😊",
  "Mình là trợ lý học tập nên xin phép không phản hồi các từ ngữ này ạ. Chúng ta nói về Lý tưởng cách mạng nhé? 🇻🇳",
];

const isToxicMessage = (text: string) =>
  TOXIC_PATTERNS.some((pattern) => pattern.test(text));

const getToxicResponse = () =>
  TOXIC_RESPONSES[Math.floor(Math.random() * TOXIC_RESPONSES.length)];

// Limit how many prior exchanges we send to Groq to save tokens and speed up responses
const MAX_HISTORY_MESSAGES = 10;

// --- CẤU HÌNH RATE LIMIT (Burst Rate Limiting) ---
const RATE_LIMIT_WINDOW = 10000; // Cửa sổ thời gian: 10 giây
const MAX_MSG_IN_WINDOW = 3; // Tối đa 3 tin nhắn trong cửa sổ trên
const COOLDOWN_TIME = 5000; // Nếu vi phạm, phạt chờ: 5 giây

// Gọi Groq REST API với system prompt + dữ liệu đã khai báo
const callGroqAPI = async (
  userMessage: string,
  chatHistory: Message[]
): Promise<string> => {
  if (!GROQ_API_KEY) {
    console.error("❌ Missing API Key: GROQ_API_KEY chưa được cấu hình.");
    return "⚠️ Hệ thống đang cập nhật. Vui lòng liên hệ Admin.";
  }

  try {
    const fullSystemInstruction = `
${SYSTEM_INSTRUCTION}

=== DỮ LIỆU HỆ THỐNG ===
${SYSTEM_DATA}
========================
`;

    // Giữ logic lọc history như cũ
    const history = chatHistory
      .filter((msg) => msg.id !== "welcome")
      .slice(-MAX_HISTORY_MESSAGES)
      .map((msg) => ({
        role: msg.type === "user" ? "user" : "assistant",
        content: msg.content,
      }));

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          temperature: 0.3,
          max_tokens: 1000,
          top_p: 1,
          messages: [
            { role: "system", content: fullSystemInstruction },
            ...history,
            { role: "user", content: userMessage },
          ],
        }),
      }
    );

    // --- XỬ LÝ LỖI CHI TIẾT ---
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({})); // Parse JSON an toàn

      // 1. Log chi tiết ra console cho Developer
      console.group("🚨 GROQ API ERROR REPORT");
      console.error("Status:", response.status, response.statusText);
      console.error("Headers:", Object.fromEntries(response.headers.entries()));
      console.error("Error Body:", errorData);
      console.groupEnd();

      // 2. Trả về thông báo thân thiện cho User
      // Lỗi 429: Rate Limit (Quá tải)
      if (response.status === 429) {
        const errorMsg = errorData?.error?.message || "";
        // Trích xuất số giây từ thông báo tiếng Anh của Groq (vd: "Please try again in 18.09s")
        const waitTimeMatch = errorMsg.match(/try again in (\d+(\.\d+)?)s/);
        const waitTime = waitTimeMatch ? Math.ceil(parseFloat(waitTimeMatch[1])) : "vài";
        
        return `⏳ Hệ thống đang quá tải. Bạn vui lòng đợi **${waitTime} giây** nữa rồi thử lại nhé!`;
      }

      // Lỗi 401: Sai Key
      if (response.status === 401) {
        return "🔒 Lỗi xác thực hệ thống.";
      }

      // Lỗi 500+: Server Groq lỗi
      if (response.status >= 500) {
        return "🤖 Máy chủ AI đang bảo trì hoặc gặp sự cố. Vui lòng thử lại sau ít phút.";
      }

      // Các lỗi khác
      return `⚠️ Đã có lỗi xảy ra (${response.status}). Vui lòng thử lại sau.`;
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;
    return text || "🤔 Xin lỗi, mình chưa nghĩ ra câu trả lời. Bạn hỏi lại nhé?";

  } catch (error: any) {
    // Lỗi mạng (Network Error, Offline, DNS...)
    console.error("🌐 NETWORK/UNEXPECTED ERROR:", error);

    if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
      return "📡 Không có kết nối mạng. Vui lòng kiểm tra internet của bạn.";
    }

    return `⚠️ Lỗi hệ thống: ${error.message}`;
  }
};

const MessageBubble = memo(
  ({ msg, markdownComponents }: { msg: Message; markdownComponents: any }) => {
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
            {msg.type === "bot" ? (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={markdownComponents}
              >
                {msg.content}
              </ReactMarkdown>
            ) : (
              <p className="whitespace-pre-wrap">{msg.content}</p>
            )}
          </div>
        </div>
      </div>
    );
  }
);
MessageBubble.displayName = "MessageBubble";

export const GroqChatbot = () => {
  console.log("[GroqChatbot] Component rendered");
  
  const [isOpen, setIsOpenState] = useState(false);
  
  // Wrapper để log mọi lần setIsOpen được gọi
  const setIsOpen = useCallback((value: boolean | ((prev: boolean) => boolean)) => {
    const stack = new Error().stack;
    console.log(`[GroqChatbot] setIsOpen(${typeof value === 'function' ? 'function' : value}) called`, stack?.split('\n').slice(1, 4).join('\n'));
    setIsOpenState(value);
  }, []);
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

  // --- STATE CHO RATE LIMIT ---
  const [msgCount, setMsgCount] = useState(0);
  const [windowStart, setWindowStart] = useState(Date.now());
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(0); // Để hiển thị đếm ngược UI

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  const { isMenuOpen } = useMenu();

  console.log("[GroqChatbot] State:", { isOpen, isMenuOpen, isMobileDevice, isAuthenticated });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    setIsMobileDevice(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobileDevice(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

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

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, [messages, isOpen]);

  // --- EFFECT ĐẾM NGƯỢC COOLDOWN ---
  useEffect(() => {
    if (!cooldownUntil) return;

    const interval = setInterval(() => {
      const remaining = Math.ceil((cooldownUntil - Date.now()) / 1000);
      if (remaining <= 0) {
        setCooldownUntil(null);
        setMsgCount(0); // Reset lại khi hết phạt
        setWindowStart(Date.now()); // Reset window
        setTimeLeft(0);
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [cooldownUntil]);

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
    // 1. Kiểm tra input rỗng
    if (!input.trim()) return;

    // 2. Kiểm tra đang bị phạt Cooldown không
    if (cooldownUntil && Date.now() < cooldownUntil) {
      return; // Chặn không cho gửi
    }

    // 3. Kiểm tra đang loading request cũ không
    if (isLoading) return;

    const sanitizedInput = input.trim();

    if (!isAuthenticated) {
      setInput("");
      setIsOpen(false);
      navigate("/auth/sign-in");
      return;
    }

    // --- LOGIC RATE LIMIT START ---
    const now = Date.now();
    let shouldBlock = false;

    // Nếu đã qua cửa sổ 10s -> Reset đếm lại từ đầu
    if (now - windowStart > RATE_LIMIT_WINDOW) {
      setWindowStart(now);
      setMsgCount(1);
    } else {
      // Nếu vẫn trong cửa sổ 10s -> Tăng biến đếm
      const newCount = msgCount + 1;
      setMsgCount(newCount);

      // Nếu vượt quá giới hạn -> Kích hoạt Cooldown
      if (newCount > MAX_MSG_IN_WINDOW) {
        const cooldownEnd = now + COOLDOWN_TIME;
        setCooldownUntil(cooldownEnd);
        setTimeLeft(COOLDOWN_TIME / 1000);

        // Thêm tin nhắn cảnh báo ảo vào chat
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            type: "bot",
            content: "⏳ Bạn chat nhanh quá! Nghỉ tay 5 giây nhé...",
            timestamp: new Date(),
          },
        ]);
        shouldBlock = true; // Đánh dấu để chặn
      }
    }

    // Nếu bị chặn do rate limit, dừng lại không gọi API
    if (shouldBlock) {
      return;
    }
    // --- LOGIC RATE LIMIT END ---

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: sanitizedInput,
      timestamp: new Date(),
    };

    const currentMessages = messages;
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Handle toxic messages locally following SYSTEM_INSTRUCTION instead of calling Groq
    if (isToxicMessage(sanitizedInput)) {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: getToxicResponse(),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      return;
    }

    setIsLoading(true);

    try {
      const botContent = await callGroqAPI(sanitizedInput, currentMessages);

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
  }, [
    input,
    isAuthenticated,
    messages,
    navigate,
    isLoading,
    cooldownUntil,
    msgCount,
    windowStart,
  ]);

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const shouldShowButton = !isOpen && !isMenuOpen;
  console.log("[GroqChatbot] shouldShowButton:", shouldShowButton, "- isOpen:", isOpen, "- isMenuOpen:", isMenuOpen);

  return createPortal(
    <>
      <AnimatePresence>
        {shouldShowButton && (
          <motion.button
            initial={{ scale: 0, opacity: 0, rotate: -180 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0, rotate: 180 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            // FIX 1: Tắt hover trên mobile để nhạy hơn
            whileHover={isMobileDevice ? undefined : { scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              // FIX 2: Ngăn chặn lan truyền sự kiện nếu cần
              e.stopPropagation();
              console.log("[GroqChatbot] ✅ open button clicked - setting isOpen to true");
              setIsOpen(true);
            }}
            onMouseEnter={() => console.log("[GroqChatbot] Button hovered")}
            id="gemini-chatbot-trigger"
            // FIX 3: Thêm touch-action-manipulation để trình duyệt không delay click
            style={{ touchAction: "manipulation" }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[99999] flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full border-2 border-black bg-blue-600 text-white shadow-[4px_4px_0px_black] hover:bg-blue-700 hover:shadow-[2px_2px_0px_black] transition-colors"
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
                // Mobile: Fullscreen
                "inset-0 h-[100dvh] w-full rounded-none border-0",
                // Desktop: Floating window
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
                    !isAuthenticated
                      ? "Vui lòng đăng nhập..."
                      : cooldownUntil
                      ? `Đợi ${timeLeft}s để chat tiếp...`
                      : isLoading
                      ? "AI đang trả lời..."
                      : "Nhập câu hỏi..."
                  }
                  className={cn(
                    "flex-1 rounded-lg border-2 px-3 py-2 text-base sm:text-sm outline-none transition-all",
                    cooldownUntil
                      ? "bg-red-50 text-red-500 border-red-300"
                      : "border-black bg-slate-50 focus:bg-white focus:shadow-[2px_2px_0px_black]"
                  )}
                  disabled={isLoading || !isAuthenticated || !!cooldownUntil}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !input.trim() || !!cooldownUntil}
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-2 border-black transition-all",
                    cooldownUntil
                      ? "bg-slate-300 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-[2px_2px_0px_black] disabled:opacity-50"
                  )}
                >
                  {cooldownUntil ? (
                    <span className="text-xs font-bold">{timeLeft}</span>
                  ) : (
                    <Send size={16} />
                  )}
                </button>
              </div>
              {/* Hiển thị text cảnh báo nhỏ nếu cần */}
              {cooldownUntil && (
                <p className="text-[10px] text-red-500 mt-1 text-center font-medium">
                  Bạn đang gửi quá nhanh. Vui lòng chờ giây lát.
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>,
    document.body
  );
};
