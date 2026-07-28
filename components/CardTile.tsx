import { Unit } from "@/data/units";
import { RARITY_META } from "@/data/rarity";

function initials(name: string) {
  const clean = name.replace(/\(.*?\)/g, "").trim();
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export default function CardTile({ unit }: { unit: Unit }) {
  const meta = RARITY_META[unit.rarity];

  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-xl border bg-ink-surface transition-transform hover:-translate-y-1 ${meta.border}`}
      style={{ boxShadow: "0 1px 0 rgba(255,255,255,0.03)" }}
    >
      <div
        className="relative flex h-24 items-center justify-center overflow-hidden bg-diagonal-slash"
        style={{ backgroundColor: `${meta.hex}1a` }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 30%, ${meta.hex}55 0%, transparent 65%)`,
          }}
        />
        <span
          className="relative font-display text-4xl tracking-wide"
          style={{ color: meta.hex }}
        >
          {initials(unit.name)}
        </span>
        <span
          className="absolute left-0 top-0 h-full w-1"
          style={{ backgroundColor: meta.hex }}
        />
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <h3 className="font-body text-sm font-semibold leading-tight text-text">
          {unit.name}
        </h3>
        <div className="mt-auto flex flex-wrap items-center gap-1.5">
          <span
            className={`inline-flex items-center rounded-full border px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${meta.chip}`}
          >
            {unit.rarity}
          </span>
          {unit.tag && (
            <span className="inline-flex items-center rounded-full border border-ink-line bg-ink-surface2 px-2 py-0.5 font-mono text-[10px] text-text-dim">
              {unit.tag}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
