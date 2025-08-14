import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UltimateSecuritySuite } from "./UltimateSecuritySuite";
import { UniversalGaiaLogo } from "@/components/branding/UniversalGaiaLogo";

export function ImmortalSecurity() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-black">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center mb-8">
          <UniversalGaiaLogo
            size="lg"
            animated={true}
            showText={true}
            className="hover:scale-105 transition-transform duration-300"
          />
        </div>

        <Card className="mb-8 border-purple-500/50 bg-gradient-to-r from-purple-900/40 to-blue-900/40">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              ⚡ IMMORTAL SECURITY SYSTEM
            </CardTitle>
            <p className="text-center text-xl text-muted-foreground">
              Eternal Protection • Self-Healing • Admin-Only Control • Never Dies Defense Matrix
            </p>
          </CardHeader>
        </Card>

        <UltimateSecuritySuite />
      </div>
    </div>
  );
}
