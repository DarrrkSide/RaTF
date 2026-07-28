"use client";

import { useMemo, useState } from "react";
import { UNITS } from "@/data/units";
import { RARITY_ORDER, RARITY_META, Rarity } from "@/data/rarity";
import CardTile from "@/components/CardTile";

export default function CardsPage() {
  const [query, setQuery] = useState("");
  const [activeRarities, setActiveRarities] = useState<Set<Rarity>>(
    new Set(RARITY_ORDER)
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return UNITS.filter((unit) => {
      if (!activeRarities.has(unit.rarity)) return false;
      if (q && !unit.name.toLowerCase().includes(q)) return false;
      return true;
    }).sort(
      (a, b) => RARITY_ORDER.indexOf(a.rarity) - RARITY_ORDER.indexOf(b.rarity)
    );
  }, [query, activeRarities]);

  function toggleRarity(rarity: Rarity) {
    setActiveRarities((prev) => {
      const next = new Set(prev);
      if (next.has(rarity)) {
        next.delete(rarity);
      } else {
        next.add(rarity);
      }
      return next;
    });
  }

  function selectOnly(rarity: Rarity) {
    setActiveRarities(new Set([rarity]));
  }

  function resetFilters() {
    setActiveRarities(new Set(RARITY_ORDER));
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-4xl tracking-wide text-text sm:text-5xl">
          Cards
        </h1>
        <p className="mt-1 font-mono text-xs uppercase tracking-widest text-text-faint">
          {UNITS.length} units
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search units..."
          className="w-full max-w-sm rounded-lg border border-ink-line bg-ink-surface px-4 py-2.5 font-body text-sm text-text placeholder:text-text-faint focus:border-rarity-legendary"
        />
        <div className="flex flex-wrap items-center gap-2">
          {RARITY_ORDER.map((rarity) => {
            const meta = RARITY_META[rarity];
            const active = activeRarities.has(rarity);
            return (
              <button
                key={rarity}
                onClick={() => toggleRarity(rarity)}
                onDoubleClick={() => selectOnly(rarity)}
                title="Click to toggle, double-click to isolate"
                className={`rounded-full border px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider transition-opacity ${meta.chip} ${
                  active ? "opacity-100" : "opacity-30"
                }`}
              >
                {rarity}
              </button>
            );
          })}
          <button
            onClick={resetFilters}
            className="rounded-full border border-ink-line px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-text-dim hover:text-text"
          >
            Reset
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ink-line p-12 text-center">
          <p className="font-display text-2xl text-text-dim">No units match</p>
          <p className="mt-1 font-body text-sm text-text-faint">
            Try a different search or turn a rarity filter back on.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filtered.map((unit) => (
            <CardTile key={unit.id} unit={unit} />
          ))}
        </div>
      )}
    </div>
  );
}
