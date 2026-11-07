"use client";

import { motion } from "motion/react";

type BrowserTabProps = {
  title: string;
  active: boolean;
  onSelect: () => void;
};

export function BrowserTab({ title, active, onSelect }: BrowserTabProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onSelect}
      className={`relative min-w-0 flex-1 rounded-full px-3 py-1.5 text-sm transition-colors ${
        active ? "text-black" : "text-gray hover:text-black"
      }`}
    >
      {active && (
        <motion.span
          layoutId="active-tab"
          className="absolute inset-0 rounded-full bg-white shadow-rest"
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
        />
      )}
      <motion.span
        key={String(active)}
        initial={active ? { opacity: 0, y: 4 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 32, delay: 0.05 }}
        className="relative block truncate"
      >
        {title}
      </motion.span>
    </button>
  );
}
