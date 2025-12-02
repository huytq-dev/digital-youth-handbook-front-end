import { Trash2, AlertTriangle } from "lucide-react";
import { AnimatedText } from "@/components/animated-text";
import { Card, CardContent, Button } from "@/components/ui/primitives";

export const DangerZone = () => {
  return (
    <Card className="relative overflow-hidden rounded-xl border-2 border-black bg-red-50 shadow-[6px_6px_0px_black]">
      {/* Header Bar kiểu cảnh báo */}
      <div className="flex items-center gap-2 border-b-2 border-black bg-red-600 px-6 py-3 text-white">
        <AlertTriangle className="h-6 w-6 fill-yellow-400 text-black" />
        <h3 className="text-sm font-black uppercase tracking-widest text-white">
          Danger Zone
        </h3>
      </div>

      <CardContent className="relative z-10 flex flex-col items-start justify-between gap-6 p-6 sm:flex-row sm:items-center">
        <div className="space-y-2">
          <h3 className="text-lg font-black text-red-700">
            Xóa tài khoản vĩnh viễn
          </h3>
          <p className="max-w-md text-sm font-medium leading-relaxed text-red-900/70">
            <AnimatedText>
              Hành động này không thể hoàn tác. Dữ liệu của bạn bao gồm lịch sử
              học tập và thông tin cá nhân sẽ bị xóa hoàn toàn khỏi hệ thống.
            </AnimatedText>
          </p>
        </div>

        {/* Nút Xóa Style Neo-brutalism */}
        <Button
          variant="outline"
          className="shrink-0 h-12 gap-2 rounded-lg border-2 border-black bg-white px-6 font-bold text-red-600 shadow-[4px_4px_0px_black] transition-all hover:translate-y-[2px] hover:translate-x-[2px] hover:bg-red-600 hover:text-white hover:shadow-[2px_2px_0px_black] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none"
        >
          <Trash2 className="h-5 w-5" />
          <AnimatedText>Xóa tài khoản</AnimatedText>
        </Button>
      </CardContent>
    </Card>
  );
};