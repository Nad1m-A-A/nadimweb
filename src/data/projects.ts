/**
 * Where a project is shown:
 * - `projects`: home page Projects carousel
 * - `overview`: career Overview cards
 * - `frontend` / `backend`: live reference links in those career sections
 */
export type ProjectFeature = "projects" | "overview" | "frontend" | "backend";

export type Project = {
  /** Short name: career cards and links. */
  name: string;
  /** Long name for the home Projects carousel; falls back to `name`. */
  title?: string;
  url: string;
  /** Brand colour for the career Overview card; `null` keeps the site accent. */
  color: string | null;
  features: ProjectFeature[];
  /** Home carousel: bullet points under the title. */
  highlights?: string[];
  /** Home carousel: GitHub link. */
  repo?: string;
  /** Home carousel: device mockup image. */
  mockup?: string;
  /** Home carousel: `false` blurs the mockup. */
  available?: boolean;
  /** Not shown yet. */
  screenshot?: string;
  summary?: string;
  tags?: string[];
};

export const projects: Project[] = [
  {
    name: "Dashboards",
    title: "Multi-Business Dashboard",
    url: "https://dashboards.nadimweb.com",
    color: "#171717",
    features: ["projects", "overview", "frontend", "backend"],
    highlights: [
      "Aggregates separate enterprise systems into one authenticated surface Using Inertia.js",
      "Credentials and enterprise system URLs never reach the browser; all fetches go through an authorized server proxy",
      "Role-based passcode auth with request auditing for non-admin roles",
      "Layered permissions (views / actions / businesses) enforced on the API and mirrored in the UI",
      "Same API contract in demo and production, with synthetic data swaps in without changing the frontend",
      "Fully documented, with a bilingual user guide and in-app developer guide for contributors",
    ],
    repo: "https://github.com/Nad1m-A-A/dashboards-demo",
    mockup: "/dashboards-mockup.webp",
  },
  {
    name: "Gold System",
    title: "Jewelry Factory Enterprise System",
    url: "https://gold.nadimweb.com",
    color: null,
    features: ["projects", "overview", "backend"],
    highlights: [
      "End-to-end enterprise system for gold manufacturing with dedicated modules for inventory, HR, production, and order tracking",
      "Minimizes mistakes by automating complex and repetitive workflows",
      "Delivers precise material tracking and real-time metrics across all production stages",
      "Seamless, secure in-app subscription payments and renewals",
    ],
    mockup: "/erp-mockup.webp",
  },
  {
    name: "CV Editor",
    url: "https://cv.nadimweb.com",
    color: null,
    features: ["overview", "frontend"],
    screenshot: "/projects/cv-editor.png",
    summary:
      "Edit a CV as a form or JSON and export ATS-friendly PDFs from a locked-down container.",
    tags: ["React", "Node.js", "Docker"],
  },
  {
    name: "Flow Rigs",
    url: "https://flowrigs.app",
    color: "#fefd49",
    features: ["overview", "backend"],
    screenshot: "/projects/flow-rigs.png",
    summary:
      "Publish reusable step-by-step developer workflows with fill-in variables.",
    tags: ["NestJS", "Next.js", "PostgreSQL"],
  },
  {
    name: "Carne Media",
    url: "https://carnemedia.ae/en",
    color: "#229a7d",
    features: ["projects", "overview", "frontend"],
    highlights: [
      "Next.js app with full Arabic/English localization and locale-aware routing",
      "SEO-ready structure with metadata, crawlable pages, and bilingual content",
      "Marketing site for programs, founder story, and journal — built for a Dubai media training brand",
    ],
    mockup: "/carne-mockup.png",
    screenshot: "/projects/carne-media.png",
    summary:
      "Bilingual site for a Dubai media training center, with a 3D model and an office map.",
    tags: ["Next.js", "Mapbox", "SEO"],
  },
  {
    name: "AB Designer",
    url: "https://www.designerab.com",
    color: "#baa74c",
    features: ["overview", "frontend"],
    screenshot: "/projects/designerab.png",
  },
  {
    name: "Code Ten",
    title: "CodeTen Software Solutions",
    url: "https://codeten.net/en",
    color: null,
    features: ["projects", "overview", "frontend"],
    highlights: [
      "React SPA with a multi-page marketing architecture for enterprise systems, healthcare, e-invoicing, and apps",
      "Full Arabic/English bilingual experience across the site",
      "Positions Code 10 as a UAE-local software house with solution and client storytelling",
    ],
    mockup: "/code10-mockup.webp",
  },
  {
    name: "MHM Collection",
    url: "https://mhmcollection.pages.dev",
    color: "#322016",
    features: ["overview", "frontend"],
    screenshot: "/projects/mhm-collection.png",
    summary:
      "English, Arabic and Russian booking site for a Dubai rental broker, with 29% less first-load JavaScript.",
    tags: ["React", "TypeScript", "RTL"],
  },
];
