"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
import { BrowserTab } from "@/components/ui/browser-tab";
import { ProjectTags } from "@/components/ui/project-tags";
import type { Project } from "@/data/projects";

export function ProjectsCarousel({ projects }: { projects: Project[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement) return;
      if (event.key === "ArrowLeft") emblaApi.scrollPrev();
      if (event.key === "ArrowRight") emblaApi.scrollNext();
    };
    emblaApi.on("select", onSelect);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      emblaApi.off("select", onSelect);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [emblaApi]);

  const active = projects[selected];

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded bg-gray/10 shadow-rest">
        <div className="flex items-center gap-4 px-3 pt-3">
          <div className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-gray/30" />
            <span className="size-2.5 rounded-full bg-gray/30" />
            <span className="size-2.5 rounded-full bg-gray/30" />
          </div>
          <div role="tablist" className="flex min-w-0 flex-1 gap-1">
            {projects.map((project, index) => (
              <BrowserTab
                key={project.title}
                title={project.title}
                active={index === selected}
                onSelect={() => emblaApi?.scrollTo(index)}
              />
            ))}
          </div>
        </div>
        <div className="bg-white px-3 py-2">
          <input
            readOnly
            aria-label="Project address"
            value={active.url}
            className="w-full rounded bg-gray/10 px-3 py-1.5 text-sm text-gray outline-none focus:text-black"
          />
        </div>
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {projects.map((project, index) => (
              <a
                key={project.title}
                href={project.url}
                target="_blank"
                rel="noreferrer"
                tabIndex={index === selected ? 0 : -1}
                aria-hidden={index !== selected}
                className="relative block aspect-16/10 min-w-0 flex-[0_0_100%]"
              >
                <Image
                  src={project.image}
                  alt={`${project.title} homepage`}
                  fill
                  sizes="(min-width: 896px) 896px, 100vw"
                  className="object-cover object-top"
                  draggable={false}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-3 text-center">
        <p className="mx-auto max-w-xl">{active.summary}</p>
        <ProjectTags tags={active.tags} />
      </div>
    </div>
  );
}
