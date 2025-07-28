
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { shouldShowNotification } from '@/lib/utils'

interface NotificationPreferences {
  dragonLevels: 'off' | 'critical' | 'major' // Reduced options
  systemUpdates: boolean
  tokenEarnings: boolean
  videoApprovals: boolean
  securityAlerts: boolean
}

interface SmartNotification {
  type: string
  level: number
  message: string
  shouldShow: boolean
  lastShown: number
}

export function SmartNotificationManager() {
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    dragonLevels: 'off', // Default to off
    systemUpdates: false, // Reduce system update notifications
    tokenEarnings: true,
    videoApprovals: true,
    securityAlerts: true
  })

  const [lastNotifications, setLastNotifications] = useState<Record<string, number>>({})

  useEffect(() => {
    // Load preferences from localStorage
    const savedPrefs = localStorage.getItem('notification_preferences')
    if (savedPrefs) {
      setPreferences(JSON.parse(savedPrefs))
    }

    const savedNotifications = localStorage.getItem('last_notifications')
    if (savedNotifications) {
      setLastNotifications(JSON.parse(savedNotifications))
    }
  }, [])

  const shouldShowDragonNotification = (level: number, power: number): boolean => {
    const lastDragonNotification = lastNotifications.dragon || 0
    const timeSinceLastNotification = Date.now() - lastDragonNotification

    switch (preferences.dragonLevels) {
      case 'off':
        return false
      case 'critical':
        // Only show every 10000 levels or massive power milestones
        return (level % 10000 === 0 || power % 10000000 < 1000) && timeSinceLastNotification > 1800000 // 30 minutes
      case 'major':
        // Show every 1000 levels or major power milestones
        return (level % 1000 === 0 || power % 1000000 < 1000) && timeSinceLastNotification > 600000 // 10 minutes
      default:
        return false
    }
  }

  const showSmartNotification = (type: string, title: string, description: string, priority: 'low' | 'medium' | 'high' | 'critical' = 'medium') => {
    // Check if we should show this notification based on global settings
    if (!shouldShowNotification(priority)) {
      return
    }

    // Check user preferences
    const prefKey = type as keyof NotificationPreferences
    if (prefKey in preferences && !preferences[prefKey]) {
      return
    }

    // Implement stricter throttling
    const lastShown = lastNotifications[type] || 0
    const cooldownTime = priority === 'critical' ? 0 : priority === 'high' ? 300000 : 1800000 // 5 minutes for high, 30 minutes for others
    
    if (Date.now() - lastShown < cooldownTime) {
      return
    }

    // Show notification only for important events
    if (priority === 'critical' || priority === 'high') {
      toast.success(title, {
        description,
        duration: priority === 'critical' ? 6000 : 3000
      })

      // Update last shown timestamp
      const updated = { ...lastNotifications, [type]: Date.now() }
      setLastNotifications(updated)
      localStorage.setItem('last_notifications', JSON.stringify(updated))
    }
  }

  const updatePreferences = (newPreferences: NotificationPreferences) => {
    setPreferences(newPreferences)
    localStorage.setItem('notification_preferences', JSON.stringify(newPreferences))
  }

  // Expose methods globally for other components to use
  useEffect(() => {
    ;(window as any).smartNotifications = {
      showSmartNotification,
      shouldShowDragonNotification,
      updatePreferences,
      preferences
    }
  }, [preferences, lastNotifications])

  return null // This is a service component, no UI
}
