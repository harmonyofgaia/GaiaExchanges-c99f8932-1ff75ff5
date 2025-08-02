
// Comprehensive TypeScript type definitions for GAiA system
export interface TokenData {
  price: number
  volume24h: number
  marketCap: number
  priceChange24h: number
  holders: number
  transactions24h: number
  lastUpdated: Date
  isLive: boolean
  error?: string
  burnRate: number
  totalBurned: number
  circulatingSupply: number
}

export interface MetricsData {
  INITIAL_PRICE: number
  INITIAL_HOLDERS: number
  INITIAL_MARKET_CAP: number
  INITIAL_VOLUME: number
  INITIAL_TRANSACTIONS: number
  NETWORK_SPEED: number
  SECURITY_SCORE: number
  ECOSYSTEM_HEALTH: number
  DRAGON_POWER: number
}

export interface ExchangeListing {
  url: string
  status: string
  verified: boolean
}

export interface ExchangeListings {
  PUMPFUN: ExchangeListing
  UNISWAP: ExchangeListing
  COINBASE: ExchangeListing
  REVOLUT: ExchangeListing
  ZENGO: ExchangeListing
}

export interface GaiaTokenConfig {
  NAME: string
  SYMBOL: string
  CONTRACT_ADDRESS: string
  WALLET_ADDRESS: string
  PUMP_FUN_URL: string
  INITIAL_PRICE: number
  NETWORK: string
  EXCHANGE_LISTINGS: ExchangeListings
}

// Type guards for runtime validation
export const isValidTokenData = (data: unknown): data is TokenData => {
  const candidate = data as Record<string, unknown>
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof candidate.price === 'number' &&
    typeof candidate.volume24h === 'number' &&
    typeof candidate.marketCap === 'number' &&
    typeof candidate.priceChange24h === 'number' &&
    typeof candidate.holders === 'number' &&
    typeof candidate.transactions24h === 'number' &&
    candidate.lastUpdated instanceof Date &&
    typeof candidate.isLive === 'boolean' &&
    typeof candidate.burnRate === 'number' &&
    typeof candidate.totalBurned === 'number' &&
    typeof candidate.circulatingSupply === 'number'
  )
}

export const isValidMetricsData = (data: unknown): data is MetricsData => {
  const candidate = data as Record<string, unknown>
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof candidate.INITIAL_PRICE === 'number' &&
    typeof candidate.INITIAL_HOLDERS === 'number' &&
    typeof candidate.INITIAL_MARKET_CAP === 'number' &&
    typeof candidate.INITIAL_VOLUME === 'number' &&
    typeof candidate.INITIAL_TRANSACTIONS === 'number' &&
    typeof candidate.NETWORK_SPEED === 'number' &&
    typeof candidate.SECURITY_SCORE === 'number' &&
    typeof candidate.ECOSYSTEM_HEALTH === 'number' &&
    typeof candidate.DRAGON_POWER === 'number'
  )
}

// Helper functions with proper typing
export const formatGaiaPrice = (price: number): string => {
  if (typeof price !== 'number' || isNaN(price)) {
    console.warn('⚠️ Invalid price value provided to formatGaiaPrice:', price)
    return '$0.00000000'
  }
  return `$${price.toFixed(8)}`
}

// Points Earning System Types
export interface EarningActivity {
  id: string
  type: EarningActivityType
  title: string
  description: string
  pointsEarned: number
  tokensEarned: number
  timestamp: Date
  userId: string
  verified: boolean
  location?: {
    latitude: number
    longitude: number
    address: string
  }
  metadata?: Record<string, unknown>
}

export enum EarningActivityType {
  WATER_SAVING = 'water_saving',
  HOME_GROWN_FOOD = 'home_grown_food',
  BEE_HOTEL = 'bee_hotel',
  ENVIRONMENTAL_EDUCATION = 'environmental_education',
  SKILL_BASED = 'skill_based',
  REFERRAL = 'referral',
  MISSION_VOTING = 'mission_voting',
  LOCATION_MISSION = 'location_mission',
  CARBON_CREDIT = 'carbon_credit',
  NFT_MARKETPLACE = 'nft_marketplace',
  EMERGENCY_RESPONSE = 'emergency_response',
  LONG_TERM_COMMITMENT = 'long_term_commitment',
  INNOVATION = 'innovation',
  ACCESSIBILITY = 'accessibility'
}

export interface WaterSavingAction {
  id: string
  type: 'rain_collection' | 'greywater_reuse' | 'low_flow_fixtures' | 'leak_repair' | 'drought_resistant_plants'
  waterSavedLiters: number
  duration: number // days
  verified: boolean
  evidence?: string[] // photos/documents
  location: string
  pointsEarned: number
  tokensEarned: number
}

export interface HomeGrownFoodAction {
  id: string
  cropType: string
  quantity: number
  growthDuration: number // days
  organicCertified: boolean
  harvestDate: Date
  seedsShared: number
  knowledgeShared: boolean
  pointsEarned: number
  tokensEarned: number
}

export interface BeeHotelAction {
  id: string
  hotelType: 'bamboo' | 'wood_block' | 'clay' | 'mixed_materials'
  size: 'small' | 'medium' | 'large'
  location: string
  installDate: Date
  occupancyRate: number // percentage
  maintenanceDone: boolean
  educationalContent: boolean
  pointsEarned: number
  tokensEarned: number
}

export interface EnvironmentalEducationAction {
  id: string
  type: 'course_completion' | 'teaching' | 'content_creation' | 'workshop_attendance' | 'research'
  topic: string
  duration: number // hours
  participants: number
  certificateEarned: boolean
  contentShared: boolean
  impactReported: boolean
  pointsEarned: number
  tokensEarned: number
}

export interface SkillBasedEarning {
  id: string
  skillType: 'programming' | 'design' | 'writing' | 'consulting' | 'teaching' | 'translation' | 'research'
  projectTitle: string
  hoursWorked: number
  difficultyLevel: 1 | 2 | 3 | 4 | 5
  qualityRating: number
  clientSatisfaction: number
  ecoImpact: boolean
  pointsEarned: number
  tokensEarned: number
}

export interface ReferralBonus {
  id: string
  referredUserId: string
  referredUserActivity: number
  bonusLevel: 1 | 2 | 3 | 4 | 5
  ongoing: boolean
  totalEarnings: number
  pointsEarned: number
  tokensEarned: number
}

export interface MissionVote {
  id: string
  missionId: string
  vote: 'approve' | 'reject' | 'modify'
  reasoning: string
  influence: number
  tokensStaked: number
  votingPower: number
  pointsEarned: number
  tokensEarned: number
}

export interface LocationMission {
  id: string
  location: {
    latitude: number
    longitude: number
    address: string
    region: string
  }
  missionType: string
  difficulty: 'easy' | 'medium' | 'hard' | 'expert'
  timeLimit: number // hours
  participantsRequired: number
  currentParticipants: number
  rewardPool: number
  pointsReward: number
  tokensReward: number
}

export interface CarbonCreditAction {
  id: string
  actionType: 'tree_planting' | 'renewable_energy' | 'carbon_sequestration' | 'emissions_reduction'
  carbonOffset: number // kg CO2
  verified: boolean
  certificationBody: string
  tradeable: boolean
  price: number
  pointsEarned: number
  tokensEarned: number
}

export interface NFTMarketplaceActivity {
  id: string
  type: 'purchase' | 'sale' | 'creation' | 'trade' | 'auction_participation'
  nftId: string
  value: number
  ecoThemed: boolean
  rarityScore: number
  impactVerified: boolean
  pointsEarned: number
  tokensEarned: number
}

export interface EmergencyResponse {
  id: string
  emergencyType: 'wildfire' | 'flood' | 'earthquake' | 'climate_event' | 'pollution_incident'
  responseType: 'volunteer' | 'donation' | 'resource_sharing' | 'coordination' | 'reporting'
  urgencyLevel: 1 | 2 | 3 | 4 | 5
  impactArea: string
  hoursContributed: number
  verified: boolean
  pointsEarned: number
  tokensEarned: number
}

export interface LongTermCommitment {
  id: string
  commitmentType: 'daily_action' | 'weekly_challenge' | 'monthly_goal' | 'yearly_pledge'
  duration: number // days
  consistency: number // percentage
  milestones: number
  communitySupport: boolean
  progressTracked: boolean
  pointsEarned: number
  tokensEarned: number
}

export interface InnovationBonus {
  id: string
  innovationType: 'new_solution' | 'improvement' | 'research' | 'patent' | 'open_source'
  title: string
  description: string
  adoptionRate: number
  peerReviewed: boolean
  impactMeasured: boolean
  scalability: 1 | 2 | 3 | 4 | 5
  pointsEarned: number
  tokensEarned: number
}

export interface AccessibilityReward {
  id: string
  type: 'inclusive_design' | 'accessibility_testing' | 'barrier_removal' | 'education' | 'advocacy'
  beneficiaries: number
  impactVerified: boolean
  sustainabilityFocus: boolean
  communityFeedback: number
  pointsEarned: number
  tokensEarned: number
}

export interface UserProfile {
  id: string
  username: string
  email: string
  walletAddress: string
  totalPoints: number
  totalTokens: number
  level: number
  badges: Badge[]
  achievements: Achievement[]
  earningHistory: EarningActivity[]
  referralCode: string
  referredBy?: string
  createdAt: Date
  lastActive: Date
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'
  requirements: string[]
  earnedAt: Date
  pointsValue: number
}

export interface Achievement {
  id: string
  title: string
  description: string
  category: EarningActivityType
  progress: number
  maxProgress: number
  completed: boolean
  completedAt?: Date
  reward: {
    points: number
    tokens: number
    badge?: string
  }
}

export interface LeaderboardEntry {
  rank: number
  userId: string
  username: string
  avatar: string
  totalPoints: number
  totalTokens: number
  level: number
  badges: Badge[]
  activities: {
    [key in EarningActivityType]: number
  }
  trend: 'up' | 'down' | 'stable'
  country: string
}

export interface EcoActionHistory {
  userId: string
  actions: EarningActivity[]
  totalImpact: {
    carbonOffset: number
    waterSaved: number
    treesPlanted: number
    wasteReduced: number
    energySaved: number
  }
  streaks: {
    [key in EarningActivityType]: number
  }
  analytics: {
    weeklyPoints: number[]
    monthlyTokens: number[]
    categoryBreakdown: Record<EarningActivityType, number>
  }
}

export const formatGaiaNumber = (number: number): string => {
  if (typeof number !== 'number' || isNaN(number)) {
    console.warn('⚠️ Invalid number value provided to formatGaiaNumber:', number)
    return '0'
  }
  return number.toLocaleString()
}
