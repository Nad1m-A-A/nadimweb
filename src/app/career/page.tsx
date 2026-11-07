import type { Metadata } from "next";
import { ProjectsCarousel } from "@/components/sections/projects-carousel";
import { projects } from "@/data/projects";

export const metadata: Metadata = { title: "Career" };

export default function CareerPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center px-6 py-16">
      <ProjectsCarousel projects={projects} />
    </main>
  );
}
