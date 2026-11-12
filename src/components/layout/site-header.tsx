"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiteNav, type SiteNavLink } from "@/components/layout/site-nav";
import { SiteMobileNav } from "@/components/layout/site-mobile-nav";
import { LogoWordmark } from "@/components/icons/logo-wordmark";
import FadeIn from "@/components/ui/fade-in";
import { infoItems } from "@/data/info";

const itemProp = (title: string, prop: "href") => {
  const item = infoItems.find((entry) => entry.title === title);
  return item && prop in item ? item[prop] : "";
};

const socialLinks = [
  { href: itemProp("GitHub", "href"), label: "GitHub", Icon: FaGithub },
  { href: itemProp("LinkedIn", "href"), label: "LinkedIn", Icon: FaLinkedin },
];

const contactHref = itemProp("Email", "href");

type SiteHeaderProps = {
  links: readonly SiteNavLink[];
  /** Show the Contact button. */
  contact?: boolean;
  /** Show GitHub and LinkedIn. */
  social?: boolean;
};

/** The one header for every page: logo lockup, section links, socials and an optional Contact button. */
export function SiteHeader({
  links,
  contact = false,
  social = false,
}: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const solid = scrolled;

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <FadeIn
      as="header"
      trigger="mount"
      duration={0.6}
      data-site-header
      data-scrolled={solid ? "" : undefined}
      className={`sticky top-0 z-50 border-b transition-[background-color,border-color] duration-300 ${
        solid ? "border-border bg-background" : "border-transparent bg-transparent"
      }`}
    >
      <div
        className={`flex h-16 items-center justify-between gap-x-6 transition-[padding] duration-300 md:grid md:grid-cols-[1fr_auto_1fr] ${
          solid ? "px-4 md:px-10" : "px-8 md:px-24"
        }`}
      >
        <Link
          className="flex items-center w-fit"
          href="/"
          aria-label="Nadim Web, home"
        >
          <LogoWordmark className="h-6 w-auto text-foreground" />
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
                  rel="noreferrer"
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
              className="rounded-[2px] bg-accent-shift px-3 py-1 text-label font-medium text-white"
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
