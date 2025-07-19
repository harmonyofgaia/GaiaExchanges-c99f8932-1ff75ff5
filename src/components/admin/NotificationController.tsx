
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Bell, BellOff, Settings, Volume2, VolumeX } from 'lucide-react'

interface NotificationSettings {
  dragonDefense: boolean
  levelUpAlerts: boolean
  systemUpdates: boolean
  securityAlerts: boolean
  tradingAlerts: boolean
  craftingAlerts: boolean
}

export function NotificationController() {
  const [settings, setSettings] = useState<NotificationSettings>({
    dragonDefense: false, // Disabled by default
    levelUpAlerts: true,
    systemUpdates: true,
    securityAlerts: true,
    tradingAlerts: true,
    craftingAlerts: true
  })

  const [soundEnabled, setSoundEnabled] = useState(true)

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('notification-settings')
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  const updateSetting = (key: keyof NotificationSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    localStorage.setItem('notification-settings', JSON.stringify(newSettings))
  }

  const resetToDefaults = () => {
    const defaultSettings: NotificationSettings = {
      dragonDefense: false,
      levelUpAlerts: true,
      systemUpdates: true,
      securityAlerts: true,
      tradingAlerts: true,
      craftingAlerts: true
    }
    setSettings(defaultSettings)
    localStorage.setItem('notification-settings', JSON.stringify(defaultSettings))
  }

  return (
    <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/30 to-purple-900/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-400">
          <Bell className="h-6 w-6" />
          🔔 SMART NOTIFICATION CONTROLLER
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge className="bg-blue-600 text-white">USER CONTROL</Badge>
          <Badge className="bg-green-600 text-white">SMART FILTERING</Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Sound Control */}
        <div className="flex items-center justify-between p-4 bg-black/40 rounded border border-blue-500/20">
          <div className="flex items-center gap-3">
            {soundEnabled ? <Volume2 className="h-5 w-5 text-blue-400" /> : <VolumeX className="h-5 w-5 text-gray-400" />}
            <div>
              <div className="font-bold text-blue-400">Sound Notifications</div>
              <div className="text-sm text-blue-300">Enable/disable notification sounds</div>
            </div>
          </div>
          <Switch
            checked={soundEnabled}
            onCheckedChange={setSoundEnabled}
          />
        </div>

        {/* Notification Categories */}
        <div className="space-y-4">
          <h3 className="text-blue-400 font-bold">Notification Categories</h3>
          
          <div className="space-y-3">
            {/* Dragon Defense - Highlighted as problematic */}
            <div className="flex items-center justify-between p-4 bg-red-900/20 rounded border border-red-500/30">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🐉</span>
                <div>
                  <div className="font-bold text-red-400">Dragon Defense Alerts</div>
                  <div className="text-sm text-red-300">Frequent pop-up notifications from dragon system</div>
                  <Badge className="bg-red-600 text-white text-xs mt-1">RECOMMENDED: OFF</Badge>
                </div>
              </div>
              <Switch
                checked={settings.dragonDefense}
                onCheckedChange={(value) => updateSetting('dragonDefense', value)}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-black/40 rounded border border-yellow-500/20">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🆙</span>
                <div>
                  <div className="font-bold text-yellow-400">Level Up Alerts</div>
                  <div className="text-sm text-yellow-300">Notifications for achievements and level progression</div>
                </div>
              </div>
              <Switch
                checked={settings.levelUpAlerts}
                onCheckedChange={(value) => updateSetting('levelUpAlerts', value)}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-black/40 rounded border border-blue-500/20">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔄</span>
                <div>
                  <div className="font-bold text-blue-400">System Updates</div>
                  <div className="text-sm text-blue-300">Important system and feature updates</div>
                </div>
              </div>
              <Switch
                checked={settings.systemUpdates}
                onCheckedChange={(value) => updateSetting('systemUpdates', value)}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-black/40 rounded border border-red-500/20">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🛡️</span>
                <div>
                  <div className="font-bold text-red-400">Security Alerts</div>
                  <div className="text-sm text-red-300">Critical security and wallet notifications</div>
                  <Badge className="bg-red-600 text-white text-xs mt-1">IMPORTANT</Badge>
                </div>
              </div>
              <Switch
                checked={settings.securityAlerts}
                onCheckedChange={(value) => updateSetting('securityAlerts', value)}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-black/40 rounded border border-green-500/20">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📈</span>
                <div>
                  <div className="font-bold text-green-400">Trading Alerts</div>
                  <div className="text-sm text-green-300">Price changes and trading opportunities</div>
                </div>
              </div>
              <Switch
                checked={settings.tradingAlerts}
                onCheckedChange={(value) => updateSetting('tradingAlerts', value)}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-black/40 rounded border border-orange-500/20">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏭</span>
                <div>
                  <div className="font-bold text-orange-400">Crafting Alerts</div>
                  <div className="text-sm text-orange-300">Coin crafting progress and completions</div>
                </div>
              </div>
              <Switch
                checked={settings.craftingAlerts}
                onCheckedChange={(value) => updateSetting('craftingAlerts', value)}
              />
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={resetToDefaults}
            variant="outline"
            className="border-blue-500/30 text-blue-400"
          >
            <Settings className="h-4 w-4 mr-2" />
            Reset to Recommended
          </Button>
          
          <Button
            onClick={() => {
              const allOff: NotificationSettings = {
                dragonDefense: false,
                levelUpAlerts: false,
                systemUpdates: false,
                securityAlerts: true, // Keep security on
                tradingAlerts: false,
                craftingAlerts: false
              }
              setSettings(allOff)
              localStorage.setItem('notification-settings', JSON.stringify(allOff))
            }}
            variant="outline"
            className="border-red-500/30 text-red-400"
          >
            <BellOff className="h-4 w-4 mr-2" />
            Minimal Mode
          </Button>
        </div>

        {/* Info Box */}
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-4">
          <h4 className="font-medium text-blue-400 mb-2">💡 Smart Notification Tips</h4>
          <div className="text-sm text-blue-300 space-y-1">
            <p>• Dragon Defense alerts are often repetitive - consider disabling them</p>
            <p>• Security alerts should always remain enabled for your safety</p>
            <p>• Use "Minimal Mode" for distraction-free experience</p>
            <p>• Settings are saved automatically and persist across sessions</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
