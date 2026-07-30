import Link from "next/link";
import { UNITS } from "@/data/units";
import CardTile from "@/components/CardTile";

function normalize(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "").trim();
}

const SPOTLIGHT_NAMES = ["Sakuna (Heian)", "Goji (Shinjuku)", "Ais", "Kiwusuke", "Aldedo", "Wise"];
const SPOTLIGHT = SPOTLIGHT_NAMES
  .map((name) => {
    const key = normalize(name);
    return UNITS.find((u) => normalize(u.name).includes(key) || normalize(key).includes(normalize(u.name)));
  })
  .filter(Boolean) as typeof UNITS;

const QUICK_LINKS = [
  { href: "/tierlist", label: "Tier List" },
  { href: "/cards", label: "Cards" },
  { href: "/tutorial", label: "Guide" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16">
      <section className="relative flex min-h-[calc(100vh-8rem)] flex-col items-start justify-center gap-6 overflow-hidden bg-gradient-to-br from-ink-surface/60 to-ink-surface/30 p-6 sm:min-h-[calc(100vh-7rem)] sm:p-8">
        <div className="absolute -z-10 left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 bg-gradient-to-br from-pink-500/10 via-indigo-400/6 to-cyan-300/6 rounded-full blur-3xl opacity-70" />
        <h1 className="font-display text-5xl font-black leading-[0.95] tracking-[0.08em] text-text sm:text-7xl">
          ROLL ANIME
          <br />
          <span className="bg-gradient-to-r from-pink-400 via-amber-300 to-cyan-300 bg-clip-text text-transparent">TO FIGHT</span>
        </h1>
        <p className="max-w-md font-body text-sm text-text-dim sm:text-base">
          Tier lists, unit cards, and everything else you need in one place.
        </p>
        <div className="flex flex-wrap gap-3 pt-1">
          {QUICK_LINKS.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-lg px-5 py-3 font-body text-sm font-semibold transition-transform duration-300 hover:scale-105 ${
                i === 0
                  ? "bg-rarity-god text-white"
                  : "border border-ink-line bg-ink-surface text-text hover:bg-ink-surface2"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="font-display text-2xl font-black tracking-[0.06em] text-text">Meta spotlight</h2>
          <Link href="/cards" className="font-body text-sm text-text-dim transition-colors hover:text-text">
            View all &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {SPOTLIGHT.map((unit, i) => (
            <div key={unit.id} style={{ transitionDelay: `${i * 40}ms` }} className="transform-gpu transition-all duration-300 hover:scale-105">
              <CardTile key={unit.id} unit={unit} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
