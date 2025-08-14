import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wrench, Cpu, Shield, Zap } from "lucide-react";

const TechnoSoulSolutions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-900/20 via-blue-900/20 to-purple-900/20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-cyan-400 mb-4">🔧 TECHNO SOUL SOLUTIONS</h1>
          <p className="text-muted-foreground">
            Advanced technical support with dragon-powered solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-cyan-500/30 bg-cyan-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-cyan-400">
                <Wrench className="h-5 w-5" />
                Technical Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Get expert technical assistance from our dragon-trained team
              </p>
              <Button className="w-full bg-cyan-600 hover:bg-cyan-700">Get Support</Button>
            </CardContent>
          </Card>

          <Card className="border-purple-500/30 bg-purple-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Cpu className="h-5 w-5" />
                System Optimization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Optimize your systems with quantum-enhanced performance
              </p>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">Optimize Now</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TechnoSoulSolutions;
