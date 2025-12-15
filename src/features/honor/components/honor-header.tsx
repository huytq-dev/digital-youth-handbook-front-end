import { Trophy, Star, Medal, Zap, Target } from "lucide-react";
import { cn } from "@/lib/utils";

export const HonorHeader = () => {
  return (
    <div className="relative bg-gradient-to-r from-yellow-300 via-orange-300 to-red-400 border-2 sm:border-3 md:border-4 border-black rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-[3px_3px_0px_black] sm:shadow-[4px_4px_0px_black] md:shadow-[6px_6px_0px_black] overflow-hidden mb-6 sm:mb-8">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, black 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col gap-4 sm:gap-5 md:flex-row md:items-center md:justify-between md:gap-6">
        
        {/* LEFT: Title Area */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="bg-yellow-400 border-2 sm:border-3 border-black rounded-lg sm:rounded-xl p-2 sm:p-3 shadow-[2px_2px_0px_black] sm:shadow-[3px_3px_0px_black] flex-shrink-0">
            <Trophy size={24} className="text-black sm:w-7 sm:h-7 md:w-8 md:h-8" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-black drop-shadow-[2px_2px_0px_white] leading-none">
              Vinh Danh
            </h1>
            <p className="text-xs sm:text-sm font-bold text-black/80 mt-1 max-w-[200px] sm:max-w-xs">
              Thành tựu nổi bật của cộng đồng
            </p>
          </div>
        </div>

        {/* RIGHT: Feature Badges - Responsive grid trên mobile */}
        <div className="grid grid-cols-3 gap-2 sm:flex sm:gap-3 w-full md:w-auto">
          <FeatureBadge 
            icon={<Medal size={14} className="sm:w-[18px] sm:h-[18px]" />} 
            label="Xếp hạng" 
            color="text-yellow-700" 
          />
          <FeatureBadge 
            icon={<Zap size={14} className="sm:w-[18px] sm:h-[18px]" />} 
            label="Performer" 
            color="text-orange-700" 
          />
          <FeatureBadge 
            icon={<Target size={14} className="sm:w-[18px] sm:h-[18px]" />} 
            label="Chính xác" 
            color="text-red-700" 
          />
        </div>
      </div>

      {/* Decorative stars */}
      <Star size={20} className="absolute top-3 right-3 text-white/40 rotate-12 sm:w-6 sm:h-6 sm:top-4 sm:right-4" fill="currentColor" />
      <Star size={14} className="absolute bottom-3 left-[35%] text-white/30 -rotate-12 sm:w-4 sm:h-4 sm:bottom-4 sm:left-[40%]" fill="currentColor" />
    </div>
  );
};

// Component con để hiển thị badge nhỏ gọn
const FeatureBadge = ({ icon, label, color }: { icon: React.ReactNode, label: string, color: string }) => (
  <div className={cn(
    "flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-white/60 border sm:border-2 border-black rounded-md sm:rounded-lg shadow-[1px_1px_0px_black] sm:shadow-[2px_2px_0px_black]",
    "justify-center whitespace-nowrap flex-1 sm:flex-none"
  )}>
    <div className={color}>{icon}</div>
    <span className="text-[10px] sm:text-xs font-black uppercase text-slate-800">{label}</span>
  </div>
);