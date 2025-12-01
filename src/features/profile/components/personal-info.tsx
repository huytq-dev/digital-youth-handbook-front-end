import * as React from "react";
import { Save, Camera } from "lucide-react";
import { AnimatedText } from "@/components/animated-text";
import { Button, Input, Card, CardContent } from "@/components/ui/primitives";
import { Label } from "@/components/ui/label";
import type { UserProfile, GenderType } from "@/features/profile/profile.type";

interface GenderDropdownProps {
  value?: GenderType;
  onChange?: (value: GenderType | undefined) => void;
}

const GENDER_OPTIONS: { label: string; value: GenderType }[] = [
  { label: "Nam", value: 0 },
  { label: "Nữ", value: 1 },
  { label: "Khác", value: 2 },
];

const GenderDropdown: React.ComponentType<GenderDropdownProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="relative">
      <select
        id="profile-gender"
        defaultValue={value !== undefined ? String(value as GenderType) : ""}
        onChange={(e) => {
          const v = e.target.value;
          onChange?.(v === "" ? undefined : (Number(v) as GenderType));
        }}
        className="flex h-10 w-full appearance-none rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-muted-foreground outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <option value="">Chọn giới tính</option>
        {GENDER_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

interface PersonalInfoProps {
  user: UserProfile;
  onSubmit?: (data: Partial<UserProfile>) => void;
}

export const PersonalInfo = ({ user, onSubmit }: PersonalInfoProps) => {
  const [avatar, setAvatar] = React.useState<string | undefined>(user.picture);
  const avatarInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleAvatarClick = () => {
    avatarInputRef.current?.click();
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setAvatar(url);
  };

  return (
    <Card className="overflow-hidden border border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <div className="border-b border-[hsl(var(--border))] bg-[hsl(var(--secondary))]/40 px-6 py-4">
        <h2 className="text-base font-bold text-[hsl(var(--foreground))]">
          Thông tin cá nhân
        </h2>
        <p className="text-xs text-[hsl(var(--muted-foreground))]">
          Cập nhật thông tin chi tiết của bạn tại đây.
        </p>
      </div>

      <CardContent className="p-6 space-y-6">
        {/* Avatar + basic info */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleAvatarClick}
            className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-[hsl(var(--card))] bg-[hsl(var(--secondary))] shadow focus-visible:outline-none"
          >
            <img
              src={avatar ?? user.picture}
              alt={user.name}
              className="h-full w-full object-cover"
            />
            <span className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--muted-foreground))] shadow-sm">
              <Camera size={12} />
            </span>
          </button>
          <div className="flex flex-col">
            <span className="text-base font-semibold text-[hsl(var(--foreground))]">
              {user.name}
            </span>
            <span className="text-xs text-[hsl(var(--muted-foreground))]">
              {user.email}
            </span>
          </div>
          <input
            ref={avatarInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>

        <form
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit?.({});
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="profile-name">Họ và tên</Label>
            <Input
              id="profile-name"
              defaultValue={user.name}
              className="h-10 border-[hsl(var(--input))] focus:border-[hsl(var(--primary))] focus:ring-[hsl(var(--primary))/0.2]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="profile-email">Email</Label>
            <Input
              id="profile-email"
              value={user.email}
              readOnly
              className="h-10 cursor-not-allowed border-[hsl(var(--input))] bg-[hsl(var(--secondary))] text-[hsl(var(--muted-foreground))]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="profile-dob">Ngày sinh</Label>
            <Input
              id="profile-dob"
              type="date"
              defaultValue={user.dob?.split("T")[0]}
              className="h-10 border-[hsl(var(--input))] focus-visible:ring-1 focus-visible:ring-[hsl(var(--primary))] focus-visible:ring-offset-0 focus:border-[hsl(var(--primary))]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="profile-gender">Giới tính</Label>
            <GenderDropdown value={user.gender} />
          </div>

          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="profile-address">Địa chỉ</Label>
            <textarea
              id="profile-address"
              rows={3}
              defaultValue={user.address}
              className="flex min-h-[80px] w-full resize-none rounded-md border border-gray-200 bg-background px-3 py-2 text-sm placeholder:text-muted-foreground outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="md:col-span-2 flex justify-end pt-2">
            <Button
              type="submit"
              className="h-10 rounded-full bg-[hsl(var(--primary))] px-6 text-sm font-semibold shadow-lg shadow-[hsl(var(--primary))/0.3] hover:bg-[hsl(var(--primary))/0.9]"
            >
              <Save className="mr-2 h-4 w-4" />
              <AnimatedText>Lưu thay đổi</AnimatedText>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

