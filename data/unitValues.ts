import type { Unit } from "./units";

export type ModifierBonuses = {
  mutationBonus: number;
  traitBonus: number;
  levelBonusPerLevel: number;
};

export type ModifierSettings = {
  mutation: string | null;
  trait: string | null;
  level: number;
};

export const DEFAULT_MODIFIER_BONUSES: ModifierBonuses = {
  mutationBonus: 6000,
  traitBonus: 4000,
  levelBonusPerLevel: 10000,
};

export const MUTATION_VALUE_MULTIPLIERS: Record<string, number> = {
  Gold: 1.1,
  Diamond: 1.2,
  Demon: 1.4,
  Destroyer: 1.5,
  Hollow: 1.6,
  Nova: 1.8,
  Astronaut: 2,
};

export function getMutationValueMultiplier(mutation?: string | null) {
  if (!mutation) return 1;
  return MUTATION_VALUE_MULTIPLIERS[mutation] ?? 1;
}

export function getUnitDisplayValue(
  unit: Unit | null,
  _units: Unit[],
  modifierSettings?: ModifierSettings,
  bonuses: ModifierBonuses = DEFAULT_MODIFIER_BONUSES,
) {
  if (!unit) return 0;

  const level = Math.max(1, Math.min(7, modifierSettings?.level ?? 1));
  let value = (unit.value ?? 0) * getMutationValueMultiplier(modifierSettings?.mutation);

  if (modifierSettings?.trait) value += bonuses.traitBonus;
  value += level * bonuses.levelBonusPerLevel;

  return value;
}

export function getModifierBreakdown(
  unit: Unit | null,
  modifierSettings?: ModifierSettings,
  bonuses: ModifierBonuses = DEFAULT_MODIFIER_BONUSES,
) {
  if (!unit) return null;

  const level = Math.max(1, Math.min(7, modifierSettings?.level ?? 1));
  const baseValue = unit.value ?? 0;
  const mutationMultiplier = getMutationValueMultiplier(modifierSettings?.mutation);
  const mutationValue = baseValue * mutationMultiplier;
  const traitBonus = modifierSettings?.trait ? bonuses.traitBonus : 0;
  const levelBonus = level * bonuses.levelBonusPerLevel;
  const total = mutationValue + traitBonus + levelBonus;

  return {
    baseValue,
    mutationMultiplier,
    mutationValue,
    traitBonus,
    levelBonus,
    total,
    level,
  };
}
