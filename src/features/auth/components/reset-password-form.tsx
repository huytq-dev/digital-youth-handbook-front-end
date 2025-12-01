import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { showToast } from "@/lib/toast";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedText } from "@/components/animated-text";
import { resetPasswordSchema, type ResetPasswordFormData } from "../auth.schema";
import { useResetPasswordMutation } from "../auth.slice";
import { isApiResponseSuccess, getApiErrorMessage } from "@/features/common/common.type";
import {
  containerVariants,
  itemVariants,
} from "../constants/auth.constants";
import {
  PasswordField,
  SubmitButton,
} from "./shared/auth-form-components";

export function ResetPasswordForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
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

  // Lấy token từ URL query params
  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
      setValue("token", tokenFromUrl);
    } else {
      showToast.error(
        t("auth.resetPassword.invalidToken") || "Token không hợp lệ hoặc đã hết hạn"
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
        // Không cần toast vì đã có success state hiển thị ở giữa màn hình

        // Redirect về trang đăng nhập sau 3 giây
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
      // Log error vào console để debug (chỉ trong console)
      // Log error vào console để debug (chỉ trong development)
      if (import.meta.env.DEV || import.meta.env.MODE === "development") {
        console.log('=== RESET PASSWORD API ERROR ===');
        // Không log full error để tránh leak thông tin nhạy cảm
        if (error && typeof error === "object" && "status" in error) {
          console.log('Error Status:', (error as any).status);
        }
        console.log('==================================');
      }

      let errorMessage = t("auth.resetPassword.errorMessage") || "Có lỗi xảy ra. Vui lòng thử lại sau.";

      // Handle RTK Query error format và lấy message thân thiện
      if (error && typeof error === "object") {
        if ("data" in error && error.data) {
          errorMessage = getApiErrorMessage(error.data as any);
        } else if ("error" in error && error.error) {
          if (typeof error.error === "string") {
            errorMessage = error.error;
          } else if (typeof error.error === "object" && "data" in error.error) {
            errorMessage = getApiErrorMessage(error.error.data as any);
          }
        } else if ("status" in error) {
          const status = (error as any).status;
          if (status === 500) {
            errorMessage = t("auth.resetPassword.errorMessage") || "Lỗi hệ thống. Vui lòng thử lại sau.";
          } else if (status === 400) {
            errorMessage = "Thông tin không hợp lệ. Vui lòng kiểm tra lại.";
          } else if (status === 401 || status === 403) {
            errorMessage = "Token không hợp lệ hoặc đã hết hạn. Vui lòng yêu cầu đặt lại mật khẩu mới.";
          } else if (status >= 500) {
            errorMessage = t("auth.resetPassword.errorMessage") || "Lỗi hệ thống. Vui lòng thử lại sau.";
          }
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
        <Loader2 className="w-8 h-8 animate-spin text-[hsl(var(--primary))] mb-4" />
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
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
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="flex flex-col items-center justify-center py-8"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <CheckCircle2 className="w-20 h-20 text-green-500 mb-6 mx-auto drop-shadow-lg" />
        </motion.div>
        <h3 className="text-2xl font-bold text-[hsl(var(--primary))] mb-3 text-center">
          <AnimatedText>
            {t("auth.resetPassword.successTitle") || "Đặt lại mật khẩu thành công!"}
          </AnimatedText>
        </h3>
        <p className="text-[hsl(var(--muted-foreground))] text-center mb-6 max-w-sm mx-auto leading-relaxed">
          <AnimatedText>
            {t("auth.resetPassword.successMessage") ||
              "Mật khẩu của bạn đã được đặt lại thành công. Bạn có thể đăng nhập bằng mật khẩu mới."}
          </AnimatedText>
        </p>
        <p className="text-sm text-[hsl(var(--muted-foreground))]/70 text-center mb-6">
          <AnimatedText>
            {t("auth.resetPassword.redirectMessage") ||
              "Đang chuyển đến trang đăng nhập..."}
          </AnimatedText>
        </p>
        <Button
          onClick={() => navigate("/auth/sign-in")}
          className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary))]/90"
        >
          <AnimatedText>
            {t("auth.resetPassword.goToSignIn") || "Đi đến đăng nhập"}
          </AnimatedText>
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header - Chỉ hiển thị khi đang nhập liệu */}
      <motion.div variants={itemVariants} className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[hsl(var(--primary))] mb-3 tracking-tight">
          <AnimatedText>
            {t("auth.resetPassword.title") || "Đặt lại mật khẩu"}
          </AnimatedText>
        </h1>
        <p className="text-[hsl(var(--muted-foreground))] text-sm leading-relaxed">
          <AnimatedText>
            {t("auth.resetPassword.subtitle") ||
              "Tạo mật khẩu mới cho tài khoản của bạn"}
          </AnimatedText>
        </p>
      </motion.div>

      {/* Description */}
      <motion.div className="mb-6" variants={itemVariants}>
        <p className="text-sm text-[hsl(var(--muted-foreground))] text-center leading-relaxed px-2">
          <AnimatedText>
            {t("auth.resetPassword.description") ||
              "Nhập mật khẩu mới của bạn. Mật khẩu phải có ít nhất 6 ký tự."}
          </AnimatedText>
        </p>
      </motion.div>

      {/* New Password Field */}
      <motion.div variants={itemVariants}>
        <PasswordField
          id="reset-password-new"
          label={t("auth.resetPassword.newPassword") || "Mật khẩu mới"}
          placeholder={
            t("auth.resetPassword.newPasswordPlaceholder") || "Tối thiểu 6 ký tự"
          }
          error={errors.newPassword?.message}
          register={register("newPassword")}
          disabled={isLoading}
          focused={focusedField === "newPassword"}
          onFocus={() => setFocusedField("newPassword")}
          onBlur={() => setFocusedField(null)}
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
        />
      </motion.div>

      {/* Confirm Password Field */}
      <motion.div variants={itemVariants}>
        <PasswordField
          id="reset-password-confirm"
          label={t("auth.resetPassword.confirmPassword") || "Xác nhận mật khẩu"}
          placeholder={
            t("auth.resetPassword.confirmPasswordPlaceholder") ||
            "Nhập lại mật khẩu mới"
          }
          error={errors.confirmPassword?.message}
          register={register("confirmPassword")}
          disabled={isLoading}
          focused={focusedField === "confirmPassword"}
          onFocus={() => setFocusedField("confirmPassword")}
          onBlur={() => setFocusedField(null)}
          showPassword={showPasswordConfirm}
          onTogglePassword={() => setShowPasswordConfirm(!showPasswordConfirm)}
        />
      </motion.div>

      {/* Submit Button */}
      <motion.div variants={itemVariants} className="pt-4">
        <SubmitButton
          isLoading={isLoading}
          loadingText={t("auth.resetPassword.submitting") || "Đang xử lý..."}
          submitText={t("auth.resetPassword.submit") || "Đặt lại mật khẩu"}
        />
      </motion.div>

      {/* Back to Sign In Link */}
      <motion.div className="text-center pt-6" variants={itemVariants}>
        <Link
          to="/auth/sign-in"
          className="animated-underline text-sm text-[hsl(var(--primary))] hover:text-[hsl(var(--primary))]/80 font-medium inline-flex items-center gap-2 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <AnimatedText>
            {t("auth.resetPassword.backToSignIn") || "Quay lại đăng nhập"}
          </AnimatedText>
        </Link>
      </motion.div>
    </motion.form>
  );
}
