import FadeIn from "@/components/shared/ui/fade-in";
import Section from "@/components/shared/ui/section";
import StageCard from "@/components/shared/ui/stage-card";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <Section id="projects" label="Projects">
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2">
        {projects.map((project, index) => (
          <FadeIn
            key={project.name}
            className="h-full"
            delay={0.1 + (index % 2) * 0.08}
          >
            <StageCard
              name={project.name}
              href={project.url}
              caption={project.summary}
              image={project.image}
            />
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
