
import { useState, useEffect } from 'react'
import { earningService, WaterSavingAction } from '@/services/earningService'

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
