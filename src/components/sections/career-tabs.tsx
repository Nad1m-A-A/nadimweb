"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import FadeIn from "@/components/ui/fade-in";
import CareerTabPanel from "@/components/sections/career-tab-panel";
import { careerTabs } from "@/data/career-tabs";

const panelEase = [0.22, 1, 0.36, 1] as const;

const tabs = careerTabs;

export default function CareerTabs() {
  const [activeId, setActiveId] = useState(tabs[0].id);
  const active = tabs.find((tab) => tab.id === activeId) ?? tabs[0];

  return (
    <section className="section">
      <div className="app_container">
        <FadeIn trigger="mount" delay={0.3}>
          <div
            role="tablist"
            aria-label="Career"
            className="flex justify-between border-b border-border"
          >
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
                  className={`-mb-px cursor-pointer border-b px-2 py-3 sm:px-4 text-base font-medium transition-colors duration-300 ease-calm sm:text-lg ${
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
            className="mx-auto max-w-2xl text-lg leading-8 text-muted sm:text-xl sm:leading-9"
          >
            <CareerTabPanel tab={active} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
