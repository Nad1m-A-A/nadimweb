export type Project = {
  title: string;
  url: string;
  image: string;
  /** Brand colour from the project's own theme; tints the career backdrop while active. */
  color: string;
  summary: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    title: "CV Editor",
    url: "https://cv.nadimweb.com",
    image: "/projects/cv-editor.png",
    color: "#0369a1",
    summary:
      "Edit a CV as a form or JSON and export ATS-friendly PDFs from a locked-down container.",
    tags: ["React", "Node.js", "Docker"],
  },
  {
    title: "MHM Collection",
    url: "https://mhmcollection.pages.dev",
    image: "/projects/mhm-collection.png",
    color: "#d6c8b0",
    summary:
      "English, Arabic and Russian booking site for a Dubai rental broker, with 29% less first-load JavaScript.",
    tags: ["React", "TypeScript", "RTL"],
  },
  {
    title: "Flow Rigs",
    url: "https://flowrigs.app",
    image: "/projects/flow-rigs.png",
    color: "#fefd49",
    summary:
      "Publish reusable step-by-step developer workflows with fill-in variables.",
    tags: ["NestJS", "Next.js", "PostgreSQL"],
  },
  {
    title: "Carne Media",
    url: "https://carnemedia.ae",
    image: "/projects/carne-media.png",
    color: "#229a7d",
    summary:
      "Bilingual site for a Dubai media training center, with a 3D model and an office map.",
    tags: ["Next.js", "Mapbox", "SEO"],
  },
];
