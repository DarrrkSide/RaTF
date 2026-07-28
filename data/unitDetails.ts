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
  u("Sakuna (Heian)", "God",500000),
  u("Goji Shinjuku", "God", 90000),
  u("Ais", "God", 225000),
  u("Wise", "God", 130000),
  u("Yoichi", "God", 110000),
  u("Aisen Divine", "God", 150000),
  u("Shancks", "God", 120000),
  u("Isogo True Form", "God", 69000),
  u("Yamumoto", "God", 16000),
  u("Bills", "God", 138000),
  u("Lulu", "God", 99000),
  u("Michael", "God", 172000),
  u("Remura", "God", 70000),
];

const LIMITED_UNITS: UnitDetails[] = [
  u("Aldedo", "Limited", 298000),
  u("Saitome (Serious)", "Limited", 274000),
  u("Bloodtear", "Limited", 261000),
  u("Takamoso", "Limited", 179000),
  u("Entomancer", "Limited", 165000),
  u("Genes", "Limited", 162000),
  u("Galactic Garo", "Limited", 139000),
  u("Golden Frozer", "Limited", 137000),
  u("Muscle", "Limited", 130000),
  u("Tanjuro", "Epic", 117000),
];

const SECRET_UNITS: UnitDetails[] = [
  u("Kenie", "Secret", 55000),
  u("Ulquiopta", "Secret", 30000),
  u("Yutta", "Secret", 37000),
  u("Brakura", "Secret", 31000),
  u("Yuwah", "Secret", 30000),
  u("Duma", "Secret", 29000),
  u("Deyo", "Secret", 18000),
  u("Fryren", "Secret", 14000),
  u("Megumo", "Secret", 8000),
  u("Gyomain", "Secret", 1000),
  u("Jerin", "Secret", 3000),
];

const MYTHIC_UNITS: UnitDetails[] = [
  u("Kiwusuke", "Mythic", 22000),
  u("Shimo Haya", "Mythic", 18000),
  u("Joti", "Mythic", 6000),
  u("Brocolli", "Mythic", 5000),
  u("Rengundam", "Mythic", 4000),
  u("Akazo", "Mythic", 3600),
  u("Orihemi", "Mythic", 3400),
  u("Kokushiro", "Mythic", 2800),
  u("Hoshira", "Mythic", 2700),
  u("Yoriki", "Mythic", 2600),
  u("Acer", "Mythic", 2500),
  u("Coyote", "Mythic", 2400),
];

const LEGENDARY_UNITS: UnitDetails[] = [
  u("Goji", "Legendary", 3500),
  u("Sakuna", "Legendary", 3400),
  u("Erwon", "Legendary", 1000),
  u("Zinichou", "Legendary", 900),
  u("Noruto", "Legendary", 700),
  u("Nonomi", "Legendary", 650),
  u("Grimmick", "Legendary", 400),
  u("Saitomo", "Legendary", 5000),
  u("Truck", "Legendary", 3000),
];

const RARE_UNITS: UnitDetails[] = [
  u("Sukora", "Rare", 10),
  u("Mobi", "Rare", 10),
  u("Goke", "Rare", 10),
  u("Janwoo", "Rare", 10),
  u("Mika", "Rare", 10),
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
  saitomo: { stats: { damage: 120, defense: 1.27, health: 4500, speed: 1 } },
  brakura: { stats: { damage: 2000, defense: 1.25, health: 5800, speed: 1 } },
  wise: { stats: { damage: 2600, defense: 1.25, health: 14000, speed: 4 } },
  zero: { stats: { damage: 30, defense: 1.15, health: 320, speed: 2 } },
  mika: { stats: { damage: 44, defense: 1.1, health: 620, speed: 1 } },
  itadoro: { stats: { damage: 10, defense: 1.12, health: 620, speed: 1 } },
  nonomi: { stats: { damage: 950, defense: 1.5, health: 10000, speed: 0.7 } },
  noruto: { stats: { damage: 200, defense: 1.25, health: 2500, speed: 1 } },
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
