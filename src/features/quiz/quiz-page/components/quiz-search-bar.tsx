import { useState } from "react";
import { Search } from "lucide-react";

interface QuizSearchBarProps {
  onSearchChange?: (value: string) => void;
  placeholder?: string;
}

export const QuizSearchBar = ({ onSearchChange, placeholder = "Tìm kiếm chủ đề bạn quan tâm..." }: QuizSearchBarProps) => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearchChange?.(value);
  };

  return (
    <div className="relative w-full mb-8"> 
      <div className="relative group max-w-lg">
        <input
          type="text"
          value={searchValue}
          onChange={handleChange}
          placeholder={placeholder}
          // 1. Thêm class 'peer' vào input để các phần tử bên cạnh có thể lắng nghe sự kiện của nó
          className="peer w-full rounded-xl border-2 border-black bg-white py-3 pl-11 pr-4 text-sm font-bold text-slate-900 placeholder:text-slate-400 shadow-[4px_4px_0px_black] focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_black] transition-all"
        />
        
        <Search 
          // 2. Chuyển transition-transform thành transition-all để mượt cả margin
          // 3. Thêm peer-focus:ml-[2px] và peer-focus:mt-[2px] để icon dịch chuyển cùng input
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-900 transition-all group-hover:scale-110 peer-focus:ml-[2px] peer-focus:mt-[2px]" 
          size={18} 
          strokeWidth={3} 
        />
      </div>
    </div>
  );
};