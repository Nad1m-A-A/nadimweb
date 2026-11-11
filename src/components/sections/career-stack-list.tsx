import FadeIn from "@/components/ui/fade-in";
import type { CareerStep } from "@/data/career-tabs";

type CareerStackListProps = {
  items: CareerStep[];
};

export default function CareerStackList({ items }: CareerStackListProps) {
  return (
    <dl className="divide-y divide-border">
      {items.map((group, index) => (
        <FadeIn
          key={group.label}
          delay={0.3 + Math.min(index, 4) * 0.05}
          className="grid gap-3 py-4 sm:grid-cols-[8rem_1fr] sm:gap-6"
        >
          <dt className="pt-1 text-sm tracking-wide text-muted uppercase">
            {group.label}
          </dt>
          <dd className="flex flex-wrap gap-2">
            {group.text.split(", ").map((name) => (
              <span
                key={name}
                className="rounded-[2px] border border-border px-3 py-1.5 text-base text-foreground transition-colors duration-300 ease-calm hover:border-accent/40"
              >
                {name}
              </span>
            ))}
          </dd>
        </FadeIn>
      ))}
    </dl>
  );
}
