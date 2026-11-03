import type { Metadata } from "next";
import { ProjectsCarousel } from "@/components/sections/projects-carousel";
import type { Project } from "@/components/sections/project-card";

export const metadata: Metadata = { title: "Career" };

// Placeholder data until Nadim provides the real projects.
const projects: Project[] = Array.from({ length: 5 }, (_, i) => ({
  title: `Project ${i + 1}`,
  description: "Short description of the project.",
  image: `/projects/placeholder-${i + 1}.svg`,
  href: "#",
}));

export default function CareerPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 py-16">
      <ProjectsCarousel projects={projects} />
    </main>
  );
}
