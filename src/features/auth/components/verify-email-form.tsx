import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, XCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedText } from "@/components/animated-text";
import { useVerifyEmailMutation } from "../auth.slice";
import { isApiResponseSuccess, getApiErrorMessage } from "@/features/common/common.type";
import {
  containerVariants,
  itemVariants,
} from "../constants/auth.constants";

export function VerifyEmailForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState<string>("");
  const [isVerified, setIsVerified] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();

  // Lấy token từ URL query params và tự động verify
  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
      // Tự động gọi API verify khi có token
      handleVerify(tokenFromUrl);
    } else {
      setIsError(true);
      setErrorMessage(t("auth.verifyEmail.invalidToken") || "Token không hợp lệ hoặc đã hết hạn");
      // Không cần toast vì đã có error state hiển thị ở giữa màn hình
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, t]);

  const handleVerify = async (emailToken: string) => {
    try {
      const response = await verifyEmail({ token: emailToken }).unwrap();

      if (isApiResponseSuccess(response)) {
        setIsVerified(true);
        // Không cần toast vì đã có thông báo lớn ở giữa màn hình
        // Redirect về trang đăng nhập sau 3 giây
        setTimeout(() => {
          navigate("/auth/sign-in");
        }, 3000);
      } else {
        const errorMsg = getApiErrorMessage(response);
        setIsError(true);
        setErrorMessage(errorMsg);
        // Không cần toast vì đã có error state hiển thị ở giữa màn hình
      }
    } catch (error: unknown) {
      const errorMsg = getApiErrorMessage(
        error && typeof error === "object" && "data" in error
          ? (error as any).data
          : null
      );
      setIsError(true);
      setErrorMessage(errorMsg);
      // Không cần toast vì đã có error state hiển thị ở giữa màn hình
    }
  };

  // Loading state
  if (isLoading && !isVerified && !isError) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="flex flex-col items-center justify-center py-12"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <Loader2 className="w-12 h-12 animate-spin text-[hsl(var(--primary))] mb-4" />
        </motion.div>
        <motion.p className="text-sm text-[hsl(var(--muted-foreground))]" variants={itemVariants}>
          <AnimatedText>
            {t("auth.verifyEmail.loading") || "Đang xác nhận email..."}
          </AnimatedText>
        </motion.p>
      </motion.div>
    );
  }

  // Success state
  if (isVerified) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="flex flex-col items-center justify-center py-8"
        variants={containerVariants}
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          variants={itemVariants}
        >
          <CheckCircle2 className="w-20 h-20 text-green-500 mb-6 mx-auto drop-shadow-lg" />
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-[hsl(var(--primary))] mb-3 text-center"
          variants={itemVariants}
        >
          <AnimatedText>
            {t("auth.verifyEmail.successTitle") || "Xác nhận email thành công!"}
          </AnimatedText>
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-sm text-[hsl(var(--muted-foreground))] text-center max-w-sm mx-auto leading-relaxed mb-6"
          variants={itemVariants}
        >
          <AnimatedText>
            {t("auth.verifyEmail.successMessage") ||
              "Email của bạn đã được xác nhận thành công. Bạn có thể đăng nhập ngay bây giờ."}
          </AnimatedText>
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-sm text-[hsl(var(--muted-foreground))]/70 text-center mb-6"
          variants={itemVariants}
        >
          <AnimatedText>
            {t("auth.verifyEmail.redirectMessage") ||
              "Đang chuyển đến trang đăng nhập..."}
          </AnimatedText>
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          variants={itemVariants}
        >
          <Button
            onClick={() => navigate("/auth/sign-in")}
            className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary))]/90"
          >
            <AnimatedText>
              {t("auth.verifyEmail.goToSignIn") || "Đi đến đăng nhập"}
            </AnimatedText>
          </Button>
        </motion.div>
      </motion.div>
    );
  }

  // Error state
  if (isError) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="flex flex-col items-center justify-center py-8"
        variants={containerVariants}
      >
        <motion.div
          initial={{ scale: 0, rotate: 180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          variants={itemVariants}
        >
          <XCircle className="w-20 h-20 text-red-500 mb-6 mx-auto drop-shadow-lg" />
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-[hsl(var(--destructive))] mb-3 text-center"
          variants={itemVariants}
        >
          <AnimatedText>
            {t("auth.verifyEmail.errorTitle") || "Xác nhận email thất bại"}
          </AnimatedText>
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-sm text-[hsl(var(--muted-foreground))] text-center max-w-sm mx-auto leading-relaxed mb-6"
          variants={itemVariants}
        >
          <AnimatedText>{errorMessage}</AnimatedText>
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-3"
          variants={itemVariants}
        >
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => navigate("/auth/sign-in")}
              variant="outline"
              className="w-full sm:w-auto"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <AnimatedText>
                {t("auth.verifyEmail.backToSignIn") || "Quay lại đăng nhập"}
              </AnimatedText>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={() => navigate("/auth/sign-up")}
              className="w-full sm:w-auto bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary))]/90"
            >
              <AnimatedText>
                {t("auth.verifyEmail.goToSignUp") || "Đăng ký lại"}
              </AnimatedText>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }

  return null;
}

