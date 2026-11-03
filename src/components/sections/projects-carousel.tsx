"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { ProjectCard, type Project } from "./project-card";

const buttonClass =
  "grid size-10 place-items-center rounded bg-black text-white shadow-rest transition-shadow hover:shadow-hover disabled:opacity-30";

export function ProjectsCarousel({ projects }: { projects: Project[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start" });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const sync = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", sync).on("reInit", sync);
    return () => {
      emblaApi.off("select", sync).off("reInit", sync);
    };
  }, [emblaApi, sync]);

  return (
    <div className="space-y-6">
      <div className="relative">
        <div ref={emblaRef} className="overflow-hidden p-1">
          <div className="flex gap-6">
            {projects.map((project) => (
              <div
                key={project.title}
                className="min-w-0 flex-[0_0_85%] md:flex-[0_0_calc((100%-3rem)/3)]"
              >
                <ProjectCard {...project} />
              </div>
            ))}
          </div>
        </div>
        {canNext && (
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/4 bg-linear-to-l from-white to-transparent md:block" />
        )}
      </div>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          aria-label="Previous"
          className={buttonClass}
          disabled={!canPrev}
          onClick={() => emblaApi?.scrollPrev()}
        >
          <FiChevronLeft />
        </button>
        <button
          type="button"
          aria-label="Next"
          className={buttonClass}
          disabled={!canNext}
          onClick={() => emblaApi?.scrollNext()}
        >
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
}
