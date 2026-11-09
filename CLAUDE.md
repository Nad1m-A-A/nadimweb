@AGENTS.md

# nadimweb

Personal site of Nadim Alaa, fullstack developer.

## Goal

Two audiences, two pages:

| Route     | Audience   | Purpose                                                               |
| --------- | ---------- | --------------------------------------------------------------------- |
| `/`       | Clients    | Multi-section page showing work and service packages. _Sections: TBD_ |
| `/career` | Recruiters | One well-designed projects carousel only. _Library_                   |

## Stack

- Next.js 16, React 19, TypeScript
- Tailwind CSS v4
- Animation: GSAP + `@gsap/react` (registered in `src/lib/gsap/register.ts`), plus `motion`

## Conventions

- Visual rules live in [DESIGN.md](DESIGN.md); read it before building UI.
- Components: `src/components/{layout,sections,ui,icons,providers}`, kebab-case filenames.
- When writing JSX, consider whether it should be its own component. Extract when:
  1. There are so many sibling elements that it gets hard to maintain.
  2. It will likely be reused in multiple places.
