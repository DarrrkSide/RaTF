"use client";

import { useMemo, useState, useEffect } from "react";
import { Unit } from "@/data/units";
import { RARITY_ORDER, RARITY_META, Rarity } from "@/data/rarity";
import CardTile from "@/components/CardTile";

export default function CardsPage() {
  const [query, setQuery] = useState("");
  const [activeRarities, setActiveRarities] = useState<Set<Rarity>>(
    new Set(RARITY_ORDER)
  );
  const [units, setUnits] = useState<Unit[]>([]);
  const [selected, setSelected] = useState<Unit | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/cards/list")
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) setUnits(data);
      })
      .catch(() => {
        if (!cancelled) setUnits([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return units
      .filter((unit) => {
        if (!activeRarities.has(unit.rarity)) return false;
        if (q && !unit.name.toLowerCase().includes(q)) return false;
        return true;
      })
      .sort((a, b) => RARITY_ORDER.indexOf(a.rarity) - RARITY_ORDER.indexOf(b.rarity));
  }, [query, activeRarities, units]);

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
        <h1 className="font-display text-4xl font-black tracking-[0.08em] text-text sm:text-5xl">
          Cards
        </h1>
        <p className="mt-1 font-mono text-xs uppercase tracking-widest text-text-faint">
          {units.length} units
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
          <p className="font-display text-2xl font-black tracking-[0.06em] text-text-dim">No units match</p>
          <p className="mt-1 font-body text-sm text-text-faint">
            Try a different search or turn a rarity filter back on.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filtered.map((unit) => (
            <CardTile key={unit.id} unit={unit} onOpen={(u) => setSelected(u)} />
          ))}
        </div>
      )}

      {selected && (
        <div className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-xl border bg-ink-surface p-6 shadow-lg">
          <div className="flex justify-between">
            <h2 className="font-display text-2xl font-black">{selected.name}</h2>
            <button className="text-text-dim" onClick={() => setSelected(null)}>Close</button>
          </div>
          <div className="mt-4 flex gap-4">
            <div className="h-48 w-48 flex-shrink-0 overflow-hidden rounded-lg border" style={{ backgroundColor: RARITY_META[selected.rarity].hex + "08" }}>
              {selected.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={selected.image} alt={selected.name} className="h-full w-full object-contain" />
              ) : (
                <div className="flex h-full w-full items-center justify-center">No image</div>
              )}
            </div>
            <div>
              <div className="w-fit rounded-full border px-3 py-1 font-mono text-xs font-bold uppercase" style={{ color: RARITY_META[selected.rarity].hex, borderColor: RARITY_META[selected.rarity].hex + "66", backgroundColor: RARITY_META[selected.rarity].hex + "14" }}>{selected.rarity}</div>
              <div className="mt-4 prose">No bio yet.</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
