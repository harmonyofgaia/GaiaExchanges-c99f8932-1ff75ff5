import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { adminDomination } from "@/services/adminDomination";
import { Crown, Shield, Key, AlertTriangle, Users, Lock } from "lucide-react";

export function AdminDominationDashboard() {
  const [status, setStatus] = useState({
    isArmed: false,
    activeSessions: 0,
    totalSessions: 0,
    armedProtocols: 0,
    quantumKeys: 0,
    recentOverrides: 0,
  });

  useEffect(() => {
    const updateStatus = () => {
      setStatus(adminDomination.getAdminDominationStatus());
    };

    const interval = setInterval(updateStatus, 2000);
    updateStatus();

    return () => clearInterval(interval);
  }, []);

  const handleInitializeAdminDomination = async () => {
    try {
      await adminDomination.initializeAdminDominationSystem();
      toast.success("👑 Admin Domination System Armed");
    } catch (error) {
      toast.error("Failed to initialize admin domination");
    }
  };

  const handleExecuteRemoteOverride = async () => {
    try {
      await adminDomination.executeRemoteOverride({
        targetSystem: "Global Security Grid",
        commandType: "quantum_lock",
        adminId: "synatic",
      });
    } catch (error) {
      toast.error("Failed to execute remote override");
    }
  };

  const handleTriggerEmergencyProtocol = async () => {
    try {
      await adminDomination.triggerEmergencyProtocol("quantum-attack", "synatic");
    } catch (error) {
      toast.error("Failed to trigger emergency protocol");
    }
  };

  return (
    <Card className="border-gradient">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="h-6 w-6 text-primary" />
          Phase 5: Ultimate Admin Domination Arsenal
          <Badge variant={status.isArmed ? "default" : "secondary"}>
            {status.isArmed ? "ARMED" : "STANDBY"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Active Sessions</span>
            </div>
            <div className="text-2xl font-bold text-primary">{status.activeSessions}</div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Key className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Quantum Keys</span>
            </div>
            <div className="text-2xl font-bold text-primary">{status.quantumKeys}</div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Armed Protocols</span>
            </div>
            <div className="text-2xl font-bold text-primary">{status.armedProtocols}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Total Sessions</span>
            </div>
            <div className="text-xl font-bold">{status.totalSessions}</div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Remote Overrides</span>
            </div>
            <div className="text-xl font-bold">{status.recentOverrides}</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={handleInitializeAdminDomination} size="sm">
            <Crown className="h-4 w-4 mr-2" />
            Initialize Admin Domination
          </Button>

          <Button onClick={handleExecuteRemoteOverride} variant="outline" size="sm">
            <Shield className="h-4 w-4 mr-2" />
            Execute Remote Override
          </Button>

          <Button onClick={handleTriggerEmergencyProtocol} variant="destructive" size="sm">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Trigger Emergency Protocol
          </Button>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Active Admin Capabilities</h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default">Multi-Factor Biometric Auth</Badge>
            <Badge variant="default">Remote System Override</Badge>
            <Badge variant="default">Emergency Lockdown</Badge>
            <Badge variant="default">Quantum Admin Keys</Badge>
            <Badge variant="default">Admin Activity Forensics</Badge>
          </div>
        </div>

        <div className="p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium mb-2">👑 Supreme Administrative Control</h4>
          <p className="text-sm text-muted-foreground">
            Ultimate administrative privileges with quantum-level security, biometric
            authentication, remote system control, and emergency protocols. Complete system
            domination achieved.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
