"use client";
import LandingCTA from "./_components/landing/LandingCTA";
import LandingEntities from "./_components/landing/LandingEntities";
import LandingFeatures from "./_components/landing/LandingFeatures";
import LandingFooter from "./_components/landing/LandingFooter";
import LandingHero from "./_components/landing/LandingHero";
import LandingNavbar from "./_components/landing/LandingNavbar";
import LandingStats from "./_components/landing/LandingStats";
import FriendlyBackground from "@/components/shared/FriendlyBackground";

const page = () => {
  return (
    <FriendlyBackground>
      <main className="min-h-screen overflow-x-clip">
        <LandingNavbar />
        <LandingHero />
        <LandingEntities />
        <LandingFeatures />
        <LandingStats />
        <LandingCTA />
        <LandingFooter />
      </main>
    </FriendlyBackground>
  );
};

export default page;
