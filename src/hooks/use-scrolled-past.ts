"use client";

import { useEffect, useState } from "react";

/** True once the window is scrolled more than `px` from the top. */
export function useScrolledPast(px: number) {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const update = () => setPast(window.scrollY > px);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [px]);

  return past;
}
