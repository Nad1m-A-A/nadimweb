import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    name: "Dashboards",
    url: "https://dashboards.nadimweb.com",
    features: ["overview", "frontend", "backend"],
    image: "/stage/dashboards.webp",
    summary:
      "Aggregates separate enterprise systems into one authenticated surface Using Inertia.js",
  },
  {
    name: "Gold System",
    url: "https://gold.nadimweb.com",
    features: ["overview", "backend"],
    image: "/stage/gold-system.webp",
    summary:
      "End-to-end enterprise system for gold manufacturing with dedicated modules for inventory, HR, production, and order tracking",
  },
  {
    name: "CV Editor",
    url: "https://cv.nadimweb.com",
    features: ["overview", "frontend"],
    image: "/stage/cv-editor.webp",
    summary:
      "Edit a CV as a form or JSON and export ATS-friendly PDFs from a locked-down container.",
  },
  {
    name: "Flow Rigs",
    url: "https://flowrigs.app",
    features: ["overview", "backend"],
    image: "/stage/flow-rigs.webp",
    summary:
      "Publish reusable step-by-step developer workflows with fill-in variables.",
  },
  {
    name: "Carne Media",
    url: "https://carnemedia.ae/en",
    features: ["overview", "frontend"],
    image: "/stage/carne-media.webp",
    summary:
      "Bilingual site for a Dubai media training center, with a 3D model and an office map.",
  },
  {
    name: "AB Designer",
    url: "https://www.designerab.com",
    features: ["overview", "frontend"],
    image: "/stage/designerab.webp",
  },
  {
    name: "Code Ten",
    url: "https://codeten.net/en",
    features: ["overview", "frontend"],
    image: "/stage/code-ten.webp",
    summary:
      "React SPA with a multi-page marketing architecture for enterprise systems, healthcare, e-invoicing, and apps",
  },
  {
    name: "American Aesthetic",
    url: "https://americanaestheticmc.com",
    features: ["overview", "frontend"],
    image: "/stage/american-aesthetic.webp",
    summary:
      "Leading provider of aesthetic treatments in Dubai including weight loss, dermatology, cosmetic surgery, and more.",
  },
  {
    name: "MHM Collection",
    url: "https://mhmcollection.pages.dev",
    features: ["overview", "frontend"],
    image: "/stage/mhm-collection.webp",
    summary:
      "English, Arabic and Russian booking site for a Dubai rental broker, with 29% less first-load JavaScript.",
  },
];
