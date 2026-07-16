import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-ink-soft sm:flex-row">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
        <a
          href={`mailto:${siteConfig.contactEmail}`}
          className="hover:text-ink"
        >
          {siteConfig.contactEmail}
        </a>
      </div>
    </footer>
  );
}
