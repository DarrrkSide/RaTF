"use client";

import { useState } from "react";
import { WAVE_TIER_LIST, QUALITY_TIER_LIST, TierRow } from "@/data/tierlists";
import { getUnitByName } from "@/data/units";
import { RARITY_META } from "@/data/rarity";

const TABS = [
  {
    key: "wave",
    label: "Wave-Clear Tier List",
    description:
      "Ranked by the highest wave each unit can realistically carry a solo push to.",
    rows: WAVE_TIER_LIST,
  },
  {
    key: "quality",
    label: "Quality Tier List",
    description:
      "Overall usefulness at level 1, no traits or mutations factored in.",
    rows: QUALITY_TIER_LIST,
  },
] as const;

function TierRowShelf({ row }: { row: TierRow }) {
  return (
    <div className="flex flex-col gap-3 border-b border-ink-line/70 py-5 sm:flex-row sm:gap-6">
      <div
        className="flex shrink-0 items-center gap-3 sm:w-40 sm:flex-col sm:items-start sm:gap-1"
        style={{ color: row.color }}
      >
        <div className="flex items-center gap-2">
          <span className="h-8 w-1.5 rounded-full" style={{ backgroundColor: row.color }} />
          <span className="font-display text-3xl tracking-wide">{row.label}</span>
        </div>
        {row.sublabel && (
          <p className="font-body text-xs text-text-faint sm:pl-3.5">{row.sublabel}</p>
        )}
      </div>
      <div className="flex flex-1 flex-wrap gap-2">
        {row.units.map((name) => {
          const unit = getUnitByName(name);
          const meta = unit ? RARITY_META[unit.rarity] : null;
          return (
            <span
              key={name}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 font-body text-xs font-medium sm:text-sm ${
                meta ? `${meta.border} ${meta.bg} ${meta.text}` : "border-ink-line text-text-dim"
              }`}
            >
              {name}
              {unit?.tag && (
                <span className="font-mono text-[10px] text-text-faint">
                  {unit.tag}
                </span>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default function TierListPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("wave");
  const active = TABS.find((t) => t.key === tab)!;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-rarity-god">
          Community tier lists
        </p>
        <h1 className="mt-1 font-display text-4xl tracking-wide text-text sm:text-5xl">
          Tier List
        </h1>
      </div>

      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex w-full gap-1 rounded-full border border-ink-line bg-ink-surface p-1 sm:w-auto">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 rounded-full px-4 py-2 font-body text-sm font-semibold transition-colors sm:flex-initial ${
                tab === t.key
                  ? "bg-rarity-legendary text-ink"
                  : "text-text-dim hover:text-text"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <p className="-mt-4 font-body text-sm text-text-dim">{active.description}</p>

      <div className="rounded-2xl border border-ink-line bg-ink-surface px-4 sm:px-6">
        {active.rows.map((row) => (
          <TierRowShelf key={row.label} row={row} />
        ))}
      </div>
    </div>
  );
}
