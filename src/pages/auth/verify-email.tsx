import { AuthLayout } from "@/components/layout/app/auth/auth-layout";
import { VerifyEmailForm } from "@/features/auth/components/verify-email-form";

export default function VerifyEmailPage() {
  return (
    <AuthLayout>
      <VerifyEmailForm />
    </AuthLayout>
  );
}


