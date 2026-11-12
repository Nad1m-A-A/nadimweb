import FadeIn from "@/components/shared/ui/fade-in";
import type { MetricsProps } from "@/types/career";

export default function Metrics({ metrics }: MetricsProps) {
  return (
    <dl className="flex flex-wrap justify-between gap-y-8">
      {metrics.map((metric, index) => (
        <FadeIn
          key={metric.label}
          delay={0.3 + index * 0.06}
          className="w-1/2 px-2 text-center sm:w-auto"
        >
          <dd className="font-num text_numeral font-normal tracking-tight text-foreground tabular-nums">
            {metric.value}
          </dd>
          <dt className="mt-1 text_label text-muted">{metric.label}</dt>
        </FadeIn>
      ))}
    </dl>
  );
}
