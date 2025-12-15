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
import { mapBackendUserToUserDomainModel } from "@/features/auth/auth.storage";
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
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      const response = await signIn(data).unwrap();

      if (isApiResponseSuccess(response)) {
        const responseData = response.data || response.Data;
        if (responseData?.accessToken && responseData?.user) {
          const mappedUser = mapBackendUserToUserDomainModel(responseData.user);

          dispatch(setCredentials({ 
            data: responseData,
            user: mappedUser
          }));

          showToast.success(
            t("auth.signIn.successTitle") || "Đăng nhập thành công!",
            t("auth.signIn.successMessage") || "Chào mừng bạn trở lại!"
          );

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
      // [FIX 1] Thêm px-5 để tạo khoảng hở an toàn 2 bên mép màn hình điện thoại
      className="w-full max-w-lg mx-auto px-5 sm:px-0"
    >
      {/* Form Container */}
      {/* [FIX 2] Mobile dùng p-5 (nhỏ hơn chút) để nội dung bên trong rộng rãi hơn */}
      <div className="bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_black] sm:shadow-[8px_8px_0px_black] p-5 sm:p-10 relative overflow-hidden transition-all duration-300">
        
        {/* Header Decor */}
        <div className="absolute top-0 left-0 w-full h-2 bg-yellow-400 border-b-2 border-black" />

        <div className="mb-6 sm:mb-10 text-center">
          {/* [FIX 3] Giảm size chữ tiêu đề trên mobile (text-2xl) */}
          <h1 className="text-2xl sm:text-4xl font-black text-black uppercase tracking-tight mb-2 sm:mb-3 mt-2">
            <AnimatedText>{t("auth.signIn.title") || "Đăng nhập"}</AnimatedText>
          </h1>
          <p className="text-xs sm:text-base font-bold text-slate-500">
            <AnimatedText>
              {t("auth.signIn.subtitle") ||
                "Chào mừng bạn trở lại Hành Trang Số"}
            </AnimatedText>
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 sm:space-y-6" // Giảm khoảng cách giữa các input trên mobile
          noValidate
        >
          {/* Username Field */}
          <div className="space-y-2">
            <label
              className="text-sm sm:text-base font-bold text-slate-700"
              htmlFor="signin-username"
            >
              {t("auth.signIn.username") || "Tên đăng nhập"}
            </label>
            <div
              className={`relative rounded-lg border-2 bg-white transition-all duration-200 ease-out will-change-transform
                ${
                  errors.username
                    ? "border-red-500 focus-within:shadow-[3px_3px_0px_#ef4444]"
                    : "border-black focus-within:shadow-[3px_3px_0px_black] focus-within:-translate-y-0.5 focus-within:-translate-x-0.5"
                }
              `}
            >
              {/* [FIX 4] Giảm chiều cao input xuống h-12 (48px) cho mobile gọn hơn */}
              <input
                id="signin-username"
                type="text"
                placeholder={
                  t("auth.signIn.usernamePlaceholder") || "john_doe"
                }
                className="w-full h-12 sm:h-14 px-4 sm:px-5 bg-transparent border-none outline-none text-black font-medium placeholder:text-slate-400 text-sm sm:text-base"
                disabled={isLoading}
                {...register("username")}
              />
            </div>
            {errors.username && (
              <p className="text-xs sm:text-sm font-bold text-red-500 mt-1 animate-pulse">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label
                className="text-sm sm:text-base font-bold text-slate-700"
                htmlFor="signin-password"
              >
                {t("auth.signIn.password") || "Mật khẩu"}
              </label>
            </div>
            <div
              className={`relative group rounded-lg border-2 bg-white transition-all duration-200 ease-out will-change-transform
                ${
                  errors.password
                    ? "border-red-500 focus-within:shadow-[3px_3px_0px_#ef4444]"
                    : "border-black focus-within:shadow-[3px_3px_0px_black] focus-within:-translate-y-0.5 focus-within:-translate-x-0.5"
                }
              `}
            >
              {/* [FIX 4] Input h-12 */}
              <input
                id="signin-password"
                type={showPassword ? "text" : "password"}
                placeholder={
                  t("auth.signIn.passwordPlaceholder") || "Nhập mật khẩu"
                }
                className="w-full h-12 sm:h-14 px-4 sm:px-5 pr-14 bg-transparent border-none outline-none text-black font-medium placeholder:text-slate-400 text-sm sm:text-base"
                disabled={isLoading}
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-black font-bold text-[10px] sm:text-xs uppercase p-1"
                tabIndex={-1}
              >
                {showPassword ? "Ẩn" : "Hiện"}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs sm:text-sm font-bold text-red-500 mt-1 animate-pulse">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            // [FIX 5] Button h-12, shadow nhỏ hơn trên mobile (3px)
            className="w-full h-12 sm:h-14 mt-4 sm:mt-6 bg-blue-600 text-white font-black text-base sm:text-lg uppercase rounded-lg border-2 border-black shadow-[3px_3px_0px_black] sm:shadow-[4px_4px_0px_black] transition-all hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[5px_5px_0px_black] sm:hover:shadow-[6px_6px_0px_black] hover:bg-blue-700 active:translate-y-1 active:translate-x-1 active:shadow-none disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                {t("auth.signIn.submitting") || "Đang xử lý..."}
              </>
            ) : (
              <>
                {t("auth.signIn.submit") || "Đăng nhập"}
                <ArrowRight size={20} strokeWidth={3} />
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-6 sm:mt-10 text-center pt-4 sm:pt-6 border-t-2 border-dashed border-slate-200">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-2">
            <span className="text-sm sm:text-base font-bold text-slate-600">
              {t("auth.signIn.noAccount") || "Chưa có tài khoản?"}
            </span>

            <Link
              to="/auth/sign-up"
              className="inline-block px-4 py-2 bg-yellow-400 text-black font-black text-xs sm:text-sm uppercase rounded-lg border-2 border-black shadow-[3px_3px_0px_black] transition-all hover:-translate-y-[1.5px] hover:-translate-x-[1.5px] hover:shadow-[4.5px_4.5px_0px_black] hover:bg-yellow-300 active:translate-y-[3px] active:translate-x-[3px] active:shadow-none"
            >
              {t("auth.signIn.signUpLink") || "Đăng ký ngay"}
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}