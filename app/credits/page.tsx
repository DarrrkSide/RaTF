import { CREDITS } from "@/data/credits";

export default function CreditsPage() {
  return (
    <div className="mx-auto flex max-w-lg flex-col gap-10 py-8">
      <h1 className="font-display text-4xl tracking-wide text-text">Credits</h1>

      <div className="flex flex-col divide-y divide-ink-line rounded-xl border border-ink-line bg-ink-surface">
        {CREDITS.map((c) => (
          <div
            key={c.role}
            className="flex items-center justify-between px-5 py-4 transition-colors hover:bg-ink-surface2"
          >
            <span className="font-body text-sm text-text-dim">{c.role}</span>
            <span className="font-display text-lg tracking-wide text-text">
              {c.name}
            </span>
          </div>
        ))}
      </div>

      <p className="font-body text-xs text-text-faint">
        Fan-made guide. Not affiliated with Roll Anime to Fight or Roblox.
      </p>
    </div>
  );
}
