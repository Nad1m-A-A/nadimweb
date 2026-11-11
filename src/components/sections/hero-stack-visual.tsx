import FadeIn from "@/components/ui/fade-in";
import { stackItems } from "@/data/stack";

export function HeroStackVisual() {
  return (
    <div className="relative z-10 w-full border-b border-border">
      <div className="grid grid-cols-2 md:grid-cols-4">
        {stackItems.map(({ label, Logo }, index) => (
          <div
            key={label}
            className="flex items-center justify-center gap-2 border-border px-3 py-5 max-md:border-r max-md:border-b max-md:even:border-r-0 max-md:[&:nth-child(n+7)]:border-b-0 md:border-r md:border-b md:[&:nth-child(4n)]:border-r-0 md:[&:nth-child(n+5)]:border-b-0 sm:gap-3 sm:px-4 sm:py-6 lg:px-6 lg:py-8"
          >
            <FadeIn trigger="mount" delay={index * 0.1} className="flex items-center justify-center gap-2">
              <Logo color="currentColor" className="size-6 shrink-0 sm:size-7" />
              <span className="sr-only">{label}</span>
              <span className="text-label font-medium text-foreground">
                {label}
              </span>
            </FadeIn>
          </div>
        ))}
      </div>
    </div>
  );
}
