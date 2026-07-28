import { TRAIT_TIERS } from "@/data/traits";
import { MUTATIONS } from "@/data/mutations";
import { GAMEPASS_PRIORITY, GAMEPASS_SOURCE_URL } from "@/data/gamepasses";

function SectionHeading({ title }: { title: string }) {
  return (
    <h2 className="mb-4 font-display text-2xl font-black tracking-[0.06em] text-text sm:text-3xl">
      {title}
    </h2>
  );
}

export default function TutorialPage() {
  return (
    <div className="flex flex-col gap-14">
      <h1 className="font-display text-4xl font-black tracking-[0.08em] text-text sm:text-5xl">
        Guide
      </h1>

      {/* Traits */}
      <section>
        <SectionHeading title="Traits" />
        <div className="flex flex-col gap-6">
          {TRAIT_TIERS.map((tier) => (
            <div key={tier.tier}>
              <div className="mb-2 flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: tier.color }}
                />
                <h3 className="font-display text-lg font-black tracking-[0.06em]" style={{ color: tier.color }}>
                  {tier.tier}
                </h3>
              </div>
              <div className="overflow-hidden rounded-xl border border-ink-line">
                <table className="w-full border-collapse text-left">
                  <tbody>
                    {tier.traits.map((trait, i) => (
                      <tr
                        key={trait.name}
                        className={i % 2 === 0 ? "bg-ink-surface" : "bg-ink-surface/60"}
                      >
                        <td className="px-4 py-3 font-body text-sm font-semibold text-text">
                          {trait.name}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 font-mono text-sm" style={{ color: tier.color }}>
                          {trait.dropChance}
                        </td>
                        <td className="px-4 py-3 font-body text-sm text-text-dim">
                          {trait.buffs}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 font-body text-xs text-text-faint">
          Trait shards drop from normal play.
        </p>
      </section>

      {/* Mutations */}
      <section>
        <SectionHeading title="Mutations" />
        <div className="overflow-hidden rounded-xl border border-ink-line">
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
                  <td className="px-4 py-3 font-mono text-sm text-text">{mut.damage}</td>
                  <td className="px-4 py-3 font-mono text-sm text-text">{mut.health}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 font-body text-xs text-text-faint">
          Random mutation events run every 15 minutes.
        </p>
      </section>

      {/* Upgrade path */}
      <section>
        <SectionHeading title="Upgrade order" />
        <div className="flex flex-wrap items-center gap-2">
          {["Anime Slot", "Coins", "Luck", "Anime Inventory"].map((step, i, arr) => (
            <div key={step} className="flex items-center gap-2">
              <span className="rounded-lg border border-ink-line bg-ink-surface px-3 py-2 font-body text-sm font-semibold text-text">
                {step}
              </span>
              {i < arr.length - 1 && <span className="text-text-faint">&rarr;</span>}
            </div>
          ))}
        </div>
        <p className="mt-3 font-body text-xs text-text-faint">
          Checkpoints (in Settings) let you start on a higher wave.
        </p>
      </section>

      {/* Merging & cloning */}
      <section>
        <SectionHeading title="Merging & cloning" />
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-ink-line bg-ink-surface p-5">
            <h3 className="font-display text-lg font-black tracking-[0.06em] text-text">Merging</h3>
            <p className="mt-2 font-body text-sm text-text-dim">
              Two of the same anime, same evolution, merge into one stronger unit.
            </p>
            <p className="mt-3 rounded-lg border border-rarity-mythic/40 bg-rarity-mythic/10 px-3 py-2 font-body text-xs text-rarity-mythic">
              Keep the trait-holder deployed before merging, or the trait is lost.
            </p>
          </div>
          <div className="rounded-xl border border-ink-line bg-ink-surface p-5">
            <h3 className="font-display text-lg font-black tracking-[0.06em] text-text">Cloning</h3>
            <p className="mt-2 font-body text-sm text-text-dim">
              Costs essence (drops, wheel, VIP chest, events). Copies mutation and trait.
            </p>
          </div>
        </div>
      </section>

      {/* Gamepasses */}
      <section>
        <SectionHeading title="Gamepass priority" />
        <div className="flex flex-wrap items-center gap-2">
          {GAMEPASS_PRIORITY.map((pass, i) => (
            <div key={pass} className="flex items-center gap-2">
              <span className="rounded-lg border border-ink-line bg-ink-surface px-3 py-2 font-body text-sm font-semibold text-text">
                {pass}
              </span>
              {i < GAMEPASS_PRIORITY.length - 1 && (
                <span className="text-text-faint">&rarr;</span>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
