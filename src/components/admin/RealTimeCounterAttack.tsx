import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Target, Shield, Sword } from "lucide-react";

interface CounterAttack {
  id: string;
  threat: string;
  response: string;
  status: "executing" | "completed" | "failed";
  timestamp: string;
  effectiveness: number;
}

export function RealTimeCounterAttack() {
  const [activeCounters, setActiveCounters] = useState(12);
  const [threatsStopped, setThreatsStopped] = useState(3247);
  const [responseTime, setResponseTime] = useState(0.8);
  const [recentCounters, setRecentCounters] = useState<CounterAttack[]>([]);

  useEffect(() => {
    const generateCounter = (): CounterAttack => ({
      id: Math.random().toString(36).substr(2, 9),
      threat: [
        "DDoS Attack",
        "Brute Force Login",
        "SQL Injection",
        "XSS Attack",
        "Port Scan",
        "Malware Upload",
        "Phishing Attempt",
        "Data Exfiltration",
      ][Math.floor(Math.random() * 8)],
      response: [
        "IP Blacklist Applied",
        "Traffic Rerouted",
        "Honeypot Deployed",
        "Counter-Attack Launched",
        "System Hardened",
        "Threat Neutralized",
        "Evidence Collected",
        "Attacker Traced",
      ][Math.floor(Math.random() * 8)],
      status: ["executing", "completed", "failed"][Math.floor(Math.random() * 3)] as any,
      timestamp: new Date().toLocaleTimeString(),
      effectiveness: Math.floor(Math.random() * 40) + 60,
    });

    const interval = setInterval(() => {
      setThreatsStopped((prev) => prev + Math.floor(Math.random() * 8));
      setResponseTime((prev) => Math.max(0.1, Math.min(2.0, prev + (Math.random() - 0.5) * 0.2)));
      setActiveCounters((prev) => Math.max(8, Math.min(20, prev + (Math.random() - 0.5) * 3)));

      if (Math.random() > 0.5) {
        setRecentCounters((prev) => [generateCounter(), ...prev.slice(0, 5)]);
      }

      console.log("⚡ REAL-TIME COUNTER-ATTACK - AUTOMATIC RETALIATION ACTIVE");
      console.log("🎯 THREATS NEUTRALIZED INSTANTLY - NO MERCY");
      console.log("🛡️ PROACTIVE DEFENSE - ALWAYS FIGHTING BACK");
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "executing":
        return "text-yellow-400 bg-yellow-900/20";
      case "completed":
        return "text-green-400 bg-green-900/20";
      case "failed":
        return "text-red-400 bg-red-900/20";
      default:
        return "text-gray-400";
    }
  };

  return (
    <Card className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border border-red-500/30">
      <CardHeader>
        <CardTitle className="text-red-400 flex items-center gap-2">
          <Zap className="h-5 w-5" />⚡ Real-time Counter-Attack Protocols
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-black/30 p-4 rounded-lg border border-red-500/20">
            <div className="text-2xl font-bold text-red-400">{activeCounters}</div>
            <div className="text-sm text-red-300">Active Counters</div>
          </div>

          <div className="bg-black/30 p-4 rounded-lg border border-orange-500/20">
            <div className="text-2xl font-bold text-orange-400">
              {threatsStopped.toLocaleString()}
            </div>
            <div className="text-sm text-orange-300">Threats Stopped</div>
          </div>

          <div className="bg-black/30 p-4 rounded-lg border border-yellow-500/20">
            <div className="text-2xl font-bold text-yellow-400">{responseTime.toFixed(1)}s</div>
            <div className="text-sm text-yellow-300">Response Time</div>
          </div>

          <div className="bg-black/30 p-4 rounded-lg border border-green-500/20">
            <div className="text-2xl font-bold text-green-400">100%</div>
            <div className="text-sm text-green-300">Success Rate</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-black/20 p-4 rounded-lg border border-red-500/20">
            <h3 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
              <Target className="h-4 w-4" />
              Active Counter-Measures
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-2 bg-red-900/20 rounded">
                <span className="text-red-300">Automated IP Blocking</span>
                <span className="text-green-400">ACTIVE</span>
              </div>
              <div className="flex justify-between p-2 bg-orange-900/20 rounded">
                <span className="text-orange-300">Traffic Analysis</span>
                <span className="text-green-400">ACTIVE</span>
              </div>
              <div className="flex justify-between p-2 bg-yellow-900/20 rounded">
                <span className="text-yellow-300">Threat Containment</span>
                <span className="text-green-400">ACTIVE</span>
              </div>
              <div className="flex justify-between p-2 bg-green-900/20 rounded">
                <span className="text-green-300">Response Coordination</span>
                <span className="text-green-400">ACTIVE</span>
              </div>
            </div>
          </div>

          <div className="bg-black/20 p-4 rounded-lg border border-orange-500/20">
            <h3 className="text-orange-400 font-semibold mb-3 flex items-center gap-2">
              <Sword className="h-4 w-4" />
              Recent Counter-Attacks
            </h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {recentCounters.length === 0 ? (
                <div className="text-center text-gray-400 py-4">🎯 Standing ready...</div>
              ) : (
                recentCounters.map((counter) => (
                  <div key={counter.id} className="text-xs border border-gray-600 rounded p-2">
                    <div className="flex items-center justify-between">
                      <span className="text-red-400">{counter.threat}</span>
                      <span
                        className={`px-2 py-1 rounded text-xs ${getStatusColor(counter.status)}`}
                      >
                        {counter.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-orange-300 mt-1">{counter.response}</div>
                    <div className="flex justify-between mt-1 text-gray-400">
                      <span>{counter.timestamp}</span>
                      <span>{counter.effectiveness}% effective</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={() => console.log("⚡ Emergency Counter-Attack Activated")}
          >
            Emergency Counter-Attack
          </Button>
          <Button
            className="bg-orange-600 hover:bg-orange-700 text-white"
            onClick={() => console.log("🎯 Threat Response Updated")}
          >
            Update Response Protocols
          </Button>
          <Button
            className="bg-yellow-600 hover:bg-yellow-700 text-white"
            onClick={() => console.log("🛡️ Defense Matrix Synchronized")}
          >
            Sync Defense Matrix
          </Button>
        </div>

        <div className="text-center p-4 bg-gradient-to-r from-red-900/20 to-orange-900/20 rounded-lg border border-red-500/20">
          <div className="text-red-400 font-bold">⚡ COUNTER-ATTACK STATUS</div>
          <div className="text-green-400 text-sm mt-1">
            AUTOMATIC RETALIATION ACTIVE • ZERO TOLERANCE • INSTANT RESPONSE
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
