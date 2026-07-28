import { Rarity, RARITY_META } from "@/data/rarity";

export default function RarityBadge({ rarity }: { rarity: Rarity }) {
  const meta = RARITY_META[rarity];
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${meta.chip}`}
    >
      {rarity}
    </span>
  );
}
