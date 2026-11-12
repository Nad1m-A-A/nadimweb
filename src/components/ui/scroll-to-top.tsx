"use client";

import { useCallback, useEffect, useState } from "react";
import { FaCaretUp } from "react-icons/fa";

const SHOW_AFTER_PX = 320;

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const scrollToTop = useCallback(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  }, []);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed right-[max(1.5rem,calc(50%-24rem-3rem-1.5rem))] bottom-6 z-40 flex size-12 cursor-pointer items-center justify-center rounded-[2px] bg-transparent text-accent transition-opacity duration-300 ease-calm hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
        visible
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    >
      <FaCaretUp className="size-8" aria-hidden />
    </button>
  );
}
