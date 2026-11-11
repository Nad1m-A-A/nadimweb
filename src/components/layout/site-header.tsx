import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiteNav, type SiteNavLink } from "@/components/layout/site-nav";
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
};

/** The one header for every page: logo lockup, section links, socials and an optional Contact button. */
export function SiteHeader({ links, contact = false }: SiteHeaderProps) {
  return (
    <FadeIn
      as="header"
      trigger="mount"
      duration={0.6}
      data-site-header
      className="sticky top-0 z-50 border-b border-border bg-background"
    >
      <div className="flex flex-wrap items-center justify-between gap-x-6 px-4 md:grid md:h-16 md:grid-cols-[1fr_auto_1fr] md:px-10">
        <Link
          className="flex h-16 items-center md:h-auto"
          href="/"
          aria-label="Nadim Web, home"
        >
          <LogoWordmark className="h-7 w-auto text-foreground" />
        </Link>

        <div className="order-3 w-full pb-3 md:order-none md:w-auto md:pb-0">
          <SiteNav links={links} />
        </div>

        <div className="flex items-center gap-6 md:justify-self-end">
          {socialLinks.map(({ href, label, Icon }) => (
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
          ))}
          {contact && (
            <a
              href={contactHref}
              className="rounded-[2px] bg-accent-shift px-3 py-0.5 pt-1 leading-relaxed text-white"
            >
              Contact
            </a>
          )}
        </div>
      </div>
    </FadeIn>
  );
}
