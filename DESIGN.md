# Design

## Look

- Creamy background `#f5efe3`, black text, gray accent `#6b7280` (secondary text, accents).
- Buttons: solid black, robust.
- Radius: 2px.
- No borders.
- Shadows: `0 1px 2px rgb(0 0 0 / 0.08)` at rest, `0 2px 6px rgb(0 0 0 / 0.10)` on hover.
- Plain background for now; a touch may be added later.
- Fonts: League Spartan (UI), Cormorant Garamond Light (display: project names, large headings only).
- Icons: thin `react-icons`.
- Avoid custom CSS; prefer Tailwind utilities.

## Voice

- Minimal wording.
- English only.

## Career showcase

- Restraint is the point: it should feel confident, not like showing off.
- Desktop layout: large image anchored bottom-right; prev/next arrows (thin icons) directly above it, right-aligned; project name on the left in large thin serif (`font-display`).
- Mobile: image full width at the bottom, name above it, arrows between.
- Only the project name is shown. No descriptions, tags, or position indicators.
- Images are grayscale with a dark bottom-up gradient layer so the number stays readable.
- Motion: one calm transition on change (short fade/slide, ~400-600ms, ease-out); respect `prefers-reduced-motion`.
- Keyboard: left/right arrows work; controls have visible focus and aria-labels.
- Name links to the project; the image is clickable too.
