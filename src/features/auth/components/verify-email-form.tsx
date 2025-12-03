import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Loader2,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  UserPlus,
  LogIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedText } from "@/components/animated-text";
import { useVerifyEmailMutation } from "../auth.slice";
import {
  isApiResponseSuccess,
  getApiErrorMessage,
} from "@/features/common/common.type";
import { containerVariants } from "../constants/auth.constants";

export function VerifyEmailForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isVerified, setIsVerified] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    if (tokenFromUrl) {
      handleVerify(tokenFromUrl);
    } else {
      setIsError(true);
      setErrorMessage(
        t("auth.verifyEmail.invalidToken") ||
          "Token không hợp lệ hoặc đã hết hạn"
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, t]);

  const handleVerify = async (emailToken: string) => {
    try {
      const response = await verifyEmail({ token: emailToken }).unwrap();

      if (isApiResponseSuccess(response)) {
        setIsVerified(true);
        setTimeout(() => {
          navigate("/auth/sign-in");
        }, 3000);
      } else {
        const errorMsg = getApiErrorMessage(response);
        setIsError(true);
        setErrorMessage(errorMsg);
      }
    } catch (error: unknown) {
      const errorMsg = getApiErrorMessage(
        error && typeof error === "object" && "data" in error
          ? (error as any).data
          : null
      );
      setIsError(true);
      setErrorMessage(errorMsg);
    }
  };

  // --- 1. LOADING STATE ---
  if (isLoading && !isVerified && !isError) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-lg mx-auto bg-white border-2 border-black rounded-xl shadow-[8px_8px_0px_black] p-10 text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-blue-400 border-b-2 border-black" />

        <div className="flex flex-col items-center justify-center py-8">
          <div className="w-16 h-16 border-2 border-black bg-blue-100 rounded-xl flex items-center justify-center mb-6 shadow-[4px_4px_0px_black] animate-bounce">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
          <h3 className="text-xl font-black text-black uppercase tracking-tight mb-2">
            <AnimatedText>
              {t("auth.verifyEmail.loading") || "Đang xác thực..."}
            </AnimatedText>
          </h3>
          <p className="text-sm font-bold text-slate-500">
            Vui lòng đợi trong giây lát
          </p>
        </div>
      </motion.div>
    );
  }

  // --- 2. SUCCESS STATE ---
  if (isVerified) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="w-full max-w-lg mx-auto bg-white border-2 border-black rounded-xl shadow-[8px_8px_0px_black] p-10 text-center relative overflow-hidden"
      >
        {/* Decor Header */}
        <div className="absolute top-0 left-0 w-full h-2 bg-green-500 border-b-2 border-black" />

        <div className="mb-6 flex justify-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-20 h-20 bg-green-100 rounded-full border-2 border-black flex items-center justify-center shadow-[4px_4px_0px_black]"
          >
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </motion.div>
        </div>

        <h3 className="text-2xl font-black text-black uppercase mb-3">
          <AnimatedText>
            {t("auth.verifyEmail.successTitle") || "Xác thực thành công!"}
          </AnimatedText>
        </h3>

        <p className="text-base font-medium text-slate-600 mb-8 leading-relaxed px-4">
          <AnimatedText>
            {t("auth.verifyEmail.successMessage") ||
              "Email của bạn đã được xác nhận. Tài khoản đã sẵn sàng sử dụng."}
          </AnimatedText>
        </p>

        {/* Progress Bar tự chạy */}
        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden border border-black mb-2">
          <motion.div
            className="h-full bg-green-500"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, ease: "linear" }}
          />
        </div>
        <p className="text-xs font-bold text-slate-400 mb-6">
          <AnimatedText>
            {t("auth.verifyEmail.redirectMessage") ||
              "Đang chuyển đến trang đăng nhập..."}
          </AnimatedText>
        </p>

        <Button
          onClick={() => navigate("/auth/sign-in")}
          // Neo-Brutalism: Default shadow 4px, Hover lift 2px + shadow 6px, Active press 4px + no shadow
          className="w-full h-14 bg-black text-white font-black text-lg uppercase rounded-lg border-2 border-black shadow-[4px_4px_0px_black] transition-all hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0px_black] hover:bg-slate-800 active:translate-y-1 active:translate-x-1 active:shadow-none flex items-center justify-center gap-2"
        >
          <LogIn size={18} />
          <AnimatedText>
            {t("auth.verifyEmail.goToSignIn") || "Đăng nhập ngay"}
          </AnimatedText>
        </Button>
      </motion.div>
    );
  }

  // --- 3. ERROR STATE ---
  if (isError) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="w-full max-w-lg mx-auto bg-white border-2 border-black rounded-xl shadow-[8px_8px_0px_black] p-10 text-center relative overflow-hidden"
      >
        {/* Decor Header (Red) */}
        <div className="absolute top-0 left-0 w-full h-2 bg-red-500 border-b-2 border-black" />

        <div className="mb-6 flex justify-center">
          <motion.div
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            className="w-20 h-20 bg-red-100 rounded-full border-2 border-black flex items-center justify-center shadow-[4px_4px_0px_black]"
          >
            <XCircle className="w-10 h-10 text-red-600" />
          </motion.div>
        </div>

        <h3 className="text-2xl font-black text-red-600 uppercase mb-3">
          <AnimatedText>
            {t("auth.verifyEmail.errorTitle") || "Xác thực thất bại"}
          </AnimatedText>
        </h3>

        <div className="bg-red-50 border-2 border-black rounded-lg p-4 mb-8">
          <p className="text-sm font-bold text-slate-700 leading-snug">
            <AnimatedText>{errorMessage}</AnimatedText>
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            onClick={() => navigate("/auth/sign-in")}
            // Neo-Brutalism: Default shadow 4px, Hover lift 2px + shadow 6px, Active press 4px + no shadow
            className="w-full h-14 bg-white text-black font-black text-lg uppercase rounded-lg border-2 border-black shadow-[4px_4px_0px_black] transition-all hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0px_black] hover:bg-slate-50 active:translate-y-1 active:translate-x-1 active:shadow-none flex items-center justify-center gap-2"
          >
            <ArrowLeft size={18} />
            <AnimatedText>
              {t("auth.verifyEmail.backToSignIn") || "Về trang đăng nhập"}
            </AnimatedText>
          </Button>

          <Button
            onClick={() => navigate("/auth/sign-up")}
            // Neo-Brutalism: Default shadow 4px, Hover lift 2px + shadow 6px, Active press 4px + no shadow
            className="w-full h-14 bg-blue-600 text-white font-black text-lg uppercase rounded-lg border-2 border-black shadow-[4px_4px_0px_black] transition-all hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0px_black] hover:bg-blue-700 active:translate-y-1 active:translate-x-1 active:shadow-none flex items-center justify-center gap-2"
          >
            <UserPlus size={18} />
            <AnimatedText>
              {t("auth.verifyEmail.goToSignUp") || "Đăng ký lại tài khoản"}
            </AnimatedText>
          </Button>
        </div>
      </motion.div>
    );
  }

  return null;
}
