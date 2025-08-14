import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Bell, BellOff, Settings, Volume2, VolumeX } from "lucide-react";
import { toast } from "sonner";

export function NotificationController() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [criticalAlertsOnly, setCriticalAlertsOnly] = useState(false);

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    toast.success(notificationsEnabled ? "Notifications disabled" : "Notifications enabled");
  };

  const testNotification = () => {
    toast.success("🔔 Test notification sent successfully!", {
      description: "This is how admin notifications will appear",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-blue-500/30 bg-blue-900/20">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <Bell className="h-5 w-5" />
            🔔 Notification Control Center
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Status Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-900/20 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-400">Active</div>
              <div className="text-sm text-muted-foreground">System Status</div>
            </div>
            <div className="p-4 bg-blue-900/20 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-400">47</div>
              <div className="text-sm text-muted-foreground">Today's Alerts</div>
            </div>
            <div className="p-4 bg-purple-900/20 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-400">3</div>
              <div className="text-sm text-muted-foreground">Critical Pending</div>
            </div>
          </div>

          {/* Main Controls */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-900/30 rounded-lg">
              <div className="flex items-center gap-3">
                {notificationsEnabled ? (
                  <Bell className="h-5 w-5 text-green-400" />
                ) : (
                  <BellOff className="h-5 w-5 text-red-400" />
                )}
                <div>
                  <h3 className="font-semibold">Master Notifications</h3>
                  <p className="text-sm text-muted-foreground">Control all system notifications</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={notificationsEnabled} onCheckedChange={toggleNotifications} />
                <Badge className={notificationsEnabled ? "bg-green-600" : "bg-red-600"}>
                  {notificationsEnabled ? "ON" : "OFF"}
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-900/30 rounded-lg">
              <div className="flex items-center gap-3">
                {soundEnabled ? (
                  <Volume2 className="h-5 w-5 text-blue-400" />
                ) : (
                  <VolumeX className="h-5 w-5 text-gray-400" />
                )}
                <div>
                  <h3 className="font-semibold">Sound Alerts</h3>
                  <p className="text-sm text-muted-foreground">Play audio for notifications</p>
                </div>
              </div>
              <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-900/30 rounded-lg">
              <div className="flex items-center gap-3">
                <Settings className="h-5 w-5 text-orange-400" />
                <div>
                  <h3 className="font-semibold">Critical Alerts Only</h3>
                  <p className="text-sm text-muted-foreground">
                    Show only high-priority notifications
                  </p>
                </div>
              </div>
              <Switch checked={criticalAlertsOnly} onCheckedChange={setCriticalAlertsOnly} />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button onClick={testNotification} className="bg-blue-600 hover:bg-blue-700">
              <Bell className="h-4 w-4 mr-2" />
              Test Notification
            </Button>
            <Button onClick={() => toast.info("All notifications cleared")} variant="outline">
              Clear All Alerts
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
