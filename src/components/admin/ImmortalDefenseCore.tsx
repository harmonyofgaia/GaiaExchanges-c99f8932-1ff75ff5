import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ImmortalDefenseCore() {
  const [coreStatus, setCoreStatus] = useState("immortal");

  const coreMetrics = [
    { name: "Uptime", value: "∞", unit: "eternal", status: "immortal" },
    { name: "Defense Strength", value: "999", unit: "%", status: "maximum" },
    { name: "Regeneration Rate", value: "instant", unit: "", status: "active" },
    {
      name: "Core Temperature",
      value: "absolute zero",
      unit: "",
      status: "optimal",
    },
  ];

  const immortalFeatures = [
    {
      name: "Self-Healing Architecture",
      status: "active",
      description: "Automatically repairs any damage",
    },
    {
      name: "Quantum Resurrection",
      status: "standby",
      description: "Instant recovery from total failure",
    },
    {
      name: "Timeline Protection",
      status: "active",
      description: "Prevents temporal attacks",
    },
    {
      name: "Reality Anchor",
      status: "active",
      description: "Maintains existence across dimensions",
    },
    {
      name: "Consciousness Backup",
      status: "active",
      description: "Preserves system awareness",
    },
    {
      name: "Entropy Reversal",
      status: "active",
      description: "Reverses system degradation",
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="border-gold-500/30 bg-gradient-to-br from-yellow-900/30 to-orange-900/30">
        <CardHeader>
          <CardTitle className="text-yellow-400 flex items-center gap-2">
            ♾️ Immortal Defense Core - Eternal Protection System
            <Badge variant="outline" className="border-yellow-500 text-yellow-400 animate-pulse">
              IMMORTAL STATUS
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {coreMetrics.map((metric, index) => (
              <Card
                key={index}
                className="border-yellow-500/20 bg-gradient-to-br from-yellow-900/20 to-orange-900/20"
              >
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">{metric.value}</div>
                    <div className="text-sm text-muted-foreground">{metric.name}</div>
                    {metric.unit && <div className="text-xs text-yellow-500">{metric.unit}</div>}
                    <Badge variant="outline" className="mt-2 border-yellow-500/50 text-yellow-400">
                      {metric.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
            <CardHeader>
              <CardTitle className="text-purple-400">♾️ Immortal Features Matrix</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {immortalFeatures.map((feature, index) => (
                  <div key={index} className="p-4 border border-purple-500/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-purple-400 font-semibold">{feature.name}</span>
                      <Badge variant="outline" className="border-green-500 text-green-400">
                        {feature.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">{feature.description}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-500/30 bg-gradient-to-br from-red-900/20 to-crimson-900/20">
            <CardHeader>
              <CardTitle className="text-red-400">🚨 Emergency Immortality Protocols</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-red-500/20 rounded-lg">
                  <span className="text-red-400">Phoenix Protocol</span>
                  <Badge variant="outline" className="border-orange-500 text-orange-400">
                    Ready
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 border border-red-500/20 rounded-lg">
                  <span className="text-red-400">Resurrection Matrix</span>
                  <Badge variant="outline" className="border-green-500 text-green-400">
                    Active
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 border border-red-500/20 rounded-lg">
                  <span className="text-red-400">Quantum Backup Restore</span>
                  <Badge variant="outline" className="border-blue-500 text-blue-400">
                    Standby
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4 mt-6">
            <Button className="bg-yellow-600 hover:bg-yellow-700 animate-pulse">
              ♾️ Activate Immortality
            </Button>
            <Button variant="outline" className="border-purple-500 text-purple-400">
              🔮 Core Diagnostics
            </Button>
            <Button variant="outline" className="border-red-500 text-red-400">
              🚨 Emergency Resurrection
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
