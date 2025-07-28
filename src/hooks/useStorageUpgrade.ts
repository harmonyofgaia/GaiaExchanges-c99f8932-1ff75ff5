
import { useState, useEffect } from 'react'
import { storageManager } from '@/services/StorageUpgradeManager'

interface StorageUpgradeHook {
  metrics: any
  availableUpgrades: any[]
  upgradeStorage: (upgradeId: string) => Promise<boolean>
  usagePercent: number
  isUpgrading: boolean
}

export function useStorageUpgrade(): StorageUpgradeHook {
  const [metrics, setMetrics] = useState(storageManager.getMetrics())
  const [availableUpgrades, setAvailableUpgrades] = useState(storageManager.getAvailableUpgrades())
  const [usagePercent, setUsagePercent] = useState(storageManager.getStorageUsagePercent())
  const [isUpgrading, setIsUpgrading] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(storageManager.getMetrics())
      setAvailableUpgrades(storageManager.getAvailableUpgrades())
      setUsagePercent(storageManager.getStorageUsagePercent())
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const upgradeStorage = async (upgradeId: string): Promise<boolean> => {
    setIsUpgrading(true)
    try {
      const success = await storageManager.upgradeStorage(upgradeId)
      if (success) {
        // Update state after successful upgrade
        setMetrics(storageManager.getMetrics())
        setAvailableUpgrades(storageManager.getAvailableUpgrades())
        setUsagePercent(storageManager.getStorageUsagePercent())
      }
      return success
    } finally {
      setIsUpgrading(false)
    }
  }

  return {
    metrics,
    availableUpgrades,
    upgradeStorage,
    usagePercent,
    isUpgrading
  }
}
