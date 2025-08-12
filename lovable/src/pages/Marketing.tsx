import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, TrendingUp, Users, Globe, Zap, Share2 } from "lucide-react";

const Marketing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900/20 via-red-900/20 to-purple-900/20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-orange-400 mb-4">
            🎯 MARKETING HUB
          </h1>
          <p className="text-muted-foreground">
            Grow the GAIA ecosystem with dragon-powered marketing tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-orange-500/30 bg-orange-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-400">
                <Target className="h-5 w-5" />
                Campaign Manager
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Create and manage marketing campaigns
              </p>
              <Button className="w-full bg-orange-600 hover:bg-orange-700">
                Launch Campaign
              </Button>
            </CardContent>
          </Card>

          <Card className="border-green-500/30 bg-green-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <TrendingUp className="h-5 w-5" />
                Analytics Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Track performance and growth metrics
              </p>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                View Analytics
              </Button>
            </CardContent>
          </Card>

          <Card className="border-blue-500/30 bg-blue-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Share2 className="h-5 w-5" />
                Social Media Tools
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Manage social media presence
              </p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Social Hub
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Marketing;
