import Section from "@/components/shared/ui/section";
import Concerns from "@/components/career/concerns";
import { devops } from "@/data/career";

export default function Devops() {
  return (
    <Section id={devops.id} label={devops.label}>
      <Concerns concerns={devops.concerns} />
    </Section>
  );
}
