import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Eye, Crown, Zap, AlertTriangle } from "lucide-react";

export function IntellectualPropertyProtection() {
  return (
    <Card className="bg-gradient-to-br from-red-900/20 to-purple-900/20 border-2 border-red-500/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-400">
          <Shield className="h-6 w-6" />
          🛡️ INTELLECTUAL PROPERTY PROTECTION - QUANTUM SECURED
        </CardTitle>
        <Badge className="bg-red-600 animate-pulse w-fit">
          ⚖️ LEGALLY PROTECTED - VIOLATION = PROSECUTION
        </Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-red-900/30 rounded-lg border border-red-500/30">
              <h3 className="font-bold text-red-400 mb-2 flex items-center gap-2">
                <Crown className="h-5 w-5" />
                🚫 STRICTLY PROHIBITED ACTIVITIES
              </h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Copying our quantum technology systems</li>
                <li>• Reverse engineering our algorithms</li>
                <li>• Replicating our game mechanics</li>
                <li>• Stealing our biomechanical designs</li>
                <li>• Using our landscape generation methods</li>
                <li>• Copying our NFT creation processes</li>
                <li>• Reproducing our AI training systems</li>
                <li>• Imitating our quantum computer networks</li>
              </ul>
            </div>

            <div className="p-4 bg-purple-900/30 rounded-lg border border-purple-500/30">
              <h3 className="font-bold text-purple-400 mb-2 flex items-center gap-2">
                <Lock className="h-5 w-5" />
                🔒 QUANTUM SECURITY MEASURES
              </h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 20 Quantum computers monitoring for violations</li>
                <li>• AI-powered plagiarism detection</li>
                <li>• Global satellite surveillance network</li>
                <li>• Blockchain-secured evidence collection</li>
                <li>• Automated legal documentation system</li>
                <li>• Real-time violation alerts</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-yellow-900/30 rounded-lg border border-yellow-500/30">
              <h3 className="font-bold text-yellow-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                ⚖️ LEGAL CONSEQUENCES
              </h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Immediate cease and desist orders</li>
                <li>• Criminal prosecution for theft</li>
                <li>• Civil lawsuits for damages</li>
                <li>• International legal enforcement</li>
                <li>• Asset seizure and freezing</li>
                <li>• Public exposure of violations</li>
                <li>• Permanent industry blacklisting</li>
              </ul>
            </div>

            <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-500/30">
              <h3 className="font-bold text-blue-400 mb-2 flex items-center gap-2">
                <Eye className="h-5 w-5" />
                👁️ MONITORING SYSTEMS
              </h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 24/7 global web crawling</li>
                <li>• Code signature detection</li>
                <li>• Pattern matching algorithms</li>
                <li>• Similarity analysis engines</li>
                <li>• Automated evidence archival</li>
                <li>• Legal team instant notifications</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center p-6 bg-gradient-to-r from-red-900/40 to-purple-900/40 rounded-lg border-2 border-red-500/50">
          <Zap className="h-12 w-12 mx-auto text-red-400 mb-4 animate-pulse" />
          <h3 className="text-2xl font-bold text-red-400 mb-2">⚡ QUANTUM PROTECTION ACTIVE</h3>
          <p className="text-muted-foreground mb-4">
            Our intellectual property is protected by the most advanced quantum security systems
            ever created. Any attempt to copy, steal, or replicate our technology will be detected
            instantly and prosecuted to the full extent of the law.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">100%</div>
              <div className="text-xs text-muted-foreground">Detection Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">24/7</div>
              <div className="text-xs text-muted-foreground">Monitoring</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">20</div>
              <div className="text-xs text-muted-foreground">Quantum PCs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">∞</div>
              <div className="text-xs text-muted-foreground">Legal Power</div>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p className="font-bold text-red-400 mb-2">
            🚨 WARNING: VIOLATION OF THESE TERMS WILL RESULT IN IMMEDIATE LEGAL ACTION
          </p>
          <p>
            This technology is exclusively owned by Harmony of Gaia / GAiA Token project. All rights
            reserved. Protected by international copyright and patent laws.
          </p>
          <p className="mt-2 text-xs">
            Last Updated: {new Date().toLocaleDateString()} | Quantum Security Level: MAXIMUM
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
