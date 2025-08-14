import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Skull, Eye, Trash2 } from "lucide-react";

interface HoneypotLog {
  timestamp: string;
  userAgent: string;
  language: string;
  platform: string;
  referrer: string;
  ip: string;
}

interface HoneypotAttempt {
  timestamp: string;
  attempt: number;
  username: string;
  password: string;
  ip: string;
}

export function HoneypotMonitor() {
  const [logs, setLogs] = useState<HoneypotLog[]>([]);
  const [attempts, setAttempts] = useState<HoneypotAttempt[]>([]);

  useEffect(() => {
    const loadHoneypotData = () => {
      const storedLogs = JSON.parse(localStorage.getItem("honeypot-logs") || "[]");
      const storedAttempts = JSON.parse(localStorage.getItem("honeypot-attempts") || "[]");
      setLogs(storedLogs);
      setAttempts(storedAttempts);
    };

    loadHoneypotData();

    // Check for new data every 5 seconds
    const interval = setInterval(loadHoneypotData, 5000);
    return () => clearInterval(interval);
  }, []);

  const clearLogs = () => {
    localStorage.removeItem("honeypot-logs");
    localStorage.removeItem("honeypot-attempts");
    setLogs([]);
    setAttempts([]);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="space-y-6">
      <Card className="border-red-500/30 bg-gradient-to-br from-red-900/20 to-black/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <Skull className="h-5 w-5" />
            🍯 Honeypot Activity Monitor
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{logs.length}</div>
              <div className="text-sm text-red-300">Honeypot Visits</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">{attempts.length}</div>
              <div className="text-sm text-orange-300">Login Attempts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {new Set(attempts.map((a) => a.ip)).size}
              </div>
              <div className="text-sm text-yellow-300">Unique IPs</div>
            </div>
          </div>

          <Button onClick={clearLogs} variant="outline" className="w-full">
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All Logs
          </Button>
        </CardContent>
      </Card>

      {/* Recent Honeypot Visits */}
      {logs.length > 0 && (
        <Card className="border-yellow-500/30 bg-gradient-to-br from-yellow-900/20 to-black/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-400">
              <Eye className="h-5 w-5" />
              Recent Honeypot Visits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {logs
                .slice(-10)
                .reverse()
                .map((log, index) => (
                  <div
                    key={index}
                    className="p-3 bg-black/30 rounded-lg border border-yellow-500/20"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="border-yellow-500/30 text-yellow-400">
                        {log.ip}
                      </Badge>
                      <span className="text-xs text-gray-400">{formatTime(log.timestamp)}</span>
                    </div>
                    <div className="text-xs text-gray-300 space-y-1">
                      <div>Platform: {log.platform}</div>
                      <div>Language: {log.language}</div>
                      <div>Referrer: {log.referrer}</div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Failed Login Attempts */}
      {attempts.length > 0 && (
        <Card className="border-red-500/30 bg-gradient-to-br from-red-900/20 to-black/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-400">
              <AlertTriangle className="h-5 w-5" />
              Failed Login Attempts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {attempts
                .slice(-10)
                .reverse()
                .map((attempt, index) => (
                  <div key={index} className="p-3 bg-black/30 rounded-lg border border-red-500/20">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="border-red-500/30 text-red-400">
                        Attempt #{attempt.attempt}
                      </Badge>
                      <span className="text-xs text-gray-400">{formatTime(attempt.timestamp)}</span>
                    </div>
                    <div className="text-xs text-gray-300 space-y-1">
                      <div>IP: {attempt.ip}</div>
                      <div>
                        Username: <span className="text-red-400">{attempt.username || "N/A"}</span>
                      </div>
                      <div>
                        Password:{" "}
                        <span className="text-red-400">
                          {attempt.password ? "•".repeat(attempt.password.length) : "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
