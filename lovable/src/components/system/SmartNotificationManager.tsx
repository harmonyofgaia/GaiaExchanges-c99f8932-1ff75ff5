import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { shouldShowNotification } from "@/lib/utils";

interface NotificationPreferences {
  upgradeNotifications: boolean;
  criticalErrors: boolean;
  securityAlerts: boolean;
}

export function SmartNotificationManager() {
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    upgradeNotifications: true, // Only show upgrade notifications
    criticalErrors: true, // Keep critical errors
    securityAlerts: true, // Keep security alerts
  });

  const [lastNotifications, setLastNotifications] = useState<Record<string, number>>({});

  useEffect(() => {
    // Load preferences from localStorage
    const savedPrefs = localStorage.getItem("notification_preferences");
    if (savedPrefs) {
      setPreferences(JSON.parse(savedPrefs));
    }

    const savedNotifications = localStorage.getItem("last_notifications");
    if (savedNotifications) {
      setLastNotifications(JSON.parse(savedNotifications));
    }
  }, []);

  const showUpgradeNotification = (
    title: string,
    description: string,
    upgradeType: "level" | "feature" | "token" | "achievement"
  ) => {
    if (!preferences.upgradeNotifications) return;

    const lastShown = lastNotifications[`upgrade_${upgradeType}`] || 0;
    const cooldownTime = 300000; // 5 minutes between upgrade notifications

    if (Date.now() - lastShown < cooldownTime) {
      return;
    }

    // Show upgrade notification with appropriate styling
    const upgradeEmojis = {
      level: "🎉",
      feature: "✨",
      token: "🪙",
      achievement: "🏆",
    };

    toast.success(`${upgradeEmojis[upgradeType]} ${title}`, {
      description,
      duration: 4000,
      className: "border-l-4 border-l-green-500 bg-green-50 dark:bg-green-900/20",
    });

    // Update last shown timestamp
    const updated = {
      ...lastNotifications,
      [`upgrade_${upgradeType}`]: Date.now(),
    };
    setLastNotifications(updated);
    localStorage.setItem("last_notifications", JSON.stringify(updated));
  };

  const showCriticalNotification = (title: string, description: string) => {
    if (!preferences.criticalErrors) return;

    toast.error(title, {
      description,
      duration: 6000,
      className: "border-l-4 border-l-red-500",
    });
  };

  const showSecurityAlert = (title: string, description: string) => {
    if (!preferences.securityAlerts) return;

    toast.warning(`🛡️ ${title}`, {
      description,
      duration: 5000,
      className: "border-l-4 border-l-yellow-500",
    });
  };

  const updatePreferences = (newPreferences: NotificationPreferences) => {
    setPreferences(newPreferences);
    localStorage.setItem("notification_preferences", JSON.stringify(newPreferences));
  };

  // Expose methods globally for other components to use
  useEffect(() => {
    (window as unknown).gaiaNotifications = {
      showUpgradeNotification,
      showCriticalNotification,
      showSecurityAlert,
      updatePreferences,
      preferences,
    };
  }, [preferences, lastNotifications]);

  return null; // This is a service component, no UI
}
