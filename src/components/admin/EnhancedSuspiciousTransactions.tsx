import { useState, useEffect, useCallback} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Shield,
  Eye,
  MapPin,
  Globe,
  Satellite,
  AlertTriangle,
  Ban,
  CheckCircle,
  Zap,
  Target,
  Lock,
  Wifi,
  Monitor,
  Smartphone,
  Camera,
  Fingerprint,
  Clock,
  DollarSign,
  User,
  FileText,
  Database,
} from "lucide-react";
import { toast } from "sonner";

interface SuspiciousTransaction {
  id: string;
  hash: string;
  amount: number;
  currency: string;
  fromAddress: string;
  toAddress: string;
  timestamp: Date;
  status: "flagged" | "investigating" | "blocked" | "cleared";
  riskScore: number;
  vpnData: {
    provider: string;
    maskedLocation: string;
    realLocation: {
      country: string;
      city: string;
      region: string;
      coordinates: { lat: number; lng: number };
      isp: string;
      timezone: string;
    };
    vpnBypassProgress: number;
    vpnDisrupted: boolean;
  };
  deviceInfo: {
    fingerprint: string;
    userAgent: string;
    screenResolution: string;
    language: string;
    platform: string;
    ipHistory: string[];
    suspicious: boolean;
  };
  behaviorAnalysis: {
    transactionPattern: string;
    frequencyScore: number;
    timePattern: string;
    amountPattern: string;
    networkPattern: string;
  };
  threatLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
}

export function EnhancedSuspiciousTransactions() {
  const [suspiciousTransactions, setSuspiciousTransactions] = useState<SuspiciousTransaction[]>([]);
  const [vpnDisruptorActive, setVpnDisruptorActive] = useState(false);
  const [satelliteTracking, setSatelliteTracking] = useState(false);
  const [globalScanActive, setGlobalScanActive] = useState(false);
  const [realTimeAnalysis, setRealTimeAnalysis] = useState(true);
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null);

  useEffect(() => {
    if (!realTimeAnalysis) return;

    const scanInterval = setInterval(() => {
      console.log("🔍 ADMIN TRANSPARENCY SYSTEM - SCANNING ALL GLOBAL TRANSACTIONS");
      console.log("👻 VPN DISRUPTOR - REVEALING HIDDEN LOCATIONS");
      console.log("🛰️ SATELLITE NETWORK - TRACKING SUSPICIOUS ACTIVITY");
      console.log("📧 ADMIN ALERTS - michelzuidwijk@gmail.com");
      console.log("📱 SMS ALERTS - +31687758236");

      // Simulate detecting suspicious transactions with VPN bypass
      if (Math.random() < 0.3) {
        const newTransaction: SuspiciousTransaction = {
          id: `sus_${Date.now()}`,
          hash: `0x${Math.random().toString(16).substr(2, 40)}`,
          amount: Math.floor(Math.random() * 50000) + 1000,
          currency: ["GAIA", "BTC", "ETH", "USDT"][Math.floor(Math.random() * 4)],
          fromAddress: `0x${Math.random().toString(16).substr(2, 40)}`,
          toAddress: `0x${Math.random().toString(16).substr(2, 40)}`,
          timestamp: new Date(),
          status: "flagged",
          riskScore: Math.floor(Math.random() * 40) + 60,
          vpnData: {
            provider: ["ExpressVPN", "NordVPN", "Surfshark", "ProtonVPN", "Unknown VPN"][
              Math.floor(Math.random() * 5)
            ],
            maskedLocation: ["United States", "Germany", "Singapore", "Netherlands"][
              Math.floor(Math.random() * 4)
            ],
            realLocation: {
              country: ["Russia", "China", "North Korea", "Iran", "Anonymous"][
                Math.floor(Math.random() * 5)
              ],
              city: ["Moscow", "Beijing", "Pyongyang", "Tehran", "Hidden"][
                Math.floor(Math.random() * 5)
              ],
              region: "Detected via Satellite",
              coordinates: {
                lat: (Math.random() - 0.5) * 180,
                lng: (Math.random() - 0.5) * 360,
              },
              isp: "Suspicious Network Provider",
              timezone: "UTC+8",
            },
            vpnBypassProgress: Math.floor(Math.random() * 30) + 70,
            vpnDisrupted: Math.random() > 0.3,
          },
          deviceInfo: {
            fingerprint: `fp_${Math.random().toString(16).substr(2, 16)}`,
            userAgent: "Suspicious Browser/Automated",
            screenResolution: "1920x1080",
            language: "en-US",
            platform: "Linux",
            ipHistory: [
              `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
              `10.0.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
              `172.16.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
            ],
            suspicious: true,
          },
          behaviorAnalysis: {
            transactionPattern: "Rapid Sequential",
            frequencyScore: Math.floor(Math.random() * 50) + 50,
            timePattern: "Off-hours Activity",
            amountPattern: "Round Numbers",
            networkPattern: "VPN Hopping",
          },
          threatLevel: ["MEDIUM", "HIGH", "CRITICAL"][Math.floor(Math.random() * 3)] as
            | "MEDIUM"
            | "HIGH"
            | "CRITICAL",
        };

        setSuspiciousTransactions((prev) => [newTransaction, ...prev.slice(0, 19)]);

        toast.error("🚨 SUSPICIOUS TRANSACTION DETECTED!", {
          description: `${newTransaction.amount} ${newTransaction.currency} - VPN bypassed, real location revealed`,
          duration: 8000,
        });
      }
    }, 8000);

    return () => clearInterval(scanInterval);
  }, [realTimeAnalysis]);

  const activateVPNDisruptor = () => {
    setVpnDisruptorActive(true);
    console.log("👻 VPN DISRUPTOR ACTIVATED - BYPASSING ALL VPN PROTOCOLS");
    toast.success("👻 VPN DISRUPTOR ACTIVE!", {
      description: "Now revealing real locations behind all VPN connections",
      duration: 5000,
    });
  };

  const blockTransaction = (transactionId: string) => {
    setSuspiciousTransactions((prev) =>
      prev.map((tx) => (tx.id === transactionId ? { ...tx, status: "blocked" as const } : tx))
    );

    toast.success("🛡️ TRANSACTION BLOCKED!", {
      description: "Community protection activated - funds secured",
      duration: 5000,
    });
  };

  const getThreatColor = (level: string) => {
    switch (level) {
      case "LOW":
        return "text-yellow-400 bg-yellow-500/20";
      case "MEDIUM":
        return "text-orange-400 bg-orange-500/20";
      case "HIGH":
        return "text-red-400 bg-red-500/20";
      case "CRITICAL":
        return "text-red-400 bg-red-600/40 animate-pulse";
      default:
        return "text-gray-400 bg-gray-500/20";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "flagged":
        return "bg-yellow-600";
      case "investigating":
        return "bg-blue-600";
      case "blocked":
        return "bg-red-600";
      case "cleared":
        return "bg-green-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Admin Control Center */}
      <Card className="bg-gradient-to-r from-red-900/50 to-purple-900/50 border-red-500/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-red-400">
            <Shield className="h-8 w-8 animate-pulse" />
            <div>
              <div className="text-3xl">🔍 ADMIN TRANSPARENCY CENTER</div>
              <div className="text-lg font-normal">
                Complete Transaction Visibility • VPN Bypass • Real Location Tracking • Community
                Protection
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Button
              onClick={activateVPNDisruptor}
              disabled={vpnDisruptorActive}
              className="bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 text-white font-bold py-6"
            >
              <Eye className="h-5 w-5 mr-2" />
              {vpnDisruptorActive ? "👻 VPN DISRUPTOR ACTIVE" : "👻 ACTIVATE VPN DISRUPTOR"}
            </Button>

            <Button
              onClick={() => setSatelliteTracking(!satelliteTracking)}
              className={`font-bold py-6 ${satelliteTracking ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}`}
            >
              <Satellite className="h-5 w-5 mr-2" />
              {satelliteTracking ? "🛰️ SATELLITE ACTIVE" : "🛰️ SATELLITE TRACKING"}
            </Button>

            <Button
              onClick={() => setGlobalScanActive(!globalScanActive)}
              className={`font-bold py-6 ${globalScanActive ? "bg-orange-600 hover:bg-orange-700" : "bg-gray-600 hover:bg-gray-700"}`}
            >
              <Globe className="h-5 w-5 mr-2" />
              {globalScanActive ? "🌍 GLOBAL SCAN ON" : "🌍 GLOBAL SCAN"}
            </Button>

            <div className="text-center p-4 bg-green-900/40 rounded-lg border border-green-500/30">
              <div className="text-2xl font-bold text-green-400">
                {suspiciousTransactions.length}
              </div>
              <div className="text-sm text-muted-foreground">Flagged Transactions</div>
            </div>
          </div>

          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
            <h4 className="font-bold text-yellow-400 mb-2">⚠️ ADMIN-ONLY TRANSPARENCY SYSTEM</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-yellow-300">📧 Real-time alerts: michelzuidwijk@gmail.com</p>
                <p className="text-yellow-300">📱 SMS notifications: +31687758236</p>
                <p className="text-yellow-300">🛡️ Purpose: Community protection only</p>
              </div>
              <div>
                <p className="text-yellow-300">👻 VPN bypass: Reveals real locations</p>
                <p className="text-yellow-300">🛰️ Satellite tracking: Global coverage</p>
                <p className="text-yellow-300">🔒 Admin exclusive: Maximum security</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Transaction Analysis */}
      <Card className="bg-black/30 border-red-500/30">
        <CardHeader>
          <CardTitle className="text-red-400">
            🚨 SUSPICIOUS TRANSACTIONS - COMPLETE TRANSPARENCY
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Transaction Overview</TabsTrigger>
              <TabsTrigger value="vpn-analysis">VPN Analysis</TabsTrigger>
              <TabsTrigger value="device-tracking">Device Tracking</TabsTrigger>
              <TabsTrigger value="behavior-analysis">Behavior Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <ScrollArea className="h-96">
                {suspiciousTransactions.map((transaction) => (
                  <Card
                    key={transaction.id}
                    className={`mb-4 ${
                      transaction.threatLevel === "CRITICAL"
                        ? "bg-red-900/30 border-red-500 animate-pulse"
                        : transaction.threatLevel === "HIGH"
                          ? "bg-orange-900/30 border-orange-500"
                          : "bg-yellow-900/30 border-yellow-500"
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-bold text-sm flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4" />
                            Transaction: {transaction.id}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            Hash: {transaction.hash.slice(0, 20)}...
                          </p>
                        </div>
                        <div className="flex flex-col gap-1">
                          <Badge className={getStatusColor(transaction.status)}>
                            {transaction.status.toUpperCase()}
                          </Badge>
                          <Badge className={getThreatColor(transaction.threatLevel)}>
                            {transaction.threatLevel} THREAT
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="bg-black/20 p-3 rounded">
                          <h5 className="font-bold text-xs text-blue-400 mb-1">
                            💰 TRANSACTION DETAILS
                          </h5>
                          <div className="text-xs space-y-1">
                            <div>
                              Amount:{" "}
                              <span className="text-green-400 font-bold">
                                {transaction.amount} {transaction.currency}
                              </span>
                            </div>
                            <div>
                              From:{" "}
                              <span className="text-red-400 font-mono text-xs">
                                {transaction.fromAddress.slice(0, 10)}...
                              </span>
                            </div>
                            <div>
                              To:{" "}
                              <span className="text-orange-400 font-mono text-xs">
                                {transaction.toAddress.slice(0, 10)}...
                              </span>
                            </div>
                            <div>
                              Time:{" "}
                              <span className="text-muted-foreground">
                                {transaction.timestamp.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-red-900/20 p-3 rounded border border-red-500/30">
                          <h5 className="font-bold text-xs text-red-400 mb-1">
                            👻 VPN BYPASS RESULTS
                          </h5>
                          <div className="text-xs space-y-1">
                            <div>
                              VPN:{" "}
                              <span className="text-yellow-400">
                                {transaction.vpnData.provider}
                              </span>
                            </div>
                            <div>
                              Masked:{" "}
                              <span className="text-gray-400">
                                {transaction.vpnData.maskedLocation}
                              </span>
                            </div>
                            <div>
                              Real Location:{" "}
                              <span className="text-red-400 font-bold">
                                {transaction.vpnData.realLocation.country},{" "}
                                {transaction.vpnData.realLocation.city}
                              </span>
                            </div>
                            <div>
                              ISP:{" "}
                              <span className="text-orange-400">
                                {transaction.vpnData.realLocation.isp}
                              </span>
                            </div>
                            <Progress
                              value={transaction.vpnData.vpnBypassProgress}
                              className="h-1 mt-1"
                            />
                            <div className="text-xs">
                              Bypass: {transaction.vpnData.vpnBypassProgress}%
                            </div>
                          </div>
                        </div>

                        <div className="bg-purple-900/20 p-3 rounded border border-purple-500/30">
                          <h5 className="font-bold text-xs text-purple-400 mb-1">
                            🖥️ DEVICE FINGERPRINT
                          </h5>
                          <div className="text-xs space-y-1">
                            <div>
                              ID:{" "}
                              <span className="text-green-400 font-mono">
                                {transaction.deviceInfo.fingerprint}
                              </span>
                            </div>
                            <div>
                              Platform:{" "}
                              <span className="text-blue-400">
                                {transaction.deviceInfo.platform}
                              </span>
                            </div>
                            <div>
                              Resolution:{" "}
                              <span className="text-cyan-400">
                                {transaction.deviceInfo.screenResolution}
                              </span>
                            </div>
                            <div>
                              Suspicious:{" "}
                              <span
                                className={
                                  transaction.deviceInfo.suspicious
                                    ? "text-red-400"
                                    : "text-green-400"
                                }
                              >
                                {transaction.deviceInfo.suspicious ? "YES" : "NO"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="text-xs text-muted-foreground">
                          Risk Score:{" "}
                          <span className="text-red-400 font-bold">{transaction.riskScore}%</span>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => blockTransaction(transaction.id)}
                            className="bg-red-600 hover:bg-red-700 text-xs"
                            disabled={transaction.status === "blocked"}
                          >
                            <Ban className="h-3 w-3 mr-1" />
                            Block Transaction
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => setSelectedTransaction(transaction.id)}
                            className="bg-blue-600 hover:bg-blue-700 text-xs"
                          >
                            <FileText className="h-3 w-3 mr-1" />
                            Detailed Analysis
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </ScrollArea>
            </TabsContent>

            <TabsContent value="vpn-analysis" className="space-y-4">
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                <h4 className="font-bold text-red-400 mb-4">
                  👻 VPN DISRUPTOR - REAL LOCATION REVEAL
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {suspiciousTransactions.slice(0, 6).map((tx) => (
                    <div key={tx.id} className="bg-black/40 p-3 rounded border border-red-500/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs">{tx.id}</span>
                        <Badge className={tx.vpnData.vpnDisrupted ? "bg-green-600" : "bg-red-600"}>
                          {tx.vpnData.vpnDisrupted ? "VPN BYPASSED" : "BYPASSING..."}
                        </Badge>
                      </div>
                      <div className="text-xs space-y-1">
                        <div className="flex items-center gap-2">
                          <Globe className="h-3 w-3 text-gray-400" />
                          <span className="text-gray-400">Masked: {tx.vpnData.maskedLocation}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3 w-3 text-red-400" />
                          <span className="text-red-400 font-bold">
                            Real: {tx.vpnData.realLocation.country}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Satellite className="h-3 w-3 text-green-400" />
                          <span className="text-green-400">
                            Coords: {tx.vpnData.realLocation.coordinates.lat.toFixed(2)},{" "}
                            {tx.vpnData.realLocation.coordinates.lng.toFixed(2)}
                          </span>
                        </div>
                        <Progress value={tx.vpnData.vpnBypassProgress} className="h-1 mt-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="device-tracking" className="space-y-4">
              <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                <h4 className="font-bold text-purple-400 mb-4">
                  🖥️ DEVICE FINGERPRINTING & TRACKING
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {suspiciousTransactions.slice(0, 4).map((tx) => (
                    <div
                      key={tx.id}
                      className="bg-black/40 p-4 rounded border border-purple-500/20"
                    >
                      <div className="mb-3">
                        <h5 className="font-bold text-sm text-purple-400">{tx.id}</h5>
                        <Badge className={tx.deviceInfo.suspicious ? "bg-red-600" : "bg-green-600"}>
                          {tx.deviceInfo.suspicious ? "SUSPICIOUS DEVICE" : "CLEAN DEVICE"}
                        </Badge>
                      </div>
                      <div className="text-xs space-y-2">
                        <div className="flex items-center gap-2">
                          <Fingerprint className="h-3 w-3 text-green-400" />
                          <span>Fingerprint: {tx.deviceInfo.fingerprint}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Monitor className="h-3 w-3 text-blue-400" />
                          <span>Platform: {tx.deviceInfo.platform}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Camera className="h-3 w-3 text-cyan-400" />
                          <span>Screen: {tx.deviceInfo.screenResolution}</span>
                        </div>
                        <div className="mt-2">
                          <span className="text-yellow-400 font-bold">IP History:</span>
                          {tx.deviceInfo.ipHistory.map((ip, idx) => (
                            <div key={idx} className="text-xs text-muted-foreground ml-4">
                              • {ip}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="behavior-analysis" className="space-y-4">
              <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
                <h4 className="font-bold text-orange-400 mb-4">🧠 BEHAVIORAL PATTERN ANALYSIS</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {suspiciousTransactions.slice(0, 4).map((tx) => (
                    <div
                      key={tx.id}
                      className="bg-black/40 p-4 rounded border border-orange-500/20"
                    >
                      <div className="mb-3">
                        <h5 className="font-bold text-sm text-orange-400">{tx.id}</h5>
                        <div className="text-xs text-muted-foreground">
                          Frequency Score: {tx.behaviorAnalysis.frequencyScore}%
                        </div>
                      </div>
                      <div className="text-xs space-y-2">
                        <div>
                          <span className="text-blue-400">Pattern:</span>{" "}
                          {tx.behaviorAnalysis.transactionPattern}
                        </div>
                        <div>
                          <span className="text-green-400">Time:</span>{" "}
                          {tx.behaviorAnalysis.timePattern}
                        </div>
                        <div>
                          <span className="text-yellow-400">Amount:</span>{" "}
                          {tx.behaviorAnalysis.amountPattern}
                        </div>
                        <div>
                          <span className="text-red-400">Network:</span>{" "}
                          {tx.behaviorAnalysis.networkPattern}
                        </div>
                        <Progress value={tx.behaviorAnalysis.frequencyScore} className="h-1 mt-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
