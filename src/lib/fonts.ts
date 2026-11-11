import localFont from "next/font/local";

/** Self-hosted (src/fonts) so the site builds offline. Sans for body text, nav and UI. Applied to `html` at weight 300. */
export const sansFont = localFont({
    src: "../fonts/Geist-Variable.woff2",
    weight: "100 900",
    variable: "--font-geist",
    display: "swap",
});

/** Serif for headings and large numerals. Wired through `--font-serif` in globals.css. */
export const serifFont = localFont({
    src: "../fonts/InstrumentSerif-Regular.woff2",
    weight: "400",
    variable: "--font-instrument-serif",
    display: "swap",
});
