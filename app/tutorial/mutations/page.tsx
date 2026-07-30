import { TutorialSectionShell } from "@/components/TutorialSectionShell";
import { MUTATIONS } from "@/data/mutations";

function formatMutationValue(name: string, value: string, type: "damage" | "health") {
  if (name === "Astronaut") {
    return type === "damage" ? "x7.5" : "x3.5";
  }
  return value;
}

export default function MutationsPage() {
  return (
    <TutorialSectionShell
      title="Mutation Events"
      description="Each mutation gives a percentage boost to damage and health, and events happen on a fixed schedule."
    >
      <div className="overflow-hidden rounded-xl border border-ink-line transition-all duration-300 ease-out hover:-translate-y-0.5">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-ink-surface2 font-body text-xs uppercase tracking-wide text-text-faint">
              <th className="px-4 py-2.5 font-semibold">Mutation</th>
              <th className="px-4 py-2.5 font-semibold">Damage</th>
              <th className="px-4 py-2.5 font-semibold">Health</th>
            </tr>
          </thead>
          <tbody>
            {MUTATIONS.map((mut, i) => (
              <tr key={mut.name} className={i % 2 === 0 ? "bg-ink-surface" : "bg-ink-surface/60"}>
                <td className="px-4 py-3 font-body text-sm font-semibold" style={{ color: mut.color }}>
                  {mut.name}
                </td>
                <td className="px-4 py-3 font-mono text-sm text-text">{formatMutationValue(mut.name, mut.damage, "damage")}</td>
                <td className="px-4 py-3 font-mono text-sm text-text">{formatMutationValue(mut.name, mut.health, "health")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-xl border border-ink-line bg-ink-surface p-5 transition-all duration-300 ease-out hover:-translate-y-0.5">
        <h2 className="font-display text-lg font-black tracking-[0.06em] text-text">Event schedule</h2>
        <ul className="mt-3 flex flex-col gap-2">
          {[
            { name: "Demon", time: "xx:15" },
            { name: "Destroyer", time: "xx:30" },
            { name: "Hollow", time: "xx:45" },
            { name: "Slayer", time: "xx:00" },
            { name: "Astronaut", time: "Every Admin Abuse" },
          ].map((event) => (
            <li key={event.name} className="flex items-center justify-between gap-3 border-b border-ink-line/70 py-2 transition-all duration-300 ease-out last:border-none hover:-translate-y-0.5">
              <span className="font-body text-sm font-semibold text-text">{event.name}</span>
              <span className="font-mono text-sm text-text-dim">{event.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </TutorialSectionShell>
  );
}
