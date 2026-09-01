import HeroSection from "@/app/landing-page/components/HeroSection";
import FeaturesSection from "@/app/landing-page/components/FeaturesSection";
import AboutSection from "@/app/landing-page/components/AboutSection";
import LeaderboardSection from "@/app/landing-page/components/LeaderboardSection";
import NewsSection from "@/app/landing-page/components/NewsSection";

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <LeaderboardSection />
      <NewsSection />
    </>
  );
}