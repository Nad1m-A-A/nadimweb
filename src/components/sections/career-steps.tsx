import FadeIn from "@/components/ui/fade-in";
import type { CareerStep } from "@/data/career-tabs";

type CareerStepsProps = {
  steps: CareerStep[];
};

export default function CareerSteps({ steps }: CareerStepsProps) {
  return (
    <ol className="divide-y divide-border">
      {steps.map((step, index) => (
        <li key={step.label}>
          <FadeIn
            delay={0.3 + Math.min(index, 4) * 0.05}
            className="grid grid-cols-[3rem_1fr] gap-4 py-6 sm:grid-cols-[4rem_1fr] sm:gap-6"
          >
            <span
              aria-hidden
              className="font-num text-3xl leading-none tabular-nums text-black sm:text-4xl"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="text-foreground">
                {step.label}
              </h3>
              <p className="mt-1 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
                {step.text}
              </p>
            </div>
          </FadeIn>
        </li>
      ))}
    </ol>
  );
}
