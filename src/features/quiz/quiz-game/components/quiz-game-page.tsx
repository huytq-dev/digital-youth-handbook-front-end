import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { QuizDetail, QuizQuestion, QuizAnswer } from "@/features/quiz/quiz.type";
import { QuizGameHeader } from "./quiz-game-header";
import { QuizQuestionCard } from "./quiz-question-card";
import { QuizAnswerGrid } from "./quiz-answer-grid";

interface QuizGamePageProps {
  quiz: QuizDetail;
}

export const QuizGamePage = ({ quiz }: QuizGamePageProps) => {
  const navigate = useNavigate();
  
  // State management
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(quiz.durationMinutes * 60); // Total seconds
  const [isPaused, setIsPaused] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.totalQuestions) * 100;
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0) {
      handleTimeUp();
      return;
    }

    if (isPaused || isSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isPaused, isSubmitted]);

  const handleTimeUp = () => {
    // Auto submit wrong answer when time runs out
    if (!isSubmitted && selectedAnswer === null) {
      handleAnswerSubmit(null);
    }
  };

  const handleAnswerSelect = (optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswer(optionIndex);
  };

  const handleAnswerSubmit = useCallback((optionIndex: number | null) => {
    if (isSubmitted) return;
    
    const selected = optionIndex ?? selectedAnswer;
    if (selected === null) return;

    setIsSubmitted(true);

    const isCorrect = selected === currentQuestion.correctOptionIndex;
    const newScore = isCorrect ? score + 1 : score;

    // Save answer
    const answer: QuizAnswer = {
      questionId: currentQuestion.id,
      selectedOptionIndex: selected,
      isCorrect,
    };
    
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    setScore(newScore);

    // Không có giới hạn mạng - người chơi có thể trả lời sai bao nhiêu lần cũng được
  }, [isSubmitted, selectedAnswer, currentQuestion, score, answers, quiz, timeLeft, navigate]);

  const handleNextQuestion = () => {
    if (!isSubmitted) return;

    if (isLastQuestion) {
      // Navigate to result page
      navigate(`/quizzes/${quiz.id}/result`, {
        state: {
          answers,
          score,
          totalQuestions: quiz.totalQuestions,
          timeSpent: quiz.durationMinutes * 60 - timeLeft,
        },
      });
      return;
    }

    // Move to next question
    setCurrentQuestionIndex((prev) => prev + 1);
    setSelectedAnswer(null);
    setIsSubmitted(false);
  };


  return (
    <main
      className="min-h-screen bg-[#fff9f0] font-sans text-slate-900 selection:bg-yellow-400 selection:text-black"
      style={{
        backgroundImage: "radial-gradient(#cbd5e1 2px, transparent 2px)",
        backgroundSize: "32px 32px",
      }}
    >
      <div className="mx-auto max-w-5xl px-4 py-6">
        {/* Header: Progress, Timer */}
        <QuizGameHeader
          progress={progress}
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={quiz.totalQuestions}
          timeLeft={timeLeft}
        />

        {/* Question Card */}
        <QuizQuestionCard
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          isSubmitted={isSubmitted}
          key={currentQuestion.id} // Key để trigger animation khi đổi câu
        />

        {/* Answer Grid */}
        <QuizAnswerGrid
          options={currentQuestion.options}
          correctAnswerIndex={currentQuestion.correctOptionIndex}
          selectedAnswer={selectedAnswer}
          isSubmitted={isSubmitted}
          onAnswerSelect={handleAnswerSelect}
          onAnswerSubmit={handleAnswerSubmit}
          onNextQuestion={handleNextQuestion}
          isLastQuestion={isLastQuestion}
        />
      </div>
    </main>
  );
};

