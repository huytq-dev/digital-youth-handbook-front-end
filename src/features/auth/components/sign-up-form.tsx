import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
// import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedText } from "@/components/animated-text";
import { signUpSchema, type SignUpFormData } from "../auth.schema";
// import { useSignUpMutation } from "../auth.slice";
// import {
//   isApiResponseSuccess,
//   getApiErrorMessage,
// } from "@/features/common/common.type";
// import type { ApiResponse } from "@/features/common/common.type";
import { containerVariants, itemVariants } from "../constants/auth.constants";
import {
  TextField,
  EmailField,
  PasswordField,
  SubmitButton,
  SocialLoginButtons,
  Divider,
} from "./shared/auth-form-components"; // Cập nhật đường dẫn import nếu cần thiết (ví dụ: ./shared/auth-form-components)

// Constants
const REDIRECT_DELAY_MS = 3000; // Delay trước khi chuyển trang

// Password strength thresholds (sync với schema requirement)
const PASSWORD_STRENGTH_THRESHOLDS = [6, 8, 10, 12] as const;

// Helper function để log (chỉ trong development)
const logDev = (message: string, data?: unknown) => {
  if (import.meta.env.DEV || import.meta.env.MODE === "development") {
    console.log(
      `[SignUp] ${message}`,
      data ? JSON.stringify(data, null, 2) : ""
    );
  }
};

/*
// Helper function để extract error message từ RTK Query error
const extractErrorMessage = (
  error: unknown,
  t: (key: string) => string
): string => { ...original implementation... };
*/

export function SignUpForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // const [signUp, { isLoading }] = useSignUpMutation();
  const isLoading = false;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      Name: "",
      Email: "",
      Password: "",
      PasswordConfirm: "",
      TermsAccepted: false,
    },
  });

  const passwordValue = watch("Password");

  // Tối ưu: Giảm delay và bỏ reset() vì component sẽ unmount
  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        navigate("/auth/sign-in");
        // Không cần setIsSuccess(false) và reset() vì component sẽ unmount
      }, REDIRECT_DELAY_MS);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate]);

  // Tối ưu: Sử dụng useCallback để memoize handler
  const onSubmit = useCallback(
    async (data: SignUpFormData) => {
      logDev("Submitting sign up request (UI test only)", data);
      setIsSuccess(true);

      /*
      ORIGINAL API LOGIC (disabled for UI testing)
      try {
        const { PasswordConfirm, TermsAccepted, ...submitData } = data;

        logDev("Submitting sign up request", submitData);

        const response = await signUp(submitData).unwrap();

        logDev("Sign up API response", response);

        if (isApiResponseSuccess(response)) {
          setIsSuccess(true);
          toast.success(
            t("auth.signUp.successTitle") || "Đăng ký thành công!",
            {
              description:
                t("auth.signUp.successMessage") ||
                "Vui lòng kiểm tra email để xác nhận tài khoản.",
            }
          );
        } else {
          const errorMessage = getApiErrorMessage(response);
          toast.error(t("auth.signUp.errorTitle") || "Đăng ký thất bại", {
            description: errorMessage,
          });
        }
      } catch (error: unknown) {
        logDev("Sign up API error", error);

        const errorMessage = extractErrorMessage(error, t);

        toast.error(t("auth.signUp.errorTitle") || "Đăng ký thất bại", {
          description: errorMessage,
        });
      }
      */
    },
    [setIsSuccess]
  );

  // Tối ưu: Password strength indicator sync với schema
  // Cập nhật màu sắc theo theme
  const getStrengthColor = useCallback((index: number, length: number) => {
    const threshold = PASSWORD_STRENGTH_THRESHOLDS[index];
    if (threshold === undefined) return "bg-muted"; // gray-200 -> muted
    return length >= threshold
      ? "bg-green-500" // Giữ nguyên màu xanh cho success hoặc dùng biến --accepted
      : index === 0
        ? "bg-destructive" // red-500 -> destructive
        : "bg-muted"; // gray-200 -> muted
  }, []);

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="flex flex-col items-center justify-center py-12"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2,
          }}
        >
          <CheckCircle2 className="w-20 h-20 text-green-500 mb-6 mx-auto drop-shadow-lg" />
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-[hsl(var(--primary))] mb-3 text-center"
        >
          <AnimatedText>
            {t("auth.signUp.successTitle") || "Đăng ký thành công!"}
          </AnimatedText>
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-sm text-[hsl(var(--muted-foreground))] text-center max-w-sm mx-auto leading-relaxed"
        >
          <AnimatedText>
            {t("auth.signUp.successMessage") ||
              "Vui lòng kiểm tra email để xác nhận tài khoản."}
          </AnimatedText>
        </motion.p>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header - Chỉ hiển thị khi đang nhập liệu */}
      <motion.div variants={itemVariants} className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[hsl(var(--primary))] mb-2">
          <AnimatedText>
            {t("auth.signUp.title") || "Đăng ký tài khoản"}
          </AnimatedText>
        </h1>
        <p className="text-[hsl(var(--muted-foreground))] text-sm">
          <AnimatedText>
            {t("auth.signUp.subtitle") ||
              "Tạo tài khoản để bắt đầu hành trình của bạn"}
          </AnimatedText>
        </p>
      </motion.div>

      {/* Name Field */}
      <motion.div variants={itemVariants}>
        <TextField
          id="signup-name"
          label={t("auth.signUp.name") || "Họ và Tên"}
          placeholder={t("auth.signUp.namePlaceholder") || "Nguyễn Văn A"}
          error={errors.Name?.message}
          register={register("Name")}
          disabled={isLoading}
          focused={focusedField === "Name"}
          onFocus={() => setFocusedField("Name")}
          onBlur={() => setFocusedField(null)}
        />
      </motion.div>

      {/* Email Field */}
      <motion.div variants={itemVariants}>
        <EmailField
          id="signup-email"
          label={t("auth.signUp.email") || "Email"}
          placeholder={t("auth.signUp.emailPlaceholder") || "example@email.com"}
          error={errors.Email?.message}
          register={register("Email")}
          disabled={isLoading}
          focused={focusedField === "Email"}
          onFocus={() => setFocusedField("Email")}
          onBlur={() => setFocusedField(null)}
        />
      </motion.div>

      {/* Password Field */}
      <motion.div variants={itemVariants}>
        <PasswordField
          id="signup-password"
          label={t("auth.signUp.password") || "Mật khẩu"}
          placeholder={
            t("auth.signUp.passwordPlaceholder") || "Tối thiểu 6 ký tự"
          }
          error={errors.Password?.message}
          register={register("Password")}
          disabled={isLoading}
          focused={focusedField === "Password"}
          onFocus={() => setFocusedField("Password")}
          onBlur={() => setFocusedField(null)}
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
        />
        {/* Password Strength Indicator */}
        <AnimatePresence>
          {passwordValue && passwordValue.length > 0 && !errors.Password && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex gap-1 h-1 mt-2"
            >
              {PASSWORD_STRENGTH_THRESHOLDS.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "h-full w-1/4 rounded-full transition-colors duration-300",
                    getStrengthColor(index, passwordValue.length)
                  )}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Confirm Password Field */}
      <motion.div variants={itemVariants}>
        <PasswordField
          id="signup-password-confirm"
          label={t("auth.signUp.confirmPassword") || "Xác nhận mật khẩu"}
          placeholder={
            t("auth.signUp.confirmPasswordPlaceholder") || "Nhập lại mật khẩu"
          }
          error={errors.PasswordConfirm?.message}
          register={register("PasswordConfirm")}
          disabled={isLoading}
          focused={focusedField === "PasswordConfirm"}
          onFocus={() => setFocusedField("PasswordConfirm")}
          onBlur={() => setFocusedField(null)}
          showPassword={showPasswordConfirm}
          onTogglePassword={() => setShowPasswordConfirm(!showPasswordConfirm)}
        />
      </motion.div>

      {/* Terms & Conditions Checkbox */}
      <motion.div
        className="flex items-start gap-3 pt-2"
        variants={itemVariants}
      >
        <div className="flex items-center pt-0.5">
          <input
            id="terms"
            type="checkbox"
            className={cn(
              "h-4 w-4 rounded border-[hsl(var(--input))] transition-all cursor-pointer mt-0.5",
              errors.TermsAccepted
                ? "border-[hsl(var(--destructive))] text-[hsl(var(--destructive))] focus:ring-[hsl(var(--destructive))]"
                : "text-[hsl(var(--primary))] focus:ring-[hsl(var(--primary))] border-[hsl(var(--input))] hover:border-[hsl(var(--primary))]", // Sử dụng CSS variables từ global.css
              "focus:ring-2 focus:ring-offset-0 bg-[hsl(var(--background))]"
            )}
            {...register("TermsAccepted")}
            disabled={isLoading}
          />
        </div>
        <div className="flex-1 space-y-1">
          <label
            htmlFor="terms"
            className={cn(
              "text-sm font-medium leading-relaxed cursor-pointer select-none flex flex-wrap items-center",
              errors.TermsAccepted ? "text-[hsl(var(--destructive))]" : "text-[hsl(var(--muted-foreground))]"
            )}
          >
            <AnimatedText>
              {t("auth.signUp.agreeTo") || "Tôi đồng ý với "}
            </AnimatedText>
            <Link
              to="/terms"
              className="hover:underline font-bold text-[hsl(var(--primary))] mx-0.5"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatedText>
                {t("auth.signUp.terms") || "Điều khoản dịch vụ"}
              </AnimatedText>
            </Link>
            &nbsp;&
            <Link
              to="/privacy"
              className="hover:underline font-bold text-[hsl(var(--primary))] mx-0.5"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatedText>
                {t("auth.signUp.privacy") || "Chính sách bảo mật"}
              </AnimatedText>
            </Link>
          </label>
          <AnimatePresence>
            {errors.TermsAccepted && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-1.5"
              >
                <AlertCircle className="w-3.5 h-3.5 text-[hsl(var(--destructive))] flex-shrink-0" />
                <p className="text-[11px] font-medium text-[hsl(var(--destructive))]">
                  {errors.TermsAccepted.message}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Submit Button */}
      <motion.div variants={itemVariants} className="pt-4">
        <SubmitButton
          isLoading={isLoading}
          loadingText={t("auth.signUp.submitting") || "Đang xử lý..."}
          submitText={t("auth.signUp.submit") || "Đăng ký"}
        />
      </motion.div>

      {/* Divider */}
      <motion.div variants={itemVariants}>
        <Divider
          text={t("auth.signUp.orContinueWith") || "Hoặc tiếp tục với"}
        />
      </motion.div>

      {/* Social Login Buttons */}
      <motion.div variants={itemVariants}>
        <SocialLoginButtons isLoading={isLoading} />
      </motion.div>

      {/* Sign In Link */}
      <motion.div className="text-center pt-4" variants={itemVariants}>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          <AnimatedText>
            {t("auth.signUp.haveAccount") || "Đã có tài khoản?"}
          </AnimatedText>{" "}
          <Link
            to="/auth/sign-in"
            className="animated-underline text-[hsl(var(--primary))] font-bold hover:text-[hsl(var(--primary))]/80 transition-colors duration-200"
          >
            <AnimatedText>
              {t("auth.signUp.signInLink") || "Đăng nhập"}
            </AnimatedText>
          </Link>
        </p>
      </motion.div>
    </motion.form>
  );
}