import { Lightbulb, Download, FileText, List, CheckCircle2 } from "lucide-react";

// --- Dữ liệu Mục lục (Label + ID tương ứng) ---
const TOC_ITEMS = [
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

// 2. Component "Tài liệu đính kèm" (Downloads)
export const ResourceCard = () => (
  <div className="bg-white border-2 border-black rounded-xl overflow-hidden shadow-[4px_4px_0px_black] hover:-translate-y-1 transition-transform">
    <div className="bg-blue-600 p-3 border-b-2 border-black flex justify-between items-center text-white">
      <span className="font-black uppercase text-sm flex items-center gap-2">
        <Download size={16} /> Tài liệu
      </span>
      <div className="flex gap-1">
        <div className="w-2 h-2 bg-white rounded-full" />
        <div className="w-2 h-2 bg-white/50 rounded-full" />
      </div>
    </div>
    <div className="p-4 space-y-3">
      {['Slide bài giảng.pdf', 'Sổ tay hướng dẫn.docx'].map((file, i) => (
        <button key={i} className="flex items-center gap-3 w-full p-2 hover:bg-blue-50 rounded-lg border-2 border-transparent hover:border-black/10 transition-all group">
          <div className="w-8 h-8 bg-slate-100 rounded border border-black flex items-center justify-center group-hover:bg-white">
            <FileText size={16} className="text-slate-600" />
          </div>
          <span className="text-sm font-bold text-slate-700 truncate">{file}</span>
        </button>
      ))}
    </div>
  </div>
);

// 3. Component "Mục lục" (Table of Contents) - Đã cập nhật logic Scroll
export const TableOfContents = () => {
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
        {TOC_ITEMS.map((item, i) => (
          <li 
            key={i} 
            onClick={() => scrollToSection(item.id)}
            className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-blue-600 cursor-pointer transition-colors group"
          >
            <CheckCircle2 size={14} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};