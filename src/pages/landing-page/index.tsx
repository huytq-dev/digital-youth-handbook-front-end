import { LandingHeader } from "@/features/landing-page/components/landing-header";
import { LandingHero } from "@/features/landing-page/components/landing-hero";
import { LandingPromotions, QuoteSection } from "@/features/landing-page/components/landing-promotions";
import { LandingUSP } from "@/features/landing-page/components/landing-usp";
import { LandingFooter } from "@/features/landing-page/components/landing-footer";
// import { LandingAbout } from "@/features/landing-page/components/landing-about";

export default function App() {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))] font-sans antialiased selection:bg-[hsl(var(--accent))] selection:text-white">
      <LandingHeader />

      <main>
        <LandingHero />
        <LandingUSP />
        <LandingPromotions />
        <QuoteSection />
        {/* <LandingAbout /> */}
      </main>

      <LandingFooter />
    </div>
  );
}
