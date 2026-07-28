import Link from "next/link";
import { UNITS } from "@/data/units";
import CardTile from "@/components/CardTile";

const SPOTLIGHT = ["Sakuna (Heian)", "Goji (Shinjuku)", "Ais", "Kiwusuke", "Aldedo", "Wise"]
  .map((name) => UNITS.find((u) => u.name === name))
  .filter(Boolean) as typeof UNITS;

const QUICK_LINKS = [
  { href: "/tierlist", label: "Tier List" },
  { href: "/cards", label: "Cards" },
  { href: "/tutorial", label: "Guide" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16">
      <section className="flex flex-col items-start gap-6 py-8 sm:py-16">
        <h1 className="font-display text-5xl font-black leading-[0.95] tracking-[0.08em] text-text sm:text-7xl">
          ROLL ANIME
          <br />
          TO FIGHT
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
          {SPOTLIGHT.map((unit) => (
            <CardTile key={unit.id} unit={unit} />
          ))}
        </div>
      </section>
    </div>
  );
}
