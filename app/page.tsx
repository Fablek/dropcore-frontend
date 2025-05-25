import { HeroHome } from "@/components/landing/hero";
import { Pricing } from "@/components/landing/pricing";
import { WhySection } from "@/components/landing/why-section";
import { ComparisonSection } from "@/components/landing/comparison-section";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <HeroHome />
      <WhySection />
      <ComparisonSection />
      <Pricing />
    </section>
  );
}
