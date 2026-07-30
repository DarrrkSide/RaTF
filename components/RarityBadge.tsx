import { Rarity, RARITY_META } from "@/data/rarity";

export default function RarityBadge({ rarity }: { rarity: Rarity }) {
  const meta = RARITY_META[rarity];
  const isMythic = rarity === "Mythic";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${meta.chip}`}
      style={isMythic ? {
        backgroundImage: "linear-gradient(90deg, rgba(244,114,182,0.22), rgba(192,132,252,0.22), rgba(34,211,238,0.22))",
        color: "transparent",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
      } : undefined}
    >
      {rarity}
    </span>
  );
}
