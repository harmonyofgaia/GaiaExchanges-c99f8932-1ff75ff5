import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Waves,
  TrendingUp,
  Globe,
  Shield,
  Users,
  Coins,
  Bell,
  BookOpen,
  Target,
  Eye,
  Zap,
  TreePine,
  BarChart3,
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock,
  Lightbulb,
  Database,
  Activity,
} from "lucide-react";
import { PsychohistoricalEngine } from "@/components/psychohistorical/PsychohistoricalEngine";
import { SecurePsychohistoricalAdmin } from "@/components/psychohistorical/SecurePsychohistoricalAdmin";
import { PsychohistoricalIntegration } from "@/components/psychohistorical/PsychohistoricalIntegration";
import { PsychohistoricalDocumentation } from "@/components/psychohistorical/PsychohistoricalDocumentation";

export default function SeaGreenPsychohistoricalProject() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            🌊 SEA GREEN PSYCHOHISTORICAL PROJECT
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Advanced AI-Powered Environmental Future Prediction & Idea Generation System
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <Badge variant="outline" className="border-green-500/50 text-green-400">
              <Brain className="h-3 w-3 mr-1" />
              Psychohistorical AI
            </Badge>
            <Badge variant="outline" className="border-blue-500/50 text-blue-400">
              <Waves className="h-3 w-3 mr-1" />
              Global Data Analysis
            </Badge>
            <Badge variant="outline" className="border-purple-500/50 text-purple-400">
              <TrendingUp className="h-3 w-3 mr-1" />
              Future Prediction
            </Badge>
            <Badge variant="outline" className="border-yellow-500/50 text-yellow-400">
              <Coins className="h-3 w-3 mr-1" />
              GAIA Token Economy
            </Badge>
          </div>
        </div>

        {/* Core Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-green-500/20 bg-gradient-to-br from-green-900/20 to-green-800/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-400">
                Prediction Accuracy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Eye className="h-8 w-8 text-green-400 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-green-400">87.3%</div>
                  <p className="text-xs text-muted-foreground">Environmental forecasts</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-500/20 bg-gradient-to-br from-blue-900/20 to-blue-800/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-400">Ideas Generated</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Lightbulb className="h-8 w-8 text-blue-400 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-blue-400">2,847</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-500/20 bg-gradient-to-br from-purple-900/20 to-purple-800/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-purple-400">Implementations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-purple-400 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-purple-400">341</div>
                  <p className="text-xs text-muted-foreground">Active solutions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-500/20 bg-gradient-to-br from-yellow-900/20 to-yellow-800/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-yellow-400">Global Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Globe className="h-8 w-8 text-yellow-400 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-yellow-400">156T</div>
                  <p className="text-xs text-muted-foreground">CO₂ prevented</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Interface Tabs */}
        <Tabs defaultValue="engine" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="engine" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Psychohistorical Engine
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Secure Admin
            </TabsTrigger>
            <TabsTrigger value="governance" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Token Governance
            </TabsTrigger>
            <TabsTrigger value="documentation" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Auto-Documentation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="engine" className="space-y-6">
            <Card className="border-green-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <Brain className="h-5 w-5" />
                  Psychohistorical Analysis Engine
                </CardTitle>
                <p className="text-muted-foreground">
                  Advanced AI system scanning global environmental data and generating
                  future-oriented green solutions
                </p>
              </CardHeader>
              <CardContent>
                <PsychohistoricalEngine />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admin" className="space-y-6">
            <Card className="border-blue-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-400">
                  <Shield className="h-5 w-5" />
                  Secure Administrative Dashboard
                </CardTitle>
                <p className="text-muted-foreground">
                  Protected interface for managing generated ideas and monitoring system integrity
                </p>
              </CardHeader>
              <CardContent>
                <SecurePsychohistoricalAdmin />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="governance" className="space-y-6">
            <Card className="border-purple-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <Users className="h-5 w-5" />
                  Community Governance & Token Integration
                </CardTitle>
                <p className="text-muted-foreground">
                  Decentralized voting, rewards distribution, and community participation systems
                </p>
              </CardHeader>
              <CardContent>
                <PsychohistoricalIntegration />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documentation" className="space-y-6">
            <Card className="border-yellow-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-400">
                  <BookOpen className="h-5 w-5" />
                  Auto-Documentation & Community Alerts
                </CardTitle>
                <p className="text-muted-foreground">
                  Automated knowledge management and real-time community notification systems
                </p>
              </CardHeader>
              <CardContent>
                <PsychohistoricalDocumentation />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* System Status */}
        <Card className="mt-8 border-gray-500/20 bg-gradient-to-r from-gray-900/20 to-black/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Activity className="h-5 w-5" />
              System Status & Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-green-400 font-semibold">Active</span>
                </div>
                <p className="text-sm text-muted-foreground">Data Collection Systems</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-blue-400 font-semibold">Processing</span>
                </div>
                <p className="text-sm text-muted-foreground">AI Analysis Pipeline</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <div className="w-3 h-3 bg-purple-400 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-purple-400 font-semibold">Distributing</span>
                </div>
                <p className="text-sm text-muted-foreground">Community Alerts</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
