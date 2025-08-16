import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface IPAddress {
  ip: string;
  location: string;
  status: "approved" | "pending" | "blocked";
  firstSeen: string;
  lastActivity: string;
  userCount: number;
  riskLevel: "low" | "medium" | "high";
}

export function IPControlCenter() {
  const [ipAddresses] = useState<IPAddress[]>([
    {
      ip: "192.168.1.101",
      location: "United States, New York",
      status: "approved",
      firstSeen: "2024-01-15",
      lastActivity: "2 min ago",
      userCount: 1,
      riskLevel: "low",
    },
    {
      ip: "192.168.1.102", 
      location: "United States, California",
      status: "approved",
      firstSeen: "2024-01-10",
      lastActivity: "5 min ago",
      userCount: 1,
      riskLevel: "low",
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-600";
      case "pending":
        return "bg-yellow-600";
      case "blocked":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "text-green-400";
      case "medium":
        return "text-yellow-400";
      case "high":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-blue-400">
        IP Address Control Center ({ipAddresses.length})
      </h3>

      {ipAddresses.map((ip) => (
        <Card key={ip.ip} className="bg-black/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <div className="font-semibold font-mono">{ip.ip}</div>
                  <div className="text-sm text-muted-foreground">
                    {ip.location}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    First seen: {ip.firstSeen} • Last activity:{" "}
                    {ip.lastActivity}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Users: {ip.userCount} • Risk Level:{" "}
                    <span className={getRiskColor(ip.riskLevel)}>
                      {ip.riskLevel.toUpperCase()}
                    </span>
                  </div>
                </div>
                <Badge className={`${getStatusColor(ip.status)} text-white`}>
                  {ip.status.toUpperCase()}
                </Badge>
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  ✅ Approve
                </Button>
                <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                  ⏳ Pending
                </Button>
                <Button size="sm" variant="destructive">
                  🚫 Block
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
