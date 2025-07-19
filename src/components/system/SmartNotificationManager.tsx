
import { useState, useEffect } from 'react'
import { toast } from 'sonner'

interface NotificationPreferences {
  dragonLevels: 'all' | 'milestones' | 'major' | 'off'
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
    dragonLevels: 'milestones', // Only show every 100 levels or major milestones
    systemUpdates: true,
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
      case 'major':
        // Only show every 1000 levels or major power milestones
        return (level % 1000 === 0 || power % 1000000 < 1000) && timeSinceLastNotification > 300000 // 5 minutes
      case 'milestones':
        // Show every 100 levels or significant milestones
        return (level % 100 === 0 || power % 100000 < 1000) && timeSinceLastNotification > 60000 // 1 minute
      case 'all':
      default:
        return timeSinceLastNotification > 30000 // 30 seconds minimum between notifications
    }
  }

  const showSmartNotification = (type: string, title: string, description: string, priority: 'low' | 'medium' | 'high' = 'medium') => {
    // Check user preferences
    const prefKey = type as keyof NotificationPreferences
    if (prefKey in preferences && !preferences[prefKey]) {
      return
    }

    // Implement smart throttling
    const lastShown = lastNotifications[type] || 0
    const cooldownTime = priority === 'high' ? 0 : priority === 'medium' ? 30000 : 120000
    
    if (Date.now() - lastShown < cooldownTime) {
      return
    }

    // Show notification
    toast.success(title, {
      description,
      duration: priority === 'high' ? 8000 : priority === 'medium' ? 4000 : 3000
    })

    // Update last shown timestamp
    const updated = { ...lastNotifications, [type]: Date.now() }
    setLastNotifications(updated)
    localStorage.setItem('last_notifications', JSON.stringify(updated))
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
