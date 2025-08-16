import { useState, useEffect, useCallback} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ShoppingCart, Leaf, Users, MapPin, Calendar, Gift } from "lucide-react";

interface FoodPackage {
  id: string;
  name: string;
  contents: string[];
  nutritionalValue: number;
  environmentalImpact: "carbon-negative" | "zero-emission" | "regenerative";
  deliveryPartners: string[];
  value: number;
  availability: "available" | "preparing" | "delivered";
}

interface CommunityMember {
  id: string;
  name: string;
  loyaltyLevel: number;
  weeklyPackagesEarned: number;
  totalPackagesReceived: number;
  favoriteItems: string[];
  location: string;
}

export function FoodPackageSystem() {
  const [foodPackages] = useState<FoodPackage[]>([
    {
      id: "eco-premium",
      name: "🌱 Eco Premium Package",
      contents: [
        "Organic Vegetables (5kg)",
        "Fresh Fruits (3kg)",
        "Sustainable Grains (2kg)",
        "Plant-based Proteins",
        "Herbal Teas",
        "Raw Honey",
      ],
      nutritionalValue: 95,
      environmentalImpact: "carbon-negative",
      deliveryPartners: ["Whole Foods", "Kroger", "Safeway", "Local Co-ops"],
      value: 75,
      availability: "available",
    },
    {
      id: "green-family",
      name: "🍎 Green Family Package",
      contents: [
        "Family Vegetables (8kg)",
        "Seasonal Fruits (5kg)",
        "Whole Grains (3kg)",
        "Dairy Alternatives",
        "Healthy Snacks",
        "Seeds for Growing",
      ],
      nutritionalValue: 90,
      environmentalImpact: "zero-emission",
      deliveryPartners: ["Target", "Walmart", "Costco", "Sam's Club"],
      value: 100,
      availability: "available",
    },
    {
      id: "regenerative-deluxe",
      name: "🌿 Regenerative Deluxe",
      contents: [
        "Regenerative Farm Produce (6kg)",
        "Wild-caught Fish",
        "Grass-fed Alternatives",
        "Fermented Foods",
        "Superfoods Mix",
        "Garden Starter Kit",
      ],
      nutritionalValue: 98,
      environmentalImpact: "regenerative",
      deliveryPartners: ["Sprouts", "Trader Joe's", "Fresh Market", "Local Farms"],
      value: 120,
      availability: "preparing",
    },
  ]);

  const [communityStats, setCommunityStats] = useState({
    totalMembers: 847523,
    activeRecipients: 234567,
    packagesDelivered: 12456789,
    partnerStores: 45678,
    carbonOffset: 987654,
  });

  const [userRewards, setUserRewards] = useState({
    currentStreak: 12,
    nextPackageIn: 3,
    loyaltyPoints: 5400,
    specialOffers: 7,
  });

  useEffect(() => {
    const rewardEngine = () => {
      setCommunityStats((prev) => ({
        ...prev,
        totalMembers: prev.totalMembers + Math.floor(Math.random() * 50),
        activeRecipients: prev.activeRecipients + Math.floor(Math.random() * 20),
        packagesDelivered: prev.packagesDelivered + Math.floor(Math.random() * 100),
        carbonOffset: prev.carbonOffset + Math.floor(Math.random() * 10)
      }));

      if (Math.random() < 0.15) {
        const rewards = [
          "🎁 New partner store added to your area!",
          "🌱 Extra organic items added to your package",
          "🎯 Loyalty bonus: Double rewards this week",
          "📦 Premium upgrade available for your next package",
          "🌟 Special seasonal items now available",
          "🏆 Community milestone reached - bonus package!",
        ];

        const reward = rewards[Math.floor(Math.random() * rewards.length)];
        toast.success("🎁 Food Package Reward!", {
          description: reward,
          duration: 4000,
        });
      }
    };

    const interval = setInterval(rewardEngine, 4000);
    return () => clearInterval(interval);
  }, []);

  const claimWeeklyPackage = () => {
    toast.success("📦 Weekly Package Claimed!", {
      description: "Your Eco Premium Package will be ready for pickup in 24 hours",
      duration: 5000,
    });

    setUserRewards((prev) => ({
      ...prev,
      currentStreak: prev.currentStreak + 1,
      nextPackageIn: 7,
      loyaltyPoints: prev.loyaltyPoints + 100,
    }));
  };

  const inviteFriends = () => {
    toast.success("👥 Invitation Sent!", {
      description: "Share the abundance! Each friend you invite gets a starter package",
      duration: 4000,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-green-500/50 bg-gradient-to-r from-green-900/30 to-emerald-900/30">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-green-400">
            🍎 GAIA COMMUNITY FOOD ABUNDANCE PROGRAM
          </CardTitle>
          <p className="text-center text-xl text-green-300">
            Free Weekly Food Packages • Sustainable Living • Community Support • Environmental
            Impact
          </p>
        </CardHeader>
      </Card>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="border-green-400/30 bg-green-900/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-400">
              {communityStats.totalMembers.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Community Members</div>
          </CardContent>
        </Card>
        <Card className="border-blue-400/30 bg-blue-900/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">
              {communityStats.activeRecipients.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Active Recipients</div>
          </CardContent>
        </Card>
        <Card className="border-purple-400/30 bg-purple-900/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">
              {communityStats.packagesDelivered.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Packages Delivered</div>
          </CardContent>
        </Card>
        <Card className="border-orange-400/30 bg-orange-900/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-400">
              {communityStats.partnerStores.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Partner Stores</div>
          </CardContent>
        </Card>
        <Card className="border-emerald-400/30 bg-emerald-900/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400">
              {communityStats.carbonOffset.toLocaleString()}kg
            </div>
            <div className="text-sm text-muted-foreground">Carbon Offset</div>
          </CardContent>
        </Card>
      </div>

      {/* User Rewards Status */}
      <Card className="border-gold-500/50 bg-gradient-to-r from-gold-900/30 to-yellow-900/30">
        <CardHeader>
          <CardTitle className="text-gold-400 flex items-center gap-2">
            <Gift className="h-6 w-6" />
            Your Food Package Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-green-900/30 rounded-lg">
              <div className="text-xl font-bold text-green-400">
                {userRewards.currentStreak} weeks
              </div>
              <div className="text-xs text-muted-foreground">Current Streak</div>
            </div>
            <div className="text-center p-3 bg-blue-900/30 rounded-lg">
              <div className="text-xl font-bold text-blue-400">
                {userRewards.nextPackageIn} days
              </div>
              <div className="text-xs text-muted-foreground">Next Package</div>
            </div>
            <div className="text-center p-3 bg-purple-900/30 rounded-lg">
              <div className="text-xl font-bold text-purple-400">
                {userRewards.loyaltyPoints.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">Loyalty Points</div>
            </div>
            <div className="text-center p-3 bg-orange-900/30 rounded-lg">
              <div className="text-xl font-bold text-orange-400">{userRewards.specialOffers}</div>
              <div className="text-xs text-muted-foreground">Special Offers</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Packages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {foodPackages.map((pkg) => (
          <Card
            key={pkg.id}
            className="border-green-400/30 bg-gradient-to-br from-green-900/20 to-emerald-900/20"
          >
            <CardHeader>
              <CardTitle className="text-green-300">{pkg.name}</CardTitle>
              <div className="flex flex-wrap gap-2">
                <Badge
                  className={`${
                    pkg.environmentalImpact === "carbon-negative"
                      ? "bg-green-600"
                      : pkg.environmentalImpact === "regenerative"
                        ? "bg-emerald-600"
                        : "bg-blue-600"
                  }`}
                >
                  {pkg.environmentalImpact}
                </Badge>
                <Badge
                  className={`${
                    pkg.availability === "available"
                      ? "bg-green-600"
                      : pkg.availability === "preparing"
                        ? "bg-orange-600"
                        : "bg-gray-600"
                  }`}
                >
                  {pkg.availability}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-semibold text-green-400 mb-2">Package Contents:</div>
                <div className="space-y-1">
                  {pkg.contents.map((item, idx) => (
                    <div
                      key={idx}
                      className="text-sm text-muted-foreground flex items-center gap-2"
                    >
                      <Leaf className="h-3 w-3 text-green-400" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-center">
                  <div className="text-lg font-bold text-green-400">${pkg.value}</div>
                  <div className="text-xs text-muted-foreground">Value</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-emerald-400">{pkg.nutritionalValue}%</div>
                  <div className="text-xs text-muted-foreground">Nutrition Score</div>
                </div>
              </div>

              <div>
                <div className="text-sm font-semibold text-blue-400 mb-2">Available at:</div>
                <div className="flex flex-wrap gap-1">
                  {pkg.deliveryPartners.map((partner, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="text-xs border-blue-400/50 text-blue-300"
                    >
                      {partner}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center flex-wrap">
        <Button
          onClick={claimWeeklyPackage}
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 animate-pulse"
        >
          <Gift className="h-5 w-5 mr-2" />
          CLAIM THIS WEEK'S PACKAGE
        </Button>
        <Button
          onClick={inviteFriends}
          variant="outline"
          className="border-green-500 text-green-400"
        >
          <Users className="h-5 w-5 mr-2" />
          INVITE FRIENDS
        </Button>
        <Button variant="outline" className="border-blue-500 text-blue-400">
          <MapPin className="h-5 w-5 mr-2" />
          FIND STORES
        </Button>
        <Button variant="outline" className="border-purple-500 text-purple-400">
          <Calendar className="h-5 w-5 mr-2" />
          DELIVERY SCHEDULE
        </Button>
      </div>

      {/* How It Works */}
      <Card className="border-blue-500/50 bg-gradient-to-r from-blue-900/30 to-cyan-900/30">
        <CardHeader>
          <CardTitle className="text-blue-400">🎯 How the Food Abundance Program Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-900/30 rounded-lg">
              <div className="text-3xl mb-2">1️⃣</div>
              <div className="font-semibold text-blue-300">Join Community</div>
              <div className="text-sm text-muted-foreground">
                Become a GAIA community member and start earning food credits
              </div>
            </div>
            <div className="text-center p-4 bg-green-900/30 rounded-lg">
              <div className="text-3xl mb-2">2️⃣</div>
              <div className="font-semibold text-green-300">Participate</div>
              <div className="text-sm text-muted-foreground">
                Trade, play games, help the environment - all activities earn rewards
              </div>
            </div>
            <div className="text-center p-4 bg-purple-900/30 rounded-lg">
              <div className="text-3xl mb-2">3️⃣</div>
              <div className="font-semibold text-purple-300">Choose Package</div>
              <div className="text-sm text-muted-foreground">
                Select your preferred food package based on dietary needs
              </div>
            </div>
            <div className="text-center p-4 bg-orange-900/30 rounded-lg">
              <div className="text-3xl mb-2">4️⃣</div>
              <div className="font-semibold text-orange-300">Collect Weekly</div>
              <div className="text-sm text-muted-foreground">
                Pick up your free package at any partner store location
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
