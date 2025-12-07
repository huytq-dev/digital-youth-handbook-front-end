import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { showToast } from "@/lib/toast";
import { motion } from "framer-motion";
import { AnimatedText } from "@/components/animated-text";
import { signInSchema, type SignInFormData } from "@/features/auth/auth.schema";
import { useSignInMutation } from "@/features/auth/auth.api";
import {
  isApiResponseSuccess,
  getApiErrorMessage,
} from "@/features/common/common.type";
import { containerVariants } from "@/features/auth/constants/auth.constants";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "@/features/auth/auth.slice";
import { Loader2, ArrowRight } from "lucide-react";

export function SignInForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [signIn, { isLoading }] = useSignInMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      const response = await signIn(data).unwrap();

      if (isApiResponseSuccess(response)) {
        const responseData = response.data || response.Data;
        if (responseData?.accessToken && responseData?.user) {
          // 1. Save credentials to Redux and Storage (user đã có trong response)
          dispatch(setCredentials({ 
            data: responseData,  // responseData đã có đầy đủ: accessToken, expiresIn, refreshToken, user
            user: responseData.user  // User đã có sẵn trong response
          }));

          // 3. Show success message
          showToast.success(
            t("auth.signIn.successTitle") || "Đăng nhập thành công!",
            t("auth.signIn.successMessage") || "Chào mừng bạn trở lại!"
          );

          // 4. Redirect to home
          navigate("/");
        }
      } else {
        const errorMessage = getApiErrorMessage(response);
        showToast.error(
          t("auth.signIn.errorTitle") || "Đăng nhập thất bại",
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
        t("auth.signIn.errorTitle") || "Đăng nhập thất bại",
        errorMessage
      );
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      // [UPDATE] Tăng độ rộng từ max-w-md lên max-w-lg (khoảng 512px)
      className="w-full max-w-lg mx-auto"
    >
      {/* Form Container */}
      {/* [UPDATE] Tăng padding từ p-8 lên p-10 để nội dung thoáng hơn */}
      <div className="bg-white border-2 border-black rounded-xl shadow-[8px_8px_0px_black] p-10 relative overflow-hidden">
        {/* Header Decor */}
        <div className="absolute top-0 left-0 w-full h-2 bg-yellow-400 border-b-2 border-black" />

        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black text-black uppercase tracking-tight mb-3">
            <AnimatedText>{t("auth.signIn.title") || "Đăng nhập"}</AnimatedText>
          </h1>
          <p className="text-base font-bold text-slate-500">
            <AnimatedText>
              {t("auth.signIn.subtitle") ||
                "Chào mừng bạn trở lại Hành Trang Số"}
            </AnimatedText>
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          {/* Email Field */}
          <div className="space-y-2">
            <label
              className="text-base font-bold text-slate-700"
              htmlFor="signin-email"
            >
              {t("auth.signIn.email") || "Email"}
            </label>
            {/* [UPDATE ANIMATION] Wrapper chịu trách nhiệm hiệu ứng border và shadow */}
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
                id="signin-email"
                type="email"
                placeholder={
                  t("auth.signIn.emailPlaceholder") || "example@email.com"
                }
                // [UPDATE] Input trong suốt, không viền, chiều cao h-14
                className="w-full h-14 px-5 bg-transparent border-none outline-none text-black font-medium placeholder:text-slate-400"
                disabled={isLoading}
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-sm font-bold text-red-500 mt-1 animate-pulse">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label
                className="text-base font-bold text-slate-700"
                htmlFor="signin-password"
              >
                {t("auth.signIn.password") || "Mật khẩu"}
              </label>
              <Link
                to="/auth/forgot-password"
                className="text-sm font-bold text-blue-600 hover:text-black hover:underline decoration-2 underline-offset-2"
              >
                {t("auth.signIn.forgotPassword") || "Quên mật khẩu?"}
              </Link>
            </div>
            {/* [UPDATE ANIMATION] Wrapper chịu trách nhiệm hiệu ứng border và shadow */}
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
                id="signin-password"
                type={showPassword ? "text" : "password"}
                placeholder={
                  t("auth.signIn.passwordPlaceholder") || "Nhập mật khẩu"
                }
                // [UPDATE] Input trong suốt, không viền, chiều cao h-14
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
            {errors.password && (
              <p className="text-sm font-bold text-red-500 mt-1 animate-pulse">
                {errors.password.message}
              </p>
            )}
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
                {t("auth.signIn.submitting") || "Đang xử lý..."}
              </>
            ) : (
              <>
                {t("auth.signIn.submit") || "Đăng nhập"}
                <ArrowRight size={24} strokeWidth={3} />
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-10 text-center pt-6 border-t-2 border-dashed border-slate-200">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <span className="text-base font-bold text-slate-600">
              {t("auth.signIn.noAccount") || "Chưa có tài khoản?"}
            </span>

            <Link
              to="/auth/sign-up"
              // Neo-Brutalism: Default shadow 3px, Hover lift 1.5px + shadow 4.5px, Active press 3px + no shadow
              className="inline-block px-4 py-2 bg-yellow-400 text-black font-black text-sm uppercase rounded-lg border-2 border-black shadow-[3px_3px_0px_black] transition-all hover:-translate-y-[1.5px] hover:-translate-x-[1.5px] hover:shadow-[4.5px_4.5px_0px_black] hover:bg-yellow-300 active:translate-y-[3px] active:translate-x-[3px] active:shadow-none"
            >
              {t("auth.signIn.signUpLink") || "Đăng ký ngay"}
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
