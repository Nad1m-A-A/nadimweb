import {
  CicdLogo,
  DockerLogo,
  InertiaLogo,
  JwtLogo,
  LaravelLogo,
  NestjsLogo,
  NextjsLogo,
  TypescriptLogo,
} from "@/components/icons/tech-logos";

export const stackItems = [
  { label: "Next.js", Logo: NextjsLogo },
  { label: "TypeScript", Logo: TypescriptLogo },
  { label: "Laravel", Logo: LaravelLogo },
  { label: "Inertia.js", Logo: InertiaLogo },
  { label: "NestJS", Logo: NestjsLogo },
  { label: "JWT", Logo: JwtLogo },
  { label: "Docker", Logo: DockerLogo },
  { label: "CI/CD", Logo: CicdLogo },
] as const;
