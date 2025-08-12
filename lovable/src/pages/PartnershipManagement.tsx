import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Handshake,
  Building,
  Users,
  TrendingUp,
  Globe,
  Star,
} from "lucide-react";

export default function PartnershipManagement() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white p-6">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            🤝 Partnership Management
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Strategic Partnerships for Environmental Impact
          </p>
          <div className="flex gap-4 mt-4">
            <Badge
              variant="outline"
              className="border-green-500/50 text-green-400"
            >
              <Building className="h-3 w-3 mr-1" />
              47 Active Partners
            </Badge>
            <Badge
              variant="outline"
              className="border-blue-500/50 text-blue-400"
            >
              <Globe className="h-3 w-3 mr-1" />
              Global Network
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-900/20 to-black/50 border-green-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-400">
                Active Partnerships
              </CardTitle>
              <Handshake className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">47</div>
              <p className="text-xs text-muted-foreground">
                +12% from last quarter
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/20 to-black/50 border-blue-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-400">
                Total Revenue
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">$2.4M</div>
              <p className="text-xs text-muted-foreground">
                Quarterly partnership revenue
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/20 to-black/50 border-purple-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-400">
                Impact Projects
              </CardTitle>
              <Globe className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">127</div>
              <p className="text-xs text-muted-foreground">
                Environmental initiatives
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-900/20 to-black/50 border-yellow-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-yellow-400">
                Partner Rating
              </CardTitle>
              <Star className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">4.8/5</div>
              <p className="text-xs text-muted-foreground">
                Average satisfaction
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-green-900/20 to-black/50 border-green-500/20">
            <CardHeader>
              <CardTitle className="text-green-400">
                Strategic Partners
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-green-900/20 rounded-lg border border-green-500/20">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-green-400">
                      GreenTech Solutions
                    </h4>
                    <Badge
                      variant="outline"
                      className="border-green-500/30 text-green-400 text-xs"
                    >
                      Tier 1
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Renewable energy infrastructure partner
                  </p>
                  <Progress value={95} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Partnership Health</span>
                    <span>95%</span>
                  </div>
                </div>

                <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-500/20">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-blue-400">
                      Ocean Conservancy
                    </h4>
                    <Badge
                      variant="outline"
                      className="border-blue-500/30 text-blue-400 text-xs"
                    >
                      Tier 1
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Marine ecosystem protection partner
                  </p>
                  <Progress value={89} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Partnership Health</span>
                    <span>89%</span>
                  </div>
                </div>

                <div className="p-3 bg-purple-900/20 rounded-lg border border-purple-500/20">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-purple-400">
                      Wildlife Foundation
                    </h4>
                    <Badge
                      variant="outline"
                      className="border-purple-500/30 text-purple-400 text-xs"
                    >
                      Tier 2
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Animal welfare and habitat restoration
                  </p>
                  <Progress value={76} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Partnership Health</span>
                    <span>76%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/20 to-black/50 border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-blue-400">
                Partnership Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                <Button className="w-full bg-green-600 hover:bg-green-700 justify-start">
                  <Building className="h-4 w-4 mr-2" />
                  Add New Partner
                </Button>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 justify-start">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Analytics Dashboard
                </Button>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Partner Directory
                </Button>
                <Button className="w-full bg-yellow-600 hover:bg-yellow-700 justify-start">
                  <Star className="h-4 w-4 mr-2" />
                  Performance Reviews
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
