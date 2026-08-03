"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { TANKS_TIER_LIST, DAMAGE_DEALERS_TIER_LIST, SUPPORT_TIER_LIST, TierRow } from "@/data/tierlists";
import { getUnitByName } from "@/data/units";
import { RARITY_META } from "@/data/rarity";

type UnitMap = Record<string, { image?: string }>;

const TABS = {
  en: [
    { key: "tanks", label: "Tanks", rows: TANKS_TIER_LIST },
    { key: "damage", label: "Damage Dealers", rows: DAMAGE_DEALERS_TIER_LIST },
    { key: "support", label: "Support", rows: SUPPORT_TIER_LIST },
  ],
  es: [
    { key: "tanks", label: "Tanques", rows: TANKS_TIER_LIST },
    { key: "damage", label: "Atacantes", rows: DAMAGE_DEALERS_TIER_LIST },
    { key: "support", label: "Apoyo", rows: SUPPORT_TIER_LIST },
  ],
} as const;

function TierRowShelf({ row, unitMap }: { row: TierRow; unitMap: Record<string, { image?: string }>; }) {
  return (
    <div className="flex flex-col gap-3 border-b border-ink-line/70 py-5 sm:flex-row sm:gap-6">
      <div
        className="flex shrink-0 items-center gap-3 sm:w-40 sm:flex-col sm:items-start sm:gap-1"
        style={{ color: row.color }}
      >
        <div className="flex items-center gap-2">
          <span className="h-8 w-1.5 rounded-full" style={{ backgroundColor: row.color }} />
          <span className="font-display text-3xl font-black tracking-[0.06em]">{row.label}</span>
        </div>
        {row.sublabel && (
          <p className="font-body text-xs text-text-faint sm:pl-3.5">{row.sublabel}</p>
        )}
      </div>
      <div className="flex flex-1 flex-wrap gap-2">
        {row.units.map((name) => {
          const unit = getUnitByName(name);
          const meta = unit ? RARITY_META[unit.rarity] : null;
          const id = unit ? unit.id : name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          const image = unitMap[id]?.image;
          return (
            <span
              key={name}
              className={`inline-flex items-center gap-2 rounded-lg border px-2.5 py-1.5 font-body text-xs font-medium sm:text-sm ${
                meta ? `${meta.border} ${meta.bg} ${meta.text}` : "border-ink-line text-text-dim"
              }`}
            >
              {image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <div className="h-14 w-14 overflow-hidden rounded-md">
                  <img
                    src={image}
                    alt={name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              ) : (
                <span className="h-14 w-14 rounded-md border border-current/20 bg-black/10" />
              )}
              <span>{name}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default function TierListPage() {
  const { language } = useLanguage();
  const [tab, setTab] = useState<(typeof TABS)["en"][number]["key"]>("tanks");
  const tabs = TABS[language];
  const active = tabs.find((t) => t.key === tab)!;
  const [unitMap, setUnitMap] = useState<UnitMap>({});

  useEffect(() => {
    fetch('/api/cards/list').then(r => r.json()).then((items: any[]) => {
      const map: UnitMap = {};
      items.forEach(it => { map[it.id] = { image: it.image }; });
      setUnitMap(map);
    }).catch(() => {});
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-display text-4xl font-black tracking-[0.08em] text-text sm:text-5xl">
          {language === "es" ? "Lista de niveles" : "Tier List"}
        </h1>
        <div className="inline-flex gap-1 rounded-full border border-ink-line bg-ink-surface p-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 rounded-full px-4 py-2 font-body text-sm font-semibold transition-colors duration-300 sm:flex-initial ${
                tab === t.key
                  ? "bg-rarity-legendary text-ink"
                  : "text-text-dim hover:text-text"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div key={tab} className="fade-in rounded-2xl border border-ink-line bg-ink-surface px-4 sm:px-6">
        {active.rows.map((row) => (
          <TierRowShelf key={row.label} row={row} unitMap={unitMap} />
        ))}
      </div>
    </div>
  );
}
