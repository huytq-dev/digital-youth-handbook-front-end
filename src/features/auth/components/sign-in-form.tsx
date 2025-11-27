import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";
import { motion } from "framer-motion";
import { AnimatedText } from "@/components/animated-text";
import { signInSchema, type SignInFormData } from "@/features/auth/auth.schema";
// import { useSignInMutation } from "@/features/auth/auth.slice";
// import { isApiResponseSuccess, getApiErrorMessage } from "@/features/common/common.type";
// import { authService } from "@/features/auth/auth.service";
// import { useSocialLogin } from "@/features/auth/hooks/use-social-login";
import {
  containerVariants,
  itemVariants,
} from "@/features/auth/constants/auth.constants";
import {
  EmailField,
  PasswordField,
  SubmitButton,
  SocialLoginButtons,
  Divider,
} from "./shared/auth-form-components";

export function SignInForm() {
  const { t } = useTranslation();
  // const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // const [signIn, { isLoading }] = useSignInMutation();
  const isLoading = false;
  // const { handleGoogleLogin, handleFacebookLogin, isLoading: isSocialLoading } = useSocialLogin();
  const handleGoogleLogin = () => console.log("Google login clicked (UI test)");
  const handleFacebookLogin = () =>
    console.log("Facebook login clicked (UI test)");
  const isSocialLoading = false;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      Email: "",
      Password: "",
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    console.log("Sign in submit (UI testing only)", data);
    // ... existing logic commented out ...
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header - Giảm margin bottom để gắn kết hơn */}
      <motion.div variants={itemVariants} className="text-center mb-6">
        {/* Sử dụng CSS variable từ global.css */}
        <h1 className="text-3xl font-bold text-[hsl(var(--primary))] mb-2 tracking-tight">
          <AnimatedText>{t("auth.signIn.title") || "Đăng nhập"}</AnimatedText>
        </h1>
        {/* Sử dụng CSS variable từ global.css */}
        <p className="text-[hsl(var(--muted-foreground))] text-sm font-medium">
          <AnimatedText>
            {t("auth.signIn.subtitle") ||
              "Chào mừng bạn trở lại Digi Transport"}
          </AnimatedText>
        </p>
      </motion.div>

      {/* INPUT GROUP: Gom Email & Password gần nhau hơn */}
      <div className="space-y-4">
        <motion.div variants={itemVariants}>
          <EmailField
            id="signin-email"
            label={t("auth.signIn.email") || "Email"}
            placeholder={
              t("auth.signIn.emailPlaceholder") || "example@email.com"
            }
            error={errors.Email?.message}
            register={register("Email")}
            disabled={isLoading}
            focused={focusedField === "Email"}
            onFocus={() => setFocusedField("Email")}
            onBlur={() => setFocusedField(null)}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="relative">
            <PasswordField
              id="signin-password"
              label={t("auth.signIn.password") || "Mật khẩu"}
              placeholder={
                t("auth.signIn.passwordPlaceholder") || "Nhập mật khẩu"
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

            {/* Forgot Password Link - Đặt ngay dưới input password để tạo liên kết */}
            <div className="flex justify-end mt-1.5">
              <Link
                to="/auth/forgot-password"
                // Sử dụng CSS variable từ global.css
                className="text-xs font-medium text-[hsl(var(--primary))] hover:text-[hsl(var(--primary))]/80 hover:underline transition-colors duration-200"
                tabIndex={-1}
              >
                <AnimatedText>
                  {t("auth.signIn.forgotPassword") || "Quên mật khẩu?"}
                </AnimatedText>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ACTION GROUP: Nút Submit tách biệt một chút */}
      <motion.div variants={itemVariants} className="pt-2">
        <SubmitButton
          isLoading={isLoading}
          loadingText={t("auth.signIn.submitting") || "Đang đăng nhập..."}
          submitText={t("auth.signIn.submit") || "Đăng nhập"}
          className="shadow-md hover:shadow-lg transition-all duration-300"
        />
      </motion.div>

      {/* SOCIAL & FOOTER GROUP */}
      <div className="space-y-6">
        <motion.div variants={itemVariants}>
          <Divider
            text={t("auth.signIn.orContinueWith") || "Hoặc tiếp tục với"}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <SocialLoginButtons
            isLoading={isLoading || isSocialLoading}
            onGoogleClick={handleGoogleLogin}
            onFacebookClick={handleFacebookLogin}
          />
        </motion.div>

        <motion.div className="text-center" variants={itemVariants}>
          {/* Sử dụng CSS variable từ global.css */}
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            <AnimatedText>
              {t("auth.signIn.noAccount") || "Chưa có tài khoản?"}
            </AnimatedText>{" "}
            <Link
              to="/auth/sign-up"
              // Sử dụng CSS variable từ global.css
              className="animated-underline text-[hsl(var(--primary))] font-bold hover:text-[hsl(var(--primary))]/80 transition-colors duration-200"
            >
              <AnimatedText>
                {t("auth.signIn.signUpLink") || "Đăng ký ngay"}
              </AnimatedText>
            </Link>
          </p>
        </motion.div>
      </div>
    </motion.form>
  );
}
