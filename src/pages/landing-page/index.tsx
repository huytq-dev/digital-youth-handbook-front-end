import { lazy, Suspense } from "react";
import { cn } from "@/lib/utils";

// 1. [OPTIMIZATION] Import trực tiếp các component quan trọng (Above the fold)
// Giúp hiển thị ngay lập tức, tránh loading spinner ở màn hình đầu tiên.
import { LandingHeader } from "@/features/landing-page/components/landing-header";
import { LandingHero } from "@/features/landing-page/components/landing-hero";

// 2. [OPTIMIZATION] Lazy load các component nằm bên dưới (Below the fold)
// Sử dụng named export pattern như code cũ của bạn
const LandingIntroduction = lazy(() =>
  import("@/features/landing-page/components/landing-introduction").then(
    (module) => ({ default: module.LandingIntroduction })
  )
);

const LandingUSP = lazy(() =>
  import("@/features/landing-page/components/landing-usp").then((module) => ({
    default: module.LandingUSP,
  }))
);

const LandingQuote = lazy(() =>
  import("@/features/landing-page/components/landing-quote").then((module) => ({
    default: module.LandingQuote,
  }))
);

const LandingPromotions = lazy(() =>
  import("@/features/landing-page/components/landing-promotions").then(
    (module) => ({ default: module.LandingPromotions })
  )
);

const LandingFooter = lazy(() =>
  import("@/features/landing-page/components/landing-footer").then(
    (module) => ({ default: module.LandingFooter })
  )
);

// Loader Component gọn nhẹ hơn
const ComponentLoader = () => (
  <div className="flex min-h-[300px] w-full items-center justify-center bg-gray-50/50">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-[hsl(var(--primary))] border-t-transparent" />
  </div>
);

function LandingPage() {
  return (
    <div
      className={cn(
        "min-h-screen flex flex-col",
        "bg-[hsl(var(--background))] text-[hsl(var(--foreground))]",
        "font-sans antialiased selection:bg-[hsl(var(--accent))] selection:text-white"
      )}
    >
      <LandingHeader />

      <main className="w-full flex-1" role="main">
        <LandingHero />

        <Suspense fallback={<ComponentLoader />}>
          <LandingIntroduction />

          <LandingUSP />

          <LandingPromotions />
          <LandingQuote />
        </Suspense>
      </main>

      <Suspense fallback={<div className="h-20 bg-white" />}>
        <LandingFooter />
      </Suspense>
    </div>
  );
}

export default LandingPage;
