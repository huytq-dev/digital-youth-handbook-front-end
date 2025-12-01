import { AuthLayout } from "@/components/layout/app/auth/auth-layout";
import { AuthGlassCard } from "@/features/auth/components/shared/auth-glass-card";
import { VerifyEmailForm } from "@/features/auth/components/verify-email-form";

export default function VerifyEmailPage() {
  return (
    <AuthLayout>
      <AuthGlassCard>
        <VerifyEmailForm />
      </AuthGlassCard>
    </AuthLayout>
  );
}

