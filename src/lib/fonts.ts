import localFont from "next/font/local";

/** Self-hosted (src/fonts) so the site builds offline. Sans for body text, nav and UI. Applied to `html`. */
export const sansFont = localFont({
    src: "../fonts/InstrumentSans-Variable.woff2",
    weight: "400 700",
    variable: "--font-instrument-sans",
    display: "swap",
});

/** Serif for headings and large numerals. Wired through `--font-serif` in globals.css. */
export const serifFont = localFont({
    src: "../fonts/InstrumentSerif-Regular.woff2",
    weight: "400",
    variable: "--font-instrument-serif",
    display: "swap",
});
