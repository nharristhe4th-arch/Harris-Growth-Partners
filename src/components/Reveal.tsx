"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Fades children in as they scroll into view and back out as they scroll
// past — a continuous crossfade rather than a one-time entrance. `delay`
// only applies to that first entrance (e.g. staggering the hero on page
// load); every scroll-triggered transition after that is instant, so
// scrolling back up doesn't feel laggy. Pure CSS transition +
// IntersectionObserver, no animation library needed. See `.reveal` /
// `.reveal-visible` in globals.css (also respects prefers-reduced-motion
// there).
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const everRevealed = useRef(false);
  const [visible, setVisible] = useState(false);
  const [activeDelay, setActiveDelay] = useState(delay);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (everRevealed.current) {
          setActiveDelay(0);
        } else if (entry.isIntersecting) {
          everRevealed.current = true;
        }
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: `${activeDelay}ms` }}
    >
      {children}
    </div>
  );
}
