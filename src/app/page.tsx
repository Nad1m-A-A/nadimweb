import HeroSection from "@/components/sections/hero-section";
import { HeroStackVisual } from "@/components/sections/hero-stack-visual";
import AboutSection from "@/components/sections/about-section";
import ProjectsSection from "@/components/sections/projects-section";
import InfoSection from "@/components/sections/info-section";
import StageSection from "@/components/sections/stage-section";
import { SiteHeader } from "@/components/layout/site-header";

const navLinks = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "info", label: "Info" },
];

export default function Home() {
  return (
    <>
      <SiteHeader links={navLinks} contact />
      <HeroSection />
      <HeroStackVisual />

      <AboutSection />

      <ProjectsSection />

      <InfoSection />

      <StageSection />
    </>
  );
}
