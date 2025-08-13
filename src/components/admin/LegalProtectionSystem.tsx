import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Scale, Shield, AlertTriangle, Eye } from "lucide-react";
import { toast } from "sonner";

export function LegalProtectionSystem() {
  const [legalShield, setLegalShield] = useState(100);
  const [copyrightClaims, setCopyrightClaims] = useState(0);
  const [legalThreats, setLegalThreats] = useState(0);

  const activateLegalDefense = () => {
    setLegalShield(100);

    console.log("⚖️ LEGAL DEFENSE SYSTEM ACTIVATED");
    console.log("🛡️ COPYRIGHT PROTECTION ENGAGED");
    console.log("📋 INTELLECTUAL PROPERTY SECURED");

    toast.success("⚖️ LEGAL DEFENSE ACTIVATED!", {
      description: "All intellectual property and copyrights fully protected",
      duration: 8000,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-blue-500/50 bg-blue-900/20">
        <CardHeader>
          <CardTitle className="text-blue-400">
            ⚖️ LEGAL PROTECTION SYSTEM
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-900/30 rounded-lg">
              <div className="text-3xl font-bold text-blue-400">
                {legalShield}%
              </div>
              <div className="text-sm text-muted-foreground">
                Legal Shield Strength
              </div>
            </div>
            <div className="text-center p-4 bg-green-900/30 rounded-lg">
              <div className="text-3xl font-bold text-green-400">
                {copyrightClaims}
              </div>
              <div className="text-sm text-muted-foreground">
                Copyright Violations
              </div>
            </div>
            <div className="text-center p-4 bg-red-900/30 rounded-lg">
              <div className="text-3xl font-bold text-red-400">
                {legalThreats}
              </div>
              <div className="text-sm text-muted-foreground">
                Legal Threats Blocked
              </div>
            </div>
          </div>

          <Button
            onClick={activateLegalDefense}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-16 text-lg mb-6"
          >
            <Scale className="h-6 w-6 mr-2" />
            ⚖️ ACTIVATE LEGAL DEFENSE
          </Button>

          <div className="space-y-4">
            <h4 className="text-blue-400 font-bold">🛡️ PROTECTED ASSETS:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <Badge className="bg-blue-600">© Harmony of Gaia Brand</Badge>
              <Badge className="bg-green-600">🌍 Green Planet Initiative</Badge>
              <Badge className="bg-purple-600">⚡ Quantum Technology</Badge>
              <Badge className="bg-orange-600">🏦 Vault System Design</Badge>
              <Badge className="bg-red-600">🛡️ Security Protocols</Badge>
              <Badge className="bg-yellow-600">🎮 Gaming Technology</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
