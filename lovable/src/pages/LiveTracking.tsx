import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UniversalGaiaLogo } from "@/components/branding/UniversalGaiaLogo";
import { OmniscientGPSEngine } from "@/components/tracking/OmniscientGPSEngine";

export default function LiveTracking() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-center mb-8">
        <UniversalGaiaLogo
          size="lg"
          animated={true}
          showText={true}
          className="hover:scale-105 transition-transform duration-300"
        />
      </div>

      <Card className="border-blue-500/30 bg-gradient-to-r from-blue-900/20 to-purple-900/20 mb-8">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            🛰️ Live Tracking Command Center
          </CardTitle>
          <p className="text-center text-xl text-muted-foreground">
            Omniscient GPS tracking with quantum-level accuracy and global
            coverage
          </p>
        </CardHeader>
      </Card>

      <OmniscientGPSEngine />
    </div>
  );
}
