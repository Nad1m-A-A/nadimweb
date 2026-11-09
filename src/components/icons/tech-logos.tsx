import type { IconBaseProps } from "react-icons";
import { LuInfinity } from "react-icons/lu";
import {
  SiDocker,
  SiGit,
  SiInertia,
  SiJsonwebtokens,
  SiLaravel,
  SiNestjs,
  SiNextdotjs,
  SiReact,
  SiTypescript,
} from "react-icons/si";

type LogoProps = IconBaseProps;

export function ReactLogo(props: LogoProps) {
  return <SiReact aria-label="React" color="#61DAFB" {...props} />;
}

export function LaravelLogo(props: LogoProps) {
  return <SiLaravel aria-label="Laravel" color="#FF2D20" {...props} />;
}

export function InertiaLogo(props: LogoProps) {
  return <SiInertia aria-label="Inertia.js" color="#9553E9" {...props} />;
}

export function NextjsLogo(props: LogoProps) {
  return <SiNextdotjs aria-label="Next.js" color="currentColor" {...props} />;
}

export function TypescriptLogo(props: LogoProps) {
  return <SiTypescript aria-label="TypeScript" color="#3178C6" {...props} />;
}

export function DockerLogo(props: LogoProps) {
  return <SiDocker aria-label="Docker" color="#2496ED" {...props} />;
}

export function GitLogo(props: LogoProps) {
  return <SiGit aria-label="Git" color="#F05032" {...props} />;
}

export function CicdLogo(props: LogoProps) {
  return <LuInfinity aria-label="CI/CD" color="currentColor" {...props} />;
}

export function NestjsLogo(props: LogoProps) {
  return <SiNestjs aria-label="NestJS" color="#E0234E" {...props} />;
}

export function JwtLogo(props: LogoProps) {
  return <SiJsonwebtokens aria-label="JWT" color="currentColor" {...props} />;
}