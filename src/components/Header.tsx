"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "How It Works" },
  { href: "#about", label: "About" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-paper/75 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? "border-line shadow-sm shadow-black/20" : "border-line/0"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="#top" className="font-serif text-lg tracking-tight">
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-ink-soft md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:text-ink hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="rounded-sm bg-accent px-4 py-2 text-sm font-medium text-paper transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-lg hover:shadow-accent/30 active:translate-y-0"
        >
          Get in Touch
        </a>
      </div>
    </header>
  );
}
