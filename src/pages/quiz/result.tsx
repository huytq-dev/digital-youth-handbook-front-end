import { useNavigate } from "react-router-dom";
import { UnifiedHeader } from "@/components/layout/unified-header";
import { useAppSelector } from "@/redux/hooks";
import type { RootState } from "@/redux/store";
import { Trophy, Frown, Home, RotateCcw, Target } from "lucide-react";
import type { QuizResultData } from "@/features/quiz/quiz.type";
import { useEffect, useState } from "react";

// --- CUSTOM HOOK: Hiệu ứng tăng số ---
const useCountUp = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = currentTime - startTime;

      // Tính toán tỷ lệ hoàn thành (0 -> 1)
      const percentage = Math.min(progress / duration, 1);

      // Hàm Easing (easeOutQuart): Chạy nhanh lúc đầu, chậm dần lúc cuối
      const ease = 1 - Math.pow(1 - percentage, 4);

      setCount(Math.floor(ease * end));

      if (progress < duration) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [end, duration]);

  return count;
};

// Hàm helper tạo thông điệp
const getResultMessage = (isPassed: boolean, score: number) => {
  if (isPassed) {
    if (score === 100) return "TUYỆT ĐỐI! KHÔNG CÒN GÌ ĐỂ CHÊ! 💯";
    if (score >= 90) return "QUÁ ĐỈNH! BẠN LÀ MỘT NGÔI SAO! 🌟";
    if (score >= 80) return "LÀM TỐT LẮM! GIỮ VỮNG PHONG ĐỘ NHÉ! 🔥";
    return "CHÚC MỪNG! BẠN ĐÃ VƯỢT QUA! 🚀";
  } else {
    if (score >= 40) return "SUÝT SOÁT RỒI! CỐ GẮNG THÊM CHÚT NỮA! 💪";
    if (score > 0) return "ĐỪNG NẢN CHÍ! THẤT BẠI LÀ MẸ THÀNH CÔNG! 🛡️";
    return "KHỞI ĐẦU NAN! THỬ LẠI LẦN NỮA NHÉ! 🎯";
  }
};

const QuizResultPageWrapper = () => {
  const navigate = useNavigate();
  const quizResponse = useAppSelector((state: RootState) => state.quiz.quizResult);

  // --- TRÍCH XUẤT DỮ LIỆU ---
  const resultData: QuizResultData | null = (quizResponse as any)?.data || quizResponse || null;

  // Gọi Hook để lấy giá trị số đang chạy (duration 2s)
  // Lưu ý: Nếu resultData null thì mặc định là 0
  const animatedScore = useCountUp(resultData?.totalScore || 0, 2000);

  // Style chung Neo-Brutalism
  const cardStyle =
    "bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-xl overflow-hidden";

  const buttonBaseStyle = `
    flex items-center justify-center gap-2 px-6 py-4 
    font-black uppercase tracking-wider text-sm 
    border-2 border-black rounded-lg 
    shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
    transition-all duration-200 
    hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
    active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
  `;

  // --- MÀN HÌNH CHỜ / KHÔNG DỮ LIỆU ---
  if (!resultData || !resultData.attemptId) {
    return (
      <>
        <UnifiedHeader />
        <main className="min-h-screen bg-[#FDF6E3] flex items-center justify-center p-4 pt-20">
          <div className={`${cardStyle} max-w-md w-full p-8 text-center`}>
            <div className="mb-6 flex justify-center">
              <div className="bg-slate-200 p-6 rounded-full border-2 border-black">
                <Target size={48} className="text-slate-500" />
              </div>
            </div>
            <h2 className="text-2xl font-black uppercase mb-4">Chưa có dữ liệu</h2>
            <p className="font-bold text-slate-600 mb-8 text-lg">
              Có vẻ như bạn chưa làm bài nào.
            </p>
            <button
              onClick={() => navigate("/quizzes")}
              className={`${buttonBaseStyle} w-full bg-[#FFDE00] text-black`}
            >
              <Home size={20} />
              Về danh sách Quiz
            </button>
          </div>
        </main>
      </>
    );
  }

  // --- RENDER GIAO DIỆN CHÍNH ---
  const { isPassed, totalScore, attemptId } = resultData;
  const statusColor = isPassed ? "bg-[#A3E635]" : "bg-[#FF8888]";
  
  // Icon
  const statusIcon = isPassed ? (
    <Trophy size={32} className="text-black" strokeWidth={2.5} />
  ) : (
    <Frown size={32} className="text-black" strokeWidth={2.5} />
  );
  
  // Message
  const message = getResultMessage(isPassed, totalScore);

  return (
    <>
      <UnifiedHeader />
      <main className="min-h-screen bg-[#FDF6E3] pb-24 pt-32 font-sans text-slate-900 flex justify-center items-start">
        <div className="w-full max-w-xl px-4">
          <div className={cardStyle}>
            {/* Header Banner */}
            <div
              className={`${statusColor} border-b-4 border-black p-8 text-center relative overflow-hidden`}
            >
              <div
                className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(black 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                }}
              ></div>

              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="bg-white border-2 border-black p-4 rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  {statusIcon}
                </div>

                <h1 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter text-black bg-white px-4 py-1 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-[-1deg]">
                  {message}
                </h1>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-8 bg-white">
              <div className="flex flex-col items-center mb-10">
                <span className="text-sm font-black uppercase tracking-widest text-slate-500 mb-2">
                  Tổng điểm của bạn
                </span>
                
                {/* PHẦN HIỂN THỊ ĐIỂM SỐ ĐÃ ANIMATION */}
                <div className="relative">
                  {/* Lớp bóng mờ bên dưới */}
                  <span className="absolute top-1 left-1 text-8xl font-black text-slate-300 select-none blur-[1px]">
                    {animatedScore}%
                  </span>
                  
                  {/* Lớp chữ chính bên trên */}
                  <span className="relative text-8xl font-black text-black z-10">
                    {animatedScore}
                    <span className="text-4xl align-top">%</span>
                  </span>
                </div>
                
              </div>

              <div className="mb-8 grid grid-cols-1 gap-4">
                <div className="border-2 border-black bg-slate-50 p-4 rounded-lg flex flex-col items-start shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                  <span className="text-xs font-black uppercase bg-black text-white px-2 py-0.5 rounded-sm mb-2">
                    Attempt ID
                  </span>
                  <p className="font-mono text-xs md:text-sm text-slate-700 break-all">{attemptId}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate("/quizzes")}
                  className={`${buttonBaseStyle} flex-1 bg-white text-black hover:bg-slate-50`}
                >
                  <Home size={18} />
                  Về Trang Chủ
                </button>

                <button
                  onClick={() => navigate(0)} // Reload
                  className={`${buttonBaseStyle} flex-1 bg-[#67E8F9] text-black hover:bg-[#A5F3FC]`}
                >
                  <RotateCcw size={18} />
                  Làm Lại Ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default QuizResultPageWrapper;