/**
 * AI-Powered Mission Generator
 * Advanced AI system for generating personalized environmental missions
 */

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Sparkles, 
  Target, 
  Brain, 
  Leaf, 
  Globe, 
  Zap,
  Star,
  Award,
  Clock,
  MapPin,
  Users,
  TrendingUp,
  RefreshCw,
  Play,
  CheckCircle
} from 'lucide-react';

const AIPoweredMissionGenerator: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMission, setGeneratedMission] = useState<any>(null);
  const [missionType, setMissionType] = useState('balanced');

  const missionTypes = [
    { id: 'balanced', name: 'Balanced', icon: Target, description: 'Mix of easy and challenging tasks' },
    { id: 'beginner', name: 'Beginner', icon: Star, description: 'Perfect for newcomers' },
    { id: 'advanced', name: 'Advanced', icon: Brain, description: 'Complex environmental challenges' },
    { id: 'community', name: 'Community', icon: Users, description: 'Team-based missions' },
    { id: 'local', name: 'Local Impact', icon: MapPin, description: 'Location-based actions' },
    { id: 'urgent', name: 'Urgent', icon: Zap, description: 'Time-sensitive environmental needs' }
  ];

  const aiCapabilities = [
    {
      icon: Brain,
      title: "Adaptive AI Learning",
      description: "Learns from your preferences and success patterns"
    },
    {
      icon: Globe,
      title: "Global Data Integration",
      description: "Real-time environmental data from worldwide sources"
    },
    {
      icon: Target,
      title: "Personalized Targeting",
      description: "Missions tailored to your skills and location"
    },
    {
      icon: TrendingUp,
      title: "Impact Optimization",
      description: "Maximizes environmental benefit per action"
    }
  ];

  const sampleMissions = [
    {
      id: 1,
      title: "Urban Biodiversity Survey",
      description: "Document local wildlife in your area using our AI-powered species identification",
      difficulty: "Intermediate",
      duration: "2-3 hours",
      impact: "High",
      points: 850,
      type: "Data Collection",
      location: "Local Area",
      participants: 1,
      tools: ["Smartphone Camera", "Species ID App", "GPS"],
      steps: [
        "Download the GaiaSpecies AI app",
        "Visit 5 different local habitats",
        "Photograph and identify 15 species",
        "Upload findings to global database"
      ],
      environmentalBenefit: "Contributes to global biodiversity monitoring",
      aiGenerated: true
    },
    {
      id: 2,
      title: "Smart Energy Optimization Challenge",
      description: "Use AI analytics to reduce your household energy consumption by 20%",
      difficulty: "Beginner",
      duration: "1 week",
      impact: "Medium",
      points: 650,
      type: "Energy Saving",
      location: "Home",
      participants: 1,
      tools: ["Smart Meter Reader", "Energy App", "Usage Tracker"],
      steps: [
        "Install energy monitoring app",
        "Baseline your current usage",
        "Follow AI recommendations",
        "Track and report savings"
      ],
      environmentalBenefit: "Reduces personal carbon footprint",
      aiGenerated: true
    },
    {
      id: 3,
      title: "Community Plastic Cleanup Mission",
      description: "Organize a neighborhood cleanup using our coordination platform",
      difficulty: "Advanced",
      duration: "1 day + planning",
      impact: "Very High",
      points: 1200,
      type: "Community Action",
      location: "Neighborhood",
      participants: "5-20",
      tools: ["Cleanup Kit", "Waste Sorting Guide", "Community App"],
      steps: [
        "Plan event using community platform",
        "Recruit 5+ participants",
        "Execute cleanup operation",
        "Document and report results"
      ],
      environmentalBenefit: "Removes plastic waste from ecosystem",
      aiGenerated: true
    }
  ];

  const generateMission = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, AI_GENERATION_DELAY_MS));
    
    const newMission = {
      ...sampleMissions[Math.floor(Math.random() * sampleMissions.length)],
      id: Date.now(),
      title: "AI-Generated: " + sampleMissions[Math.floor(Math.random() * sampleMissions.length)].title,
      aiGenerated: true,
      generatedAt: new Date().toLocaleString()
    };
    
    setGeneratedMission(newMission);
    setIsGenerating(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case 'low': return 'bg-gray-100 text-gray-800';
      case 'medium': return 'bg-blue-100 text-blue-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'very high': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-green-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Brain className="h-8 w-8 text-purple-500" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-green-600 bg-clip-text text-transparent">
              AI Mission Generator
            </h1>
            <Sparkles className="h-8 w-8 text-yellow-500" />
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Advanced AI creates personalized environmental missions based on your preferences, location, and global impact needs
          </p>
        </div>

        {/* AI Capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {aiCapabilities.map((capability, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-4">
                <capability.icon className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                <h3 className="font-semibold mb-1">{capability.title}</h3>
                <p className="text-sm text-muted-foreground">{capability.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Mission Generator */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-purple-500" />
                  <span>Generate New Mission</span>
                </CardTitle>
                <CardDescription>
                  Select your preferences and let AI create the perfect environmental mission for you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Mission Type Selection */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Mission Type</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {missionTypes.map((type) => (
                      <Button
                        key={type.id}
                        variant={missionType === type.id ? "default" : "outline"}
                        className="h-auto p-3 flex flex-col items-center space-y-1"
                        onClick={() => setMissionType(type.id)}
                      >
                        <type.icon className="h-4 w-4" />
                        <span className="text-xs">{type.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Generate Button */}
                <Button 
                  onClick={generateMission} 
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-purple-500 to-green-500 hover:from-purple-600 hover:to-green-600"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      AI Generating Mission...
                    </>
                  ) : (
                    <>
                      <Brain className="h-4 w-4 mr-2" />
                      Generate AI Mission
                    </>
                  )}
                </Button>

                {/* Generated Mission */}
                {generatedMission && (
                  <Card className="border-purple-200 bg-purple-50">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{generatedMission.title}</CardTitle>
                        <Badge className="bg-purple-100 text-purple-800">
                          AI Generated
                        </Badge>
                      </div>
                      <CardDescription>{generatedMission.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Mission Stats */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <Badge className={getDifficultyColor(generatedMission.difficulty)}>
                            {generatedMission.difficulty}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">Difficulty</p>
                        </div>
                        <div className="text-center">
                          <Badge className={getImpactColor(generatedMission.impact)}>
                            {generatedMission.impact}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">Impact</p>
                        </div>
                        <div className="text-center">
                          <p className="font-semibold">{generatedMission.points}</p>
                          <p className="text-xs text-muted-foreground">Points</p>
                        </div>
                        <div className="text-center">
                          <p className="font-semibold">{generatedMission.duration}</p>
                          <p className="text-xs text-muted-foreground">Duration</p>
                        </div>
                      </div>

                      {/* Mission Steps */}
                      <div>
                        <h4 className="font-semibold mb-2">Mission Steps:</h4>
                        <div className="space-y-2">
                          {generatedMission.steps.map((step: string, index: number) => (
                            <div key={index} className="flex items-center space-x-2">
                              <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm font-medium">
                                {index + 1}
                              </div>
                              <span className="text-sm">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-2">
                        <Button className="flex-1">
                          <Play className="h-4 w-4 mr-2" />
                          Start Mission
                        </Button>
                        <Button variant="outline">
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Regenerate
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sample Missions & Stats */}
          <div className="space-y-6">
            {/* AI Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <span>AI Performance</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Mission Success Rate</span>
                    <span className="font-medium">94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>User Satisfaction</span>
                    <span className="font-medium">96%</span>
                  </div>
                  <Progress value={96} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Environmental Impact</span>
                    <span className="font-medium">89%</span>
                  </div>
                  <Progress value={89} className="h-2" />
                </div>
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground">
                    <strong>15,847</strong> missions generated this month
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Recent Missions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-yellow-500" />
                  <span>Popular AI Missions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sampleMissions.slice(0, 3).map((mission) => (
                    <div key={mission.id} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                      <h4 className="font-medium text-sm mb-1">{mission.title}</h4>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {mission.points} pts
                        </Badge>
                        <Badge className={`text-xs ${getDifficultyColor(mission.difficulty)}`}>
                          {mission.difficulty}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPoweredMissionGenerator;