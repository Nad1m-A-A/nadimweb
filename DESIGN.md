# Design

The home page (`/`) is the reference for the whole site. Every page follows these rules.

## Colour

Tokens live in `src/app/globals.css`

| Token | Value | Use |
| --- | --- | --- |
| `background` | `#fffdf8` | Page background |
| `foreground` | `#3d3929` | Main text |
| `muted` | `#6f685e` | Secondary text, body copy under headings |
| `surface` | `#f7f3eb` | Cards and soft fills (often `bg-surface/50`) |
| `accent` | `#4274D9` | Buttons, title highlight, icons, active states |
| `border` | `foreground` at 12% in srgb mixed with `background` | All lines and dividers |

- Text selection: solid accent background, white text.
- `live` `#2e9e6b`: only for tiny "live" markers (career references). Never for text or fills.

## Type

Fonts live in `src/lib/fonts.ts`; `--font-sans`, `--font-serif` and `--font-num` are wired in `src/app/globals.css` (`@theme inline`). The root layout applies the sans on `html`.

| Role | Font | Use |
| --- | --- | --- |
| Text | Geist (300 default, 500 for emphasis) | Body, nav, labels, buttons, tech names, chips |
| Headings | Instrument Serif (400) | `h1`, `h2`, `h3`, set globally in `globals.css` |
| Numerals | Instrument Serif (`font-num`) | Large concern and metric numbers, `tabular-nums` |

- Do not use monospace or `font-mono` anywhere.

### Scale

These are the only text sizes. Never use raw `text-xs`…`text-4xl` or `text-[…]` on text; pick a role. Each role sets size and line height for both breakpoints.

| Role | Class | Size (mobile → sm) | Use |
| --- | --- | --- | --- |
| Display | `h1` (global) | clamp 2.125-3.25rem | Hero title |
| Title | `h2` (global) | 2.25rem | `SectionTitle` |
| Item | `h3` (global) | 1.5rem | Project, concern names |
| Numeral | `text_numeral` | 30 → 36px | Metric numbers |
| Heading | `text_heading` | 20 → 24px | Sans item headings (about questions, their numbers), stack labels |
| Lead | `text_lead` | 18 → 20px | Hero subtitle + rotator, intro paragraphs, info values |
| Body | `text_body` | 15 → 16px | Paragraphs, `text-muted`, max `max-w-2xl` |
| Label | `text_label` | 14px | Nav, `dt` labels, metric captions, chips |

- `h1`/`h2`/`h3` rules are unlayered: utility sizes, weights and tracking on them are ignored, so don't add any.
- Buttons: `text_label font-medium`, `px-3 py-1.5` (`py-1` in the header).

### Colour and weight

- Text has two colours: `text-foreground` and `text-muted`. Accent only for highlights, numbers in lists, links. No `text-black`, no `text-foreground/xx` or opacity on text (opacity is for hover/disabled states).
- Weights: sans is 300 (`font-light` on `html`); `font-medium` (500) only for buttons, chips and small sub-headings. No `font-thin`, `font-semibold`, `font-bold`.

## Layout

- Section shell: `.section` (`py-20`, background) around `.app_container` (`mx-auto max-w-3xl px-6 md:px-0 space-y-8`).
- Sections after the first get `.inner_section`: a 1px `border` line as wide as the content, on top.
- Each section starts with a `SectionTitle`.
- One sticky header on every page (`SiteHeader`, `h-16`, bottom border): logo on the left, section links in the middle (`SiteNav`, active link follows scroll), optional GitHub/LinkedIn (`social`) and Contact (`contact`) on the right. Pages only pass their links. On phones, section links hide behind a three-dots icon that opens `SiteMobileNav`, a small dropdown that closes on scroll.
- Section links are plain `#id` anchors with smooth scrolling. `.section` has a scroll margin (`--header-h`) so the section title lands just under the header. The last section is tall enough to reach that spot.

## Surfaces

- Thin borders, not shadows: 1px `border-border` for grids, list rows (`divide-y`) and cards.
- Radius: 2px everywhere (`rounded-[2px]`).
- Hover on cards: border shifts to `accent/40`.
- Primary button: accent fill with the moving-gradient hover (`.bg_accent_shift`), white text, `text_label font-medium px-3 py-1.5`, 2px radius.
- Icons: `react-icons`, Lucide set (`react-icons/lu`) for UI, `si`/`fa` for brand logos; usually `text-accent`, hover `opacity-70`.

## Motion

- Reveal with `FadeIn` (`src/components/shared/ui/fade-in.tsx`): opacity only, never slide. `inView` for sections, `mount` for the header and hero; stagger with `delay`.
- Calm ease `cubic-bezier(0.22, 1, 0.36, 1)` (`ease-calm`), 300-700ms.
- Content swaps (accordion panels, project changes): short fade with `motion` `AnimatePresence`.
- Rotating text: GSAP (`specialty-rotator.tsx` is the pattern).
- Respect `prefers-reduced-motion`.

## Voice`

- Minimal wording.
- English only.

## Career page

Same look as home; only the content differs.

- Career sections (`src/components/career/`, shell `src/components/shared/ui/section.tsx`, data in `src/data/career.ts`): Overview, Frontend, Backend, DevOps, Stack, each a `.section` with a `SectionTitle`.
- Hero uses the same perspective grid as home.
- Concerns are rows divided by thin lines; the `h3` reads `01 / Label`: accent `font-num` number, muted serif slash, label, all at `h3` size. Stack rows pair an uppercase label with names separated by muted serif slashes. References are link pills with a small `live` marker.
- Reveal order inside a section: title, then content with `delay` from 0.3s, staggered.
