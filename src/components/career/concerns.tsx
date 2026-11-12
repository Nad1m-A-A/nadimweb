import FadeIn from "@/components/shared/ui/fade-in";
import type { ConcernsProps } from "@/types/career";

export default function Concerns({ concerns }: ConcernsProps) {
  return (
    <ol className="divide-y divide-border">
      {concerns.map((concern, index) => (
        <li key={concern.label} className="py-6 first:pt-0">
          <FadeIn delay={0.3 + Math.min(index, 4) * 0.05}>
            <h3 className="flex items-baseline gap-3 text-foreground">
              <span aria-hidden className="font-num text-accent tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span aria-hidden className="text-muted/60">
                /
              </span>
              <span>{concern.label}</span>
            </h3>
            <p className="mt-2 max-w-2xl text_body text-muted">
              {concern.text}
            </p>
          </FadeIn>
        </li>
      ))}
    </ol>
  );
}
