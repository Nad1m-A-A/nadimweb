import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import FadeIn from "@/components/ui/fade-in";
import { infoItems } from "@/data/info";
import logo from "../../../dev-stamp/logo-black.png";

const linkHref = (title: string) => {
  const item = infoItems.find((entry) => entry.title === title);
  return item && "href" in item ? item.href : "";
};

const socialLinks = [
  { href: linkHref("GitHub"), label: "GitHub", Icon: FaGithub },
  { href: linkHref("LinkedIn"), label: "LinkedIn", Icon: FaLinkedin },
];

export function CareerHeader() {
  return (
    <FadeIn
      as="header"
      trigger="mount"
      duration={0.6}
      className="sticky top-0 z-50 border-b border-border bg-background"
    >
      <div className="flex h-16 items-center justify-between px-4 md:px-10">
        <Link href="/career" aria-label="Nadim Alaa">
          <Image src={logo} alt="" className="h-8 w-auto" priority />
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-muted transition-colors duration-300 ease-calm hover:text-foreground"
          >
            Home
          </Link>
          {socialLinks.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="text-accent transition-opacity duration-300 ease-calm hover:opacity-70"
            >
              <Icon className="size-5" />
            </a>
          ))}
        </nav>
      </div>
    </FadeIn>
  );
}
