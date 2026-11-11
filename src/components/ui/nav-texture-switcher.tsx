"use client";

import { useEffect, useState } from "react";

// Temporary preview tool: pick a header texture, then delete this and keep the winner.
const textures = [
  { id: "none", label: "None" },
  { id: "grain", label: "Grain" },
  { id: "dots", label: "Dots" },
  { id: "lines", label: "Lines" },
  { id: "glass", label: "Glass" },
] as const;

type TextureId = (typeof textures)[number]["id"];

const STORAGE_KEY = "nav-texture";

export function NavTextureSwitcher() {
  const [active, setActive] = useState<TextureId>("none");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as TextureId | null;
      if (saved && textures.some((t) => t.id === saved)) setActive(saved);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.dataset.navTexture = active;
    try {
      localStorage.setItem(STORAGE_KEY, active);
    } catch {}
  }, [active]);

  return (
    <div
      role="radiogroup"
      aria-label="Header texture"
      className="fixed right-4 bottom-4 z-[60] flex gap-1 rounded-[2px] border border-border bg-background p-1 text-sm shadow-sm"
    >
      {textures.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          role="radio"
          aria-checked={active === id}
          onClick={() => setActive(id)}
          className={`rounded-[2px] px-3 py-1.5 transition-colors duration-300 ease-calm ${
            active === id ? "bg-accent text-white" : "text-muted hover:text-foreground"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
