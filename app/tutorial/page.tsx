import Link from "next/link";

function SectionHeading({ title }: { title: string }) {
  return (
    <h2 className="mb-4 font-display text-2xl font-black tracking-[0.06em] text-text sm:text-3xl">
      {title}
    </h2>
  );
}

export default function TutorialPage() {
  return (
    <div className="flex flex-col gap-14 transition-all duration-500 ease-out">
      <div className="rounded-2xl border border-ink-line/70 bg-gradient-to-br from-ink-surface via-ink-surface/90 to-ink-surface/70 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset]">
        <h1 className="font-display text-4xl font-black tracking-[0.08em] text-text sm:text-5xl">
          Guide
        </h1>
        <p className="mt-3 max-w-2xl font-body text-sm leading-6 text-text-dim">
          Explore the main guide topics with a smoother, more polished experience.
        </p>
      </div>

      <section>
        <SectionHeading title="Guide overview" />
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { title: "Traits benefits", href: "/tutorial/traits", description: "Trait tiers, buffs, and drop rates." },
            { title: "How to level up units", href: "/tutorial/upgrade", description: "The proper merging process for leveling units." },
            { title: "Mutation events", href: "/tutorial/mutations", description: "Mutation bonuses and the event schedule." },
            { title: "Merging & cloning", href: "/tutorial/merging", description: "How merging and cloning work in practice." },
            { title: "Gamepass priority", href: "/tutorial/gamepasses", description: "The recommended order for gamepasses." },
            { title: "Codes", href: "/tutorial/codes", description: "Active redeem codes and their rewards." },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative overflow-hidden rounded-2xl border border-red-500/20 bg-gradient-to-br from-ink-surface via-ink-surface/90 to-red-500/10 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_10px_28px_rgba(0,0,0,0.28)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-red-400/50 hover:shadow-[0_12px_35px_rgba(239,68,68,0.24)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/15 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative">
                <h3 className="font-display text-lg font-black tracking-[0.06em] text-text transition-colors duration-300 group-hover:text-red-400">{item.title}</h3>
                <p className="mt-2 font-body text-sm leading-6 text-text-dim">{item.description}</p>
                <span className="guide-button mt-4 px-3 py-1.5 text-sm">
                  Open section →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
