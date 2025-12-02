import * as React from "react";
import { Save, Camera, User, Mail, Calendar, MapPin, Users } from "lucide-react"; // Import thêm icon Users
import { AnimatedText } from "@/components/animated-text";
import { Button, Input, Card, CardContent } from "@/components/ui/primitives";
import { Label } from "@/components/ui/label";
import type { UserProfile, GenderType } from "@/features/profile/profile.type";
// Không cần import cn ở đây nếu không dùng trong PersonalInfo, nhưng giữ lại nếu cần cho các phần khác

// --- GenderDropdown Component (Đã cập nhật) ---
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
    // Tạo khung bao bọc (wrapper) để áp dụng hiệu ứng cho cả khối
    // Sử dụng 'focus-within:' để kích hoạt style khi thẻ select bên trong được focus
    <div className="relative flex items-center rounded-lg border-2 border-black bg-white px-3 transition-all focus-within:shadow-[4px_4px_0px_black] focus-within:-translate-y-1 focus-within:-translate-x-1">
      {/* Icon bên trái cho đồng bộ style */}
      <Users className="text-slate-400 shrink-0 mr-2" size={16} />
      
      <select
        id="profile-gender"
        defaultValue={value !== undefined ? String(value as GenderType) : ""}
        onChange={(e) => {
          const v = e.target.value;
          onChange?.(v === "" ? undefined : (Number(v) as GenderType));
        }}
        // Thẻ select trong suốt, không viền, không outline
        className="flex h-11 w-full appearance-none border-0 bg-transparent p-0 text-sm font-medium outline-none focus-visible:ring-0 pr-8"
      >
        <option value="">Chọn giới tính</option>
        {GENDER_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      
      {/* Icon mũi tên tùy chỉnh bên phải, di chuyển cùng khung */}
      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 4L6 8L10 4" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
};

// --- PersonalInfo Component ---
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
    <Card className="overflow-hidden rounded-xl border-2 border-black bg-white shadow-[6px_6px_0px_black]">
      {/* Header Card */}
      <div className="border-b-2 border-black bg-yellow-300 px-6 py-4 flex items-center justify-between">
        <div>
            <h2 className="text-lg font-black text-black uppercase tracking-tight flex items-center gap-2">
              <User className="fill-white" size={20} />
              Thông tin cá nhân
            </h2>
            <p className="text-xs font-bold text-slate-700 mt-1">
              Cập nhật hồ sơ để nhận lộ trình phù hợp nhất.
            </p>
        </div>
        <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full border-2 border-black bg-red-500" />
            <div className="w-3 h-3 rounded-full border-2 border-black bg-blue-500" />
        </div>
      </div>

      <CardContent className="p-6 space-y-8">
        {/* Avatar Section (Giữ nguyên) */}
        <div className="flex items-center gap-6">
          <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
            <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-black bg-gray-100 shadow-[4px_4px_0px_black] transition-transform group-hover:translate-y-1 group-hover:translate-x-1 group-hover:shadow-none">
              <img
                src={avatar ?? user.picture ?? "https://i.pravatar.cc/150"}
                alt={user.name}
                className="h-full w-full object-cover"
              />
            </div>
            <button
              type="button"
              className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-blue-500 text-white hover:bg-blue-600 transition-colors z-10"
            >
              <Camera size={14} />
            </button>
          </div>
          
          <div className="flex flex-col space-y-1">
            <span className="text-xl font-black text-slate-900">
              {user.name}
            </span>
            <span className="text-sm font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-black w-fit">
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

        {/* Form Inputs */}
        <form
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit?.({});
          }}
        >
          {/* Họ và tên (Giữ nguyên vì không có icon bên trong) */}
          <div className="space-y-2">
            <Label htmlFor="profile-name" className="font-bold text-slate-700">Họ và tên</Label>
            <Input
              id="profile-name"
              defaultValue={user.name}
              className="h-11 rounded-lg border-2 border-black bg-white focus-visible:ring-0 focus:shadow-[4px_4px_0px_black] focus:-translate-y-1 focus:-translate-x-1 transition-all"
            />
          </div>

          {/* Email (Read-only, giữ nguyên) */}
          <div className="space-y-2">
            <Label htmlFor="profile-email" className="font-bold text-slate-700 flex items-center gap-1">
                Email <span className="text-[10px] text-red-500 font-normal">(Không thể thay đổi)</span>
            </Label>
            <div className="relative">
                <Input
                  id="profile-email"
                  value={user.email}
                  readOnly
                  className="h-11 cursor-not-allowed rounded-lg border-2 border-black bg-gray-100 text-gray-500 pl-10"
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            </div>
          </div>

          {/* Ngày sinh (Đã cập nhật) */}
          {/* Thêm class 'group' vào thẻ cha để quản lý trạng thái focus */}
          <div className="space-y-2 group">
            <Label htmlFor="profile-dob" className="font-bold text-slate-700">Ngày sinh</Label>
            {/* Khung bao bọc: chịu trách nhiệm hiển thị viền, nền và hiệu ứng chuyển động */}
            <div className="relative flex items-center rounded-lg border-2 border-black bg-white px-3 transition-all group-focus-within:shadow-[4px_4px_0px_black] group-focus-within:-translate-y-1 group-focus-within:-translate-x-1">
                {/* Icon nằm trong khung, di chuyển cùng khung */}
                <Calendar className="text-slate-400 shrink-0 mr-2" size={16} />
                <Input
                  id="profile-dob"
                  type="date"
                  defaultValue={user.dob?.split("T")[0]}
                  // Input trong suốt, không viền, không có hiệu ứng focus riêng
                  className="h-11 w-full border-0 bg-transparent p-0 focus-visible:ring-0"
                />
            </div>
          </div>

          {/* Giới tính (Sử dụng component đã cập nhật) */}
          <div className="space-y-2">
            <Label htmlFor="profile-gender" className="font-bold text-slate-700">Giới tính</Label>
            <GenderDropdown value={user.gender} />
          </div>

          {/* Địa chỉ (Đã cập nhật) */}
          <div className="md:col-span-2 space-y-2 group">
            <Label htmlFor="profile-address" className="font-bold text-slate-700">Địa chỉ</Label>
            {/* Khung bao bọc tương tự Ngày sinh */}
            <div className="relative flex items-start rounded-lg border-2 border-black bg-white px-3 py-2 transition-all group-focus-within:shadow-[4px_4px_0px_black] group-focus-within:-translate-y-1 group-focus-within:-translate-x-1">
                {/* Icon căn lên trên cùng (mt-1 để căn chỉnh với dòng text đầu tiên) */}
                <MapPin className="text-slate-400 shrink-0 mr-2 mt-1" size={16} />
                <textarea
                  id="profile-address"
                  rows={3}
                  defaultValue={user.address}
                  // Textarea trong suốt, không viền
                  className="flex min-h-[80px] w-full resize-none border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground outline-none focus-visible:ring-0"
                />
            </div>
          </div>

          <div className="md:col-span-2 flex justify-end pt-4 border-t-2 border-dashed border-slate-200">
            <Button
              type="submit"
              className="h-11 rounded-lg border-2 border-black bg-blue-600 px-8 text-sm font-bold text-white shadow-[4px_4px_0px_black] hover:bg-blue-700 hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_black] active:shadow-none active:translate-y-[4px] active:translate-x-[4px] transition-all"
            >
              <Save className="mr-2 h-4 w-4" />
              <AnimatedText>Lưu Thay Đổi</AnimatedText>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};