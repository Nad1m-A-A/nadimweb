import type { Metadata } from "next";
import { CareerHeader } from "@/components/layout/career-header";
import HeroSection from "@/components/sections/hero-section";
import CareerTabs from "@/components/sections/career-tabs";

export const metadata: Metadata = { title: "Career" };

export default function CareerPage() {
  return (
    <>
      <CareerHeader />
      <HeroSection />
      <CareerTabs />
    </>
  );
}
