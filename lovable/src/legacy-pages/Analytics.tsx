import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UniversalGaiaLogo } from "@/components/branding/UniversalGaiaLogo";

export default function Analytics() {
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

      <Card className="border-blue-500/30 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            📊 Analytics Dashboard
          </CardTitle>
          <p className="text-center text-xl text-muted-foreground">
            Deep insights into GAiA Network performance and metrics
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-6xl mb-4">📈</div>
            <h3 className="text-2xl font-bold text-blue-400 mb-2">Advanced Analytics</h3>
            <p className="text-muted-foreground">
              Comprehensive analytics tools are being developed to provide real-time insights into
              network activity.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
