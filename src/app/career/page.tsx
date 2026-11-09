import type { Metadata } from "next";
import { ProjectsShowcase } from "@/components/sections/projects-showcase";
import { projects } from "@/data/projects";

export const metadata: Metadata = { title: "Career" };

export default function CareerPage() {
  return (
    <main className="flex w-full flex-1 flex-col">
      <ProjectsShowcase projects={projects} />
    </main>
  );
}
