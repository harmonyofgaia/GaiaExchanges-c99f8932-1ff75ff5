import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { HardDrive, Zap, Database, Server, CloudUpload, BarChart3 } from "lucide-react";

const StorageUpgradePanel = () => {
  const storageStats = [
    {
      label: "Current Storage",
      value: "2.4 TB",
      usage: 68,
      color: "bg-blue-500",
    },
    {
      label: "Cache Storage",
      value: "512 GB",
      usage: 45,
      color: "bg-green-500",
    },
    {
      label: "Blockchain Data",
      value: "1.2 TB",
      usage: 82,
      color: "bg-purple-500",
    },
    {
      label: "Game Assets",
      value: "856 GB",
      usage: 34,
      color: "bg-orange-500",
    },
  ];

  const upgradeOptions = [
    {
      title: "🚀 Performance Boost",
      description: "Upgrade to high-speed NVMe storage",
      currentSpeed: "3.5 GB/s",
      upgradedSpeed: "7.0 GB/s",
      price: "50 GAIA",
      color: "from-blue-600 to-cyan-600",
    },
    {
      title: "💾 Capacity Expansion",
      description: "Double your storage capacity",
      currentCapacity: "2.4 TB",
      upgradedCapacity: "4.8 TB",
      price: "75 GAIA",
      color: "from-green-600 to-emerald-600",
    },
    {
      title: "⚡ Distributed Network",
      description: "Join the GAIA distributed storage network",
      currentNodes: "1 Node",
      upgradedNodes: "5 Nodes",
      price: "100 GAIA",
      color: "from-purple-600 to-pink-600",
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="border-blue-500/30 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <HardDrive className="h-6 w-6" />
            💾 GAIA Storage Management Hub
          </CardTitle>
          <p className="text-muted-foreground">
            Manage and upgrade your storage infrastructure across the GAIA ecosystem
          </p>
        </CardHeader>
      </Card>

      {/* Current Storage Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {storageStats.map((stat, index) => (
          <Card key={index} className="bg-black/20 border-gray-700/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-muted-foreground">{stat.label}</div>
                <Badge className="text-xs">{stat.usage}%</Badge>
              </div>
              <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
              <Progress value={stat.usage} className="h-2" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upgrade Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {upgradeOptions.map((option, index) => (
          <Card
            key={index}
            className="border-2 border-gray-700/30 bg-gradient-to-br from-black/40 to-gray-900/40"
          >
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Server className="h-5 w-5" />
                {option.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{option.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Current:</span>
                  <span className="text-white">
                    {option.currentSpeed || option.currentCapacity || option.currentNodes}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Upgraded:</span>
                  <span className="text-green-400">
                    {option.upgradedSpeed || option.upgradedCapacity || option.upgradedNodes}
                  </span>
                </div>
                <Button className={`w-full bg-gradient-to-r ${option.color} text-white font-bold`}>
                  <CloudUpload className="h-4 w-4 mr-2" />
                  Upgrade - {option.price}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Network Status */}
      <Card className="border-green-500/30 bg-green-900/20">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Database className="h-6 w-6" />
            🌐 GAIA Blockchain Storage Network
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-900/20 rounded-lg">
              <BarChart3 className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">99.7%</div>
              <div className="text-sm text-muted-foreground">Network Uptime</div>
            </div>
            <div className="text-center p-4 bg-blue-900/20 rounded-lg">
              <Zap className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">2.4ms</div>
              <div className="text-sm text-muted-foreground">Average Latency</div>
            </div>
            <div className="text-center p-4 bg-purple-900/20 rounded-lg">
              <Server className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">847</div>
              <div className="text-sm text-muted-foreground">Active Nodes</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
        <h4 className="font-medium text-green-400 mb-2">⛓️ Blockchain-Powered Storage</h4>
        <div className="text-sm text-green-300">
          ✅ Decentralized storage across GAIA network
          <br />
          ✅ Automatic backup and redundancy
          <br />
          ✅ Smart contracts for storage allocation
          <br />
          ✅ Cross-platform data synchronization
          <br />✅ Secure encryption with GAIA tokens
        </div>
      </div>
    </div>
  );
};


export default StorageUpgradePanel;
