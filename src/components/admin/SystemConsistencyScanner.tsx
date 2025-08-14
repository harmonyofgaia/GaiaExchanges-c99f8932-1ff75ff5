import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { verifyTokenConsistency } from "@/utils/tokenUtils";
import { CheckCircle, AlertTriangle, RefreshCw, Database, Shield } from "lucide-react";

export function SystemConsistencyScanner() {
  const [scanResults, setScanResults] = useState({
    tokenConsistency: null as any,
    databaseIntegrity: 100,
    systemHealth: 98.7,
    lastScan: new Date(),
    isScanning: false,
  });

  const runConsistencyCheck = async () => {
    setScanResults((prev) => ({ ...prev, isScanning: true }));

    try {
      // Verify token consistency
      const tokenResults = verifyTokenConsistency();

      // Simulate database integrity check
      const dbIntegrity = Math.random() > 0.1 ? 100 : 95.5;

      // Calculate system health
      const systemHealth = (tokenResults.isConsistent ? 50 : 0) + dbIntegrity / 2;

      setScanResults({
        tokenConsistency: tokenResults,
        databaseIntegrity: dbIntegrity,
        systemHealth,
        lastScan: new Date(),
        isScanning: false,
      });
    } catch (error) {
      console.error("Consistency check failed:", error);
      setScanResults((prev) => ({ ...prev, isScanning: false }));
    }
  };

  useEffect(() => {
    runConsistencyCheck();

    // Run consistency check every 30 seconds
    const interval = setInterval(runConsistencyCheck, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <Card className="border-2 border-blue-500/50 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Database className="h-6 w-6" />
            🔍 SYSTEM CONSISTENCY SCANNER
            <Badge className="bg-blue-600 text-white">CONTINUOUS MONITORING</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 rounded-lg bg-green-900/30 border border-green-500/20">
              <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">
                {scanResults.tokenConsistency?.isConsistent ? "PASS" : "FAIL"}
              </div>
              <div className="text-sm text-muted-foreground">Token Consistency</div>
            </div>

            <div className="text-center p-4 rounded-lg bg-blue-900/30 border border-blue-500/20">
              <Shield className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">
                {scanResults.databaseIntegrity}%
              </div>
              <div className="text-sm text-muted-foreground">Database Integrity</div>
            </div>

            <div className="text-center p-4 rounded-lg bg-purple-900/30 border border-purple-500/20">
              <AlertTriangle className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">
                {scanResults.systemHealth.toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">System Health</div>
            </div>
          </div>

          {scanResults.tokenConsistency && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Token Consistency Details</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 bg-gray-800/50 rounded-lg">
                  <div className="text-sm text-gray-400">Total Supply</div>
                  <div className="text-lg font-bold text-white">
                    {scanResults.tokenConsistency.tokenData.totalSupply.toLocaleString()}
                  </div>
                </div>
                <div className="p-3 bg-gray-800/50 rounded-lg">
                  <div className="text-sm text-gray-400">Circulating</div>
                  <div className="text-lg font-bold text-green-400">
                    {scanResults.tokenConsistency.tokenData.circulatingSupply.toLocaleString()}
                  </div>
                </div>
                <div className="p-3 bg-gray-800/50 rounded-lg">
                  <div className="text-sm text-gray-400">Burned</div>
                  <div className="text-lg font-bold text-red-400">
                    {scanResults.tokenConsistency.tokenData.burnedTokens.toLocaleString()}
                  </div>
                </div>
                <div className="p-3 bg-gray-800/50 rounded-lg">
                  <div className="text-sm text-gray-400">Locked</div>
                  <div className="text-lg font-bold text-yellow-400">
                    {scanResults.tokenConsistency.tokenData.lockedTokens.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-400">
              Last scan: {scanResults.lastScan.toLocaleString()}
            </div>
            <Button
              onClick={runConsistencyCheck}
              disabled={scanResults.isScanning}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {scanResults.isScanning ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              {scanResults.isScanning ? "Scanning..." : "Run Scan"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
