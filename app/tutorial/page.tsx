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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Team Building", href: "/tutorial/teambuilding", description: "How to build a META optimal team.", symbol: "⚔️" },
            { title: "Traits benefits", href: "/tutorial/traits", description: "Trait tiers, buffs, and drop rates.", symbol: "✦" },
            { title: "How to level up units", href: "/tutorial/upgrade", description: "The proper merging process for leveling units.", symbol: "⬆️" },
            { title: "Mutation events", href: "/tutorial/mutations", description: "Mutation bonuses and the event schedule.", symbol: "☄️" },
            { title: "Merging & cloning", href: "/tutorial/merging", description: "How merging and cloning work in practice.", symbol: "🧬" },
            { title: "Gamepass priority", href: "/tutorial/gamepasses", description: "The recommended order for gamepasses.", symbol: "🛡️" },
            { title: "Codes", href: "/tutorial/codes", description: "Active redeem codes and their rewards.", symbol: "🎟️" },
          ].map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative flex min-h-[180px] flex-col justify-between overflow-hidden rounded-[1.6rem] border border-red-500/20 bg-gradient-to-br from-ink-surface via-ink-surface/95 to-red-500/10 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_16px_42px_rgba(0,0,0,0.28)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-red-400/50 hover:shadow-[0_18px_48px_rgba(239,68,68,0.22)]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_40%)]" />
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full border border-white/10 bg-white/5 blur-2xl" />
              <div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full border border-white/10 bg-black/10 blur-3xl" />
              <div className="absolute right-4 top-4 text-4xl opacity-60 text-text-dim transition-transform duration-300 group-hover:scale-110">
                {item.symbol}
              </div>
              <div className="relative z-10">
                <div className="mb-4 inline-flex w-fit rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-red-200/90">
                  Guide {index + 1}
                </div>
                <h3 className="font-display text-xl font-black tracking-[0.06em] text-text transition-colors duration-300 group-hover:text-red-400">{item.title}</h3>
                <p className="mt-2 font-body text-sm leading-6 text-text-dim">{item.description}</p>
              </div>
              <div className="relative z-10 mt-4 flex items-center justify-between">
                <span className="guide-button px-3 py-1.5 text-sm">
                  Open section →
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg text-red-200 transition-transform duration-300 group-hover:scale-110">
                  ✦
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
