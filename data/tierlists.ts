export type TierRow = {
  label: string;
  sublabel?: string;
  color: string; // hex used for the row's accent band
  units: string[]; // unit names, matched against data/units.ts
};

// "How far a unit can reliably solo-push waves" — read top to bottom,
// highest wave first.
export const WAVE_TIER_LIST: TierRow[] = [
  {
    label: "200+",
    color: "#a78bfa",
    units: [
      "Sakuna (Heian)",
      "Goji Shinjuku",
      "Ais",
      "Aldedo",
      "Shancks",
      "Saitome (Serious)",
      "Kenie",
      "Kiwusuke",
      "Wise",
    ],
  },
  {
    label: "190",
    color: "#fb7185",
    units: ["Yoichi", "Bloodtear"],
  },
  {
    label: "180",
    color: "#fb923c",
    units: ["Aisen (Divine)", "Isoge (True Form)", "Takamoso", "Entomancer", "Galactic Garo"],
  },
  {
    label: "170",
    color: "#fde047",
    units: ["Yutta", "Ulquiopta"],
  },
  {
    label: "160",
    color: "#facc15",
    units: ["Gyomain", "Shimo Haya"],
  },
  {
    label: "150",
    color: "#a3e635",
    units: ["Yamumoto", "Yuwah", "Megumo", "Bakura", "Genes"],
  },
  {
    label: "Trash",
    sublabel: "Under 150 — not worth pushing with",
    color: "#4ade80",
    units: [
      "Joti", "Nonomi", "Deyo", "Sakuna", "Bills", "Goji", "Lulu", "Grimmick",
      "Jerin", "Michael", "Noruto", "Remura", "Zinichou", "Sukora", "Duma",
      "Coyote", "Fryren", "Tanjuro", "Brocolli", "Itadoro", "Rengundam",
       "Mobi", "Shinrat", "Akazo", "Manji", "Bon", "Orihemi", "Erwon",
      "Rinnju", "Janwoo", "Mika", "Acer", "Yoriki", "Hoshira", "Kokushiro",
      "Muscle", "Usoff", "Got", "Saitomo", "Truck", "Zero", "Keririn", "Picurro",
    ],
  },
];

// Overall power / usefulness tier list, judged at level 1 (no traits or
// mutations factored in).
export const QUALITY_TIER_LIST: TierRow[] = [
  {
    label: "META",
    color: "#ef4444",
    units: ["Sakuna (Heian)", "Goji Shinjuku", "Ais", "Aldedo", "Kenie", "Kiwusuke"],
  },
  {
    label: "S",
    color: "#fb7185",
    units: ["Saitome (Serious)", "Bloodtear", "Shancks", "Takamoso", "Yoichi", "Aisen (Divine)"],
  },
  {
    label: "A",
    color: "#fb923c",
    units: [
      "Ulquiopta", "Isoge (True Form)", "Shimo Haya", "Yutta", "Entomancer",
      "Yamumoto", "Genes", "Bakura", "Yuwah", "Duma", "Bills",
    ],
  },
  {
    label: "Progress",
    sublabel: "Solid while you build toward S / META",
    color: "#e5e7eb",
    units: [
      "Joti", "Lulu", "Michael", "Brocolli", "Deyo", "Rengundam", "Fryren",
      "Akazo", "Remura", "Wise", "Galactic Garo", "Megumo", "Golden Frozer",
      "Orihemi", "Goji", "Sakuna", "Erwon", "Sukora",
    ],
  },
  {
    label: "B",
    color: "#fde047",
    units: [
      "Gyomain", "Muscle", "Jerin", "Kokushiro", "Hoshira", "Yoriki", "Acer",
      "Coyote", "Zinichou", "Noruto", "Nonomi", "Grimmick", "Saitomo", "Truck",
      "Tanjuro", "Got",
    ],
  },
  {
    label: "C",
    color: "#4ade80",
    units: ["Picurro", "Bon", "Manji", "Shinrat", "Mobi", "Goke", "Itadoro"],
  },
  {
    label: "Trash",
    sublabel: "Bench these the moment you outgrow them",
    color: "#94a3b8",
    units: ["Rinnju", "Janwoo", "Mika", "Usoff", "Zero", "Keririn", "Luppi"],
  },
];
