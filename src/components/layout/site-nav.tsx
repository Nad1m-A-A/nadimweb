"use client";

import FadeIn from "@/components/ui/fade-in";
import { useScrollSpy } from "@/hooks/useScrollSpy";

export type SiteNavLink = {
  id: string;
  label: string;
};

type SiteNavProps = {
  links: readonly SiteNavLink[];
};

export function SiteNav({ links }: SiteNavProps) {
  const activeId = useScrollSpy(links.map((link) => link.id));

  return (
    <nav
      aria-label="Page sections"
      className="scrollbar-none -mx-4 flex w-[calc(100%+2rem)] items-center justify-between gap-6 overflow-x-auto px-4 md:mx-0 md:w-auto md:justify-center md:gap-8 md:px-0"
    >
      {links.map((link, index) => {
        const selected = link.id === activeId;
        return (
          <FadeIn key={link.id} trigger="mount" delay={0.1 + index * 0.08}>
            <a
              href={`#${link.id}`}
              aria-current={selected ? "true" : undefined}
              className={`block border-b px-1 pb-1 transition-[color,border-color] hover:text-foreground ${
                selected
                  ? "border-accent text-foreground"
                  : "border-transparent text-muted"
              }`}
            >
              {link.label}
            </a>
          </FadeIn>
        );
      })}
    </nav>
  );
}
