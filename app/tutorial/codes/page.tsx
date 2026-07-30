import { TutorialSectionShell } from "@/components/TutorialSectionShell";

const CODES = [
  {
    code: "SORCERERISHERE!",
    subtitle: "Reach wave 76",
    date: "7/26/26",
    rewards: [
      { icon: "/api/cards/items/Gold_Coin.png", alt: "gold coin", label: "150k Gold" },
      { icon: "/api/cards/Rengundam.png", alt: "rengoku", label: "Diamond Rengoku" },
      { icon: "/api/cards/items/Trait_Shard.png", alt: "trait shard", label: "25 Trait Shards" },
      { icon: "/api/cards/items/God_Essence.png", alt: "god essence", label: "5× God Essence" },
    ],
  },
  {
    code: "EVOLUTIONMACHINE!",
    subtitle: "Reach wave 76",
    date: "7/26/26",
    rewards: [
      { icon: "/api/cards/items/Gold_Coin.png", alt: "gold coin", label: "200k Gold" },
      { icon: "/api/cards/Gyomain.png", alt: "gyomei", label: "Gold Gyomei" },
      { icon: "/api/cards/items/Trait_Shard.png", alt: "trait shard", label: "25 Trait Shards" },
      { icon: "/api/cards/items/Cursed_Finger.png", alt: "cursed finger", label: "3 Cursed Fingers" },
      { icon: "/api/cards/items/Six_Eyes.png", alt: "six eyes", label: "1 Six Eyes" },
    ],
  },
  {
    code: "SRRYFORSHUTDOWN",
    subtitle: "Reach wave 76",
    date: "7/27/26",
    rewards: [
      { icon: "/api/cards/items/Gold_Coin.png", alt: "gold coin", label: "200k Gold" },
      { icon: "/api/cards/items/Trait_Shard.png", alt: "trait shard", label: "25 Trait Shards" },
      { icon: "/api/cards/items/Cursed_Finger.png", alt: "cursed finger", label: "1 Cursed Finger" },
      { icon: "/api/cards/items/Six_Eyes.png", alt: "six eyes", label: "1 Six Eyes" },
    ],
  },
];

export default function CodesPage() {
  return (
    <TutorialSectionShell
      title="Codes"
      description="Redeem the latest available codes for gold, units, and resources."
    >
      <div className="grid gap-6">
        {CODES.map((code) => (
          <div
            key={code.code}
            className="rounded-2xl border border-ink-line bg-ink-surface p-6 shadow-[0_10px_28px_rgba(0,0,0,0.22)]"
          >
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-display text-xl font-black tracking-[0.06em] text-text">
                  {code.code}
                </p>
                <p className="mt-1 text-sm text-text-dim">{code.subtitle}</p>
              </div>
              <span className="inline-flex rounded-full border border-ink-line/70 bg-ink-surface px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-text-dim">
                {code.date}
              </span>
            </div>

            <ul className="space-y-3">
              {code.rewards.map((reward) => (
                <li
                  key={`${code.code}-${reward.label}`}
                  className="flex items-center gap-4 rounded-2xl border border-ink-line/50 bg-ink-surface-alt px-4 py-3 text-sm text-text"
                >
                  <img
                    src={reward.icon}
                    alt={reward.alt}
                    className="h-12 w-12 shrink-0"
                  />
                  <span>{reward.label}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </TutorialSectionShell>
  );
}
