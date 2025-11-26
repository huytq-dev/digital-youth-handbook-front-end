import { LandingHeader } from "@/features/landing-page/components/landing-header";
import { LandingHero } from "@/features/landing-page/components/landing-hero";
import { LandingPromotions } from "@/features/landing-page/components/landing-promotions";
import { LandingUSP } from "@/features/landing-page/components/landing-usp";
import { LandingFooter } from "@/features/landing-page/components/landing-footer";

export default function App() {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))] font-sans antialiased selection:bg-[hsl(var(--accent))] selection:text-white">
      <LandingHeader />

      <main>
        <LandingHero />
        <LandingPromotions />
        <LandingUSP />
      </main>

      <LandingFooter />
    </div>
  );
}
