# Design

The home page (`/`) is the reference for the whole site. Every page, `/career` included, follows these rules.

## Colour

Light only. Tokens live in `src/app/globals.css` (`:root` + `@theme inline`).

| Token | Value | Use |
| --- | --- | --- |
| `background` | `#fffdf8` | Page background |
| `foreground` | `#3d3929` | Main text |
| `muted` | `#8a8278` | Secondary text, body copy under headings |
| `surface` | `#f7f3eb` | Cards and soft fills (often `bg-surface/50`) |
| `accent` | `#4274D9` | Buttons, title highlight, icons, active states |
| `border` | `foreground` at 12% (`color-mix`) | All lines and dividers |

- Text selection: accent at 35%.
- No other colours. No gradients except the button hover below.

> These tokens and the `.section`, `.inner-section`, `.app_container` and `.bg-accent-shift` utilities were removed from `globals.css` in commit `248c9d5`. Restore them from `248c9d5^:src/app/globals.css` (light values only, no `.dark` block).

## Type

- One font: League Spartan (`src/lib/fonts.ts`), weights 400-700. No serif.
- Section title (`SectionTitle`): `text-3xl sm:text-4xl font-semibold tracking-tight`, with a thin accent highlighter bar behind the text.
- Item headings: `text-base sm:text-lg font-medium`; project names `text-xl sm:text-2xl font-semibold`.
- Body: `text-sm sm:text-base leading-7 text-muted`, max width about `max-w-2xl`.
- Labels: `text-sm text-muted`.

## Layout

- Section shell: `.section` (`py-20`, background) around `.app_container` (`mx-auto max-w-3xl px-6 md:px-0 space-y-10`).
- Sections after the first get `.inner-section`: a centered 1px accent line at 30% opacity, 80% wide, on top.
- Each section starts with a `SectionTitle`.
- Sticky header: `h-16`, name on the left, links in the middle, icons and the Contact button on the right; bottom border.

## Surfaces

- Thin borders, not shadows: 1px `border-border` for grids, list rows (`divide-y`) and cards.
- Radius: 2px everywhere (`rounded-[2px]`).
- Hover on cards: border shifts to `accent/40`.
- Primary button: accent fill with the moving-gradient hover (`.bg-accent-shift`), white or foreground text, `px-3 py-2`, 2px radius.
- Icons: `react-icons`, Lucide set (`react-icons/lu`) for UI, `si`/`fa` for brand logos; usually `text-accent`, hover `opacity-70`.

## Motion

- Reveal with `FadeIn` (`src/components/ui/fade-in.tsx`): opacity only, never slide. `inView` for sections, `mount` for the header and hero; stagger with `delay`.
- Calm ease `cubic-bezier(0.22, 1, 0.36, 1)` (`ease-calm`), 300-700ms.
- Content swaps (accordion panels, project changes): short fade with `motion` `AnimatePresence`.
- Rotating text: GSAP (`specialty-rotator.tsx` is the pattern).
- Respect `prefers-reduced-motion`.

## Career page

- Same look as the home page.
- Navbar: the logo from `dev-stamp/` (`logo-black.png`, see `DevStamp.tsx`), plus links to [GitHub](https://github.com/Nad1m-A-A), [LinkedIn](https://www.linkedin.com/in/nadim-alaa-955356276/) and home `/`.
- One section:
  - Bottom: a carousel with the active item centered. Use the carousel code the owner supplies; no carousel library.
  - Above it: a short project block with the name, tags and a brief description of the active item.
- Keyboard: left/right arrows move the carousel; controls have visible focus and aria-labels.

## Voice

- Minimal wording.
- English only.
