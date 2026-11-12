import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import HeroSection from "@/components/sections/hero-section";
import CareerSections from "@/components/sections/career-sections";
import StageSection from "@/components/sections/stage-section";
import { careerTabs } from "@/data/career-tabs";

export const metadata: Metadata = { title: "Career" };

const navLinks = [
  ...careerTabs.map((tab) => ({ id: tab.id, label: tab.label })),
  { id: "projects", label: "Projects" },
];

export default function CareerPage() {
  return (
    <>
      <SiteHeader links={navLinks} />
      <HeroSection title="Product Engineer" />
      <CareerSections />
      <StageSection />
    </>
  );
}
