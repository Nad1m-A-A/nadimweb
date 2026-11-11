export type CareerStep = {
  label: string;
  text: string;
};

export type CareerMetric = {
  value: string;
  label: string;
};

export type CareerTab = {
  id: string;
  label: string;
  body?: string;
  metrics?: CareerMetric[];
  layout?: "steps" | "chips";
  steps?: CareerStep[];
};

export const defaultCareerTabId = "frontend";

export const careerTabs: CareerTab[] = [
  {
    id: "overview",
    label: "Overview",
    body: "Product engineer with 4+ years of experience building enterprise systems, internal dashboards and multilingual marketing websites for UAE businesses, mainly with Laravel, React, and Next.js. I take projects from the first conversation with the client all the way to production: database design, APIs, UI/UX, automated tests and Docker deploys. I care about the quality of my software and aim to improve the web.",
    metrics: [
      { value: "4+", label: "years building" },
      { value: "10+", label: "businesses served" },
      { value: "500+", label: "dashboard users" },
      { value: "~29%", label: "lighter bundle" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    steps: [
      {
        label: "Discovering",
        text: "Before a single line of code, I learn how the business really runs: who it serves, how it sells, and where things slow down.",
      },
      {
        label: "Branding",
        text: "I find the feel that fits: the look, the imagery and the voice the brand speaks in.",
      },
      {
        label: "Designing",
        text: "I design multilingual marketing sites that sell and strengthen the brand, and data-heavy dashboards that turn live data from 10+ businesses into clear views for 500+ users.",
      },
      {
        label: "Copywriting",
        text: "Words that persuade, not just fill space. In English and Arabic, every line speaks to the right customer and moves them toward one action: a message or a call.",
      },
      {
        label: "Building",
        text: "React, Next.js and TypeScript in a decoupled, component-based architecture that stays easy to change. TanStack Query and Table for data, Tailwind CSS and shadcn/ui for the interface, GSAP and Motion to bring it to life.",
      },
      {
        label: "Optimizing",
        text: "Fast on any connection: code splitting, a bundle per language, dialogs and galleries that load on demand and preload on hover, deferred animation libraries, and responsive AVIF/JPEG images. On one site, first-load JavaScript dropped by 29%.",
      },
      {
        label: "Shipping",
        text: "Built to be found and trusted: SEO metadata, Open Graph, hreflang and structured data, with Vitest and Jest tests behind every release.",
      },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    steps: [
      {
        label: "Modeling",
        text: "I shape the database around how the business really works: its records, workflows, roles and people, in MySQL or PostgreSQL.",
      },
      {
        label: "Automating",
        text: "I turn manual steps into rules the system enforces, minimizing human error and raising productivity.",
      },
      {
        label: "Standardizing",
        text: "Proven design patterns give every feature the same shape, so the codebase stays predictable as it grows, and frontend and backend types never get out of sync.",
      },
      {
        label: "Recovering",
        text: "Nothing is lost when something fails. Records are saved first and marked as synced or failed, background jobs take on the slow work, and scheduled tasks pick up whatever was left behind.",
      },
      {
        label: "Securing",
        text: "Secrets stay on the server, each role sees only what it needs, and sign-in uses refresh-token rotation with reuse detection and Google OAuth.",
      },
      {
        label: "Testing",
        text: "Unit and integration tests in Pest, Vitest and Jest, with coverage tracked to find the gaps. Anything that breaks once gets a test, so new features never break what already works.",
      },
    ],
  },
  {
    id: "devops",
    label: "DevOps",
    steps: [
      {
        label: "Containerizing",
        text: "Lean, multi-stage Docker images with cached layers: small to ship and quick to rebuild.",
      },
      {
        label: "Managing",
        text: "Comfortable working with Linux, Docker and SSH, from first setup to production.",
      },
      {
        label: "Automating",
        text: "CI/CD pipelines that test every change, deploy only when tests pass, and skip work that isn't needed. On one project, that cut run time by 22%.",
      },
      {
        label: "Versioning",
        text: "Every release is a versioned image, so a bad deploy goes back to any earlier version in one step.",
      },
      {
        label: "Securing",
        text: "Servers are reachable only through a private network. Secrets never touch the code, and containers run read-only, as non-root and with only the permissions they need.",
      },
      {
        label: "Serving",
        text: "Nginx compresses and caches files so pages load fast, and rate limits keep abuse out.",
      },
    ],
  },
  {
    id: "stack",
    label: "Stack",
    layout: "chips",
    steps: [
      {
        label: "Languages",
        text: "TypeScript, JavaScript, PHP, SQL, HTML, CSS",
      },
      {
        label: "Frontend",
        text: "React, Next.js, Inertia.js, Tailwind CSS, shadcn/ui, TanStack Query & Table, GSAP, Motion",
      },
      {
        label: "Backend",
        text: "Laravel, NestJS, REST APIs, Prisma",
      },
      {
        label: "Data",
        text: "MySQL, PostgreSQL",
      },
      {
        label: "Testing",
        text: "Pest, Vitest, Jest",
      },
      {
        label: "DevOps",
        text: "Docker, GitHub Actions, Nginx, Tailscale, Linux, SSH",
      },
      {
        label: "AI",
        text: "Claude, Cursor, ChatGPT",
      },
    ],
  },
];
