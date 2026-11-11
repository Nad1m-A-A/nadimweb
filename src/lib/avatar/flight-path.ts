/** Which side of the screen the avatar rests on for each section. */

export type Stop = {
  /** Scroll position where the avatar rests beside this section. */
  scroll: number;
  /** -1 left, 1 right. */
  side: number;
};

/** Sides alternate right, left, right... in page order. */
export function buildStops(tops: number[], maxScroll: number): Stop[] {
  const stops: Stop[] = [];
  tops.forEach((top) => {
    const scroll = Math.min(Math.max(top, 0), maxScroll);
    const prev = stops[stops.length - 1];
    if (prev && scroll <= prev.scroll + 1) return;
    stops.push({ scroll, side: stops.length % 2 === 0 ? 1 : -1 });
  });
  return stops;
}

/** The section the reader is on: the last stop whose top is above 40% of the viewport. */
export function pickStop(stops: Stop[], scrollY: number, vh: number): Stop | undefined {
  let found = stops[0];
  for (const stop of stops) {
    if (stop.scroll <= scrollY + vh * 0.4) found = stop;
  }
  return found;
}
