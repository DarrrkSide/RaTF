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
  levelBonusPerLevel: 3000,
};

export const MUTATION_VALUE_MULTIPLIERS: Record<string, number> = {
  Gold: 1.5,
  Diamond: 2,
  Demon: 2.5,
  Destroyer: 3,
  Hollow: 2,
  Nova: 4,
  Astronaut: 5,
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
