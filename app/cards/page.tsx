"use client";

import { useMemo, useState, useEffect } from "react";
import { Unit } from "@/data/units";
import { RARITY_ORDER, RARITY_META, Rarity } from "@/data/rarity";
import { TRAIT_TIERS } from "@/data/traits";
import { MUTATIONS } from "@/data/mutations";
import { getDetailsById } from "@/data/unitDetails";
import { QUALITY_TIER_LIST } from "@/data/tierlists";
import CardTile from "@/components/CardTile";
import Portal from "@/components/Portal";

function parsePercentValue(value?: string) {
  const match = value?.match(/([+-]?\d+(?:\.\d+)?)/);
  if (!match) return 0;
  return Number(match[1]) / 100;
}

function getBuffPercent(buffs: string | undefined, keyword: "damage" | "health" | "speed") {
  if (!buffs) return 0;
  const lower = buffs.toLowerCase();

  if (keyword === "speed") {
    const fasterMatch = lower.match(/([+-]?\d+(?:\.\d+)?)%\s*faster/);
    const slowerMatch = lower.match(/([+-]?\d+(?:\.\d+)?)%\s*slower/);
    const match = fasterMatch ?? slowerMatch;
    if (!match) return 0;
    const sign = slowerMatch ? -1 : 1;
    return Number(match[1]) / 100 * sign;
  }

  const match = lower.match(new RegExp(`([+-]?\\d+(?:\\.\\d+)?)%\\s*${keyword}`));
  return match ? Number(match[1]) / 100 : 0;
}

function getEffectiveStats(unit: Unit, traitName: string | null, mutationName: string | null) {
  const details = getDetailsById(unit.id)?.stats;
  const mutation = MUTATIONS.find((entry) => entry.name === mutationName);
  const trait = TRAIT_TIERS.flatMap((tier) => tier.traits).find((entry) => entry.name === traitName);

  const mutationDamageMultiplier = mutation ? parsePercentValue(mutation.damage) : 0;
  const mutationHealthMultiplier = mutation ? parsePercentValue(mutation.health) : 0;
  const traitDamageMultiplier = getBuffPercent(trait?.buffs, "damage");
  const traitHealthMultiplier = getBuffPercent(trait?.buffs, "health");
  const traitSpeedMultiplier = getBuffPercent(trait?.buffs, "speed");

  return {
    damage: details?.damage ? details.damage * (1 + mutationDamageMultiplier + traitDamageMultiplier) : undefined,
    defense: details?.defense,
    health: details?.health ? details.health * (1 + mutationHealthMultiplier + traitHealthMultiplier) : undefined,
    speed: details?.speed ? details.speed * (1 + traitSpeedMultiplier) : undefined,
  };
}

export default function CardsPage() {
  const [query, setQuery] = useState("");
  const [activeRarities, setActiveRarities] = useState<Set<Rarity>>(
    new Set(RARITY_ORDER)
  );
  const [units, setUnits] = useState<Unit[]>([]);
  const [selected, setSelected] = useState<Unit | null>(null);
  const [selectedTrait, setSelectedTrait] = useState<string | null>(null);
  const [selectedMutation, setSelectedMutation] = useState<string | null>(null);

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

  useEffect(() => {
    setSelectedTrait(null);
    setSelectedMutation(null);
  }, [selected?.id]);

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

  const effectiveStats = useMemo(() => {
    if (!selected) return null;
    return getEffectiveStats(selected, selectedTrait, selectedMutation);
  }, [selected, selectedTrait, selectedMutation]);

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
                style={rarity === "Mythic" ? {
                  backgroundImage: "linear-gradient(90deg, rgba(244,114,182,0.2), rgba(192,132,252,0.2), rgba(34,211,238,0.2))",
                  color: "transparent",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                } : undefined}
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
        <Portal>
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={() => setSelected(null)} />
            <div className="relative w-[90%] max-w-3xl rounded-xl border bg-ink-surface p-6 shadow-lg">
              <div className="flex justify-between">
                <h2 className="font-display text-2xl font-black">{selected.name}</h2>
                <button className="text-text-dim" onClick={() => setSelected(null)}>×</button>
              </div>
              <div className="mt-4 flex gap-4">
                <div className="h-48 w-48 flex-shrink-0 overflow-hidden rounded-lg" style={{ backgroundColor: RARITY_META[selected.rarity].hex + "08" }}>
                  {selected.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={selected.image} alt={selected.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">No image</div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-fit rounded-full border px-3 py-1 font-mono text-xs font-bold uppercase"
                      style={selected.rarity === "Mythic" ? {
                        color: "transparent",
                        borderColor: "rgba(244, 114, 182, 0.7)",
                        backgroundImage: "linear-gradient(90deg, rgba(244,114,182,0.18), rgba(192,132,252,0.18), rgba(34,211,238,0.18))",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      } : { color: RARITY_META[selected.rarity].hex, borderColor: RARITY_META[selected.rarity].hex + "66", backgroundColor: RARITY_META[selected.rarity].hex + "14" }}
                    >
                      {selected.rarity}
                    </div>
                    <div className="w-fit rounded-full border px-3 py-1 font-mono text-xs font-bold uppercase" style={{ color: "#111", borderColor: "#ccc", backgroundColor: "#f3f4f6" }}>{QUALITY_TIER_LIST.find(r=>r.units.includes(selected.name))?.label ?? "—"}</div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div>
                      <h4 className="font-semibold">Damage</h4>
                      <p className="text-sm text-text-faint">{effectiveStats?.damage?.toLocaleString() ?? "—"}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Defense</h4>
                      <p className="text-sm text-text-faint">{effectiveStats?.defense?.toLocaleString() ?? "—"}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Health</h4>
                      <p className="text-sm text-text-faint">{effectiveStats?.health?.toLocaleString() ?? "—"}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Speed</h4>
                      <p className="text-sm text-text-faint">{effectiveStats?.speed?.toLocaleString() ?? "—"}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-semibold">Ability</h4>
                    {getDetailsById(selected.id)?.ability ? (
                      <div>
                        <div className="font-bold">{getDetailsById(selected.id)!.ability!.title}</div>
                        <div className="text-sm text-text-faint">{getDetailsById(selected.id)!.ability!.description}</div>
                      </div>
                    ) : (
                      <div className="text-sm text-text-faint">No ability info</div>
                    )}
                  </div>

                  <div className="mt-4">
                    <h4 className="font-semibold">Trait</h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {TRAIT_TIERS.map((tier) => (
                        tier.traits.map((tr) => {
                          const active = selectedTrait === tr.name;
                          return (
                            <button
                              key={tr.name}
                              onClick={() => setSelectedTrait(active ? null : tr.name)}
                              className={`rounded px-3 py-1 text-sm font-medium ${active ? 'ring-2 ring-offset-1' : ''}`}
                              style={{ backgroundColor: tier.color + '22', border: `1px solid ${tier.color}`, color: tier.color }}
                            >
                              {tr.name}
                            </button>
                          );
                        })
                      ))}
                    </div>
                    {selectedTrait && <div className="mt-2 text-sm text-text-faint">{TRAIT_TIERS.flatMap(t => t.traits).find(x => x.name === selectedTrait)?.buffs}</div>}

                    <h4 className="font-semibold mt-4">Mutation</h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {MUTATIONS.map((m) => {
                        const active = selectedMutation === m.name;
                        return (
                          <button
                            key={m.name}
                            onClick={() => setSelectedMutation(active ? null : m.name)}
                            className={`rounded px-3 py-1 text-sm font-medium ${active ? 'ring-2 ring-offset-1' : ''}`}
                            style={{ backgroundColor: m.color + '22', border: `1px solid ${m.color}`, color: m.color }}
                          >
                            {m.name}
                          </button>
                        );
                      })}
                    </div>
                    {selectedMutation && <div className="mt-2 text-sm text-text-faint">{MUTATIONS.find(m => m.name === selectedMutation)?.damage} / {MUTATIONS.find(m => m.name === selectedMutation)?.health}</div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
}
