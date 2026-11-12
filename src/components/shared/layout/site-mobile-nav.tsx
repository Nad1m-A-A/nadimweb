"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LuEllipsisVertical } from "react-icons/lu";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { calmEase } from "@/lib/motion";
import type { SiteMobileNavProps } from "@/types/nav";

/** Three-dots trigger with a small dropdown of section links; small screens only. Closes on scroll. */
export default function SiteMobileNav({ links }: SiteMobileNavProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const activeId = useScrollSpy(links.map((link) => link.id));

  useEffect(() => {
    if (!open) return;

    const close = () => setOpen(false);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) close();
    };
    const media = window.matchMedia("(min-width: 768px)");

    window.addEventListener("scroll", close, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    media.addEventListener("change", close);
    return () => {
      window.removeEventListener("scroll", close);
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      media.removeEventListener("change", close);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="site-mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
        className="flex text-foreground transition-opacity duration-300 ease-calm hover:opacity-70"
      >
        <LuEllipsisVertical className="size-5" />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="site-mobile-nav"
            aria-label="Page sections"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: calmEase }}
            className="absolute top-full right-0 mt-3 min-w-40 rounded-[2px] border border-border bg-background py-1"
          >
            <ul className="flex flex-col">
              {links.map((link) => {
                const selected = link.id === activeId;
                return (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      aria-current={selected ? "true" : undefined}
                      onClick={() => setOpen(false)}
                      className={`block px-4 py-2 text_label transition-colors hover:text-foreground ${
                        selected ? "text-accent" : "text-muted"
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
