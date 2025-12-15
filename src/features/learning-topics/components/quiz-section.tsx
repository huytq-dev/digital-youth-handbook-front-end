import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { LearningTopicQuizQuestion } from "../learning-topics.type";
import { Check, X, Trophy, RefreshCw, HelpCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils"; // Import utils để clean code style
import { ROUTE_PATH } from "@/routes/routePath";

interface QuizSectionProps {
  questions: LearningTopicQuizQuestion[];
  quizId?: string; // Quiz ID để link đến trang quiz đầy đủ
}

export const QuizSection = ({ questions, quizId }: QuizSectionProps) => {
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
          <div className="relative z-10 flex-1">
            <h2 className="text-3xl font-black uppercase tracking-wider flex items-center gap-3 text-white drop-shadow-[2px_2px_0px_black]">
                <HelpCircle size={32} strokeWidth={3} /> Trắc nghiệm
            </h2>
            <p className="text-orange-100 text-sm font-bold mt-1 bg-black/20 px-2 py-1 rounded w-fit">
               Kiểm tra kiến thức vừa học
            </p>
          </div>
          {/* Button link đến quiz đầy đủ */}
          <Link
            to={quizId ? ROUTE_PATH.QUIZ.intro(quizId) : ROUTE_PATH.QUIZ.INDEX}
            className="relative z-10 ml-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, x: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-white text-orange-600 font-black border-2 border-black rounded-lg shadow-[3px_3px_0px_black] hover:shadow-[1px_1px_0px_black] hover:translate-x-1 hover:translate-y-1 transition-all"
            >
              <span className="text-sm uppercase">Làm bài đầy đủ</span>
              <ArrowRight size={18} strokeWidth={3} />
            </motion.button>
          </Link>
          {/* Decor Pattern */}
          <div className="absolute right-[-20px] top-[-20px] text-white/20 rotate-12">
             <Trophy size={120} />
          </div>
      </div>

      <div className="p-6 md:p-10 space-y-12 bg-slate-50">
        {questions.map((q, index) => {
          const selectedIndex = userAnswers[q.id];
          
          return (
            <motion.div 
              key={q.id} 
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }} // Stagger từng câu hỏi
            >
              {/* Question Number Badge */}
              <div className="absolute -left-2 -top-5 bg-black text-white font-black w-10 h-10 flex items-center justify-center rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,0.2)] z-10 border-2 border-white rotate-[-5deg]">
                  {index + 1}
              </div>
              
              <div className="bg-white border-2 border-black rounded-xl p-6 pt-8 shadow-sm hover:shadow-md transition-shadow">
                  <p className="mb-6 text-lg font-bold text-slate-900 border-l-4 border-orange-400 pl-4">
                    {q.question}
                  </p>

                  <div className="grid gap-3 md:grid-cols-2">
                    {q.options.map((option, optIndex) => {
                      const isSelected = optIndex === selectedIndex;
                      const isCorrect = optIndex === q.correctAnswerIndex;
                      
                      // Logic Style
                      let btnStyles = "border-slate-300 bg-white text-slate-700 hover:border-black hover:bg-blue-50 hover:shadow-[3px_3px_0px_black] hover:-translate-y-1";
                      
                      if (showResult) {
                        if (isCorrect) btnStyles = "border-black bg-green-400 text-black shadow-[2px_2px_0px_black]";
                        else if (isSelected) btnStyles = "border-black bg-red-400 text-black shadow-[2px_2px_0px_black]";
                        else btnStyles = "border-slate-200 bg-slate-100 text-slate-400 opacity-60 pointer-events-none";
                      } else if (isSelected) {
                        btnStyles = "border-black bg-blue-200 text-black shadow-[3px_3px_0px_black] -translate-y-1";
                      }

                      return (
                        <motion.button
                          key={optIndex}
                          whileTap={!showResult ? { scale: 0.98, y: 0, boxShadow: "0px 0px 0px black" } : {}}
                          type="button"
                          className={cn(
                            "relative flex w-full items-center rounded-lg border-2 px-4 py-4 text-left text-sm font-bold transition-all h-full min-h-[60px]",
                            btnStyles
                          )}
                          onClick={() => handleSelectOption(q.id, optIndex)}
                          disabled={showResult}
                        >
                          <span className={cn(
                            "mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 border-black",
                            isSelected ? "bg-black" : "bg-white"
                          )}>
                              {isSelected && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                          </span>
                          <span className="flex-1">{option}</span>
                          
                          {/* Icons Kết quả */}
                          {showResult && isCorrect && (
                              <Check className="absolute right-3 top-1/2 -translate-y-1/2 text-black bg-white rounded-full p-0.5 border border-black" size={24} strokeWidth={3} />
                          )}
                          {showResult && isSelected && !isCorrect && (
                              <X className="absolute right-3 top-1/2 -translate-y-1/2 text-white" size={24} strokeWidth={3} />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* FOOTER ACTION */}
      <div className="bg-white border-t-2 border-black p-8 text-center">
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key="submit-btn"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <button
                type="button"
                onClick={() => setShowResult(true)}
                disabled={!hasAnsweredAll}
                className="group inline-flex items-center rounded-xl border-2 border-black bg-blue-600 px-10 py-4 text-lg font-black text-white shadow-[6px_6px_0px_black] transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0px_black] active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:bg-slate-400 disabled:shadow-none disabled:translate-y-0"
              >
                <Check className="mr-2 group-hover:scale-125 transition-transform" strokeWidth={3} />
                NỘP BÀI & XEM ĐIỂM
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="result-panel"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="flex flex-col items-center"
            >
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};