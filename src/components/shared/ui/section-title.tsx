"use client";

import FadeIn from "@/components/shared/ui/fade-in";
import type { SectionTitleProps } from "@/types/ui";

export default function SectionTitle({
  children,
  className = "",
}: SectionTitleProps) {
  return (
    <FadeIn>
      <h2
        className={`w-fit text-foreground leading-3 pb-2 px-1 ${className}`}
      >
        {children}
      </h2>
    </FadeIn>
  );
}
