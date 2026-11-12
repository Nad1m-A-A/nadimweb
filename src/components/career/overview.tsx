import Section from "@/components/shared/ui/section";
import CareerMetrics from "@/components/career/career-metrics";
import CareerReferences from "@/components/career/career-references";
import FadeIn from "@/components/shared/ui/fade-in";
import { overview, referencesFor } from "@/data/career-sections";

export default function Overview() {
  return (
    <Section id={overview.id} label={overview.label} divided={false}>
      <FadeIn delay={0.3}>
        <p className="text_body text-justify text-muted">{overview.body}</p>
      </FadeIn>
      <CareerMetrics metrics={overview.metrics} />
      <CareerReferences references={referencesFor("overview")} />
    </Section>
  );
}
