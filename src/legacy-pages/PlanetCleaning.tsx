import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Satellite, MapPin, Camera } from "lucide-react";

export default function PlanetCleaning() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-4">
            🌍 Planet Cleaning
          </h1>
          <p className="text-xl text-muted-foreground">
            Verified cleanup activities with satellite monitoring
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-green-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Globe className="h-5 w-5" />
                Global Cleanup Map
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-green-400 mx-auto mb-2" />
                  <p className="text-green-300">
                    Interactive cleanup map loading...
                  </p>
                </div>
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <MapPin className="h-4 w-4 mr-2" />
                Find Cleanup Areas
              </Button>
            </CardContent>
          </Card>

          <Card className="border-blue-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Satellite className="h-5 w-5" />
                Satellite Verification
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <h3 className="font-medium text-blue-400 mb-2">
                  Verification Features
                </h3>
                <ul className="text-sm space-y-1 text-blue-300">
                  <li>• Satellite image verification</li>
                  <li>• IoT sensor integration</li>
                  <li>• Blockchain reward tracking</li>
                  <li>• Real-time impact measurement</li>
                </ul>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Camera className="h-4 w-4 mr-2" />
                Document Cleanup
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card className="border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-purple-400 text-center">
                Recent Cleanup Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <h4 className="font-medium text-green-400 mb-2">
                    Beach Cleanup - California
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    50 kg plastic removed
                  </p>
                  <p className="text-xs text-green-300">
                    Verified by satellite ✓
                  </p>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <h4 className="font-medium text-blue-400 mb-2">
                    River Cleanup - Amazon
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    200 kg waste collected
                  </p>
                  <p className="text-xs text-blue-300">
                    IoT sensors confirmed ✓
                  </p>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                  <h4 className="font-medium text-purple-400 mb-2">
                    Forest Restoration - Brazil
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    100 trees planted
                  </p>
                  <p className="text-xs text-purple-300">
                    Blockchain verified ✓
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
