import { Lightbulb, List, CheckCircle2 } from "lucide-react";

// --- Dữ liệu Mục lục (Label + ID tương ứng) ---
export const TOC_ITEMS = [
  { label: 'Mục tiêu chủ đề', id: 'section-objectives' },
  { label: 'Nội dung trọng tâm', id: 'section-content' },
  { label: 'Infographic ghi nhớ', id: 'section-infographic' },
  { label: 'Trắc nghiệm', id: 'section-quiz' },
];

// 1. Component "Góc Mách Nhỏ" (Fun Fact)
export const FunFactCard = () => (
  <div className="relative group">
    {/* Băng dính */}
    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-white/40 backdrop-blur-sm border-l-2 border-r-2 border-white/50 rotate-[-2deg] z-10" />
    
    <div className="bg-yellow-200 border-2 border-black p-5 rounded-bl-[30px] rounded-tr-[30px] shadow-[4px_4px_0px_black] hover:rotate-1 transition-transform cursor-default">
      <h3 className="font-black text-black uppercase flex items-center gap-2 mb-2">
        <Lightbulb size={20} className="fill-white" /> Góc Mách Nhỏ
      </h3>
      <p className="text-sm font-bold text-slate-800 leading-snug">
        Bạn có biết? Kỹ năng số không chỉ là biết dùng máy tính, mà còn là tư duy phản biện khi tiếp nhận thông tin trên mạng xã hội đấy!
      </p>
    </div>
  </div>
);

// 3. Component "Mục lục" (Table of Contents) - Có Active State
interface TableOfContentsProps {
  activeId?: string;
}

export const TableOfContents = ({ activeId = "" }: TableOfContentsProps) => {
  // Hàm xử lý cuộn trang
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Tính toán vị trí để trừ hao chiều cao Header (khoảng 100px)
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="bg-white border-2 border-black rounded-xl p-5 shadow-[4px_4px_0px_black]">
      <h3 className="font-black text-black uppercase mb-4 flex items-center gap-2 border-b-2 border-dashed border-slate-200 pb-2">
        <List size={20} /> Mục lục
      </h3>
      <ul className="space-y-3">
        {TOC_ITEMS.map((item, i) => {
          const isActive = activeId === item.id;
          return (
            <li 
              key={i} 
              onClick={() => scrollToSection(item.id)}
              className={`flex items-center gap-2 text-sm font-bold cursor-pointer transition-all duration-300 group ${
                isActive 
                  ? "text-emerald-700 translate-x-2"
                  : "text-slate-600 hover:text-emerald-600 hover:translate-x-1"
              }`}
            >
              <CheckCircle2 
                size={14} 
                className={`transition-colors duration-300 ${
                  isActive ? "text-emerald-600 fill-emerald-100" : "text-slate-300 group-hover:text-emerald-400"
                }`} 
              />
              {item.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
