"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { LuChevronLeft, LuChevronRight, LuExternalLink, LuLoaderCircle } from "react-icons/lu";
import FadeIn from "@/components/ui/fade-in";
import SectionTitle from "@/components/ui/section-title";

const fadeEase = [0.22, 1, 0.36, 1] as const;
const fadeDuration = 0.3;

type Project = {
    name: string;
    highlights: string[] | null;
    url: string | null;
    repo: string | null;
    image: string | null;
    available: boolean;
};

const projects: Project[] = [
    {
        name: "Multi-Business Dashboard",
        highlights: [
            "Aggregates separate enterprise systems into one authenticated surface Using Inertia.js",
            "Credentials and enterprise system URLs never reach the browser; all fetches go through an authorized server proxy",
            "Role-based passcode auth with request auditing for non-admin roles",
            "Layered permissions (views / actions / businesses) enforced on the API and mirrored in the UI",
            "Same API contract in demo and production, with synthetic data swaps in without changing the frontend",
            "Fully documented, with a bilingual user guide and in-app developer guide for contributors",
        ],
        url: "http://dashboards.nadimweb.com",
        repo: "https://github.com/Nad1m-A-A/dashboards-demo",
        image: "/dashboards-mockup.webp",
        available: true,
    },
    {
        name: "Jewelry Factory Enterprise System",
        highlights: [
            "End-to-end enterprise system for gold manufacturing with dedicated modules for inventory, HR, production, and order tracking",
            "Minimizes mistakes by automating complex and repetitive workflows",
            "Delivers precise material tracking and real-time metrics across all production stages",
            "Seamless, secure in-app subscription payments and renewals"
        ],
        url: "https://gold.nadimweb.com",
        repo: null,
        image: "/erp-mockup.webp",
        available: true,
    },
    {
        name: "Carne Media",
        highlights: [
            "Next.js app with full Arabic/English localization and locale-aware routing",
            "SEO-ready structure with metadata, crawlable pages, and bilingual content",
            "Marketing site for programs, founder story, and journal — built for a Dubai media training brand",
        ],
        url: "https://carnemedia.ae/en",
        repo: null,
        image: "/carne-mockup.png",
        available: true,
    },
    {
        name: "CodeTen Software Solutions",
        highlights: [
            "React SPA with a multi-page marketing architecture for enterprise systems, healthcare, e-invoicing, and apps",
            "Full Arabic/English bilingual experience across the site",
            "Positions Code 10 as a UAE-local software house with solution and client storytelling",
        ],
        url: "https://codeten.net/en",
        repo: null,
        image: "/code10-mockup.webp",
        available: true,
    },
];

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

        if (!next.image) {
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

                <FadeIn delay={0.3} className="mt-10 space-y-4">
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
                                        {project.image ? (
                                            <Image
                                                src={project.image}
                                                alt={project.name}
                                                fill
                                                sizes="500px"
                                                onLoad={() => {
                                                    setIsImageLoading(false);
                                                    setIsAnimating(false);
                                                }}
                                                className={`object-cover${project.available ? "" : " opacity-30 blur-[6px]"}`}
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
                                                {project.name}
                                                <LuExternalLink className="size-5 shrink-0" aria-hidden />
                                            </a>
                                        ) : (
                                            <span className="inline-flex items-center gap-2">
                                                {project.name}
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
                                            className="text-base leading-7 text-muted sm:text-lg sm:leading-8"
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
                                        className="inline-block cursor-pointer rounded-[2px] bg-accent-shift px-3 py-2 pt-2.5 leading-relaxed"
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
