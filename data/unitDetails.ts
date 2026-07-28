import type { Rarity } from "./rarity";

export type UnitStats = {
  damage?: number;
  defense?: number;
  health?: number;
  speed?: number;
};

export type UnitAbility = {
  title: string;
  description: string;
};

export type UnitDetails = {
  id: string;
  name: string;
  rarity: Rarity;
  value?: number;
  tag?: string;
  image?: string;
  stats?: UnitStats;
  ability?: UnitAbility;
};

function u(name: string, rarity: Rarity, value?: number, tag?: string): UnitDetails {
  return {
    id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    name,
    rarity,
    value,
    tag,
    stats: {},
    ability: { title: "", description: "" },
  };
}

const GOD_UNITS: UnitDetails[] = [
  u("Sakuna (Heian)", "God",300000),
  u("Goji Shinjuku", "God", 110000),
  u("Ais", "God", 105000),
  u("Wise", "God", 87000),
  u("Yoichi", "God", 76000),
  u("Aisen Divine", "God", 74000),
  u("Shancks", "God", 72000),
  u("Isogo True Form", "God", 69000),
  u("Yamumoto", "God", 64000),
  u("Bills", "God", 58000),
  u("Lulu", "God", 54000),
  u("Michael", "God", 52000),
  u("Remura", "God", 40000),
];

const LIMITED_UNITS: UnitDetails[] = [
  u("Aldedo", "Limited", 98000),
  u("Saitome (Serious)", "Limited", 84000),
  u("Bloodtear", "Limited", 81000),
  u("Takamoso", "Limited", 79000),
  u("Entomancer", "Limited", 65000),
  u("Genes", "Limited", 62000),
  u("Galactic Garo", "Limited", 39000),
  u("Golden Frozer", "Limited", 37000),
  u("Muscle", "Limited", 30000),
  u("Tanjuro", "Epic", 17000),
];

const SECRET_UNITS: UnitDetails[] = [
  u("Kenie", "Secret", 95000),
  u("Ulquiopta", "Secret", 70000),
  u("Yutta", "Secret", 67000),
  u("Brakura", "Secret", 61000),
  u("Yuwah", "Secret", 60000),
  u("Duma", "Secret", 59000),
  u("Deyo", "Secret", 48000),
  u("Fryren", "Secret", 44000),
  u("Megumo", "Secret", 38000),
  u("Gyomain", "Secret", 31000),
  u("Jerin", "Secret", 29000),
];

const MYTHIC_UNITS: UnitDetails[] = [
  u("Kiwusuke", "Mythic", 92000),
  u("Shimo Haya", "Mythic", 68000),
  u("Joti", "Mythic", 56000),
  u("Brocolli", "Mythic", 50000),
  u("Rengundam", "Mythic", 46000),
  u("Akazo", "Mythic", 42000),
  u("Orihemi", "Mythic", 36000),
  u("Kokushiro", "Mythic", 28000),
  u("Hoshira", "Mythic", 27000),
  u("Yoriki", "Mythic", 26000),
  u("Acer", "Mythic", 25000),
  u("Coyote", "Mythic", 24000),
];

const LEGENDARY_UNITS: UnitDetails[] = [
  u("Goji", "Legendary", 35000),
  u("Sakuna", "Legendary", 34000),
  u("Erwon", "Legendary", 33000),
  u("Zinichou", "Legendary", 23000),
  u("Noruto", "Legendary", 22000),
  u("Nonomi", "Legendary", 21000),
  u("Grimmick", "Legendary", 20000),
  u("Saitomo", "Legendary", 19000),
  u("Truck", "Legendary", 18000),
];

const RARE_UNITS: UnitDetails[] = [
  u("Sukora", "Rare", 32000),
  u("Mobi", "Rare", 11000),
  u("Goke", "Rare", 10000),
  u("Janwoo", "Rare", 7000),
  u("Mika", "Rare", 6000),
];

const EPIC_UNITS: UnitDetails[] = [
  u("Got", "Epic", 16000),
  u("Picurro", "Epic", 15000),
  u("Bon", "Epic", 14000),
  u("Manji", "Epic", 13000),
  u("Shinrat", "Epic", 12000),
  u("Rinnju", "Epic", 8000),
];

const COMMON_UNITS: UnitDetails[] = [
  u("Itadoro", "Common", 9000),
  u("Usoff", "Common", 5000),
  u("Zero", "Common", 4000),
  u("Keririn", "Common", 3000),
  u("Luppi", "Common", 2000),
];

const KNOWN_DETAIL_OVERRIDES: Record<string, Partial<UnitDetails>> = {
  usoff: { stats: { damage: 16, defense: 1.1, health: 160, speed: 1 } },
  joti: { stats: { damage: 1750, defense: 1.5, health: 10000, speed: 1 } },
  kiwusuke: { stats: { damage: 1500, defense: 1.15, health: 5000, speed: 2 } },
  brocolli: { stats: { damage: 600, defense: 1.22, health: 6400, speed: 3 } },
  acer: { stats: { damage: 360, defense: 1.2, health: 3500, speed: 0.6 } },
  hoshira: { stats: { damage: 430, defense: 1.2, health: 4165, speed: 0.6 } },
  "shimo-haya": { stats: { damage: 7000, defense: 1.2, health: 3145, speed: 3 } },
  yoriki: { stats: { damage: 1250, defense: 1.15, health: 5780, speed: 1 } },
  coyote: { stats: { damage: 175, defense: 1.25, health: 3570, speed: 3 } },
  kenie: { stats: { damage: 2100, defense: 1.32, health: 18000, speed: 1 } },
  ulquiopta: { stats: { damage: 7500, defense: 1.25, health: 7500, speed: 2.5 } },
  jerin: { stats: { damage: 500, defense: 1.25, health: 16500, speed: 1 } },
  yuwah: { stats: { damage: 300, defense: 1.12, health: 6500, speed: 3 } },
  fryren: { stats: { damage: 2000, defense: 1.25, health: 5800, speed: 3.5 } },
};

function applyOverrides(units: UnitDetails[]) {
  return units.map((unit) => {
    const override = KNOWN_DETAIL_OVERRIDES[unit.id];
    return override ? { ...unit, ...override } : unit;
  });
}

export const UNIT_DETAILS: UnitDetails[] = [
  ...applyOverrides(GOD_UNITS),
  ...applyOverrides(LIMITED_UNITS),
  ...applyOverrides(SECRET_UNITS),
  ...applyOverrides(MYTHIC_UNITS),
  ...applyOverrides(LEGENDARY_UNITS),
  ...applyOverrides(RARE_UNITS),
  ...applyOverrides(EPIC_UNITS),
  ...applyOverrides(COMMON_UNITS),
];

export function getDetailsById(id: string): UnitDetails | undefined {
  return UNIT_DETAILS.find((detail) => detail.id === id);
}
