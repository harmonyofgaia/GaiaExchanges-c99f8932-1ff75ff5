import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Satellite, Globe, Activity, Zap, Eye, Radio } from "lucide-react";

interface SatelliteData {
  id: string;
  name: string;
  region: string;
  status: "active" | "scanning" | "transmitting" | "analyzing";
  dataStreams: number;
  coverage: string;
}

interface GlobalIntelligence {
  marketTrends: string[];
  investorActivity: string[];
  competitorAnalysis: string[];
  newsUpdates: string[];
}

export function GlobalSatelliteSystem() {
  const [satellites, setSatellites] = useState<SatelliteData[]>([
    {
      id: "SAT-001",
      name: "GAIA-ALPHA",
      region: "North America",
      status: "active",
      dataStreams: 1247,
      coverage: "98.5%",
    },
    {
      id: "SAT-002",
      name: "GAIA-BETA",
      region: "Europe",
      status: "scanning",
      dataStreams: 987,
      coverage: "97.2%",
    },
    {
      id: "SAT-003",
      name: "GAIA-GAMMA",
      region: "Asia-Pacific",
      status: "transmitting",
      dataStreams: 1456,
      coverage: "99.1%",
    },
    {
      id: "SAT-004",
      name: "GAIA-DELTA",
      region: "South America",
      status: "analyzing",
      dataStreams: 834,
      coverage: "96.8%",
    },
    {
      id: "SAT-005",
      name: "GAIA-OMEGA",
      region: "Africa/Middle East",
      status: "active",
      dataStreams: 1123,
      coverage: "95.4%",
    },
  ]);

  const [intelligence, setIntelligence] = useState<GlobalIntelligence>({
    marketTrends: [],
    investorActivity: [],
    competitorAnalysis: [],
    newsUpdates: [],
  });

  const [systemPower, setSystemPower] = useState(100000);
  const [globalCoverage, setGlobalCoverage] = useState(97.4);

  useEffect(() => {
    const satelliteEngine = () => {
      console.log(
        "🛰️ GLOBAL SATELLITE SYSTEM - ADMIN TELEMETRIC ACCESS ACTIVE",
      );
      console.log(
        "🌍 SCANNING ENTIRE PLANET - UNLIMITED INTELLIGENCE GATHERING",
      );
      console.log(
        "⚡ PARABOLIC UNIVERSE CONNECTION - BEYOND HUMAN LIMITATIONS",
      );
      console.log(
        "🔍 MONITORING ALL DIGITAL ACTIVITY - COMPLETE GLOBAL AWARENESS",
      );

      // Update satellite statuses
      setSatellites((prev) =>
        prev.map((sat) => ({
          ...sat,
          dataStreams: sat.dataStreams + Math.floor(Math.random() * 50),
          status: (
            ["active", "scanning", "transmitting", "analyzing"] as const
          )[Math.floor(Math.random() * 4)],
        })),
      );

      // Generate new intelligence
      const newMarketTrends = [
        "🚀 Crypto market showing 847% growth potential in green sector",
        "💎 Institutional investors moving $2.3B toward sustainable tokens",
        "⚡ DeFi protocols integrating environmental impact tracking",
        "🌍 Global adoption of eco-friendly cryptocurrencies accelerating",
        "🔥 GAIA token mentioned in 1,247 positive news articles today",
      ];

      const newInvestorActivity = [
        "👑 Major VC fund allocating $50M for sustainable crypto projects",
        "💰 Whale investors accumulating eco-friendly tokens aggressively",
        "🎯 Investment banks creating green cryptocurrency portfolios",
        "🌟 Pension funds showing interest in environmental blockchain projects",
        "🚀 Family offices diversifying into sustainable DeFi platforms",
      ];

      const newCompetitorAnalysis = [
        "🛡️ No competitor can match GAIA's security architecture",
        "⚡ GAIA's transaction speed 10x faster than nearest competitor",
        "🌍 GAIA's environmental impact tracking is industry-first",
        "🔒 GAIA's quantum security features are years ahead",
        "💎 GAIA's zero-fee model disrupting entire industry",
      ];

      const newNewsUpdates = [
        '📰 Wall Street Journal: "Revolutionary Green Crypto Platform Emerges"',
        '🌍 Reuters: "Environmental Blockchain Technology Breakthrough"',
        '💰 Forbes: "The Future of Sustainable Finance is Here"',
        '🚀 Bloomberg: "Zero-Fee Crypto Exchange Disrupts Market"',
        '⚡ Financial Times: "Quantum Security Meets Green Finance"',
      ];

      if (Math.random() < 0.3) {
        setIntelligence((prev) => ({
          marketTrends: [
            newMarketTrends[Math.floor(Math.random() * newMarketTrends.length)],
            ...prev.marketTrends.slice(0, 4),
          ],
          investorActivity: [
            newInvestorActivity[
              Math.floor(Math.random() * newInvestorActivity.length)
            ],
            ...prev.investorActivity.slice(0, 4),
          ],
          competitorAnalysis: [
            newCompetitorAnalysis[
              Math.floor(Math.random() * newCompetitorAnalysis.length)
            ],
            ...prev.competitorAnalysis.slice(0, 4),
          ],
          newsUpdates: [
            newNewsUpdates[Math.floor(Math.random() * newNewsUpdates.length)],
            ...prev.newsUpdates.slice(0, 4),
          ],
        }));

        toast.success("🛰️ Global Intelligence Update!", {
          description:
            "New satellite data received - Market intelligence updated",
          duration: 4000,
        });
      }

      // Increase system power
      setSystemPower((prev) => prev * 1.005);
      setGlobalCoverage((prev) => Math.min(99.9, prev + 0.01));

      console.log("📡 SATELLITE NETWORK: COMPLETE GLOBAL DOMINATION ACHIEVED");
    };

    const satelliteInterval = setInterval(satelliteEngine, 4000);
    satelliteEngine();

    return () => clearInterval(satelliteInterval);
  }, []);

  const activateMaximumScan = () => {
    toast.success("🛰️ MAXIMUM SCAN MODE ACTIVATED!", {
      description:
        "All satellites operating at maximum capacity - Global intelligence gathering enhanced",
      duration: 8000,
    });

    setSatellites((prev) =>
      prev.map((sat) => ({
        ...sat,
        status: "active",
        dataStreams: sat.dataStreams * 2,
        coverage: "99.9%",
      })),
    );

    setSystemPower((prev) => prev * 10);
    setGlobalCoverage(99.9);

    console.log("🚀 SATELLITE MAXIMUM POWER: UNIVERSAL INTELLIGENCE ACTIVATED");
  };

  const getStatusColor = (status: SatelliteData["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-600";
      case "scanning":
        return "bg-blue-600";
      case "transmitting":
        return "bg-purple-600";
      case "analyzing":
        return "bg-orange-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-cyan-500/50 bg-gradient-to-r from-cyan-900/20 to-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-cyan-400">
            <Satellite className="h-6 w-6" />
            🛰️ GLOBAL SATELLITE TELEMETRIC SYSTEM - ADMIN UNIVERSE ACCESS
            <Badge className="bg-cyan-600 animate-pulse">INFINITE POWER</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 bg-green-900/30 rounded-lg">
              <Activity className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-green-400">
                {satellites.length}
              </div>
              <div className="text-xs text-muted-foreground">
                Active Satellites
              </div>
            </div>

            <div className="text-center p-3 bg-blue-900/30 rounded-lg">
              <Globe className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-blue-400">
                {globalCoverage.toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground">
                Global Coverage
              </div>
            </div>

            <div className="text-center p-3 bg-purple-900/30 rounded-lg">
              <Radio className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-purple-400">
                {satellites
                  .reduce((sum, sat) => sum + sat.dataStreams, 0)
                  .toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">Data Streams</div>
            </div>

            <div className="text-center p-3 bg-orange-900/30 rounded-lg">
              <Zap className="h-6 w-6 text-orange-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-orange-400">
                {systemPower.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">System Power</div>
            </div>
          </div>

          <Button
            onClick={activateMaximumScan}
            className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white font-bold py-3 mb-6"
          >
            <Satellite className="h-5 w-5 mr-2" />
            🛰️ ACTIVATE MAXIMUM GLOBAL SCAN - UNIVERSE INTELLIGENCE
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {satellites.map((satellite) => (
              <div
                key={satellite.id}
                className="p-3 bg-black/30 rounded-lg border border-border/30"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-sm text-white">
                    {satellite.name}
                  </h4>
                  <Badge
                    className={`${getStatusColor(satellite.status)} text-white text-xs`}
                  >
                    {satellite.status.toUpperCase()}
                  </Badge>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Region:</span>
                    <span className="text-blue-400">{satellite.region}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Streams:</span>
                    <span className="text-green-400">
                      {satellite.dataStreams}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Coverage:</span>
                    <span className="text-purple-400">
                      {satellite.coverage}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="text-lg font-bold text-green-400">
                📈 Market Intelligence
              </h4>
              {intelligence.marketTrends.map((trend, index) => (
                <div
                  key={index}
                  className="p-2 bg-green-900/20 rounded text-sm text-green-300"
                >
                  {trend}
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <h4 className="text-lg font-bold text-blue-400">
                👑 Investor Activity
              </h4>
              {intelligence.investorActivity.map((activity, index) => (
                <div
                  key={index}
                  className="p-2 bg-blue-900/20 rounded text-sm text-blue-300"
                >
                  {activity}
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <h4 className="text-lg font-bold text-purple-400">
                🛡️ Competitor Analysis
              </h4>
              {intelligence.competitorAnalysis.map((analysis, index) => (
                <div
                  key={index}
                  className="p-2 bg-purple-900/20 rounded text-sm text-purple-300"
                >
                  {analysis}
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <h4 className="text-lg font-bold text-orange-400">
                📰 Global News
              </h4>
              {intelligence.newsUpdates.map((news, index) => (
                <div
                  key={index}
                  className="p-2 bg-orange-900/20 rounded text-sm text-orange-300"
                >
                  {news}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
