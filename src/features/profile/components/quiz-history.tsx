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
    <div className="space-y-8 font-sans">
      {/* --- HEADER SECTION --- */}
      <div className="flex items-center gap-4 mb-8 bg-[#FFDE00] border-4 border-black p-6 rounded-2xl shadow-[6px_6px_0px_black] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(black 1px, transparent 1px)', backgroundSize: '12px 12px' }}>
        </div>

        <div className="relative z-10 bg-white border-2 border-black rounded-xl p-4 shadow-[3px_3px_0px_black] rotate-[-3deg]">
          <History size={32} className="text-black" strokeWidth={2.5} />
        </div>
        <div className="relative z-10">
          <h2 className="text-2xl md:text-4xl font-black uppercase text-black tracking-tight leading-none">
            Lịch sử đấu trường
          </h2>
          <p className="text-sm md:text-base font-bold text-slate-800 mt-1">
            Xem lại thành tích và các trận chiến đã qua!
          </p>
        </div>
      </div>

      {/* --- LOADING STATE --- */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-12 border-4 border-dashed border-black rounded-2xl bg-white/50">
          <Loader2 className="h-12 w-12 animate-spin text-black mb-4" />
          <p className="font-black text-lg uppercase animate-pulse">Đang lục lại ký ức...</p>
        </div>
      )}

      {/* --- ERROR STATE --- */}
      {error && (
        <div className="bg-[#FF8888] border-4 border-black rounded-2xl p-8 text-center shadow-[6px_6px_0px_black]">
          <div className="text-4xl mb-2">😵</div>
          <p className="font-black text-black text-xl uppercase">
            Ối! Không tải được lịch sử.
          </p>
          <p className="font-bold text-black/80">Vui lòng thử lại sau nhé.</p>
        </div>
      )}

      {/* --- DATA LIST --- */}
      {history && history.items.length > 0 ? (
        <>
          {/* Total Count Badge */}
          <div className="flex justify-end">
             <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg font-bold border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,0.3)] transform -rotate-1">
                <span>Tổng số trận:</span>
                <span className="text-[#FFDE00] text-lg font-black">{history.totalCount}</span>
             </div>
          </div>

          <div className="space-y-5">
            {history.items.map((item) => (
              <div
                key={item.attemptId}
                onClick={() => handleViewResult(item.attemptId, item.quizId)}
                className={cn(
                  "group relative bg-white border-4 border-black rounded-2xl p-5 transition-all duration-200 cursor-pointer overflow-hidden",
                  "hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_black] shadow-[4px_4px_0px_black]",
                  "active:translate-y-0 active:translate-x-0 active:shadow-[2px_2px_0px_black]"
                )}
              >
                {/* Decorative Side Strip */}
                <div className={cn(
                    "absolute left-0 top-0 bottom-0 w-3 border-r-2 border-black",
                    item.isPassed ? "bg-[#4ADE80]" : "bg-[#FF8888]"
                )} />

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pl-4">
                  
                  {/* Left: Info */}
                  <div className="flex-1 min-w-0 space-y-2">
                    <h3 className="text-xl font-black text-black truncate group-hover:text-blue-600 transition-colors">
                      {item.quizTitle}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 text-sm font-bold text-slate-600">
                      <div className="flex items-center gap-1 bg-slate-100 border-2 border-black px-2 py-0.5 rounded-md">
                        <Calendar size={14} />
                        {formatDate(item.completedAt)}
                      </div>
                      <div className="flex items-center gap-1 bg-slate-100 border-2 border-black px-2 py-0.5 rounded-md">
                        <Clock size={14} />
                        {formatDateTime(item.completedAt).split(" ")[1]}
                      </div>
                    </div>
                  </div>

                  {/* Right: Stats & Badges */}
                  <div className="flex w-full md:w-auto items-center justify-between md:justify-end gap-4 md:gap-6 mt-2 md:mt-0">
                    
                    {/* Score Box */}
                    <div className="flex flex-col items-center">
                        <div className="text-2xl font-black text-black leading-none">
                            {item.totalScore.toFixed(1)}<span className="text-sm text-slate-400">/{item.maxScore}</span>
                        </div>
                        <span className="text-[10px] uppercase font-black tracking-wider bg-black text-white px-2 rounded-sm mt-1">Điểm</span>
                    </div>

                    {/* Result Badge (Sticker Style) */}
                    <div className={cn(
                        "flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 border-black font-black uppercase text-xs transform rotate-2",
                        item.isPassed 
                            ? "bg-[#4ADE80] text-black shadow-[2px_2px_0px_rgba(0,0,0,0.5)]" 
                            : "bg-[#FF8888] text-black shadow-[2px_2px_0px_rgba(0,0,0,0.5)]"
                    )}>
                        {item.isPassed ? <CheckCircle size={16} strokeWidth={3} /> : <XCircle size={16} strokeWidth={3} />}
                        {item.isPassed ? "Đạt" : "Trượt"}
                    </div>

                    {/* Duration */}
                    <div className="hidden md:flex flex-col items-end">
                        <div className="flex items-center gap-1 font-bold text-black">
                            <Clock size={16} strokeWidth={2.5} className="text-blue-500"/>
                            {formatTime(item.durationSeconds)}
                        </div>
                    </div>

                    {/* Arrow Button */}
                    <div className="bg-[#FFDE00] p-2 rounded-full border-2 border-black group-hover:bg-black group-hover:text-[#FFDE00] transition-colors">
                         <ChevronRight size={20} strokeWidth={3} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* --- PAGINATION (CARTOON BUTTONS) --- */}
          {history.totalPages > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-2 mt-10">
              
              {/* Prev Button - Đã thay icon emoji */}
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={cn(
                  "h-10 px-4 font-black uppercase text-sm border-2 rounded-lg transition-all flex items-center gap-2",
                  currentPage === 1
                    ? "border-slate-300 bg-slate-100 text-slate-400 cursor-not-allowed"
                    : "border-black bg-white text-black shadow-[3px_3px_0px_black] hover:shadow-[5px_5px_0px_black] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
                )}
              >
                <ChevronLeft size={18} strokeWidth={3} /> Trước
              </button>

              {/* Numbers */}
              <div className="flex gap-1 overflow-x-auto max-w-[200px] md:max-w-none px-2 py-2">
                {Array.from({ length: history.totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={cn(
                        "w-10 h-10 font-black border-2 rounded-lg transition-all flex-shrink-0",
                        currentPage === page
                          ? "bg-black text-[#FFDE00] border-black shadow-[3px_3px_0px_rgba(0,0,0,0.3)] transform -translate-y-1"
                          : "bg-white text-black border-black shadow-[2px_2px_0px_black] hover:bg-[#FFDE00] hover:-translate-y-0.5"
                      )}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>

              {/* Next Button - Đã thay icon emoji */}
              <button
                onClick={() =>
                  setCurrentPage(Math.min(history.totalPages, currentPage + 1))
                }
                disabled={currentPage === history.totalPages}
                className={cn(
                  "h-10 px-4 font-black uppercase text-sm border-2 rounded-lg transition-all flex items-center gap-2",
                  currentPage === history.totalPages
                    ? "border-slate-300 bg-slate-100 text-slate-400 cursor-not-allowed"
                    : "border-black bg-white text-black shadow-[3px_3px_0px_black] hover:shadow-[5px_5px_0px_black] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
                )}
              >
                Sau <ChevronRight size={18} strokeWidth={3} />
              </button>
            </div>
          )}

          <div className="text-center mt-4">
             <span className="inline-block bg-black text-white text-xs font-bold px-3 py-1 rounded-full">
                Trang {history.page} / {history.totalPages}
             </span>
          </div>
        </>
      ) : !isLoading && !error ? (
        <div className="bg-white border-4 border-black rounded-2xl p-12 text-center shadow-[8px_8px_0px_black]">
          <div className="bg-slate-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-black">
             <Trophy size={48} className="text-slate-400" />
          </div>
          <h3 className="text-2xl font-black text-black uppercase mb-2">Chưa có dữ liệu!</h3>
          <p className="text-slate-600 font-bold mb-6">
            Bạn chưa hoàn thành bài quiz nào. Hãy tham chiến ngay!
          </p>
          <button 
             onClick={() => navigate('/quizzes')}
             className="bg-[#FFDE00] text-black font-black uppercase px-6 py-3 rounded-xl border-2 border-black shadow-[4px_4px_0px_black] hover:shadow-[6px_6px_0px_black] hover:-translate-y-1 transition-all"
          >
             Chiến ngay 🚀
          </button>
        </div>
      ) : null}
    </div>
  );
};