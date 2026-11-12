import SiteHeader from "@/components/shared/layout/site-header";
import Hero from "@/components/shared/hero/hero";
import Overview from "@/components/career/overview";
import Frontend from "@/components/career/frontend";
import Backend from "@/components/career/backend";
import Devops from "@/components/career/devops";
import Stack from "@/components/career/stack";
import Projects from "@/components/shared/projects";
import { careerNavLinks } from "@/data/nav";
import { careerHeroTitle } from "@/data/hero";
import { careerMetadata } from "@/data/metadata";

export const metadata = careerMetadata;

export default function CareerPage() {
  return (
    <>
      <SiteHeader links={careerNavLinks} social />
      <Hero title={careerHeroTitle} />
      <Overview />
      <Frontend />
      <Backend />
      <Devops />
      <Stack />
      <Projects />
    </>
  );
}
