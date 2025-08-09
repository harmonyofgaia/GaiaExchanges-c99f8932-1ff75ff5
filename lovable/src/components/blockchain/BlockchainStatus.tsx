import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Shield, Zap, Database, Network } from "lucide-react";

export function BlockchainStatus() {
  const networkStats = [
    {
      label: "Network Status",
      value: "OPERATIONAL",
      icon: Activity,
      color: "text-green-400",
    },
    {
      label: "Security Level",
      value: "MAXIMUM",
      icon: Shield,
      color: "text-blue-400",
    },
    {
      label: "Transaction Speed",
      value: "< 1ms",
      icon: Zap,
      color: "text-yellow-400",
    },
    {
      label: "Data Integrity",
      value: "100%",
      icon: Database,
      color: "text-purple-400",
    },
    {
      label: "Network Nodes",
      value: "2,847",
      icon: Network,
      color: "text-cyan-400",
    },
  ];

  return (
    <Card className="border-green-500/30 bg-gradient-to-br from-green-900/30 to-cyan-900/30">
      <CardHeader>
        <CardTitle className="text-green-400 flex items-center gap-2">
          <Network className="h-6 w-6" />
          ⛓️ GAIA Private Blockchain Network - Motherboard Status
        </CardTitle>
        <div className="flex gap-2">
          <Badge className="bg-green-600 animate-pulse">🟢 LIVE</Badge>
          <Badge className="bg-blue-600">🔒 SECURE</Badge>
          <Badge className="bg-purple-600">⚡ HIGH SPEED</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          {networkStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center p-3 bg-black/20 rounded-lg border border-gray-700"
              >
                <Icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
                <div className={`text-lg font-bold ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
          <h4 className="font-bold text-green-400 mb-2">
            🌍 Motherboard Integration:
          </h4>
          <div className="text-sm text-green-300 grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>• Token system core infrastructure</div>
            <div>• Gaming rewards processing</div>
            <div>• Exchange transaction security</div>
            <div>• Marketplace payment handling</div>
            <div>• Environmental impact tracking</div>
            <div>• Cross-platform data synchronization</div>
            <div>• Decentralized asset storage</div>
            <div>• Real-time blockchain analytics</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
