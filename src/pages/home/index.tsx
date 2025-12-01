import { lazy, Suspense } from "react";
import { cn } from "@/lib/utils";
import { HomeHeader } from "@/features/home/components/home-header";
import { HomeHero } from "@/features/home/components/home-hero";

const HomeIntroduction = lazy(() =>
  import("@/features/home/components/home-introduction").then((module) => ({
    default: module.HomeIntroduction,
  }))
);

const HomeUSP = lazy(() =>
  import("@/features/home/components/home-usp").then((module) => ({
    default: module.HomeUSP,
  }))
);

const HomePromotions = lazy(() =>
  import("@/features/home/components/home-promotions").then((module) => ({
    default: module.HomePromotions,
  }))
);

const HomeQuote = lazy(() =>
  import("@/features/home/components/home-quote").then((module) => ({
    default: module.HomeQuote,
  }))
);

const HomeFooter = lazy(() =>
  import("@/features/home/components/home-footer").then((module) => ({
    default: module.HomeFooter,
  }))
);

const ComponentLoader = () => (
  <div className="flex min-h-[260px] w-full items-center justify-center bg-gray-50/50">
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
      <HomeHeader />

      <main className="w-full flex-1" role="main">
        <HomeHero />

        <Suspense fallback={<ComponentLoader />}>
          <HomeIntroduction />
          <HomeUSP />
          <HomePromotions />
          <HomeQuote />
        </Suspense>
      </main>

      <Suspense fallback={<div className="h-16 bg-white" />}>
        <HomeFooter />
      </Suspense>
    </div>
  );
}

export default HomePage;


