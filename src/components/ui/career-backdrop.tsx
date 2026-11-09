"use client";

import Image from "next/image";
import { AnimatePresence, motion, MotionConfig } from "motion/react";

const grain =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/** Slow sway for a ribbon: drifts up/down and tilts a few degrees around its resting angle. */
const sway = (angle: number, y: string, duration: number) => ({
  initial: { rotate: angle },
  animate: { rotate: [angle, angle + 3, angle], y: ["0%", y, "0%"] },
  transition: { duration, ease: "easeInOut" as const, repeat: Infinity },
});

/** Shared by the tinted layers so colour changes cross-fade slowly. */
const tint = "transition-colors duration-[1200ms] ease-in-out motion-reduce:transition-none";
/** Tapers a ribbon at both ends so it reads as a beam of light, not a bar. */
const taper = "[mask-image:linear-gradient(to_right,transparent,black_30%,black_70%,transparent)]";

/**
 * Aurora backdrop: off-black base, a coloured horizon glow along the bottom, and long tilted
 * ribbons of light crossing the page from the bottom-left. All colour comes from the active project.
 */
export function CareerBackdrop({ color, image }: { color: string; image: string }) {
  return (
    <MotionConfig reducedMotion="user">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[#0b0b0a]">
        {/* Active project's image, full screen, cross-fading between projects. */}
        <AnimatePresence initial={false}>
          <motion.div
            key={image}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image src={image} alt="" fill sizes="100vw" className="object-cover object-top grayscale" />
          </motion.div>
        </AnimatePresence>
        {/* Frosted layer over the image so text and the small image stay readable. */}
        <div className="absolute inset-0 bg-[#0b0b0a]/70 backdrop-blur-xl" />

        {/* Colour is strongest at the bottom and fades smoothly all the way to the top. */}
        <div
          className="absolute inset-0"
          style={{ maskImage: "linear-gradient(to top, black, rgb(0 0 0 / 0.45) 35%, rgb(0 0 0 / 0.12) 65%, transparent)" }}
        >
          {/* Horizon: colour pooled at the bottom, fading up. */}
          <div
            style={{ backgroundColor: color }}
            className={`absolute inset-0 opacity-25 [mask-image:linear-gradient(to_top,black,transparent)] ${tint}`}
          />

          {/* Ribbons rising from the bottom-left toward the top-right. */}
          {/* Blur sits on the outer layer: a mask on the same element would clip the blur into hard edges. */}
          <motion.div
            {...sway(-18, "-6%", 22)}
            className="absolute -left-[20%] bottom-[25%] h-[16vh] w-[140vw] origin-left opacity-45 blur-[70px]"
          >
            <div style={{ backgroundColor: color }} className={`size-full ${taper} ${tint}`} />
          </motion.div>
          <motion.div
            {...sway(-26, "5%", 30)}
            className="absolute -left-[10%] bottom-[5%] h-[10vh] w-[120vw] origin-left opacity-30 blur-[50px]"
          >
            <div style={{ backgroundColor: color }} className={`size-full ${taper} ${tint}`} />
          </motion.div>
          <motion.div
            {...sway(-10, "-4%", 36)}
            className="absolute -left-[30%] top-[35%] h-[8vh] w-[150vw] origin-left opacity-[0.06] blur-[60px]"
          >
            <div className={`size-full bg-[#e9e4da] ${taper}`} />
          </motion.div>
        </div>

        <div className="absolute inset-0 opacity-[0.09] mix-blend-overlay" style={{ backgroundImage: grain }} />
      </div>
    </MotionConfig>
  );
}
