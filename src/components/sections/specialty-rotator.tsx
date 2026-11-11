"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap/register";

const PHRASES = [
  "Enterprise Systems",
  "Modern UI Architectures",
  "Complex Web Applications",
] as const;

const LAST = PHRASES.length - 1;
const HOLD_S = 1.5;
const SHIFT_S = 0.65;

function opacityFor(dist: number) {
  if (dist === 0) return 1;
  if (dist === 1) return 0.42;
  return 0.22;
}

export function SpecialtyRotator() {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        const items = Array.from(track.children) as HTMLElement[];
        const h = items[0]?.offsetHeight || 28;
        gsap.set(track, { y: -LAST * h });
        items.forEach((el, i) => {
          gsap.set(el, {
            opacity: i === LAST ? 1 : 0,
            visibility: i === LAST ? "visible" : "hidden",
          });
        });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const items = Array.from(track.children) as HTMLElement[];
        const lineHeight = () => items[0]?.offsetHeight || 28;

        let active = LAST;
        let dir = -1;
        let delay: gsap.core.Tween | undefined;

        // Initial state only — runtime steps tween opacity with y (no gsap.set snaps).
        gsap.set(track, { y: -LAST * lineHeight() });
        items.forEach((el, i) => {
          gsap.set(el, { opacity: opacityFor(Math.abs(i - LAST)) });
        });

        const stepTo = (index: number) => {
          const h = lineHeight();
          const tl = gsap.timeline({
            onComplete: () => {
              active = index;
              delay = gsap.delayedCall(HOLD_S, tick);
            },
          });

          tl.to(track, {
            y: -index * h,
            duration: SHIFT_S,
            ease: "power2.inOut",
          });

          // Per-item tweens so each line eases to its target opacity with the shift.
          items.forEach((el, i) => {
            tl.to(
              el,
              {
                opacity: opacityFor(Math.abs(i - index)),
                duration: SHIFT_S,
                ease: "power2.inOut",
              },
              0,
            );
          });
        };

        const tick = () => {
          let next = active + dir;

          if (next >= LAST) {
            next = LAST;
            dir = -1;
          } else if (next <= 0) {
            next = 0;
            dir = 1;
          }

          stepTo(next);
        };

        delay = gsap.delayedCall(HOLD_S, tick);

        return () => {
          delay?.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      className="relative z-10 shrink-0 overflow-hidden [mask-image:linear-gradient(to_bottom,black_55%,transparent_100%)]"
      aria-live="polite"
    >
      <div ref={trackRef} className="flex flex-col will-change-transform">
        {PHRASES.map((phrase) => (
          <p
            key={phrase}
            className="whitespace-nowrap text-lead font-normal text-accent text-start"
          >
            {phrase}
          </p>
        ))}
      </div>
    </div>
  );
}
