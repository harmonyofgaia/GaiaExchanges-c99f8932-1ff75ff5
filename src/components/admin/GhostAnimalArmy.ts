// GAIA Ghost Animal Army Avatars and Escalation Logic
// This file adds missing ghost animal avatars and the intelligent avatar selection system per upgrades #68 and master plan V4.

export type GhostAnimalAvatar = {
  id: string;
  name: string;
  emoji: string;
  threatLevel: number;
  abilities: string[];
  status: 'available' | 'deployed' | 'recovering';
  lastDeployed: Date | null;
};

export const ghostAnimalAvatars: GhostAnimalAvatar[] = [
  {
    id: 'ghost-dragon-prime',
    name: 'Ghost Dragon Prime',
    emoji: '👻🐉',
    threatLevel: 10,
    abilities: ['Maximum threat elimination', 'Quantum fire breath', 'Reality warping'],
    status: 'available',
    lastDeployed: null
  },
  {
    id: 'phantom-phoenix',
    name: 'Phantom Phoenix',
    emoji: '👻🔥',
    threatLevel: 9,
    abilities: ['System resurrection', 'Quantum rebirth', 'Instant recovery'],
    status: 'available',
    lastDeployed: null
  },
  {
    id: 'spirit-thunder-cat',
    name: 'Spirit Thunder Cat',
    emoji: '👻⚡',
    threatLevel: 8,
    abilities: ['Lightning-fast response', 'Electro-shield', 'Rapid neutralization'],
    status: 'available',
    lastDeployed: null
  },
  {
    id: 'ghost-storm-bear',
    name: 'Ghost Storm Bear',
    emoji: '👻🌪️',
    threatLevel: 8,
    abilities: ['Overwhelming defense', 'Storm barrier', 'Massive force'],
    status: 'available',
    lastDeployed: null
  },
  {
    id: 'quantum-ghost-dragon',
    name: 'Quantum Ghost Dragon',
    emoji: '👻💎',
    threatLevel: 10,
    abilities: ['Infinite power', 'Quantum-level security', 'Ultimate protection'],
    status: 'available',
    lastDeployed: null
  },
  {
    id: 'celestial-spirit-phoenix',
    name: 'Celestial Spirit Phoenix',
    emoji: '👻🌟',
    threatLevel: 10,
    abilities: ['Immortal system protection', 'Celestial rebirth', 'System healing'],
    status: 'available',
    lastDeployed: null
  },
  {
    id: 'ghost-warrior-legion',
    name: 'Ghost Warrior Legion',
    emoji: '👻⚔️',
    threatLevel: 9,
    abilities: ['Coordinated army assault', 'Multi-vector defense', 'Escalation force'],
    status: 'available',
    lastDeployed: null
  },
  {
    id: 'ultimate-defense-specter',
    name: 'Ultimate Defense Specter',
    emoji: '👻🛡️',
    threatLevel: 10,
    abilities: ['Absolute system shielding', 'Impenetrable barrier', 'Emergency lockdown'],
    status: 'available',
    lastDeployed: null
  }
];

// Intelligent Avatar Selection System
export function selectGhostAnimals(threatData: { severity: number; attackVectors: string[]; systemsAtRisk: string[] }) {
  const { severity } = threatData;
  const selected: GhostAnimalAvatar[] = [];

  // Primary response selection
  if (severity >= 9) {
    selected.push(
      ghostAnimalAvatars.find(a => a.id === 'quantum-ghost-dragon')!,
      ghostAnimalAvatars.find(a => a.id === 'celestial-spirit-phoenix')!,
      ghostAnimalAvatars.find(a => a.id === 'ultimate-defense-specter')!
    );
  } else if (severity >= 7) {
    selected.push(
      ghostAnimalAvatars.find(a => a.id === 'ghost-dragon-prime')!,
      ghostAnimalAvatars.find(a => a.id === 'phantom-phoenix')!,
      ghostAnimalAvatars.find(a => a.id === 'ghost-warrior-legion')!
    );
  } else if (severity >= 4) {
    selected.push(
      ghostAnimalAvatars.find(a => a.id === 'spirit-thunder-cat')!,
      ghostAnimalAvatars.find(a => a.id === 'ghost-storm-bear')!
    );
  }
  // Fallback: deploy at least one
  if (selected.length === 0) {
    selected.push(ghostAnimalAvatars[0]);
  }
  return selected;
}

// Instant Deployment System
export function deployGhostAnimals(selected: GhostAnimalAvatar[]) {
  selected.forEach(animal => {
    animal.status = 'deployed';
    animal.lastDeployed = new Date();
    // Add logging, dashboard update, and escalation logic here
    // ...
  });
}
