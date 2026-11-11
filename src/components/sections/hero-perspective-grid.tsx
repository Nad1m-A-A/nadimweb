const GRID_WIDTH = 1200;
const GRID_HEIGHT = 600;
const VANISHING_X = GRID_WIDTH / 2;
const VANISHING_Y = -100;

const VERTICAL_STEP = 50;

const verticalLines = Array.from(
  { length: Math.floor((3 * GRID_WIDTH) / VERTICAL_STEP) + 1 },
  (_, i) => -GRID_WIDTH + i * VERTICAL_STEP,
);

const horizontalLines: number[] = [];
for (let i = 0; i < 80; i++) {
  const y = VANISHING_Y + (GRID_HEIGHT - VANISHING_Y) / (1 + i * 0.08);
  if (y < 0) break;
  horizontalLines.push(y);
}

// Top fade applies across the full width.
const topFade = "linear-gradient(to top, black 50%, transparent 95%)";

// Side fade only on the upper part; the bottom band stays clear to the edges.
const sideFade = [
  "linear-gradient(to top, black 40%, transparent 55%)",
  "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)",
].join(", ");

export function HeroPerspectiveGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ WebkitMaskImage: topFade, maskImage: topFade }}
      aria-hidden
    >
      <svg
        className="absolute mt-1 inset-0 h-full w-full text-foreground/25"
        viewBox={`0 0 ${GRID_WIDTH} ${GRID_HEIGHT}`}
        preserveAspectRatio="none"
        fill="none"
        style={{
          WebkitMaskImage: sideFade,
          maskImage: sideFade,
          WebkitMaskComposite: "source-over",
          maskComposite: "add",
        }}
      >
        <g stroke="currentColor" strokeWidth={0.5}>
          {verticalLines.map((x, i) => (
            <line
              key={`v-${i}`}
              x1={x}
              y1={GRID_HEIGHT}
              x2={VANISHING_X}
              y2={VANISHING_Y}
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {horizontalLines.map((y, i) => (
            <line
              key={`h-${i}`}
              x1={0}
              y1={y}
              x2={GRID_WIDTH}
              y2={y}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
