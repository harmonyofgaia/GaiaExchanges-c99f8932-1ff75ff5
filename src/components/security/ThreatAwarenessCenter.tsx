import { useState, useEffect, useCallback} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Eye, Shield, Target, Users, Globe } from "lucide-react";

interface ThreatType {
  name: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  blockedToday: number;
  detectionRate: number;
}

export function ThreatAwarenessCenter() {
  const [threatTypes] = useState<ThreatType[]>([
    {
      name: "Cryptocurrency Scammers",
      description: "Fraudsters attempting fake giveaways, impersonation, and Ponzi schemes",
      severity: "critical",
      blockedToday: 47,
      detectionRate: 99.2,
    },
    {
      name: "Malware Distributors",
      description: "Attackers spreading trojans, keyloggers, ransomware, and crypto-jackers",
      severity: "critical",
      blockedToday: 23,
      detectionRate: 98.7,
    },
    {
      name: "Phishing Campaigns",
      description: "Fake websites and emails designed to steal wallet credentials and private keys",
      severity: "high",
      blockedToday: 67,
      detectionRate: 97.3,
    },
    {
      name: "Data Thieves",
      description:
        "Attackers attempting to steal personal information, seed phrases, and financial data",
      severity: "high",
      blockedToday: 34,
      detectionRate: 96.8,
    },
    {
      name: "DDoS Attackers",
      description: "Coordinated attacks to overwhelm our servers and disrupt service",
      severity: "medium",
      blockedToday: 12,
      detectionRate: 95.4,
    },
    {
      name: "Social Engineers",
      description: "Manipulative attackers using psychological tricks to gain unauthorized access",
      severity: "medium",
      blockedToday: 19,
      detectionRate: 94.1,
    },
  ]);

  const [communityStats] = useState({
    totalUsersProtected: 15847,
    assetsSecured: "$2.4M",
    communitiesDefended: 23,
    globalReach: 67,
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-red-500 border-red-500/50 bg-red-900/20";
      case "high":
        return "text-orange-500 border-orange-500/50 bg-orange-900/20";
      case "medium":
        return "text-yellow-500 border-yellow-500/50 bg-yellow-900/20";
      case "low":
        return "text-green-500 border-green-500/50 bg-green-900/20";
      default:
        return "text-gray-500 border-gray-500/50 bg-gray-900/20";
    }
  };

  const getSeverityBadgeColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-600";
      case "high":
        return "bg-orange-600";
      case "medium":
        return "bg-yellow-600";
      case "low":
        return "bg-green-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Threat Awareness Header */}
      <Card className="border-2 border-yellow-500/50 bg-gradient-to-br from-yellow-900/40 to-orange-900/40 shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-yellow-300">
            <AlertTriangle className="h-8 w-8 animate-pulse" />
            <div>
              <div className="text-2xl">THREAT AWARENESS CENTER</div>
              <div className="text-sm font-normal text-yellow-400">
                Stay informed about cyber threats targeting our community
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-300">
                {communityStats.totalUsersProtected.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Users Protected</div>
              <Badge className="mt-2 bg-green-600 text-white">
                <Users className="h-3 w-3 mr-1" />
                SECURED
              </Badge>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-blue-300">{communityStats.assetsSecured}</div>
              <div className="text-sm text-muted-foreground">Assets Secured</div>
              <Badge className="mt-2 bg-blue-600 text-white">
                <Shield className="h-3 w-3 mr-1" />
                PROTECTED
              </Badge>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-purple-300">
                {communityStats.communitiesDefended}
              </div>
              <div className="text-sm text-muted-foreground">Communities Defended</div>
              <Badge className="mt-2 bg-purple-600 text-white">
                <Target className="h-3 w-3 mr-1" />
                ACTIVE
              </Badge>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-300">{communityStats.globalReach}</div>
              <div className="text-sm text-muted-foreground">Countries Reached</div>
              <Badge className="mt-2 bg-cyan-600 text-white">
                <Globe className="h-3 w-3 mr-1" />
                GLOBAL
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Threat Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {threatTypes.map((threat, index) => (
          <Card key={index} className={`border ${getSeverityColor(threat.severity)}`}>
            <CardHeader className="pb-3">
              <CardTitle
                className={`text-lg ${threat.severity === "critical" ? "text-red-400" : threat.severity === "high" ? "text-orange-400" : threat.severity === "medium" ? "text-yellow-400" : "text-green-400"}`}
              >
                {threat.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{threat.description}</p>

              <div className="flex items-center justify-between">
                <Badge className={`text-white ${getSeverityBadgeColor(threat.severity)}`}>
                  {threat.severity.toUpperCase()}
                </Badge>
                <div className="text-sm">
                  <span className="text-red-400 font-semibold">{threat.blockedToday}</span>
                  <span className="text-muted-foreground"> blocked today</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Detection Rate:</span>
                  <span className="text-green-400 font-semibold">{threat.detectionRate}%</span>
                </div>
                <Progress value={threat.detectionRate} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Community Protection Message */}
      <Card className="border-2 border-green-500/50 bg-gradient-to-r from-green-900/30 to-emerald-900/30">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <Shield className="h-16 w-16 mx-auto text-green-400" />
            <h3 className="text-2xl font-bold text-green-300">
              🛡️ CULTURE OF HARMONY - COMMUNITY PROTECTION
            </h3>
            <div className="max-w-4xl mx-auto space-y-3 text-green-200">
              <p className="text-lg">
                We are committed to creating a transparent, undestructible way of life for our
                community. Our advanced security systems work tirelessly to protect every member
                from cyber threats.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-500/30">
                  <h4 className="font-bold text-blue-300 mb-3">🔍 What We Monitor:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Fraudulent cryptocurrency schemes and scams</li>
                    <li>• Malicious software and virus distribution</li>
                    <li>• Phishing websites and fake login pages</li>
                    <li>• Unauthorized data collection attempts</li>
                    <li>• Social engineering and manipulation tactics</li>
                    <li>• Network attacks and service disruptions</li>
                  </ul>
                </div>
                <div className="p-4 bg-purple-900/30 rounded-lg border border-purple-500/30">
                  <h4 className="font-bold text-purple-300 mb-3">🛡️ How We Protect You:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Real-time threat detection and blocking</li>
                    <li>• AI-powered behavioral analysis</li>
                    <li>• Automated counter-attack systems</li>
                    <li>• Network-wide IP blocking and banning</li>
                    <li>• Continuous security monitoring</li>
                    <li>• Community education and awareness</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 p-4 bg-gradient-to-r from-yellow-900/30 to-red-900/30 rounded-lg border border-yellow-500/30">
                <h4 className="font-bold text-yellow-300 mb-2 text-center">
                  ⚠️ REMEMBER: "THE STRONGER THEY ATTACK, THE HARDER WE ATTACK BACK" ⚠️
                </h4>
                <p className="text-sm text-center">
                  Every threat against our community is met with immediate and decisive action. We
                  don't just defend - we actively fight back to protect what we've built together.
                </p>
              </div>
              <p className="text-sm text-green-400 font-semibold mt-4">
                Together, we build a safer, more transparent future for decentralized finance 🌟
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Tips */}
      <Card className="border-cyan-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-cyan-400">
            <Eye className="h-6 w-6" />
            Security Awareness Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-3">
              <h4 className="font-semibold text-red-400">🚨 Red Flags to Watch For:</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span>Unsolicited messages offering guaranteed returns</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span>Requests for private keys or seed phrases</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span>Urgent demands for immediate action</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span>Suspicious website URLs or typos</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-green-400">✅ Best Security Practices:</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Shield className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Always verify official communication channels</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Use hardware wallets for large holdings</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Enable 2FA on all your accounts</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Report suspicious activity immediately</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
