import { useState } from "react";
import type { LearningTopicQuizQuestion } from "../learning-topics.type";
import { Check, X, Trophy, RefreshCw, HelpCircle } from "lucide-react";

interface QuizSectionProps {
  questions: LearningTopicQuizQuestion[];
}

export const QuizSection = ({ questions }: QuizSectionProps) => {
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (showResult) return;
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswerIndex) {
        score += 1;
      }
    });
    return score;
  };

  const hasAnsweredAll = Object.keys(userAnswers).length === questions.length;

  return (
    <div className="relative rounded-xl border-2 border-black bg-white shadow-[8px_8px_0px_black] overflow-hidden">
      {/* Header Quiz */}
      <div className="bg-orange-500 p-6 border-b-2 border-black text-white flex items-center justify-between relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-black uppercase tracking-wider flex items-center gap-3 text-white drop-shadow-[2px_2px_0px_black]">
                <HelpCircle size={32} strokeWidth={3} /> Trắc nghiệm
            </h2>
            <p className="text-orange-100 text-sm font-bold mt-1 bg-black/20 px-2 py-1 rounded w-fit">
               Kiểm tra kiến thức vừa học
            </p>
          </div>
          {/* Decor Pattern on Header */}
          <div className="absolute right-[-20px] top-[-20px] text-white/20 rotate-12">
             <Trophy size={120} />
          </div>
      </div>

      <div className="p-6 md:p-10 space-y-12 bg-slate-50">
        {questions.map((q, index) => {
          const selectedIndex = userAnswers[q.id];
          
          return (
            <div key={q.id} className="relative">
              {/* Question Number Badge */}
              <div className="absolute -left-2 -top-5 bg-black text-white font-black w-10 h-10 flex items-center justify-center rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,0.2)] z-10 border-2 border-white rotate-[-5deg]">
                  {index + 1}
              </div>
              
              <div className="bg-white border-2 border-black rounded-xl p-6 pt-8 shadow-sm">
                  <p className="mb-6 text-lg font-bold text-slate-900 border-l-4 border-orange-400 pl-4">
                    {q.question}
                  </p>

                  <div className="grid gap-3 md:grid-cols-2">
                    {q.options.map((option, optIndex) => {
                      let btnClass =
                        "relative flex w-full items-center rounded-lg border-2 px-4 py-4 text-left text-sm font-bold transition-all active:translate-y-1 active:shadow-none";
                      
                      // Logic Style Kết quả
                      if (showResult) {
                        if (optIndex === q.correctAnswerIndex) {
                          btnClass += " border-black bg-green-400 text-black shadow-[2px_2px_0px_black]";
                        } else if (optIndex === selectedIndex) {
                          btnClass += " border-black bg-red-400 text-black shadow-[2px_2px_0px_black]";
                        } else {
                          btnClass += " border-slate-200 bg-slate-100 text-slate-400 opacity-60";
                        }
                      } else {
                        btnClass +=
                          optIndex === selectedIndex
                            ? " border-black bg-blue-200 text-black shadow-[3px_3px_0px_black] -translate-y-1"
                            : " border-slate-300 bg-white text-slate-700 hover:border-black hover:bg-blue-50 hover:shadow-[3px_3px_0px_black] hover:-translate-y-1";
                      }

                      return (
                        <button
                          key={optIndex}
                          type="button"
                          className={btnClass}
                          onClick={() => handleSelectOption(q.id, optIndex)}
                          disabled={showResult}
                        >
                          <span className={`mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 border-black ${
                              optIndex === selectedIndex ? "bg-black" : "bg-white"
                          }`}>
                              {optIndex === selectedIndex && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                          </span>
                          <span>{option}</span>
                          
                          {/* Icons Kết quả */}
                          {showResult && optIndex === q.correctAnswerIndex && (
                              <Check className="absolute right-3 top-1/2 -translate-y-1/2 text-black bg-white rounded-full p-0.5 border border-black" size={24} strokeWidth={3} />
                          )}
                          {showResult && optIndex === selectedIndex && optIndex !== q.correctAnswerIndex && (
                              <X className="absolute right-3 top-1/2 -translate-y-1/2 text-white" size={24} strokeWidth={3} />
                          )}
                        </button>
                      );
                    })}
                  </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* FOOTER ACTION */}
      <div className="bg-white border-t-2 border-black p-8 text-center">
        {!showResult ? (
          <>
            <button
              type="button"
              onClick={() => setShowResult(true)}
              disabled={!hasAnsweredAll}
              className="group inline-flex items-center rounded-xl border-2 border-black bg-blue-600 px-10 py-4 text-lg font-black text-white shadow-[6px_6px_0px_black] transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0px_black] active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:bg-slate-400 disabled:shadow-none disabled:translate-y-0"
            >
              <Check className="mr-2 group-hover:scale-125 transition-transform" strokeWidth={3} />
              NỘP BÀI & XEM ĐIỂM
            </button>
            {!hasAnsweredAll && (
              <p className="mt-4 text-sm font-bold text-red-500 animate-pulse bg-red-50 inline-block px-3 py-1 rounded border border-red-200">
                ⚠️ Vui lòng hoàn thành tất cả câu hỏi để nộp bài.
              </p>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center animate-in zoom-in duration-300">
            <div className="mb-6 inline-block rounded-2xl border-2 border-black bg-yellow-300 px-10 py-6 shadow-[6px_6px_0px_black] rotate-2">
              <div className="flex items-center justify-center mb-3">
                  <div className="bg-black p-3 rounded-full">
                    <Trophy size={40} className="text-yellow-400 fill-yellow-400" />
                  </div>
              </div>
              <p className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-1">Kết quả chung cuộc</p>
              <p className="text-4xl font-black text-black">
                {calculateScore()} <span className="text-2xl text-slate-700">/ {questions.length}</span>
              </p>
            </div>
            
            <button
              type="button"
              className="mt-4 flex items-center gap-2 px-6 py-2 rounded-lg font-bold text-slate-700 hover:bg-slate-100 hover:text-black transition-colors"
              onClick={() => {
                setShowResult(false);
                setUserAnswers({});
              }}
            >
              <RefreshCw size={18} /> Làm lại bài này
            </button>
          </div>
        )}
      </div>
    </div>
  );
};