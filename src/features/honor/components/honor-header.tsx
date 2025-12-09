import { Trophy, Star, Medal, Zap, Target } from "lucide-react";
import { cn } from "@/lib/utils";

export const HonorHeader = () => {
  return (
    <div className="relative bg-gradient-to-r from-yellow-300 via-orange-300 to-red-400 border-4 border-black rounded-2xl p-6 shadow-[6px_6px_0px_black] overflow-hidden mb-8">
      {/* Background pattern - Giữ nguyên nhưng mờ hơn chút */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, black 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Content Container - Chuyển sang Flex row trên desktop */}
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        {/* LEFT: Title Area */}
        <div className="flex items-center gap-4">
          <div className="bg-yellow-400 border-3 border-black rounded-xl p-3 shadow-[3px_3px_0px_black] flex-shrink-0">
            <Trophy size={32} className="text-black" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-black drop-shadow-[2px_2px_0px_white] leading-none">
              Vinh Danh
            </h1>
            <p className="text-sm font-bold text-black/80 mt-1 max-w-xs">
              Thành tựu nổi bật của cộng đồng
            </p>
          </div>
        </div>

        {/* RIGHT: Feature Badges - Thu nhỏ lại và xếp ngang */}
        <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <FeatureBadge 
            icon={<Medal size={18} />} 
            label="Xếp hạng" 
            color="text-yellow-700" 
          />
          <FeatureBadge 
            icon={<Zap size={18} />} 
            label="Performer" 
            color="text-orange-700" 
          />
          <FeatureBadge 
            icon={<Target size={18} />} 
            label="Chính xác" 
            color="text-red-700" 
          />
        </div>
      </div>

      {/* Decorative stars - Thu nhỏ và chỉnh vị trí tinh tế hơn */}
      <Star size={24} className="absolute top-4 right-4 text-white/40 rotate-12" fill="currentColor" />
      <Star size={16} className="absolute bottom-4 left-[40%] text-white/30 -rotate-12" fill="currentColor" />
    </div>
  );
};

// Component con để hiển thị badge nhỏ gọn
const FeatureBadge = ({ icon, label, color }: { icon: React.ReactNode, label: string, color: string }) => (
  <div className={cn(
    "flex items-center gap-2 px-4 py-2 bg-white/60 border-2 border-black rounded-lg shadow-[2px_2px_0px_black]",
    "flex-1 md:flex-none justify-center whitespace-nowrap"
  )}>
    <div className={color}>{icon}</div>
    <span className="text-xs font-black uppercase text-slate-800">{label}</span>
  </div>
);