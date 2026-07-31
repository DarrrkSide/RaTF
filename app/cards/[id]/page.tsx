import fs from "fs";
import path from "path";
import { UNITS } from "@/data/units";
import { RARITY_META } from "@/data/rarity";
import { normalizeId } from "@/data/unitDetails";
import {
  DEFAULT_MODIFIER_BONUSES,
  getModifierBreakdown,
} from "@/data/unitValues";

function prettifyName(basename: string) {
  return basename.replace(/[_-]+/g, " ").replace(/\b(\w)/g, (m) => m.toUpperCase()).trim();
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const cardsDir = path.join(process.cwd(), "app", "cards");
  let files: string[] = [];
  try {
    files = fs
      .readdirSync(cardsDir)
      .filter((f) => fs.statSync(path.join(cardsDir, f)).isFile());
  } catch (e) {
    files = [];
  }

  const normalizedId = normalizeId(id);

  const matchFile = files.find((file) => {
    const name = path.parse(file).name;
    const candidateId = normalizeId(name);
    return candidateId === normalizedId;
  });

  const unit = UNITS.find((u) => u.id === normalizedId);
  const imageUrl = matchFile ? `/api/cards/${encodeURIComponent(matchFile)}` : unit?.image;

  const displayName = unit ? unit.name : matchFile ? prettifyName(path.parse(matchFile).name) : id;
  const rarity = unit ? unit.rarity : ("Common" as const);
  const meta = RARITY_META[rarity];
  const breakdown = unit ? getModifierBreakdown(unit, { mutation: null, trait: null, level: 1 }, DEFAULT_MODIFIER_BONUSES) : null;

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
        <h2 className="font-display text-xl font-black">Value breakdown</h2>
        {breakdown ? (
          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-xl border border-ink-line/70 bg-ink p-3">
              <p className="text-xs uppercase tracking-[0.2em] text-text-faint">Base value</p>
              <p className="mt-2 text-lg font-semibold text-text">{breakdown.baseValue}</p>
            </div>
            <div className="rounded-xl border border-ink-line/70 bg-ink p-3">
              <p className="text-xs uppercase tracking-[0.2em] text-text-faint">Mutation</p>
              <p className="mt-2 text-lg font-semibold text-text">×{breakdown.mutationMultiplier}</p>
            </div>
            <div className="rounded-xl border border-ink-line/70 bg-ink p-3">
              <p className="text-xs uppercase tracking-[0.2em] text-text-faint">Trait</p>
              <p className="mt-2 text-lg font-semibold text-text">×{breakdown.traitMultiplier}</p>
            </div>
            <div className="rounded-xl border border-ink-line/70 bg-ink p-3">
              <p className="text-xs uppercase tracking-[0.2em] text-text-faint">Level</p>
              <p className="mt-2 text-lg font-semibold text-text">×{breakdown.levelMultiplier.toFixed(2)} (lvl {breakdown.level})</p>
            </div>
          </div>
        ) : (
          <p className="mt-3 text-sm text-text-faint">No value data available for this unit yet.</p>
        )}
      </div>

      <div className="prose">
        <p>No bio yet. Edit data/units.ts or drop a card image into app/cards to add this unit.</p>
      </div>
    </div>
  );
}
