"use client";

import Image from "next/image";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { useState } from "react";

/**
 * Full-screen sharp, full-colour copy of the active screenshot.
 * Hidden until fully decoded: a PNG paints top-down while loading, and the decode edge showed as a hard line.
 */
function BackdropImage({ src }: { src: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <Image
      src={src}
      alt=""
      fill
      sizes="100vw"
      onLoad={() => setLoaded(true)}
      className={`object-cover object-top transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
    />
  );
}

/**
 * Backdrop: the active project's screenshot blurred full screen under a dark frosted layer,
 * with a glow in the project's colour rising from the bottom.
 */
export function CareerBackdrop({ image }: { color: string; image: string }) {
  return (
    <MotionConfig reducedMotion="user">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[#0b0b0a]"
      >
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
            <BackdropImage src={image} />
            {/* Black fades in from the top and the right, so the image only shows toward the bottom-left. */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#0b0b0a_0%,transparent_55%),linear-gradient(to_left,#0b0b0a_0%,transparent_55%)]" />
          </motion.div>
        </AnimatePresence>
        {/* Frosted layer: 70% dark plus blur over the image. The colour glow sits above it. */}
        <div className="absolute inset-0 bg-[#0b0b0a]/70 backdrop-blur-md" />
      </div>
    </MotionConfig>
  );
}
