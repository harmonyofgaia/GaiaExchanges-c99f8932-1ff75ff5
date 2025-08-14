import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Heart, Users, Target } from "lucide-react";

export default function ProjectFunding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-4">
            💚 Project Funding
          </h1>
          <p className="text-xl text-muted-foreground">
            Decentralized funding for environmental projects
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-green-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Heart className="h-5 w-5" />
                Ocean Cleanup Initiative
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Remove plastic waste from oceans using advanced filtration systems
              </p>
              <Progress value={75} className="w-full" />
              <div className="flex justify-between text-sm">
                <span>75% funded</span>
                <span>$150,000 / $200,000</span>
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700">Fund Project</Button>
            </CardContent>
          </Card>

          <Card className="border-blue-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Users className="h-5 w-5" />
                Reforestation Program
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Plant native trees in deforested areas to restore ecosystems
              </p>
              <Progress value={45} className="w-full" />
              <div className="flex justify-between text-sm">
                <span>45% funded</span>
                <span>$45,000 / $100,000</span>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Fund Project</Button>
            </CardContent>
          </Card>

          <Card className="border-purple-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Target className="h-5 w-5" />
                Solar Energy Access
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Provide solar panels to remote communities for clean energy
              </p>
              <Progress value={90} className="w-full" />
              <div className="flex justify-between text-sm">
                <span>90% funded</span>
                <span>$135,000 / $150,000</span>
              </div>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">Fund Project</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
