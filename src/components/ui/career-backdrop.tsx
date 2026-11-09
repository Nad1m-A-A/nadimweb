"use client";

import { motion, MotionConfig } from "motion/react";

const grain =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const drift = (x: string, y: string, duration: number) => ({
  animate: { x: ["0%", x, "0%"], y: ["0%", y, "0%"] },
  transition: { duration, ease: "easeInOut" as const, repeat: Infinity },
});

/** Dusk backdrop: ink-to-plum base, an ember glow rising behind the projects, a cool violet bloom top-left, film grain on top. */
export function CareerBackdrop() {
  return (
    <MotionConfig reducedMotion="user">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-linear-to-b from-[#0a0c18] via-[#130f22] to-[#26121b]">
        <motion.div
          {...drift("-6%", "-4%", 28)}
          className="absolute -right-[20%] -bottom-[45%] size-[85vmax] rounded-full bg-[#ff5f2e]/45 blur-[140px]"
        />
        <motion.div
          {...drift("5%", "-6%", 34)}
          className="absolute right-[10%] bottom-[5%] size-[40vmax] rounded-full bg-[#ffb067]/25 blur-[120px]"
        />
        <motion.div
          {...drift("8%", "6%", 40)}
          className="absolute -top-[30%] -left-[15%] size-[60vmax] rounded-full bg-[#5b4dff]/30 blur-[150px]"
        />
        <div className="absolute inset-0 opacity-[0.09] mix-blend-overlay" style={{ backgroundImage: grain }} />
      </div>
    </MotionConfig>
  );
}
