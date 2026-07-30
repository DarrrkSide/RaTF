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

function Emblem({ unit, hex }: { unit: Unit; hex: string }) {
  const seed = hash(unit.id);
  const rotate = seed % 360;
  const points = 5 + (seed % 3);
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

export default function CardTile({ unit, onOpen, compact = false }: { unit: Unit; onOpen?: (u: Unit) => void; compact?: boolean }) {
  const meta = RARITY_META[unit.rarity];
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = Boolean(unit.image && !imgFailed);
  const isMythic = unit.rarity === "Mythic";
  const isAldedo = unit.name === "Aldedo";

  const cardClasses = `relative flex ${compact ? "h-full w-full" : "flex-col"} overflow-hidden rounded-xl border bg-ink-surface transition-all duration-300 ease-out hover:-translate-y-1 ${meta.border} cursor-pointer`;
  const innerCardClasses = `relative flex ${compact ? "h-full w-full" : "flex-col"} overflow-hidden rounded-xl bg-ink-surface`;
  const imageAreaClasses = compact ? "relative flex aspect-[4/5] items-center justify-center overflow-hidden" : "relative flex h-28 items-center justify-center overflow-hidden";
  const bodyClasses = compact ? "flex flex-1 flex-col justify-end gap-1 p-2" : "flex flex-1 flex-col gap-1.5 p-2.5";
  const titleClasses = compact ? "truncate font-body text-[10px] font-semibold text-text sm:text-xs" : "truncate font-body text-xs font-semibold text-text sm:text-sm";
  const badgeClasses = compact ? "w-fit rounded-full border px-2 py-0.5 font-mono text-[8px] font-bold uppercase tracking-wider" : "w-fit rounded-full border px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider";

  return (
    <div
      onClick={() => onOpen?.(unit)}
      role="button"
      tabIndex={0}
      className={cardClasses}
      style={isMythic ? {
        borderColor: "rgba(244, 114, 182, 0.7)",
        boxShadow: "0 0 0 1px rgba(192, 132, 252, 0.15) inset",
      } : undefined}
      onKeyDown={(e) => {
        if (e.key === "Enter") onOpen?.(unit);
      }}
    >
      <div
        className={innerCardClasses}
      >
        <div
          className={imageAreaClasses}
          style={isMythic ? {
            backgroundColor: `${meta.hex}1a`,
          } : { backgroundColor: `${meta.hex}08` }}
      >
        {showImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={unit.image}
            alt={unit.name}
            className={`h-full w-full ${isAldedo ? "object-contain object-center scale-[0.9]" : "object-contain"}`}
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <>
            <Emblem unit={unit} hex={meta.hex} />
            <span
              className="absolute bottom-1.5 right-2 font-display text-lg tracking-wide"
              style={isMythic ? {
                backgroundImage: "linear-gradient(90deg, #ef4444, #f59e0b, #eab308, #22c55e, #06b6d4, #6366f1, #c026d3)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
                opacity: 1,
                textShadow: "0 0 10px rgba(255,255,255,0.25)",
              } : { color: meta.hex }}
            >
              {initials(unit.name)}
            </span>
          </>
        )}

        <span className="absolute left-0 top-0 h-full w-1" style={isMythic ? { background: "linear-gradient(180deg, #f472b6, #a78bfa, #22d3ee)" } : { backgroundColor: meta.hex }} />
      </div>

      <div className={bodyClasses}>
        <h3 className={titleClasses}>{unit.name}</h3>
        <span
          className={badgeClasses}
          style={isMythic ? { color: meta.hex, borderColor: `${meta.hex}66`, backgroundColor: `${meta.hex}14` } : { color: meta.hex, borderColor: `${meta.hex}66`, backgroundColor: `${meta.hex}14` }}
        >
          {unit.rarity}
        </span>
      </div>
    </div>
  </div>
  );
}
