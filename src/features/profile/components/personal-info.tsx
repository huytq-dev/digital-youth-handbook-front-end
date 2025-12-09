import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { Save, Camera, User, Mail, Calendar, MapPin, Loader2 } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { AnimatedText } from "@/components/animated-text";
import { Button, Input, Card, CardContent } from "@/components/ui/primitives";
import { Label } from "@/components/ui/label";
import type { UserProfile, GenderType, UpdateUserProfileRequest } from "@/features/profile/profile.type";
import { parseDateForInput } from "@/lib/utils";
import { useUpdateUserProfileMutation } from "@/features/profile/profile.api";
import { updateUserProfileSchema, type UpdateUserProfileFormData } from "@/features/profile/profile.schema";
import { isApiResponseSuccess, getApiErrorMessage } from "@/features/common/common.type";
import { showToast } from "@/lib/toast";
import { updateUserProfile } from "@/features/auth/auth.slice";
import { authService } from "@/features/auth/auth.storage";
import type { UserDomainModel } from "@/features/common/common.type";
import { AvatarUploadModal } from "./avatar-upload-modal";

interface GenderDropdownProps {
  value?: GenderType | null;
  onChange?: (value: GenderType | undefined) => void;
  error?: string;
}

// Backend enum: Male = 1, Female = 2, Other = 3
const GENDER_OPTIONS: { label: string; value: GenderType }[] = [
  { label: "Nam", value: 1 },
  { label: "Nữ", value: 2 },
  { label: "Khác", value: 3 },
];

const GenderDropdown: React.ComponentType<GenderDropdownProps> = ({
  value,
  onChange,
  error,
}) => {
  return (
    <div>
      <div className="relative">
        <select
          id="profile-gender"
          value={value !== undefined && value !== null ? String(value as GenderType) : ""}
          onChange={(e) => {
            const v = e.target.value;
            onChange?.(v === "" ? undefined : (Number(v) as GenderType));
          }}
          className={`flex h-11 w-full appearance-none rounded-lg border-2 ${error ? 'border-red-500' : 'border-black'} bg-white px-3 py-2 text-sm font-medium outline-none transition-all focus:shadow-[4px_4px_0px_black] focus:-translate-y-1 focus:-translate-x-1`}
        >
          <option value="">Chọn giới tính</option>
          {GENDER_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {/* Custom Arrow */}
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 4L6 8L10 4" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      {error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};

interface PersonalInfoProps {
  user: UserProfile;
  onSubmit?: (data: Partial<UserProfile>) => void;
}

// Helper function: Tính initials từ tên (ví dụ: "Huy Quang" → "HQ")
const getInitials = (name: string): string => {
  if (!name) return "U";
  const words = name.trim().split(" ");
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }
  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
};

export const PersonalInfo = ({ user, onSubmit }: PersonalInfoProps) => {
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState<string | undefined>(user.picture);
  const [isUploadModalOpen, setUploadModalOpen] = useState(false);
  const [updateProfile, { isLoading }] = useUpdateUserProfileMutation();

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UpdateUserProfileFormData>({
    resolver: zodResolver(updateUserProfileSchema),
    defaultValues: {
      name: user.name || null,
      dob: parseDateForInput(user.dob) || null,
      gender: user.gender ?? null,
      address: user.address || null,
      pictureUrl: user.picture || null,
    },
  });

  // Reset form khi props `user` thay đổi
  useEffect(() => {
    reset({
      name: user.name || null,
      dob: parseDateForInput(user.dob) || null,
      gender: user.gender ?? null,
      address: user.address || null,
      pictureUrl: user.picture || null,
    });
    if (user.picture) {
      setAvatar(user.picture);
    }
  }, [user, reset]);

  // Tính initials và hasAvatar với useMemo để tránh re-compute không cần thiết
  const initials = useMemo(() => getInitials(user.name), [user.name]);
  const hasAvatar = useMemo(() => avatar || user.picture, [avatar, user.picture]);

  // Handle click vào avatar -> Mở modal
  const handleAvatarClick = () => {
    setUploadModalOpen(true);
  };

  // Callback khi upload xong từ modal -> TỰ ĐỘNG LƯU
  const handleAvatarUploaded = async (uploadedUrl: string) => {
    // 1. Cập nhật UI ngay lập tức
    setAvatar(uploadedUrl);
    setValue("pictureUrl", uploadedUrl, { shouldDirty: true });
    
    // 2. Gọi API cập nhật Profile ngay lập tức (Auto-save)
    try {
      const response = await updateProfile({}).unwrap();

      if (isApiResponseSuccess(response)) {
        // Cập nhật Redux Store
        dispatch(updateUserProfile({ picture: uploadedUrl }));
        showToast.success("Đã cập nhật ảnh đại diện", "Ảnh mới đã được lưu vào hồ sơ.");
      }
    } catch (error) {
      console.error("Auto-save avatar failed", error);
      // Nếu lưu thất bại, có thể revert avatar về cũ (tùy chọn) hoặc thông báo lỗi
      showToast.error("Lỗi lưu ảnh", "Đã tải ảnh lên nhưng chưa lưu được vào hồ sơ.");
    }
  };

  const onSubmitForm = async (data: UpdateUserProfileFormData) => {
    // Debug: Kiểm tra token trước khi submit
    const token = authService.getAccessToken();
    console.log('🔑 Token check before submit:', !!token);
    
    try {
      // Chỉ gửi các fields có giá trị
      const requestData: UpdateUserProfileRequest = {};

      if (data.name?.trim()) {
        requestData.name = data.name.trim();
      }

      // Input type="date" trả về YYYY-MM-DD
      if (data.dob?.trim()) {
        // FIX: Thêm 'Z' để định nghĩa UTC, tránh lệch ngày do múi giờ
        const date = new Date(data.dob + 'T00:00:00Z');
        if (!isNaN(date.getTime())) {
          requestData.dob = date.toISOString();
        }
      }

      if (data.gender !== undefined && data.gender !== null) {
        requestData.gender = data.gender;
      }

      if (data.address?.trim()) {
        requestData.address = data.address.trim();
      }

      // pictureUrl đã được xử lý tự động, nhưng vẫn để đây phòng khi submit cả form
      if (data.pictureUrl?.trim()) {
        requestData.pictureUrl = data.pictureUrl.trim();
      }

      // Kiểm tra xem có ít nhất một field được gửi không
      if (Object.keys(requestData).length === 0) {
        showToast.error(
          "Không có thay đổi",
          "Vui lòng thay đổi ít nhất một trường thông tin"
        );
        return;
      }

      const updateData = {
        name: requestData.name || undefined,
        dob: requestData.dob || undefined,
        address: requestData.address || undefined,
        gender: requestData.gender || undefined,
      };

      const response = await updateProfile(updateData).unwrap();

      if (isApiResponseSuccess(response)) {
        const responseData = response.data || response.Data;
        if (responseData) {
          // Cập nhật Redux auth state
          const updatedUser: Partial<UserDomainModel> = {
            name: responseData.name,
            picture: responseData.picture || null,
            gender: responseData.gender as any ?? null,
            dob: responseData.dob || null,
            address: responseData.address || null,
          };
          dispatch(updateUserProfile(updatedUser));

          if (responseData.picture) {
            setAvatar(responseData.picture);
          }

          showToast.success(
            "Cập nhật thành công",
            "Thông tin cá nhân đã được cập nhật"
          );

          // Gọi callback props nếu có
          const profileData: Partial<UserProfile> = {
            name: responseData.name,
            picture: responseData.picture ?? undefined,
            gender: (responseData.gender as any) ?? undefined,
            dob: responseData.dob ?? undefined,
            address: responseData.address ?? undefined,
          };
          onSubmit?.(profileData);
        }
      } else {
        const errorMessage = getApiErrorMessage(response);
        showToast.error("Cập nhật thất bại", errorMessage);
      }
    } catch (error: unknown) {
      const errorMessage = getApiErrorMessage(
        error && typeof error === "object" && "data" in error
          ? (error as any).data
          : null
      );
      showToast.error("Cập nhật thất bại", errorMessage);
    }
  };

  return (
    <>
      {/* Style để ẩn calendar picker mặc định của browser */}
      <style>{`
        #profile-dob::-webkit-calendar-picker-indicator {
          display: none !important;
          -webkit-appearance: none !important;
        }
        #profile-dob::-webkit-inner-spin-button,
        #profile-dob::-webkit-outer-spin-button {
          display: none !important;
          -webkit-appearance: none !important;
        }
        #profile-dob[type="date"] {
          color-scheme: light;
        }
        /* Firefox */
        #profile-dob[type="date"]::-moz-calendar-picker-indicator {
          display: none !important;
        }
      `}</style>
      
      <Card className="overflow-hidden rounded-xl border-2 border-black bg-white shadow-[6px_6px_0px_black]">
        {/* Header Card Style Tờ Giấy */}
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
        {/* Decor Dots */}
        <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full border-2 border-black bg-red-500" />
            <div className="w-3 h-3 rounded-full border-2 border-black bg-blue-500" />
        </div>
      </div>

      <CardContent className="p-6 space-y-8">
        {/* Avatar Section */}
        <div className="flex items-center gap-6">
          <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
            <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-black bg-blue-600 shadow-[4px_4px_0px_black] transition-transform group-hover:translate-y-1 group-hover:translate-x-1 group-hover:shadow-none flex items-center justify-center">
              {hasAvatar ? (
                <img
                  src={avatar ?? user.picture}
                  alt={user.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-2xl font-black text-white">
                  {initials}
                </span>
              )}
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
        </div>

        {/* Form Inputs */}
        <form
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
          onSubmit={handleSubmit(
            onSubmitForm,
            (errors) => {
              const firstError = Object.values(errors)[0];
              if (firstError?.message) {
                showToast.error("Lỗi xác thực", firstError.message);
              } else {
                showToast.error("Lỗi xác thực", "Vui lòng kiểm tra lại thông tin đã nhập");
              }
            }
          )}
        >
          <div className="space-y-2">
            <Label htmlFor="profile-name" className="font-bold text-slate-700">Họ và tên</Label>
            <div className={`relative rounded-lg border-2 ${errors.name ? 'border-red-500' : 'border-black'} bg-white transition-all duration-200 ease-out will-change-transform focus-within:shadow-[4px_4px_0px_black] focus-within:-translate-y-1 focus-within:-translate-x-1`}>
              <input
                id="profile-name"
                type="text"
                {...register("name")}
                className="h-11 w-full border-0 bg-transparent px-3 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
              />
            </div>
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

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

          <div className="space-y-2 group">
            <Label htmlFor="profile-dob" className="font-bold text-slate-700">Ngày sinh</Label>
            <div className={`relative flex items-center rounded-lg border-2 ${errors.dob ? 'border-red-500' : 'border-black'} bg-white px-3 transition-all focus-within:shadow-[4px_4px_0px_black] focus-within:-translate-y-1 focus-within:-translate-x-1`}>
              <Calendar className="text-slate-400 shrink-0 mr-2" size={16} />
              <input
                id="profile-dob"
                type="date"
                {...register("dob")}
                className="h-11 w-full border-0 bg-transparent p-0 text-sm font-medium text-slate-900 outline-none focus-visible:ring-0"
              />
            </div>
            {errors.dob && (
              <p className="text-xs text-red-500 mt-1">{errors.dob.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="profile-gender" className="font-bold text-slate-700">Giới tính</Label>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <GenderDropdown
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.gender?.message}
                />
              )}
            />
          </div>

          <div className="md:col-span-2 space-y-2 group">
            <Label htmlFor="profile-address" className="font-bold text-slate-700">Địa chỉ</Label>
            <div className={`relative flex items-start rounded-lg border-2 ${errors.address ? 'border-red-500' : 'border-black'} bg-white px-3 py-2 transition-all focus-within:shadow-[4px_4px_0px_black] focus-within:-translate-y-1 focus-within:-translate-x-1`}>
              <MapPin className="text-slate-400 shrink-0 mr-2 mt-1" size={16} />
              <textarea
                id="profile-address"
                rows={3}
                {...register("address")}
                className="flex min-h-[80px] w-full resize-none border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground outline-none focus-visible:ring-0"
              />
            </div>
            {errors.address && (
              <p className="text-xs text-red-500 mt-1">{errors.address.message}</p>
            )}
          </div>

          <div className="md:col-span-2 flex justify-end pt-4 border-t-2 border-dashed border-slate-200">
            <Button
              type="submit"
              disabled={isLoading}
              className="h-11 rounded-lg border-2 border-black bg-blue-600 px-8 text-sm font-bold text-white shadow-[4px_4px_0px_black] hover:bg-blue-700 hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_black] active:shadow-none active:translate-y-[4px] active:translate-x-[4px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <AnimatedText>Đang lưu...</AnimatedText>
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  <AnimatedText>Lưu Thay Đổi</AnimatedText>
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
    
    <AvatarUploadModal
      open={isUploadModalOpen}
      onClose={() => setUploadModalOpen(false)}
      onUploaded={handleAvatarUploaded}
      currentAvatar={avatar ?? user.picture}
      userName={user.name}
    />
    </>
  );
};