import { Rarity } from "./rarity";

export type Unit = {
  id: string;
  name: string;
  rarity: Rarity;
  tag?: string; // optional extra label
  image?: string; // optional real art — drop a file in /public/cards and set e.g. "/cards/sakuna-heian.png"
};

function u(name: string, rarity: Rarity, tag?: string): Unit {
  return { id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"), name, rarity, tag };
}

// Master unit list, transcribed from the community tier list screenshots.
// Rarity badges were used as the source of truth; where a unit appeared with
// slightly different spelling/rarity across lists, the clearer "quality"
// tier list reading was used. Double check against in-game data if a name
// looks off — anime-style names are easy to misread from stylized banners.
export const UNITS: Unit[] = [
  // Meta / top tier
  u("Sakuna (Heian)", "God"),
  u("Goji (Shinjuku)", "God"),
  u("Ais", "God"),
  u("Aldedo", "Limited"),
  u("Kenie", "Secret"),
  u("Kiwusuke", "Mythic"),
  u("Wise", "God"),

  // S tier
  u("Saitome (Serious)", "Limited"),
  u("Bloodtear", "Limited"),
  u("Shancks", "Limited"),
  u("Takamoso", "Limited"),
  u("Yoichi", "God"),
  u("Aisen (Divine)", "God"),

  // A tier
  u("Ulquiopta", "Secret"),
  u("Isoge (True Form)", "God"),
  u("Shimo Haya", "Mythic"),
  u("Yutta", "Secret"),
  u("Entomancer", "Limited"),
  u("Yamumoto", "God"),
  u("Genes", "Limited"),
  u("Bakura", "Secret"),
  u("Yuwah", "Secret"),
  u("Duma", "Rare", "30%"),
  u("Bills", "God"),

  // Progress
  u("Joti", "Mythic"),
  u("Lulu", "God"),
  u("Michael", "God"),
  u("Brocolli", "Mythic"),
  u("Deyo", "Legendary"),
  u("Rengundam", "Mythic"),
  u("Fryren", "Secret"),
  u("Akazo", "Epic", "60%"),
  u("Remura", "God"),
  u("Galactic Garo", "Limited"),
  u("Megumo", "Secret"),
  u("Golden Frozer", "Limited"),
  u("Orihemi", "Mythic"),
  u("Goji", "Legendary"),
  u("Sakuna", "Legendary"),
  u("Erwon", "Legendary"),
  u("Sukora", "Rare"),

  // B tier
  u("Gyomain", "Secret"),
  u("Muscle", "Limited"),
  u("Jerin", "Secret"),
  u("Kokushiro", "Mythic"),
  u("Hoshira", "Mythic"),
  u("Yoriki", "Mythic"),
  u("Acer", "Mythic"),
  u("Coyote", "Mythic"),
  u("Zinichou", "Legendary"),
  u("Noruto", "Legendary"),
  u("Nonomi", "Legendary"),
  u("Grimmick", "Legendary"),
  u("Saitomo", "Legendary"),
  u("Truck", "Legendary"),
  u("Tanjuro", "Epic"),
  u("Got", "Epic"),

  // C tier
  u("Picurro", "Epic"),
  u("Bon", "Epic"),
  u("Manji", "Epic"),
  u("Shinrat", "Epic"),
  u("Mobi", "Rare"),
  u("Goke", "Rare"),
  u("Itadoro", "Common"),

  // Trash tier
  u("Rinnju", "Epic"),
  u("Janwoo", "Rare"),
  u("Mika", "Rare"),
  u("Usoff", "Common"),
  u("Zero", "Common"),
  u("Keririn", "Common"),
  u("Luppi", "Common"),

  // Extra units seen only on the wave-clear list
  u("Coke", "Rare"),
];

export function getUnitByName(name: string): Unit | undefined {
  return UNITS.find((unit) => unit.name.toLowerCase() === name.toLowerCase());
}
