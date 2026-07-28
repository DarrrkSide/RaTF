import fs from "fs";
import path from "path";

export async function GET(_: Request, { params }: { params: Promise<{ image: string }> }) {
  const { image } = await params;
  const filePath = path.join(process.cwd(), "app", "cards", image);
  if (!fs.existsSync(filePath)) return new Response("Not found", { status: 404 });
  const buffer = fs.readFileSync(filePath);
  const ext = path.extname(image).toLowerCase();
  const mime = ext === ".png" ? "image/png" : ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" : "application/octet-stream";
  return new Response(buffer, { status: 200, headers: { "Content-Type": mime } });
}
