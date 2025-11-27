import { AuthLayout } from "@/components/layout/app/auth/auth-layout";
import { AuthGlassCard } from "@/features/auth/components/shared/auth-glass-card";
import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <AuthGlassCard>
        <ForgotPasswordForm />
      </AuthGlassCard>
    </AuthLayout>
  );
}

