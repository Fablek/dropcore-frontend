import { Metadata } from "next";
import { Pricing } from "@/components/landing/pricing";
import { title } from "@/components/primitives";

export const metadata: Metadata = {
  title: "Pricing – Dropcore",
  description: "Simple plans for every use case – free, pro, and self-hosted.",
};

export default function PricingPage() {
  return (
    <section className="px-4 max-w-6xl mx-auto space-y-10">
      <div className="text-center">
        <h1 className={title()}>Pricing</h1>
        <p className="text-muted-foreground text-lg mt-2 max-w-xl mx-auto">
          Whether you're an individual, a power user, or a self-hosting pro —
          we’ve got a plan for you.
        </p>
      </div>

      <Pricing />
    </section>
  );
}
