// NADIM WEB developer stamp. Self-contained: copy this folder to another React site, install
// `@fontsource-variable/outfit` and `lucide-react`, and render <DevStamp lang="en" />.
// It brings its own black-and-white styles (dev-stamp.css) and needs no theme tokens.
import "@fontsource-variable/outfit/wght.css";
import "./dev-stamp.css";
import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { ArrowUpRight } from "lucide-react";
import logo from "./logo-white.png";
import type { StampLang } from "./copy";

// The panel is a separate chunk, fetched on first hover, focus or tap of the pill.
const loadPanel = () => import("./DevStampPanel");
const DevStampPanel = lazy(loadPanel);
const preload = () => void loadPanel().catch(() => {});

// Pill copy lives here so the page never waits for the panel chunk to show it.
const labels: Record<StampLang, { by: string; visit: string }> = {
  en: { by: "This website was designed by", visit: "Visit my website:" },
  ar: { by: "صمّم هذا الموقع", visit: "زر موقعي:" },
  ru: { by: "Этот сайт создал", visit: "Мой сайт:" },
};

const gap = 12; // px between the pill and the panel
const edge = 16; // px the panel keeps from the screen sides
const hoverDelay = 200; // ms before a hover-opened panel closes, so the pointer can cross the gap
// Phones show the panel as a sheet along the bottom of the screen (CSS); wider screens float it
// above the pill, lined up with its end edge. It is fixed, so a parent with overflow: hidden
// never clips it.
const sheet = "(max-width: 639px)";

// Hovering the pill opens the panel; clicking pins it open until a second click, Escape,
// the close button or a click outside.
export function DevStamp({ lang = "en" }: { lang?: StampLang }) {
  const dir = lang === "ar" ? "rtl" : "ltr";
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const leaveTimer = useRef<number>(undefined);
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [position, setPosition] = useState<CSSProperties>();
  const open = hovered || pinned;

  const close = useCallback((refocus = false) => {
    window.clearTimeout(leaveTimer.current);
    setHovered(false);
    setPinned(false);
    if (refocus) triggerRef.current?.focus();
  }, []);

  const onPointerEnter = (event: ReactPointerEvent) => {
    preload();
    if (event.pointerType !== "mouse") return;
    window.clearTimeout(leaveTimer.current);
    setHovered(true);
  };

  const onPointerLeave = (event: ReactPointerEvent) => {
    if (event.pointerType !== "mouse") return;
    leaveTimer.current = window.setTimeout(() => setHovered(false), hoverDelay);
  };

  const place = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger || window.matchMedia(sheet).matches) {
      setPosition(undefined);
      return;
    }
    const rect = trigger.getBoundingClientRect();
    const width = document.documentElement.clientWidth;
    setPosition({
      bottom: window.innerHeight - rect.top + gap,
      ...(dir === "ltr"
        ? { right: Math.max(edge, width - rect.right) }
        : { left: Math.max(edge, rect.left) }),
    });
  }, [dir]);

  useLayoutEffect(() => {
    if (open) place();
  }, [open, place]);

  useEffect(() => () => window.clearTimeout(leaveTimer.current), []);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) close();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close(true);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, { passive: true });
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place);
    };
  }, [open, close, place]);

  return (
    <div
      ref={rootRef}
      lang={lang}
      dir={dir}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      className="nws"
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={open ? id : undefined}
        onFocus={preload}
        onClick={() => {
          if (pinned) close();
          else setPinned(true);
        }}
        className="nws-trigger"
      >
        <img src={logo} alt="" width={36} height={42} className="nws-mark" />
        <span className="nws-word">
          <span className="nws-by">{labels[lang].by}</span>
          <span className="nws-name" dir="ltr">
            NADIM WEB
          </span>
          <span className="nws-visit">
            {labels[lang].visit}{" "}
            <span className="nws-visit-site" dir="ltr">
              nadimweb.com
            </span>
            <ArrowUpRight className="nws-icon-sm nws-flip" aria-hidden="true" />
          </span>
        </span>
      </button>
      {open && (
        <div className="nws-layer" style={position}>
          <Suspense
            fallback={<div className="nws-panel nws-panel-loading" aria-busy />}
          >
            <DevStampPanel lang={lang} id={id} onClose={() => close(true)} />
          </Suspense>
        </div>
      )}
    </div>
  );
}
