import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUserQuizHistoryQuery } from "@/features/quiz/quiz.api";
import { isApiResponseSuccess } from "@/features/common/common.type";
import { cn } from "@/lib/utils";
import { 
  Clock, 
  Trophy, 
  CheckCircle, 
  XCircle, 
  ChevronRight, 
  ChevronLeft, // Thêm icon Left
  Calendar, 
  History, 
  Loader2 
} from "lucide-react";

export const QuizHistory = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Giữ nguyên 5 record/trang

  const { data: historyResponse, isLoading, error } = useGetUserQuizHistoryQuery({
    page: currentPage,
    pageSize,
  });

  const history =
    historyResponse && isApiResponseSuccess(historyResponse)
      ? historyResponse.data
      : null;

  // Format thời gian
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleViewResult = (attemptId: string, quizId: string) => {
    navigate(`/quizzes/${quizId}/result`, { state: { attemptId } });
  };

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 font-sans">
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8 bg-[#FFDE00] border-2 sm:border-4 border-black p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-[4px_4px_0px_black] sm:shadow-[6px_6px_0px_black] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(black 1px, transparent 1px)', backgroundSize: '12px 12px' }}>
        </div>

        <div className="relative z-10 bg-white border-2 border-black rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 shadow-[2px_2px_0px_black] sm:shadow-[3px_3px_0px_black] rotate-[-3deg] flex-shrink-0">
          <History size={24} className="sm:w-8 sm:h-8 md:w-8 md:h-8 text-black" strokeWidth={2.5} />
        </div>
        <div className="relative z-10 flex-1 min-w-0">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black uppercase text-black tracking-tight leading-tight">
            Lịch sử đấu trường
          </h2>
          <p className="text-xs sm:text-sm md:text-base font-bold text-slate-800 mt-1 sm:mt-1.5">
            Xem lại thành tích và các trận chiến đã qua!
          </p>
        </div>
      </div>

      {/* --- LOADING STATE --- */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-8 sm:py-10 md:py-12 border-2 sm:border-4 border-dashed border-black rounded-xl sm:rounded-2xl bg-white/50 px-4">
          <Loader2 className="h-10 w-10 sm:h-12 sm:w-12 animate-spin text-black mb-3 sm:mb-4" />
          <p className="font-black text-base sm:text-lg uppercase animate-pulse text-center">Đang lục lại ký ức...</p>
        </div>
      )}

      {/* --- ERROR STATE --- */}
      {error && (
        <div className="bg-[#FF8888] border-2 sm:border-4 border-black rounded-xl sm:rounded-2xl p-6 sm:p-7 md:p-8 text-center shadow-[4px_4px_0px_black] sm:shadow-[6px_6px_0px_black]">
          <div className="text-3xl sm:text-4xl mb-2">😵</div>
          <p className="font-black text-black text-lg sm:text-xl uppercase">
            Ối! Không tải được lịch sử.
          </p>
          <p className="font-bold text-black/80 text-sm sm:text-base mt-1">Vui lòng thử lại sau nhé.</p>
        </div>
      )}

      {/* --- DATA LIST --- */}
      {history && history.items.length > 0 ? (
        <>
          {/* Total Count Badge */}
          <div className="flex justify-end">
             <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-black text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-bold border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.3)] sm:shadow-[3px_3px_0px_rgba(0,0,0,0.3)] transform -rotate-1">
                <span className="text-xs sm:text-sm">Tổng số trận:</span>
                <span className="text-[#FFDE00] text-base sm:text-lg font-black">{history.totalCount}</span>
             </div>
          </div>

          <div className="space-y-3 sm:space-y-4 md:space-y-5">
            {history.items.map((item) => (
              <div
                key={item.attemptId}
                onClick={() => handleViewResult(item.attemptId, item.quizId)}
                className={cn(
                  "group relative bg-white border-2 sm:border-3 md:border-4 border-black rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 transition-all duration-200 cursor-pointer overflow-hidden",
                  "hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0px_black] sm:hover:-translate-y-1 sm:hover:-translate-x-1 sm:hover:shadow-[8px_8px_0px_black] shadow-[3px_3px_0px_black] sm:shadow-[4px_4px_0px_black]",
                  "active:translate-y-0 active:translate-x-0 active:shadow-[2px_2px_0px_black]"
                )}
              >
                {/* Decorative Side Strip */}
                <div className={cn(
                    "absolute left-0 top-0 bottom-0 w-2 sm:w-2.5 md:w-3 border-r-2 border-black",
                    item.isPassed ? "bg-[#4ADE80]" : "bg-[#FF8888]"
                )} />

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pl-3 sm:pl-4">
                  
                  {/* Left: Info */}
                  <div className="flex-1 min-w-0 space-y-1.5 sm:space-y-2 w-full sm:w-auto">
                    <h3 className="text-base sm:text-lg md:text-xl font-black text-black break-words group-hover:text-blue-600 transition-colors pr-2">
                      {item.quizTitle}
                    </h3>

                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold text-slate-600">
                      <div className="flex items-center gap-1 bg-slate-100 border-2 border-black px-1.5 sm:px-2 py-0.5 rounded-md">
                        <Calendar size={12} className="sm:w-3.5 sm:h-3.5" />
                        <span className="whitespace-nowrap">{formatDate(item.completedAt)}</span>
                      </div>
                      <div className="flex items-center gap-1 bg-slate-100 border-2 border-black px-1.5 sm:px-2 py-0.5 rounded-md">
                        <Clock size={12} className="sm:w-3.5 sm:h-3.5" />
                        <span className="whitespace-nowrap">{formatDateTime(item.completedAt).split(" ")[1]}</span>
                      </div>
                      {/* Duration - Hiện trên mobile */}
                      <div className="flex sm:hidden items-center gap-1 bg-blue-50 border-2 border-blue-300 px-1.5 py-0.5 rounded-md">
                        <Clock size={12} className="text-blue-500"/>
                        <span className="whitespace-nowrap">{formatTime(item.durationSeconds)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Stats & Badges */}
                  <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-2 sm:gap-4 md:gap-6 mt-0 sm:mt-0">
                    
                    {/* Score Box */}
                    <div className="flex flex-col items-center flex-shrink-0">
                        <div className="text-lg sm:text-xl md:text-2xl font-black text-black leading-none">
                            {item.totalScore.toFixed(1)}<span className="text-xs sm:text-sm text-slate-400">/{item.maxScore}</span>
                        </div>
                        <span className="text-[9px] sm:text-[10px] uppercase font-black tracking-wider bg-black text-white px-1.5 sm:px-2 rounded-sm mt-0.5 sm:mt-1">Điểm</span>
                    </div>

                    {/* Result Badge (Sticker Style) */}
                    <div className={cn(
                        "flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border-2 border-black font-black uppercase text-[10px] sm:text-xs transform rotate-2 flex-shrink-0",
                        item.isPassed 
                            ? "bg-[#4ADE80] text-black shadow-[2px_2px_0px_rgba(0,0,0,0.5)]" 
                            : "bg-[#FF8888] text-black shadow-[2px_2px_0px_rgba(0,0,0,0.5)]"
                    )}>
                        {item.isPassed ? <CheckCircle size={14} className="sm:w-4 sm:h-4" strokeWidth={3} /> : <XCircle size={14} className="sm:w-4 sm:h-4" strokeWidth={3} />}
                        <span className="whitespace-nowrap">{item.isPassed ? "Đạt" : "Trượt"}</span>
                    </div>

                    {/* Duration - Desktop only */}
                    <div className="hidden sm:flex flex-col items-end">
                        <div className="flex items-center gap-1 font-bold text-black text-sm md:text-base">
                            <Clock className="w-4 h-4 text-blue-500" strokeWidth={2.5} />
                            {formatTime(item.durationSeconds)}
                        </div>
                    </div>

                    {/* Arrow Button */}
                    <div className="bg-[#FFDE00] p-1.5 sm:p-2 rounded-full border-2 border-black group-hover:bg-black group-hover:text-[#FFDE00] transition-colors flex-shrink-0">
                         <ChevronRight size={18} className="sm:w-5 sm:h-5" strokeWidth={3} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* --- PAGINATION (CARTOON BUTTONS) --- */}
          {history.totalPages > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2 mt-6 sm:mt-8 md:mt-10 px-2">
              
              {/* Prev Button */}
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={cn(
                  "h-9 sm:h-10 px-3 sm:px-4 font-black uppercase text-xs sm:text-sm border-2 rounded-lg transition-all flex items-center gap-1.5 sm:gap-2",
                  currentPage === 1
                    ? "border-slate-300 bg-slate-100 text-slate-400 cursor-not-allowed"
                    : "border-black bg-white text-black shadow-[2px_2px_0px_black] sm:shadow-[3px_3px_0px_black] hover:shadow-[4px_4px_0px_black] sm:hover:shadow-[5px_5px_0px_black] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
                )}
              >
                <ChevronLeft size={16} className="sm:w-[18px] sm:h-[18px]" strokeWidth={3} /> 
                <span className="hidden xs:inline">Trước</span>
              </button>

              {/* Numbers */}
              <div className="flex gap-1 overflow-x-auto max-w-[calc(100vw-8rem)] sm:max-w-[300px] md:max-w-none px-1 sm:px-2 py-1 sm:py-2 scrollbar-hide">
                {Array.from({ length: history.totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={cn(
                        "w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 font-black border-2 rounded-lg transition-all flex-shrink-0 text-xs sm:text-sm",
                        currentPage === page
                          ? "bg-black text-[#FFDE00] border-black shadow-[2px_2px_0px_rgba(0,0,0,0.3)] sm:shadow-[3px_3px_0px_rgba(0,0,0,0.3)] transform -translate-y-0.5 sm:-translate-y-1"
                          : "bg-white text-black border-black shadow-[2px_2px_0px_black] hover:bg-[#FFDE00] hover:-translate-y-0.5"
                      )}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>

              {/* Next Button */}
              <button
                onClick={() =>
                  setCurrentPage(Math.min(history.totalPages, currentPage + 1))
                }
                disabled={currentPage === history.totalPages}
                className={cn(
                  "h-9 sm:h-10 px-3 sm:px-4 font-black uppercase text-xs sm:text-sm border-2 rounded-lg transition-all flex items-center gap-1.5 sm:gap-2",
                  currentPage === history.totalPages
                    ? "border-slate-300 bg-slate-100 text-slate-400 cursor-not-allowed"
                    : "border-black bg-white text-black shadow-[2px_2px_0px_black] sm:shadow-[3px_3px_0px_black] hover:shadow-[4px_4px_0px_black] sm:hover:shadow-[5px_5px_0px_black] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
                )}
              >
                <span className="hidden xs:inline">Sau</span> 
                <ChevronRight size={16} className="sm:w-[18px] sm:h-[18px]" strokeWidth={3} />
              </button>
            </div>
          )}

          <div className="text-center mt-3 sm:mt-4">
             <span className="inline-block bg-black text-white text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full">
                Trang {history.page} / {history.totalPages}
             </span>
          </div>
        </>
      ) : !isLoading && !error ? (
        <div className="bg-white border-2 sm:border-3 md:border-4 border-black rounded-xl sm:rounded-2xl p-8 sm:p-10 md:p-12 text-center shadow-[4px_4px_0px_black] sm:shadow-[6px_6px_0px_black] md:shadow-[8px_8px_0px_black]">
          <div className="bg-slate-100 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 md:mb-6 border-3 sm:border-4 border-black">
             <Trophy size={40} className="sm:w-12 sm:h-12 text-slate-400" />
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-black uppercase mb-2 px-2">Chưa có dữ liệu!</h3>
          <p className="text-sm sm:text-base text-slate-600 font-bold mb-5 sm:mb-6 px-2">
            Bạn chưa hoàn thành bài quiz nào. Hãy tham chiến ngay!
          </p>
          <button 
             onClick={() => navigate('/quizzes')}
             className="bg-[#FFDE00] text-black font-black uppercase px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border-2 border-black shadow-[3px_3px_0px_black] sm:shadow-[4px_4px_0px_black] hover:shadow-[5px_5px_0px_black] sm:hover:shadow-[6px_6px_0px_black] hover:-translate-y-0.5 sm:hover:-translate-y-1 transition-all text-sm sm:text-base"
          >
             Chiến ngay 🚀
          </button>
        </div>
      ) : null}
    </div>
  );
};