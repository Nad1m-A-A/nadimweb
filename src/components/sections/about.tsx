"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { IconType } from "react-icons";
import { LuChevronRight, LuBot, LuShieldCheck } from "react-icons/lu";
import { SiDocker, SiGit } from "react-icons/si";
import FadeIn from "@/components/ui/fade-in";
import SectionTitle from "@/components/ui/section-title";

const panelEase = [0.22, 1, 0.36, 1] as const;

type FocusItem = {
  Icon: IconType;
  title: string;
  body: string;
};

type AboutItem = {
  id: string;
  question: string;
} & (
    | { kind: "list"; items: FocusItem[] }
    | { kind: "text"; body: string }
  );

const list: AboutItem[] = [
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

export default function About() {
  const [openId, setOpenId] = useState<string | null>(list[0].id);

  return (
    <section id="about" className="section static!">
      <div className="app_container">
        <SectionTitle>About</SectionTitle>

        <div className="divide-y divide-border !last:border-b border-border">
          {list.map((item, index) => {
            const isOpen = openId === item.id;
            const panelId = `about-panel-${item.id}`;
            const buttonId = `about-button-${item.id}`;

            return (
              <FadeIn key={item.id} delay={0.3 + index * 0.05}>
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className={`group cursor-pointer flex w-full items-start gap-4 text-left transition-colors ${index === 0
                      ? "pb-5"
                      : index === list.length - 1
                        ? "pt-5"
                        : "py-5"
                      }`}
                  >
                    <span
                      aria-hidden
                      className="w-8 shrink-0 font-num text-heading text-accent group-hover:opacity-70"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-heading text-foreground">
                      {item.question}
                    </span>
                    <LuChevronRight
                      aria-hidden
                      className={`mt-1 size-5 shrink-0 text-accent transition-transform duration-300 group-hover:opacity-70 ${isOpen ? "rotate-90 text-accent" : ""}`}
                    />
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: panelEase }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6">
                        {item.kind === "text" ? (
                          <p className="max-w-2xl pl-12 text-body text-muted">
                            {item.body}
                          </p>
                        ) : (
                          <ul className="grid gap-2.5 pl-12 sm:grid-cols-2">
                            {item.items.map(({ Icon, title, body }) => (
                              <FadeIn
                                key={title}
                                className="rounded-[2px] border border-border bg-surface/50 p-4 transition-colors hover:border-accent/40"
                              >
                                <li>
                                  <div className="flex items-center gap-2.5">
                                    <Icon
                                      aria-hidden
                                      className="size-5 shrink-0 text-accent"
                                    />
                                    <span className="text-base font-medium text-foreground">
                                      {title}
                                    </span>
                                  </div>
                                  <p className="mt-2 text-body text-muted">
                                    {body}
                                  </p>
                                </li>
                              </FadeIn>
                            ))}
                          </ul>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
