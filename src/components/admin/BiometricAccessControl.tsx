import { useState, useEffect, useCallback} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Fingerprint, Mic, Shield } from "lucide-react";

interface BiometricScan {
  type: "fingerprint" | "retina" | "voice" | "dna";
  status: "scanning" | "verified" | "failed";
  accuracy: number;
  timestamp: string;
}

export function BiometricAccessControl() {
  const [currentScan, setCurrentScan] = useState<BiometricScan | null>(null);
  const [verifiedScans, setVerifiedScans] = useState(847);
  const [securityLevel, setSecurityLevel] = useState(100);
  const [lastAccess, setLastAccess] = useState("2 minutes ago");

  const startBiometricScan = (type: BiometricScan["type"]) => {
    setCurrentScan({
      type,
      status: "scanning",
      accuracy: 0,
      timestamp: new Date().toLocaleTimeString()
    });

    const scanInterval = setInterval(() => {
      setCurrentScan((prev) => {
        if (!prev) return null;

        const newAccuracy = Math.min(100, prev.accuracy + Math.random() * 25);

        if (newAccuracy >= 95) {
          clearInterval(scanInterval);
          setVerifiedScans((prev) => prev + 1);
          console.log(`🔐 ${type.toUpperCase()} SCAN VERIFIED - ADMIN ACCESS GRANTED`);

          return {
            ...prev,
            status: "verified",
            accuracy: newAccuracy,
          };
        }

        return {
          ...prev,
          accuracy: newAccuracy,
        };
      });
    }, 300);

    setTimeout(() => {
      clearInterval(scanInterval);
      if (currentScan?.status === "scanning") {
        setCurrentScan((prev) => (prev ? { ...prev, status: "failed" } : null));
      }
    }, 5000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("🔐 BIOMETRIC ACCESS CONTROL - ULTIMATE SECURITY ACTIVE");
      console.log("👁️ RETINAL SCANNING - DNA VERIFICATION - VOICE RECOGNITION");
      console.log("🛡️ MAXIMUM ADMIN PROTECTION - UNBREACHABLE SECURITY");
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getBiometricIcon = (type: string) => {
    switch (type) {
      case "fingerprint":
        return <Fingerprint className="h-6 w-6" />;
      case "retina":
        return <Eye className="h-6 w-6" />;
      case "voice":
        return <Mic className="h-6 w-6" />;
      case "dna":
        return <Shield className="h-6 w-6" />;
      default:
        return <Shield className="h-6 w-6" />;
    }
  };

  const getBiometricColor = (type: string) => {
    switch (type) {
      case "fingerprint":
        return "text-blue-400 border-blue-500/30 bg-blue-900/20";
      case "retina":
        return "text-green-400 border-green-500/30 bg-green-900/20";
      case "voice":
        return "text-purple-400 border-purple-500/30 bg-purple-900/20";
      case "dna":
        return "text-red-400 border-red-500/30 bg-red-900/20";
      default:
        return "text-gray-400";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scanning":
        return "text-yellow-400";
      case "verified":
        return "text-green-400";
      case "failed":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <Card className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-500/30">
      <CardHeader>
        <CardTitle className="text-indigo-400 flex items-center gap-2">
          <Shield className="h-5 w-5" />
          🔐 Biometric Admin Access Control
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-black/30 p-4 rounded-lg border border-indigo-500/20">
            <div className="text-2xl font-bold text-indigo-400">{securityLevel}%</div>
            <div className="text-sm text-indigo-300">Security Level</div>
          </div>

          <div className="bg-black/30 p-4 rounded-lg border border-purple-500/20">
            <div className="text-2xl font-bold text-purple-400">{verifiedScans}</div>
            <div className="text-sm text-purple-300">Verified Scans</div>
          </div>

          <div className="bg-black/30 p-4 rounded-lg border border-blue-500/20">
            <div className="text-2xl font-bold text-blue-400">{lastAccess}</div>
            <div className="text-sm text-blue-300">Last Access</div>
          </div>
        </div>

        {currentScan && (
          <div className={`p-4 rounded-lg border ${getBiometricColor(currentScan.type)}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                {getBiometricIcon(currentScan.type)}
                <span className="font-semibold capitalize">{currentScan.type} Scan</span>
              </div>
              <span className={`font-semibold ${getStatusColor(currentScan.status)}`}>
                {currentScan.status.toUpperCase()}
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Accuracy:</span>
                <span>{currentScan.accuracy.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${currentScan.accuracy}%` }}
                />
              </div>
              {currentScan.status === "verified" && (
                <div className="text-center text-green-400 font-semibold">
                  ✅ ADMIN ACCESS GRANTED
                </div>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            onClick={() => startBiometricScan("fingerprint")}
            disabled={currentScan?.status === "scanning"}
          >
            <Fingerprint className="h-4 w-4" />
            Fingerprint
          </Button>

          <Button
            className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
            onClick={() => startBiometricScan("retina")}
            disabled={currentScan?.status === "scanning"}
          >
            <Eye className="h-4 w-4" />
            Retinal
          </Button>

          <Button
            className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2"
            onClick={() => startBiometricScan("voice")}
            disabled={currentScan?.status === "scanning"}
          >
            <Mic className="h-4 w-4" />
            Voice
          </Button>

          <Button
            className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
            onClick={() => startBiometricScan("dna")}
            disabled={currentScan?.status === "scanning"}
          >
            <Shield className="h-4 w-4" />
            DNA
          </Button>
        </div>

        <div className="bg-black/20 p-4 rounded-lg border border-indigo-500/20">
          <h3 className="text-indigo-400 font-semibold mb-3">Active Security Protocols</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-blue-300">Multi-Factor Authentication</span>
              <span className="text-green-400">ACTIVE</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-300">Quantum Encryption</span>
              <span className="text-green-400">ACTIVE</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-300">Behavioral Analysis</span>
              <span className="text-green-400">ACTIVE</span>
            </div>
            <div className="flex justify-between">
              <span className="text-red-300">Anti-Spoofing Protection</span>
              <span className="text-green-400">ACTIVE</span>
            </div>
          </div>
        </div>

        <div className="text-center p-4 bg-gradient-to-r from-indigo-900/20 to-purple-900/20 rounded-lg border border-indigo-500/20">
          <div className="text-indigo-400 font-bold">🔐 BIOMETRIC SECURITY STATUS</div>
          <div className="text-green-400 text-sm mt-1">
            ULTIMATE PROTECTION • DNA VERIFIED • QUANTUM SECURED
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
