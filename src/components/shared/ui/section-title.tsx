import FadeIn from "@/components/shared/ui/fade-in";
import type { SectionTitleProps } from "@/types/ui";

export default function SectionTitle({
  children,
  className = "",
}: SectionTitleProps) {
  return (
    <FadeIn>
      <h2 className={`w-fit px-1 pb-2 leading-3 text-foreground ${className}`}>
        {children}
      </h2>
    </FadeIn>
  );
}
