import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, Bell, BellOff, Volume2, VolumeX } from "lucide-react";
import { toast } from "sonner";

interface NotificationPreferences {
  dragonLevels: "all" | "milestones" | "major" | "off";
  systemUpdates: boolean;
  tokenEarnings: boolean;
  videoApprovals: boolean;
  securityAlerts: boolean;
  soundEnabled: boolean;
  desktopNotifications: boolean;
}

export function NotificationSettings() {
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    dragonLevels: "milestones",
    systemUpdates: true,
    tokenEarnings: true,
    videoApprovals: true,
    securityAlerts: true,
    soundEnabled: true,
    desktopNotifications: false,
  });

  useEffect(() => {
    // Load preferences from localStorage
    const savedPrefs = localStorage.getItem("notification_preferences");
    if (savedPrefs) {
      setPreferences(JSON.parse(savedPrefs));
    }
  }, []);

  const updatePreference = <K extends keyof NotificationPreferences>(
    key: K,
    value: NotificationPreferences[K],
  ) => {
    const newPreferences = { ...preferences, [key]: value };
    setPreferences(newPreferences);
    localStorage.setItem(
      "notification_preferences",
      JSON.stringify(newPreferences),
    );

    // Update global notification manager
    if ((window as any).smartNotifications) {
      (window as any).smartNotifications.updatePreferences(newPreferences);
    }

    toast.success("Preferences Updated", {
      description: "Your notification settings have been saved",
      duration: 2000,
    });
  };

  const testNotification = () => {
    toast.success("🧪 Test Notification", {
      description:
        "This is how your notifications will appear with current settings",
      duration: 4000,
    });
  };

  const requestDesktopPermission = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        updatePreference("desktopNotifications", true);
        new Notification("GAiA Notifications Enabled", {
          body: "You will now receive desktop notifications from GAiA platform",
          icon: "/favicon.ico",
        });
      }
    }
  };

  return (
    <Card className="border-blue-500/50 bg-gradient-to-r from-blue-900/30 to-indigo-900/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-blue-400">
          <Settings className="h-6 w-6" />
          Smart Notification Settings
          <Badge className="bg-blue-600 text-white">OPTIMIZED</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Dragon Level Notifications */}
        <div className="space-y-3">
          <Label className="text-lg font-semibold text-orange-400">
            🐉 Dragon Level Notifications
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {(["off", "major", "milestones", "all"] as const).map((option) => (
              <Button
                key={option}
                variant={
                  preferences.dragonLevels === option ? "default" : "outline"
                }
                size="sm"
                onClick={() => updatePreference("dragonLevels", option)}
                className={
                  preferences.dragonLevels === option ? "bg-orange-600" : ""
                }
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </Button>
            ))}
          </div>
          <div className="text-sm text-muted-foreground">
            {preferences.dragonLevels === "off" && "No dragon notifications"}
            {preferences.dragonLevels === "major" &&
              "Only every 1000 levels (5min cooldown)"}
            {preferences.dragonLevels === "milestones" &&
              "Every 100 levels (1min cooldown)"}
            {preferences.dragonLevels === "all" &&
              "All level ups (30sec cooldown)"}
          </div>
        </div>

        {/* System Notifications */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold text-green-400">
            📱 System Notifications
          </Label>
          <div className="space-y-3">
            {[
              { key: "systemUpdates", label: "System Updates", icon: "⚙️" },
              {
                key: "tokenEarnings",
                label: "GAIA Token Earnings",
                icon: "💰",
              },
              { key: "videoApprovals", label: "Video Approvals", icon: "🎥" },
              { key: "securityAlerts", label: "Security Alerts", icon: "🛡️" },
            ].map(({ key, label, icon }) => (
              <div
                key={key}
                className="flex items-center justify-between p-3 rounded bg-blue-500/10 border border-blue-500/20"
              >
                <Label
                  htmlFor={key}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <span>{icon}</span>
                  {label}
                </Label>
                <Switch
                  id={key}
                  checked={
                    preferences[key as keyof NotificationPreferences] as boolean
                  }
                  onCheckedChange={(checked) =>
                    updatePreference(
                      key as keyof NotificationPreferences,
                      checked,
                    )
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* Audio & Desktop Settings */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold text-purple-400">
            🔊 Audio & Desktop
          </Label>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded bg-purple-500/10 border border-purple-500/20">
              <Label
                htmlFor="soundEnabled"
                className="flex items-center gap-2 cursor-pointer"
              >
                {preferences.soundEnabled ? (
                  <Volume2 className="h-4 w-4" />
                ) : (
                  <VolumeX className="h-4 w-4" />
                )}
                Notification Sounds
              </Label>
              <Switch
                id="soundEnabled"
                checked={preferences.soundEnabled}
                onCheckedChange={(checked) =>
                  updatePreference("soundEnabled", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded bg-purple-500/10 border border-purple-500/20">
              <Label className="flex items-center gap-2">
                {preferences.desktopNotifications ? (
                  <Bell className="h-4 w-4" />
                ) : (
                  <BellOff className="h-4 w-4" />
                )}
                Desktop Notifications
              </Label>
              {!preferences.desktopNotifications ? (
                <Button
                  size="sm"
                  onClick={requestDesktopPermission}
                  className="bg-purple-600"
                >
                  Enable
                </Button>
              ) : (
                <Badge className="bg-green-600 text-white">ENABLED</Badge>
              )}
            </div>
          </div>
        </div>

        {/* Test Button */}
        <div className="pt-4 border-t border-blue-500/20">
          <Button
            onClick={testNotification}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
          >
            🧪 Test Notification with Current Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
