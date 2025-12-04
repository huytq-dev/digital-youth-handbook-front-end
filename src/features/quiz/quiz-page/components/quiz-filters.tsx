import { Filter, Layers, Zap, RotateCcw } from "lucide-react";

interface QuizFiltersProps {
  categories: string[];
  selectedCategory: string | null;
  selectedDifficulty: string | null;
  onSelectCategory: (category: string | null) => void;
  onSelectDifficulty: (difficulty: string | null) => void;
  onReset: () => void;
}

export const QuizFilters = ({
  categories,
  selectedCategory,
  selectedDifficulty,
  onSelectCategory,
  onSelectDifficulty,
  onReset,
}: QuizFiltersProps) => {
  return (
    <aside className="w-full shrink-0 space-y-8 lg:sticky lg:top-28 lg:w-64">
      {/* Box Bộ lọc */}
      <div className="rounded-xl border-2 border-black bg-white p-5 shadow-[6px_6px_0px_black]">
        <div className="mb-4 flex items-center gap-2 border-b-2 border-black pb-2 text-lg font-black uppercase">
          <Filter size={20} /> Bộ lọc
        </div>
        {/* 1. Chủ đề */}
        <div className="mb-6">
          <div className="mb-3 flex items-center gap-2 text-sm font-bold uppercase text-slate-500">
            <Layers size={16} /> Chủ đề
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => onSelectCategory(null)}
              className={`text-left text-sm font-bold transition-all hover:translate-x-1 ${
                selectedCategory === null
                  ? "text-blue-600 underline decoration-2 underline-offset-4"
                  : "text-slate-700 hover:text-black"
              }`}
            >
              • Tất cả chủ đề
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onSelectCategory(category)}
                className={`text-left text-sm font-bold transition-all hover:translate-x-1 ${
                  selectedCategory === category
                    ? "text-blue-600 underline decoration-2 underline-offset-4"
                    : "text-slate-700 hover:text-black"
                }`}
              >
                • {category}
              </button>
            ))}
          </div>
        </div>
        {/* 2. Độ khó */}
        <div className="mb-6">
          <div className="mb-3 flex items-center gap-2 text-sm font-bold uppercase text-slate-500">
            <Zap size={16} /> Độ khó
          </div>
          <div className="flex flex-wrap gap-2">
            {/* Nút reset độ khó */}
            <button
              onClick={() => onSelectDifficulty(null)}
              className={`rounded-md border-2 border-black px-3 py-1 text-xs font-bold uppercase transition-all hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_black] ${
                selectedDifficulty === null
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
            >
              All
            </button>
            {["Easy", "Medium", "Hard"].map((difficulty) => {
              let activeColor = "bg-slate-200";
              if (difficulty === "Easy") activeColor = "bg-green-400";
              if (difficulty === "Medium") activeColor = "bg-yellow-400";
              if (difficulty === "Hard") activeColor = "bg-red-400";

              const isSelected = selectedDifficulty === difficulty;

              return (
                <button
                  key={difficulty}
                  onClick={() => onSelectDifficulty(difficulty)}
                  className={`rounded-md border-2 border-black px-3 py-1 text-xs font-bold uppercase transition-all hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_black] ${
                    isSelected ? activeColor : "bg-white"
                  }`}
                >
                  {difficulty}
                </button>
              );
            })}
          </div>
        </div>
        {/* Nút Reset All */}
        <button
          onClick={onReset}
          className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-black bg-slate-100 py-2 text-xs font-black uppercase text-slate-600 hover:bg-slate-200"
        >
          <RotateCcw size={14} /> Đặt lại
        </button>
      </div>
    </aside>
  );
};

