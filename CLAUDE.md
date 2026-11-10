@AGENTS.md

# nadimweb

Personal site of Nadim Alaa, fullstack web developer.

## Goal

Two audiences, two pages. The home page's look is the design for the whole site.

| Route | Audience | Purpose |
| --- | --- | --- |
| `/` | Clients | Multi-section page showing work and service packages. _Sections: TBD_ |
| `/career` | Recruiters | |

## Stack

- Next.js 16 (App Router, `src/app`), React 19, TypeScript
- Tailwind CSS v4 (tokens in `src/app/globals.css`, `@theme inline`)

- Visual rules live in [DESIGN.md](DESIGN.md); read it before building UI.
- Components: `src/components/{layout,sections,ui,icons,providers}`, kebab-case filenames.
- When writing JSX, consider whether it should be its own component. Extract when:
  1. There are so many sibling elements that it gets hard to maintain.
  2. It will likely be reused in multiple places.
- One component per JSX/TSX file. Never define a second component in the same file; move it to its own file.
