"use client";

import Image from "next/image";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { PiArrowLeftThin, PiArrowRightThin } from "react-icons/pi";
import type { Project } from "@/data/projects";

const arrowClass =
  "p-2 text-4xl text-foreground transition-opacity hover:opacity-60 focus-visible:outline-1 focus-visible:outline-offset-2";

export function ProjectsShowcase({ projects }: { projects: Project[] }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const count = projects.length;
  const project = projects[index];

  const go = useCallback(
    (step: number) => {
      setDirection(step);
      setIndex((current) => (current + step + count) % count);
    },
    [count],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") go(-1);
      if (event.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const next = projects[(index + 1) % count];
  const prev = projects[(index - 1 + count) % count];

  return (
    <MotionConfig reducedMotion="user">
      <section
        aria-roledescription="carousel"
        aria-label="Projects"
        className="flex min-h-svh w-full flex-col gap-6 px-6 py-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12 lg:px-12 lg:py-12"
      >
        <h2 className="font-display text-6xl font-light leading-none text-balance lg:max-w-[28%] lg:text-8xl">
          <AnimatePresence mode="wait" initial={false}>
            <motion.a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              {project.title}
            </motion.a>
          </AnimatePresence>
        </h2>

        <div className="order-last flex w-full flex-col gap-3 lg:order-0 lg:w-[62%]">
          <div className="flex justify-end">
            <button
              type="button"
              aria-label="Previous project"
              onClick={() => go(-1)}
              className={arrowClass}
            >
              <PiArrowLeftThin />
            </button>
            <button
              type="button"
              aria-label="Next project"
              onClick={() => go(1)}
              className={arrowClass}
            >
              <PiArrowRightThin />
            </button>
          </div>
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            tabIndex={-1}
            aria-hidden
            className="relative block aspect-16/10 w-full overflow-hidden rounded shadow-rest"
          >
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={project.image}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={project.image}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1024px) 62vw, 100vw"
                  className="object-cover object-top"
                  draggable={false}
                />
              </motion.div>
            </AnimatePresence>
          </a>
          {/* Preload neighbours so changes feel instant. */}
          <div className="hidden" aria-hidden>
            {[next, prev].map((p) => (
              <Image key={p.image} src={p.image} alt="" width={16} height={10} />
            ))}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
