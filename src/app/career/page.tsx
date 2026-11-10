import type { Metadata } from "next";
import HeroSection from "@/components/sections/hero-section";
import CareerTabs from "@/components/sections/career-tabs";

export const metadata: Metadata = { title: "Career" };

export default function CareerPage() {
  return (
    <>
      <HeroSection />
      <CareerTabs />
    </>
  );
}
