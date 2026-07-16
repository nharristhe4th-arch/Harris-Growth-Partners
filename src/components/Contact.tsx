"use client";

import { useState, type FormEvent } from "react";
import { siteConfig } from "@/lib/site-config";
import { Reveal } from "./Reveal";

type Status = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const formspreeConfigured = siteConfig.formspreeId.trim().length > 0;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch(
        `https://formspree.io/f/${siteConfig.formspreeId}`,
        {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        },
      );

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="border-t border-line bg-white">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-2">
          <Reveal>
            <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">
              Let&apos;s talk about your growth
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-soft">
              Tell me a bit about your business. I&apos;ll follow up to set up
              a short call.
            </p>
            <p className="mt-8 text-sm text-ink-soft">
              Prefer email? Reach me directly at{" "}
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="font-medium text-ink underline decoration-line underline-offset-4 transition-colors hover:text-accent"
              >
                {siteConfig.contactEmail}
              </a>
              .
            </p>
          </Reveal>

          {!formspreeConfigured ? (
            <Reveal
              delay={100}
              className="flex flex-col justify-center rounded-sm border border-line bg-paper p-8 text-ink-soft"
            >
              <p>
                The contact form isn&apos;t wired up yet — add a Formspree
                form ID in{" "}
                <code className="rounded-sm bg-line px-1.5 py-0.5 text-sm">
                  src/lib/site-config.ts
                </code>{" "}
                to enable it. Until then, visitors can reach out by email
                above.
              </p>
            </Reveal>
          ) : (
            <Reveal delay={100}>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="mt-2 w-full rounded-sm border border-line bg-paper px-3 py-2 text-ink outline-none transition-colors focus:border-accent"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="mt-2 w-full rounded-sm border border-line bg-paper px-3 py-2 text-ink outline-none transition-colors focus:border-accent"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="businessType" className="text-sm font-medium">
                    Business type
                  </label>
                  <input
                    id="businessType"
                    name="businessType"
                    type="text"
                    placeholder="e.g. Pressure washing, landscaping, cleaning"
                    className="mt-2 w-full rounded-sm border border-line bg-paper px-3 py-2 text-ink outline-none transition-colors focus:border-accent"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="mt-2 w-full rounded-sm border border-line bg-paper px-3 py-2 text-ink outline-none transition-colors focus:border-accent"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="rounded-sm bg-ink px-6 py-3 text-sm font-medium text-paper transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent hover:shadow-lg hover:shadow-accent/20 active:translate-y-0 disabled:pointer-events-none disabled:opacity-60"
                >
                  {status === "submitting" ? "Sending…" : "Send message"}
                </button>

                {status === "success" && (
                  <p className="fade-in text-sm text-accent">
                    Thanks — I&apos;ll be in touch shortly.
                  </p>
                )}
                {status === "error" && (
                  <p className="fade-in text-sm text-red-700">
                    Something went wrong. Please try again or email directly.
                  </p>
                )}
              </form>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
