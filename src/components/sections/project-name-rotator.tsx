"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap/register";
import type { Project } from "@/data/projects";

const SHIFT_S = 0.65;
/** The list is rendered this many times so there are always names above and below the active one. */
const COPIES = 3;

function opacityFor(dist: number) {
  if (dist === 0) return 1;
  if (dist === 1) return 0.42;
  if (dist === 2) return 0.22;
  return 0.1;
}

const mod = (n: number, m: number) => ((n % m) + m) % m;

type ProjectNameRotatorProps = {
  projects: Project[];
  /** Unbounded step count from the parent; active project is steps mod length. */
  steps: number;
};

/**
 * SpecialtyRotator look, driven by the parent and looping forever.
 * Moves through repeated copies of the list, then silently snaps back to the middle copy.
 */
export function ProjectNameRotator({
  projects,
  steps,
}: ProjectNameRotatorProps) {
  const count = projects.length;
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const pos = useRef<number | null>(null);
  const prevSteps = useRef(steps);

  const active = projects[mod(steps, count)];

  useGSAP(
    () => {
      const root = rootRef.current;
      const track = trackRef.current;
      if (!root || !track) return;
      const items = Array.from(track.children) as HTMLElement[];
      const middle = (p: number) => count + mod(p, count);

      // Active name pinned to the bottom; earlier names fade upward, later ones wait hidden below.
      const yFor = (p: number) =>
        root.clientHeight - items[p].offsetTop - items[p].offsetHeight;
      const place = (p: number, duration: number, onComplete?: () => void) => {
        gsap.to(track, {
          y: yFor(p),
          duration,
          ease: "power2.inOut",
          overwrite: true,
          onComplete,
        });
        items.forEach((el, i) => {
          gsap.to(el, {
            opacity: i > p ? 0 : opacityFor(p - i),
            filter: `blur(${i === p ? 0 : 1.5}px)`,
            duration,
            ease: "power2.inOut",
            overwrite: true,
          });
        });
      };

      const diff = steps - prevSteps.current;
      prevSteps.current = steps;

      if (pos.current === null || diff === 0) {
        pos.current = middle(steps);
        place(pos.current, 0);
      } else {
        // If an earlier step was cut short near the edge, jump back to the middle copy first.
        if (pos.current < count || pos.current >= 2 * count) {
          pos.current = middle(pos.current);
          place(pos.current, 0);
        }
        const reduce = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        pos.current += diff;
        place(pos.current, reduce ? 0 : SHIFT_S, () => {
          const settled = middle(pos.current!);
          if (settled !== pos.current) {
            pos.current = settled;
            place(settled, 0);
          }
        });
      }

      const onResize = () => pos.current !== null && place(pos.current, 0);
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    },
    { scope: rootRef, dependencies: [steps] },
  );

  return (
    <div
      ref={rootRef}
      className="absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_55%)]"
    >
      <a
        href={active.url}
        target="_blank"
        rel="noreferrer"
        aria-live="polite"
        className="absolute inset-x-0 bottom-0 z-10 font-display text-5xl font-light italic leading-none text-balance text-transparent focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground lg:text-7xl"
      >
        {active.title}
      </a>
      <ol
        ref={trackRef}
        aria-hidden
        className="flex flex-col gap-4 will-change-transform"
      >
        {Array.from({ length: COPIES }, () => projects)
          .flat()
          .map((project, i) => (
            <li
              key={i}
              className="font-display pb-6 text-5xl font-light italic leading-none text-balance opacity-0 lg:text-7xl"
            >
              {project.title}
            </li>
          ))}
      </ol>
    </div>
  );
}
