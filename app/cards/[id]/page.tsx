import fs from "fs";
import path from "path";
import { UNITS } from "@/data/units";
import { RARITY_META } from "@/data/rarity";

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

  const matchFile = files.find((file) => {
    const name = path.parse(file).name;
    const candidateId = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    return candidateId === id;
  });

  const unit = UNITS.find((u) => u.id === id);
  const imageUrl = matchFile ? `/api/cards/${encodeURIComponent(matchFile)}` : unit?.image;

  const displayName = unit ? unit.name : matchFile ? prettifyName(path.parse(matchFile).name) : id;
  const rarity = unit ? unit.rarity : ("Common" as const);
  const meta = RARITY_META[rarity];

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
          <div className="mt-2 w-fit rounded-full border px-3 py-1 font-mono text-xs font-bold uppercase" style={{ color: meta.hex, borderColor: meta.hex + "66", backgroundColor: meta.hex + "14" }}>{rarity}</div>
        </div>
      </div>

      <div className="prose">
        <p>No bio yet. Edit data/units.ts or drop a card image into app/cards to add this unit.</p>
      </div>
    </div>
  );
}
