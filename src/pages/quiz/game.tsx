import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import type { RootState } from "@/redux/store";
import { AlertTriangle, Home, Clock, ChevronRight, ChevronLeft, X, ArrowLeft } from "lucide-react"; 
import { cn } from "@/lib/utils";
import { useSubmitQuizMutation } from "@/features/quiz/quiz.api";
import { isApiResponseSuccess } from "@/features/common/common.type";
import { selectAnswer, submitAttempt } from "@/features/quiz/quiz.slice";

// Style chung cho button
const buttonBaseStyle = `
  inline-flex items-center justify-center gap-2 
  px-8 py-4 mt-6
  font-black uppercase tracking-wider text-sm 
  border-2 border-black rounded-lg 
  bg-[#FFDE00] text-black
  shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
  transition-all duration-200 
  hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-[#FFE550]
  active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
`;

const QuizGamePageWrapper = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [submitQuiz] = useSubmitQuizMutation();
  
  // 1. GIỮ NGUYÊN CÁCH FETCH DATA HIỆN TẠI
  const currentAttempt = useAppSelector((state: RootState) => state.quiz.currentAttempt);

  const totalDuration = (currentAttempt?.timeLimitMinutes || 5) * 60; // Lấy từ API
  const [secondsLeft, setSecondsLeft] = useState(totalDuration);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [showSubmitConfirmModal, setShowSubmitConfirmModal] = useState(false);

  // Hàm xử lý chọn đáp án
  const handleSelectAnswer = (optionId: string) => {
    if (!currentAttempt) return;
    const currentQuestion = currentAttempt.questions[currentQuestionIndex];
    dispatch(selectAnswer({
      questionId: currentQuestion.id,
      selectedOptionId: optionId,
    }));
  };

  // Hàm xử lý khi user cố gắng quay lại (về trang quiz)
  const handleNavigateBack = () => {
    setShowExitModal(true);
  };

  // Hàm xử lý nộp bài (thực tế gọi API)
  const handleSubmitQuiz = async () => {
    if (!currentAttempt) return;
    
    setIsSubmitting(true);
    setShowSubmitConfirmModal(false); // Đóng modal xác nhận
    try {
      const response = await submitQuiz({
        attemptId: currentAttempt.attemptId,
        answers: currentAttempt.answers,
      }).unwrap();

      if (isApiResponseSuccess(response) && response.data) {
        dispatch(submitAttempt({
          attemptId: response.data.attemptId,
          totalScore: response.data.totalScore,
          isPassed: response.data.isPassed,
          totalQuestions: currentAttempt.questions.length,
          answeredQuestions: currentAttempt.answers.length,
          completedAt: new Date(),
        }));
        navigate(`/quizzes/${currentAttempt.quizId}/result`);
      }
    } catch (err) {
      console.error("Failed to submit quiz:", err);
      alert("Không thể nộp bài. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Chặn F5 và refresh
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (currentAttempt) {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Chặn F5 (refresh)
      if (e.key === 'F5') {
        e.preventDefault();
        setShowExitModal(true);
        return;
      }
      // Chặn Ctrl+R hoặc Cmd+R
      if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        setShowExitModal(true);
        return;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentAttempt]);

  useEffect(() => {
    if (!currentAttempt) return; // Không chạy nếu không có data

    // Nếu hết thời gian, tự động nộp bài
    if (secondsLeft === 0) {
      handleSubmitQuiz();
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [currentAttempt, secondsLeft]);

  // Format thời gian
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Tính toán hiển thị thanh Progress
  const percentage = Math.max(0, Math.min(100, (secondsLeft / totalDuration) * 100));
  
  const statusColor = 
    percentage > 50 ? "bg-green-500" : 
    percentage > 20 ? "bg-yellow-400" : 
    "bg-red-500";

  // =================================================================
  // 3. MODAL XÁC NHẬN THOÁT / REFRESH
  // =================================================================
  const ConfirmExitModal = () => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="bg-white border-4 border-black rounded-2xl p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-w-md w-full">
          {/* Close button */}
          <button
            onClick={() => setShowExitModal(false)}
            className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X size={24} className="text-black" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-12 w-12 flex items-center justify-center bg-red-400 border-2 border-black rounded-full text-white font-black shadow-[2px_2px_0px_black]">
              !
            </div>
            <h2 className="text-xl font-black uppercase tracking-tight text-slate-900">
              Cảnh báo!
            </h2>
          </div>

          {/* Message */}
          <p className="text-slate-700 font-semibold mb-8 leading-relaxed">
            Bạn chưa hoàn thành bài thi. Nếu thoát hoặc refresh trang, bài làm của bạn sẽ <span className="font-black text-red-600">KHÔNG được lưu</span>.
          </p>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => setShowExitModal(false)}
              className={cn(
                "flex-1 px-6 py-3 font-black uppercase text-sm",
                "border-2 border-black bg-blue-400 text-white rounded-lg",
                "shadow-[3px_3px_0px_black] transition-all duration-200",
                "hover:shadow-[5px_5px_0px_black] hover:-translate-y-0.5"
              )}
            >
              Tiếp tục làm bài
            </button>
            <button
              onClick={() => {
                setShowExitModal(false);
                navigate("/quizzes");
              }}
              className={cn(
                "flex-1 px-6 py-3 font-black uppercase text-sm",
                "border-2 border-black bg-red-400 text-white rounded-lg",
                "shadow-[3px_3px_0px_black] transition-all duration-200",
                "hover:shadow-[5px_5px_0px_black] hover:-translate-y-0.5"
              )}
            >
              Về trang Quiz
            </button>
          </div>
        </div>
      </div>
    );
  };

  // =================================================================
  // 3b. MODAL XÁC NHẬN NỘP BÀI
  // =================================================================
  const ConfirmSubmitModal = () => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="bg-white border-4 border-black rounded-2xl p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-w-md w-full">
          {/* Close button */}
          <button
            onClick={() => setShowSubmitConfirmModal(false)}
            className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X size={24} className="text-black" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-12 w-12 flex items-center justify-center bg-yellow-400 border-2 border-black rounded-full text-white font-black shadow-[2px_2px_0px_black]">
              ?
            </div>
            <h2 className="text-xl font-black uppercase tracking-tight text-slate-900">
              Xác nhận nộp bài
            </h2>
          </div>

          {/* Message */}
          <p className="text-slate-700 font-semibold mb-2 leading-relaxed">
            Bạn có chắc chắn muốn <span className="font-black text-blue-600">nộp bài</span> không?
          </p>
          <p className="text-sm text-slate-600 mb-8">
            Sau khi nộp, bạn <span className="font-black">KHÔNG THỂ</span> sửa đổi các câu trả lời.
          </p>

          {/* Progress info */}
          <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg p-4 mb-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-black text-blue-600">
                  {currentAttempt?.answers.length || 0}
                </p>
                <p className="text-xs font-bold text-slate-600 uppercase">Câu trả lời</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-black text-slate-600">
                  {currentAttempt?.questions.length || 0}
                </p>
                <p className="text-xs font-bold text-slate-600 uppercase">Tổng câu hỏi</p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => setShowSubmitConfirmModal(false)}
              className={cn(
                "flex-1 px-6 py-3 font-black uppercase text-sm",
                "border-2 border-black bg-slate-200 text-slate-900 rounded-lg",
                "shadow-[3px_3px_0px_black] transition-all duration-200",
                "hover:shadow-[5px_5px_0px_black] hover:-translate-y-0.5"
              )}
            >
              Tiếp tục
            </button>
            <button
              onClick={handleSubmitQuiz}
              disabled={isSubmitting}
              className={cn(
                "flex-1 px-6 py-3 font-black uppercase text-sm",
                "border-2 border-black bg-green-400 text-white rounded-lg",
                "shadow-[3px_3px_0px_black] transition-all duration-200",
                "hover:shadow-[5px_5px_0px_black] hover:-translate-y-0.5",
                isSubmitting && "opacity-70 cursor-not-allowed"
              )}
            >
              {isSubmitting ? "Đang gửi..." : "Nộp bài"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // =================================================================
  // 4. GIỮ NGUYÊN LOGIC CHECK LỖI / DATA NULL
  // =================================================================
  if (!currentAttempt) {
    return (
      <main className="min-h-screen bg-[#FDF6E3] flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          {/* Card lỗi phong cách Neo-Brutalism (Giữ nguyên code cũ của bạn) */}
          <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-xl overflow-hidden p-8 text-center relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(black 1px, transparent 1px)', backgroundSize: '16px 16px' }}>
            </div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="mb-6 bg-[#FF8888] p-5 rounded-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <AlertTriangle size={40} className="text-black" strokeWidth={2.5} />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight bg-black text-white px-3 py-1 rotate-[-2deg] mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                Lỗi Dữ Liệu
              </h2>
              <p className="font-bold text-slate-700 text-lg mb-2">
                Không tìm thấy bài thi đang làm!
              </p>
              <p className="text-sm font-medium text-slate-500 max-w-[250px]">
                Có thể bạn đã tải lại trang hoặc chưa bắt đầu bài thi từ danh sách.
              </p>
              <button onClick={() => navigate("/quizzes")} className={buttonBaseStyle}>
                <Home size={18} />
                Về danh sách Quiz
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // =================================================================
  // 5. RETURN GIAO DIỆN GAME MỚI (Thay vì gọi <QuizGamePage />)
  // =================================================================
  return (
    <>
      {/* Modal xác nhận thoát */}
      {showExitModal && <ConfirmExitModal />}
      
      {/* Modal xác nhận nộp bài */}
      {showSubmitConfirmModal && <ConfirmSubmitModal />}

      <div className="min-h-screen bg-[#FDF6E3] p-4 md:p-8 font-sans">
        {/* Header với nút quay lại */}
        <div className="max-w-4xl mx-auto mb-8">
          <button
            onClick={handleNavigateBack}
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2 font-black uppercase text-xs",
              "border-2 border-black bg-white text-black rounded-lg",
              "shadow-[2px_2px_0px_black] transition-all duration-200",
              "hover:shadow-[4px_4px_0px_black] hover:-translate-y-0.5"
            )}
          >
            <ArrowLeft size={16} />
            Quay lại
          </button>
        </div>

      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* --- TIMER SECTION (STYLE GIỐNG AVATAR UPLOAD MODAL) --- */}
        <div className="w-full">
          {/* Label & Đồng hồ số */}
          <div className="flex justify-between items-end mb-2">
            <div className="flex items-center gap-2 bg-white border-2 border-black px-4 py-1.5 rounded-lg shadow-[3px_3px_0px_black] -rotate-1 transform transition-transform hover:rotate-0">
              <Clock size={20} className="text-black" strokeWidth={2.5} />
              <span className="font-black text-sm uppercase tracking-wider text-slate-800">
                Thời gian
              </span>
            </div>
            
            <div className={cn(
              "font-black text-xl tracking-widest px-3 py-1 rounded-lg border-2 border-black shadow-[3px_3px_0px_black] bg-white transition-colors",
              percentage < 20 && "text-red-600 animate-pulse border-red-600"
            )}>
              {formatTime(secondsLeft)}
            </div>
          </div>

          {/* Thanh Progress Bar Cartoon */}
          <div className="relative h-7 w-full rounded-full border-2 border-black bg-white overflow-hidden shadow-[4px_4px_0px_black]">
            {/* Pattern nền mờ */}
            <div className="absolute inset-0 opacity-10" 
                 style={{backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)', backgroundSize: '8px 8px'}}>
            </div>

            {/* Thanh màu chính (Chạy animation sọc chéo) */}
            <div
              className={cn(
                "h-full border-r-2 border-black transition-all duration-1000 ease-linear relative progress-stripes",
                statusColor
              )}
              style={{ width: `${percentage}%` }}
            >
              {/* Hiệu ứng bóng láng (Shine) */}
              <div className="absolute top-0 left-0 w-full h-full bg-white/30 skew-x-[-20deg] translate-x-[-100%] animate-[shimmer_2s_infinite]"></div>
            </div>
            
            {/* Text % ở giữa */}
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <span className="text-[10px] font-black uppercase text-black/30 tracking-[0.2em]">
                   Time Remaining
                </span>
             </div>
          </div>
        </div>

        {/* --- PHẦN NỘI DUNG CÂU HỎI (HIỂN THỊ KHI CÓ DATA) --- */}
        {currentAttempt && currentAttempt.questions.length > 0 && (
          <div className="space-y-8">
            {/* Câu hỏi hiện tại */}
            {(() => {
              const currentQuestion = currentAttempt.questions[currentQuestionIndex];
              const selectedAnswer = currentAttempt.answers.find(a => a.questionId === currentQuestion.id);
              
              return (
                <div className="bg-white border-4 border-black rounded-2xl p-8 shadow-[8px_8px_0px_black] relative overflow-hidden">
                  {/* Header câu hỏi */}
                  <div className="flex items-center gap-4 mb-8 border-b-4 border-black pb-6">
                    <div className="h-12 w-12 flex items-center justify-center bg-blue-500 border-2 border-black rounded-full text-white font-black shadow-[3px_3px_0px_black] text-lg">
                      {currentQuestionIndex + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-black uppercase tracking-wider text-slate-600">
                        Câu {currentQuestionIndex + 1} / {currentAttempt.questions.length}
                      </h3>
                      <p className="text-xl font-bold text-slate-900 mt-1">
                        {currentQuestion.content}
                      </p>
                    </div>
                    {currentQuestion.points && (
                      <div className="bg-yellow-300 border-2 border-black px-4 py-2 rounded-lg shadow-[2px_2px_0px_black] font-black text-sm">
                        {currentQuestion.points} điểm
                      </div>
                    )}
                  </div>

                  {/* Các lựa chọn */}
                  <div className="space-y-3 mb-8">
                    {currentQuestion.options.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handleSelectAnswer(option.id)}
                        className={cn(
                          "w-full text-left p-5 border-2 rounded-xl font-semibold transition-all duration-200",
                          "hover:shadow-[4px_4px_0px_black] hover:border-black hover:-translate-y-0.5",
                          selectedAnswer?.selectedOptionId === option.id
                            ? "bg-blue-400 border-black shadow-[4px_4px_0px_black] text-white font-black"
                            : "bg-slate-100 border-slate-300 text-slate-800"
                        )}
                      >
                        {option.content}
                      </button>
                    ))}
                  </div>

                  {/* Navigation buttons */}
                  <div className="flex gap-4 justify-between items-center">
                    <button
                      onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                      disabled={currentQuestionIndex === 0}
                      className={cn(
                        "inline-flex items-center gap-2 px-6 py-3 font-black uppercase text-sm",
                        "border-2 rounded-lg transition-all duration-200",
                        currentQuestionIndex === 0
                          ? "border-slate-300 bg-slate-100 text-slate-400 cursor-not-allowed"
                          : "border-black bg-white text-black hover:shadow-[4px_4px_0px_black] hover:-translate-y-0.5 shadow-[2px_2px_0px_black]"
                      )}
                    >
                      <ChevronLeft size={18} />
                      Câu trước
                    </button>

                    {currentQuestionIndex === currentAttempt.questions.length - 1 ? (
                      <button
                        onClick={() => setShowSubmitConfirmModal(true)}
                        disabled={isSubmitting}
                        className={buttonBaseStyle}
                      >
                        {isSubmitting ? "Đang gửi..." : "Nộp bài"}
                      </button>
                    ) : (
                      <button
                        onClick={() => setCurrentQuestionIndex(Math.min(currentAttempt.questions.length - 1, currentQuestionIndex + 1))}
                        className={cn(
                          "inline-flex items-center gap-2 px-6 py-3 font-black uppercase text-sm",
                          "border-2 rounded-lg transition-all duration-200",
                          "border-black bg-white text-black hover:shadow-[4px_4px_0px_black] hover:-translate-y-0.5 shadow-[2px_2px_0px_black]"
                        )}
                      >
                        Câu tiếp
                        <ChevronRight size={18} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* Progress indicator */}
            <div className="flex gap-2 justify-center flex-wrap">
              {currentAttempt.questions.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={cn(
                    "w-10 h-10 rounded-lg font-bold border-2 transition-all duration-200",
                    currentQuestionIndex === idx
                      ? "bg-blue-500 text-white border-black shadow-[3px_3px_0px_black]"
                      : currentAttempt.answers.some(a => a.questionId === currentAttempt.questions[idx].id)
                      ? "bg-green-300 text-black border-black shadow-[2px_2px_0px_black]"
                      : "bg-slate-100 text-slate-600 border-slate-300"
                  )}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Styles animation cho thanh progress */}
      <style>{`
        .progress-stripes {
          background-image: linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.2) 25%,
            transparent 25%,
            transparent 50%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(255, 255, 255, 0.2) 75%,
            transparent 75%,
            transparent
          );
          background-size: 20px 20px;
          animation: move-stripes 1s linear infinite;
        }
        
        @keyframes move-stripes {
          0% { background-position: 0 0; }
          100% { background-position: 20px 0; }
        }

        @keyframes shimmer {
          100% { transform: translateX(200%); }
        }
      `}</style>
      </div>
    </>
  );
};

export default QuizGamePageWrapper;