'use client';

import { useState } from 'react';
import { RARITY_META } from "@/data/rarity";
import type { Unit } from "@/data/units";
import {
  DEFAULT_MODIFIER_BONUSES,
  getModifierBreakdown,
} from "@/data/unitValues";

interface CardDetailProps {
  unit: Unit | undefined;
  displayName: string;
  imageUrl: string | undefined;
  breakdown: any;
}

export default function CardDetail({ unit, displayName, imageUrl, breakdown }: CardDetailProps) {
  const [selectedFormIndex, setSelectedFormIndex] = useState(0);

  const rarity = unit ? unit.rarity : ("Common" as const);
  const meta = RARITY_META[rarity];

  const forms = unit?.forms || [];
  const currentForm = forms.length > 0 ? forms[selectedFormIndex] : null;
  const currentStats = currentForm?.stats || unit?.stats;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <div className="h-40 w-40 overflow-hidden rounded-lg border" style={{ backgroundColor: meta.hex + "14" }}>
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageUrl} alt={displayName} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center">{displayName}</div>
          )}
        </div>
        <div>
          <h1 className="font-display text-3xl font-black">{displayName}</h1>
          <div
            className="mt-2 w-fit rounded-full border px-3 py-1 font-mono text-xs font-bold uppercase"
            style={rarity === "Mythic" ? {
              color: "#f8fafc",
              borderColor: "transparent",
              borderImage: "linear-gradient(90deg, #ef4444, #f59e0b, #eab308, #22c55e, #06b6d4, #6366f1, #c026d3) 1",
              backgroundColor: "rgba(255, 255, 255, 0.06)",
            } : { color: meta.hex, borderColor: meta.hex + "66", backgroundColor: meta.hex + "14" }}
          >
            {rarity}
          </div>
        </div>
      </div>


      <div className="rounded-2xl border border-ink-line bg-ink-surface p-5">
        <h2 className="font-display text-xl font-black">Stats {currentForm && `- ${currentForm.name}`}</h2>
        {currentStats ? (
          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {currentStats.damage !== undefined && (
              <div className="rounded-xl border border-ink-line/70 bg-ink p-3">
                <p className="text-xs uppercase tracking-[0.2em] text-text-faint">Damage</p>
                <p className="mt-2 text-lg font-semibold text-text">{currentStats.damage.toLocaleString()}</p>
              </div>
            )}
            {currentStats.defense !== undefined && (
              <div className="rounded-xl border border-ink-line/70 bg-ink p-3">
                <p className="text-xs uppercase tracking-[0.2em] text-text-faint">Defense</p>
                <p className="mt-2 text-lg font-semibold text-text">{currentStats.defense}</p>
              </div>
            )}
            {currentStats.health !== undefined && (
              <div className="rounded-xl border border-ink-line/70 bg-ink p-3">
                <p className="text-xs uppercase tracking-[0.2em] text-text-faint">Health</p>
                <p className="mt-2 text-lg font-semibold text-text">{currentStats.health.toLocaleString()}</p>
              </div>
            )}
            {currentStats.speed !== undefined && (
              <div className="rounded-xl border border-ink-line/70 bg-ink p-3">
                <p className="text-xs uppercase tracking-[0.2em] text-text-faint">Speed (sec/atk)</p>
                <p className="mt-2 text-lg font-semibold text-text">{currentStats.speed}</p>
              </div>
            )}
          </div>
        ) : (
          <p className="mt-3 text-sm text-text-faint">No stats available for this unit yet.</p>
        )}
      </div>

      {unit?.ability && (
        <div 
          onClick={() => {
            if (forms.length > 0) {
              setSelectedFormIndex((prev) => (prev + 1) % forms.length);
            }
          }}
          className={`rounded-2xl border border-ink-line bg-ink-surface p-5 ${forms.length > 0 ? 'cursor-pointer hover:bg-ink-surface2 transition-colors' : ''}`}
        >
          <h2 className="font-display text-xl font-black">{unit.ability.title}</h2>
          <p className="mt-3 text-sm text-text">{unit.ability.description}</p>
          {forms.length > 0 && (
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-text-faint">Current: {forms[selectedFormIndex].name} • Click to switch</p>
          )}
        </div>
      )}

      <div className="prose">
        <p>No bio yet. Edit data/units.ts or drop a card image into app/cards to add this unit.</p>
      </div>
    </div>
  );
}
