"use client";

import { useState, useEffect } from "react";
import SplashScreen from "./components/SplashScreen";
import OnboardingSlider from "./components/OnboardingSlider";

export default function MobileOnboardingPage() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Tampilkan splash screen selama 2.5 detik
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return <OnboardingSlider />;
}