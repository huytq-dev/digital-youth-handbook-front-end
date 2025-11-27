import { AuthLayout } from "@/components/layout/app/auth/auth-layout";
import { AuthGlassCard } from "@/features/auth/components/shared/auth-glass-card";
import { SignInForm } from "@/features/auth/components/sign-in-form";

export default function SignInPage() {
  return (
    <AuthLayout>
      <AuthGlassCard>
        <SignInForm />
      </AuthGlassCard>
    </AuthLayout>
  );
}
