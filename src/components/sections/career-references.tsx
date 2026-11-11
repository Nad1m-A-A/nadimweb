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
      <ul className="grid grid-cols-3 gap-2">
        {references.map((reference) => (
          <li key={reference.url} className="min-w-0">
            <a
              href={reference.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full items-center justify-center gap-2 rounded-[2px] bg-accent-shift px-3 py-2.5 text-base leading-normal text-white"
            >
              <span className="min-w-0 truncate">{reference.label}</span>
              <LuArrowUpRight
                aria-hidden
                className="size-3.5 shrink-0 transition-transform duration-300 ease-calm group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </li>
        ))}
      </ul>
    </FadeIn>
  );
}
