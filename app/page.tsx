import { HeroHome } from "@/components/landing/hero";
import { Pricing } from "@/components/landing/pricing";
import { WhySection } from "@/components/landing/why-section";
import { ComparisonSection } from "@/components/landing/comparison-section";
import { Faq } from "@/components/landing/faq";
import { TestimonialsSlider } from "@/components/landing/testimonials-slider";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <HeroHome />
      <WhySection />
      <ComparisonSection />
      <Pricing />
      <TestimonialsSlider />
      <Faq />
    </section>
  );
}
