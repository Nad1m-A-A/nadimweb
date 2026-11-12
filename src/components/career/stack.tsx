import Section from "@/components/shared/ui/section";
import CareerStackList from "@/components/career/career-stack-list";
import { stack } from "@/data/career-sections";

export default function Stack() {
  return (
    <Section id={stack.id} label={stack.label}>
      <CareerStackList groups={stack.groups} />
    </Section>
  );
}
