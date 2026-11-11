import FadeIn from "@/components/ui/fade-in";
import type { CareerMetric } from "@/data/career-tabs";

type CareerMetricsProps = {
  metrics: CareerMetric[];
};

export default function CareerMetrics({ metrics }: CareerMetricsProps) {
  return (
    <dl className="grid grid-cols-2 gap-y-8 sm:grid-cols-4">
      {metrics.map((metric, index) => (
        <FadeIn
          key={metric.label}
          delay={0.3 + index * 0.06}
          className="border-l border-border pl-4"
        >
          <dd className="font-num text-3xl tracking-tight tabular-nums text-accent sm:text-4xl">
            {metric.value}
          </dd>
          <dt className="mt-1 text-base text-muted">{metric.label}</dt>
        </FadeIn>
      ))}
    </dl>
  );
}
