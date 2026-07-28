"use client";

import { useState } from "react";
import { Unit } from "@/data/units";
import { RARITY_META } from "@/data/rarity";

function hash(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function initials(name: string) {
  const clean = name.replace(/\(.*?\)/g, "").trim();
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

// Deterministic placeholder emblem so every card looks distinct even
// without real art. Swap in unit.image (see data/units.ts) whenever real
// card art is available and this is skipped automatically.
function Emblem({ unit, hex }: { unit: Unit; hex: string }) {
  const seed = hash(unit.id);
  const rotate = seed % 360;
  const points = 5 + (seed % 3); // 5–7 sided
  const radius = 30;
  const cx = 40;
  const cy = 40;
  const path = Array.from({ length: points })
    .map((_, i) => {
      const angle = (Math.PI * 2 * i) / points - Math.PI / 2;
      const r = radius * (0.75 + ((seed >> i) % 5) / 16);
      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
    })
    .join(" ");

  return (
    <svg viewBox="0 0 80 80" className="h-14 w-14" aria-hidden="true">
      <polygon
        points={path}
        fill={`${hex}33`}
        stroke={hex}
        strokeWidth="1.25"
        transform={`rotate(${rotate} ${cx} ${cy})`}
      />
      <circle cx={cx} cy={cy} r="3" fill={hex} />
    </svg>
  );
}

export default function CardTile({ unit }: { unit: Unit }) {
  const meta = RARITY_META[unit.rarity];
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = unit.image && !imgFailed;

  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-xl border bg-ink-surface transition-transform duration-300 hover:-translate-y-1 ${meta.border}`}
    >
      <div
        className="relative flex h-24 items-center justify-center overflow-hidden"
        style={{ backgroundColor: `${meta.hex}14` }}
      >
        {showImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={unit.image}
            alt={unit.name}
            className="h-full w-full object-cover"
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <>
            <Emblem unit={unit} hex={meta.hex} />
            <span
              className="absolute bottom-1.5 right-2 font-display text-lg tracking-wide opacity-40"
              style={{ color: meta.hex }}
            >
              {initials(unit.name)}
            </span>
          </>
        )}
        <span
          className="absolute left-0 top-0 h-full w-1"
          style={{ backgroundColor: meta.hex }}
        />
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-2.5">
        <h3 className="truncate font-body text-xs font-semibold text-text sm:text-sm">
          {unit.name}
        </h3>
        <span
          className="w-fit rounded-full border px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider"
          style={{ color: meta.hex, borderColor: `${meta.hex}66`, backgroundColor: `${meta.hex}14` }}
        >
          {unit.rarity}
        </span>
      </div>
    </div>
  );
}
