"use client";

// Coverflow carousel adapted from Skiper UI "skiper49" (https://skiper-ui.com),
// built with Swiper (https://swiperjs.com). Attribution to Skiper UI required.

import Image from "next/image";
import { motion, MotionConfig } from "motion/react";
import { useState } from "react";
import { EffectCoverflow, Keyboard, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { ProjectTags } from "@/components/ui/project-tags";
import type { Project } from "@/data/projects";
import { displayFont } from "@/lib/fonts";

export function ProjectsCarousel({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState(0);
  const active = projects[selected];

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="flex min-h-svh w-full flex-col"
      >
        <div className="ml-auto max-w-md space-y-4 px-6 pt-8 text-right">
          <p className="text-lg text-gray">{active.summary}</p>
          <ProjectTags tags={active.tags} />
        </div>
        <Swiper
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView="auto"
          loop
          keyboard={{ enabled: true }}
          coverflowEffect={{
            rotate: 40,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Keyboard, Pagination]}
          onRealIndexChange={(swiper) => setSelected(swiper.realIndex)}
          className="mt-auto w-full h-[min(56vw,420px)] pb-12! [&_.swiper-pagination-bullet]:h-0.5! [&_.swiper-pagination-bullet]:w-8! [&_.swiper-pagination-bullet]:rounded-none! [&_.swiper-pagination-bullet]:bg-black!"
        >
          {projects.map((project, index) => (
            <SwiperSlide key={project.title} className="w-[min(80vw,640px)]!">
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="relative flex size-full items-center justify-center overflow-hidden rounded p-8 text-center"
              >
                <Image
                  src={project.image}
                  alt=""
                  fill
                  priority={index === 0}
                  sizes="(min-width: 800px) 640px, 80vw"
                  className="object-cover object-top grayscale"
                  draggable={false}
                />
                <span className="absolute inset-0 bg-black/75" />
                <h2
                  className={`${displayFont.className} relative text-balance text-3xl text-white md:text-5xl`}
                >
                  {project.title}
                </h2>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </MotionConfig>
  );
}
