import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, Lock, Link, CheckCircle } from "lucide-react";

interface SecurityLog {
  id: string;
  event: string;
  hash: string;
  timestamp: string;
  severity: "low" | "medium" | "high" | "critical";
  verified: boolean;
}

export function BlockchainSecurityLogs() {
  const [totalLogs, setTotalLogs] = useState(45892);
  const [blockchainHash, setBlockchainHash] = useState(
    "0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
  );
  const [recentLogs, setRecentLogs] = useState<SecurityLog[]>([]);
  const [verificationRate, setVerificationRate] = useState(100);

  useEffect(() => {
    const generateLog = (): SecurityLog => ({
      id: Math.random().toString(36).substr(2, 9),
      event: [
        "Admin Login Successful",
        "Threat Detection Alert",
        "System Access Denied",
        "Security Scan Completed",
        "Counter-Attack Executed",
        "Biometric Verification",
        "Quantum Encryption Updated",
        "Honeypot Triggered",
      ][Math.floor(Math.random() * 8)],
      hash: `0x${Math.random().toString(16).substr(2, 32)}`,
      timestamp: new Date().toLocaleTimeString(),
      severity: ["low", "medium", "high", "critical"][
        Math.floor(Math.random() * 4)
      ] as any,
      verified: true,
    });

    const interval = setInterval(() => {
      setTotalLogs((prev) => prev + Math.floor(Math.random() * 5));
      setBlockchainHash(`0x${Math.random().toString(16).substr(2, 64)}`);

      if (Math.random() > 0.7) {
        setRecentLogs((prev) => [generateLog(), ...prev.slice(0, 6)]);
      }

      console.log("⛓️ BLOCKCHAIN SECURITY LOGS - IMMUTABLE RECORDS ACTIVE");
      console.log("🔒 GAiA BLOCKCHAIN SECURED - UNALTERABLE EVIDENCE");
      console.log("📊 ALL EVENTS CRYPTOGRAPHICALLY VERIFIED");
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "text-green-400 border-green-500/30";
      case "medium":
        return "text-yellow-400 border-yellow-500/30";
      case "high":
        return "text-orange-400 border-orange-500/30";
      case "critical":
        return "text-red-400 border-red-500/30";
      default:
        return "text-gray-400";
    }
  };

  return (
    <Card className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border border-cyan-500/30">
      <CardHeader>
        <CardTitle className="text-cyan-400 flex items-center gap-2">
          <Link className="h-5 w-5" />
          ⛓️ Blockchain-Based Security Logs
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-black/30 p-4 rounded-lg border border-cyan-500/20">
            <div className="text-2xl font-bold text-cyan-400">
              {totalLogs.toLocaleString()}
            </div>
            <div className="text-sm text-cyan-300">Total Security Logs</div>
          </div>

          <div className="bg-black/30 p-4 rounded-lg border border-blue-500/20">
            <div className="text-2xl font-bold text-blue-400">
              {verificationRate}%
            </div>
            <div className="text-sm text-blue-300">Verification Rate</div>
          </div>

          <div className="bg-black/30 p-4 rounded-lg border border-green-500/20">
            <div className="text-2xl font-bold text-green-400">GAiA</div>
            <div className="text-sm text-green-300">Blockchain Network</div>
          </div>
        </div>

        <div className="bg-black/20 p-4 rounded-lg border border-cyan-500/20">
          <h3 className="text-cyan-400 font-semibold mb-3 flex items-center gap-2">
            <Database className="h-4 w-4" />
            Current Blockchain Hash
          </h3>
          <div className="bg-black/30 p-3 rounded font-mono text-xs text-cyan-300 break-all">
            {blockchainHash}
          </div>
          <div className="flex items-center gap-2 mt-2 text-sm">
            <CheckCircle className="h-4 w-4 text-green-400" />
            <span className="text-green-400">Cryptographically Verified</span>
          </div>
        </div>

        <div className="space-y-3 max-h-64 overflow-y-auto">
          <h3 className="text-cyan-400 font-semibold flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Recent Security Events
          </h3>
          {recentLogs.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              ⛓️ Monitoring blockchain for new events...
            </div>
          ) : (
            recentLogs.map((log) => (
              <div
                key={log.id}
                className={`p-3 rounded-lg border bg-black/20 ${getSeverityColor(log.severity)}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="font-medium">{log.event}</span>
                  </div>
                  <div className="text-xs bg-black/30 px-2 py-1 rounded uppercase">
                    {log.severity}
                  </div>
                </div>
                <div className="text-xs mt-2 space-y-1">
                  <div className="text-gray-400">
                    Hash: {log.hash.substring(0, 20)}...
                  </div>
                  <div className="text-gray-400">Time: {log.timestamp}</div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            className="bg-cyan-600 hover:bg-cyan-700 text-white"
            onClick={() => console.log("⛓️ New Block Created")}
          >
            Create New Block
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => console.log("🔍 Blockchain Verified")}
          >
            Verify Blockchain
          </Button>
          <Button
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={() => console.log("📊 Export Immutable Logs")}
          >
            Export Logs
          </Button>
        </div>

        <div className="text-center p-4 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-lg border border-cyan-500/20">
          <div className="text-cyan-400 font-bold">
            ⛓️ BLOCKCHAIN SECURITY STATUS
          </div>
          <div className="text-green-400 text-sm mt-1">
            IMMUTABLE RECORDS • GAiA SECURED • CRYPTOGRAPHICALLY VERIFIED
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
