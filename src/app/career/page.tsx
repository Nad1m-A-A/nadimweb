import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import Hero from "@/components/sections/hero";
import Careers from "@/components/sections/careers";
import CareerProjects from "@/components/sections/career-projects";
import { careerTabs } from "@/data/career-tabs";

export const metadata: Metadata = { title: "Career" };

const navLinks = [
  ...careerTabs.map((tab) => ({ id: tab.id, label: tab.label })),
  { id: "projects", label: "Projects" },
];

export default function CareerPage() {
  return (
    <>
      <SiteHeader links={navLinks} social />
      <Hero title="Product Engineer" />
      <Careers />
      <CareerProjects />
    </>
  );
}
