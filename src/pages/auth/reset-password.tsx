import { AuthLayout } from "@/components/layout/app/auth/auth-layout";
import { AuthGlassCard } from "@/features/auth/components/shared/auth-glass-card";
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";

export default function ResetPasswordPage() {
  return (
    <AuthLayout>
      <AuthGlassCard>
        <ResetPasswordForm />
      </AuthGlassCard>
    </AuthLayout>
  );
}


