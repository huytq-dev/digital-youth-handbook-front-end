import { AuthLayout } from "@/components/layout/app/auth/auth-layout";
import { AuthGlassCard } from "@/features/auth/components/shared/auth-glass-card";
import { SignUpForm } from "@/features/auth/components/sign-up-form";

export default function SignUpPage() {
  return (
    <AuthLayout>
      <AuthGlassCard>
        <SignUpForm />
      </AuthGlassCard>
    </AuthLayout>
  );
}


