
export interface WaterSavingAction {
  type: 'shower_reduction' | 'dishwasher_efficiency' | 'leak_fix' | 'rainwater_collection'
  amount: number
  timestamp: Date
}

export interface EarningData {
  userId: string
  totalEarned: number
  dailyEarnings: number
  weeklyEarnings: number
  monthlyEarnings: number
  actions: WaterSavingAction[]
  multiplier: number
  streak: number
}

export class EarningService {
  private static instance: EarningService
  private earnings: Map<string, EarningData> = new Map()

  static getInstance(): EarningService {
    if (!EarningService.instance) {
      EarningService.instance = new EarningService()
    }
    return EarningService.instance
  }

  calculateEarnings(userId: string, action: WaterSavingAction): number {
    const baseReward = this.getBaseReward(action.type)
    const multiplier = this.getMultiplier(userId)
    const amountBonus = action.amount * 0.1 // 0.1 token per liter/gallon saved
    
    return Math.round((baseReward + amountBonus) * multiplier)
  }

  private getBaseReward(actionType: WaterSavingAction['type']): number {
    const rewards = {
      shower_reduction: 10,
      dishwasher_efficiency: 15,
      leak_fix: 25,
      rainwater_collection: 20
    }
    return rewards[actionType] || 5
  }

  private getMultiplier(userId: string): number {
    const data = this.earnings.get(userId)
    if (!data) return 1
    
    // Streak bonus
    const streakBonus = Math.min(data.streak * 0.1, 2) // Max 2x multiplier
    return 1 + streakBonus
  }

  addEarning(userId: string, action: WaterSavingAction): EarningData {
    const earnings = this.calculateEarnings(userId, action)
    const existing = this.earnings.get(userId) || {
      userId,
      totalEarned: 0,
      dailyEarnings: 0,
      weeklyEarnings: 0,
      monthlyEarnings: 0,
      actions: [],
      multiplier: 1,
      streak: 0
    }

    existing.totalEarned += earnings
    existing.dailyEarnings += earnings
    existing.weeklyEarnings += earnings
    existing.monthlyEarnings += earnings
    existing.actions.push(action)
    existing.multiplier = this.getMultiplier(userId)
    existing.streak += 1

    this.earnings.set(userId, existing)
    return existing
  }

  getUserEarnings(userId: string): EarningData | null {
    return this.earnings.get(userId) || null
  }

  getLeaderboard(): Array<{ userId: string; totalEarned: number; streak: number }> {
    return Array.from(this.earnings.values())
      .sort((a, b) => b.totalEarned - a.totalEarned)
      .slice(0, 10)
      .map(data => ({
        userId: data.userId,
        totalEarned: data.totalEarned,
        streak: data.streak
      }))
  }
}

export const earningService = EarningService.getInstance()
