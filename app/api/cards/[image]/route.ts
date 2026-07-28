import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { image: string } }) {
  const image = params.image;
  const filePath = path.join(process.cwd(), "app", "cards", image);
  if (!fs.existsSync(filePath)) return new Response("Not found", { status: 404 });
  const buffer = fs.readFileSync(filePath);
  const ext = path.extname(image).toLowerCase();
  const mime = ext === ".png" ? "image/png" : ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" : "application/octet-stream";
  return new Response(buffer, { status: 200, headers: { "Content-Type": mime } });
}
