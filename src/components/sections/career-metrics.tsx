import FadeIn from "@/components/ui/fade-in";
import type { CareerMetric } from "@/data/career-tabs";

type CareerMetricsProps = {
  metrics: CareerMetric[];
};

export default function CareerMetrics({ metrics }: CareerMetricsProps) {
  return (
    <dl className="flex flex-wrap justify-between gap-y-8">
      {metrics.map((metric, index) => (
        <FadeIn
          key={metric.label}
          delay={0.3 + index * 0.06}
          className="w-1/2 px-2 sm:w-auto"
        >
          <dd className="font-num text-numeral tracking-tight tabular-nums text-foreground">
            {metric.value}
          </dd>
          <dt className="mt-1 text-label text-muted">{metric.label}</dt>
        </FadeIn>
      ))}
    </dl>
  );
}
