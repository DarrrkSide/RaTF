import { TRAIT_TIERS } from "@/data/traits";
import { MUTATIONS, MUTATION_EVENT_INTERVAL_MINUTES } from "@/data/mutations";
import { GAMEPASS_PRIORITY, GAMEPASS_SOURCE_URL } from "@/data/gamepasses";

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-5">
      <p className="font-mono text-xs uppercase tracking-widest text-rarity-legendary">
        {eyebrow}
      </p>
      <h2 className="mt-1 font-display text-3xl tracking-wide text-text sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-2 max-w-2xl font-body text-sm text-text-dim sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

export default function TutorialPage() {
  return (
    <div className="flex flex-col gap-16">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-rarity-mythic">
          The full guide
        </p>
        <h1 className="mt-1 font-display text-4xl tracking-wide text-text sm:text-5xl">
          Traits, Mutations &amp; Progression
        </h1>
        <p className="mt-2 max-w-2xl font-body text-sm text-text-dim sm:text-base">
          How stat rolls work, how to actually get stronger, and where your coins are
          best spent.
        </p>
      </div>

      {/* Traits */}
      <section>
        <SectionHeading
          eyebrow="01 · Traits"
          title="Trait drop rates & buffs"
          description="Traits roll when a unit is summoned. Higher tiers are rarer but hit much harder — the jump from Legendary to Mythic traits is where runs really start to snowball."
        />
        <div className="flex flex-col gap-6">
          {TRAIT_TIERS.map((tier) => (
            <div key={tier.tier}>
              <div className="mb-2 flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: tier.color }}
                />
                <h3 className="font-display text-xl tracking-wide" style={{ color: tier.color }}>
                  {tier.tier}
                </h3>
              </div>
              <div className="overflow-hidden rounded-xl border border-ink-line">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-ink-surface2 font-body text-xs uppercase tracking-wide text-text-faint">
                      <th className="px-4 py-2.5 font-semibold">Trait</th>
                      <th className="px-4 py-2.5 font-semibold">Drop Chance</th>
                      <th className="px-4 py-2.5 font-semibold">Buffs</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tier.traits.map((trait, i) => (
                      <tr
                        key={trait.name}
                        className={i % 2 === 0 ? "bg-ink-surface" : "bg-ink-surface/60"}
                      >
                        <td className="px-4 py-3 font-body text-sm font-semibold text-text">
                          {trait.name}
                        </td>
                        <td className="px-4 py-3 font-mono text-sm" style={{ color: tier.color }}>
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
        <p className="mt-4 rounded-lg border border-ink-line bg-ink-surface px-4 py-3 font-body text-sm text-text-dim">
          <span className="font-semibold text-text">How to get trait shards:</span> play
          the game — shards come from normal progression, there&apos;s no shortcut.
        </p>
      </section>

      {/* Mutations */}
      <section>
        <SectionHeading
          eyebrow="02 · Mutations"
          title="Mutation tiers"
          description={`Random mutation events run every ${MUTATION_EVENT_INTERVAL_MINUTES} minutes — keep a unit ready to summon when one triggers.`}
        />
        <div className="overflow-hidden rounded-xl border border-ink-line">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-ink-surface2 font-body text-xs uppercase tracking-wide text-text-faint">
                <th className="px-4 py-2.5 font-semibold">Mutation</th>
                <th className="px-4 py-2.5 font-semibold">Damage Buff</th>
                <th className="px-4 py-2.5 font-semibold">Health Buff</th>
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
      </section>

      {/* Upgrade path */}
      <section>
        <SectionHeading
          eyebrow="03 · Progression"
          title="Coins & the upgrade path"
          description="Coins buy account-wide upgrades. Checkpoints in Settings let you start runs on a higher wave for faster gains once you can survive there."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-ink-line bg-ink-surface p-5">
            <h3 className="font-display text-lg tracking-wide text-text">
              What coins upgrade
            </h3>
            <ul className="mt-3 flex flex-col gap-2 font-body text-sm text-text-dim">
              <li>• Coin gain</li>
              <li>• Luck (better summon odds)</li>
              <li>• Anime slots (team size)</li>
              <li>• Anime inventory space</li>
            </ul>
          </div>
          <div className="rounded-xl border border-rarity-legendary/40 bg-rarity-legendary/5 p-5">
            <h3 className="font-display text-lg tracking-wide text-rarity-legendary">
              Recommended spend order
            </h3>
            <ol className="mt-3 flex flex-col gap-2 font-body text-sm text-text">
              {["Anime Slot", "Coins", "Luck", "Anime Inventory (once maxed above)"].map(
                (step, i) => (
                  <li key={step} className="flex items-center gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rarity-legendary font-mono text-[10px] font-bold text-ink">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                )
              )}
            </ol>
          </div>
        </div>
      </section>

      {/* Merging & cloning */}
      <section>
        <SectionHeading eyebrow="04 · Growing your roster" title="Merging & cloning" />
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-ink-line bg-ink-surface p-5">
            <h3 className="font-display text-lg tracking-wide text-text">Merging</h3>
            <p className="mt-2 font-body text-sm text-text-dim">
              Obtain two of the same anime at the same evolution and merge them to make
              it stronger.
            </p>
            <p className="mt-3 rounded-lg border border-rarity-mythic/40 bg-rarity-mythic/10 px-3 py-2 font-body text-xs text-rarity-mythic">
              Tip: Always keep the unit whose trait you want to save deployed on your
              team before merging. Merging an undeployed unit into one with a trait
              loses that trait.
            </p>
          </div>
          <div className="rounded-xl border border-ink-line bg-ink-surface p-5">
            <h3 className="font-display text-lg tracking-wide text-text">Cloning</h3>
            <p className="mt-2 font-body text-sm text-text-dim">
              Cloning gives you a second copy of a unit with the same mutation, trait,
              and level. It costs essence, earned from enemy drops, the wheel, the VIP
              chest, and events.
            </p>
          </div>
        </div>
      </section>

      {/* Gamepasses */}
      <section>
        <SectionHeading
          eyebrow="05 · Spending"
          title="Gamepass priority"
          description="If you're buying gamepasses with real money, this is the order that gets you the most value first."
        />
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
        <a
          href={GAMEPASS_SOURCE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1 font-body text-sm text-rarity-rare hover:underline"
        >
          Full breakdown on Trello &rarr;
        </a>
      </section>
    </div>
  );
}
