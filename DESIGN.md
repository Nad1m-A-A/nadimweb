# Design

The home page (`/`) is the reference for the whole site. Every page follows these rules.

## Colour

Tokens live in `src/app/globals.css`

| Token | Value | Use |
| --- | --- | --- |
| `background` | `#fffdf8` | Page background |
| `foreground` | `#3d3929` | Main text |
| `muted` | `#8a8278` | Secondary text, body copy under headings |
| `surface` | `#f7f3eb` | Cards and soft fills (often `bg-surface/50`) |
| `accent` | `#4274D9` | Buttons, title highlight, icons, active states |
| `border` | `foreground` at 12% in srgb mixed with `background` | All lines and dividers |

- Text selection: accent at 35%.
- `live` `#2e9e6b`: only for tiny "live" markers (career references). Never for text or fills.

## Type

Fonts live in `src/lib/fonts.ts`; `--font-sans`, `--font-serif` and `--font-num` are wired in `src/app/globals.css` (`@theme inline`). The root layout applies the sans on `html`.

| Role | Font | Use |
| --- | --- | --- |
| Text | Instrument Sans (400-600) | Body, nav, labels, buttons, tech names, chips |
| Headings | Instrument Serif (400) | `h1`, `h2`, `h3`, set globally in `globals.css` |
| Numerals | Instrument Serif (`font-num`) | Large step and metric numbers, accent colour, `tabular-nums` |

- Do not use monospace or `font-mono` anywhere.
- Headings are serif at weight 400 with a global size bump (serif runs small): `h1` clamp 2.75-4.5rem, `h2` 2.5rem, `h3` 1.5rem. The rules are unlayered, so utility sizes and weights on headings are ignored.
- Section title (`SectionTitle`): the `h2`, no bar.
- Item headings: `h3`. Text next to numbers (about questions) is `text-xl sm:text-2xl`.
- Body: `text-base sm:text-lg leading-7 sm:leading-8 text-muted`, max width about `max-w-2xl`; lead paragraphs `text-lg sm:text-xl`.
- Labels: `text-base text-muted`.

## Layout

- Section shell: `.section` (`py-20`, background) around `.app_container` (`mx-auto max-w-3xl px-6 md:px-0 space-y-8`).
- Sections after the first get `.inner-section`: a 1px `border` line as wide as the content, on top.
- Each section starts with a `SectionTitle`.
- One sticky header on every page (`SiteHeader`, `h-16`, bottom border): logo and "Nadim Web" side by side on the left, section links in the middle (`SiteNav`, active link follows scroll), GitHub, LinkedIn and Contact on the right. Pages only pass their links. On phones the links drop to a second row.
- Section links are plain `#id` anchors with smooth scrolling. `.section` has a scroll margin (`--header-h`) so the section title lands just under the header. The last section is tall enough to reach that spot.

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

## Voice`

- Minimal wording.
- English only.

## Career page

Same look as home; only the content differs.

- Sections instead of tabs: Overview, Frontend, Backend, DevOps, Stack, each a `.section` with a `SectionTitle`.
- Hero uses the same perspective grid as home.
- Steps are numbered rows with a large `font-num` number, divided by thin lines. Stack rows pair an uppercase label with names separated by muted serif slashes. References are link pills with a small `live` marker.
- Reveal order inside a section: title, then content with `delay` from 0.3s, staggered.
