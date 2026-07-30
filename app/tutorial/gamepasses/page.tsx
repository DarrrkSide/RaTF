import { TutorialSectionShell } from "@/components/TutorialSectionShell";
import { GAMEPASS_PRIORITY } from "@/data/gamepasses";

export default function GamepassesPage() {
  return (
    <TutorialSectionShell
      title="Gamepass Priority"
      description="The recommended order to prioritize your gamepasses."
    >
      <div className="flex flex-wrap items-center gap-2">
        {GAMEPASS_PRIORITY.map((pass, i) => (
          <div key={pass} className="flex items-center gap-2">
            <span className="rounded-lg border border-ink-line bg-ink-surface px-3 py-2 font-body text-sm font-semibold text-text transition-all duration-300 ease-out hover:-translate-y-0.5">
              {pass}
            </span>
            {i < GAMEPASS_PRIORITY.length - 1 && <span className="text-text-faint">→</span>}
          </div>
        ))}
      </div>
    </TutorialSectionShell>
  );
}
