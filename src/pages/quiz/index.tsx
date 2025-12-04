import { UnifiedHeader } from "@/components/layout/unified-header";
import QuizListingPage from "@/features/quiz/quiz-page/components/quiz-listing-page";

// Trang /quizzes: UnifiedHeader + QuizListingPage component

export default function QuizPage() {
  return (
    <>
      <UnifiedHeader />
      <QuizListingPage />
    </>
  );
}
