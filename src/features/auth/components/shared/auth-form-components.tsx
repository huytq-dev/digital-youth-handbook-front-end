import { useState } from "react";
import { useTranslation } from "react-i18next";
import { showToast } from "@/lib/toast";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Eye, EyeOff, Loader2, ArrowRight, Mail, Lock, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnimatedText } from "@/components/animated-text";
import { getInputClasses, LABEL_CLASSES, shakeVariants, iconVariants } from "../../constants/auth.constants";

// Component hiển thị lỗi: Nhỏ gọn, trượt xuống
export function ErrorMessage({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -5, height: 0 }}
      animate={{ opacity: 1, y: 0, height: "auto" }}
      exit={{ opacity: 0, y: -5, height: 0 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-1.5 mt-1.5 pl-1"
    >
      <AlertCircle className="w-3.5 h-3.5 text-[hsl(var(--destructive))] flex-shrink-0" />
      <p className="text-xs font-medium text-[hsl(var(--destructive))]">{message}</p>
    </motion.div>
  );
}

// Form Label Component
interface FormLabelProps {
  htmlFor: string;
  hasError?: boolean;
  required?: boolean;
  children: React.ReactNode;
}

export function FormLabel({ htmlFor, hasError, required = false, children }: FormLabelProps) {
  return (
    <Label htmlFor={htmlFor} className={cn(LABEL_CLASSES, hasError && "text-[hsl(var(--destructive))]")}>
      {children}
      {required && <span className="text-[hsl(var(--destructive))] ml-1">*</span>}
    </Label>
  );
}

// Icon Field Wrapper Component
interface IconFieldProps {
  icon: React.ReactNode;
  hasError: boolean;
  focused: boolean;
  children: React.ReactNode;
  shakeOnError?: boolean;
}

export function IconField({ icon, hasError, focused, children, shakeOnError = true }: IconFieldProps) {
  return (
    <motion.div
      className="relative group"
      variants={shakeOnError ? shakeVariants : undefined}
      animate={hasError && shakeOnError ? "error" : "idle"}
    >
      <motion.div
        className={cn(
          "absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10 transition-colors duration-300",
          hasError
            ? "text-[hsl(var(--destructive))]"
            : focused
              ? "text-[hsl(var(--primary))]" // Sử dụng CSS variable từ global.css
              : "text-[hsl(var(--muted-foreground))]" // Sử dụng CSS variable từ global.css
        )}
        variants={iconVariants}
        animate={focused ? "focus" : "initial"}
      >
        {icon}
      </motion.div>
      {children}
    </motion.div>
  );
}

// Text Field Component (for Name, etc.)
interface TextFieldProps {
  id: string;
  label: string;
  placeholder: string;
  error?: string;
  register: any;
  disabled?: boolean;
  focused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  icon?: React.ReactNode;
}

export function TextField({
  id,
  label,
  placeholder,
  error,
  register,
  disabled,
  focused,
  onFocus,
  onBlur,
  icon = <User className="w-5 h-5" />,
}: TextFieldProps) {
  const hasError = !!error;

  return (
    <div className="space-y-1">
      <FormLabel htmlFor={id} hasError={hasError} required>
        <AnimatedText>{label}</AnimatedText>
      </FormLabel>
      <IconField icon={icon} hasError={hasError} focused={focused}>
        <Input
          id={id}
          type="text"
          className={getInputClasses(hasError)}
          placeholder={placeholder}
          {...register}
          disabled={disabled}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </IconField>
      <AnimatePresence>
        {error && <ErrorMessage message={error} />}
      </AnimatePresence>
    </div>
  );
}

// Password Field Component với visibility toggle
interface PasswordFieldProps {
  id: string;
  label: string;
  placeholder: string;
  error?: string;
  register: any;
  disabled?: boolean;
  focused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  showPasswordToggle?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}

export function PasswordField({
  id,
  label,
  placeholder,
  error,
  register,
  disabled,
  focused,
  onFocus,
  onBlur,
  showPasswordToggle = true,
  showPassword: externalShowPassword,
  onTogglePassword: externalOnTogglePassword,
}: PasswordFieldProps) {
  const [internalShowPassword, setInternalShowPassword] = useState(false);
  const showPassword = externalShowPassword !== undefined ? externalShowPassword : internalShowPassword;
  const togglePassword = externalOnTogglePassword || (() => setInternalShowPassword(!internalShowPassword));
  const hasError = !!error;

  return (
    <div className="space-y-1">
      <FormLabel htmlFor={id} hasError={hasError} required>
        <AnimatedText>{label}</AnimatedText>
      </FormLabel>
      <IconField
        icon={<Lock className="w-5 h-5" />}
        hasError={hasError}
        focused={focused}
      >
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          className={cn(getInputClasses(hasError), showPasswordToggle && "pr-10")}
          placeholder={placeholder}
          {...register}
          disabled={disabled}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={togglePassword}
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md transition-colors z-10",
              "hover:bg-[hsl(var(--accent))]", // Sử dụng CSS variable từ global.css
              hasError
                ? "text-[hsl(var(--destructive))]"
                : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))]" // Sử dụng CSS variables từ global.css
            )}
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <AnimatePresence mode="wait" initial={false}>
              {showPassword ? (
                <motion.div
                  key="eye-off"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                >
                  <EyeOff className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="eye"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                >
                  <Eye className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        )}
      </IconField>
      <AnimatePresence>
        {error && <ErrorMessage message={error} />}
      </AnimatePresence>
    </div>
  );
}

// Email Field Component
interface EmailFieldProps {
  id: string;
  label: string;
  placeholder: string;
  error?: string;
  register: any;
  disabled?: boolean;
  focused: boolean;
  onFocus: () => void;
  onBlur: () => void;
}

export function EmailField({
  id,
  label,
  placeholder,
  error,
  register,
  disabled,
  focused,
  onFocus,
  onBlur,
}: EmailFieldProps) {
  const hasError = !!error;

  return (
    <div className="space-y-1">
      <FormLabel htmlFor={id} hasError={hasError} required>
        <AnimatedText>{label}</AnimatedText>
      </FormLabel>
      <IconField
        icon={<Mail className="w-5 h-5" />}
        hasError={hasError}
        focused={focused}
      >
        <Input
          id={id}
          type="email"
          className={getInputClasses(hasError)}
          placeholder={placeholder}
          {...register}
          disabled={disabled}
          onFocus={onFocus}
          onBlur={onBlur}
          onInvalid={(e) => {
            e.preventDefault(); // Prevent browser default validation message
          }}
        />
      </IconField>
      <AnimatePresence>
        {error && <ErrorMessage message={error} />}
      </AnimatePresence>
    </div>
  );
}

// Submit Button Component
interface SubmitButtonProps {
  isLoading: boolean;
  loadingText: string;
  submitText: string;
  disabled?: boolean;
  className?: string;
}

export function SubmitButton({ isLoading, loadingText, submitText, disabled, className }: SubmitButtonProps) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Button
        type="submit"
        disabled={isLoading || disabled}
        className={cn(
          "w-full h-12 rounded-xl font-bold text-base shadow-lg relative overflow-hidden group",
          "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary))]/90", // Sử dụng CSS variables từ global.css
          "disabled:opacity-70 disabled:cursor-not-allowed",
          className
        )}
      >
        {/* Gradient Shine Effect - Giữ màu trắng/trong suốt vì nó nằm trên nền màu */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />

        <span className="relative z-20 flex items-center justify-center gap-2">
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <AnimatedText>{loadingText}</AnimatedText>
            </>
          ) : (
            <>
              <AnimatedText>{submitText}</AnimatedText>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </span>
      </Button>
    </motion.div>
  );
}

// Social Login Buttons Component
interface SocialLoginButtonsProps {
  isLoading?: boolean;
  onGoogleClick?: () => void;
  onFacebookClick?: () => void;
}

export function SocialLoginButtons({
  isLoading = false,
  onGoogleClick,
  onFacebookClick,
}: SocialLoginButtonsProps) {
  const { t } = useTranslation();

  const handleGoogleClick = () => {
    if (onGoogleClick) {
      onGoogleClick();
    } else {
      showToast.info(t("auth.signIn.socialComingSoon") || "Tính năng này sắp ra mắt");
    }
  };

  const handleFacebookClick = () => {
    if (onFacebookClick) {
      onFacebookClick();
    } else {
      showToast.info(t("auth.signIn.socialComingSoon") || "Tính năng này sắp ra mắt");
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="outline"
          type="button"
          disabled={isLoading}
          className="w-full h-11 rounded-xl border-[hsl(var(--input))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))] transition-colors shadow-sm"
          onClick={handleGoogleClick}
        >
          <svg
            className="mr-2 h-4 w-4 flex-shrink-0"
            aria-hidden="true"
            focusable="false"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
          >
            <path
              fill="currentColor"
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            />
          </svg>
          Google
        </Button>
      </motion.div>

      <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="outline"
          type="button"
          disabled={isLoading}
          className="w-full h-11 rounded-xl border-[hsl(var(--input))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))] transition-colors shadow-sm"
          onClick={handleFacebookClick}
        >
          <svg
            className="mr-2 h-4 w-4 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Facebook
        </Button>
      </motion.div>
    </div>
  );
}

// Divider Component
interface DividerProps {
  text: string;
}

export function Divider({ text }: DividerProps) {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        {/* Border Muted */}
        <span className="w-full border-t border-border" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        {/* Sử dụng CSS variables từ global.css */}
        <span className="bg-[hsl(var(--background))] px-2 text-[hsl(var(--muted-foreground))] font-medium">
          <AnimatedText>{text}</AnimatedText>
        </span>
      </div>
    </div>
  );
}