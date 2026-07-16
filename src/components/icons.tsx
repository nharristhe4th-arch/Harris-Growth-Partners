// Small hand-drawn line icons, kept as inline SVG so the site has zero
// icon-library dependency. Each is 24x24 on a 1.5px stroke.
import type { SVGProps } from "react";

export function TargetIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      {...props}
    >
      <circle cx="12" cy="12" r="8.25" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ListIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      {...props}
    >
      <path d="M8.25 6h11.25M8.25 12h11.25M8.25 18h11.25" strokeLinecap="round" />
      <path d="M4.5 6h.008M4.5 12h.008M4.5 18h.008" strokeLinecap="round" />
    </svg>
  );
}

export function SignalIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      {...props}
    >
      <path d="M5 19V13M11.5 19V9M18 19V5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
