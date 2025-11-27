import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedText } from "@/components/animated-text";
import { forgotPasswordSchema, type ForgotPasswordFormData } from "../auth.schema";
import { useForgotPasswordMutation } from "../auth.slice";
import { isApiResponseSuccess, getApiErrorMessage } from "@/features/common/common.type";
import {
  containerVariants,
  itemVariants,
} from "../constants/auth.constants";
import {
  EmailField,
  SubmitButton,
} from "./shared/auth-form-components";

export function ForgotPasswordForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      Email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      const response = await forgotPassword(data).unwrap();

      if (isApiResponseSuccess(response)) {
        setIsSuccess(true);
        toast.success(
          t("auth.forgotPassword.successTitle") || "Email đã được gửi!",
          {
            description:
              t("auth.forgotPassword.successMessage") ||
              "Vui lòng kiểm tra email để đặt lại mật khẩu.",
          }
        );
      } else {
        const errorMessage = getApiErrorMessage(response);
        toast.error(
          t("auth.forgotPassword.errorTitle") || "Gửi email thất bại",
          {
            description: errorMessage,
          }
        );
      }
    } catch (error: unknown) {
      // Log error vào console để debug (chỉ trong console)
      // Log error vào console để debug (chỉ trong development)
      if (import.meta.env.DEV || import.meta.env.MODE === "development") {
        console.log('=== FORGOT PASSWORD API ERROR ===');
        // Không log full error để tránh leak thông tin nhạy cảm
        if (error && typeof error === "object" && "status" in error) {
          console.log('Error Status:', (error as any).status);
        }
        console.log('===================================');
      }

      let errorMessage = t("auth.forgotPassword.errorMessage") || "Có lỗi xảy ra. Vui lòng thử lại sau.";

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
            errorMessage = t("auth.forgotPassword.errorMessage") || "Lỗi hệ thống. Vui lòng thử lại sau.";
          } else if (status === 400) {
            errorMessage = "Địa chỉ email không hợp lệ. Vui lòng kiểm tra lại.";
          } else if (status === 404) {
            errorMessage = "Không tìm thấy email. Vui lòng kiểm tra lại địa chỉ email.";
          } else if (status >= 500) {
            errorMessage = t("auth.forgotPassword.errorMessage") || "Lỗi hệ thống. Vui lòng thử lại sau.";
          }
        }
      }

      toast.error(
        t("auth.forgotPassword.errorTitle") || "Gửi email thất bại",
        {
          description: errorMessage,
        }
      );
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="flex flex-col items-center justify-center py-8 w-full"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="mb-6"
        >
          <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto drop-shadow-lg" />
        </motion.div>
        <h3 className="text-2xl font-bold text-[hsl(var(--primary))] mb-3 text-center w-full">
          <AnimatedText>
            {t("auth.forgotPassword.successTitle") || "Email đã được gửi!"}
          </AnimatedText>
        </h3>
        <p className="text-[hsl(var(--muted-foreground))] text-center mb-8 max-w-sm mx-auto leading-relaxed px-2">
          <AnimatedText>
            {t("auth.forgotPassword.successMessage") ||
              "Vui lòng kiểm tra email của bạn. Chúng tôi đã gửi link đặt lại mật khẩu đến địa chỉ email bạn đã cung cấp."}
          </AnimatedText>
        </p>
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm mx-auto">
          <Button
            onClick={() => navigate("/auth/sign-in")}
            variant="outline"
            className="w-full sm:flex-1"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <AnimatedText>
              {t("auth.forgotPassword.backToSignIn") || "Quay lại đăng nhập"}
            </AnimatedText>
          </Button>
          <Button
            onClick={() => {
              setIsSuccess(false);
            }}
            className="w-full sm:flex-1 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary))]/90"
          >
            <AnimatedText>
              {t("auth.forgotPassword.resendEmail") || "Gửi lại email"}
            </AnimatedText>
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5 w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header - Chỉ hiển thị khi đang nhập liệu */}
      <motion.div variants={itemVariants} className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[hsl(var(--primary))] mb-3 tracking-tight">
          <AnimatedText>
            {t("auth.forgotPassword.title") || "Quên mật khẩu"}
          </AnimatedText>
        </h1>
        <p className="text-[hsl(var(--muted-foreground))] text-sm leading-relaxed">
          <AnimatedText>
            {t("auth.forgotPassword.subtitle") ||
              "Đặt lại mật khẩu của bạn"}
          </AnimatedText>
        </p>
      </motion.div>

      {/* Description */}
      <motion.div className="mb-6" variants={itemVariants}>
        <p className="text-sm text-[hsl(var(--muted-foreground))] text-center leading-relaxed px-2">
          <AnimatedText>
            {t("auth.forgotPassword.description") ||
              "Nhập email của bạn và chúng tôi sẽ gửi link đặt lại mật khẩu cho bạn."}
          </AnimatedText>
        </p>
      </motion.div>

      {/* Email Field */}
      <motion.div variants={itemVariants}>
        <EmailField
          id="forgot-password-email"
          label={t("auth.forgotPassword.email") || "Email"}
          placeholder={
            t("auth.forgotPassword.emailPlaceholder") || "example@email.com"
          }
          error={errors.Email?.message}
          register={register("Email")}
          disabled={isLoading}
          focused={focusedField === "Email"}
          onFocus={() => setFocusedField("Email")}
          onBlur={() => setFocusedField(null)}
        />
      </motion.div>

      {/* Submit Button */}
      <motion.div variants={itemVariants} className="pt-4">
        <SubmitButton
          isLoading={isLoading}
          loadingText={t("auth.forgotPassword.submitting") || "Đang gửi..."}
          submitText={
            t("auth.forgotPassword.submit") || "Gửi link đặt lại mật khẩu"
          }
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
            {t("auth.forgotPassword.backToSignIn") || "Quay lại đăng nhập"}
          </AnimatedText>
        </Link>
      </motion.div>
    </motion.form>
  );
}
