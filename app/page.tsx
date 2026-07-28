import Link from "next/link";
import { UNITS } from "@/data/units";
import { RARITY_META } from "@/data/rarity";
import CardTile from "@/components/CardTile";

const SPOTLIGHT = ["Sakuna (Heian)", "Goji (Shinjuku)", "Ais", "Kiwusuke", "Aldedo", "Wise"]
  .map((name) => UNITS.find((u) => u.name === name))
  .filter(Boolean) as typeof UNITS;

export default function HomePage() {
  return (
    <div className="flex flex-col gap-20">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-ink-line bg-ink-elevated px-6 py-14 sm:px-12 sm:py-20">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(239,68,68,0.35), transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(167,139,250,0.3), transparent 70%)" }}
        />
        <div className="relative flex flex-col items-start gap-6">
          <span className="rounded-full border border-rarity-legendary/40 bg-rarity-legendary/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-rarity-legendary">
            Unofficial community guide
          </span>
          <h1 className="font-display text-5xl leading-[0.95] tracking-wide text-text sm:text-7xl">
            SUMMON STRONG.
            <br />
            PUSH FURTHER.
            <br />
            <span className="text-rarity-god">CLIMB EVERY WAVE.</span>
          </h1>
          <p className="max-w-xl font-body text-base text-text-dim sm:text-lg">
            Everything for <span className="text-text">Roll Anime to Fight</span> in one
            place — which units carry, what traits and mutations actually mean, and how
            to spend your coins so every summon counts.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/tierlist"
              className="rounded-lg bg-rarity-god px-5 py-3 font-body text-sm font-semibold text-white shadow-glow transition-transform hover:scale-105"
            >
              See the Tier List
            </Link>
            <Link
              href="/cards"
              className="rounded-lg border border-ink-line bg-ink-surface px-5 py-3 font-body text-sm font-semibold text-text transition-colors hover:bg-ink-surface2"
            >
              Browse All Units
            </Link>
            <Link
              href="/tutorial"
              className="rounded-lg border border-ink-line bg-ink-surface px-5 py-3 font-body text-sm font-semibold text-text transition-colors hover:bg-ink-surface2"
            >
              Read the Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Rarity legend / signature strip */}
      <section>
        <h2 className="mb-4 font-display text-2xl tracking-wide text-text sm:text-3xl">
          Rarity at a glance
        </h2>
        <div className="flex flex-wrap gap-2">
          {Object.entries(RARITY_META).map(([rarity, meta]) => (
            <span
              key={rarity}
              className={`rounded-full border px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider ${meta.chip}`}
            >
              {rarity}
            </span>
          ))}
        </div>
      </section>

      {/* Spotlight units */}
      <section>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="font-display text-2xl tracking-wide text-text sm:text-3xl">
            Current META spotlight
          </h2>
          <Link href="/cards" className="font-body text-sm text-text-dim hover:text-text">
            View all &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {SPOTLIGHT.map((unit) => (
            <CardTile key={unit.id} unit={unit} />
          ))}
        </div>
      </section>

      {/* Quick nav cards */}
      <section className="grid gap-4 sm:grid-cols-3">
        <Link
          href="/tierlist"
          className="group rounded-2xl border border-ink-line bg-ink-surface p-6 transition-colors hover:border-rarity-legendary/50"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-rarity-legendary">
            01
          </p>
          <h3 className="mt-2 font-display text-xl tracking-wide text-text">
            Tier Lists
          </h3>
          <p className="mt-2 font-body text-sm text-text-dim">
            Wave-clear rankings and an overall quality tier list, both at level 1 with
            no traits or mutations.
          </p>
        </Link>
        <Link
          href="/cards"
          className="group rounded-2xl border border-ink-line bg-ink-surface p-6 transition-colors hover:border-rarity-epic/50"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-rarity-epic">
            02
          </p>
          <h3 className="mt-2 font-display text-xl tracking-wide text-text">
            Unit Cards
          </h3>
          <p className="mt-2 font-body text-sm text-text-dim">
            Every unit from the tier lists, filterable by rarity, in one searchable
            grid.
          </p>
        </Link>
        <Link
          href="/tutorial"
          className="group rounded-2xl border border-ink-line bg-ink-surface p-6 transition-colors hover:border-rarity-mythic/50"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-rarity-mythic">
            03
          </p>
          <h3 className="mt-2 font-display text-xl tracking-wide text-text">
            Traits, Mutations &amp; Upgrades
          </h3>
          <p className="mt-2 font-body text-sm text-text-dim">
            Drop rates, buffs, merging, cloning, and where to spend your coins first.
          </p>
        </Link>
      </section>
    </div>
  );
}
