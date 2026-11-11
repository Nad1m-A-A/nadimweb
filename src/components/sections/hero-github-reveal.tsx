"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

const SCROLL_ROOT_ID = "site-main";
const GITHUB_URL = "https://github.com/Nad1m-A-A?tab=repositories";

type HeroGithubRevealProps = {
  children: React.ReactNode;
  stack: React.ReactNode;
};

export function HeroGithubReveal({ children, stack }: HeroGithubRevealProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const root = document.getElementById(SCROLL_ROOT_ID);
    const panel = panelRef.current;
    const link = linkRef.current;
    if (!root || !panel || !link) return;

    let raised = false;
    let touchStartY = 0;

    const pinTop = () => {
      root.scrollTop = 0;
    };

    const setRaised = (next: boolean) => {
      raised = next;
      panel.dataset.raised = next ? "true" : "false";
      link.tabIndex = next ? 0 : 0;
      link.inert = !next;
      if (!next) pinTop();
    };

    const atTop = () => root.scrollTop <= 0;

    // Off-screen focusable card can make the browser scroll it into view on load.
    setRaised(false);
    pinTop();
    let lockTop = true;
    const unlockTimer = window.setTimeout(() => {
      lockTop = false;
    }, 600);

    const onFocusIn = (event: FocusEvent) => {
      if (raised) return;
      if (!panel.contains(event.target as Node)) return;
      (event.target as HTMLElement | null)?.blur?.();
      pinTop();
    };

    const onScroll = () => {
      if (lockTop && !raised && root.scrollTop !== 0) pinTop();
    };

    const onWheel = (event: WheelEvent) => {
      if (!atTop()) return;

      if (!raised && event.deltaY > 0) {
        event.preventDefault();
        setRaised(true);
        return;
      }

      if (raised && event.deltaY < 0) {
        event.preventDefault();
        setRaised(false);
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? 0;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!atTop()) return;

      const currentY = event.touches[0]?.clientY ?? touchStartY;
      const delta = touchStartY - currentY;

      if (!raised && delta > 10) {
        event.preventDefault();
        setRaised(true);
        return;
      }

      if (raised && delta < -10) {
        event.preventDefault();
        setRaised(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (!atTop()) return;

      const downKeys = ["ArrowDown", "PageDown", " ", "Spacebar"];
      const upKeys = ["ArrowUp", "PageUp"];

      if (!raised && downKeys.includes(event.key)) {
        event.preventDefault();
        setRaised(true);
        return;
      }

      if (raised && upKeys.includes(event.key)) {
        event.preventDefault();
        setRaised(false);
      }
    };

    root.addEventListener("wheel", onWheel, { passive: false });
    root.addEventListener("touchstart", onTouchStart, { passive: true });
    root.addEventListener("touchmove", onTouchMove, { passive: false });
    root.addEventListener("scroll", onScroll, { passive: true });
    panel.addEventListener("focusin", onFocusIn);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(unlockTimer);
      root.removeEventListener("wheel", onWheel);
      root.removeEventListener("touchstart", onTouchStart);
      root.removeEventListener("touchmove", onTouchMove);
      root.removeEventListener("scroll", onScroll);
      panel.removeEventListener("focusin", onFocusIn);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <>
      <div className="relative flex min-h-[61.5vh] flex-1 flex-col items-center justify-center gap-4 overflow-hidden text-center font-thin">
        {children}

        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center overflow-hidden px-4 [overflow-anchor:none]">
          <div
            ref={panelRef}
            data-raised="false"
            className="w-[min(94vw,42rem)] translate-y-[70vh] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform [overflow-anchor:none] data-[raised=true]:translate-y-0 md:w-[min(92%,48rem)]"
          >
            <Link
              ref={linkRef}
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={-1}
              className="pointer-events-auto relative block overflow-hidden rounded-[2px] border border-border shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
            >
              <Image
                src="/github-profile.png"
                alt="GitHub profile — Nadim Alaa"
                width={1300}
                height={800}
                priority
                className="h-auto max-h-[min(52vh,28rem)] w-full object-cover object-top"
                sizes="(max-width: 768px) 94vw, 768px"
              />

              <span aria-hidden className="absolute inset-0 bg-black/70" />
              <span className="absolute inset-0 z-10 flex items-center justify-center">
                <span className="bg-accent-shift px-6 py-1.5 text-label font-medium text-white">
                  View Projects
                </span>
              </span>
            </Link>
          </div>
        </div>
      </div>

      {stack}
    </>
  );
}
