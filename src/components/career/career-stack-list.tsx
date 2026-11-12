import { Fragment } from "react";
import FadeIn from "@/components/shared/ui/fade-in";
import type { CareerStackListProps } from "@/types/career";

export default function CareerStackList({ groups }: CareerStackListProps) {
  return (
    <dl className="divide-y divide-border">
      {groups.map((group, index) => {
        return (
          <FadeIn
            key={group.label}
            delay={0.3 + Math.min(index, 4) * 0.05}
            className="grid items-start gap-3 py-5 first:pt-0 sm:grid-cols-[8.5rem_1fr] sm:gap-6"
          >
            <dt className="font-num text_heading tracking-tight text-foreground">
              {group.label}
            </dt>
            <dd className="flex flex-wrap items-baseline gap-x-4 gap-y-2 text_body text-foreground sm:gap-x-5">
              {group.items.map((name, nameIndex) => (
                <Fragment key={name}>
                  {nameIndex > 0 ? (
                    <span
                      aria-hidden
                      className="font-serif text_lead leading-none text-muted/60"
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
