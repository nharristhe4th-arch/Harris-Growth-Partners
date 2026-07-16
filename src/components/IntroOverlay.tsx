"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site-config";

// One-shot splash that covers the page on first load, then wipes away
// to reveal the hero underneath. Skips itself entirely for
// prefers-reduced-motion so it never traps anyone behind an animation.
export function IntroOverlay() {
  const [mounted, setMounted] = useState(true);
  const [textVisible, setTextVisible] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(true);

  useEffect(() => {
    // Reduced-motion visitors still get the timers (so setState stays
    // inside async callbacks, not the effect body) but with the delays
    // collapsed to 0, so the overlay clears almost immediately instead
    // of animating.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fadeOutDelay = reduced ? 0 : 900;
    const unmountDelay = reduced ? 0 : 1600;

    const raf = requestAnimationFrame(() => setTextVisible(true));
    const fadeOutTimer = setTimeout(() => setOverlayVisible(false), fadeOutDelay);
    const unmountTimer = setTimeout(() => setMounted(false), unmountDelay);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(fadeOutTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-ink transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        overlayVisible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <span
        className={`font-serif text-2xl tracking-tight text-paper transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          textVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        {siteConfig.name}
      </span>
    </div>
  );
}
