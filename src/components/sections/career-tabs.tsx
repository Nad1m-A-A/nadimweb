"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import FadeIn from "@/components/ui/fade-in";

const panelEase = [0.22, 1, 0.36, 1] as const;

type CareerTab = {
  id: string;
  label: string;
  body?: string;
};

const tabs: CareerTab[] = [
  {
    id: "overview",
    label: "Overview",
    body: "Full Stack Developer with 4+ years of experience building ERP systems, internal dashboards and multilingual marketing websites for UAE businesses, mainly with Laravel, React, and Next.js. I take projects from the first conversation with the client all the way to production: database design, APIs, UI/UX, automated tests and Docker deploys. I care about the quality of my software and aim to improve the web.",
  },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "devops", label: "DevOps" },
  { id: "stack", label: "Stack" },
  { id: "ai", label: "AI" },
];

export default function CareerTabs() {
  const [activeId, setActiveId] = useState(tabs[0].id);
  const active = tabs.find((tab) => tab.id === activeId) ?? tabs[0];

  return (
    <section className="section">
      <div className="app_container">
        <FadeIn trigger="mount" delay={0.3}>
          <div role="tablist" aria-label="Career" className="flex border-b border-border">
            {tabs.map((tab) => {
              const selected = tab.id === activeId;
              return (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`panel-${tab.id}`}
                  onClick={() => setActiveId(tab.id)}
                  className={`-mb-px cursor-pointer border-b px-2 py-3 sm:px-4 text-sm font-medium transition-colors duration-300 ease-calm sm:text-base ${
                    selected
                      ? "border-accent text-foreground"
                      : "border-transparent text-muted hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </FadeIn>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.id}
            id={`panel-${active.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${active.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: panelEase }}
            className="max-w-2xl text-base leading-8 text-muted sm:text-lg"
          >
            {active.body ?? `${active.label} content coming soon.`}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
