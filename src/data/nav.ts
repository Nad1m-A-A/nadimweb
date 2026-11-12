import { careerSections } from "@/data/career";
import type { SiteNavLink } from "@/types/nav";

export const homeNavLinks: SiteNavLink[] = [
  { id: "projects", label: "Projects" },
];

export const careerNavLinks: SiteNavLink[] = [
  ...careerSections.map(({ id, label }) => ({ id, label })),
  { id: "projects", label: "Projects" },
];
