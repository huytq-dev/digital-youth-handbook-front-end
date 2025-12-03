import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
<<<<<<< HEAD
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";
import { motion } from "framer-motion";
import { AnimatedText } from "@/components/animated-text";
import { signInSchema, type SignInFormData } from "@/features/auth/auth.schema";
// import { useSignInMutation } from "@/features/auth/auth.slice";
// import { isApiResponseSuccess, getApiErrorMessage } from "@/features/common/common.type";
// import { authService } from "@/features/auth/auth.service";
=======
import { Link, useNavigate } from "react-router-dom";
import { showToast } from "@/lib/toast";
import { motion } from "framer-motion";
import { AnimatedText } from "@/components/animated-text";
import { signInSchema, type SignInFormData } from "@/features/auth/auth.schema";
import { useSignInMutation } from "@/features/auth/auth.slice";
import { isApiResponseSuccess, getApiErrorMessage } from "@/features/common/common.type";
import { authService } from "@/features/auth/auth.service";
>>>>>>> bd6d5d524b869f34ec4dd3fbf4acc06975bef341
// import { useSocialLogin } from "@/features/auth/hooks/use-social-login";
import {
  containerVariants,
  itemVariants,
} from "@/features/auth/constants/auth.constants";
import {
  EmailField,
  PasswordField,
  SubmitButton,
<<<<<<< HEAD
  SocialLoginButtons,
  Divider,
=======
  // SocialLoginButtons,
  // Divider,
>>>>>>> bd6d5d524b869f34ec4dd3fbf4acc06975bef341
} from "./shared/auth-form-components";

export function SignInForm() {
  const { t } = useTranslation();
<<<<<<< HEAD
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
=======
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const [signIn, { isLoading }] = useSignInMutation();
  // Temporarily commented out social login for testing
  // const { handleGoogleLogin, handleFacebookLogin, isLoading: isSocialLoading } = useSocialLogin();
  // const isSocialLoading = false;
>>>>>>> bd6d5d524b869f34ec4dd3fbf4acc06975bef341

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
<<<<<<< HEAD
      Email: "",
      Password: "",
=======
      email: "",
      password: "",
>>>>>>> bd6d5d524b869f34ec4dd3fbf4acc06975bef341
    },
  });

  const onSubmit = async (data: SignInFormData) => {
<<<<<<< HEAD
    console.log("Sign in submit (UI testing only)", data);
    // ... existing logic commented out ...
=======
    try {
      const response = await signIn(data).unwrap();

      if (isApiResponseSuccess(response)) {
        const responseData = response.data || response.Data;
        if (responseData) {
          authService.saveAuthData(responseData);
          showToast.success(
            t("auth.signIn.successTitle") || "Đăng nhập thành công!",
            t("auth.signIn.successMessage") || "Chào mừng bạn trở lại!"
          );
          navigate("/");
        }
      } else {
        const errorMessage = getApiErrorMessage(response);
        showToast.error(t("auth.signIn.errorTitle") || "Đăng nhập thất bại", errorMessage);
      }
    } catch (error: unknown) {
      const errorMessage = getApiErrorMessage(
        error && typeof error === "object" && "data" in error
          ? (error as any).data
          : null
      );
      showToast.error(t("auth.signIn.errorTitle") || "Đăng nhập thất bại", errorMessage);
    }
>>>>>>> bd6d5d524b869f34ec4dd3fbf4acc06975bef341
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
<<<<<<< HEAD
<<<<<<< HEAD
              "Chào mừng bạn trở lại Tuổi Trẻ Online"}
=======
              "Chào mừng bạn trở lại Hành Trang Số"}
>>>>>>> bd6d5d524b869f34ec4dd3fbf4acc06975bef341
=======
              "Chào mừng bạn trở lại Tuổi Trẻ Online"}
>>>>>>> 2bd665c48a54b88a4dfaa5d7fb1ac1773582eb84
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
<<<<<<< HEAD
            error={errors.Email?.message}
            register={register("Email")}
            disabled={isLoading}
            focused={focusedField === "Email"}
            onFocus={() => setFocusedField("Email")}
=======
            error={errors.email?.message}
            register={register("email")}
            disabled={isLoading}
            focused={focusedField === "email"}
            onFocus={() => setFocusedField("email")}
>>>>>>> bd6d5d524b869f34ec4dd3fbf4acc06975bef341
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
<<<<<<< HEAD
              error={errors.Password?.message}
              register={register("Password")}
              disabled={isLoading}
              focused={focusedField === "Password"}
              onFocus={() => setFocusedField("Password")}
=======
              error={errors.password?.message}
              register={register("password")}
              disabled={isLoading}
              focused={focusedField === "password"}
              onFocus={() => setFocusedField("password")}
>>>>>>> bd6d5d524b869f34ec4dd3fbf4acc06975bef341
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

<<<<<<< HEAD
      {/* SOCIAL & FOOTER GROUP */}
      <div className="space-y-6">
=======
      {/* SOCIAL & FOOTER GROUP - Temporarily commented out for testing */}
      {/* <div className="space-y-6">
>>>>>>> bd6d5d524b869f34ec4dd3fbf4acc06975bef341
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
<<<<<<< HEAD

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
=======
      </div> */}

      {/* Sign up link */}
      <motion.div className="text-center pt-4" variants={itemVariants}>
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
>>>>>>> bd6d5d524b869f34ec4dd3fbf4acc06975bef341
    </motion.form>
  );
}
