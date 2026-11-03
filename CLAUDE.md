@AGENTS.md

# nadimweb

Personal site of Nadim Alaa, fullstack developer.

## Goal

Two audiences, two pages:

| Route | Audience | Purpose |
| --- | --- | --- |
| `/` | Clients | Multi-section page showing work and service packages. _Sections: TBD_ |
| `/career` | Recruiters | One well-designed projects carousel only. _Library: TBD (two candidates)_ |

## Stack

- Next.js 16 (App Router, `src/app`), React 19, TypeScript
- Tailwind CSS v4 (tokens in `src/app/globals.css`, `@theme inline`)
- Animation: GSAP + `@gsap/react` (registered in `src/lib/gsap/register.ts`), plus `motion` _(keeping both for now)_
- Light only, no dark mode (`next-themes` is currently forced dark; remove it in setup)
- `react-icons`, thin style
- Font: League Spartan via `next/font` (`src/lib/fonts.ts`)

## Conventions

- Visual rules live in [DESIGN.md](DESIGN.md); read it before building UI.
- Components: `src/components/{layout,sections,ui,icons,providers}`, kebab-case filenames.
- Path alias `@/` maps to `src/`.
- English only.
- Avoid custom CSS; use Tailwind utilities and tokens.
- Content: Nadim provides data in the next phase. Setup first.
- _TBD: deployment target._

## Commands

```bash
npm run dev
npm run build
npm run lint
```

## Working rules

- Do not push to the remote without asking Nadim first.
