"use client";

import { useEffect, useMemo, useState } from "react";
import { MUTATIONS } from "@/data/mutations";
import { TRAIT_TIERS } from "@/data/traits";
import { UNITS, type Unit } from "@/data/units";
import {
  DEFAULT_MODIFIER_BONUSES,
  getUnitDisplayValue,
  type ModifierBonuses,
  type ModifierSettings,
} from "@/data/unitValues";

type TradeMode = "value" | "calculator";
type Slot = {
  unitId: string | null;
  mutation: string | null;
  trait: string | null;
  level: number;
};

type ModalType = "unit" | "modifier" | null;

const SLOT_COUNT = 6;
const MAX_LEVEL = 7;

function getAdjustedValue(slot: Slot, units: Unit[], bonuses: ModifierBonuses = DEFAULT_MODIFIER_BONUSES) {
  const unit = slot.unitId ? units.find((entry) => entry.id === slot.unitId) ?? null : null;
  const base = unit ? getUnitDisplayValue(unit, units, { mutation: slot.mutation, trait: slot.trait, level: slot.level }, bonuses) : 0;
  return base;
}

function getLossLabel(percent: number) {
  if (percent <= 10) return "Minor loss";
  if (percent <= 20) return "Mid loss";
  return "Major loss";
}

function getGainLabel(percent: number) {
  if (percent <= 10) return "Minor gain";
  if (percent <= 20) return "Mid gain";
  return "Major gain";
}

export default function TradesPage() {
  const [mode, setMode] = useState<TradeMode>("value");
  const [giveSlots, setGiveSlots] = useState<Slot[]>(() => Array.from({ length: SLOT_COUNT }, () => ({ unitId: null, mutation: null, trait: null, level: 1 })));
  const [getSlots, setGetSlots] = useState<Slot[]>(() => Array.from({ length: SLOT_COUNT }, () => ({ unitId: null, mutation: null, trait: null, level: 1 })));
  const [modalState, setModalState] = useState<{ type: ModalType; side: "give" | "get" | null; slotIndex: number | null }>({ type: null, side: null, slotIndex: null });
  const [selectedSlot, setSelectedSlot] = useState<{ side: "give" | "get"; slotIndex: number } | null>(null);
  const [draft, setDraft] = useState<Slot>({ unitId: null, mutation: null, trait: null, level: 1 });
  const [showResult, setShowResult] = useState(false);
  const [catalogUnits, setCatalogUnits] = useState<Unit[]>([]);
  const [valueListModifier, setValueListModifier] = useState<ModifierSettings>({ mutation: null, trait: null, level: 1 });
  const [modifierBonuses] = useState<ModifierBonuses>(DEFAULT_MODIFIER_BONUSES);
  const [modifierPanelOpen, setModifierPanelOpen] = useState(false);
  const [modifierDraft, setModifierDraft] = useState<ModifierSettings>({ mutation: null, trait: null, level: 1 });

  useEffect(() => {
    let cancelled = false;
    fetch("/api/cards/list")
      .then((response) => response.json())
      .then((data: Unit[]) => {
        if (!cancelled) {
          setCatalogUnits(data);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setCatalogUnits([]);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const availableUnits = useMemo(() => {
    const lookup = new Map(UNITS.map((unit) => [unit.id, unit]));
    catalogUnits.forEach((unit) => {
      lookup.set(unit.id, { ...(lookup.get(unit.id) ?? {}), ...unit });
    });
    return Array.from(lookup.values()).sort((a, b) => (b.value ?? 0) - (a.value ?? 0));
  }, [catalogUnits]);

  const getSlotValue = (slot: Slot) => {
    return getAdjustedValue(slot, availableUnits, modifierBonuses);
  };

  const giveTotal = useMemo(() => giveSlots.reduce((sum, slot) => sum + getSlotValue(slot), 0), [giveSlots, availableUnits, modifierBonuses]);
  const getTotal = useMemo(() => getSlots.reduce((sum, slot) => sum + getSlotValue(slot), 0), [getSlots, availableUnits, modifierBonuses]);
  const difference = useMemo(() => {
    if (!giveTotal || !getTotal) return 0;
    return ((getTotal - giveTotal) / giveTotal) * 100;
  }, [giveTotal, getTotal]);

  const summary = useMemo(() => {
    if (!showResult) return "Select units and calculate";
    if (difference === 0) return "Balanced trade";
    if (difference > 0) return `${getGainLabel(Math.abs(difference))} (${Math.abs(difference).toFixed(1)}%)`;
    return `${getLossLabel(Math.abs(difference))} (${Math.abs(difference).toFixed(1)}%)`;
  }, [difference, showResult]);

  const getSlotState = (side: "give" | "get", slotIndex: number) => {
    return side === "give" ? giveSlots[slotIndex] : getSlots[slotIndex];
  };

  const openUnitPicker = (side: "give" | "get", slotIndex: number) => {
    const current = getSlotState(side, slotIndex);
    setSelectedSlot({ side, slotIndex });
    setDraft(current ?? { unitId: null, mutation: null, trait: null, level: 1 });
    setModalState({ type: "unit", side, slotIndex });
  };

  const openModifierEditor = (side: "give" | "get", slotIndex: number) => {
    const current = getSlotState(side, slotIndex);
    setSelectedSlot({ side, slotIndex });
    setDraft(current ?? { unitId: null, mutation: null, trait: null, level: 1 });
    setModalState({ type: "modifier", side, slotIndex });
  };

  const saveSlot = () => {
    if (!selectedSlot) return;
    const next = selectedSlot.side === "give" ? [...giveSlots] : [...getSlots];
    next[selectedSlot.slotIndex] = { ...draft };
    if (selectedSlot.side === "give") setGiveSlots(next);
    else setGetSlots(next);
    setModalState({ type: null, side: null, slotIndex: null });
    setSelectedSlot(null);
    setShowResult(false);
  };

  const clearSlot = () => {
    if (!selectedSlot) return;
    const next = selectedSlot.side === "give" ? [...giveSlots] : [...getSlots];
    next[selectedSlot.slotIndex] = { unitId: null, mutation: null, trait: null, level: 1 };
    if (selectedSlot.side === "give") setGiveSlots(next);
    else setGetSlots(next);
    setModalState({ type: null, side: null, slotIndex: null });
    setSelectedSlot(null);
    setShowResult(false);
  };

  const selectUnit = (unitId: string) => {
    if (!selectedSlot) return;
    setDraft((prev) => ({ ...prev, unitId }));
    setModalState({ type: "modifier", side: selectedSlot.side, slotIndex: selectedSlot.slotIndex });
  };

  const applyModifierPreset = () => {
    setValueListModifier(modifierDraft);
    setModifierPanelOpen(false);
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-4xl font-black tracking-[0.08em] text-text sm:text-5xl">Trades</h1>
        <p className="mt-2 max-w-2xl text-sm text-text-faint">Track values, compare offers, and build trade setups with mutation, trait, and level modifiers.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <button
          onClick={() => setMode("value")}
          className={`rounded-2xl border p-6 text-left transition ${mode === "value" ? "border-rarity-god bg-rarity-god/10" : "border-ink-line bg-ink-surface"}`}
        >
          <h2 className="font-display text-2xl font-black">Trade Value</h2>
          <p className="mt-2 text-sm text-text-faint">Browse units with their current value and keep a simple tracker ready for trade talks.</p>
        </button>
        <button
          onClick={() => setMode("calculator")}
          className={`rounded-2xl border p-6 text-left transition ${mode === "calculator" ? "border-rarity-legendary bg-rarity-legendary/10" : "border-ink-line bg-ink-surface"}`}
        >
          <h2 className="font-display text-2xl font-black">Trade Calculator</h2>
          <p className="mt-2 text-sm text-text-faint">Build a full package of units for each side and calculate whether the trade is fair.</p>
        </button>
      </div>

      {mode === "value" ? (
        <div className="relative">
          <div className="rounded-2xl border border-ink-line bg-ink-surface p-6">
            <h3 className="font-display text-xl font-black">Value tracker</h3>
            <p className="mt-2 text-sm text-text-faint">Each unit card shows its image, name, and value estimate so you can compare quickly.</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {availableUnits.map((unit) => {
                const value = getUnitDisplayValue(unit, availableUnits, valueListModifier, modifierBonuses);
                return (
                  <div key={unit.id} className="rounded-xl border border-ink-line/70 p-3">
                    <div className="flex items-center gap-3">
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-ink-line/70 bg-ink">
                        {unit.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={unit.image} alt={unit.name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-[10px] text-text-faint">No image</div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <h4 className="truncate font-semibold text-text">{unit.name}</h4>
                        <p className="text-xs uppercase tracking-[0.2em] text-text-faint">{unit.rarity}</p>
                      </div>
                    </div>
                    <div className="mt-3 rounded-lg bg-ink px-3 py-2 text-sm text-text-faint">
                      Value: <span className="font-semibold text-text">{value}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <div className="rounded-2xl border border-ink-line bg-ink-surface p-6">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-display text-xl font-black">I Give</h3>
              <span className="text-sm text-text-faint">Up to 6 units</span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {giveSlots.map((slot, index) => {
                const unit = slot.unitId ? availableUnits.find((entry) => entry.id === slot.unitId) : null;
                const adjusted = getAdjustedValue(slot, availableUnits);
                return (
                  <button
                    key={`give-${index}`}
                    onClick={() => openUnitPicker("give", index)}
                    className="rounded-xl border border-ink-line/70 bg-ink p-3 text-left"
                  >
                    {unit ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="h-12 w-12 overflow-hidden rounded-lg border border-ink-line/70 bg-ink-surface">
                            {unit.image ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={unit.image} alt={unit.name} className="h-full w-full object-cover" />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-[10px] text-text-faint">img</div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate font-semibold text-text">{unit.name}</p>
                            <p className="text-xs text-text-faint">{slot.mutation ?? "No mutation"}</p>
                          </div>
                        </div>
                        <div className="text-xs text-text-faint">
                          Trait: {slot.trait ?? "None"} • Level: {slot.level} • Value: {adjusted}
                        </div>
                      </div>
                    ) : (
                      <div className="flex h-24 items-center justify-center text-3xl text-text-faint">+</div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-ink-line bg-ink-surface p-6">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-display text-xl font-black">I Get</h3>
              <span className="text-sm text-text-faint">Up to 6 units</span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {getSlots.map((slot, index) => {
                const unit = slot.unitId ? availableUnits.find((entry) => entry.id === slot.unitId) : null;
                const adjusted = getAdjustedValue(slot, availableUnits);
                return (
                  <button
                    key={`get-${index}`}
                    onClick={() => openUnitPicker("get", index)}
                    className="rounded-xl border border-ink-line/70 bg-ink p-3 text-left"
                  >
                    {unit ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="h-12 w-12 overflow-hidden rounded-lg border border-ink-line/70 bg-ink-surface">
                            {unit.image ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={unit.image} alt={unit.name} className="h-full w-full object-cover" />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-[10px] text-text-faint">img</div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate font-semibold text-text">{unit.name}</p>
                            <p className="text-xs text-text-faint">{slot.mutation ?? "No mutation"}</p>
                          </div>
                        </div>
                        <div className="text-xs text-text-faint">
                          Trait: {slot.trait ?? "None"} • Level: {slot.level} • Value: {adjusted}
                        </div>
                      </div>
                    ) : (
                      <div className="flex h-24 items-center justify-center text-3xl text-text-faint">+</div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="xl:col-span-2 rounded-2xl border border-ink-line bg-ink-surface p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-display text-xl font-black">Trade result</h3>
                <p className="mt-2 text-sm text-text-faint">Build both sides, then calculate to see whether the deal leans toward a loss or gain.</p>
              </div>
              <button
                onClick={() => setShowResult(true)}
                className="rounded-full border border-rarity-legendary px-4 py-2 text-sm font-semibold text-rarity-legendary"
              >
                Calculate
              </button>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-ink-line/70 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-text-faint">You give</p>
                <p className="mt-2 text-2xl font-semibold text-text">{giveTotal}</p>
              </div>
              <div className="rounded-lg border border-ink-line/70 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-text-faint">You get</p>
                <p className="mt-2 text-2xl font-semibold text-text">{getTotal}</p>
              </div>
              <div className="rounded-lg border border-ink-line/70 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-text-faint">Difference</p>
                <p className="mt-2 text-2xl font-semibold text-text">{showResult ? `${difference.toFixed(1)}%` : "—"}</p>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-ink-line/70 bg-ink p-4 text-sm text-text-faint">
              <span className="font-semibold text-text">Result:</span> {summary}
            </div>
            {showResult && (
              <button onClick={() => setShowResult(false)} className="mt-4 rounded-full border border-ink-line px-4 py-2 text-sm text-text-faint">
                Calculate again
              </button>
            )}
          </div>
        </div>
      )}

      {mode === "value" && (
        <button
          onClick={() => {
            setModifierDraft(valueListModifier);
            setModifierPanelOpen(true);
          }}
          className="fixed bottom-5 left-5 z-[60] flex h-11 items-center rounded-full border border-rarity-legendary bg-ink-surface px-4 text-sm font-semibold text-rarity-legendary shadow-lg sm:bottom-6 sm:left-6"
        >
          Edit modifier value
        </button>
      )}

      {selectedSlot && (
        <button
          onClick={() => openModifierEditor(selectedSlot.side, selectedSlot.slotIndex)}
          className="fixed bottom-5 left-5 z-[60] flex h-11 items-center rounded-full border border-rarity-legendary bg-ink-surface px-4 text-sm font-semibold text-rarity-legendary shadow-lg sm:bottom-6 sm:left-6"
        >
          Edit selected slot
        </button>
      )}

      {modifierPanelOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-3 sm:p-4">
          <div className="flex max-h-[90vh] w-full max-w-[20rem] flex-col overflow-hidden rounded-2xl border border-ink-line bg-ink-surface shadow-2xl">
            <div className="flex items-center justify-between border-b border-ink-line px-4 py-3">
              <h3 className="font-display text-lg font-black">Modifier values</h3>
              <button onClick={() => setModifierPanelOpen(false)} className="text-2xl text-text-faint">×</button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-3">
                <label className="block text-sm text-text-faint">
                  Mutation
                  <select value={modifierDraft.mutation ?? ""} onChange={(e) => setModifierDraft((prev) => ({ ...prev, mutation: e.target.value || null }))} className="mt-1 w-full rounded-lg border border-ink-line bg-ink px-3 py-2 text-sm text-text">
                    <option value="">None</option>
                    {MUTATIONS.map((mutation) => (
                      <option key={mutation.name} value={mutation.name}>{mutation.name}</option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm text-text-faint">
                  Trait
                  <select value={modifierDraft.trait ?? ""} onChange={(e) => setModifierDraft((prev) => ({ ...prev, trait: e.target.value || null }))} className="mt-1 w-full rounded-lg border border-ink-line bg-ink px-3 py-2 text-sm text-text">
                    <option value="">None</option>
                    {TRAIT_TIERS.flatMap((tier) => tier.traits).map((trait) => (
                      <option key={trait.name} value={trait.name}>{trait.name}</option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm text-text-faint">
                  Level
                  <input type="number" min="1" max={MAX_LEVEL} value={modifierDraft.level} onChange={(e) => setModifierDraft((prev) => ({ ...prev, level: Math.min(MAX_LEVEL, Math.max(1, Number(e.target.value) || 1)) }))} className="mt-1 w-full rounded-lg border border-ink-line bg-ink px-3 py-2 text-sm text-text" />
                </label>
              </div>
            </div>
            <div className="border-t border-ink-line px-4 py-3">
              <button onClick={applyModifierPreset} className="rounded-full border border-rarity-legendary px-3 py-2 text-sm font-semibold text-rarity-legendary">Apply</button>
            </div>
          </div>
        </div>
      )}

      {modalState.type && selectedSlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-4">
          <div className="relative flex max-h-[85vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-ink-line bg-ink-surface shadow-2xl">
            <button onClick={() => setModalState({ type: null, side: null, slotIndex: null })} className="absolute right-3 top-3 z-10 text-2xl text-text-faint">×</button>
            <div className="overflow-y-auto px-4 py-5 sm:px-5 sm:py-6">
              {modalState.type === "unit" ? (
                <div>
                  <h3 className="font-display text-lg font-black">Choose a unit</h3>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {availableUnits.map((unit) => {
                      const value = getUnitDisplayValue(unit, availableUnits);
                      return (
                        <button key={unit.id} onClick={() => selectUnit(unit.id)} className="rounded-xl border border-ink-line/70 bg-ink p-2.5 text-left">
                          <div className="flex items-center gap-2">
                            <div className="h-10 w-10 overflow-hidden rounded-lg border border-ink-line/70 bg-ink-surface">
                              {unit.image ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={unit.image} alt={unit.name} className="h-full w-full object-cover" />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center text-[10px] text-text-faint">img</div>
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="truncate font-semibold text-text">{unit.name}</p>
                              <p className="text-xs text-text-faint">Value: {value}</p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="font-display text-lg font-black">Adjust modifiers</h3>
                  <div className="mt-3 space-y-3">
                    <label className="block text-sm text-text-faint">
                      Mutation
                      <select value={draft.mutation ?? ""} onChange={(e) => setDraft((prev) => ({ ...prev, mutation: e.target.value || null }))} className="mt-1 w-full rounded-lg border border-ink-line bg-ink px-3 py-2 text-sm text-text">
                        <option value="">None</option>
                        {MUTATIONS.map((mutation) => (
                          <option key={mutation.name} value={mutation.name}>{mutation.name}</option>
                        ))}
                      </select>
                    </label>
                    <label className="block text-sm text-text-faint">
                      Trait
                      <select value={draft.trait ?? ""} onChange={(e) => setDraft((prev) => ({ ...prev, trait: e.target.value || null }))} className="mt-1 w-full rounded-lg border border-ink-line bg-ink px-3 py-2 text-sm text-text">
                        <option value="">None</option>
                        {TRAIT_TIERS.flatMap((tier) => tier.traits).map((trait) => (
                          <option key={trait.name} value={trait.name}>{trait.name}</option>
                        ))}
                      </select>
                    </label>
                    <label className="block text-sm text-text-faint">
                      Level
                      <input type="number" min="1" max={MAX_LEVEL} value={draft.level} onChange={(e) => setDraft((prev) => ({ ...prev, level: Math.min(MAX_LEVEL, Math.max(1, Number(e.target.value) || 1)) }))} className="mt-1 w-full rounded-lg border border-ink-line bg-ink px-3 py-2 text-sm text-text" />
                    </label>
                    <div className="flex flex-wrap gap-3">
                      <button onClick={saveSlot} className="rounded-full border border-rarity-legendary px-4 py-2 text-sm font-semibold text-rarity-legendary">Save</button>
                      <button onClick={clearSlot} className="rounded-full border border-ink-line px-4 py-2 text-sm text-text-faint">Clear</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
