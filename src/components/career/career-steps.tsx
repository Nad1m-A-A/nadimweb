import FadeIn from "@/components/shared/ui/fade-in";
import type { CareerStepsProps } from "@/types/career";

export default function CareerSteps({ steps }: CareerStepsProps) {
  return (
    <ol className="divide-y divide-border">
      {steps.map((step, index) => (
        <li key={step.label} className="py-6 first:pt-0">
          <FadeIn
            delay={0.3 + Math.min(index, 4) * 0.05}
          >
            <h3 className="flex items-baseline gap-3 text-foreground">
              <span aria-hidden className="font-num tabular-nums text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span aria-hidden className="text-muted/60">
                /
              </span>
              <span>{step.label}</span>
            </h3>
            <p className="mt-2 max-w-2xl text_body text-muted">
              {step.text}
            </p>
          </FadeIn>
        </li>
      ))}
    </ol>
  );
}
