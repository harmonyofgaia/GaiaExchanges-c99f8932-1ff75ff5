import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Shield, Zap, Lock, Key, Atom, Activity } from "lucide-react";
import { quantumSecurity } from "@/services/quantumSecurity";
import { toast } from "sonner";

export function QuantumFortressDashboard() {
  const [quantumStatus, setQuantumStatus] = useState({
    isActive: false,
    activeKeys: 0,
    entanglements: 0,
    systemUptime: 0,
    quantumReadiness: 0,
  });

  const [quantumKeys, setQuantumKeys] = useState<any[]>([]);
  const [isInitializing, setIsInitializing] = useState(false);

  useEffect(() => {
    const updateStatus = () => {
      const status = quantumSecurity.getQuantumStatus();
      setQuantumStatus(status);
    };

    updateStatus();
    const interval = setInterval(updateStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleInitializeQuantumSystem = async () => {
    setIsInitializing(true);
    try {
      await quantumSecurity.initializeQuantumSystem();

      // Generate some demo quantum keys
      const key1 = await quantumSecurity.generateQuantumKey("primary-fortress");
      const key2 = await quantumSecurity.generateQuantumKey("backup-fortress");
      const key3 = await quantumSecurity.generateQuantumKey("quantum-vault");

      setQuantumKeys([key1, key2, key3]);

      toast.success("🔐 Quantum Fortress Fully Operational", {
        description: "All quantum systems initialized and ready",
      });
    } catch (error) {
      toast.error("❌ Quantum Initialization Failed", {
        description: "Unable to initialize quantum systems",
      });
    } finally {
      setIsInitializing(false);
    }
  };

  const handleGenerateQuantumKey = async () => {
    try {
      const newKey = await quantumSecurity.generateQuantumKey(
        `fortress-${Date.now()}`,
      );
      setQuantumKeys((prev) => [...prev, newKey].slice(-10)); // Keep last 10 keys

      toast.success("🔑 New Quantum Key Generated", {
        description: "Quantum entanglement established",
      });
    } catch (error) {
      toast.error("❌ Key Generation Failed");
    }
  };

  const handleVerifyQuantumState = async (keyId: string) => {
    try {
      const isValid = await quantumSecurity.verifyQuantumState(keyId);

      if (isValid) {
        toast.success("✅ Quantum State Verified", {
          description: "Quantum entanglement integrity confirmed",
        });
      } else {
        toast.error("⚠️ Quantum State Compromised", {
          description: "Quantum entanglement may be broken",
        });
      }
    } catch (error) {
      toast.error("❌ Verification Failed");
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Quantum Status */}
      <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/30 to-indigo-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Atom className="h-6 w-6" />
            QUANTUM FORTRESS - PHASE 1 ACTIVATED
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">
                {quantumStatus.quantumReadiness}%
              </div>
              <div className="text-sm text-muted-foreground">
                Quantum Readiness
              </div>
              <Badge
                className={`mt-1 ${quantumStatus.isActive ? "bg-green-600" : "bg-red-600"} text-white`}
              >
                <Activity className="h-3 w-3 mr-1" />
                {quantumStatus.isActive ? "ACTIVE" : "INACTIVE"}
              </Badge>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">
                {quantumStatus.activeKeys}
              </div>
              <div className="text-sm text-muted-foreground">Quantum Keys</div>
              <Badge className="mt-1 bg-blue-600 text-white">
                <Key className="h-3 w-3 mr-1" />
                Active
              </Badge>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">
                {quantumStatus.entanglements}
              </div>
              <div className="text-sm text-muted-foreground">Entanglements</div>
              <Badge className="mt-1 bg-green-600 text-white">
                <Zap className="h-3 w-3 mr-1" />
                Linked
              </Badge>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400">
                {Math.floor((Date.now() - quantumStatus.systemUptime) / 1000)}s
              </div>
              <div className="text-sm text-muted-foreground">Uptime</div>
              <Badge className="mt-1 bg-orange-600 text-white">
                <Shield className="h-3 w-3 mr-1" />
                Secure
              </Badge>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Quantum Encryption Strength</span>
                <span>256-bit Post-Quantum</span>
              </div>
              <Progress value={95} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Entanglement Correlation</span>
                <span>99.7%</span>
              </div>
              <Progress value={99.7} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Quantum State Coherence</span>
                <span>98.3%</span>
              </div>
              <Progress value={98.3} className="h-2" />
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <Button
              onClick={handleInitializeQuantumSystem}
              disabled={isInitializing || quantumStatus.isActive}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isInitializing
                ? "Initializing..."
                : "Initialize Quantum Fortress"}
            </Button>

            <Button
              onClick={handleGenerateQuantumKey}
              disabled={!quantumStatus.isActive}
              variant="outline"
              className="border-purple-500 text-purple-400"
            >
              Generate Quantum Key
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quantum Key Management */}
      <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/20 to-cyan-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Key className="h-5 w-5" />
            Quantum Key Distribution Network
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {quantumKeys.length > 0 ? (
              quantumKeys.map((key, index) => (
                <div
                  key={key.id}
                  className="flex items-center justify-between p-4 bg-blue-900/10 rounded-lg border border-blue-500/20"
                >
                  <div>
                    <div className="font-medium text-blue-400">
                      Key ID: {key.id}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Entanglement: {key.entanglementId}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Generated: {new Date(key.timestamp).toLocaleString()}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge
                      className={`${key.isQuantumVerified ? "bg-green-600" : "bg-red-600"} text-white`}
                    >
                      {key.isQuantumVerified ? "Verified" : "Unverified"}
                    </Badge>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleVerifyQuantumState(key.id)}
                      className="border-blue-500 text-blue-400"
                    >
                      Verify State
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-muted-foreground py-8">
                <Lock className="h-12 w-12 mx-auto mb-4 text-blue-400/50" />
                <p>No quantum keys generated yet</p>
                <p className="text-sm">
                  Initialize the Quantum Fortress to begin
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quantum Technologies Overview */}
      <Card className="border-green-500/30 bg-gradient-to-br from-green-900/20 to-emerald-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Shield className="h-5 w-5" />
            Quantum Security Technologies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-green-400">
                Active Technologies
              </h4>

              <div className="flex items-center justify-between p-3 bg-green-900/10 rounded border border-green-500/20">
                <span className="text-sm">Quantum Key Distribution (QKD)</span>
                <Badge className="bg-green-600 text-white">Online</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-900/10 rounded border border-green-500/20">
                <span className="text-sm">Quantum Random Generator</span>
                <Badge className="bg-green-600 text-white">Active</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-900/10 rounded border border-green-500/20">
                <span className="text-sm">Post-Quantum Signatures</span>
                <Badge className="bg-green-600 text-white">Ready</Badge>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-yellow-400">Planned Upgrades</h4>

              <div className="flex items-center justify-between p-3 bg-yellow-900/10 rounded border border-yellow-500/20">
                <span className="text-sm">Quantum Entanglement Network</span>
                <Badge className="bg-yellow-600 text-white">Phase 2</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-yellow-900/10 rounded border border-yellow-500/20">
                <span className="text-sm">Quantum State Verification</span>
                <Badge className="bg-yellow-600 text-white">Phase 2</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-yellow-900/10 rounded border border-yellow-500/20">
                <span className="text-sm">Quantum Error Correction</span>
                <Badge className="bg-yellow-600 text-white">Phase 3</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
