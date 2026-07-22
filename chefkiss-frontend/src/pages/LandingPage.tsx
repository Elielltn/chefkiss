import LandingHeader from "../components/LandingHeader";
import LandingHero from "../components/LandingHero";
import LandingFeatures from "../components/LandingFeatures";
import LandingCta from "../components/LandingCta";
import LandingFooter from "../components/LandingFooter";

function LandingPage() {
  return (
    <main className="min-h-dvh">
      <LandingHeader />
      <LandingHero />
      <LandingFeatures />
      <LandingCta />
      <LandingFooter />
    </main>
  );
}

export default LandingPage;
