"use client";

import type { ReactNode } from "react";
import { HeroPerspectiveGrid } from "@/components/sections/hero-perspective-grid";
import { SpecialtyRotator } from "@/components/sections/specialty-rotator";
import FadeIn from "@/components/ui/fade-in";

type HeroSectionProps = {
  title?: string;
  background?: ReactNode;
};

export default function HeroSection({
  title = "Fullstack Web Developer",
  background = <HeroPerspectiveGrid />,
}: HeroSectionProps) {
  return (
    <section id="intro" className="border-b border-border bg-background">
      <div className="relative flex min-h-[61.5vh] flex-1 flex-col items-center justify-center gap-4 overflow-hidden text-center font-thin">
        {background}
        <FadeIn duration={0.8} delay={0.12} trigger="mount">
          <h1 className="relative z-10 font-medium text-[clamp(2.25rem,5vw,3.75rem)]">
            {title}
          </h1>
        </FadeIn>
        <div className="relative z-10 flex flex-col items-start justify-center gap-2 whitespace-nowrap md:flex-row">
          <FadeIn duration={0.8} delay={0.2} trigger="mount">
            <p className="shrink-0 text-xl">Specialized in</p>
          </FadeIn>
          <FadeIn duration={0.8} delay={0.2} trigger="mount">
            <SpecialtyRotator />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
