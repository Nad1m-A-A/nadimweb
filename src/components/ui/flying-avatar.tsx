"use client";

import { useEffect, useRef } from "react";

const CONTENT_WIDTH = 768; // matches .app_container max-w-3xl

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * A tiny 3D version of Nadim that flies in from the viewer, rests beside each section and flies
 * across when you scroll. three.js loads lazily after first paint.
 */
export default function FlyingAvatar() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas || !hasWebGL()) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let cancelled = false;
    let cleanup = () => {};

    const start = async () => {
      const [{ default: gsap }, { ScrollTrigger }, sceneMod, path] =
        await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
          import("@/lib/avatar/avatar-scene"),
          import("@/lib/avatar/flight-path"),
        ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      let size = 160;
      let margin = 12;
      let vw = window.innerWidth;
      let vh = window.innerHeight;
      let stops: ReturnType<typeof path.buildStops> = [];

      const measure = () => {
        vw = window.innerWidth;
        vh = window.innerHeight;
        const gutter = (vw - CONTENT_WIDTH) / 2;
        size =
          vw < 640 ? 96 : Math.round(Math.min(220, Math.max(120, gutter - 24)));
        margin = vw < 640 ? 4 : 12;
        wrap.style.width = wrap.style.height = `${size}px`;
        const tops = Array.from(
          document.querySelectorAll<HTMLElement>("section[id]"),
        ).map((el) => el.getBoundingClientRect().top + window.scrollY - 64);
        const max = document.documentElement.scrollHeight - vh;
        stops = path.buildStops(tops, Math.max(max, 0));
      };
      measure();

      const avatar = sceneMod.createAvatarScene({
        canvas,
        size,
        still: reduced,
      });

      const xFor = (pos: number) => {
        const left = margin;
        const right = vw - size - margin;
        return left + ((pos + 1) / 2) * (right - left);
      };
      const yFor = (arc: number) => vh * 0.6 - size / 2 - arc * vh * 0.12;

      let scrollY = window.scrollY;
      let x = xFor(1);
      let y = yFor(0);
      let vx = 0;
      let flight = 0;
      let heading = 1;
      let side = 1;
      // Intro: the avatar starts big, right in front of the viewer, then flies out to its spot.
      let intro = 0;
      const INTRO_SECONDS = 1.8;
      let scale = 1;

      const place = () => {
        wrap.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
      };

      let lastScrollAt = performance.now();
      const st = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          scrollY = self.scroll();
          lastScrollAt = performance.now();
        },
      });
      const onRefresh = () => {
        measure();
        avatar.resize(size);
      };
      ScrollTrigger.addEventListener("refresh", onRefresh);

      if (reduced) {
        // One calm frame, docked bottom right. No flight.
        x = vw - size - margin;
        y = vh - size - margin;
        place();
        avatar.update(0, { flight: 0, heading: 1, side: 1 });
        wrap.style.opacity = "1";
        cleanup = () => {
          ScrollTrigger.removeEventListener("refresh", onRefresh);
          st.kill();
          avatar.dispose();
        };
        return;
      }

      // Follow only once scrolling has paused: the avatar keeps the reader company.
      const SETTLE_MS = 700;
      let settledFor = -1; // scrollY already handled
      let targetPos = 1;
      let startX = x;
      scrollY = st.scroll();
      const first = path.pickStop(stops, scrollY, vh);
      if (first) targetPos = first.side;
      x = xFor(targetPos);
      startX = x;
      y = yFor(0);
      side = targetPos;

      const tick = (_t: number, deltaMs: number) => {
        const dt = Math.min(deltaMs / 1000, 0.05);
        if (dt <= 0 || document.hidden) return;

        if (
          performance.now() - lastScrollAt > SETTLE_MS &&
          settledFor !== scrollY
        ) {
          settledFor = scrollY;
          const stop = path.pickStop(stops, scrollY, vh);
          if (stop && stop.side !== targetPos) {
            targetPos = stop.side;
            startX = x;
            side = targetPos;
          }
        }

        const tx = xFor(targetPos);
        const k = 1 - Math.exp(-dt * 2.4);
        const nx = x + (tx - x) * k;
        const span = Math.abs(tx - startX);
        const progress = span > 1 ? 1 - Math.abs(tx - nx) / span : 1;
        const arc = Math.sin(Math.PI * Math.min(1, Math.max(0, progress)));
        y += (yFor(arc) - y) * (1 - Math.exp(-dt * 5));
        vx += ((nx - x) / dt - vx) * (1 - Math.exp(-dt * 8));
        x = nx;

        const speed = Math.abs(vx);
        const target = Math.min(1, Math.max(0, (speed - 30) / 290));
        flight += (target - flight) * (1 - Math.exp(-dt * 6));
        if (speed > 20) heading = vx > 0 ? 1 : -1;

        // Blend from the viewer's spot (bottom centre, large) to the resting spot.
        let drawFlight = flight;
        let drawHeading = heading;
        if (intro < 1) {
          intro = Math.min(1, intro + dt / INTRO_SECONDS);
          const e = 1 - Math.pow(1 - intro, 3);
          const sx = vw / 2 - size / 2;
          const sy = vh - size * 0.9;
          scale = 2.6 - 1.6 * e;
          drawHeading = x > sx ? 1 : -1;
          drawFlight = Math.max(flight, 1 - e);
          wrap.style.transform = `translate3d(${(sx + (x - sx) * e).toFixed(1)}px, ${(sy + (y - sy) * e).toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
        } else {
          scale = 1;
          place();
        }
        avatar.update(dt, { flight: drawFlight, heading: drawHeading, side });
      };
      gsap.ticker.add(tick);
      wrap.style.transform = `translate3d(${(vw / 2 - size / 2).toFixed(1)}px, ${(vh - size * 0.9).toFixed(1)}px, 0) scale(2.6)`;
      avatar.update(0.016, { flight: 1, heading, side });
      wrap.style.opacity = "1";

      cleanup = () => {
        gsap.ticker.remove(tick);
        ScrollTrigger.removeEventListener("refresh", onRefresh);
        st.kill();
        avatar.dispose();
      };
    };

    // Wait for the page to settle so the avatar never competes with first paint.
    const idle =
      window.requestIdleCallback ??
      ((cb: () => void) => window.setTimeout(cb, 600));
    const handle = idle(() => void start());

    return () => {
      cancelled = true;
      if (window.cancelIdleCallback) window.cancelIdleCallback(handle);
      cleanup();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 -z-10 opacity-0 transition-opacity duration-700 ease-calm"
      style={{
        width: 160,
        height: 160,
        willChange: "transform",
        transformOrigin: "center",
      }}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
