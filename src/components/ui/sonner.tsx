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
      closeButton={false} // Đã tắt nút close theo yêu cầu cũ
      richColors={false}
      expand={true}
      duration={5000}
      toastOptions={{
        classNames: {
          // THAY ĐỔI Ở ĐÂY:
          // 1. items-center: Để icon và chữ căn giữa theo chiều dọc
          // 2. gap-4: Tăng khoảng cách cho thoáng
          toast:
            "group flex gap-4 p-4 border-none shadow-sm rounded-2xl items-center w-full font-sans",

          // Chỉnh lại text một chút để thẳng hàng hơn
          title: "font-bold text-[15px] leading-snug text-left",
          description:
            "text-[13px] font-medium opacity-90 leading-snug mt-0.5 text-left",

          // --- MÀU SẮC (Giữ nguyên) ---
          success:
            "data-[type=success]:bg-green-50 data-[type=success]:text-green-900",
          error: "data-[type=error]:bg-red-50 data-[type=error]:text-red-900",
          warning:
            "data-[type=warning]:bg-amber-50 data-[type=warning]:text-amber-900",
          info: "data-[type=info]:bg-blue-50 data-[type=info]:text-blue-900",
        },
      }}
      icons={{
        // Giữ nguyên icon
        success: (
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500">
            <CheckIcon className="h-4 w-4 text-white stroke-[3]" />
          </div>
        ),
        info: (
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500">
            <InfoIcon className="h-4 w-4 text-white stroke-[3]" />
          </div>
        ),
        warning: (
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-400">
            <AlertCircleIcon className="h-4 w-4 text-white stroke-[3]" />
          </div>
        ),
        error: (
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500">
            <XIcon className="h-4 w-4 text-white stroke-[3]" />
          </div>
        ),
        loading: <Loader2Icon className="h-5 w-5 animate-spin text-gray-500" />,
      }}
      {...props}
    />
  );
};

export { Toaster };
