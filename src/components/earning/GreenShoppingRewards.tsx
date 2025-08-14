import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { useEarningActivities } from "@/hooks/useEarningSystem";
import {
  ShoppingBag,
  Leaf,
  Recycle,
  Award,
  Star,
  CheckCircle,
  TrendingDown,
  Package,
} from "lucide-react";

export function GreenShoppingRewards() {
  const [shopType, setShopType] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [certifications, setCertifications] = useState<string[]>([]);
  const [packaging, setPackaging] = useState("");
  const { addActivity, loading } = useEarningActivities("user-123");

  const [shoppingStats] = useState({
    ecoProductsBought: 156,
    localBusinessesSupported: 23,
    plasticAvoided: 45.7,
    carbonFootprintReduced: 127.3,
    tokensEarned: 892,
  });

  const [recentPurchases] = useState([
    {
      id: "1",
      store: "Local Organic Market",
      category: "food",
      items: "Organic vegetables & fruits",
      certifications: ["organic", "local"],
      amount: 67.5,
      tokens: 135,
      date: "2024-02-08",
    },
    {
      id: "2",
      store: "Zero Waste Store",
      category: "household",
      items: "Bamboo cleaning supplies",
      certifications: ["plastic_free", "biodegradable"],
      amount: 34.2,
      tokens: 85,
      date: "2024-02-07",
    },
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!shopType || !itemCategory || !amount) {
      toast.error("Please fill in all required fields");
      return;
    }

    const categoryMultipliers = {
      food: 1.5,
      household: 1.3,
      clothing: 1.8,
      beauty: 1.4,
      electronics: 2.0,
      furniture: 2.2,
      transportation: 1.9,
      energy: 2.5,
    };

    const shopMultipliers = {
      local_organic: 2.0,
      farmers_market: 2.2,
      zero_waste_store: 2.5,
      thrift_store: 1.8,
      co_op: 1.9,
      fair_trade_shop: 2.1,
      sustainable_brand: 1.7,
      bulk_store: 1.6,
    };

    const certificationBonuses = {
      organic: 0.3,
      fair_trade: 0.4,
      plastic_free: 0.5,
      carbon_neutral: 0.6,
      biodegradable: 0.3,
      recyclable: 0.2,
      local: 0.4,
      renewable: 0.5,
    };

    const packagingBonuses = {
      no_packaging: 1.5,
      reusable_container: 1.3,
      compostable: 1.2,
      recyclable: 1.1,
      minimal: 1.1,
    };

    const basePoints = parseFloat(amount) * 2;
    const categoryBonus =
      basePoints * (categoryMultipliers[itemCategory as keyof typeof categoryMultipliers] || 1);
    const shopBonus =
      categoryBonus * (shopMultipliers[shopType as keyof typeof shopMultipliers] || 1);

    let certificationBonus = 0;
    certifications.forEach((cert) => {
      certificationBonus +=
        shopBonus * (certificationBonuses[cert as keyof typeof certificationBonuses] || 0);
    });

    const packagingBonus = packaging
      ? shopBonus * ((packagingBonuses[packaging as keyof typeof packagingBonuses] || 1) - 1)
      : 0;

    const totalPoints = Math.floor(shopBonus + certificationBonus + packagingBonus);
    const tokens = Math.floor(totalPoints * 0.3);

    const activity = {
      id: Date.now().toString(),
      type: "green_shopping",
      title: "Sustainable Shopping",
      amount: totalPoints,
      timestamp: new Date(),
      description: `Green shopping at ${shopType.replace("_", " ")}: ${itemCategory} items worth $${amount}`,
      status: "completed" as const,
      pointsEarned: totalPoints,
      tokensEarned: tokens,
      verified: true,
      metadata: {
        shopType,
        itemCategory,
        amount: parseFloat(amount),
        certifications: certifications.join(","),
        packaging,
      },
    };

    addActivity(activity);
    toast.success(
      `🛍️ Green shopping recorded! +${totalPoints} points earned for sustainable choices!`
    );
    setShopType("");
    setItemCategory("");
    setAmount("");
    setCertifications([]);
    setPackaging("");
  };

  const toggleCertification = (cert: string) => {
    setCertifications((prev) =>
      prev.includes(cert) ? prev.filter((c) => c !== cert) : [...prev, cert]
    );
  };

  const getCertificationIcon = (cert: string) => {
    switch (cert) {
      case "organic":
        return "🌱";
      case "fair_trade":
        return "⚖️";
      case "plastic_free":
        return "🚫";
      case "carbon_neutral":
        return "🌍";
      case "biodegradable":
        return "🍃";
      case "local":
        return "📍";
      default:
        return "✅";
    }
  };

  return (
    <Card className="border-emerald-500/30 bg-gradient-to-br from-emerald-900/20 via-green-900/20 to-teal-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-emerald-400">
          <ShoppingBag className="h-6 w-6" />
          🛍️ Green Shopping Rewards
          <Badge className="bg-emerald-600">Conscious Consumer</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Shopping Impact Dashboard */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-emerald-400">
            💚 Your Sustainable Shopping Impact
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center p-4 bg-emerald-900/30 rounded-lg border border-emerald-500/20">
              <div className="text-xl font-bold text-emerald-400">
                {shoppingStats.ecoProductsBought}
              </div>
              <div className="text-xs text-muted-foreground">Eco Products</div>
            </div>
            <div className="text-center p-4 bg-green-900/30 rounded-lg border border-green-500/20">
              <div className="text-xl font-bold text-green-400">
                {shoppingStats.localBusinessesSupported}
              </div>
              <div className="text-xs text-muted-foreground">Local Businesses</div>
            </div>
            <div className="text-center p-4 bg-blue-900/30 rounded-lg border border-blue-500/20">
              <div className="text-xl font-bold text-blue-400">
                {shoppingStats.plasticAvoided}kg
              </div>
              <div className="text-xs text-muted-foreground">Plastic Avoided</div>
            </div>
            <div className="text-center p-4 bg-purple-900/30 rounded-lg border border-purple-500/20">
              <div className="text-xl font-bold text-purple-400">
                {shoppingStats.carbonFootprintReduced}kg
              </div>
              <div className="text-xs text-muted-foreground">CO2 Reduced</div>
            </div>
            <div className="text-center p-4 bg-yellow-900/30 rounded-lg border border-yellow-500/20">
              <div className="text-xl font-bold text-yellow-400">{shoppingStats.tokensEarned}</div>
              <div className="text-xs text-muted-foreground">GAiA Earned</div>
            </div>
          </div>
        </div>

        {/* Recent Green Purchases */}
        <div className="space-y-3">
          <h4 className="font-semibold text-emerald-400 flex items-center gap-2">
            <Award className="h-4 w-4" />
            🏆 Recent Sustainable Purchases
          </h4>
          {recentPurchases.map((purchase) => (
            <div
              key={purchase.id}
              className="p-4 bg-emerald-900/20 rounded-lg border border-emerald-500/20"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-start gap-3">
                  <Package className="h-6 w-6 text-emerald-400 mt-1" />
                  <div>
                    <h5 className="font-semibold text-emerald-300">{purchase.store}</h5>
                    <p className="text-sm text-muted-foreground">{purchase.items}</p>
                    <div className="flex items-center gap-2 mt-2">
                      {purchase.certifications.map((cert, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs border-emerald-500/30"
                        >
                          {getCertificationIcon(cert)} {cert.replace("_", " ")}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-yellow-400">+{purchase.tokens} GAiA</div>
                  <div className="text-sm text-muted-foreground">${purchase.amount}</div>
                  <div className="text-xs text-muted-foreground">{purchase.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Record New Green Purchase */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 p-4 bg-gradient-to-r from-emerald-900/20 to-green-900/20 rounded-lg border border-emerald-500/20"
        >
          <h4 className="font-semibold text-emerald-400 flex items-center gap-2">
            <Star className="h-4 w-4" />
            Record Sustainable Purchase
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Shop Type</label>
              <Select value={shopType} onValueChange={setShopType}>
                <SelectTrigger>
                  <SelectValue placeholder="Where did you shop?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="local_organic">🏪 Local Organic Store (2x)</SelectItem>
                  <SelectItem value="farmers_market">🌾 Farmers Market (2.2x)</SelectItem>
                  <SelectItem value="zero_waste_store">♻️ Zero Waste Store (2.5x)</SelectItem>
                  <SelectItem value="thrift_store">👕 Thrift Store (1.8x)</SelectItem>
                  <SelectItem value="co_op">🤝 Co-op (1.9x)</SelectItem>
                  <SelectItem value="fair_trade_shop">⚖️ Fair Trade Shop (2.1x)</SelectItem>
                  <SelectItem value="sustainable_brand">🌱 Sustainable Brand (1.7x)</SelectItem>
                  <SelectItem value="bulk_store">📦 Bulk Store (1.6x)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Item Category</label>
              <Select value={itemCategory} onValueChange={setItemCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="What category?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="food">🥕 Food & Beverages (1.5x)</SelectItem>
                  <SelectItem value="household">🏠 Household Items (1.3x)</SelectItem>
                  <SelectItem value="clothing">👕 Clothing & Textiles (1.8x)</SelectItem>
                  <SelectItem value="beauty">💄 Beauty & Personal Care (1.4x)</SelectItem>
                  <SelectItem value="electronics">📱 Electronics (2x)</SelectItem>
                  <SelectItem value="furniture">🪑 Furniture & Home (2.2x)</SelectItem>
                  <SelectItem value="transportation">🚲 Transportation (1.9x)</SelectItem>
                  <SelectItem value="energy">⚡ Energy & Utilities (2.5x)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Purchase Amount ($)</label>
              <Input
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Total spent"
                min="0.01"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Packaging Type</label>
              <Select value={packaging} onValueChange={setPackaging}>
                <SelectTrigger>
                  <SelectValue placeholder="Packaging type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no_packaging">🚫 No Packaging (1.5x)</SelectItem>
                  <SelectItem value="reusable_container">♻️ Reusable Container (1.3x)</SelectItem>
                  <SelectItem value="compostable">🍃 Compostable (1.2x)</SelectItem>
                  <SelectItem value="recyclable">♻️ Recyclable (1.1x)</SelectItem>
                  <SelectItem value="minimal">📦 Minimal Packaging (1.1x)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Product Certifications (Select all that apply)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { value: "organic", label: "🌱 Organic", bonus: "+30%" },
                { value: "fair_trade", label: "⚖️ Fair Trade", bonus: "+40%" },
                {
                  value: "plastic_free",
                  label: "🚫 Plastic Free",
                  bonus: "+50%",
                },
                {
                  value: "carbon_neutral",
                  label: "🌍 Carbon Neutral",
                  bonus: "+60%",
                },
                {
                  value: "biodegradable",
                  label: "🍃 Biodegradable",
                  bonus: "+30%",
                },
                { value: "recyclable", label: "♻️ Recyclable", bonus: "+20%" },
                { value: "local", label: "📍 Local", bonus: "+40%" },
                { value: "renewable", label: "⚡ Renewable", bonus: "+50%" },
              ].map((cert) => (
                <Button
                  key={cert.value}
                  type="button"
                  variant={certifications.includes(cert.value) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleCertification(cert.value)}
                  className={`justify-start text-xs ${
                    certifications.includes(cert.value)
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : "border-emerald-500/30 text-emerald-400 hover:bg-emerald-900/20"
                  }`}
                >
                  <span className="truncate">{cert.label}</span>
                  <span className="ml-1 text-yellow-400">{cert.bonus}</span>
                </Button>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700"
          >
            {loading ? "Recording Purchase..." : "🛍️ Record Green Shopping (+2 pts per $)"}
          </Button>
        </form>

        <div className="p-4 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-lg border border-emerald-500/20">
          <p className="text-sm text-emerald-300">
            💡 <strong>Conscious Consumer Bonus:</strong> Certifications and packaging choices
            multiply your rewards! Support local businesses and choose plastic-free options for
            maximum GAiA earnings!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
