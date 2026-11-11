import { LuArrowUpRight } from "react-icons/lu";
import FadeIn from "@/components/ui/fade-in";
import type { CareerReference } from "@/data/career-tabs";

type CareerReferencesProps = {
  references: CareerReference[];
};

export default function CareerReferences({
  references,
}: CareerReferencesProps) {
  return (
    <FadeIn delay={0.3} className="space-y-3">
      <p className="text-base text-muted">Live references</p>
      <ul className="flex flex-wrap gap-2">
        {references.map((reference) => (
          <li key={reference.url}>
            <a
              href={reference.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-[2px] border border-border px-3.5 py-2 text-base text-foreground transition-colors duration-300 ease-calm hover:border-accent/40"
            >
              <span aria-hidden className="size-1.5 rounded-[1px] bg-live" />
              {reference.label}
              <LuArrowUpRight
                aria-hidden
                className="size-3.5 text-accent transition-transform duration-300 ease-calm group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </li>
        ))}
      </ul>
    </FadeIn>
  );
}
