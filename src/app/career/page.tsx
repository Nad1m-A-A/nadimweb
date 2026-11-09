import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { CareerStack } from "@/components/sections/career-stack";
import { ProjectsShowcase } from "@/components/sections/projects-showcase";
import { projects } from "@/data/projects";

export const metadata: Metadata = { title: "Career" };

/** Dark monochrome palette for this page only; the rest of the site keeps the global tokens. */
const careerTheme = {
  "--background": "#0b0b0a",
  "--foreground": "#eeebe5",
  "--gray": "#8f8c86",
} as CSSProperties;

export default function CareerPage() {
  return (
    <main
      style={careerTheme}
      className="relative isolate flex h-svh w-full flex-col overflow-hidden overscroll-none text-foreground"
    >
      <CareerStack />
      <ProjectsShowcase projects={projects} />
    </main>
  );
}
