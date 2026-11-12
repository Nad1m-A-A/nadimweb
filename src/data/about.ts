import { LuBot, LuShieldCheck } from "react-icons/lu";
import { SiDocker, SiGit } from "react-icons/si";
import type { AboutItem } from "@/types/about";

export const aboutItems: AboutItem[] = [
  {
    id: "approach",
    question: "How do you approach engineering a product?",
    kind: "list",
    items: [
      {
        Icon: SiDocker,
        title: "Reproducible Environments",
        body: "Containerized dev-to-prod setups with Docker and CI/CD, so the artifact that passes locally is exactly what ships.",
      },
      {
        Icon: SiGit,
        title: "Scalable Collaboration",
        body: "Disciplined Git workflows, reviews, and branching strategies that keep multi-developer teams moving without conflicts.",
      },
      {
        Icon: LuShieldCheck,
        title: "Security-First Architecture",
        body: "Credentials stay server-side, permissions are layered by role, and sensitive actions are audited by default.",
      },
      {
        Icon: LuBot,
        title: "AI-Augmented Delivery",
        body: "Agentic AI tooling folded into daily work to accelerate scaffolding and iteration while holding the quality bar high.",
      },
    ],
  },
  {
    id: "systems",
    question: "What kind of systems have you shipped?",
    kind: "text",
    body: "Full end-to-end platforms that run real businesses. Multi-tenant enterprise systems spanning inventory, HR, production, and order tracking, a unified dashboard that consolidates separate systems behind one authenticated surface, and a high-throughput POS with native hardware integration. I own the whole stack, from database schema and server APIs to the interface people use every day.",
  },
  {
    id: "reliability",
    question: "How do you keep what you ship reliable?",
    kind: "text",
    body: "Reliability is designed in, not bolted on. Business logic lives on the server behind a single API contract that demo and production both share, permissions are enforced on the API and mirrored in the UI, and CI with automated testing catches regressions long before they reach staging.",
  },
  {
    id: "next",
    question: "Where are you headed next?",
    kind: "text",
    body: "Toward larger, more resilient SaaS systems, going deeper on distributed infrastructure, observability, and secure networking so the products I build scale cleanly from the first customer to thousands.",
  },
];
