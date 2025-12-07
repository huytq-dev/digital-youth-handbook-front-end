import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { showToast } from "@/lib/toast";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, ArrowLeft, KeyRound } from "lucide-react";
import { AnimatedText } from "@/components/animated-text";
import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "../auth.schema";
import { useResetPasswordMutation } from "../auth.api";
import {
  isApiResponseSuccess,
  getApiErrorMessage,
} from "@/features/common/common.type";
import { containerVariants } from "../constants/auth.constants";

export function ResetPasswordForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [token, setToken] = useState<string>("");

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
      setValue("token", tokenFromUrl);
    } else {
      showToast.error(
        t("auth.resetPassword.invalidToken") ||
          "Token không hợp lệ hoặc đã hết hạn"
      );
      setTimeout(() => {
        navigate("/auth/forgot-password");
      }, 2000);
    }
  }, [searchParams, setValue, navigate, t]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      const response = await resetPassword(data).unwrap();

      if (isApiResponseSuccess(response)) {
        setIsSuccess(true);
        setTimeout(() => {
          navigate("/auth/sign-in");
        }, 3000);
      } else {
        const errorMessage = getApiErrorMessage(response);
        showToast.error(
          t("auth.resetPassword.errorTitle") || "Đặt lại mật khẩu thất bại",
          errorMessage
        );
      }
    } catch (error: unknown) {
      // Error handling logic (giữ nguyên logic cũ của bạn)
      let errorMessage =
        t("auth.resetPassword.errorMessage") ||
        "Có lỗi xảy ra. Vui lòng thử lại sau.";
      if (error && typeof error === "object") {
        // ... (giữ nguyên logic check status code nếu cần)
        if ("data" in error && error.data) {
          errorMessage = getApiErrorMessage(error.data as any);
        }
      }
      showToast.error(
        t("auth.resetPassword.errorTitle") || "Đặt lại mật khẩu thất bại",
        errorMessage
      );
    }
  };

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="w-10 h-10 animate-spin text-black mb-4" />
        <p className="text-sm font-bold text-slate-600 uppercase tracking-widest animate-pulse">
          <AnimatedText>
            {t("auth.resetPassword.loading") || "Đang kiểm tra token..."}
          </AnimatedText>
        </p>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white border-2 border-black rounded-xl shadow-[8px_8px_0px_black] p-10 text-center relative overflow-hidden"
        >
          {/* Decor Header */}
          <div className="absolute top-0 left-0 w-full h-2 bg-green-500 border-b-2 border-black" />

          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 bg-green-100 rounded-full border-2 border-black flex items-center justify-center shadow-[4px_4px_0px_black]">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
          </div>

          <h3 className="text-2xl font-black text-black uppercase mb-4">
            <AnimatedText>
              {t("auth.resetPassword.successTitle") ||
                "Đặt lại mật khẩu thành công!"}
            </AnimatedText>
          </h3>
          <p className="text-base font-medium text-slate-600 mb-6 leading-relaxed">
            <AnimatedText>
              {t("auth.resetPassword.successMessage") ||
                "Mật khẩu của bạn đã được đặt lại thành công. Bạn có thể đăng nhập bằng mật khẩu mới."}
            </AnimatedText>
          </p>

          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden border border-black mb-4">
            <motion.div
              className="h-full bg-blue-500"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, ease: "linear" }}
            />
          </div>

          <button
            onClick={() => navigate("/auth/sign-in")}
            // Neo-Brutalism: Default shadow 4px, Hover lift 2px + shadow 6px, Active press 4px + no shadow
            className="w-full h-14 bg-black text-white font-black text-lg uppercase rounded-lg border-2 border-black shadow-[4px_4px_0px_black] transition-all hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0px_black] hover:bg-slate-800 active:translate-y-1 active:translate-x-1 active:shadow-none flex items-center justify-center gap-2"
          >
            <AnimatedText>
              {t("auth.resetPassword.goToSignIn") || "Đi đến đăng nhập"}
            </AnimatedText>
          </button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-xl mx-auto"
    >
      {/* Form Container */}
      <div className="bg-white border-2 border-black rounded-xl shadow-[8px_8px_0px_black] p-10 relative overflow-hidden">
        {/* Header Decor (Màu Tím) */}
        <div className="absolute top-0 left-0 w-full h-2 bg-purple-400 border-b-2 border-black" />

        <div className="mb-8 text-center">
          <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg border-2 border-black flex items-center justify-center mb-4 shadow-[2px_2px_0px_black]">
            <KeyRound className="w-6 h-6 text-purple-600" />
          </div>
          <h1 className="text-3xl font-black text-black uppercase tracking-tight mb-3">
            <AnimatedText>
              {t("auth.resetPassword.title") || "Đặt lại mật khẩu"}
            </AnimatedText>
          </h1>
          <p className="text-sm font-bold text-slate-500">
            <AnimatedText>
              {t("auth.resetPassword.subtitle") ||
                "Tạo mật khẩu mới cho tài khoản của bạn"}
            </AnimatedText>
          </p>
        </div>

        {/* Description Box */}
        <div className="bg-purple-50 border-2 border-black rounded-lg p-4 mb-6">
          <p className="text-sm font-bold text-slate-700 leading-snug text-center">
            <AnimatedText>
              {t("auth.resetPassword.description") ||
                "Nhập mật khẩu mới của bạn. Mật khẩu phải có ít nhất 6 ký tự."}
            </AnimatedText>
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          {/* New Password Field */}
          <div className="space-y-2">
            <label
              className="text-sm font-bold text-slate-700"
              htmlFor="reset-password-new"
            >
              {t("auth.resetPassword.newPassword") || "Mật khẩu mới"}
            </label>
            <div
              className={`relative rounded-lg border-2 bg-white transition-all duration-200 ease-out will-change-transform overflow-hidden
                            ${
                              errors.newPassword
                                ? "border-red-500 focus-within:shadow-[4px_4px_0px_#ef4444]"
                                : "border-black focus-within:shadow-[4px_4px_0px_black] focus-within:-translate-y-1 focus-within:-translate-x-1"
                            }
                        `}
            >
              <input
                id="reset-password-new"
                type={showPassword ? "text" : "password"}
                placeholder={
                  t("auth.resetPassword.newPasswordPlaceholder") ||
                  "Tối thiểu 6 ký tự"
                }
                className="w-full h-14 px-5 pr-14 bg-transparent border-none outline-none text-black font-medium placeholder:text-slate-400 rounded-lg"
                disabled={isLoading}
                {...register("newPassword")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-black font-bold text-xs uppercase p-1"
                tabIndex={-1}
              >
                {showPassword ? "Ẩn" : "Hiện"}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-xs font-bold text-red-500 mt-1 animate-pulse">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <label
              className="text-sm font-bold text-slate-700"
              htmlFor="reset-password-confirm"
            >
              {t("auth.resetPassword.confirmPassword") || "Xác nhận mật khẩu"}
            </label>
            <div
              className={`relative rounded-lg border-2 bg-white transition-all duration-200 ease-out will-change-transform overflow-hidden
                            ${
                              errors.confirmPassword
                                ? "border-red-500 focus-within:shadow-[4px_4px_0px_#ef4444]"
                                : "border-black focus-within:shadow-[4px_4px_0px_black] focus-within:-translate-y-1 focus-within:-translate-x-1"
                            }
                        `}
            >
              <input
                id="reset-password-confirm"
                type={showPasswordConfirm ? "text" : "password"}
                placeholder={
                  t("auth.resetPassword.confirmPasswordPlaceholder") ||
                  "Nhập lại mật khẩu mới"
                }
                className="w-full h-14 px-5 pr-14 bg-transparent border-none outline-none text-black font-medium placeholder:text-slate-400 rounded-lg"
                disabled={isLoading}
                {...register("confirmPassword")}
              />
              <button
                type="button"
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-black font-bold text-xs uppercase p-1"
                tabIndex={-1}
              >
                {showPasswordConfirm ? "Ẩn" : "Hiện"}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs font-bold text-red-500 mt-1 animate-pulse">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            // Neo-Brutalism: Default shadow 4px, Hover lift 2px + shadow 6px, Active press 4px + no shadow
            className="w-full h-14 mt-4 bg-purple-600 text-white font-black text-lg uppercase rounded-lg border-2 border-black shadow-[4px_4px_0px_black] transition-all hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0px_black] hover:bg-purple-700 active:translate-y-1 active:translate-x-1 active:shadow-none disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                {t("auth.resetPassword.submitting") || "Đang xử lý..."}
              </>
            ) : (
              t("auth.resetPassword.submit") || "Đặt lại mật khẩu"
            )}
          </button>
        </form>

        {/* Back Link */}
        <div className="mt-8 text-center pt-6 border-t-2 border-dashed border-slate-200">
          <Link
            to="/auth/sign-in"
            className="inline-flex items-center gap-2 text-sm font-black text-slate-600 hover:text-black hover:underline decoration-2 underline-offset-4 uppercase transition-colors"
          >
            <ArrowLeft size={16} strokeWidth={3} />
            {t("auth.resetPassword.backToSignIn") || "Quay lại đăng nhập"}
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
