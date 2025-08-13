import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, TreePine, Droplets, Wind } from "lucide-react";

export default function GreenImpactDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-4">
            🌱 Green Impact Dashboard
          </h1>
          <p className="text-xl text-muted-foreground">
            Track your environmental impact with AI-powered insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-green-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-400">
                Carbon Offset
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Leaf className="h-8 w-8 text-green-400 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-green-400">
                    127 kg
                  </div>
                  <p className="text-xs text-muted-foreground">CO₂ reduced</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-400">
                Trees Planted
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <TreePine className="h-8 w-8 text-blue-400 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-blue-400">23</div>
                  <p className="text-xs text-muted-foreground">
                    trees sponsored
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-cyan-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-cyan-400">
                Ocean Cleanup
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Droplets className="h-8 w-8 text-cyan-400 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-cyan-400">45 L</div>
                  <p className="text-xs text-muted-foreground">water cleaned</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-purple-400">
                Air Quality
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Wind className="h-8 w-8 text-purple-400 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-purple-400">92%</div>
                  <p className="text-xs text-muted-foreground">improvement</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
