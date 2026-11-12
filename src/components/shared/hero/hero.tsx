import HeroPerspectiveGrid from "@/components/shared/hero/hero-perspective-grid";
import SpecialtyRotator from "@/components/shared/hero/specialty-rotator";
import FadeIn from "@/components/shared/ui/fade-in";
import { homeHeroTitle } from "@/data/hero";
import type { HeroProps } from "@/types/ui";

export default function Hero({
  title = homeHeroTitle,
  background = <HeroPerspectiveGrid />,
}: HeroProps) {
  return (
    <section
      id="intro"
      data-site-hero
      className="-mt-(--header-h) border-b border-border"
    >
      <div className="relative flex min-h-[61.5vh] flex-1 flex-col items-center justify-center gap-4 overflow-hidden pt-(--header-h) text-center">
        {background}
        <FadeIn duration={0.8} delay={0.12} trigger="mount">
          <h1 className="relative z-10">{title}</h1>
        </FadeIn>
        <div className="relative z-10 flex flex-col items-start justify-center gap-2 whitespace-nowrap md:flex-row">
          <FadeIn duration={0.8} delay={0.2} trigger="mount">
            <p className="shrink-0 text_lead">Specialized in</p>
          </FadeIn>
          <FadeIn duration={0.8} delay={0.2} trigger="mount">
            <SpecialtyRotator />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
