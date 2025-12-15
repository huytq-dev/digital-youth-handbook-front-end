import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { showToast } from "@/lib/toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  Check,
  School,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedText } from "@/components/animated-text";
import { signUpSchema, type SignUpFormData } from "../auth.schema";
import { useSignUpMutation } from "../auth.api";
import {
  isApiResponseSuccess,
  getApiErrorMessage,
} from "@/features/common/common.type";
import { containerVariants } from "../constants/auth.constants";
import { SCHOOLS_LIST } from "../constants/schools.constants";

const REDIRECT_DELAY_MS = 3000;
const PASSWORD_STRENGTH_THRESHOLDS = [6, 8, 10, 12] as const;

export function SignUpForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // School autocomplete state
  const [schoolQuery, setSchoolQuery] = useState("");
  const [showSchoolSuggestions, setShowSchoolSuggestions] = useState(false);
  const [selectedSchoolIndex, setSelectedSchoolIndex] = useState(-1);
  const schoolInputRef = useRef<HTMLInputElement>(null);
  const schoolDropdownRef = useRef<HTMLDivElement>(null);

  const [signUp, { isLoading }] = useSignUpMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      schoolName: "",
      className: "",
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
      termsAccepted: false,
    },
  });

  const passwordValue = watch("password");
  const termsAccepted = watch("termsAccepted");
  const usernameValue = watch("username");
  const schoolValue = watch("schoolName");

  // Filtered schools based on query
  const filteredSchools = useMemo(() => {
    if (!schoolQuery.trim()) return [];
    const query = schoolQuery.toLowerCase().trim();
    return SCHOOLS_LIST.filter((school) =>
      school.toLowerCase().includes(query)
    ).slice(0, 8); // Limit to 8 suggestions
  }, [schoolQuery]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        schoolDropdownRef.current &&
        !schoolDropdownRef.current.contains(event.target as Node) &&
        schoolInputRef.current &&
        !schoolInputRef.current.contains(event.target as Node)
      ) {
        setShowSchoolSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle school selection
  const handleSchoolSelect = useCallback((school: string) => {
    setValue("schoolName", school);
    setSchoolQuery(school);
    setShowSchoolSuggestions(false);
    setSelectedSchoolIndex(-1);
  }, [setValue]);

  // Handle keyboard navigation for school suggestions
  const handleSchoolKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSchoolSuggestions || filteredSchools.length === 0) return;
    
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedSchoolIndex((prev) => 
        prev < filteredSchools.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedSchoolIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && selectedSchoolIndex >= 0) {
      e.preventDefault();
      handleSchoolSelect(filteredSchools[selectedSchoolIndex]);
    } else if (e.key === "Escape") {
      setShowSchoolSuggestions(false);
    }
  }, [showSchoolSuggestions, filteredSchools, selectedSchoolIndex, handleSchoolSelect]);

  useEffect(() => {
    if (usernameValue && usernameValue.length >= 3) {
      setValue("email", `${usernameValue}@handbook.local`);
    }
  }, [usernameValue, setValue]);

  // Sync schoolQuery with form value
  useEffect(() => {
    if (schoolValue !== schoolQuery) {
      setSchoolQuery(schoolValue || "");
    }
  }, [schoolValue]);

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        navigate("/auth/sign-in");
      }, REDIRECT_DELAY_MS);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate]);

  const onSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        const { passwordConfirm, termsAccepted, ...submitData } = data;
        const response = await signUp(submitData).unwrap();

        if (isApiResponseSuccess(response)) {
          setIsSuccess(true);
        } else {
          const errorMessage = getApiErrorMessage(response);
          showToast.error(
            t("auth.signUp.errorTitle") || "Đăng ký thất bại",
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
          t("auth.signUp.errorTitle") || "Đăng ký thất bại",
          errorMessage
        );
      }
    },
    [signUp, t]
  );

  const getStrengthColor = useCallback((index: number, length: number) => {
    const threshold = PASSWORD_STRENGTH_THRESHOLDS[index];
    if (threshold === undefined) return "bg-gray-200";
    return length >= threshold
      ? "bg-green-500"
      : index === 0
        ? "bg-red-500"
        : "bg-gray-200";
  }, []);

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        // [Responsive Fix] Padding nhỏ hơn cho mobile
        className="w-full max-w-lg mx-auto bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_black] sm:shadow-[8px_8px_0px_black] p-5 sm:p-10 text-center px-4 sm:px-10"
      >
        <div className="mb-6 flex justify-center">
          <CheckCircle2 className="w-20 h-20 sm:w-24 sm:h-24 text-green-500 drop-shadow-[2px_2px_0px_black]" />
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-black uppercase mb-4">
          <AnimatedText>
            {t("auth.signUp.successTitle") || "Đăng ký thành công!"}
          </AnimatedText>
        </h3>
        <p className="text-sm sm:text-base font-medium text-slate-600 mb-6">
          <AnimatedText>
            {t("auth.signUp.successMessage") ||
              "Tài khoản của bạn đã được tạo. Vui lòng đăng nhập để tiếp tục."}
          </AnimatedText>
        </p>
        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden border border-black">
          <motion.div
            className="h-full bg-blue-500"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, ease: "linear" }}
          />
        </div>
        <p className="text-xs font-bold text-slate-400 mt-2">
          Đang chuyển hướng...
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      // [Responsive Fix] Margin ngang an toàn
      className="w-full max-w-lg mx-auto px-4 sm:px-0 pb-10"
    >
      {/* Form Container */}
      {/* [Responsive Fix] p-4 trên mobile (rất quan trọng để tiết kiệm diện tích) */}
      <div className="bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_black] sm:shadow-[8px_8px_0px_black] p-4 sm:p-10 relative overflow-hidden transition-all duration-300">
        <div className="absolute top-0 left-0 w-full h-2 bg-blue-400 border-b-2 border-black" />

        {/* [Responsive Fix] Giảm margin bottom */}
        <div className="mb-5 sm:mb-8 text-center mt-2">
          <h1 className="text-2xl sm:text-3xl font-black text-black uppercase tracking-tight mb-1 sm:mb-2">
            <AnimatedText>{t("auth.signUp.title") || "Đăng ký"}</AnimatedText>
          </h1>
          <p className="text-[11px] sm:text-sm font-bold text-slate-500 px-2">
            <AnimatedText>
              {t("auth.signUp.subtitle") ||
                "Tham gia cộng đồng học tập và phát triển"}
            </AnimatedText>
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 sm:space-y-5" // [Responsive Fix] Giảm khoảng cách giữa các field (space-y-3)
          noValidate
        >
          {/* Name Field */}
          <div className="space-y-1.5">
            <label
              className="text-xs sm:text-sm font-bold text-slate-700"
              htmlFor="signup-name"
            >
              {t("auth.signUp.name") || "Họ và Tên"}
            </label>
            <div
              className={`relative rounded-lg border-2 bg-white transition-all duration-200 ease-out will-change-transform ${errors.name ? "border-red-500 focus-within:shadow-[3px_3px_0px_#ef4444]" : "border-black focus-within:shadow-[3px_3px_0px_black] focus-within:-translate-y-0.5 focus-within:-translate-x-0.5"}`}
            >
              <input
                id="signup-name"
                type="text"
                placeholder={t("auth.signUp.namePlaceholder") || "Nguyễn Văn A"}
                // [Responsive Fix] h-12 trên mobile, h-14 trên desktop
                className="w-full h-12 sm:h-14 px-4 sm:px-5 bg-transparent border-none outline-none text-black font-medium placeholder:text-slate-400 text-sm sm:text-base"
                disabled={isLoading}
                {...register("name")}
              />
            </div>
            {errors.name && (
              <p className="text-[10px] sm:text-xs font-bold text-red-500 mt-1 animate-pulse">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* School and Class Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {/* School Field with Autocomplete */}
            <div className="space-y-1.5 sm:col-span-2 relative">
              <label
                className="text-xs sm:text-sm font-bold text-slate-700"
                htmlFor="signup-school"
              >
                {t("auth.signUp.school") || "Trường"}
              </label>
              <div
                className={`relative rounded-lg border-2 bg-white transition-all duration-200 ease-out will-change-transform ${errors.schoolName ? "border-red-500 focus-within:shadow-[3px_3px_0px_#ef4444]" : "border-black focus-within:shadow-[3px_3px_0px_black] focus-within:-translate-y-0.5 focus-within:-translate-x-0.5"}`}
              >
                <School className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                <input
                  ref={schoolInputRef}
                  id="signup-school"
                  type="text"
                  placeholder={
                    t("auth.signUp.schoolPlaceholder") || "Nhập tên trường..."
                  }
                  className="w-full h-12 sm:h-14 pl-10 sm:pl-12 pr-4 sm:pr-5 bg-transparent border-none outline-none text-black font-medium placeholder:text-slate-400 text-sm sm:text-base"
                  disabled={isLoading}
                  autoComplete="off"
                  value={schoolQuery}
                  onChange={(e) => {
                    setSchoolQuery(e.target.value);
                    setValue("schoolName", e.target.value);
                    setShowSchoolSuggestions(true);
                    setSelectedSchoolIndex(-1);
                  }}
                  onFocus={() => {
                    if (schoolQuery.trim()) {
                      setShowSchoolSuggestions(true);
                    }
                  }}
                  onKeyDown={handleSchoolKeyDown}
                />
              </div>
              
              {/* School Suggestions Dropdown */}
              <AnimatePresence>
                {showSchoolSuggestions && filteredSchools.length > 0 && (
                  <motion.div
                    ref={schoolDropdownRef}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute z-50 w-full mt-1 bg-white border-2 border-black rounded-lg shadow-[4px_4px_0px_black] overflow-hidden max-h-[200px] sm:max-h-[240px] overflow-y-auto"
                  >
                    {filteredSchools.map((school, index) => (
                      <button
                        key={school}
                        type="button"
                        onClick={() => handleSchoolSelect(school)}
                        className={cn(
                          "w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium transition-colors border-b border-slate-100 last:border-b-0 flex items-center gap-2",
                          selectedSchoolIndex === index
                            ? "bg-blue-100 text-blue-700"
                            : "hover:bg-slate-50 text-slate-700"
                        )}
                      >
                        <School className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 flex-shrink-0" />
                        <span className="truncate">{school}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              
              {errors.schoolName && (
                <p className="text-[10px] sm:text-xs font-bold text-red-500 mt-1 animate-pulse">
                  {errors.schoolName.message}
                </p>
              )}
            </div>

            {/* Class Field */}
            <div className="space-y-1.5 sm:col-span-1">
              <label
                className="text-xs sm:text-sm font-bold text-slate-700"
                htmlFor="signup-class"
              >
                {t("auth.signUp.class") || "Lớp"}
              </label>
              <div
                className={`relative rounded-lg border-2 bg-white transition-all duration-200 ease-out will-change-transform ${errors.className ? "border-red-500 focus-within:shadow-[3px_3px_0px_#ef4444]" : "border-black focus-within:shadow-[3px_3px_0px_black] focus-within:-translate-y-0.5 focus-within:-translate-x-0.5"}`}
              >
                <input
                  id="signup-class"
                  type="text"
                  placeholder={t("auth.signUp.classPlaceholder") || "12A1"}
                  className="w-full h-12 sm:h-14 px-4 sm:px-5 bg-transparent border-none outline-none text-black font-medium placeholder:text-slate-400 text-sm sm:text-base"
                  disabled={isLoading}
                  {...register("className")}
                />
              </div>
              {errors.className && (
                <p className="text-[10px] sm:text-xs font-bold text-red-500 mt-1 animate-pulse">
                  {errors.className.message}
                </p>
              )}
            </div>
          </div>

          {/* Username Field */}
          <div className="space-y-1.5">
            <label
              className="text-xs sm:text-sm font-bold text-slate-700"
              htmlFor="signup-username"
            >
              {t("auth.signUp.username") || "Tên đăng nhập"}
            </label>
            <div
              className={`relative rounded-lg border-2 bg-white transition-all duration-200 ease-out will-change-transform ${errors.username ? "border-red-500 focus-within:shadow-[3px_3px_0px_#ef4444]" : "border-black focus-within:shadow-[3px_3px_0px_black] focus-within:-translate-y-0.5 focus-within:-translate-x-0.5"}`}
            >
              <input
                id="signup-username"
                type="text"
                placeholder={t("auth.signUp.usernamePlaceholder") || "john_doe"}
                className="w-full h-12 sm:h-14 px-4 sm:px-5 bg-transparent border-none outline-none text-black font-medium placeholder:text-slate-400 text-sm sm:text-base"
                disabled={isLoading}
                {...register("username")}
              />
            </div>
            {errors.username && (
              <p className="text-[10px] sm:text-xs font-bold text-red-500 mt-1 animate-pulse">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <label
              className="text-xs sm:text-sm font-bold text-slate-700"
              htmlFor="signup-password"
            >
              {t("auth.signUp.password") || "Mật khẩu"}
            </label>
            <div
              className={`relative group rounded-lg border-2 bg-white transition-all duration-200 ease-out will-change-transform ${errors.password ? "border-red-500 focus-within:shadow-[3px_3px_0px_#ef4444]" : "border-black focus-within:shadow-[3px_3px_0px_black] focus-within:-translate-y-0.5 focus-within:-translate-x-0.5"}`}
            >
              <input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                placeholder={t("auth.signUp.passwordPlaceholder") || "6+ ký tự"}
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

            <AnimatePresence>
              {passwordValue &&
                passwordValue.length > 0 &&
                !errors.password && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex gap-1 h-1.5 mt-2"
                  >
                    {PASSWORD_STRENGTH_THRESHOLDS.map((_, index) => (
                      <div
                        key={index}
                        className={cn(
                          "h-full w-1/4 rounded-full border border-black/10 transition-colors duration-300",
                          getStrengthColor(index, passwordValue.length)
                        )}
                      />
                    ))}
                  </motion.div>
                )}
            </AnimatePresence>

            {errors.password && (
              <p className="text-[10px] sm:text-xs font-bold text-red-500 mt-1 animate-pulse">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-1.5">
            <label
              className="text-xs sm:text-sm font-bold text-slate-700"
              htmlFor="signup-password-confirm"
            >
              {t("auth.signUp.confirmPassword") || "Xác nhận"}
            </label>
            <div
              className={`relative group rounded-lg border-2 bg-white transition-all duration-200 ease-out will-change-transform ${errors.passwordConfirm ? "border-red-500 focus-within:shadow-[3px_3px_0px_#ef4444]" : "border-black focus-within:shadow-[3px_3px_0px_black] focus-within:-translate-y-0.5 focus-within:-translate-x-0.5"}`}
            >
              <input
                id="signup-password-confirm"
                type={showPasswordConfirm ? "text" : "password"}
                placeholder={
                  t("auth.signUp.confirmPasswordPlaceholder") || "Nhập lại"
                }
                className="w-full h-12 sm:h-14 px-4 sm:px-5 pr-14 bg-transparent border-none outline-none text-black font-medium placeholder:text-slate-400 text-sm sm:text-base"
                disabled={isLoading}
                {...register("passwordConfirm")}
              />
              <button
                type="button"
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-black font-bold text-[10px] sm:text-xs uppercase p-1"
                tabIndex={-1}
              >
                {showPasswordConfirm ? "Ẩn" : "Hiện"}
              </button>
            </div>
            {errors.passwordConfirm && (
              <p className="text-[10px] sm:text-xs font-bold text-red-500 mt-1 animate-pulse">
                {errors.passwordConfirm.message}
              </p>
            )}
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start gap-3 pt-2">
            <div className="relative flex items-center h-5 w-5 mt-0.5 shrink-0">
              <input
                id="terms"
                type="checkbox"
                className="peer h-5 w-5 appearance-none opacity-0 absolute z-10 cursor-pointer"
                {...register("termsAccepted")}
                disabled={isLoading}
              />
              <div
                className={cn(
                  "pointer-events-none absolute left-0 top-0 h-5 w-5 rounded border-2 border-black transition-all duration-200 ease-in-out flex items-center justify-center",
                  termsAccepted
                    ? "bg-blue-600 shadow-none translate-y-[2px] translate-x-[2px]"
                    : "bg-white shadow-[2px_2px_0px_black]"
                )}
              >
                <Check
                  size={14}
                  strokeWidth={4}
                  className={cn(
                    "text-white transition-opacity duration-200",
                    termsAccepted ? "opacity-100" : "opacity-0"
                  )}
                />
              </div>
            </div>

            <div className="text-[11px] sm:text-sm">
              <label
                htmlFor="terms"
                className="font-medium text-slate-700 cursor-pointer select-none"
              >
                {t("auth.signUp.agreeTo") || "Tôi đồng ý với "}
                <Link
                  to="/terms"
                  className="font-bold text-black hover:text-blue-600 hover:underline decoration-2 underline-offset-2"
                >
                  {t("auth.signUp.terms") || "Điều khoản"}
                </Link>
                {" & "}
                <Link
                  to="/privacy"
                  className="font-bold text-black hover:text-blue-600 hover:underline decoration-2 underline-offset-2"
                >
                  {t("auth.signUp.privacy") || "Chính sách"}
                </Link>
              </label>
              {errors.termsAccepted && (
                <div className="flex items-center gap-1.5 mt-1 text-red-500 animate-pulse">
                  <AlertCircle size={14} />
                  <span className="text-[10px] sm:text-xs font-bold">
                    {errors.termsAccepted.message}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            // [Responsive Fix] h-12 cho mobile
            className="w-full h-12 sm:h-14 mt-4 sm:mt-6 bg-blue-600 text-white font-black text-base sm:text-lg uppercase rounded-lg border-2 border-black shadow-[3px_3px_0px_black] sm:shadow-[4px_4px_0px_black] transition-all hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[5px_5px_0px_black] sm:hover:shadow-[6px_6px_0px_black] hover:bg-blue-700 active:translate-y-1 active:translate-x-1 active:shadow-none disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                {t("auth.signUp.submitting") || "Đang xử lý..."}
              </>
            ) : (
              <>
                {t("auth.signUp.submit") || "Đăng ký"}
                <ArrowRight size={20} strokeWidth={3} />
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-4 sm:mt-8 text-center pt-4 sm:pt-6 border-t-2 border-dashed border-slate-200">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-2">
            <span className="text-xs sm:text-base font-bold text-slate-600">
              {t("auth.signUp.haveAccount") || "Đã có tài khoản?"}
            </span>

            <Link
              to="/auth/sign-in"
              className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-yellow-400 text-black font-black text-[10px] sm:text-sm uppercase rounded-lg border-2 border-black shadow-[3px_3px_0px_black] transition-all hover:-translate-y-[1.5px] hover:-translate-x-[1.5px] hover:shadow-[4.5px_4.5px_0px_black] hover:bg-yellow-300 active:translate-y-[3px] active:translate-x-[3px] active:shadow-none"
            >
              {t("auth.signUp.signInLink") || "Đăng nhập"}
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
