import { useState, useEffect } from 'react'
import { 
  EarningActivity, 
  EarningActivityType, 
  UserProfile,
  Badge,
  Achievement,
  LeaderboardEntry
} from '@/types/gaia-types'
import { earningService } from '@/services/earningService'

export function useEarningActivities() {
  const [activities, setActivities] = useState<EarningActivity[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadActivities = async (userId: string) => {
    setLoading(true)
    try {
      const userActivities = await earningService.getUserEarningHistory(userId)
      setActivities(userActivities)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load activities')
    } finally {
      setLoading(false)
    }
  }

  const recordWaterSaving = async (action: any) => {
    try {
      const result = await earningService.recordWaterSavingAction(action)
      // Refresh activities
      await loadActivities('current-user')
      return result
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to record water saving action')
      throw err
    }
  }

  const recordHomeGrownFood = async (action: any) => {
    try {
      const result = await earningService.recordHomeGrownFoodAction(action)
      await loadActivities('current-user')
      return result
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to record home grown food action')
      throw err
    }
  }

  const recordBeeHotel = async (action: any) => {
    try {
      const result = await earningService.recordBeeHotelAction(action)
      await loadActivities('current-user')
      return result
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to record bee hotel action')
      throw err
    }
  }

  const recordEnvironmentalEducation = async (action: any) => {
    try {
      const result = await earningService.recordEnvironmentalEducationAction(action)
      await loadActivities('current-user')
      return result
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to record environmental education action')
      throw err
    }
  }

  const recordSkillBasedWork = async (earning: any) => {
    try {
      const result = await earningService.recordSkillBasedEarning(earning)
      await loadActivities('current-user')
      return result
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to record skill-based earning')
      throw err
    }
  }

  const processReferral = async (referredUserId: string) => {
    try {
      const result = await earningService.processReferral('current-user', referredUserId)
      await loadActivities('current-user')
      return result
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process referral')
      throw err
    }
  }

  const recordMissionVote = async (vote: any) => {
    try {
      const result = await earningService.recordMissionVote(vote)
      await loadActivities('current-user')
      return result
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to record mission vote')
      throw err
    }
  }

  return {
    activities,
    loading,
    error,
    loadActivities,
    recordWaterSaving,
    recordHomeGrownFood,
    recordBeeHotel,
    recordEnvironmentalEducation,
    recordSkillBasedWork,
    processReferral,
    recordMissionVote
  }
}

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [stats, setStats] = useState<{
    totalPoints: number
    totalTokens: number
    activitiesByType: Record<EarningActivityType, number>
    badges: Badge[]
    achievements: Achievement[]
  } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadProfile = async (userId: string) => {
    setLoading(true)
    try {
      const userStats = await earningService.getUserStats(userId)
      setStats(userStats)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!profile) return
    
    try {
      // TODO: Update profile in database
      setProfile({ ...profile, ...updates })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile')
    }
  }

  return {
    profile,
    stats,
    loading,
    error,
    loadProfile,
    updateProfile
  }
}

export function useLeaderboard() {
  const [globalLeaderboard, setGlobalLeaderboard] = useState<LeaderboardEntry[]>([])
  const [categoryLeaderboards, setCategoryLeaderboards] = useState<Record<EarningActivityType, LeaderboardEntry[]>>({} as Record<EarningActivityType, LeaderboardEntry[]>)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadGlobalLeaderboard = async () => {
    setLoading(true)
    try {
      // TODO: Fetch from database/API
      const mockData: LeaderboardEntry[] = [
        {
          rank: 1,
          userId: 'user1',
          username: 'EcoMaster92',
          avatar: '🌟',
          totalPoints: 9847,
          totalTokens: 9.847,
          level: 47,
          badges: [],
          activities: {} as Record<EarningActivityType, number>,
          trend: 'stable',
          country: '🇳🇱'
        }
      ]
      setGlobalLeaderboard(mockData)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load leaderboard')
    } finally {
      setLoading(false)
    }
  }

  const loadCategoryLeaderboard = async (category: EarningActivityType) => {
    try {
      // TODO: Fetch category-specific leaderboard
      const mockData: LeaderboardEntry[] = []
      setCategoryLeaderboards(prev => ({
        ...prev,
        [category]: mockData
      }))
    } catch (err) {
      setError(err instanceof Error ? err.message : `Failed to load ${category} leaderboard`)
    }
  }

  return {
    globalLeaderboard,
    categoryLeaderboards,
    loading,
    error,
    loadGlobalLeaderboard,
    loadCategoryLeaderboard
  }
}

export function useBadges() {
  const [badges, setBadges] = useState<Badge[]>([])
  const [availableBadges, setAvailableBadges] = useState<Badge[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadUserBadges = async (userId: string) => {
    setLoading(true)
    try {
      // TODO: Fetch user's earned badges
      const userBadges: Badge[] = []
      setBadges(userBadges)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load badges')
    } finally {
      setLoading(false)
    }
  }

  const loadAvailableBadges = async () => {
    try {
      // TODO: Fetch all available badges
      const allBadges: Badge[] = [
        {
          id: 'water-saver-1',
          name: 'Water Warrior',
          description: 'Save 1000L of water',
          icon: '💧',
          rarity: 'common',
          requirements: ['Save 1000L of water through various actions'],
          earnedAt: new Date(),
          pointsValue: 500
        },
        {
          id: 'food-grower-1',
          name: 'Green Thumb',
          description: 'Grow 10 different crops',
          icon: '🌱',
          rarity: 'uncommon',
          requirements: ['Successfully grow 10 different types of crops'],
          earnedAt: new Date(),
          pointsValue: 750
        },
        {
          id: 'bee-keeper-1',
          name: 'Bee Guardian',
          description: 'Create 5 bee hotels',
          icon: '🐝',
          rarity: 'rare',
          requirements: ['Create and maintain 5 bee hotels'],
          earnedAt: new Date(),
          pointsValue: 1000
        },
        {
          id: 'educator-1',
          name: 'Knowledge Sharer',
          description: 'Teach 100 people about environmental topics',
          icon: '🎓',
          rarity: 'epic',
          requirements: ['Educate 100+ people about environmental sustainability'],
          earnedAt: new Date(),
          pointsValue: 1500
        },
        {
          id: 'innovator-1',
          name: 'Eco Innovator',
          description: 'Create revolutionary environmental solution',
          icon: '💡',
          rarity: 'legendary',
          requirements: ['Develop and implement innovative environmental solution'],
          earnedAt: new Date(),
          pointsValue: 5000
        }
      ]
      setAvailableBadges(allBadges)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load available badges')
    }
  }

  return {
    badges,
    availableBadges,
    loading,
    error,
    loadUserBadges,
    loadAvailableBadges
  }
}

export function useAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadUserAchievements = async (userId: string) => {
    setLoading(true)
    try {
      // TODO: Fetch user's achievements
      const userAchievements: Achievement[] = [
        {
          id: 'water-milestone-1',
          title: 'Water Conservation Champion',
          description: 'Save 5000L of water',
          category: EarningActivityType.WATER_SAVING,
          progress: 3200,
          maxProgress: 5000,
          completed: false,
          reward: {
            points: 1000,
            tokens: 1.0,
            badge: 'water-champion'
          }
        },
        {
          id: 'food-milestone-1',
          title: 'Urban Farmer',
          description: 'Grow 50 crops successfully',
          category: EarningActivityType.HOME_GROWN_FOOD,
          progress: 23,
          maxProgress: 50,
          completed: false,
          reward: {
            points: 800,
            tokens: 0.8,
            badge: 'urban-farmer'
          }
        },
        {
          id: 'education-milestone-1',
          title: 'Environmental Educator',
          description: 'Complete 20 educational activities',
          category: EarningActivityType.ENVIRONMENTAL_EDUCATION,
          progress: 20,
          maxProgress: 20,
          completed: true,
          completedAt: new Date(),
          reward: {
            points: 1500,
            tokens: 1.5,
            badge: 'educator'
          }
        }
      ]
      setAchievements(userAchievements)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load achievements')
    } finally {
      setLoading(false)
    }
  }

  return {
    achievements,
    loading,
    error,
    loadUserAchievements
  }
}