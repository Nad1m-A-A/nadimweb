import HeroSection from "@/components/sections/hero-section";
import { HeroStackVisual } from "@/components/sections/hero-stack-visual";
import AboutSection from "@/components/sections/about-section";
import ProjectsSection from "@/components/sections/projects-section";
import InfoSection from "@/components/sections/info-section";
import { SiteHeader } from "@/components/layout/site-header";

export default function Home() {
  return (
    <>
      <HeroSection />
      <HeroStackVisual />

      <AboutSection />

      <ProjectsSection />

      <InfoSection />
    </>
  );
}
