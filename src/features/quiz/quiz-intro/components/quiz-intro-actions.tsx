import { Play, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface QuizIntroActionsProps {
  onStart: () => void;
}

export const QuizIntroActions = ({ onStart }: QuizIntroActionsProps) => {
  const navigate = useNavigate();

  return (
    <div className="mb-10 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between font-sans">
      
      {/* --- NÚT QUAY LẠI (Secondary) --- */}
      <button
        onClick={() => navigate("/quizzes")}
        className="group flex w-full items-center justify-center gap-2 rounded-xl border-2 border-black bg-white px-6 py-3 text-base font-black uppercase text-slate-900 shadow-[4px_4px_0px_black] transition-all hover:bg-slate-50 hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0px_black] active:translate-y-1 active:translate-x-1 active:shadow-none sm:w-auto"
      >
        <ArrowLeft size={20} strokeWidth={3} className="transition-transform group-hover:-translate-x-1" />
        Quay lại
      </button>

      {/* --- NÚT BẮT ĐẦU (Primary) --- */}
      <button
        onClick={onStart}
        className="group flex w-full flex-1 items-center justify-center gap-3 rounded-xl border-2 border-black bg-yellow-400 px-8 py-4 text-xl font-black uppercase text-black shadow-[4px_4px_0px_black] transition-all hover:bg-yellow-500 hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0px_black] active:translate-y-1 active:translate-x-1 active:shadow-none sm:w-auto sm:flex-none"
      >
        Bắt đầu làm bài
        {/* Giữ lại animation rung lắc nhẹ cho icon Play để thu hút sự chú ý */}
        <motion.div
            animate={{ x: [0, 3, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", repeatDelay: 1 }}
        >
            <Play size={28} strokeWidth={3} fill="black" />
        </motion.div>
      </button>
    </div>
  );
};