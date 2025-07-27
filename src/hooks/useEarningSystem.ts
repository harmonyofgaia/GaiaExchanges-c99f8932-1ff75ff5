
import { useState, useEffect } from 'react'
import { earningService, WaterSavingAction } from '@/services/earningService'
import { EarningActivity, UserProfile, Badge, Achievement } from '@/types/gaia-types'

export function useEarningSystem(userId: string) {
  const [earnings, setEarnings] = useState({
    totalEarned: 0,
    dailyEarnings: 0,
    weeklyEarnings: 0,
    monthlyEarnings: 0,
    streak: 0,
    multiplier: 1
  })

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const userEarnings = earningService.getUserEarnings(userId)
    if (userEarnings) {
      setEarnings({
        totalEarned: userEarnings.totalEarned,
        dailyEarnings: userEarnings.dailyEarnings,
        weeklyEarnings: userEarnings.weeklyEarnings,
        monthlyEarnings: userEarnings.monthlyEarnings,
        streak: userEarnings.streak,
        multiplier: userEarnings.multiplier
      })
    }
  }, [userId])

  const addWaterSavingAction = async (action: WaterSavingAction) => {
    setIsLoading(true)
    try {
      const updatedEarnings = earningService.addEarning(userId, action)
      setEarnings({
        totalEarned: updatedEarnings.totalEarned,
        dailyEarnings: updatedEarnings.dailyEarnings,
        weeklyEarnings: updatedEarnings.weeklyEarnings,
        monthlyEarnings: updatedEarnings.monthlyEarnings,
        streak: updatedEarnings.streak,
        multiplier: updatedEarnings.multiplier
      })
    } finally {
      setIsLoading(false)
    }
  }

  return {
    earnings,
    addWaterSavingAction,
    isLoading
  }
}

export function useEarningActivities(userId: string) {
  const [activities, setActivities] = useState<EarningActivity[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const addActivity = (activity: EarningActivity) => {
    setActivities(prev => [activity, ...prev])
  }

  const loadActivities = (userId: string) => {
    setIsLoading(true)
    // Mock loading activities
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const recordWaterSaving = (userId: string) => {
    // Mock implementation
    console.log('Recording water saving for user:', userId)
  }

  const recordBeeHotel = (userId: string) => {
    // Mock implementation
    console.log('Recording bee hotel for user:', userId)
  }

  const recordEnvironmentalEducation = (userId: string) => {
    // Mock implementation
    console.log('Recording environmental education for user:', userId)
  }

  const recordHomeGrownFood = (userId: string) => {
    // Mock implementation
    console.log('Recording home grown food for user:', userId)
  }

  const recordSkillBasedWork = (userId: string) => {
    // Mock implementation
    console.log('Recording skill-based work for user:', userId)
  }

  const processReferral = (userId: string) => {
    // Mock implementation
    console.log('Processing referral for user:', userId)
  }

  return {
    activities,
    addActivity,
    isLoading,
    loadActivities,
    recordWaterSaving,
    recordBeeHotel,
    recordEnvironmentalEducation,
    recordHomeGrownFood,
    recordSkillBasedWork,
    processReferral,
    loading: isLoading
  }
}

export function useUserProfile(userId: string) {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const loadProfile = (userId: string) => {
    setIsLoading(true)
    // Mock loading profile
    setTimeout(() => {
      setProfile({
        id: userId,
        username: 'GaiaUser',
        email: 'user@gaia.com',
        walletAddress: '0x123...',
        totalPoints: 1000,
        totalTokens: 500,
        level: 5,
        badges: [],
        achievements: [],
        earningHistory: [],
        referralCode: 'GAIA123',
        createdAt: new Date(),
        lastActive: new Date()
      })
      setIsLoading(false)
    }, 1000)
  }

  useEffect(() => {
    loadProfile(userId)
  }, [userId])

  return {
    profile,
    isLoading,
    loadProfile,
    stats: {
      totalPoints: profile?.totalPoints || 0,
      totalTokens: profile?.totalTokens || 0,
      level: profile?.level || 1
    }
  }
}

export function useBadges(userId: string) {
  const [badges, setBadges] = useState<Badge[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const loadUserBadges = (userId: string) => {
    setIsLoading(true)
    // Mock loading badges
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const loadAvailableBadges = (userId: string) => {
    // Mock implementation
    console.log('Loading available badges for user:', userId)
  }

  return {
    badges,
    isLoading,
    loadUserBadges,
    loadAvailableBadges,
    availableBadges: badges
  }
}

export function useAchievements(userId: string) {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const loadUserAchievements = (userId: string) => {
    setIsLoading(true)
    // Mock loading achievements
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return {
    achievements,
    isLoading,
    loadUserAchievements
  }
}
