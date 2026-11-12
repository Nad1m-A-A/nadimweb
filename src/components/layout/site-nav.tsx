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
      className="flex items-center justify-center gap-8"
    >
      {links.map((link, index) => {
        const selected = link.id === activeId;
        return (
          <FadeIn key={link.id} trigger="mount" delay={0.1 + index * 0.08}>
            <a
              href={`#${link.id}`}
              aria-current={selected ? "true" : undefined}
              className={`block border-b px-1 pb-1 text-label transition-[color,border-color] hover:text-foreground ${selected
                  ? "border-accent text-blue-500"
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
