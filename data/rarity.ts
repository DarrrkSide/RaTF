export type Rarity =
  | "God"
  | "Secret"
  | "Limited"
  | "Mythic"
  | "Legendary"
  | "Epic"
  | "Rare"
  | "Common";

export const RARITY_ORDER: Rarity[] = [
  "God",
  "Secret",
  "Limited",
  "Mythic",
  "Legendary",
  "Epic",
  "Rare",
  "Common",
];

export const RARITY_META: Record<
  Rarity,
  { text: string; border: string; bg: string; glow: string; chip: string; hex: string }
> = {
  God: {
    text: "text-rarity-god",
    border: "border-rarity-god/60",
    bg: "bg-rarity-god/10",
    glow: "shadow-[0_0_24px_-4px_rgba(239,68,68,0.55)]",
    chip: "bg-rarity-god/15 text-rarity-god border-rarity-god/40",
    hex: "#ef4444",
  },
  Secret: {
    text: "text-rarity-secret",
    border: "border-rarity-secret/50",
    bg: "bg-rarity-secret/10",
    glow: "shadow-[0_0_24px_-4px_rgba(148,163,184,0.45)]",
    chip: "bg-rarity-secret/15 text-rarity-secret border-rarity-secret/40",
    hex: "#94a3b8",
  },
  Limited: {
    text: "text-rarity-limited",
    border: "border-rarity-limited/60",
    bg: "bg-rarity-limited/10",
    glow: "shadow-[0_0_24px_-4px_rgba(232,121,249,0.55)]",
    chip: "bg-rarity-limited/15 text-rarity-limited border-rarity-limited/40",
    hex: "#e879f9",
  },
  Mythic: {
    text: "text-rarity-mythic",
    border: "border-rarity-mythic/60",
    bg: "bg-rarity-mythic/10",
    glow: "shadow-[0_0_24px_-4px_rgba(251,113,133,0.55)]",
    chip: "bg-rarity-mythic/15 text-rarity-mythic border-rarity-mythic/40",
    hex: "#fb7185",
  },
  Legendary: {
    text: "text-rarity-legendary",
    border: "border-rarity-legendary/60",
    bg: "bg-rarity-legendary/10",
    glow: "shadow-[0_0_24px_-4px_rgba(251,191,36,0.55)]",
    chip: "bg-rarity-legendary/15 text-rarity-legendary border-rarity-legendary/40",
    hex: "#fbbf24",
  },
  Epic: {
    text: "text-rarity-epic",
    border: "border-rarity-epic/60",
    bg: "bg-rarity-epic/10",
    glow: "shadow-[0_0_24px_-4px_rgba(167,139,250,0.55)]",
    chip: "bg-rarity-epic/15 text-rarity-epic border-rarity-epic/40",
    hex: "#a78bfa",
  },
  Rare: {
    text: "text-rarity-rare",
    border: "border-rarity-rare/60",
    bg: "bg-rarity-rare/10",
    glow: "shadow-[0_0_24px_-4px_rgba(56,189,248,0.55)]",
    chip: "bg-rarity-rare/15 text-rarity-rare border-rarity-rare/40",
    hex: "#38bdf8",
  },
  Common: {
    text: "text-rarity-common",
    border: "border-rarity-common/60",
    bg: "bg-rarity-common/10",
    glow: "shadow-[0_0_24px_-4px_rgba(52,211,153,0.45)]",
    chip: "bg-rarity-common/15 text-rarity-common border-rarity-common/40",
    hex: "#34d399",
  },
};
