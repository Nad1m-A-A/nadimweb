import Section from "@/components/shared/ui/section";
import Metrics from "@/components/career/metrics";
import References from "@/components/career/references";
import FadeIn from "@/components/shared/ui/fade-in";
import { overview, referencesFor } from "@/data/career";

export default function Overview() {
  return (
    <Section id={overview.id} label={overview.label} divided={false}>
      <FadeIn delay={0.3}>
        <p className="text_body text-justify text-muted">{overview.body}</p>
      </FadeIn>
      <Metrics metrics={overview.metrics} />
      <References references={referencesFor("overview")} />
    </Section>
  );
}
