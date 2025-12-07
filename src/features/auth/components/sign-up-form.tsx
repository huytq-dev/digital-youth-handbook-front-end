import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { showToast } from "@/lib/toast";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Loader2, ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedText } from "@/components/animated-text";
import { signUpSchema, type SignUpFormData } from "../auth.schema";
import { useSignUpMutation } from "../auth.api";
import {
  isApiResponseSuccess,
  getApiErrorMessage,
} from "@/features/common/common.type";
import { containerVariants } from "../constants/auth.constants";

// Constants
const REDIRECT_DELAY_MS = 3000;
const PASSWORD_STRENGTH_THRESHOLDS = [6, 8, 10, 12] as const;

export function SignUpForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [signUp, { isLoading }] = useSignUpMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      termsAccepted: false,
    },
  });

  // [UPDATE] Theo dõi giá trị để control animation
  const passwordValue = watch("password");
  const termsAccepted = watch("termsAccepted");

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        navigate("/auth/sign-in");
      }, REDIRECT_DELAY_MS);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate]);

  const onSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        const { passwordConfirm, termsAccepted, ...submitData } = data;
        const response = await signUp(submitData).unwrap();

        if (isApiResponseSuccess(response)) {
          setIsSuccess(true);
        } else {
          const errorMessage = getApiErrorMessage(response);
          showToast.error(
            t("auth.signUp.errorTitle") || "Đăng ký thất bại",
            errorMessage
          );
        }
      } catch (error: unknown) {
        const errorMessage = getApiErrorMessage(
          error && typeof error === "object" && "data" in error
            ? (error as any).data
            : null
        );
        showToast.error(
          t("auth.signUp.errorTitle") || "Đăng ký thất bại",
          errorMessage
        );
      }
    },
    [signUp, t]
  );

  const getStrengthColor = useCallback((index: number, length: number) => {
    const threshold = PASSWORD_STRENGTH_THRESHOLDS[index];
    if (threshold === undefined) return "bg-gray-200";
    return length >= threshold
      ? "bg-green-500"
      : index === 0
      ? "bg-red-500"
      : "bg-gray-200";
  }, []);

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg mx-auto bg-white border-2 border-black rounded-xl shadow-[8px_8px_0px_black] p-10 text-center"
      >
        <div className="mb-6 flex justify-center">
          <CheckCircle2 className="w-24 h-24 text-green-500 drop-shadow-[2px_2px_0px_black]" />
        </div>
        <h3 className="text-2xl font-black text-black uppercase mb-4">
          <AnimatedText>
            {t("auth.signUp.successTitle") || "Đăng ký thành công!"}
          </AnimatedText>
        </h3>
        <p className="text-base font-medium text-slate-600 mb-6">
          <AnimatedText>
            {t("auth.signUp.successMessage") ||
              "Vui lòng kiểm tra email để xác nhận tài khoản."}
          </AnimatedText>
        </p>
        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden border border-black">
          <motion.div
            className="h-full bg-blue-500"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, ease: "linear" }}
          />
        </div>
        <p className="text-xs font-bold text-slate-400 mt-2">
          Đang chuyển hướng...
        </p>
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
        {/* Header Decor */}
        <div className="absolute top-0 left-0 w-full h-2 bg-blue-400 border-b-2 border-black" />

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black text-black uppercase tracking-tight mb-2">
            <AnimatedText>
              {t("auth.signUp.title") || "Đăng ký tài khoản"}
            </AnimatedText>
          </h1>
          <p className="text-sm font-bold text-slate-500">
            <AnimatedText>
              {t("auth.signUp.subtitle") ||
                "Tham gia cộng đồng học tập và phát triển bản thân"}
            </AnimatedText>
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          noValidate
        >
          {/* Name Field */}
          <div className="space-y-2">
            <label
              className="text-sm font-bold text-slate-700"
              htmlFor="signup-name"
            >
              {t("auth.signUp.name") || "Họ và Tên"}
            </label>
            <div
              className={`relative rounded-lg border-2 bg-white transition-all duration-200 ease-out will-change-transform
                            ${
                              errors.name
                                ? "border-red-500 focus-within:shadow-[4px_4px_0px_#ef4444]"
                                : "border-black focus-within:shadow-[4px_4px_0px_black] focus-within:-translate-y-1 focus-within:-translate-x-1"
                            }
                        `}
            >
              <input
                id="signup-name"
                type="text"
                placeholder={
                  t("auth.signUp.namePlaceholder") || "Nguyễn Văn A"
                }
                className="w-full h-14 px-5 bg-transparent border-none outline-none text-black font-medium placeholder:text-slate-400"
                disabled={isLoading}
                {...register("name")}
              />
            </div>
            {errors.name && (
              <p className="text-xs font-bold text-red-500 mt-1 animate-pulse">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label
              className="text-sm font-bold text-slate-700"
              htmlFor="signup-email"
            >
              {t("auth.signUp.email") || "Email"}
            </label>
            <div
              className={`relative rounded-lg border-2 bg-white transition-all duration-200 ease-out will-change-transform
                            ${
                              errors.email
                                ? "border-red-500 focus-within:shadow-[4px_4px_0px_#ef4444]"
                                : "border-black focus-within:shadow-[4px_4px_0px_black] focus-within:-translate-y-1 focus-within:-translate-x-1"
                            }
                        `}
            >
              <input
                id="signup-email"
                type="email"
                placeholder={
                  t("auth.signUp.emailPlaceholder") || "example@email.com"
                }
                className="w-full h-14 px-5 bg-transparent border-none outline-none text-black font-medium placeholder:text-slate-400"
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

          {/* Password Field */}
          <div className="space-y-2">
            <label
              className="text-sm font-bold text-slate-700"
              htmlFor="signup-password"
            >
              {t("auth.signUp.password") || "Mật khẩu"}
            </label>
            <div
              className={`relative group rounded-lg border-2 bg-white transition-all duration-200 ease-out will-change-transform
                            ${
                              errors.password
                                ? "border-red-500 focus-within:shadow-[4px_4px_0px_#ef4444]"
                                : "border-black focus-within:shadow-[4px_4px_0px_black] focus-within:-translate-y-1 focus-within:-translate-x-1"
                            }
                        `}
            >
              <input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                placeholder={
                  t("auth.signUp.passwordPlaceholder") || "Tối thiểu 6 ký tự"
                }
                className="w-full h-14 px-5 pr-14 bg-transparent border-none outline-none text-black font-medium placeholder:text-slate-400"
                disabled={isLoading}
                {...register("password")}
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

            {/* Password Strength Indicator */}
            <AnimatePresence>
              {passwordValue &&
                passwordValue.length > 0 &&
                !errors.password && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex gap-1 h-1.5 mt-2"
                  >
                    {PASSWORD_STRENGTH_THRESHOLDS.map((_, index) => (
                      <div
                        key={index}
                        className={cn(
                          "h-full w-1/4 rounded-full border border-black/10 transition-colors duration-300",
                          getStrengthColor(index, passwordValue.length)
                        )}
                      />
                    ))}
                  </motion.div>
                )}
            </AnimatePresence>

            {errors.password && (
              <p className="text-xs font-bold text-red-500 mt-1 animate-pulse">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <label
              className="text-sm font-bold text-slate-700"
              htmlFor="signup-password-confirm"
            >
              {t("auth.signUp.confirmPassword") || "Xác nhận mật khẩu"}
            </label>
            <div
              className={`relative group rounded-lg border-2 bg-white transition-all duration-200 ease-out will-change-transform
                            ${
                              errors.passwordConfirm
                                ? "border-red-500 focus-within:shadow-[4px_4px_0px_#ef4444]"
                                : "border-black focus-within:shadow-[4px_4px_0px_black] focus-within:-translate-y-1 focus-within:-translate-x-1"
                            }
                        `}
            >
              <input
                id="signup-password-confirm"
                type={showPasswordConfirm ? "text" : "password"}
                placeholder={
                  t("auth.signUp.confirmPasswordPlaceholder") ||
                  "Nhập lại mật khẩu"
                }
                className="w-full h-14 px-5 pr-14 bg-transparent border-none outline-none text-black font-medium placeholder:text-slate-400"
                disabled={isLoading}
                {...register("passwordConfirm")}
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
            {errors.passwordConfirm && (
              <p className="text-xs font-bold text-red-500 mt-1 animate-pulse">
                {errors.passwordConfirm.message}
              </p>
            )}
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start gap-3 pt-2">
            {/* [UPDATE] Wrapper căn giữa theo chiều dọc */}
            <div className="relative flex items-center h-5 w-5 mt-0.5">
              <input
                id="terms"
                type="checkbox"
                className="peer h-5 w-5 appearance-none opacity-0 absolute z-10 cursor-pointer"
                {...register("termsAccepted")}
                disabled={isLoading}
              />
              {/* [UPDATE] Visual Checkbox dùng biến termsAccepted để switch class
                  - Unchecked: bg-white, shadow-black
                  - Checked: bg-blue-600, shadow-none, translate (ép xuống)
              */}
              <div
                className={cn(
                  "pointer-events-none absolute left-0 top-0 h-5 w-5 rounded border-2 border-black transition-all duration-200 ease-in-out flex items-center justify-center",
                  termsAccepted
                    ? "bg-blue-600 shadow-none translate-y-[2px] translate-x-[2px]"
                    : "bg-white shadow-[2px_2px_0px_black]"
                )}
              >
                <Check
                  size={14}
                  strokeWidth={4}
                  className={cn(
                    "text-white transition-opacity duration-200",
                    termsAccepted ? "opacity-100" : "opacity-0"
                  )}
                />
              </div>
            </div>

            <div className="text-sm">
              <label
                htmlFor="terms"
                className="font-medium text-slate-700 cursor-pointer select-none"
              >
                {t("auth.signUp.agreeTo") || "Tôi đồng ý với "}
                <Link
                  to="/terms"
                  className="font-bold text-black hover:text-blue-600 hover:underline decoration-2 underline-offset-2"
                >
                  {t("auth.signUp.terms") || "Điều khoản dịch vụ"}
                </Link>
                {" & "}
                <Link
                  to="/privacy"
                  className="font-bold text-black hover:text-blue-600 hover:underline decoration-2 underline-offset-2"
                >
                  {t("auth.signUp.privacy") || "Chính sách bảo mật"}
                </Link>
              </label>
              {errors.termsAccepted && (
                <div className="flex items-center gap-1.5 mt-1 text-red-500 animate-pulse">
                  <AlertCircle size={14} />
                  <span className="text-xs font-bold">
                    {errors.termsAccepted.message}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            // Neo-Brutalism: Default shadow 4px, Hover lift 2px + shadow 6px, Active press 4px + no shadow
            className="w-full h-14 mt-6 bg-blue-600 text-white font-black text-lg uppercase rounded-lg border-2 border-black shadow-[4px_4px_0px_black] transition-all hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0px_black] hover:bg-blue-700 active:translate-y-1 active:translate-x-1 active:shadow-none disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={24} />
                {t("auth.signUp.submitting") || "Đang xử lý..."}
              </>
            ) : (
              <>
                {t("auth.signUp.submit") || "Đăng ký"}
                <ArrowRight size={24} strokeWidth={3} />
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-8 text-center pt-6 border-t-2 border-dashed border-slate-200">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <span className="text-base font-bold text-slate-600">
              {t("auth.signUp.haveAccount") || "Đã có tài khoản?"}
            </span>

            <Link
              to="/auth/sign-in"
              // Neo-Brutalism: Default shadow 3px, Hover lift 1.5px + shadow 4.5px, Active press 3px + no shadow
              className="inline-block px-4 py-2 bg-yellow-400 text-black font-black text-sm uppercase rounded-lg border-2 border-black shadow-[3px_3px_0px_black] transition-all hover:-translate-y-[1.5px] hover:-translate-x-[1.5px] hover:shadow-[4.5px_4.5px_0px_black] hover:bg-yellow-300 active:translate-y-[3px] active:translate-x-[3px] active:shadow-none"
            >
              {t("auth.signUp.signInLink") || "Đăng nhập"}
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}