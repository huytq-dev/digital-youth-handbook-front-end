import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { showToast } from "@/lib/toast";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowLeft, Loader2, Mail, ArrowRight } from "lucide-react";
import { AnimatedText } from "@/components/animated-text";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "../auth.schema";
import { useForgotPasswordMutation } from "../auth.slice";
import {
  isApiResponseSuccess,
  getApiErrorMessage,
} from "@/features/common/common.type";
import { containerVariants } from "../constants/auth.constants";

export function ForgotPasswordForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      const response = await forgotPassword(data).unwrap();

      if (isApiResponseSuccess(response)) {
        setIsSuccess(true);
      } else {
        const errorMessage = getApiErrorMessage(response);
        showToast.error(
          t("auth.forgotPassword.errorTitle") || "Gửi email thất bại",
          errorMessage
        );
      }
    } catch (error: unknown) {
      let errorMessage =
        t("auth.forgotPassword.errorMessage") ||
        "Có lỗi xảy ra. Vui lòng thử lại sau.";

      if (error && typeof error === "object") {
        if ("data" in error && error.data) {
          errorMessage = getApiErrorMessage(error.data as any);
        } else if ("status" in error) {
          // ...
        }
      }

      showToast.error(
        t("auth.forgotPassword.errorTitle") || "Gửi email thất bại",
        errorMessage
      );
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg mx-auto bg-white border-2 border-black rounded-xl shadow-[8px_8px_0px_black] p-10 text-center relative overflow-hidden"
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
            {t("auth.forgotPassword.successTitle") || "Đã gửi email!"}
          </AnimatedText>
        </h3>

        <p className="text-base font-medium text-slate-600 mb-8 leading-relaxed">
          <AnimatedText>
            {t("auth.forgotPassword.successMessage") ||
              "Vui lòng kiểm tra hộp thư đến (và cả mục spam). Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu cho bạn."}
          </AnimatedText>
        </p>

        <div className="space-y-3">
          <button
            onClick={() => navigate("/auth/sign-in")}
            // Neo-Brutalism: Default shadow 4px, Hover lift 2px + shadow 6px, Active press 4px + no shadow
            className="w-full h-14 bg-white text-black font-black text-lg uppercase rounded-lg border-2 border-black shadow-[4px_4px_0px_black] transition-all hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0px_black] hover:bg-slate-50 active:translate-y-1 active:translate-x-1 active:shadow-none flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <AnimatedText>
              {t("auth.forgotPassword.backToSignIn") || "Quay lại đăng nhập"}
            </AnimatedText>
          </button>

          <button
            onClick={() => setIsSuccess(false)}
            className="w-full h-12 text-sm font-bold text-slate-500 hover:text-black hover:underline decoration-2 underline-offset-4"
          >
            <AnimatedText>
              {t("auth.forgotPassword.resendEmail") ||
                "Chưa nhận được? Gửi lại"}
            </AnimatedText>
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-lg mx-auto"
    >
      {/* Form Container */}
      <div className="bg-white border-2 border-black rounded-xl shadow-[8px_8px_0px_black] p-10 relative overflow-hidden">
        {/* Header Decor (Màu cam) */}
        <div className="absolute top-0 left-0 w-full h-2 bg-orange-400 border-b-2 border-black" />

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black text-black uppercase tracking-tight mb-3">
            <AnimatedText>
              {t("auth.forgotPassword.title") || "Quên mật khẩu?"}
            </AnimatedText>
          </h1>
          <p className="text-sm font-bold text-slate-500">
            <AnimatedText>
              {t("auth.forgotPassword.subtitle") ||
                "Đừng lo, chúng tôi sẽ giúp bạn lấy lại tài khoản"}
            </AnimatedText>
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          {/* Description Box */}
          <div className="bg-blue-50 border-2 border-black rounded-lg p-4 flex items-start gap-3 shadow-[2px_2px_0px_black]">
            <div className="bg-white border-2 border-black p-1.5 rounded shrink-0">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-sm font-bold text-slate-700 leading-snug pt-0.5">
              <AnimatedText>
                {t("auth.forgotPassword.description") ||
                  "Nhập địa chỉ email đã đăng ký, hệ thống sẽ gửi liên kết đặt lại mật khẩu cho bạn."}
              </AnimatedText>
            </p>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label
              className="text-sm font-bold text-slate-700"
              htmlFor="forgot-password-email"
            >
              {t("auth.forgotPassword.email") || "Email"}
            </label>
            {/* [UPDATE] Wrapper animation wrapper */}
            <div
              className={`relative rounded-lg border-2 bg-white transition-all duration-200 ease-out will-change-transform overflow-hidden
                            ${
                              errors.email
                                ? "border-red-500 focus-within:shadow-[4px_4px_0px_#ef4444]"
                                : "border-black focus-within:shadow-[4px_4px_0px_black] focus-within:-translate-y-1 focus-within:-translate-x-1"
                            }
                        `}
            >
              <input
                id="forgot-password-email"
                type="email"
                placeholder={
                  t("auth.forgotPassword.emailPlaceholder") ||
                  "example@email.com"
                }
                // [UPDATE] Transparent input inside wrapper, h-14, rounded-lg để khớp với wrapper
                className="w-full h-14 px-5 bg-transparent border-none outline-none text-black font-medium placeholder:text-slate-400 rounded-lg"
                disabled={isLoading}
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-xs font-bold text-red-500 mt-1 animate-pulse">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            // Neo-Brutalism: Default shadow 4px, Hover lift 2px + shadow 6px, Active press 4px + no shadow
            className="w-full h-14 mt-4 bg-blue-600 text-white font-black text-lg uppercase rounded-lg border-2 border-black shadow-[4px_4px_0px_black] transition-all hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0px_black] hover:bg-blue-700 active:translate-y-1 active:translate-x-1 active:shadow-none disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={24} />
                {t("auth.forgotPassword.submitting") || "Đang gửi..."}
              </>
            ) : (
              <>
                {t("auth.forgotPassword.submit") || "Gửi Yêu Cầu"}
                <ArrowRight size={24} strokeWidth={3} />
              </>
            )}
          </button>
        </form>

        {/* Back Link */}
        <div className="mt-8 text-center pt-6 border-t-2 border-dashed border-slate-200">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <span className="text-base font-bold text-slate-600">
              {t("auth.forgotPassword.rememberPassword") ||
                "Nhớ ra mật khẩu rồi?"}
            </span>
            <Link
              to="/auth/sign-in"
              // Neo-Brutalism: Default shadow 3px, Hover lift 1.5px + shadow 4.5px, Active press 3px + no shadow
              className="inline-block px-4 py-2 bg-yellow-400 text-black font-black text-sm uppercase rounded-lg border-2 border-black shadow-[3px_3px_0px_black] transition-all hover:-translate-y-[1.5px] hover:-translate-x-[1.5px] hover:shadow-[4.5px_4.5px_0px_black] hover:bg-yellow-300 active:translate-y-[3px] active:translate-x-[3px] active:shadow-none flex items-center gap-2"
            >
              <ArrowLeft size={16} strokeWidth={3} />
              {t("auth.forgotPassword.backToSignIn") || "Đăng nhập"}
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}