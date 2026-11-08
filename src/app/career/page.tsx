import type { Metadata } from "next";
import { ProjectsCarousel } from "@/components/sections/projects-carousel";
import { projects } from "@/data/projects";

export const metadata: Metadata = { title: "Career" };

export default function CareerPage() {
  return (
    <main className="flex w-full flex-1 flex-col">
      <ProjectsCarousel projects={projects} />
    </main>
  );
}
