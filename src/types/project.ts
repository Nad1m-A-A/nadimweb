/**
 * Career sections that list a project as a live reference link.
 * Every project is shown in the Projects section.
 */
export type ProjectFeature = "overview" | "frontend" | "backend";

export type Project = {
  name: string;
  url: string;
  features: ProjectFeature[];
  /** Screenshot on the brand stage, under `/public/stage`. */
  image: string;
  summary?: string;
};
