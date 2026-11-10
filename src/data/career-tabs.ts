export type CareerStep = {
  label: string;
  text: string;
};

export type CareerReference = {
  label: string;
  url: string;
};

export type CareerTab = {
  id: string;
  label: string;
  body?: string;
  steps?: CareerStep[];
  references?: CareerReference[];
};

export const careerTabs: CareerTab[] = [
  {
    id: "overview",
    label: "Overview",
    body: "FullStack web developer with 4+ years of experience building ERP systems, internal dashboards and multilingual marketing websites for UAE businesses, mainly with Laravel, React, and Next.js. I take projects from the first conversation with the client all the way to production: database design, APIs, UI/UX, automated tests and Docker deploys. I care about the quality of my software and aim to improve the web.",
  },
  {
    id: "frontend",
    label: "Frontend",
    steps: [
      {
        label: "Discover",
        text: "Before a single line of code, I learn how the business really runs: who it serves, how it sells, and where things slow down.",
      },
      {
        label: "Brand",
        text: "I find the feel that fits: the look, the imagery and the voice the brand speaks in.",
      },
      {
        label: "UI/UX",
        text: "I design multilingual marketing sites that sell and strengthen the brand, and data-heavy dashboards that turn live data from 10+ businesses into clear views for 500+ users.",
      },
      {
        label: "Copy",
        text: "Words that persuade, not just fill space. In English and Arabic, every line speaks to the right customer and moves them toward one action: a message or a call.",
      },
      {
        label: "Build",
        text: "React, Next.js and TypeScript in a decoupled, component-based architecture that stays easy to change. TanStack Query and Table for data, Tailwind CSS and shadcn/ui for the interface, GSAP and Motion to bring it to life.",
      },
      {
        label: "Optimize",
        text: "Fast on any connection: code splitting, a bundle per language, dialogs and galleries that load on demand and preload on hover, deferred animation libraries, and responsive AVIF/JPEG images. On one site, first-load JavaScript dropped by 29%.",
      },
      {
        label: "Ship",
        text: "Built to be found and trusted: SEO metadata, Open Graph, hreflang and structured data, with Vitest and Jest tests behind every release.",
      },
    ],
    references: [
      { label: "carnemedia.ae", url: "https://carnemedia.ae" },
      { label: "designerab.com", url: "https://www.designerab.com" },
      { label: "codeten.net", url: "https://codeten.net" },
      {
        label: "dashboards.nadimweb.com",
        url: "https://dashboards.nadimweb.com/",
      },
      {
        label: "mhmcollection.pages.dev",
        url: "https://mhmcollection.pages.dev/",
      },
    ],
  },
  { id: "backend", label: "Backend" },
  { id: "devops", label: "DevOps" },
  { id: "stack", label: "Stack" },
  { id: "ai", label: "AI" },
];
