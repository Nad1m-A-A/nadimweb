import Hero from "@/components/sections/hero";
import { HeroStackVisual } from "@/components/sections/hero-stack-visual";
import About from "@/components/sections/about";
import Info from "@/components/sections/info";
import CareerProjects from "@/components/sections/career-projects";
import { SiteHeader } from "@/components/layout/site-header";

const navLinks = [
  { id: "about", label: "About" },
  { id: "info", label: "Info" },
];

export default function Home() {
  return (
    <>
      <SiteHeader links={navLinks} contact />
      <Hero />
      <HeroStackVisual />

      <About />

      <Info />

      <CareerProjects />
    </>
  );
}
