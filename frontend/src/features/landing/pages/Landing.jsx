import HeroSection from "../components/HeroSection";
import VisualShowcase from "../components/VisualShowcase";
import FeaturesOverview from "../components/FeaturesOverview";

export default function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      
      <div className="relative space-y-24 pb-20">
        <HeroSection />
        <VisualShowcase />
        <FeaturesOverview />
      </div>
      
    </div>
  );
}