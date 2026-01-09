import {
  useState,
  useRef,
  useEffect,
  useMemo,
  memo,
  useCallback,
} from "react";
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

// Gọi Groq REST API với system prompt + dữ liệu đã khai báo
const callGroqAPI = async (
  userMessage: string,
  chatHistory: Message[]
): Promise<string> => {
  if (!GROQ_API_KEY) {
    return "❌ Lỗi: Chưa cấu hình Groq API Key.";
  }

  try {
    const fullSystemInstruction = `
${SYSTEM_INSTRUCTION}

=== DỮ LIỆU HỆ THỐNG ===
${SYSTEM_DATA}
========================
`;

    const history = chatHistory
      .filter((msg) => msg.id !== "welcome")
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

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      import.meta.env.DEV && console.error("Groq HTTP error:", errorData);
      throw new Error(
        (errorData as any)?.error?.message ||
          `HTTP error! status: ${response.status}`
      );
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;
    return text || "Xin lỗi, mình không thể phản hồi tin nhắn này.";
  } catch (error: any) {
    import.meta.env.DEV && console.error("Groq API error:", error);
    return `❌ Lỗi kết nối: ${error.message || "Không thể kết nối với API"}`;
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

    const currentMessages = messages;
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const botContent = await callGroqAPI(input, currentMessages);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: botContent,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      import.meta.env.DEV && console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [input, isAuthenticated, messages, navigate]);

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

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
