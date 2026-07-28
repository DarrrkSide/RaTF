import { Rarity } from "./rarity";

export type Unit = {
  id: string;
  name: string;
  rarity: Rarity;
  value?: number;
  tag?: string; // optional extra label
  image?: string; // optional real art — drop a file in /public/cards and set e.g. "/cards/sakuna-heian.png"
};

function u(name: string, rarity: Rarity, value?: number, tag?: string): Unit {
  return { id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"), name, rarity, value, tag };
}

// Master unit list, transcribed from the community tier list screenshots.
// Rarity badges were used as the source of truth; where a unit appeared with
// slightly different spelling/rarity across lists, the clearer "quality"
// tier list reading was used. Double check against in-game data if a name
// looks off — anime-style names are easy to misread from stylized banners.
export const UNITS: Unit[] = [
  // Meta / top tier
  u("Sakuna (Heian)", "God", 120000),
  u("Goji Shinjuku", "God", 110000),
  u("Ais", "God", 105000),
  u("Aldedo", "Limited", 98000),
  u("Kenie", "Secret", 95000),
  u("Kiwusuke", "Mythic", 92000),
  u("Wise", "God", 87000),

  // S tier
  u("Saitome (Serious)", "Limited", 84000),
  u("Bloodtear", "Limited", 81000),
  u("Takamoso", "Limited", 79000),
  u("Yoichi", "God", 76000),
  u("Aisen Divine", "God", 74000),
  u("Shancks", "God", 72000),

  // A tier
  u("Ulquiopta", "Secret", 70000),
  u("Isogo True Form", "God", 69000),
  u("Shimo Haya", "Mythic", 68000),
  u("Yutta", "Secret", 67000),
  u("Entomancer", "Limited", 65000),
  u("Yamumoto", "God", 64000),
  u("Genes", "Limited", 62000),
  u("Brakura", "Secret", 61000),
  u("Yuwah", "Secret", 60000),
  u("Duma", "Secret", 59000),
  u("Bills", "God", 58000),

  // Progress
  u("Joti", "Mythic", 56000),
  u("Lulu", "God", 54000),
  u("Michael", "God", 52000),
  u("Brocolli", "Mythic", 50000),
  u("Deyo", "Secret", 48000),
  u("Rengundam", "Mythic", 46000),
  u("Fryren", "Secret", 44000),
  u("Akazo", "Mythic", 42000),
  u("Remura", "God", 40000),
  u("Galactic Garo", "Limited", 39000),
  u("Megumo", "Secret", 38000),
  u("Golden Frozer", "Limited", 37000),
  u("Orihemi", "Mythic", 36000),
  u("Goji", "Legendary", 35000),
  u("Sakuna", "Legendary", 34000),
  u("Erwon", "Legendary", 33000),
  u("Sukora", "Rare", 32000),

  // B tier
  u("Gyomain", "Secret", 31000),
  u("Muscle", "Limited", 30000),
  u("Jerin", "Secret", 29000),
  u("Kokushiro", "Mythic", 28000),
  u("Hoshira", "Mythic", 27000),
  u("Yoriki", "Mythic", 26000),
  u("Acer", "Mythic", 25000),
  u("Coyote", "Mythic", 24000),
  u("Zinichou", "Legendary", 23000),
  u("Noruto", "Legendary", 22000),
  u("Nonomi", "Legendary", 21000),
  u("Grimmick", "Legendary", 20000),
  u("Saitomo", "Legendary", 19000),
  u("Truck", "Legendary", 18000),
  u("Tanjuro", "Epic", 17000),
  u("Got", "Epic", 16000),

  // C tier
  u("Picurro", "Epic", 15000),
  u("Bon", "Epic", 14000),
  u("Manji", "Epic", 13000),
  u("Shinrat", "Epic", 12000),
  u("Mobi", "Rare", 11000),
  u("Goke", "Rare", 10000),
  u("Itadoro", "Common", 9000),

  // Trash tier
  u("Rinnju", "Epic", 8000),
  u("Janwoo", "Rare", 7000),
  u("Mika", "Rare", 6000),
  u("Usoff", "Common", 5000),
  u("Zero", "Common", 4000),
  u("Keririn", "Common", 3000),
  u("Luppi", "Common", 2000),


];

export function getUnitByName(name: string): Unit | undefined {
  return UNITS.find((unit) => unit.name.toLowerCase() === name.toLowerCase());
}
