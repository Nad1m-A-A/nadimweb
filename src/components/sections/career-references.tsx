import { LuArrowUpRight } from "react-icons/lu";
import FadeIn from "@/components/ui/fade-in";
import type { Project } from "@/data/projects";
import { host } from "@/lib/host";

type CareerReferencesProps = {
  references: Project[];
};

export default function CareerReferences({
  references,
}: CareerReferencesProps) {
  return (
    <FadeIn delay={0.3} className="space-y-3">
      {/* <p className="text-base text-muted">Live references</p> */}
      <ul className="grid grid-cols-3 gap-2">
        {references.map((reference) => (
          <li key={reference.url} className="min-w-0">
            <a
              href={reference.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-[2px] bg-accent-shift px-3 py-1.5 text-label font-medium text-white"
            >
              <span className="min-w-0 max-w-[9.5rem] truncate">{host(reference.url)}</span>
              <LuArrowUpRight aria-hidden className="size-3.5 shrink-0" />
            </a>
          </li>
        ))}
      </ul>
    </FadeIn>
  );
}
