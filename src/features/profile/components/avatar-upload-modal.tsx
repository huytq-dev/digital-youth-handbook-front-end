import React, { useEffect, useMemo, useState } from "react";
import { X, UploadCloud, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import { useUploadAvatarMutation } from "@/features/profile/profile.api";
import { showToast } from "@/lib/toast";
import { cn } from "@/lib/utils";

interface AvatarUploadModalProps {
  open: boolean;
  onClose: () => void;
  onUploaded: (url: string) => void;
  currentAvatar?: string;
  userName?: string;
}

export const AvatarUploadModal: React.FC<AvatarUploadModalProps> = ({
  open,
  onClose,
  onUploaded,
  currentAvatar,
  userName,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [tempUrl, setTempUrl] = useState<string | null>(null);

  // State animation
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const initials = useMemo(() => {
    if (!userName) return "U";
    const parts = userName.trim().split(" ");
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  }, [userName]);

  const [uploadAvatar, { isLoading }] = useUploadAvatarMutation();

  useEffect(() => {
    if (open) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  useEffect(() => {
    if (!isVisible) {
      setFile(null);
      setPreviewUrl(null);
      setProgress(0);
      setStatus("idle");
      setErrorMessage(null);
      setTempUrl(null);
    }
  }, [isVisible]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;
    if (isLoading) {
      setStatus("uploading");
      setProgress((p) => (p < 10 ? 10 : p));
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return 90;
          return prev + 5;
        });
      }, 200);
    } else if (status === "uploading") {
      setProgress(100);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isLoading, status]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      setErrorMessage("Vui lòng chọn một file ảnh hợp lệ");
      return;
    }
    setFile(f);
    const objectUrl = URL.createObjectURL(f);
    setPreviewUrl(objectUrl);
    setErrorMessage(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setErrorMessage("Hãy chọn một ảnh để upload");
      return;
    }
    setStatus("uploading");
    try {
      const res = await uploadAvatar(file).unwrap();
      const uploadedUrl = res.data || (res as any).Data;
      if (uploadedUrl) {
        setStatus("success");
        setTempUrl(uploadedUrl);
        
        // ĐÃ XÓA: showToast.success ở đây để tránh hiện 2 thông báo
        // Việc thông báo "Thành công" sẽ do component cha (PersonalInfo) lo sau khi lưu xong
        
        onUploaded(uploadedUrl);
        setTimeout(() => {
          onClose();
        }, 800);
      } else {
        setStatus("error");
        setErrorMessage("Không nhận được URL ảnh từ server");
        showToast.error("Tải ảnh thất bại", "Không nhận được URL ảnh từ server");
      }
    } catch (error: any) {
      setStatus("error");
      const msg =
        error?.data?.message ||
        error?.data?.detail ||
        error?.data?.title ||
        "Không thể tải ảnh, vui lòng thử lại";
      setErrorMessage(msg);
      showToast.error("Tải ảnh thất bại", msg);
    }
  };

  if (!isVisible) return null;

  return (
    <>
      <div 
        className={cn(
          "fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 transition-opacity duration-300",
          isAnimating ? "opacity-100" : "opacity-0"
        )}
      >
        <div 
          className={cn(
            "relative w-full max-w-xl rounded-2xl border-2 border-black bg-white shadow-[10px_10px_0px_black] overflow-hidden transition-all duration-300 ease-in-out transform",
            isAnimating ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-4 opacity-0"
          )}
        >
          <div className="flex items-center justify-between border-b-2 border-black bg-yellow-300 px-5 py-3">
            <div className="flex items-center gap-2">
              <UploadCloud className="text-black" size={18} />
              <h3 className="text-base font-black text-black uppercase tracking-tight">
                Tải ảnh đại diện
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="h-9 w-9 rounded-full border-2 border-black bg-white text-black shadow-[2px_2px_0px_black] hover:translate-y-[1px] hover:translate-x-[1px] hover:shadow-none transition-all flex items-center justify-center active:bg-red-100"
            >
              <X size={16} />
            </button>
          </div>

          <div className="p-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-600 uppercase">Hiện tại</p>
                <div className="flex items-center justify-center h-32 rounded-xl border-2 border-black bg-slate-100 shadow-[4px_4px_0px_black] overflow-hidden">
                  {currentAvatar ? (
                    <img src={currentAvatar} alt="Avatar hiện tại" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-3xl font-black text-slate-400">
                      {initials}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-600 uppercase">Ảnh mới (Xem trước)</p>
                <div
                  className={cn(
                    "flex items-center justify-center h-32 rounded-xl border-2 border-dashed border-black/50 bg-white shadow-[4px_4px_0px_black] overflow-hidden transition-all",
                    (tempUrl || previewUrl) ? "border-solid border-black" : ""
                  )}
                >
                  {(tempUrl || previewUrl) ? (
                    <img 
                      src={tempUrl || previewUrl || ""} 
                      alt="Avatar mới" 
                      className="h-full w-full object-cover animate-in fade-in duration-500" 
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-slate-500">
                      <UploadCloud size={20} />
                      <span className="text-xs font-semibold">Chọn ảnh và nhấn Upload</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                className="flex cursor-pointer items-center justify-between rounded-lg border-2 border-black bg-blue-50 px-4 py-3 text-sm font-bold text-slate-800 shadow-[3px_3px_0px_black] hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[5px_5px_0px_black] active:translate-y-0 active:translate-x-0 active:shadow-[2px_2px_0px_black] transition-all"
              >
                <div className="flex flex-col">
                  <span>Chọn file ảnh</span>
                  <span className="text-xs font-medium text-slate-600">
                    PNG, JPG, JPEG • Tối đa ~5MB
                  </span>
                </div>
                <div className="rounded-md bg-blue-600 text-white px-3 py-1 text-xs font-bold border border-black group-hover:bg-blue-700">
                  Browse
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
              {file && (
                <p className="text-xs font-semibold text-green-700 flex items-center gap-1 animate-in slide-in-from-left-2">
                  <CheckCircle2 size={12}/> Đã chọn: {file.name}
                </p>
              )}
              {errorMessage && (
                <div className="flex items-center gap-2 text-xs font-semibold text-red-600 animate-pulse">
                  <AlertTriangle size={14} /> {errorMessage}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="relative h-5 w-full rounded-full border-2 border-black bg-white overflow-hidden shadow-[2px_2px_0px_black]">
                <div className="absolute inset-0 opacity-10" 
                     style={{backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)', backgroundSize: '10px 10px'}}></div>
                
                <div
                  className={cn(
                    "h-full border-r-2 border-black transition-all duration-300 ease-out relative",
                    status === "error" ? "bg-red-500" : "bg-yellow-400"
                  )}
                  style={{ width: `${progress}%` }}
                >
                   <div className="absolute top-0 left-0 w-full h-full bg-white/30 skew-x-[-20deg] translate-x-[-100%] animate-[shimmer_2s_infinite]"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs font-black text-black uppercase tracking-tight">
                <span>
                  {status === "uploading"
                    ? "Đang tải lên server..."
                    : status === "success"
                    ? "Thành công!"
                    : status === "error"
                    ? "Lỗi!"
                    : "Sẵn sàng"}
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="h-10 px-4 rounded-lg border-2 border-black bg-white text-sm font-bold text-slate-800 shadow-[3px_3px_0px_black] hover:bg-slate-100 hover:-translate-y-[1px] hover:-translate-x-[1px] hover:shadow-[4px_4px_0px_black] active:translate-y-0 active:translate-x-0 active:shadow-none transition-all disabled:opacity-60"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleUpload}
                disabled={isLoading}
                className={cn(
                  "h-10 px-5 rounded-lg border-2 border-black text-sm font-bold text-white shadow-[3px_3px_0px_black] active:translate-y-0 active:translate-x-0 active:shadow-none transition-all disabled:opacity-60 flex items-center gap-2",
                  status === "success" ? "bg-green-500 hover:bg-green-600" : "bg-blue-600 hover:bg-blue-700 hover:-translate-y-[1px] hover:-translate-x-[1px] hover:shadow-[4px_4px_0px_black]"
                )}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Đang tải...
                  </>
                ) : status === "success" ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Đã xong
                  </>
                ) : (
                  <>
                    <UploadCloud className="h-4 w-4" />
                    Upload
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </>
  );
};