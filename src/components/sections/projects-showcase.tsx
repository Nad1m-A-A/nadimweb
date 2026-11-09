"use client";

import Image from "next/image";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ProjectNameRotator } from "@/components/sections/project-name-rotator";
import { CareerBackdrop } from "@/components/ui/career-backdrop";
import type { Project } from "@/data/projects";

/** Quiet time (ms) that ends a wheel gesture, so one trackpad swipe = one step. */
const GESTURE_END_MS = 180;
const SWIPE_PX = 40;

/** Counts steps on wheel, swipe and arrow keys anywhere on the page. Unbounded, so the list can loop forever. */
function useStepInput() {
  const [steps, setSteps] = useState(0);
  const step = useRef((dir: number) => setSteps((s) => s + dir));

  useEffect(() => {
    const go = step.current;
    let inGesture = false;
    let gestureTimer: ReturnType<typeof setTimeout> | undefined;
    let touchY: number | null = null;

    const onWheel = (event: WheelEvent) => {
      clearTimeout(gestureTimer);
      gestureTimer = setTimeout(() => (inGesture = false), GESTURE_END_MS);
      if (inGesture || Math.abs(event.deltaY) < 4) return;
      inGesture = true;
      go(event.deltaY > 0 ? 1 : -1);
    };
    const onTouchStart = (event: TouchEvent) =>
      (touchY = event.touches[0].clientY);
    const onTouchEnd = (event: TouchEvent) => {
      if (touchY === null) return;
      const dy = touchY - event.changedTouches[0].clientY;
      touchY = null;
      if (Math.abs(dy) >= SWIPE_PX) go(dy > 0 ? 1 : -1);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown" || event.key === "ArrowRight") go(1);
      if (event.key === "ArrowUp" || event.key === "ArrowLeft") go(-1);
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(gestureTimer);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return steps;
}

export function ProjectsShowcase({ projects }: { projects: Project[] }) {
  const steps = useStepInput();
  const count = projects.length;
  const project = projects[((steps % count) + count) % count];

  return (
    <MotionConfig reducedMotion="user">
      <section
        aria-label="Projects"
        className="flex min-h-0 w-full flex-1 flex-col justify-end px-6 pb-8 lg:px-12 lg:pb-12"
      >
        {/* Fills the page (positioned against <main>), lit in the active project's colour. */}
        <CareerBackdrop color={project.color} image={project.image} />
        {/* Left column: names stacked above the image. */}
        <div className="flex flex-col gap-2">
          <div className="relative h-48 w-full lg:h-60 lg:max-w-[45%]">
            <ProjectNameRotator projects={projects} steps={steps} />
          </div>

          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            tabIndex={-1}
            aria-hidden
            // Screenshots are 1836×924. Width grows to fit that ratio; height stays what the old 31%-wide 16:10 box had.
            className="relative block aspect-[1836/924] w-full shrink-0 overflow-hidden rounded-[2px] shadow-rest lg:w-[38.5%]"
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={project.image}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={project.image}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1024px) 31vw, 100vw"
                  draggable={false}
                  className="object-cover object-top border-2 border-black"
                />
              </motion.div>
            </AnimatePresence>
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
          </a>
        </div>

        {/* Preload every image so steps feel instant. */}
        <div className="hidden" aria-hidden>
          {projects.map((p) => (
            <Image key={p.image} src={p.image} alt="" width={16} height={10} />
          ))}
        </div>
      </section>
    </MotionConfig>
  );
}
