
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

  return {
    activities,
    addActivity,
    isLoading
  }
}

export function useUserProfile(userId: string) {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Mock profile data
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
  }, [userId])

  return {
    profile,
    isLoading
  }
}

export function useBadges(userId: string) {
  const [badges, setBadges] = useState<Badge[]>([])
  const [isLoading, setIsLoading] = useState(false)

  return {
    badges,
    isLoading
  }
}

export function useAchievements(userId: string) {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [isLoading, setIsLoading] = useState(false)

  return {
    achievements,
    isLoading
  }
}
