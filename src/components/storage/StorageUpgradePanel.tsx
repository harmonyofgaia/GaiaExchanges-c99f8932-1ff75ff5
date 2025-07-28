
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { useStorageUpgrade } from '@/hooks/useStorageUpgrade'
import { storageManager } from '@/services/StorageUpgradeManager'
import { 
  HardDrive, 
  Zap, 
  Shield, 
  Compress, 
  Infinity,
  TrendingUp,
  Database
} from 'lucide-react'

const getUpgradeIcon = (type: string) => {
  switch (type) {
    case 'capacity': return <Database className="h-5 w-5" />
    case 'speed': return <Zap className="h-5 w-5" />
    case 'redundancy': return <Shield className="h-5 w-5" />
    case 'compression': return <Compress className="h-5 w-5" />
    case 'quantum': return <Infinity className="h-5 w-5" />
    default: return <HardDrive className="h-5 w-5" />
  }
}

const getUpgradeColor = (type: string) => {
  switch (type) {
    case 'capacity': return 'bg-blue-600'
    case 'speed': return 'bg-yellow-600'
    case 'redundancy': return 'bg-green-600'
    case 'compression': return 'bg-purple-600'
    case 'quantum': return 'bg-gradient-to-r from-pink-600 to-purple-600'
    default: return 'bg-gray-600'
  }
}

export function StorageUpgradePanel() {
  const { metrics, availableUpgrades, upgradeStorage, usagePercent, isUpgrading } = useStorageUpgrade()

  return (
    <div className="space-y-6">
      {/* Storage Overview */}
      <Card className="border-2 border-blue-500/20 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <HardDrive className="h-6 w-6" />
            💾 STORAGE SYSTEM OVERVIEW
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 rounded-lg bg-blue-900/30 border border-blue-500/20">
              <div className="text-2xl font-bold text-blue-400">
                {storageManager.formatCapacity(metrics.totalCapacity)}
              </div>
              <div className="text-sm text-muted-foreground">Total Capacity</div>
            </div>
            
            <div className="text-center p-3 rounded-lg bg-green-900/30 border border-green-500/20">
              <div className="text-2xl font-bold text-green-400">
                {storageManager.formatCapacity(metrics.availableSpace)}
              </div>
              <div className="text-sm text-muted-foreground">Available</div>
            </div>
            
            <div className="text-center p-3 rounded-lg bg-yellow-900/30 border border-yellow-500/20">
              <div className="text-2xl font-bold text-yellow-400">
                {metrics.accessSpeed === Infinity ? '∞' : metrics.accessSpeed}
                {metrics.accessSpeed !== Infinity ? ' MB/s' : ''}
              </div>
              <div className="text-sm text-muted-foreground">Access Speed</div>
            </div>
            
            <div className="text-center p-3 rounded-lg bg-purple-900/30 border border-purple-500/20">
              <div className="text-2xl font-bold text-purple-400">
                {metrics.redundancyLevel}x
              </div>
              <div className="text-sm text-muted-foreground">Redundancy</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Storage Usage</span>
              <span className="text-sm text-muted-foreground">
                {usagePercent.toFixed(1)}% Used
              </span>
            </div>
            <Progress value={usagePercent} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Available Upgrades */}
      <Card className="border-2 border-green-500/20 bg-gradient-to-br from-green-900/20 to-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <TrendingUp className="h-6 w-6" />
            🚀 STORAGE UPGRADES AVAILABLE
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableUpgrades.map((upgrade) => (
              <div
                key={upgrade.id}
                className={`p-4 rounded-lg border-2 border-opacity-20 ${
                  upgrade.type === 'quantum' 
                    ? 'bg-gradient-to-br from-pink-900/30 to-purple-900/30 border-pink-500' 
                    : 'bg-gray-900/30 border-gray-500'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getUpgradeIcon(upgrade.type)}
                    <h3 className="font-semibold text-lg">{upgrade.name}</h3>
                  </div>
                  <Badge 
                    className={`${getUpgradeColor(upgrade.type)} text-white`}
                    variant="secondary"
                  >
                    Tier {upgrade.level}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div className="text-sm text-muted-foreground">
                    Cost: {upgrade.cost.toLocaleString()} GAIA
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium mb-1">Benefits:</div>
                    <ul className="text-sm text-green-400 space-y-1">
                      {upgrade.benefits.map((benefit, index) => (
                        <li key={index}>• {benefit}</li>
                      ))}
                    </ul>
                  </div>
                  
                  {upgrade.requirements.length > 0 && (
                    <div>
                      <div className="text-sm font-medium mb-1">Requirements:</div>
                      <ul className="text-sm text-yellow-400 space-y-1">
                        {upgrade.requirements.map((req, index) => (
                          <li key={index}>• {req}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <Button
                    onClick={() => upgradeStorage(upgrade.id)}
                    disabled={isUpgrading}
                    className={`w-full ${getUpgradeColor(upgrade.type)} hover:opacity-90`}
                  >
                    {isUpgrading ? 'Installing...' : `Install ${upgrade.name}`}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Background Process Status */}
      <Card className="border-2 border-purple-500/20 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold text-purple-400 mb-4">
            🔄 BACKGROUND STORAGE OPTIMIZATION ACTIVE
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="text-4xl">⚡</div>
              <div className="font-bold text-yellow-400">AUTO-OPTIMIZATION</div>
              <div className="text-sm text-muted-foreground">
                Continuous background cleanup and optimization
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl">📈</div>
              <div className="font-bold text-green-400">AUTO-EXPANSION</div>
              <div className="text-sm text-muted-foreground">
                Automatic capacity increases when needed
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl">🛡️</div>
              <div className="font-bold text-blue-400">DATA PROTECTION</div>
              <div className="text-sm text-muted-foreground">
                Continuous backup and redundancy management
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
