/** Same curve as the `ease-calm` CSS token, for JS animations. */
export const calmEase = [0.22, 1, 0.36, 1] as const;

export const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
export const fullMotionQuery = "(prefers-reduced-motion: no-preference)";

export const prefersReducedMotion = () =>
  window.matchMedia(reducedMotionQuery).matches;
