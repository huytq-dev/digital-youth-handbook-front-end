import type { QuizDetail, QuizLeaderboardEntry } from "./quiz.type";

// Mock data cho QuizDetail - map từ QuizSummary với thông tin bổ sung
export const createMockQuizDetail = (summary: {
  id: string;
  title: string;
  thumbnail: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  durationMinutes: number;
  totalQuestions: number;
  plays: number;
}): QuizDetail => {
  // Generate mock questions
  const questions = Array.from({ length: summary.totalQuestions }, (_, i) => ({
    id: `q-${summary.id}-${i + 1}`,
    quizId: summary.id,
    order: i + 1,
    question: `Câu hỏi ${i + 1}: Đây là câu hỏi mẫu cho quiz "${summary.title}"?`,
    options: [
      "Lựa chọn A - Đáp án đúng",
      "Lựa chọn B - Đáp án sai",
      "Lựa chọn C - Đáp án sai",
      "Lựa chọn D - Đáp án sai",
    ],
    correctOptionIndex: 0,
    explanation: `Giải thích cho câu hỏi ${i + 1}: Đây là đáp án đúng vì...`,
  }));

  // Generate mock leaderboard
  const leaderboard: QuizLeaderboardEntry[] = [
    { rank: 1, playerName: "Nguyễn Văn A", score: 95, completedAt: new Date().toISOString() },
    { rank: 2, playerName: "Trần Thị B", score: 92, completedAt: new Date().toISOString() },
    { rank: 3, playerName: "Lê Văn C", score: 88, completedAt: new Date().toISOString() },
    { rank: 4, playerName: "Phạm Thị D", score: 85, completedAt: new Date().toISOString() },
    { rank: 5, playerName: "Hoàng Văn E", score: 82, completedAt: new Date().toISOString() },
  ];

  // Mock descriptions based on category
  const descriptions: Record<string, string> = {
    "Lập trình": "Bài kiểm tra này sẽ đánh giá kiến thức của bạn về lập trình, từ các khái niệm cơ bản đến các kỹ thuật nâng cao. Hãy chuẩn bị sẵn sàng để thử thách bản thân!",
    "Lịch sử": "Khám phá kiến thức lịch sử phong phú của Việt Nam qua các câu hỏi thú vị. Từ các triều đại cổ đại đến thời kỳ hiện đại, bạn sẽ học được nhiều điều bổ ích.",
    "Ngoại ngữ": "Nâng cao kỹ năng ngoại ngữ của bạn với bài kiểm tra này. Tập trung vào từ vựng, ngữ pháp và khả năng giao tiếp thực tế.",
    "Trí tuệ": "Thử thách trí tuệ của bạn với các câu hỏi logic và tư duy hình ảnh. Bài kiểm tra này sẽ giúp bạn rèn luyện khả năng phân tích và suy luận.",
    "Thể thao": "Kiểm tra kiến thức thể thao của bạn! Từ các giải đấu quốc tế đến các cầu thủ nổi tiếng, hãy chứng tỏ bạn là fan hâm mộ thực thụ.",
    "Kỹ năng số": "Học cách bảo vệ bản thân trong thời đại số. Bài kiểm tra này sẽ giúp bạn hiểu rõ hơn về an toàn thông tin và quyền riêng tư trên mạng.",
    "Văn hóa": "Khám phá vẻ đẹp văn hóa Việt Nam qua các câu hỏi về phong tục, truyền thống và lễ hội. Hãy tự hào về di sản văn hóa của chúng ta!",
    "Địa lý": "Du lịch qua các vùng miền của Việt Nam qua bài kiểm tra địa lý này. Từ núi non hùng vĩ đến biển cả bao la, khám phá vẻ đẹp của đất nước.",
    "Khởi nghiệp": "Học hỏi từ những câu chuyện khởi nghiệp thành công. Bài kiểm tra này sẽ giúp bạn hiểu rõ hơn về hành trình từ ý tưởng đến thành công.",
  };

  return {
    ...summary,
    description: descriptions[summary.category] || "Bài kiểm tra thú vị để nâng cao kiến thức của bạn. Hãy sẵn sàng để thử thách bản thân!",
    authorName: "Digital Youth Handbook",
    questions,
    highScore: Math.floor(Math.random() * 20) + 80, // Random 80-100
    maxLives: summary.difficulty === "Hard" ? 2 : summary.difficulty === "Medium" ? 3 : undefined,
    passingScore: summary.difficulty === "Hard" ? 80 : summary.difficulty === "Medium" ? 70 : 60,
    leaderboard,
  };
};

