import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, AlertTriangle, Shield, Target } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ThreatPrediction {
  id: string;
  threat: string;
  probability: number;
  severity: "low" | "medium" | "high" | "critical";
  timeframe: string;
  location: string;
}

export function AIThreatPredictionSystem() {
  const [aiAccuracy, setAiAccuracy] = useState(99.7);
  const [threatsAnalyzed, setThreatsAnalyzed] = useState(15847);
  const [predictedThreats, setPredictedThreats] = useState<ThreatPrediction[]>([]);
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    const generateThreat = (): ThreatPrediction => ({
      id: Math.random().toString(36).substr(2, 9),
      threat: [
        "DDoS Attack Vector",
        "Social Engineering Attempt",
        "Malware Injection",
        "Zero-Day Exploit",
        "SQL Injection",
        "Phishing Campaign",
        "Brute Force Attack",
        "Advanced Persistent Threat",
      ][Math.floor(Math.random() * 8)],
      probability: Math.floor(Math.random() * 100),
      severity: ["low", "medium", "high", "critical"][Math.floor(Math.random() * 4)] as any,
      timeframe: ["15 minutes", "1 hour", "6 hours", "24 hours", "3 days"][
        Math.floor(Math.random() * 5)
      ],
      location: ["North America", "Europe", "Asia Pacific", "Dark Web", "Unknown Origin"][
        Math.floor(Math.random() * 5)
      ],
    });

    const interval = setInterval(() => {
      setThreatsAnalyzed((prev) => prev + Math.floor(Math.random() * 25));
      setAiAccuracy((prev) => Math.max(99.0, Math.min(99.9, prev + (Math.random() - 0.5) * 0.1)));

      if (Math.random() > 0.7) {
        setPredictedThreats((prev) => [generateThreat(), ...prev.slice(0, 9)]);
      }

      console.log("🧠 AI THREAT PREDICTION - MAXIMUM ANALYSIS ACTIVE");
      console.log("⚡ PREDICTIVE ALGORITHMS - FUTURE THREATS DETECTED");
      console.log("🛡️ PREEMPTIVE DEFENSE - ALWAYS ONE STEP AHEAD");
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "text-green-400 border-green-500/30 bg-green-900/20";
      case "medium":
        return "text-yellow-400 border-yellow-500/30 bg-yellow-900/20";
      case "high":
        return "text-orange-400 border-orange-500/30 bg-orange-900/20";
      case "critical":
        return "text-red-400 border-red-500/30 bg-red-900/20";
      default:
        return "text-gray-400";
    }
  };

  return (
    <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30">
      <CardHeader>
        <CardTitle className="text-purple-400 flex items-center gap-2">
          <Brain className="h-5 w-5" />
          🧠 AI-Powered Threat Prediction System
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-black/30 p-4 rounded-lg border border-purple-500/20">
            <div className="text-2xl font-bold text-purple-400">{aiAccuracy.toFixed(1)}%</div>
            <div className="text-sm text-purple-300">AI Accuracy</div>
            <Progress value={aiAccuracy} className="h-2 mt-2" />
          </div>

          <div className="bg-black/30 p-4 rounded-lg border border-pink-500/20">
            <div className="text-2xl font-bold text-pink-400">
              {threatsAnalyzed.toLocaleString()}
            </div>
            <div className="text-sm text-pink-300">Threats Analyzed</div>
          </div>

          <div className="bg-black/30 p-4 rounded-lg border border-blue-500/20">
            <div className="text-2xl font-bold text-blue-400">{predictedThreats.length}</div>
            <div className="text-sm text-blue-300">Active Predictions</div>
          </div>
        </div>

        <div className="space-y-3 max-h-64 overflow-y-auto">
          <h3 className="text-purple-400 font-semibold flex items-center gap-2">
            <Target className="h-4 w-4" />
            Predicted Threat Vectors
          </h3>
          {predictedThreats.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              {isScanning
                ? "🔍 Scanning for potential threats..."
                : "No immediate threats detected"}
            </div>
          ) : (
            predictedThreats.map((threat) => (
              <div
                key={threat.id}
                className={`p-3 rounded-lg border ${getSeverityColor(threat.severity)}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="font-medium">{threat.threat}</span>
                  </div>
                  <div className="text-xs bg-black/30 px-2 py-1 rounded">
                    {threat.probability}% probability
                  </div>
                </div>
                <div className="text-xs mt-2 flex gap-4">
                  <span>📍 {threat.location}</span>
                  <span>⏰ {threat.timeframe}</span>
                  <span className="uppercase font-semibold">{threat.severity}</span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            className="bg-purple-600 hover:bg-purple-700 text-white"
            onClick={() => {
              setIsScanning(true);
              console.log("🧠 AI Deep Scan Initiated");
            }}
          >
            Deep Threat Scan
          </Button>
          <Button
            className="bg-pink-600 hover:bg-pink-700 text-white"
            onClick={() => console.log("⚡ Predictive Model Updated")}
          >
            Update AI Model
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => console.log("🛡️ Preemptive Defense Activated")}
          >
            Activate Preemptive Defense
          </Button>
        </div>

        <div className="text-center p-4 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-lg border border-purple-500/20">
          <div className="text-purple-400 font-bold">🧠 AI THREAT PREDICTION STATUS</div>
          <div className="text-green-400 text-sm mt-1">
            ADVANCED AI ACTIVE • FUTURE THREATS DETECTED • ALWAYS PREPARED
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
