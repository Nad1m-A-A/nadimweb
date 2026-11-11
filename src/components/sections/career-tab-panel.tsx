import FadeIn from "@/components/ui/fade-in";
import CareerMetrics from "@/components/sections/career-metrics";
import CareerReferences from "@/components/sections/career-references";
import CareerStackList from "@/components/sections/career-stack-list";
import CareerSteps from "@/components/sections/career-steps";
import SectionTitle from "@/components/ui/section-title";
import type { CareerTab } from "@/data/career-tabs";
import { projects, type ProjectFeature } from "@/data/projects";

type CareerTabPanelProps = {
  tab: CareerTab;
};

export default function CareerTabPanel({ tab }: CareerTabPanelProps) {
  const tabProjects = projects.filter((project) =>
    project.features.includes(tab.id as ProjectFeature),
  );

  return (
    <>
      <SectionTitle>{tab.label}</SectionTitle>

      {tab.body && (
        <FadeIn delay={0.3}>
          <p className="text-lg leading-8 text-muted sm:leading-9">
            {tab.body}
          </p>
        </FadeIn>
      )}

      {tab.metrics && <CareerMetrics metrics={tab.metrics} />}

      {tab.steps &&
        (tab.layout === "chips" ? (
          <CareerStackList items={tab.steps} />
        ) : (
          <CareerSteps steps={tab.steps} />
        ))}

      {tabProjects.length > 0 && <CareerReferences references={tabProjects} />}
    </>
  );
}
