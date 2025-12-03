import {
  CheckIcon,
  InfoIcon,
  Loader2Icon,
  XIcon,
  AlertCircleIcon,
} from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      position="bottom-right"
      richColors={false}
      expand={true}
      duration={5000}
      gap={12}
      toastOptions={{
        classNames: {
          // --- BASE TOAST ---
          // border-2: Viền dày, p-5: Padding rộng cho "béo béo"
          toast:
            "group flex gap-4 p-5 items-start w-full font-sans border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-xl transition-all duration-200 hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
          
          // Typography: Đậm, to, rõ ràng
          title: "font-black text-lg text-black uppercase tracking-tight leading-tight",
          description: "text-[15px] font-bold text-slate-700 leading-snug mt-1",
          
          // Action Buttons bên trong Toast
          actionButton: "bg-black text-white font-bold text-sm py-2 px-4 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_white] active:translate-y-[1px] active:shadow-none",
          cancelButton: "bg-white text-black font-bold text-sm py-2 px-4 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_black] active:translate-y-[1px] active:shadow-none",
          
          // Close Button
          closeButton: "bg-white border-2 border-black text-black w-7 h-7 flex items-center justify-center shadow-[2px_2px_0px_0px_black] hover:bg-red-100 active:translate-y-[2px] active:shadow-none top-4 right-4 absolute opacity-100",

          // --- COLORS (Màu nền Pastel tươi sáng, hoạt hình) ---
          success: "data-[type=success]:bg-[#D1FAE5]", // Xanh lá tươi nhẹ
          error: "data-[type=error]:bg-[#FEE2E2]", // Đỏ nhẹ
          warning: "data-[type=warning]:bg-[#FEF3C7]", // Vàng chanh nhẹ
          info: "data-[type=info]:bg-[#DBEAFE]", // Xanh dương nhẹ
        },
      }}
      icons={{
        // Icon Container: Vuông vức, viền dày, icon to - Màu tươi sáng hoạt hình
        success: (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-2 border-black bg-[#10B981] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <CheckIcon className="h-6 w-6 text-white stroke-[4]" />
          </div>
        ),
        info: (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-2 border-black bg-[#2563EB] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <InfoIcon className="h-6 w-6 text-white stroke-[4]" />
          </div>
        ),
        warning: (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-2 border-black bg-[#FBBF24] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <AlertCircleIcon className="h-6 w-6 text-black stroke-[3]" />
          </div>
        ),
        error: (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-2 border-black bg-[#EF4444] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <XIcon className="h-6 w-6 text-white stroke-[4]" />
          </div>
        ),
        loading: <Loader2Icon className="h-8 w-8 animate-spin text-black" />,
      }}
      {...props}
    />
  );
};

export { Toaster };