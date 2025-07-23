/**
 * Cross-Project Synergy Service
 * Manages token synergy, skill transfers, and cross-project interactions
 */

import { 
  ProjectToken, 
  TokenSynergy, 
  SkillTransfer, 
  CrossProjectMission, 
  HarmonyPoints,
  EventBonus,
  GlobalRecognition,
  SmartReferral,
  ImpactInvestment
} from '@/types/synergy-types';

// Project Head Names - Core themes preserved
export const PROJECT_HEADS = {
  HEART_OF_GAIA: 'heart-of-gaia',
  SEED_SPLITTER: 'seed-splitter', 
  EARTH_AQUARIUM_SHROOMS: 'earth-aquarium-shrooms',
  CORAL_REEF_RESTORATION: 'coral-reef-restoration',
  CLEAN_WATER: 'clean-water',
  GREENLAKE_TRIBE: 'greenlake-tribe',
  RAILING_ENERGY: 'railing-energy',
  FREEZE_CAPITAL: 'freeze-capital',
  VINTAGE_CAFE: 'vintage-cafe',
  TECHNO_SOUL: 'techno-soul'
} as const;

export type ProjectHeadId = typeof PROJECT_HEADS[keyof typeof PROJECT_HEADS];

class CrossProjectSynergyService {
  private static instance: CrossProjectSynergyService;
  private harmonyPoints: HarmonyPoints = {
    total: 0,
    balance: 0,
    earned: 0,
    spent: 0,
    multiplier: 1.0
  };

  private userTokens: ProjectToken[] = [];
  private activeSynergies: TokenSynergy[] = [];
  private userSkillTransfers: SkillTransfer[] = [];

  public static getInstance(): CrossProjectSynergyService {
    if (!CrossProjectSynergyService.instance) {
      CrossProjectSynergyService.instance = new CrossProjectSynergyService();
    }
    return CrossProjectSynergyService.instance;
  }

  // Token Synergy Examples Implementation
  public getTokenSynergyExamples(): TokenSynergy[] {
    return [
      // Clean Water tokens → Seed Packs in Seed Splitter
      {
        sourceProject: PROJECT_HEADS.CLEAN_WATER,
        targetProject: PROJECT_HEADS.SEED_SPLITTER,
        sourceTokens: [],
        exchangeRate: 0.8, // 1 Clean Water token = 0.8 Seed Packs
        bonusMultiplier: 1.2,
        unlockConditions: ['Level 5 in Clean Water Project', 'Complete 3 water purification missions']
      },
      // Coral Restoration → Mushroom Wellness Tours
      {
        sourceProject: PROJECT_HEADS.CORAL_REEF_RESTORATION,
        targetProject: PROJECT_HEADS.EARTH_AQUARIUM_SHROOMS,
        sourceTokens: [],
        exchangeRate: 1.5, // 1 Coral token = 1.5 Mushroom tokens
        bonusMultiplier: 2.0,
        unlockConditions: ['Complete coral restoration mission', 'Earn Ocean Guardian badge']
      },
      // GreenLake Tribe → Heart of Gaia
      {
        sourceProject: PROJECT_HEADS.GREENLAKE_TRIBE,
        targetProject: PROJECT_HEADS.HEART_OF_GAIA,
        sourceTokens: [],
        exchangeRate: 2.0, // Special premium exchange
        bonusMultiplier: 3.0,
        unlockConditions: ['Tribal Elder status', 'Connect with nature for 30 days']
      }
    ];
  }

  // Skill Transfer Quest Mechanics
  public getSkillTransferQuests(): SkillTransfer[] {
    return [
      {
        id: 'water-to-plant',
        sourceProject: PROJECT_HEADS.CLEAN_WATER,
        targetProject: PROJECT_HEADS.SEED_SPLITTER,
        skillType: 'Purification Expertise',
        level: 3,
        bonusPercentage: 25,
        description: 'Water purification skills enhance seed germination rates'
      },
      {
        id: 'coral-to-mushroom',
        sourceProject: PROJECT_HEADS.CORAL_REEF_RESTORATION,
        targetProject: PROJECT_HEADS.EARTH_AQUARIUM_SHROOMS,
        skillType: 'Symbiotic Relationship Mastery',
        level: 4,
        bonusPercentage: 40,
        description: 'Understanding coral ecosystems unlocks advanced mushroom cultivation'
      },
      {
        id: 'energy-to-all',
        sourceProject: PROJECT_HEADS.RAILING_ENERGY,
        targetProject: 'all',
        skillType: 'Energy Efficiency',
        level: 5,
        bonusPercentage: 15,
        description: 'Energy management skills boost all project efficiency'
      }
    ];
  }

  // Event Bonuses for Cross-Project Participation
  public getActiveEventBonuses(): EventBonus[] {
    const now = new Date();
    const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    return [
      {
        id: 'earth-day-2024',
        name: 'Earth Day Harmony Celebration',
        description: 'Triple rewards for all cross-project activities',
        multiplier: 3.0,
        applicableProjects: Object.values(PROJECT_HEADS),
        startDate: now,
        endDate: weekFromNow,
        conditions: ['Participate in at least 2 different projects', 'Complete daily harmony quest']
      },
      {
        id: 'ocean-month',
        name: 'Ocean Protection Month',
        description: 'Special bonuses for water-related project synergies',
        multiplier: 2.5,
        applicableProjects: [PROJECT_HEADS.CORAL_REEF_RESTORATION, PROJECT_HEADS.CLEAN_WATER],
        startDate: now,
        endDate: weekFromNow,
        conditions: ['Complete ocean cleanup mission', 'Exchange water tokens']
      }
    ];
  }

  // Token Multiplier System
  public calculateTokenMultiplier(
    sourceProject: string, 
    targetProject: string, 
    baseAmount: number,
    userLevel: number = 1
  ): number {
    const synergy = this.getTokenSynergyExamples().find(
      s => s.sourceProject === sourceProject && s.targetProject === targetProject
    );
    
    if (!synergy) return baseAmount;
    
    const baseExchange = baseAmount * synergy.exchangeRate;
    const levelBonus = userLevel * 0.1; // 10% bonus per level
    const eventMultiplier = this.getActiveEventMultiplier(sourceProject, targetProject);
    
    return Math.floor(baseExchange * synergy.bonusMultiplier * (1 + levelBonus) * eventMultiplier);
  }

  private getActiveEventMultiplier(sourceProject: string, targetProject: string): number {
    const activeEvents = this.getActiveEventBonuses();
    let maxMultiplier = 1.0;
    
    for (const event of activeEvents) {
      if (event.applicableProjects.includes(sourceProject) || 
          event.applicableProjects.includes(targetProject)) {
        maxMultiplier = Math.max(maxMultiplier, event.multiplier);
      }
    }
    
    return maxMultiplier;
  }

  // Cross-Project Mission Generation
  public generateCrossProjectMissions(): CrossProjectMission[] {
    return [
      {
        id: 'harmony-trinity',
        title: 'The Harmony Trinity Challenge',
        description: 'Complete objectives in Heart of Gaia, Seed Splitter, and Clean Water projects within 48 hours',
        requiredProjects: [PROJECT_HEADS.HEART_OF_GAIA, PROJECT_HEADS.SEED_SPLITTER, PROJECT_HEADS.CLEAN_WATER],
        rewards: [
          {
            projectId: 'cross-project',
            tokenType: 'Harmony Crystal',
            amount: 500,
            earned: new Date(),
            source: 'Trinity Challenge',
            transferable: true
          }
        ],
        harmonyPointsReward: 1000,
        duration: 48 * 60 * 60 * 1000, // 48 hours in ms
        participants: 247,
        maxParticipants: 1000,
        status: 'active'
      },
      {
        id: 'ocean-forest-link',
        title: 'Ocean-Forest Connection',
        description: 'Link coral restoration with mushroom cultivation through shared symbiotic wisdom',
        requiredProjects: [PROJECT_HEADS.CORAL_REEF_RESTORATION, PROJECT_HEADS.EARTH_AQUARIUM_SHROOMS],
        rewards: [
          {
            projectId: 'cross-project',
            tokenType: 'Symbiotic Wisdom Token',
            amount: 300,
            earned: new Date(),
            source: 'Ocean-Forest Link',
            transferable: true
          }
        ],
        harmonyPointsReward: 750,
        duration: 72 * 60 * 60 * 1000, // 72 hours
        participants: 156,
        maxParticipants: 500,
        status: 'active'
      }
    ];
  }

  // Harmony Points Management
  public addHarmonyPoints(amount: number, multiplier: number = 1): void {
    const actualAmount = Math.floor(amount * multiplier * this.harmonyPoints.multiplier);
    this.harmonyPoints.total += actualAmount;
    this.harmonyPoints.balance += actualAmount;
    this.harmonyPoints.earned += actualAmount;
  }

  public spendHarmonyPoints(amount: number): boolean {
    if (this.harmonyPoints.balance >= amount) {
      this.harmonyPoints.balance -= amount;
      this.harmonyPoints.spent += amount;
      return true;
    }
    return false;
  }

  public getHarmonyPoints(): HarmonyPoints {
    return { ...this.harmonyPoints };
  }

  // Global Recognition System
  public getGlobalRecognitionBadges(): GlobalRecognition[] {
    return [
      {
        badgeId: 'harmony-master',
        name: 'Harmony Master',
        description: 'Complete missions in all project heads',
        criteria: ['Participate in all 10 project heads', 'Earn 5000 Harmony Points'],
        projectsRequired: Object.values(PROJECT_HEADS),
        harmonyPointsRequired: 5000,
        earned: false
      },
      {
        badgeId: 'synergy-pioneer',
        name: 'Synergy Pioneer', 
        description: 'First to discover new cross-project synergies',
        criteria: ['Complete 10 token exchanges', 'Unlock 3 skill transfers'],
        projectsRequired: [PROJECT_HEADS.SEED_SPLITTER, PROJECT_HEADS.CLEAN_WATER],
        harmonyPointsRequired: 2500,
        earned: false
      },
      {
        badgeId: 'ocean-forest-guardian',
        name: 'Ocean-Forest Guardian',
        description: 'Master of ocean and forest ecosystems',
        criteria: ['Complete Ocean-Forest Connection mission', 'Level 10 in both projects'],
        projectsRequired: [PROJECT_HEADS.CORAL_REEF_RESTORATION, PROJECT_HEADS.EARTH_AQUARIUM_SHROOMS],
        harmonyPointsRequired: 3000,
        earned: false
      }
    ];
  }

  // Smart Referral System
  public createSmartReferral(refereeId: string, projectsShared: string[]): SmartReferral {
    return {
      referrerId: 'current-user-id', // Would be actual user ID
      refereeId,
      projectsShared,
      bonusTokens: projectsShared.map(project => ({
        projectId: project,
        tokenType: 'Referral Bonus',
        amount: 100,
        earned: new Date(),
        source: 'Smart Referral',
        transferable: false
      })),
      harmonyPointsBonus: projectsShared.length * 250,
      status: 'pending'
    };
  }

  // Impact Investment Tracking
  public trackImpactInvestment(projectId: string, amount: number): ImpactInvestment {
    return {
      id: `invest-${Date.now()}`,
      projectId,
      amount,
      investmentDate: new Date(),
      expectedReturns: amount * 1.15, // 15% expected return
      actualReturns: 0,
      environmentalImpact: {
        co2Reduced: amount * 0.1, // kg CO2 per token invested
        treesPlanted: Math.floor(amount / 10), // 1 tree per 10 tokens
        waterSaved: amount * 5, // liters saved per token
        wildlifeProtected: Math.floor(amount / 50) // 1 animal per 50 tokens
      }
    };
  }
}

export default CrossProjectSynergyService;