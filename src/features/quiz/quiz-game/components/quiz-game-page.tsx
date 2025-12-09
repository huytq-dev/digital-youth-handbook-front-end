import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/redux/hooks";
import { selectAnswer, submitAttempt } from "@/features/quiz/quiz.slice";
import type { CurrentAttempt } from "@/features/quiz/quiz.slice";
import { useSubmitQuizMutation } from "@/features/quiz/quiz.api";
import { isApiResponseSuccess } from "@/features/common/common.type";

interface QuizGamePageProps {
  currentAttempt: CurrentAttempt;
}

export const QuizGamePage = ({ currentAttempt }: QuizGamePageProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [submitQuiz] = useSubmitQuizMutation();

  // State management
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(currentAttempt.timeLimitMinutes * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentQuestion = currentAttempt.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / currentAttempt.questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === currentAttempt.questions.length - 1;

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0) {
      handleFinish();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSelectOption = (optionId: string) => {
    if (!isSubmitted) {
      setSelectedOptionId(optionId);
      // Save to Redux
      dispatch(selectAnswer({
        questionId: currentQuestion.id,
        selectedOptionId: optionId,
      }));
    }
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      handleFinish();
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsSubmitted(false);
    }
  };

  const handleFinish = async () => {
    try {
      // Submit quiz to backend
      const response = await submitQuiz({
        attemptId: currentAttempt.attemptId,
        answers: currentAttempt.answers,
      }).unwrap();

      if (isApiResponseSuccess(response) && response.data) {
        const result = response.data;
        // Save result to Redux
        dispatch(submitAttempt({
          attemptId: result.attemptId,
          totalScore: result.totalScore,
          isPassed: result.isPassed,
          totalQuestions: currentAttempt.questions.length,
          answeredQuestions: currentAttempt.answers.length,
          completedAt: new Date(),
        }));

        // Navigate to result page
        navigate(`/quizzes/${currentAttempt.quizId}/result`);
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
      alert("Có lỗi khi nộp bài. Vui lòng thử lại.");
    }
  };

  if (!currentQuestion) {
    return <div className="min-h-screen flex items-center justify-center">Không có câu hỏi</div>;
  }

  return (
    <main className="min-h-screen bg-[#fff9f0] pb-24 pt-32 font-sans text-slate-900">
      <div className="mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between rounded-lg border-2 border-black bg-white p-4 shadow-[4px_4px_0px_black]">
          <div>
            <p className="text-sm font-bold text-slate-600">
              Câu {currentQuestionIndex + 1}/{currentAttempt.questions.length}
            </p>
            <div className="mt-2 h-2 w-64 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full bg-blue-600 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <div className="text-2xl font-black text-red-600">
            {formatTime(timeLeft)}
          </div>
        </div>

        {/* Question */}
        <div className="mb-8 rounded-2xl border-2 border-black bg-white p-8 shadow-[4px_4px_0px_black]">
          <h2 className="mb-6 text-2xl font-black text-slate-900">
            {currentQuestion.content}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={option.id}
                onClick={() => handleSelectOption(option.id)}
                className={`w-full rounded-lg border-2 border-black p-4 text-left font-bold transition-all ${
                  selectedOptionId === option.id
                    ? "bg-blue-400 text-black shadow-[4px_4px_0px_black]"
                    : "bg-white text-slate-900 hover:bg-slate-50"
                }`}
              >
                <span className="mr-3 font-black text-lg">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option.content}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/quizzes")}
            className="rounded-lg border-2 border-black bg-white px-6 py-3 font-black text-black shadow-[4px_4px_0px_black] transition-all hover:bg-slate-50"
          >
            Thoát
          </button>
          <button
            onClick={handleNextQuestion}
            disabled={!selectedOptionId}
            className="flex-1 rounded-lg border-2 border-black bg-yellow-400 px-6 py-3 font-black text-black shadow-[4px_4px_0px_black] transition-all disabled:opacity-50"
          >
            {isLastQuestion ? "Hoàn thành" : "Tiếp theo"}
          </button>
        </div>
      </div>
    </main>
  );
};
