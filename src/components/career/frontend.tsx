import Section from "@/components/shared/ui/section";
import References from "@/components/career/references";
import Concerns from "@/components/career/concerns";
import { frontend, referencesFor } from "@/data/career";

export default function Frontend() {
  return (
    <Section id={frontend.id} label={frontend.label}>
      <Concerns concerns={frontend.concerns} />
      <References references={referencesFor("frontend")} />
    </Section>
  );
}
