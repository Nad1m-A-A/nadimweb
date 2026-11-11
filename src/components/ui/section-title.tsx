"use client";

import type { ReactNode } from "react";
import FadeIn from "@/components/ui/fade-in";

type SectionTitleProps = {
  children: ReactNode;
  className?: string;
};

export default function SectionTitle({
  children,
  className = "",
}: SectionTitleProps) {
  return (
    <FadeIn>
      <h2
        className={`w-fit text-3xl font-semibold tracking-wide text-black sm:text-4xl leading-3 pb-2 px-1 ${className}`}
      >
        {children}
      </h2>
    </FadeIn>
  );
}
