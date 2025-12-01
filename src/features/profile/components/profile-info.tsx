import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { AnimatedText } from "@/components/animated-text";
import type { UserProfile, GenderType } from "@/features/profile/profile.type";

export interface ProfileInfoProps {
  profile: UserProfile;
}

const getGenderLabel = (gender?: GenderType) => {
  if (gender === 0) return "Nam";
  if (gender === 1) return "Nữ";
  if (gender === 2) return "Khác";
  return "Không xác định";
};

export function ProfileInfo({ profile }: ProfileInfoProps) {
  return (
    <Card className="border-[hsl(var(--primary))]/20 bg-[hsl(var(--card))] shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <h2 className="text-base font-bold text-[hsl(var(--foreground))]">
          <AnimatedText>Thông tin cá nhân</AnimatedText>
        </h2>
      </CardHeader>
      <CardContent className="space-y-4 pt-0">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="name">
              <AnimatedText>Họ và tên</AnimatedText>
            </Label>
            <p className="mt-1 text-sm text-[hsl(var(--foreground))]">
              <AnimatedText>{profile.name}</AnimatedText>
            </p>
          </div>
          <div>
            <Label htmlFor="gender">
              <AnimatedText>Giới tính</AnimatedText>
            </Label>
            <p className="mt-1 text-sm text-[hsl(var(--foreground))]">
              <AnimatedText>{getGenderLabel(profile.gender)}</AnimatedText>
            </p>
          </div>
        </div>

        <div>
          <Label htmlFor="bio">
            <AnimatedText>Giới thiệu bản thân</AnimatedText>
          </Label>
          <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
            <AnimatedText>
              Hồ sơ cá nhân dùng để lưu lộ trình, mục tiêu và những ghi chú quan
              trọng trong hành trình phát triển bản thân của bạn.
            </AnimatedText>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}


