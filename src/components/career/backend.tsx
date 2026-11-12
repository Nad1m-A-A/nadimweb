import Section from "@/components/shared/ui/section";
import References from "@/components/career/references";
import Concerns from "@/components/career/concerns";
import { backend, referencesFor } from "@/data/career";

export default function Backend() {
  return (
    <Section id={backend.id} label={backend.label}>
      <Concerns concerns={backend.concerns} />
      <References references={referencesFor("backend")} />
    </Section>
  );
}
