import { useMemo, useState } from "react";
import { QuizSearchBar } from "./quiz-search-bar";
import { QuizFilters } from "./quiz-filters";
import { QuizGrid } from "./quiz-grid";
import type { QuizSummary } from "@/features/quiz/quiz.type";

// --- MOCK DATA (Giữ nguyên) ---
const MOCK_QUIZZES: QuizSummary[] = [
  {
    id: "1",
    title: "Kiểm tra trình độ ReactJS cơ bản đến nâng cao",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    category: "Lập trình",
    difficulty: "Hard",
    durationMinutes: 15,
    totalQuestions: 20,
    plays: 1250,
  },
  {
    id: "2",
    title: "Bạn hiểu biết bao nhiêu về Lịch sử Việt Nam?",
    thumbnail: "https://images.unsplash.com/photo-1555952494-efd681c7a3f9?w=800&q=80",
    category: "Lịch sử",
    difficulty: "Medium",
    durationMinutes: 10,
    totalQuestions: 10,
    plays: 890,
  },
  {
    id: "3",
    title: "Tiếng Anh giao tiếp công sở",
    thumbnail: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&q=80",
    category: "Ngoại ngữ",
    difficulty: "Easy",
    durationMinutes: 20,
    totalQuestions: 15,
    plays: 2100,
  },
  {
    id: "4",
    title: "IQ Test: Logic và Tư duy hình ảnh",
    thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80",
    category: "Trí tuệ",
    difficulty: "Hard",
    durationMinutes: 45,
    totalQuestions: 30,
    plays: 3450,
  },
  {
    id: "5",
    title: "Kiến thức bóng đá Ngoại Hạng Anh",
    thumbnail: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80",
    category: "Thể thao",
    difficulty: "Easy",
    durationMinutes: 8,
    totalQuestions: 12,
    plays: 567,
  },
  {
    id: "6",
    title: "Kỹ năng số: An toàn thông tin trên mạng",
    thumbnail: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
    category: "Kỹ năng số",
    difficulty: "Medium",
    durationMinutes: 12,
    totalQuestions: 18,
    plays: 1234,
  },
  {
    id: "7",
    title: "Văn hóa và Phong tục Việt Nam",
    thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    category: "Văn hóa",
    difficulty: "Easy",
    durationMinutes: 15,
    totalQuestions: 20,
    plays: 987,
  },
  {
    id: "8",
    title: "Kiến thức về Biển Đảo Việt Nam",
    thumbnail: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&q=80",
    category: "Địa lý",
    difficulty: "Medium",
    durationMinutes: 10,
    totalQuestions: 15,
    plays: 678,
  },
  {
    id: "9",
    title: "Khởi nghiệp: Từ ý tưởng đến thành công",
    thumbnail: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80",
    category: "Khởi nghiệp",
    difficulty: "Hard",
    durationMinutes: 25,
    totalQuestions: 25,
    plays: 1456,
  },
];

const QuizListingPage = () => {
  const quizzes = MOCK_QUIZZES;
  const isLoading = false;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  const categories = useMemo(() => {
    if (!quizzes) return [];
    const uniqueCategories = Array.from(new Set(quizzes.map((q) => q.category)));
    return uniqueCategories.sort();
  }, [quizzes]);

  const filteredQuizzes = useMemo(() => {
    if (!quizzes) return [];
    return quizzes.filter((quiz) => {
      const matchesSearch =
        searchQuery === "" ||
        quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quiz.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === null || quiz.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === null || quiz.difficulty === selectedDifficulty;
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [quizzes, searchQuery, selectedCategory, selectedDifficulty]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setSelectedDifficulty(null);
  };

  return (
    <main 
      className="min-h-screen bg-[#fff9f0] pb-24 pt-32 font-sans text-slate-900 selection:bg-yellow-400 selection:text-black"
      style={{
        backgroundImage: "radial-gradient(#cbd5e1 2px, transparent 2px)",
        backgroundSize: "32px 32px",
      }}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          
          {/* --- LEFT SIDEBAR COMPONENT --- */}
          <QuizFilters 
            categories={categories}
            selectedCategory={selectedCategory}
            selectedDifficulty={selectedDifficulty}
            onSelectCategory={setSelectedCategory}
            onSelectDifficulty={setSelectedDifficulty}
            onReset={() => {
                setSelectedCategory(null);
                setSelectedDifficulty(null);
            }}
          />

          {/* --- RIGHT MAIN CONTENT --- */}
          <div className="flex-1">
            
            {/* --- HEADER (Đã xóa description box) --- */}
            <div className="mb-8 text-left">
              <h1 className="flex flex-wrap items-center gap-3 text-4xl font-black uppercase md:text-5xl">
                <span className="text-slate-900 drop-shadow-sm">Thư viện</span>
                
                {/* Chữ QUIZ style Sticker */}
                <span className="inline-block -rotate-3 transform rounded-lg border-2 border-black bg-blue-600 px-4 py-1 text-white shadow-[4px_4px_0px_black] transition-transform hover:rotate-2 hover:scale-105">
                  Quiz
                </span>
              </h1>
            </div>

            {/* Search Bar */}
            <div className="mb-8">
               <QuizSearchBar onSearchChange={setSearchQuery} placeholder="Tìm kiếm bài thi..." />
            </div>

            {/* Grid Component */}
            <QuizGrid 
                quizzes={filteredQuizzes}
                isLoading={isLoading}
                totalCount={quizzes.length}
                onResetFilter={handleResetFilters}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default QuizListingPage;