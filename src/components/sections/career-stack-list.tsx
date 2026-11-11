import { Fragment } from "react";
import FadeIn from "@/components/ui/fade-in";
import type { CareerStep } from "@/data/career-tabs";

type CareerStackListProps = {
  items: CareerStep[];
};

export default function CareerStackList({ items }: CareerStackListProps) {
  return (
    <dl className="divide-y divide-border">
      {items.map((group, index) => {
        const names = group.text.split(", ");

        return (
          <FadeIn
            key={group.label}
            delay={0.3 + Math.min(index, 4) * 0.05}
            className="grid items-start gap-3 py-5 sm:grid-cols-[8.5rem_1fr] sm:gap-6"
          >
            <dt className="font-num text-xl leading-tight tracking-tight text-accent sm:text-2xl">
              {group.label}
            </dt>
            <dd className="flex flex-wrap items-baseline gap-x-4 gap-y-2 text-base leading-7 text-foreground sm:gap-x-5 sm:leading-8">
              {names.map((name, nameIndex) => (
                <Fragment key={name}>
                  {nameIndex > 0 ? (
                    <span
                      aria-hidden
                      className="font-serif text-lg leading-none text-muted/70"
                    >
                      /
                    </span>
                  ) : null}
                  <span className="tracking-wide">{name}</span>
                </Fragment>
              ))}
            </dd>
          </FadeIn>
        );
      })}
    </dl>
  );
}
