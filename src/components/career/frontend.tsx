import Section from "@/components/shared/ui/section";
import CareerReferences from "@/components/career/career-references";
import CareerSteps from "@/components/career/career-steps";
import { frontend, referencesFor } from "@/data/career-sections";

export default function Frontend() {
  return (
    <Section id={frontend.id} label={frontend.label}>
      <CareerSteps steps={frontend.steps} />
      <CareerReferences references={referencesFor("frontend")} />
    </Section>
  );
}
