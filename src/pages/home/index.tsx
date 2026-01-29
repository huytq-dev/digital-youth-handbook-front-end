import { lazy, Suspense } from "react";
import { cn } from "@/lib/utils";
import { UnifiedHeader } from "@/components/layout/unified-header";
import { LandingHero } from "@/features/landing-page/components/landing-hero";

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

const LandingPromotions = lazy(() =>
  import("@/features/landing-page/components/landing-promotions").then(
    (module) => ({ default: module.LandingPromotions })
  )
);

const LandingQuote = lazy(() =>
  import("@/features/landing-page/components/landing-quote").then(
    (module) => ({ default: module.LandingQuote })
  )
);

const LandingFooter = lazy(() =>
  import("@/features/landing-page/components/landing-footer").then(
    (module) => ({ default: module.LandingFooter })
  )
);

const ComponentLoader = () => (
  <div className="flex min-h-[300px] w-full items-center justify-center bg-gray-50/50">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-[hsl(var(--primary))] border-t-transparent" />
  </div>
);

function HomePage() {
  return (
    <div
      className={cn(
        "flex min-h-screen flex-col",
        "bg-[hsl(var(--background))] text-[hsl(var(--foreground))]",
        "font-sans antialiased selection:bg-[hsl(var(--accent))] selection:text-white"
      )}
    >
      <UnifiedHeader />

      <main className="w-full flex-1" role="main">
        <LandingHero />

        <Suspense fallback={<ComponentLoader />}>
          <LandingIntroduction />
          <LandingUSP />
          <LandingPromotions />
          <LandingQuote />
        </Suspense>
      </main>

      <LandingFooter />
    </div>
  );
}

export default HomePage;


