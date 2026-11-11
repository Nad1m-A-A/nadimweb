"use client";

import { useEffect, useState } from "react";

/** Id of the section whose top is at or above the reading line under the sticky header, or null above the first. */
export function useScrollSpy(ids: readonly string[]) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const key = ids.join("|");

  useEffect(() => {
    const list = key.split("|");
    let frame = 0;

    const update = () => {
      frame = 0;
      const headerBottom =
        document.querySelector("header")?.getBoundingClientRect().bottom ?? 64;
      const line = headerBottom + 160;
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

      let current: string | null = null;
      for (const id of list) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= line) {
          current = id;
        }
      }
      setActiveId(atBottom ? list[list.length - 1] : current);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [key]);

  return activeId;
}
