@AGENTS.md

# nadimweb

Personal site of Nadim Alaa, fullstack developer.

## Goal

Two audiences, two pages:

| Route | Audience | Purpose |
| --- | --- | --- |
| `/` | Clients | Multi-section page showing work and service packages. _Sections: TBD_ |
| `/career` | Recruiters | One minimal projects showcase only: large full-colour image bottom-right, arrow controls above it, project name in large thin serif on the left. No indicators, descriptions or tags. Quiet, never showy. |

## Stack

- Next.js 16 (App Router, `src/app`), React 19, TypeScript
- Tailwind CSS v4 (tokens in `src/app/globals.css`, `@theme inline`)
- Animation: GSAP + `@gsap/react` (registered in `src/lib/gsap/register.ts`), plus `motion` _(keeping both for now)_
- Light only, no dark mode (`next-themes` is currently forced dark; remove it in setup)
- `react-icons`, thin style
- Fonts via `next/font` (`src/lib/fonts.ts`): League Spartan for UI (`font-sans`), Cormorant Garamond Light for display/project names (`font-display`)
- Carousel: no library. Build the showcase with React state + GSAP/motion (remove `swiper` once replaced)

## Conventions

- Visual rules live in [DESIGN.md](DESIGN.md); read it before building UI.
- Components: `src/components/{layout,sections,ui,icons,providers}`, kebab-case filenames.
- When writing JSX, consider whether it should be its own component. Extract when:
  1. There are so many sibling elements that it gets hard to maintain.
  2. It will likely be reused in multiple places.
