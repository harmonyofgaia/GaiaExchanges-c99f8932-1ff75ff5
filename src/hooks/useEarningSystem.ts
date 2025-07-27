
import { useState, useEffect } from 'react'

export interface EarningActivity {
  id: string
  type: string
  amount: number
  timestamp: Date
  description: string
  status: 'pending' | 'completed' | 'failed'
}

export interface UserProfile {
  id: string
  username: string
  totalEarnings: number
  level: number
  streak: number
  joinDate: Date
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  earned: boolean
  earnedDate?: Date
}

export interface Achievement {
  id: string
  name: string
  description: string
  progress: number
  maxProgress: number
  reward: number
  unlocked: boolean
}

export interface UserStats {
  totalEarnings: number
  weeklyEarnings: number
  monthlyEarnings: number
  activitiesCompleted: number
  streak: number
  level: number
}

export function useEarningActivities(userId: string) {
  const [activities, setActivities] = useState<EarningActivity[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const addActivity = (activity: EarningActivity) => {
    setActivities(prev => [...prev, activity])
  }

  const loadActivities = async (userId: string) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const recordBeeHotel = async (data: any) => {
    const activity: EarningActivity = {
      id: Date.now().toString(),
      type: 'bee_hotel',
      amount: 25,
      timestamp: new Date(),
      description: `Bee hotel maintenance: ${data.hotelType}`,
      status: 'completed'
    }
    addActivity(activity)
    return activity
  }

  const recordWaterSaving = async (data: any) => {
    const activity: EarningActivity = {
      id: Date.now().toString(),
      type: 'water_saving',
      amount: data.amount * 0.1,
      timestamp: new Date(),
      description: `Water saved: ${data.amount}L`,
      status: 'completed'
    }
    addActivity(activity)
    return activity
  }

  const recordEnvironmentalEducation = async (data: any) => {
    const activity: EarningActivity = {
      id: Date.now().toString(),
      type: 'environmental_education',
      amount: 15,
      timestamp: new Date(),
      description: `Environmental education: ${data.topic}`,
      status: 'completed'
    }
    addActivity(activity)
    return activity
  }

  const recordHomeGrownFood = async (data: any) => {
    const activity: EarningActivity = {
      id: Date.now().toString(),
      type: 'home_grown_food',
      amount: 20,
      timestamp: new Date(),
      description: `Home grown food: ${data.foodType}`,
      status: 'completed'
    }
    addActivity(activity)
    return activity
  }

  const processReferral = async (data: any) => {
    const activity: EarningActivity = {
      id: Date.now().toString(),
      type: 'referral',
      amount: 50,
      timestamp: new Date(),
      description: `Referral bonus: ${data.referredUser}`,
      status: 'completed'
    }
    addActivity(activity)
    return activity
  }

  const recordSkillBasedWork = async (data: any) => {
    const activity: EarningActivity = {
      id: Date.now().toString(),
      type: 'skill_based_work',
      amount: data.hoursWorked * 10,
      timestamp: new Date(),
      description: `Skill-based work: ${data.skillType}`,
      status: 'completed'
    }
    addActivity(activity)
    return activity
  }

  return {
    activities,
    addActivity,
    isLoading,
    loadActivities,
    recordBeeHotel,
    recordWaterSaving,
    recordEnvironmentalEducation,
    recordHomeGrownFood,
    processReferral,
    recordSkillBasedWork,
    loading: isLoading
  }
}

export function useUserProfile(userId: string) {
  const [profile, setProfile] = useState<UserProfile>({
    id: userId,
    username: 'EcoWarrior',
    totalEarnings: 0,
    level: 1,
    streak: 0,
    joinDate: new Date()
  })
  const [isLoading, setIsLoading] = useState(false)

  const loadProfile = async (userId: string) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const stats: UserStats = {
    totalEarnings: profile.totalEarnings,
    weeklyEarnings: 120,
    monthlyEarnings: 450,
    activitiesCompleted: 25,
    streak: profile.streak,
    level: profile.level
  }

  return {
    profile,
    isLoading,
    loadProfile,
    stats
  }
}

export function useBadges(userId: string) {
  const [badges, setBadges] = useState<Badge[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const loadUserBadges = async (userId: string) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const loadAvailableBadges = async (userId: string) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const availableBadges = badges

  return {
    badges,
    isLoading,
    loadUserBadges,
    loadAvailableBadges,
    availableBadges
  }
}

export function useAchievements(userId: string) {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const loadUserAchievements = async (userId: string) => {
    setIsLoading(true)
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
