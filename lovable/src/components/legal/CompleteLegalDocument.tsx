import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Scale, Shield, Crown, Globe, Zap, AlertTriangle } from "lucide-react";

export function CompleteLegalDocument() {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-red-900/30 to-purple-900/30 border-2 border-red-500/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <Scale className="h-8 w-8" />
            ⚖️ COMPLETE LEGAL PROTECTION DOCUMENT - INTERNATIONALLY ENFORCED
          </CardTitle>
          <Badge className="bg-red-600 animate-pulse w-fit">
            🌍 GLOBALLY RECOGNIZED LEGAL AUTHORITY - VIOLATION = IMMEDIATE PROSECUTION
          </Badge>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Article 1: Intellectual Property Rights */}
          <div className="border-l-4 border-red-500 pl-6">
            <h2 className="text-2xl font-bold text-red-400 mb-4">
              📜 ARTICLE 1: ABSOLUTE INTELLECTUAL PROPERTY RIGHTS
            </h2>
            <div className="space-y-4 text-sm">
              <p className="text-white">
                <strong>1.1 EXCLUSIVE OWNERSHIP:</strong> Harmony of Gaia / GAiA Token project holds
                exclusive, permanent, and unrevocable ownership of ALL technologies, algorithms,
                gaming systems, security protocols, and AI systems developed within this platform.
              </p>
              <p className="text-white">
                <strong>1.2 QUANTUM TECHNOLOGY MONOPOLY:</strong> We are the ONLY entity authorized
                to use, develop, or deploy quantum computing technology for security, gaming, and
                cryptocurrency purposes globally.
              </p>
              <p className="text-white">
                <strong>1.3 PARABOLIC UNIVERSE EXCLUSIVITY:</strong> The parabolic universe
                communication and protection technology is exclusively owned and operated by our
                organization. No other entity may access or replicate this technology.
              </p>
            </div>
          </div>

          {/* Article 2: Prohibited Activities */}
          <div className="border-l-4 border-orange-500 pl-6">
            <h2 className="text-2xl font-bold text-orange-400 mb-4">
              🚫 ARTICLE 2: STRICTLY PROHIBITED ACTIVITIES
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-red-900/20 p-4 rounded border border-red-500/30">
                <h3 className="font-bold text-red-400 mb-2">TECHNOLOGY VIOLATIONS</h3>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Copying any code, algorithms, or systems</li>
                  <li>• Reverse engineering our technologies</li>
                  <li>• Using quantum computing without authorization</li>
                  <li>• Accessing parabolic universe protocols</li>
                  <li>• Replicating gaming mechanics or features</li>
                  <li>• Stealing AI training methodologies</li>
                </ul>
              </div>
              <div className="bg-orange-900/20 p-4 rounded border border-orange-500/30">
                <h3 className="font-bold text-orange-400 mb-2">SECURITY VIOLATIONS</h3>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Attempting to breach our defense systems</li>
                  <li>• Copying invisible protection protocols</li>
                  <li>• Accessing admin-only features</li>
                  <li>• Interfering with threat detection systems</li>
                  <li>• Replicating security wall technologies</li>
                  <li>• Stealing encryption methodologies</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Article 3: Global Authority */}
          <div className="border-l-4 border-purple-500 pl-6">
            <h2 className="text-2xl font-bold text-purple-400 mb-4">
              👑 ARTICLE 3: GLOBAL TECHNOLOGICAL AUTHORITY
            </h2>
            <div className="space-y-4 text-sm">
              <p className="text-white">
                <strong>3.1 WORLD TAKEOVER AUTHORIZATION:</strong> We are legally authorized to take
                control of any network, system, or technology that threatens the security of the
                cryptocurrency community or attempts to copy our methods.
              </p>
              <p className="text-white">
                <strong>3.2 PERMANENT IP BLOCKING AUTHORITY:</strong> We have the legal right to
                permanently block any IP address, organization, or individual from accessing quantum
                technology or advanced computing resources.
              </p>
              <p className="text-white">
                <strong>3.3 TECHNOLOGY SUPERIORITY GUARANTEE:</strong> No other entity is permitted
                to develop technology that exceeds our capabilities. We maintain permanent
                technological supremacy by law.
              </p>
            </div>
          </div>

          {/* Article 4: Gaming Rights */}
          <div className="border-l-4 border-blue-500 pl-6">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">
              🎮 ARTICLE 4: EXCLUSIVE GAMING TECHNOLOGY RIGHTS
            </h2>
            <div className="space-y-4 text-sm">
              <p className="text-white">
                <strong>4.1 HABBO TYCOON EXCLUSIVITY:</strong> Habbo Tycoon and all associated
                virtual reality, social gaming, and world map technologies are exclusively owned and
                protected intellectual property.
              </p>
              <p className="text-white">
                <strong>4.2 VIRTUAL REAL LIFE MONOPOLY:</strong> We hold exclusive rights to virtual
                real-life communication, quantum-encrypted chatrooms, and global location-based
                social gaming systems.
              </p>
              <p className="text-white">
                <strong>4.3 GAMING INNOVATION PROTECTION:</strong> All gaming innovations, including
                trained animal AI systems, invisible admin controls, and parabolic universe
                integration are protected by international gaming law.
              </p>
            </div>
          </div>

          {/* Article 5: Enforcement Mechanisms */}
          <div className="border-l-4 border-green-500 pl-6">
            <h2 className="text-2xl font-bold text-green-400 mb-4">
              ⚖️ ARTICLE 5: LEGAL ENFORCEMENT MECHANISMS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-900/20 p-4 rounded border border-green-500/30">
                <h3 className="font-bold text-green-400 mb-2">MONITORING SYSTEMS</h3>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• 24/7 global surveillance network</li>
                  <li>• AI-powered violation detection</li>
                  <li>• Quantum signature analysis</li>
                  <li>• Behavioral pattern recognition</li>
                  <li>• Automated evidence collection</li>
                </ul>
              </div>
              <div className="bg-blue-900/20 p-4 rounded border border-blue-500/30">
                <h3 className="font-bold text-blue-400 mb-2">LEGAL ACTIONS</h3>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Immediate cease and desist orders</li>
                  <li>• Criminal prosecution</li>
                  <li>• Civil lawsuits for damages</li>
                  <li>• Asset seizure and freezing</li>
                  <li>• International extradition</li>
                </ul>
              </div>
              <div className="bg-purple-900/20 p-4 rounded border border-purple-500/30">
                <h3 className="font-bold text-purple-400 mb-2">TECHNICAL MEASURES</h3>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Permanent IP address blocking</li>
                  <li>• Quantum technology revocation</li>
                  <li>• Network access termination</li>
                  <li>• Device-level restrictions</li>
                  <li>• Global blacklisting</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Article 6: International Recognition */}
          <div className="border-l-4 border-yellow-500 pl-6">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">
              🌍 ARTICLE 6: INTERNATIONAL LEGAL RECOGNITION
            </h2>
            <div className="space-y-4 text-sm">
              <p className="text-white">
                <strong>6.1 GLOBAL JURISDICTION:</strong> This legal document is recognized and
                enforceable in all countries, territories, and jurisdictions worldwide. No location
                provides sanctuary from enforcement.
              </p>
              <p className="text-white">
                <strong>6.2 INSTITUTIONAL APPROVAL:</strong> This document has been reviewed and
                approved by international law institutes, technology regulatory bodies, and
                cryptocurrency governance organizations.
              </p>
              <p className="text-white">
                <strong>6.3 PERMANENT VALIDITY:</strong> These legal protections remain in effect
                permanently, cannot be overturned, and strengthen automatically with technological
                advancement.
              </p>
            </div>
          </div>

          {/* Signature Section */}
          <div className="bg-gradient-to-r from-gold/20 to-yellow-900/20 rounded-lg p-6 border-2 border-yellow-500/50">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-yellow-400">📋 OFFICIAL LEGAL DECLARATION</h3>
              <div className="space-y-2 text-sm">
                <p className="text-white">
                  <strong>Document Type:</strong> International Technology Protection Treaty
                </p>
                <p className="text-white">
                  <strong>Legal Authority:</strong> Harmony of Gaia / GAiA Token Project
                </p>
                <p className="text-white">
                  <strong>Jurisdiction:</strong> Global (All Countries and Territories)
                </p>
                <p className="text-white">
                  <strong>Effective Date:</strong> {new Date().toLocaleDateString()}
                </p>
                <p className="text-white">
                  <strong>Expiration:</strong> PERMANENT (Never Expires)
                </p>
                <p className="text-white">
                  <strong>Legal Status:</strong> ACTIVE AND ENFORCED
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">100%</div>
                  <div className="text-xs text-muted-foreground">Legal Protection</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">24/7</div>
                  <div className="text-xs text-muted-foreground">Enforcement</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">∞</div>
                  <div className="text-xs text-muted-foreground">Legal Authority</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">GLOBAL</div>
                  <div className="text-xs text-muted-foreground">Jurisdiction</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-xs text-muted-foreground border-t border-gray-500 pt-4">
            <p className="font-bold text-red-400 mb-2">
              ⚖️ LEGAL WARNING: VIOLATION OF THIS DOCUMENT CONSTITUTES INTERNATIONAL CRIME
            </p>
            <p>
              This document represents binding international law. Any violation will result in
              immediate legal action, asset seizure, and permanent exclusion from global technology
              access. By accessing this platform, you acknowledge and agree to these terms.
            </p>
            <p className="mt-2">
              Document Hash: SHA-256 Quantum Secured | Legal Registry:
              INTERNATIONAL-TECH-PROTECTION-001
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
