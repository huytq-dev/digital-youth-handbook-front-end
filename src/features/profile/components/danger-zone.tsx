import { Trash2, AlertTriangle } from "lucide-react";
import { AnimatedText } from "@/components/animated-text";
import { Card, CardContent, Button } from "@/components/ui/primitives";

export const DangerZone = () => {
  return (
    <Card className="border border-red-200 bg-red-50/40 shadow-none">
      <CardContent className="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-red-700">
            <AlertTriangle size={18} />
            <h3 className="text-sm font-bold">Xóa tài khoản vĩnh viễn</h3>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-red-700/80">
            <AnimatedText>
              Hành động này không thể hoàn tác. Dữ liệu của bạn bao gồm lịch sử
              học tập và thông tin cá nhân sẽ bị xóa hoàn toàn khỏi hệ thống.
            </AnimatedText>
          </p>
        </div>
        <Button
          variant="outline"
          className="shrink-0 border border-red-300 bg-[hsl(var(--background))] text-red-600 shadow-sm transition-all hover:bg-red-600 hover:text-white"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          <AnimatedText>Xóa tài khoản</AnimatedText>
        </Button>
      </CardContent>
    </Card>
  );
};

