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
// Commons
  { 
     id: 'usoff', 
     stats: { 
       damage: 16, 
       defense: 1.1, 
       health: 160,
       speed: 1 
     }, 
     ability: { 
       title: 'None', 
       description: ''
     }},
// Mythics
  { 
     id: 'joti', 
     stats: { 
       damage: 1750, 
       defense: 1.5, 
       health: 10000,
       speed: 1 
     }, 
     ability: { 
       title: 'None', 
       description: ''
     }},
    { 
     id: 'kiwasuke', 
     stats: { 
       damage: 1500, 
       defense: 1.15, 
       health: 5000,
       speed: 2
     }, 
     ability: { 
       title: 'None', 
       description: ''
     }},
    { 
     id: 'brocolli', 
     stats: { 
       damage: 600, 
       defense: 1.22, 
       health: 6400,
       speed: 3 
     }, 
     ability: { 
       title: 'None', 
       description: ''
     }},
    { 
     id: 'acer', stats: { damage: 360, defense: 1.2, health: 3500,speed: 0.6 }, 
     ability: { title: 'None', description: ''
     }},
    { 
     id: 'hoshira', stats: { damage: 430, defense: 1.2, health: 4165,speed: 0.6 }, 
     ability: { title: 'None', description: ''
     }},
    { 
     id: 'shimo-haya', stats: { damage: 7000, defense: 1.2, health: 3145,speed: 3 }, 
     ability: { title: 'None', description: ''
     }},
    { 
     id: 'yoriki', stats: { damage: 1250, defense: 1.15, health: 5780,speed: 1 }, 
     ability: { title: 'None', description: ''
     }},
    { 
     id: 'coyote', stats: { damage: 175, defense: 1.25, health: 3570, speed: 3 }, 
     ability: { title: 'None', description: ''
     }},
  // Secrets
    { 
     id: 'kenie', stats: { damage: 2100, defense: 1.32, health: 18000, speed: 1 }, 
     ability: { title: 'None', description: ''
     }},
    { 
     id: 'ulquiopta', stats: { damage: 7500, defense: 1.25, health: 7500, speed: 2.5 }, 
     ability: { title: 'None', description: ''
     }},
    { 
     id: 'jerin', stats: { damage: 500, defense: 1.25, health: 16500, speed: 1 }, 
     ability: { title: 'None', description: ''
     }},
      { 
     id: 'yuwah', stats: { damage: 300, defense: 1.12, health: 6500, speed: 3 }, 
     ability: { title: 'None', description: ''
     }},
    { 
     id: 'fryren', stats: { damage: 2000, defense: 1.25, health: 5800, speed: 3.5 }, 
     ability: { title: 'None', description: ''
     }},
];

export function getDetailsById(id: string): UnitDetails | undefined {
  return UNIT_DETAILS.find((d) => d.id === id);
}
