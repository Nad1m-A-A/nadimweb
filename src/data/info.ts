import { FaGithub, FaLinkedin } from "react-icons/fa";

const email = {
  title: "Email",
  href: "mailto:nadim.alaa@hotmail.com",
  label: "nadim.alaa@hotmail.com",
} as const;

const github = {
  title: "GitHub",
  href: "https://github.com/Nad1m-A-A",
  label: "github.com/Nad1m-A-A",
} as const;

const location = {
  title: "Location",
  label: "United Arab Emirates",
} as const;

const linkedin = {
  title: "LinkedIn",
  href: "https://www.linkedin.com/in/nadimweb/",
  label: "linkedin.com/in/nadimweb",
} as const;

export const infoItems = [email, github, location, linkedin];

export const contactHref = email.href;

export const socialLinks = [
  { href: github.href, label: github.title, Icon: FaGithub },
  { href: linkedin.href, label: linkedin.title, Icon: FaLinkedin },
];
