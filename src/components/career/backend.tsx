import Section from "@/components/shared/ui/section";
import CareerReferences from "@/components/career/career-references";
import CareerSteps from "@/components/career/career-steps";
import { backend, referencesFor } from "@/data/career-sections";

export default function Backend() {
  return (
    <Section id={backend.id} label={backend.label}>
      <CareerSteps steps={backend.steps} />
      <CareerReferences references={referencesFor("backend")} />
    </Section>
  );
}
