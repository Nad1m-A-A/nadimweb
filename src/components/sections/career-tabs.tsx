"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import FadeIn from "@/components/ui/fade-in";

const panelEase = [0.22, 1, 0.36, 1] as const;

type CareerTab = {
  id: string;
  label: string;
};

const tabs: CareerTab[] = [
  { id: "overview", label: "Overview" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
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
                  className={`-mb-px cursor-pointer border-b px-4 py-3 text-sm font-medium transition-colors duration-300 ease-calm sm:text-base ${
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
            className="max-w-2xl text-sm leading-7 text-muted sm:text-base"
          >
            {active.label} content coming soon.
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
