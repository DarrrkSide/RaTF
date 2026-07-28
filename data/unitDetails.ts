export type UnitStats = {
  damage?: number;
  defense?: number;
  health?: number;
  speed?: number;
};

export type UnitAbility = {
  title: string;
  description: string;
};

export type UnitDetails = {
  id: string;
  stats?: UnitStats;
  ability?: UnitAbility;
};

// Optional per-unit details. Populate as you gather data.
export const UNIT_DETAILS: UnitDetails[] = [
  // Example:
  // { id: 'sakuna-heian', stats: { damage: 120, defense: 30, health: 900, speed: 1 }, ability: { title: 'Heian Fury', description: 'Does massive AoE damage' } },
];

export function getDetailsById(id: string): UnitDetails | undefined {
  return UNIT_DETAILS.find((d) => d.id === id);
}
