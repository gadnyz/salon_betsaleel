import HeroSection from "@/components/homepage/HeroSection";
import ProcessSection from "@/components/homepage/ProcessSection";
import ExamplesSection from "@/components/homepage/ExamplesSection";
import PricingSection from "@/components/homepage/PricingSection";

export default function Index() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1">
        <HeroSection />
        <ProcessSection />
        <ExamplesSection />
        <PricingSection />
      </div>
    </div>
  );
}
