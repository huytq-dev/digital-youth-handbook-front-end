import { useState, useRef, useEffect } from "react";
import { Send, Bot, X, Loader2 } from "lucide-react"; // Đảm bảo đã import Bot
import { GEMINI_API_KEY, GEMINI_MODEL } from "@/config";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { GoogleGenAI } from "@google/genai";

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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const callGeminiAPI = async (userMessage: string): Promise<string> => {
    if (!GEMINI_API_KEY) {
      return "❌ Lỗi: Chưa cấu hình Gemini API Key. Vui lòng thêm VITE_GEMINI_API_KEY vào file .env";
    }

    try {
      const ai = new GoogleGenAI({
        apiKey: GEMINI_API_KEY,
      });

      const systemPrompt = "Bạn là trợ lý thông minh cho ứng dụng Hành Trang. Trả lời ngắn gọn, hữu ích, bằng tiếng Việt.";

      // Kết hợp system prompt với message
      const fullMessage = `${systemPrompt}\n\nNguời dùng: ${userMessage}`;

      const response = await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: fullMessage,
      });

      // Truy cập text từ response - text là property, không phải method
      const botMessage = response.text || "Xin lỗi, tôi không thể xử lý yêu cầu của bạn.";
      return botMessage;
    } catch (error: any) {
      console.error("Gemini API error:", error);
      return `❌ Lỗi: ${error.message}`;
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

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

  return (
    <>
      {/* Floating Button (Robot Head) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            // Animation xuất hiện/biến mất của nút
            initial={{ scale: 0, opacity: 0, rotate: -180 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0, rotate: 180 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-40 flex h-16 w-16 items-center justify-center rounded-full border-2 border-black bg-blue-600 text-white shadow-[4px_4px_0px_black] hover:bg-blue-700 hover:shadow-[2px_2px_0px_black] transition-colors"
          >
            {/* Thay MessageCircle bằng Bot */}
            <Bot size={32} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window (Robot Body Unfolding) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            // Key logic: transformOrigin đặt ở góc dưới phải để "mọc" ra từ nút
            style={{ transformOrigin: "bottom right" }}
            
            // Animation mở bụng
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            
            // Hiệu ứng lò xo (bouncy)
            transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 25 
            }}
            
            className="fixed bottom-6 right-6 z-40 h-[500px] w-[350px] flex flex-col rounded-xl border-2 border-black bg-white shadow-[8px_8px_0px_black] overflow-hidden"
          >
            {/* Header */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-between border-b-2 border-black bg-blue-600 px-4 py-3"
            >
              <div className="flex items-center gap-2">
                <div className="bg-white p-1 rounded-full border border-black">
                    <Bot size={20} className="text-blue-600" />
                </div>
                <span className="font-bold text-white">Trợ lý AI</span>
              </div>
              <motion.button
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="rounded-full bg-blue-500 p-1 hover:bg-blue-400 transition-colors border border-transparent hover:border-black"
              >
                <X size={18} className="text-white" />
              </motion.button>
            </motion.div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto space-y-3 p-4 bg-slate-50">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: msg.type === "user" ? 20 : -20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
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
                      "max-w-[80%] rounded-lg px-3 py-2 text-sm border border-black shadow-[2px_2px_0px_rgba(0,0,0,0.1)]",
                      msg.type === "user"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-white text-slate-900 rounded-bl-none"
                    )}
                  >
                    <p className="whitespace-pre-wrap break-words">
                      {msg.content}
                    </p>
                    <span className={cn("text-[10px] mt-1 block", msg.type === "user" ? "text-blue-100" : "text-slate-400")}>
                      {msg.timestamp.toLocaleTimeString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex gap-2 items-center"
                >
                   <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black bg-blue-100">
                      <Bot size={16} className="text-blue-600" />
                    </div>
                  <div className="bg-white border border-black rounded-lg rounded-bl-none px-3 py-2 shadow-sm">
                    <Loader2 size={16} className="animate-spin text-blue-600" />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t-2 border-black bg-white p-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Nhập câu hỏi..."
                  className="flex-1 rounded-lg border-2 border-black px-3 py-2 text-sm outline-none focus:shadow-[2px_2px_0px_black] transition-all bg-slate-50 focus:bg-white"
                  disabled={isLoading}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  disabled={isLoading || !input.trim()}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-black bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 transition-all hover:shadow-[2px_2px_0px_black]"
                >
                  <Send size={16} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};