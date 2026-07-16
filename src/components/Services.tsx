import { TargetIcon, ListIcon, SignalIcon } from "./icons";
import { Reveal } from "./Reveal";

const services = [
  {
    icon: TargetIcon,
    title: "Market & ICP Research",
    description:
      "Before you spend a dollar on outreach, you need to know exactly who to target. I research your market and define the specific industries, business types, and customer profiles most likely to convert — so effort goes where it pays off.",
  },
  {
    icon: ListIcon,
    title: "Prospect List Building",
    description:
      "Verified decision-maker contacts — not scraped, outdated junk lists. Every prospect list is built and checked by hand, matched to the ICP we define together.",
  },
  {
    icon: SignalIcon,
    title: "Outreach Strategy & Systems",
    description:
      "Email and call scripts, contact cadences, and simple tracking systems built to actually get used — designed for real-world consistency, not complexity.",
  },
];

export function Services() {
  return (
    <section id="services" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal className="max-w-2xl">
          <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">
            What I do
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            Three pieces, built to work together as one system.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden rounded-sm border border-line bg-line md:grid-cols-3">
          {services.map(({ icon: Icon, title, description }, index) => (
            <Reveal key={title} delay={index * 100} className="h-full">
              {/* Hover lift lives on its own element so it doesn't fight
                  the reveal fade/slide transition above for the same
                  transition-property. */}
              <div className="group h-full bg-white p-8 transition-all duration-300 hover:relative hover:z-10 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/5">
                <Icon className="h-6 w-6 text-accent transition-transform duration-300 group-hover:scale-110" />
                <h3 className="mt-6 font-serif text-xl">{title}</h3>
                <p className="mt-3 text-base leading-relaxed text-ink-soft">
                  {description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
