"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { LuChevronLeft, LuChevronRight, LuExternalLink, LuLoaderCircle } from "react-icons/lu";
import FadeIn from "@/components/ui/fade-in";
import SectionTitle from "@/components/ui/section-title";
import { projects as allProjects } from "@/data/projects";

const fadeEase = [0.22, 1, 0.36, 1] as const;
const fadeDuration = 0.3;

const projects = allProjects.filter((project) =>
    project.features.includes("projects"),
);

export default function ProjectsSection() {
    const [active, setActive] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isImageLoading, setIsImageLoading] = useState(true);

    const project = projects[active];
    const showArrows = projects.length > 1;

    const goTo = (index: number) => {
        if (isAnimating || index === active) return;

        const next = projects[index];
        setActive(index);

        if (!next.screenshot) {
            setIsImageLoading(false);
            setIsAnimating(false);
            return;
        }

        setIsImageLoading(true);
        setIsAnimating(true);
    };

    const goPrev = () => {
        goTo((active - 1 + projects.length) % projects.length);
    };

    const goNext = () => {
        goTo((active + 1) % projects.length);
    };

    return (
        <section id="projects" className="section inner-section">
            <div className="app_container">
                <SectionTitle>Projects</SectionTitle>

                <FadeIn delay={0.3} className="mt-8 space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="max-w-125 w-full -ml-8">
                            <div className="relative aspect-3/2 w-full">
                                {isImageLoading && (
                                    <div
                                        className="absolute inset-0 z-10 flex items-center justify-center"
                                        aria-hidden
                                    >
                                        <LuLoaderCircle
                                            className="size-7 animate-spin text-accent"
                                            aria-hidden
                                        />
                                    </div>
                                )}
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={active}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: isImageLoading ? 0 : 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: fadeDuration, ease: fadeEase }}
                                        className="absolute inset-0"
                                    >
                                        {project.screenshot ? (
                                            <Image
                                                src={project.screenshot}
                                                alt={project.title ?? project.name}
                                                fill
                                                sizes="500px"
                                                onLoad={() => {
                                                    setIsImageLoading(false);
                                                    setIsAnimating(false);
                                                }}
                                                className={`object-cover${project.available === false ? " opacity-30 blur-[6px]" : ""}`}
                                            />
                                        ) : null}
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {showArrows && (
                                <div
                                    className="mt-4 flex gap-2 pl-8"
                                    role="tablist"
                                    aria-label="Project indicators"
                                >
                                    {projects.map((item, index) => (
                                        <button
                                            key={item.name}
                                            type="button"
                                            role="tab"
                                            aria-label={`Go to ${item.name}`}
                                            aria-selected={index === active}
                                            disabled={isAnimating}
                                            onClick={() => goTo(index)}
                                            className={`h-0.5 flex-1 cursor-pointer transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${index === active
                                                ? "bg-accent"
                                                : "bg-accent/25 hover:bg-accent/50"
                                                }`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {showArrows && (
                            <div className="flex shrink-0 flex-col gap-2">
                                <button
                                    type="button"
                                    aria-label="Next project"
                                    disabled={isAnimating}
                                    onClick={goNext}
                                    className="cursor-pointer text-accent transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    <LuChevronRight className="size-6" aria-hidden />
                                </button>
                                <div className="h-px w-full bg-accent" />
                                <button
                                    type="button"
                                    aria-label="Previous project"
                                    disabled={isAnimating}
                                    onClick={goPrev}
                                    className="cursor-pointer text-accent transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    <LuChevronLeft className="size-6" aria-hidden />
                                </button>
                            </div>
                        )}
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: fadeDuration, ease: fadeEase }}
                            className="space-y-4"
                        >
                            <FadeIn>
                                <h3 className="text-foreground mt-10">
                                    {
                                        project.url ? (
                                            <a
                                                href={project.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 transition-opacity hover:opacity-80"
                                            >
                                                {project.title ?? project.name}
                                                <LuExternalLink className="size-5 shrink-0" aria-hidden />
                                            </a>
                                        ) : (
                                            <span className="inline-flex items-center gap-2">
                                                {project.title ?? project.name}
                                            </span>
                                        )
                                    }
                                </h3>
                            </FadeIn>

                            {project.highlights && project.highlights.length > 0 && (
                                <ul className="list-disc space-y-4 pl-4">
                                    {project.highlights.map((item) => (
                                        <FadeIn
                                            key={item}
                                            className="text-body text-muted"
                                        >
                                            <li>
                                                {item}
                                            </li>
                                        </FadeIn>
                                    ))}
                                </ul>
                            )}

                            {project.repo && (
                                <FadeIn>
                                    <a
                                        href={project.repo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block cursor-pointer rounded-[2px] bg-accent-shift px-3 py-1.5 text-label font-medium"
                                    >
                                        View on GitHub
                                    </a>
                                </FadeIn>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </FadeIn>
            </div>
        </section >
    );
}
