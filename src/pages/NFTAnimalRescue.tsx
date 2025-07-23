/**
 * NFT Animal Rescue System
 * Global NFT animal card system with rescue missions and AI-powered scanning
 */

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Heart, 
  Camera, 
  Scan, 
  Sparkles, 
  Globe, 
  Shield,
  Star,
  Award,
  MapPin,
  Clock,
  Users,
  TrendingUp,
  Search,
  Filter,
  Eye,
  Save,
  Share2
} from 'lucide-react';

const NFTAnimalRescue: React.FC = () => {
  const [activeTab, setActiveTab] = useState('collection');
  const [selectedAnimal, setSelectedAnimal] = useState<any>(null);
  const [scanning, setScanning] = useState(false);

  const animalCards = [
    {
      id: 1,
      name: "Arctic Guardian",
      species: "Polar Bear",
      rarity: "Legendary",
      status: "Rescued",
      location: "Arctic Circle",
      rescueDate: "2024-01-15",
      carbonSaved: "2.5 tons",
      habitatProtected: "500 km²",
      image: "/api/placeholder/300/400",
      aiGenerated: false,
      rescueMission: "Ice Habitat Restoration",
      contributions: 1247,
      level: 85,
      abilities: ["Ice Formation", "Climate Adaptation", "Pack Leadership"],
      conservationStatus: "Vulnerable"
    },
    {
      id: 2,
      name: "Ocean Wanderer",
      species: "Blue Whale",
      rarity: "Mythic",
      status: "Active Mission",
      location: "Pacific Ocean",
      rescueDate: null,
      carbonSaved: "15.2 tons",
      habitatProtected: "2,000 km²",
      image: "/api/placeholder/300/400",
      aiGenerated: true,
      rescueMission: "Ocean Cleanup Initiative",
      contributions: 2156,
      level: 92,
      abilities: ["Ocean Purification", "Marine Communication", "Deep Dive"],
      conservationStatus: "Endangered"
    },
    {
      id: 3,
      name: "Forest Spirit",
      species: "Siberian Tiger",
      rarity: "Epic",
      status: "Rescued",
      location: "Siberian Forest",
      rescueDate: "2024-02-20",
      carbonSaved: "8.7 tons",
      habitatProtected: "1,200 km²",
      image: "/api/placeholder/300/400",
      aiGenerated: false,
      rescueMission: "Forest Conservation",
      contributions: 934,
      level: 78,
      abilities: ["Territory Protection", "Forest Restoration", "Pack Hunting"],
      conservationStatus: "Critically Endangered"
    },
    {
      id: 4,
      name: "Sky Dancer",
      species: "Golden Eagle",
      rarity: "Rare",
      status: "Rescued",
      location: "Rocky Mountains",
      rescueDate: "2024-03-10",
      carbonSaved: "1.8 tons",
      habitatProtected: "300 km²",
      image: "/api/placeholder/300/400",
      aiGenerated: true,
      rescueMission: "Mountain Ecosystem Revival",
      contributions: 567,
      level: 65,
      abilities: ["High Altitude Flight", "Thermal Detection", "Territory Mapping"],
      conservationStatus: "Least Concern"
    }
  ];

  const activeMissions = [
    {
      id: 1,
      title: "Save the Ocean Giants",
      species: "Blue Whale",
      location: "Pacific Ocean",
      urgency: "Critical",
      timeLeft: "3 days",
      participants: 2847,
      target: 5000,
      rewards: ["Mythic Blue Whale NFT", "1000 GAIA Tokens", "Ocean Protector Badge"],
      description: "Critical mission to protect blue whale migration routes from shipping interference.",
      progress: 57,
      impact: "Protect 50+ whales during migration season"
    },
    {
      id: 2,
      title: "Amazon Rainforest Guardians",
      species: "Jaguar",
      location: "Amazon Basin",
      urgency: "High",
      timeLeft: "1 week",
      participants: 1923,
      target: 3000,
      rewards: ["Epic Jaguar NFT", "750 GAIA Tokens", "Forest Guardian Badge"],
      description: "Urgent protection needed for jaguar habitat against deforestation.",
      progress: 64,
      impact: "Save 1000 hectares of rainforest"
    },
    {
      id: 3,
      title: "Arctic Ice Defenders",
      species: "Polar Bear",
      location: "Arctic Circle",
      urgency: "Medium",
      timeLeft: "2 weeks",
      participants: 1567,
      target: 2500,
      rewards: ["Legendary Polar Bear NFT", "500 GAIA Tokens", "Arctic Defender Badge"],
      description: "Long-term mission to preserve arctic ice habitat for polar bear families.",
      progress: 63,
      impact: "Preserve 200 km² of sea ice"
    }
  ];

  const scanAnimal = async () => {
    setScanning(true);
    await new Promise(resolve => setTimeout(resolve, SCAN_DELAY_MS));
    
    // Simulate AI identification
    const aiResult = {
      species: "Red Fox",
      confidence: 94,
      rarity: "Common",
      habitat: "Temperate Forest",
      conservationStatus: "Least Concern",
      suggestedActions: [
        "Document sighting in wildlife database",
        "Join local habitat protection mission",
        "Share educational content about foxes"
      ]
    };
    
    setScanning(false);
    // Would normally show results in a modal or new state
    alert(`AI Identified: ${aiResult.species} (${aiResult.confidence}% confidence)`);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case 'common': return 'border-gray-400 bg-gray-50';
      case 'rare': return 'border-blue-400 bg-blue-50';
      case 'epic': return 'border-purple-400 bg-purple-50';
      case 'legendary': return 'border-yellow-400 bg-yellow-50';
      case 'mythic': return 'border-pink-400 bg-pink-50 shadow-lg';
      default: return 'border-gray-400 bg-gray-50';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = {
    totalCards: 1247,
    animalsRescued: 894,
    activeMissions: 23,
    carbonSaved: "127.8 tons"
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Heart className="h-8 w-8 text-red-500" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              NFT Animal Rescue
            </h1>
            <Shield className="h-8 w-8 text-blue-500" />
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Collect, protect, and rescue endangered animals through blockchain technology and AI-powered conservation missions
          </p>
        </div>

        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold">{stats.totalCards.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">NFT Cards</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-red-500" />
                <div>
                  <p className="text-2xl font-bold">{stats.animalsRescued}</p>
                  <p className="text-sm text-muted-foreground">Animals Rescued</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{stats.activeMissions}</p>
                  <p className="text-sm text-muted-foreground">Active Missions</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{stats.carbonSaved}</p>
                  <p className="text-sm text-muted-foreground">CO₂ Saved</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Scanner */}
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Camera className="h-5 w-5 text-purple-500" />
              <span>AI Animal Scanner</span>
              <Badge className="bg-purple-100 text-purple-800">New</Badge>
            </CardTitle>
            <CardDescription>
              Use AI to identify animals in the wild and contribute to conservation efforts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Button 
                onClick={scanAnimal}
                disabled={scanning}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              >
                {scanning ? (
                  <>
                    <Scan className="h-4 w-4 mr-2 animate-pulse" />
                    AI Scanning...
                  </>
                ) : (
                  <>
                    <Camera className="h-4 w-4 mr-2" />
                    Scan Animal
                  </>
                )}
              </Button>
              <div className="text-sm text-muted-foreground">
                <p>Point camera at any animal to identify species and get conservation info</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="collection" className="flex items-center space-x-2">
              <Star className="h-4 w-4" />
              <span>My Collection</span>
            </TabsTrigger>
            <TabsTrigger value="missions" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Rescue Missions</span>
            </TabsTrigger>
            <TabsTrigger value="marketplace" className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span>Marketplace</span>
            </TabsTrigger>
          </TabsList>

          {/* My Collection Tab */}
          <TabsContent value="collection">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">My Animal Collection</h2>
                <div className="flex items-center space-x-2">
                  <Input placeholder="Search animals..." className="w-64" />
                  <Button variant="outline" size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {animalCards.map((animal) => (
                  <Card 
                    key={animal.id}
                    className={`cursor-pointer transition-all hover:scale-105 ${getRarityColor(animal.rarity)}`}
                    onClick={() => setSelectedAnimal(animal)}
                  >
                    <CardContent className="p-4">
                      <div className="aspect-[3/4] bg-gray-200 rounded-lg mb-4 relative overflow-hidden">
                        <img 
                          src={animal.image} 
                          alt={animal.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge className={`${getRarityColor(animal.rarity)} border-0`}>
                            {animal.rarity}
                          </Badge>
                        </div>
                        {animal.aiGenerated && (
                          <div className="absolute top-2 left-2">
                            <Badge className="bg-purple-100 text-purple-800 border-0">
                              <Sparkles className="h-3 w-3 mr-1" />
                              AI
                            </Badge>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-bold text-lg">{animal.name}</h3>
                        <p className="text-sm text-muted-foreground">{animal.species}</p>
                        
                        <div className="flex items-center justify-between">
                          <Badge variant={animal.status === 'Rescued' ? 'default' : 'secondary'}>
                            {animal.status}
                          </Badge>
                          <div className="text-right">
                            <p className="text-sm font-medium">Lv. {animal.level}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3 text-muted-foreground" />
                            <p className="text-xs text-muted-foreground">{animal.location}</p>
                          </div>
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="h-3 w-3 text-green-500" />
                            <p className="text-xs text-green-600">{animal.carbonSaved} CO₂ saved</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Rescue Missions Tab */}
          <TabsContent value="missions">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Active Rescue Missions</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {activeMissions.map((mission) => (
                  <Card key={mission.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{mission.title}</CardTitle>
                        <Badge className={getUrgencyColor(mission.urgency)}>
                          {mission.urgency}
                        </Badge>
                      </div>
                      <CardDescription>{mission.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{mission.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{mission.timeLeft} left</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{mission.participants.toLocaleString()} / {mission.target.toLocaleString()} participants</span>
                        </div>
                        <Progress value={mission.progress} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Mission Rewards:</p>
                        <div className="flex flex-wrap gap-1">
                          {mission.rewards.map((reward, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {reward}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Environmental Impact:</p>
                        <p className="text-sm text-green-600">{mission.impact}</p>
                      </div>
                      
                      <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                        <Heart className="h-4 w-4 mr-2" />
                        Join Mission
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Marketplace Tab */}
          <TabsContent value="marketplace">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">NFT Animal Marketplace</h2>
                <div className="flex items-center space-x-2">
                  <Input placeholder="Search marketplace..." className="w-64" />
                  <Button variant="outline" size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {animalCards.slice(0, 2).map((animal) => (
                  <Card key={`market-${animal.id}`} className={`${getRarityColor(animal.rarity)}`}>
                    <CardContent className="p-4">
                      <div className="aspect-[3/4] bg-gray-200 rounded-lg mb-4 relative overflow-hidden">
                        <img 
                          src={animal.image} 
                          alt={animal.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge className={`${getRarityColor(animal.rarity)} border-0`}>
                            {animal.rarity}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-bold">{animal.name}</h3>
                        <p className="text-sm text-muted-foreground">{animal.species}</p>
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-lg">250 GAIA</p>
                          <Button size="sm">
                            Buy Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default NFTAnimalRescue;