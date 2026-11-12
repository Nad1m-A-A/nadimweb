import SiteHeader from "@/components/shared/layout/site-header";
import Hero from "@/components/shared/hero/hero";
import Projects from "@/components/shared/projects";
import { homeNavLinks } from "@/data/nav";

export default function Home() {
  return (
    <>
      <SiteHeader links={homeNavLinks} contact />
      <Hero />
      <Projects />
    </>
  );
}
