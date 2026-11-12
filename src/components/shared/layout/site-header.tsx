"use client";

import Image from "next/image";
import Link from "next/link";
import SiteNav from "@/components/shared/layout/site-nav";
import SiteMobileNav from "@/components/shared/layout/site-mobile-nav";
import FadeIn from "@/components/shared/ui/fade-in";
import { contactHref, socialLinks } from "@/data/info";
import { useScrolledPast } from "@/hooks/use-scrolled-past";
import type { SiteHeaderProps } from "@/types/nav";

/** The one header for every page: logo lockup, section links, socials and an optional Contact button. */
export default function SiteHeader({
  links,
  contact = false,
  social = false,
}: SiteHeaderProps) {
  const scrolled = useScrolledPast(8);

  return (
    <FadeIn
      as="header"
      trigger="mount"
      duration={0.6}
      data-site-header
      data-scrolled={scrolled ? "" : undefined}
      className={`sticky top-0 z-50 border-b transition-[background-color,border-color] duration-300 ${
        scrolled
          ? "border-border bg-background"
          : "border-transparent bg-transparent"
      }`}
    >
      <div
        className={`flex h-16 items-center justify-between gap-x-6 transition-[padding] duration-300 md:grid md:grid-cols-[1fr_auto_1fr] ${
          scrolled ? "px-4 md:px-10" : "px-8 md:px-24"
        }`}
      >
        <Link
          className="flex w-fit items-center"
          href="/"
          aria-label="Nadim Web, home"
        >
          <Image
            src="/logo/wordmark-light.svg"
            alt=""
            width={178}
            height={32}
            priority
            className="h-5 w-auto sm:h-6"
          />
        </Link>

        <div className="hidden md:block">
          <SiteNav links={links} />
        </div>

        <div className="flex items-center gap-6 md:justify-self-end">
          {social
            ? socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="hidden text-accent transition-opacity duration-300 ease-calm hover:opacity-70 sm:block"
                >
                  <Icon className="size-5" />
                </a>
              ))
            : null}
          {contact ? (
            <a
              href={contactHref}
              className="bg_accent_shift rounded-[2px] px-3 py-1 text_label font-medium text-white"
            >
              Contact
            </a>
          ) : null}
          <SiteMobileNav links={links} />
        </div>
      </div>
    </FadeIn>
  );
}
