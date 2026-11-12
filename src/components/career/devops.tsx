import Section from "@/components/shared/ui/section";
import CareerSteps from "@/components/career/career-steps";
import { devops } from "@/data/career-sections";

export default function Devops() {
  return (
    <Section id={devops.id} label={devops.label}>
      <CareerSteps steps={devops.steps} />
    </Section>
  );
}
