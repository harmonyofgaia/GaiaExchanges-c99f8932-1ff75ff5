import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import {
  User,
  Music,
  Palette,
  Video,
  DollarSign,
  Target,
  TreePine,
  Heart,
  Shield,
  Zap,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";
import { GAIA_TOKEN } from "@/constants/gaia";
import { gaiaTokenService } from "@/services/gaiaTokenService";

interface FundAllocation {
  project: string;
  percentage: number;
  description: string;
  icon: React.ReactNode;
}

export function ArtistRegistration() {
  const [artistData, setArtistData] = useState({
    name: "",
    email: "",
    artistType: "",
    bio: "",
    socialMedia: "",
    portfolio: "",
  });

  const [fundAllocations, setFundAllocations] = useState<FundAllocation[]>([
    {
      project: "Environmental Conservation",
      percentage: 25,
      description: "Tree planting and wildlife protection",
      icon: <TreePine className="h-4 w-4" />,
    },
    {
      project: "Community Support",
      percentage: 25,
      description: "Local community development projects",
      icon: <Heart className="h-4 w-4" />,
    },
    {
      project: "Platform Development",
      percentage: 25,
      description: "Improving GAiA platform features",
      icon: <Zap className="h-4 w-4" />,
    },
    {
      project: "Artist Fund",
      percentage: 25,
      description: "Supporting other emerging artists",
      icon: <Palette className="h-4 w-4" />,
    },
  ]);

  const [isRegistered, setIsRegistered] = useState(false);
  const [showFundSetup, setShowFundSetup] = useState(false);

  const handlePercentageChange = (index: number, newPercentage: number) => {
    const updatedAllocations = [...fundAllocations];
    updatedAllocations[index].percentage = Math.max(0, Math.min(100, newPercentage));

    // Auto-adjust other percentages to maintain 100% total
    const total = updatedAllocations.reduce((sum, alloc) => sum + alloc.percentage, 0);
    if (total !== 100) {
      const diff = 100 - total;
      const otherIndices = updatedAllocations.map((_, i) => i).filter((i) => i !== index);
      const adjustment = diff / otherIndices.length;
      otherIndices.forEach((i) => {
        updatedAllocations[i].percentage = Math.max(
          0,
          updatedAllocations[i].percentage + adjustment
        );
      });
    }

    setFundAllocations(updatedAllocations);
  };

  const handleRegistration = async () => {
    try {
      // Simulate artist registration
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("🎨 Artist Registration Successful!", {
        description: `Welcome ${artistData.name}! You can now start streaming and earning GAiA tokens.`,
        duration: 5000,
      });

      setIsRegistered(true);
      console.log("🎨 ARTIST REGISTERED:", {
        artist: artistData,
        fundAllocations,
        gaiaContract: GAIA_TOKEN.CONTRACT_ADDRESS,
        gaiaWallet: GAIA_TOKEN.WALLET_ADDRESS,
      });
    } catch (error) {
      toast.error("Registration failed - please try again");
    }
  };

  const handleFundAllocationSave = async () => {
    try {
      // Burn tokens for fund allocation setup
      const burnSuccess = await gaiaTokenService.burnTokens(
        50,
        `Fund allocation setup for ${artistData.name}`
      );

      if (burnSuccess) {
        toast.success("💰 Fund Allocation Configured!", {
          description: "Your streaming earnings will be distributed according to your preferences.",
          duration: 4000,
        });

        setShowFundSetup(false);
      }
    } catch (error) {
      toast.error("Fund setup failed - please try again");
    }
  };

  const totalPercentage = fundAllocations.reduce((sum, alloc) => sum + alloc.percentage, 0);

  return (
    <div className="space-y-6">
      {/* Registration Header */}
      <Card className="border-2 border-purple-500/50 bg-gradient-to-br from-purple-900/30 to-pink-900/30">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center gap-2">
            <User className="h-6 w-6" />
            🎭 GAiA Artist Registration & Fund Management
          </CardTitle>
          <p className="text-muted-foreground">
            Register as an artist and configure how your streaming earnings support various causes
          </p>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-2">
            <div className="text-sm text-green-400">
              <strong>GAiA Contract:</strong>{" "}
              <code className="font-mono text-xs bg-black/20 px-2 py-1 rounded">
                {GAIA_TOKEN.CONTRACT_ADDRESS}
              </code>
            </div>
            <div className="text-sm text-blue-400">
              <strong>Wallet:</strong>{" "}
              <code className="font-mono text-xs bg-black/20 px-2 py-1 rounded">
                {GAIA_TOKEN.WALLET_ADDRESS}
              </code>
            </div>
          </div>
        </CardContent>
      </Card>

      {!isRegistered ? (
        /* Artist Registration Form */
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl">Artist Registration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Artist Name *</label>
                <Input
                  value={artistData.name}
                  onChange={(e) => setArtistData({ ...artistData, name: e.target.value })}
                  placeholder="Your artistic name"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email *</label>
                <Input
                  type="email"
                  value={artistData.email}
                  onChange={(e) => setArtistData({ ...artistData, email: e.target.value })}
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Artist Type</label>
              <select
                value={artistData.artistType}
                onChange={(e) => setArtistData({ ...artistData, artistType: e.target.value })}
                className="w-full px-3 py-2 bg-muted border border-border rounded-md"
              >
                <option value="">Select your art form</option>
                <option value="Digital Artist">Digital Artist</option>
                <option value="Musician">Musician</option>
                <option value="Painter">Painter</option>
                <option value="Sculptor">Sculptor</option>
                <option value="Mixed Media">Mixed Media</option>
                <option value="Performance Artist">Performance Artist</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Bio</label>
              <Textarea
                value={artistData.bio}
                onChange={(e) => setArtistData({ ...artistData, bio: e.target.value })}
                placeholder="Tell us about your artistic journey..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Social Media</label>
                <Input
                  value={artistData.socialMedia}
                  onChange={(e) =>
                    setArtistData({
                      ...artistData,
                      socialMedia: e.target.value,
                    })
                  }
                  placeholder="@yourhandle or profile URL"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Portfolio</label>
                <Input
                  value={artistData.portfolio}
                  onChange={(e) => setArtistData({ ...artistData, portfolio: e.target.value })}
                  placeholder="Portfolio website or gallery"
                />
              </div>
            </div>

            <Button
              onClick={handleRegistration}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-80"
              disabled={!artistData.name || !artistData.email}
            >
              <User className="h-4 w-4 mr-2" />
              Register as GAiA Artist
            </Button>
          </CardContent>
        </Card>
      ) : (
        /* Artist Dashboard */
        <div className="space-y-6">
          <Card className="border-2 border-green-500/50 bg-gradient-to-br from-green-900/20 to-emerald-900/20">
            <CardContent className="pt-6">
              <div className="text-center">
                <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-400 mb-2">
                  Welcome, {artistData.name}!
                </h3>
                <p className="text-muted-foreground">
                  You're now registered as a GAiA artist and can start streaming.
                </p>
                <div className="flex justify-center gap-4 mt-4">
                  <Badge className="bg-purple-600 text-white">
                    <Music className="h-3 w-3 mr-1" />
                    Streaming Ready
                  </Badge>
                  <Badge className="bg-green-600 text-white">
                    <DollarSign className="h-3 w-3 mr-1" />
                    GAiA Enabled
                  </Badge>
                  <Badge className="bg-blue-600 text-white">
                    <Shield className="h-3 w-3 mr-1" />
                    Verified Artist
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fund Allocation Setup */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-6 w-6" />
                Fund Allocation Management
              </CardTitle>
              <p className="text-muted-foreground">
                Configure how your streaming earnings are distributed to support various causes
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {!showFundSetup ? (
                <div className="text-center">
                  <Button
                    onClick={() => setShowFundSetup(true)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600"
                  >
                    <Target className="h-4 w-4 mr-2" />
                    Configure Fund Allocation
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-center mb-6">
                    <div className="text-lg font-bold text-muted-foreground">
                      Total Allocation: {totalPercentage.toFixed(1)}%
                    </div>
                    <Progress value={totalPercentage} className="h-3 mt-2" />
                  </div>

                  {fundAllocations.map((allocation, index) => (
                    <div key={index} className="p-4 bg-muted/30 rounded-lg border border-border/50">
                      <div className="flex items-center gap-3 mb-2">
                        {allocation.icon}
                        <h4 className="font-semibold">{allocation.project}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{allocation.description}</p>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={allocation.percentage}
                          onChange={(e) =>
                            handlePercentageChange(index, parseFloat(e.target.value) || 0)
                          }
                          className="w-20"
                        />
                        <span className="text-sm text-muted-foreground">%</span>
                        <Progress value={allocation.percentage} className="flex-1 h-2" />
                      </div>
                    </div>
                  ))}

                  <div className="flex gap-2">
                    <Button
                      onClick={handleFundAllocationSave}
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600"
                      disabled={Math.abs(totalPercentage - 100) > 0.1}
                    >
                      <Target className="h-4 w-4 mr-2" />
                      Save Fund Allocation
                    </Button>
                    <Button onClick={() => setShowFundSetup(false)} variant="outline">
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
