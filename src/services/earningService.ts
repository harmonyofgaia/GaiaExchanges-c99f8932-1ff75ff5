import { 
  EarningActivity, 
  EarningActivityType, 
  WaterSavingAction,
  HomeGrownFoodAction,
  BeeHotelAction,
  EnvironmentalEducationAction,
  SkillBasedEarning,
  ReferralBonus,
  MissionVote,
  LocationMission,
  CarbonCreditAction,
  NFTMarketplaceActivity,
  EmergencyResponse,
  LongTermCommitment,
  InnovationBonus,
  AccessibilityReward,
  UserProfile,
  Badge,
  Achievement
} from '@/types/gaia-types'
import { GAIA_TOKEN } from '@/constants/gaia'

class EarningService {
  private readonly POINTS_TO_TOKEN_RATE = 0.001 // 1000 points = 1 GAIA token
  private readonly BASE_MULTIPLIERS = {
    [EarningActivityType.WATER_SAVING]: 1.2,
    [EarningActivityType.HOME_GROWN_FOOD]: 1.1,
    [EarningActivityType.BEE_HOTEL]: 1.5,
    [EarningActivityType.ENVIRONMENTAL_EDUCATION]: 1.3,
    [EarningActivityType.SKILL_BASED]: 1.0,
    [EarningActivityType.REFERRAL]: 0.8,
    [EarningActivityType.MISSION_VOTING]: 0.5,
    [EarningActivityType.LOCATION_MISSION]: 1.4,
    [EarningActivityType.CARBON_CREDIT]: 2.0,
    [EarningActivityType.NFT_MARKETPLACE]: 0.9,
    [EarningActivityType.EMERGENCY_RESPONSE]: 2.5,
    [EarningActivityType.LONG_TERM_COMMITMENT]: 1.8,
    [EarningActivityType.INNOVATION]: 3.0,
    [EarningActivityType.ACCESSIBILITY]: 1.6
  }

  // Water Saving Actions
  async recordWaterSavingAction(action: Omit<WaterSavingAction, 'id' | 'pointsEarned' | 'tokensEarned'>): Promise<WaterSavingAction> {
    const points = this.calculateWaterSavingPoints(action)
    const tokens = this.convertPointsToTokens(points)
    
    const newAction: WaterSavingAction = {
      ...action,
      id: this.generateId(),
      pointsEarned: points,
      tokensEarned: tokens
    }

    await this.recordEarningActivity({
      id: newAction.id,
      type: EarningActivityType.WATER_SAVING,
      title: `Water Saving: ${action.type}`,
      description: `Saved ${action.waterSavedLiters}L of water`,
      pointsEarned: points,
      tokensEarned: tokens,
      timestamp: new Date(),
      userId: userId,
      verified: action.verified,
      location: action.location ? { latitude: 0, longitude: 0, address: action.location } : undefined,
      metadata: { waterSavingAction: newAction }
    })

    return newAction
  }

  private calculateWaterSavingPoints(action: Omit<WaterSavingAction, 'id' | 'pointsEarned' | 'tokensEarned'>): number {
    const basePoints = Math.floor(action.waterSavedLiters * 0.1) // 0.1 points per liter
    const durationBonus = Math.floor(action.duration * 2) // 2 points per day
    const verificationBonus = action.verified ? Math.floor(basePoints * 0.5) : 0
    const typeMultiplier = this.getTypeMultiplier(action.type)
    
    return Math.floor((basePoints + durationBonus + verificationBonus) * typeMultiplier * this.BASE_MULTIPLIERS[EarningActivityType.WATER_SAVING])
  }

  private getTypeMultiplier(type: string): number {
    const multipliers: Record<string, number> = {
      'rain_collection': 1.5,
      'greywater_reuse': 1.8,
      'low_flow_fixtures': 1.2,
      'leak_repair': 2.0,
      'drought_resistant_plants': 1.3
    }
    return multipliers[type] || 1.0
  }

  // Home Grown Food Actions
  async recordHomeGrownFoodAction(action: Omit<HomeGrownFoodAction, 'id' | 'pointsEarned' | 'tokensEarned'>): Promise<HomeGrownFoodAction> {
    const points = this.calculateHomeGrownFoodPoints(action)
    const tokens = this.convertPointsToTokens(points)
    
    const newAction: HomeGrownFoodAction = {
      ...action,
      id: this.generateId(),
      pointsEarned: points,
      tokensEarned: tokens
    }

    await this.recordEarningActivity({
      id: newAction.id,
      type: EarningActivityType.HOME_GROWN_FOOD,
      title: `Home Grown: ${action.cropType}`,
      description: `Grew ${action.quantity} units of ${action.cropType}`,
      pointsEarned: points,
      tokensEarned: tokens,
      timestamp: new Date(),
      userId: 'current-user',
      verified: true,
      metadata: { homeGrownFoodAction: newAction }
    })

    return newAction
  }

  private calculateHomeGrownFoodPoints(action: Omit<HomeGrownFoodAction, 'id' | 'pointsEarned' | 'tokensEarned'>): number {
    const basePoints = action.quantity * 10
    const durationBonus = Math.floor(action.growthDuration * 0.5)
    const organicBonus = action.organicCertified ? Math.floor(basePoints * 0.3) : 0
    const sharingBonus = (action.seedsShared * 5) + (action.knowledgeShared ? 50 : 0)
    
    return Math.floor((basePoints + durationBonus + organicBonus + sharingBonus) * this.BASE_MULTIPLIERS[EarningActivityType.HOME_GROWN_FOOD])
  }

  // Bee Hotel Actions
  async recordBeeHotelAction(action: Omit<BeeHotelAction, 'id' | 'pointsEarned' | 'tokensEarned'>): Promise<BeeHotelAction> {
    const points = this.calculateBeeHotelPoints(action)
    const tokens = this.convertPointsToTokens(points)
    
    const newAction: BeeHotelAction = {
      ...action,
      id: this.generateId(),
      pointsEarned: points,
      tokensEarned: tokens
    }

    await this.recordEarningActivity({
      id: newAction.id,
      type: EarningActivityType.BEE_HOTEL,
      title: `Bee Hotel: ${action.hotelType}`,
      description: `Created ${action.size} bee hotel with ${action.occupancyRate}% occupancy`,
      pointsEarned: points,
      tokensEarned: tokens,
      timestamp: new Date(),
      userId: 'current-user',
      verified: true,
      location: { latitude: 0, longitude: 0, address: action.location },
      metadata: { beeHotelAction: newAction }
    })

    return newAction
  }

  private calculateBeeHotelPoints(action: Omit<BeeHotelAction, 'id' | 'pointsEarned' | 'tokensEarned'>): number {
    const sizeMultiplier = { small: 1, medium: 1.5, large: 2 }[action.size]
    const basePoints = 200 * sizeMultiplier
    const occupancyBonus = Math.floor(action.occupancyRate * 2)
    const maintenanceBonus = action.maintenanceDone ? 100 : 0
    const educationBonus = action.educationalContent ? 150 : 0
    
    return Math.floor((basePoints + occupancyBonus + maintenanceBonus + educationBonus) * this.BASE_MULTIPLIERS[EarningActivityType.BEE_HOTEL])
  }

  // Environmental Education Actions
  async recordEnvironmentalEducationAction(action: Omit<EnvironmentalEducationAction, 'id' | 'pointsEarned' | 'tokensEarned'>): Promise<EnvironmentalEducationAction> {
    const points = this.calculateEnvironmentalEducationPoints(action)
    const tokens = this.convertPointsToTokens(points)
    
    const newAction: EnvironmentalEducationAction = {
      ...action,
      id: this.generateId(),
      pointsEarned: points,
      tokensEarned: tokens
    }

    await this.recordEarningActivity({
      id: newAction.id,
      type: EarningActivityType.ENVIRONMENTAL_EDUCATION,
      title: `Education: ${action.type}`,
      description: `${action.topic} - ${action.duration} hours, ${action.participants} participants`,
      pointsEarned: points,
      tokensEarned: tokens,
      timestamp: new Date(),
      userId: 'current-user',
      verified: true,
      metadata: { environmentalEducationAction: newAction }
    })

    return newAction
  }

  private calculateEnvironmentalEducationPoints(action: Omit<EnvironmentalEducationAction, 'id' | 'pointsEarned' | 'tokensEarned'>): number {
    const basePoints = action.duration * 10
    const participantBonus = action.participants * 5
    const certificateBonus = action.certificateEarned ? 200 : 0
    const sharingBonus = action.contentShared ? 100 : 0
    const impactBonus = action.impactReported ? 150 : 0
    
    return Math.floor((basePoints + participantBonus + certificateBonus + sharingBonus + impactBonus) * this.BASE_MULTIPLIERS[EarningActivityType.ENVIRONMENTAL_EDUCATION])
  }

  // Skill-Based Earning
  async recordSkillBasedEarning(earning: Omit<SkillBasedEarning, 'id' | 'pointsEarned' | 'tokensEarned'>): Promise<SkillBasedEarning> {
    const points = this.calculateSkillBasedPoints(earning)
    const tokens = this.convertPointsToTokens(points)
    
    const newEarning: SkillBasedEarning = {
      ...earning,
      id: this.generateId(),
      pointsEarned: points,
      tokensEarned: tokens
    }

    await this.recordEarningActivity({
      id: newEarning.id,
      type: EarningActivityType.SKILL_BASED,
      title: `Skill Work: ${earning.skillType}`,
      description: `${earning.projectTitle} - ${earning.hoursWorked} hours`,
      pointsEarned: points,
      tokensEarned: tokens,
      timestamp: new Date(),
      userId: 'current-user',
      verified: true,
      metadata: { skillBasedEarning: newEarning }
    })

    return newEarning
  }

  private calculateSkillBasedPoints(earning: Omit<SkillBasedEarning, 'id' | 'pointsEarned' | 'tokensEarned'>): number {
    const basePoints = earning.hoursWorked * 25
    const difficultyBonus = earning.difficultyLevel * 50
    const qualityBonus = Math.floor(earning.qualityRating * 20)
    const satisfactionBonus = Math.floor(earning.clientSatisfaction * 30)
    const ecoBonus = earning.ecoImpact ? Math.floor(basePoints * 0.5) : 0
    
    return Math.floor((basePoints + difficultyBonus + qualityBonus + satisfactionBonus + ecoBonus) * this.BASE_MULTIPLIERS[EarningActivityType.SKILL_BASED])
  }

  // Generic earning activity recorder
  private async recordEarningActivity(activity: EarningActivity): Promise<void> {
    // TODO: Integrate with Supabase/blockchain to store activity
    console.log('Recording earning activity:', activity)
    
    // Update user profile
    await this.updateUserProfile(activity.userId, activity.pointsEarned, activity.tokensEarned)
    
    // Check for badge eligibility
    await this.checkBadgeEligibility(activity.userId, activity.type)
    
    // Update leaderboards
    await this.updateLeaderboards(activity.userId, activity.pointsEarned)
    
    // Record on blockchain
    await this.recordOnBlockchain(activity)
  }

  private async updateUserProfile(userId: string, points: number, tokens: number): Promise<void> {
    // TODO: Update user's total points and tokens in database
    console.log(`Updating user ${userId}: +${points} points, +${tokens} tokens`)
  }

  private async checkBadgeEligibility(userId: string, activityType: EarningActivityType): Promise<void> {
    // TODO: Check if user earned new badges
    console.log(`Checking badge eligibility for user ${userId}, activity ${activityType}`)
  }

  private async updateLeaderboards(userId: string, points: number): Promise<void> {
    // TODO: Update global and category leaderboards
    console.log(`Updating leaderboards for user ${userId}: +${points} points`)
  }

  private async recordOnBlockchain(activity: EarningActivity): Promise<void> {
    // TODO: Record activity hash on GAIA private blockchain
    console.log('Recording on blockchain:', activity.id)
  }

  private convertPointsToTokens(points: number): number {
    return parseFloat((points * this.POINTS_TO_TOKEN_RATE).toFixed(3))
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  // Referral System
  async processReferral(referrerUserId: string, referredUserId: string): Promise<ReferralBonus> {
    const bonus = this.calculateReferralBonus(referrerUserId)
    
    const referralBonus: ReferralBonus = {
      id: this.generateId(),
      referredUserId,
      referredUserActivity: 0, // Will be updated as referred user is active
      bonusLevel: 1,
      ongoing: true,
      totalEarnings: 0,
      pointsEarned: bonus.points,
      tokensEarned: bonus.tokens
    }

    await this.recordEarningActivity({
      id: referralBonus.id,
      type: EarningActivityType.REFERRAL,
      title: 'Referral Bonus',
      description: `Successfully referred new user`,
      pointsEarned: bonus.points,
      tokensEarned: bonus.tokens,
      timestamp: new Date(),
      userId: referrerUserId,
      verified: true,
      metadata: { referralBonus }
    })

    return referralBonus
  }

  private calculateReferralBonus(referrerUserId: string): { points: number; tokens: number } {
    const basePoints = 500
    const baseTokens = this.convertPointsToTokens(basePoints)
    
    // TODO: Add multipliers based on referrer's level/activity
    return {
      points: Math.floor(basePoints * this.BASE_MULTIPLIERS[EarningActivityType.REFERRAL]),
      tokens: Math.floor(baseTokens * this.BASE_MULTIPLIERS[EarningActivityType.REFERRAL])
    }
  }

  // Mission Voting
  async recordMissionVote(vote: Omit<MissionVote, 'id' | 'pointsEarned' | 'tokensEarned'>): Promise<MissionVote> {
    const points = this.calculateVotingPoints(vote)
    const tokens = this.convertPointsToTokens(points)
    
    const newVote: MissionVote = {
      ...vote,
      id: this.generateId(),
      pointsEarned: points,
      tokensEarned: tokens
    }

    await this.recordEarningActivity({
      id: newVote.id,
      type: EarningActivityType.MISSION_VOTING,
      title: 'Mission Vote',
      description: `Voted ${vote.vote} on mission`,
      pointsEarned: points,
      tokensEarned: tokens,
      timestamp: new Date(),
      userId: 'current-user',
      verified: true,
      metadata: { missionVote: newVote }
    })

    return newVote
  }

  private calculateVotingPoints(vote: Omit<MissionVote, 'id' | 'pointsEarned' | 'tokensEarned'>): number {
    const basePoints = 50
    const influenceBonus = Math.floor(vote.influence * 10)
    const stakingBonus = Math.floor(vote.tokensStaked * 0.1)
    
    return Math.floor((basePoints + influenceBonus + stakingBonus) * this.BASE_MULTIPLIERS[EarningActivityType.MISSION_VOTING])
  }

  // Analytics and reporting
  async getUserEarningHistory(userId: string): Promise<EarningActivity[]> {
    // TODO: Fetch from database
    return []
  }

  async getUserStats(userId: string): Promise<{
    totalPoints: number
    totalTokens: number
    activitiesByType: Record<EarningActivityType, number>
    badges: Badge[]
    achievements: Achievement[]
  }> {
    // TODO: Calculate user statistics
    return {
      totalPoints: 0,
      totalTokens: 0,
      activitiesByType: {} as Record<EarningActivityType, number>,
      badges: [],
      achievements: []
    }
  }
}

export const earningService = new EarningService()