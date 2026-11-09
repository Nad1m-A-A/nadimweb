import type { Metadata } from "next";
import { CareerStack } from "@/components/sections/career-stack";
import { ProjectsShowcase } from "@/components/sections/projects-showcase";
import { CareerBackdrop } from "@/components/ui/career-backdrop";
import { projects } from "@/data/projects";

export const metadata: Metadata = { title: "Career" };

export default function CareerPage() {
  return (
    <main className="relative isolate flex h-svh w-full flex-col overflow-hidden overscroll-none text-foreground [--background:#0a0c18] [--foreground:#f4ecdf] [--gray:#a8a097]">
      <CareerBackdrop />
      <CareerStack />
      <ProjectsShowcase projects={projects} />
    </main>
  );
}
