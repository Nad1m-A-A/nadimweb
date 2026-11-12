import type { HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

export type FadeInProps = {
  children: ReactNode;
  /** Fade duration in seconds. */
  duration?: number;
  delay?: number;
  className?: string;
  /**
   * `inView` — lazy scroll reveal (sections).
   * `mount` — fade on first render (sticky chrome).
   */
  trigger?: "inView" | "mount";
  as?: "div" | "header";
} & Omit<
  HTMLMotionProps<"div">,
  | "children"
  | "initial"
  | "whileInView"
  | "animate"
  | "transition"
  | "viewport"
>;

export type SectionTitleProps = {
  children: ReactNode;
  className?: string;
};

export type StageCardProps = {
  name: string;
  caption?: string;
  image?: string;
  href: string;
};

export type HeroProps = {
  title?: string;
  background?: ReactNode;
};

export type SectionProps = {
  id: string;
  label: string;
  /** Sections after the first get the border divider line. */
  divided?: boolean;
  className?: string;
  children: ReactNode;
};
