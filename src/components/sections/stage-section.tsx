import FadeIn from "@/components/ui/fade-in";
import SectionTitle from "@/components/ui/section-title";
import StageCard from "@/components/ui/stage-card";
import { projects } from "@/data/projects";
import { stageImages } from "@/data/stage";

export default function StageSection() {
  return (
    <section id="projects" className="section inner-section">
      <div className="app_container">
        <SectionTitle>Projects</SectionTitle>

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
                caption={project.summary ?? project.highlights?.[0]}
                image={stageImages[project.name]}
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
