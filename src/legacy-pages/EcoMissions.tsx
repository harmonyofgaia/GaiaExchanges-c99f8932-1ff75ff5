import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, MapPin, Award, Clock } from "lucide-react";

export default function EcoMissions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-4">
            🎯 Eco Missions
          </h1>
          <p className="text-xl text-muted-foreground">
            AI-powered missions for environmental impact
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-green-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Target className="h-5 w-5" />
                Beach Cleanup
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Badge
                  variant="outline"
                  className="border-green-500/30 text-green-400"
                >
                  Easy
                </Badge>
                <Badge
                  variant="outline"
                  className="border-blue-500/30 text-blue-400"
                >
                  50 GAIA
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Collect plastic waste from your local beach and document your
                impact
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Any coastal area</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>2-3 hours</span>
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Start Mission
              </Button>
            </CardContent>
          </Card>

          <Card className="border-blue-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Award className="h-5 w-5" />
                Tree Planting
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Badge
                  variant="outline"
                  className="border-orange-500/30 text-orange-400"
                >
                  Medium
                </Badge>
                <Badge
                  variant="outline"
                  className="border-blue-500/30 text-blue-400"
                >
                  100 GAIA
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Plant native trees in designated areas and track their growth
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Forest reserves</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>4-6 hours</span>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Start Mission
              </Button>
            </CardContent>
          </Card>

          <Card className="border-purple-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Target className="h-5 w-5" />
                Solar Installation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Badge
                  variant="outline"
                  className="border-red-500/30 text-red-400"
                >
                  Hard
                </Badge>
                <Badge
                  variant="outline"
                  className="border-blue-500/30 text-blue-400"
                >
                  200 GAIA
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Help install solar panels in community centers
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Community centers</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Full day</span>
              </div>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Start Mission
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
