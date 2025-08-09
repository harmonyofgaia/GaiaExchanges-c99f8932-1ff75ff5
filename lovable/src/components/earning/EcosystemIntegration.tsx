import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Globe,
  ShoppingCart,
  CreditCard,
  Smartphone,
  Zap,
  DollarSign,
  ExternalLink,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";

interface Partner {
  id: string;
  name: string;
  category: "retail" | "finance" | "technology" | "energy";
  discount: number;
  description: string;
  logo: string;
  tokensRequired: number;
  isConnected: boolean;
}

interface Integration {
  id: string;
  name: string;
  type: "wallet" | "payment" | "marketplace" | "carbon";
  status: "connected" | "available" | "coming-soon";
  description: string;
  benefits: string[];
}

export function EcosystemIntegration() {
  const [partners] = useState<Partner[]>([
    {
      id: "1",
      name: "EcoMarket",
      category: "retail",
      discount: 20,
      description: "Sustainable products and eco-friendly alternatives",
      logo: "🛒",
      tokensRequired: 100,
      isConnected: true,
    },
    {
      id: "2",
      name: "Green Bank",
      category: "finance",
      discount: 15,
      description: "Ethical banking and sustainable investments",
      logo: "🏦",
      tokensRequired: 500,
      isConnected: false,
    },
    {
      id: "3",
      name: "Solar Plus",
      category: "energy",
      discount: 25,
      description: "Solar panel installation and renewable energy",
      logo: "☀️",
      tokensRequired: 1000,
      isConnected: true,
    },
  ]);

  const [integrations] = useState<Integration[]>([
    {
      id: "1",
      name: "MetaMask Wallet",
      type: "wallet",
      status: "connected",
      description: "Connect your crypto wallet for seamless transactions",
      benefits: ["Direct token transfers", "DeFi integration", "NFT support"],
    },
    {
      id: "2",
      name: "Carbon Credit Marketplace",
      type: "carbon",
      status: "available",
      description: "Trade verified carbon credits using GAiA tokens",
      benefits: [
        "Real impact verification",
        "Global marketplace",
        "Instant settlements",
      ],
    },
    {
      id: "3",
      name: "Mobile Payment Gateway",
      type: "payment",
      status: "coming-soon",
      description: "Use GAiA tokens for everyday purchases",
      benefits: ["QR code payments", "Merchant network", "Cashback rewards"],
    },
  ]);

  const connectPartner = (partnerId: string) => {
    toast.success("Partner Connected!", {
      description: "You can now enjoy exclusive discounts and benefits!",
      duration: 4000,
    });
  };

  const connectIntegration = (integrationId: string) => {
    toast.success("Integration Connected!", {
      description: "Your account has been linked successfully!",
      duration: 4000,
    });
  };

  const getCategoryIcon = (category: Partner["category"]) => {
    switch (category) {
      case "retail":
        return ShoppingCart;
      case "finance":
        return CreditCard;
      case "technology":
        return Smartphone;
      case "energy":
        return Zap;
      default:
        return Globe;
    }
  };

  const getStatusColor = (status: Integration["status"]) => {
    switch (status) {
      case "connected":
        return "bg-green-600";
      case "available":
        return "bg-blue-600";
      case "coming-soon":
        return "bg-yellow-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-cyan-500/30 bg-gradient-to-br from-cyan-900/20 to-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-cyan-400">
            <Globe className="h-6 w-6" />
            🌐 Ecosystem Integration
            <Badge className="bg-cyan-600">Phase 3</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Partner Network */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-cyan-400">
                🤝 Partner Network
              </h3>

              {partners.map((partner) => {
                const Icon = getCategoryIcon(partner.category);

                return (
                  <Card key={partner.id} className="border-cyan-500/20">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{partner.logo}</div>
                          <div>
                            <h4 className="font-semibold">{partner.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {partner.description}
                            </p>
                          </div>
                        </div>
                        <Icon className="h-5 w-5 text-cyan-400" />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-600">
                            {partner.discount}% OFF
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {partner.tokensRequired} GAiA required
                          </span>
                        </div>

                        <Button
                          size="sm"
                          onClick={() => connectPartner(partner.id)}
                          disabled={partner.isConnected}
                          variant={
                            partner.isConnected ? "secondary" : "default"
                          }
                        >
                          {partner.isConnected ? (
                            <>
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Connected
                            </>
                          ) : (
                            "Connect"
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* System Integrations */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-cyan-400">
                🔗 System Integrations
              </h3>

              {integrations.map((integration) => (
                <Card key={integration.id} className="border-blue-500/20">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{integration.name}</h4>
                          <Badge className={getStatusColor(integration.status)}>
                            {integration.status.replace("-", " ").toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {integration.description}
                        </p>
                        <div className="space-y-1">
                          {integration.benefits.map((benefit, index) => (
                            <div
                              key={index}
                              className="text-xs text-blue-300 flex items-center gap-1"
                            >
                              <CheckCircle className="h-3 w-3" />
                              {benefit}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      className="w-full"
                      onClick={() => connectIntegration(integration.id)}
                      disabled={
                        integration.status === "coming-soon" ||
                        integration.status === "connected"
                      }
                      variant={
                        integration.status === "connected"
                          ? "secondary"
                          : "default"
                      }
                    >
                      {integration.status === "connected"
                        ? "✅ Connected"
                        : integration.status === "coming-soon"
                          ? "🚧 Coming Soon"
                          : "🔗 Connect"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Integration Stats */}
          <div className="mt-6 p-4 bg-cyan-900/20 rounded-lg border border-cyan-500/30">
            <h4 className="font-semibold text-cyan-400 mb-3">
              📊 Integration Benefits
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-400">$245</div>
                <div className="text-xs text-muted-foreground">
                  Saved through discounts
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400">8</div>
                <div className="text-xs text-muted-foreground">
                  Connected services
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400">2.4x</div>
                <div className="text-xs text-muted-foreground">
                  Token utility multiplier
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
