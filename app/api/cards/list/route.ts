import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { UNITS } from "@/data/units";

function prettifyName(basename: string) {
  return basename
    .replace(/[_-]+/g, " ")
    .replace(/\b(\w)/g, (m) => m.toUpperCase())
    .trim();
}

export async function GET() {
  const cardsDir = path.join(process.cwd(), "app", "cards");
  let files: string[] = [];
  try {
    files = fs
      .readdirSync(cardsDir)
      .filter((f) => fs.statSync(path.join(cardsDir, f)).isFile());
  } catch (e) {
    files = [];
  }

  const map = new Map(UNITS.map((u) => [u.id, { ...u }]));

  files.forEach((file) => {
    const name = path.parse(file).name;
    const candidateId = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const imageUrl = `/api/cards/${encodeURIComponent(file)}`;

    if (map.has(candidateId)) {
      map.get(candidateId)!.image = imageUrl;
    } else {
      map.set(candidateId, {
        id: candidateId,
        name: prettifyName(name),
        rarity: "Common",
        image: imageUrl,
      });
    }
  });

  const out = Array.from(map.values());
  return NextResponse.json(out);
}
