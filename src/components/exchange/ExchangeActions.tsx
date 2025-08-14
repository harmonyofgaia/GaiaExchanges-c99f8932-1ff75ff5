import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpDown, TrendingUp, BarChart3, Wallet, Shield, Settings } from "lucide-react";
import { Link } from "react-router-dom";

export function ExchangeActions() {
  const actions = [
    {
      title: "🔄 Token Swap",
      description: "Instantly swap between different cryptocurrencies",
      path: "/swap",
      icon: ArrowUpDown,
      color: "from-blue-600 to-cyan-600",
    },
    {
      title: "📊 Trading Analytics",
      description: "Advanced charts and market analysis",
      path: "/exchange#analytics",
      icon: BarChart3,
      color: "from-green-600 to-emerald-600",
    },
    {
      title: "💰 Portfolio Management",
      description: "Track and manage your investments",
      path: "/transparency",
      icon: Wallet,
      color: "from-purple-600 to-indigo-600",
    },
    {
      title: "🔒 Security Settings",
      description: "Configure your account security",
      path: "/security",
      icon: Shield,
      color: "from-red-600 to-pink-600",
    },
    {
      title: "📈 Market Trends",
      description: "Real-time market data and trends",
      path: "/exchange#trends",
      icon: TrendingUp,
      color: "from-yellow-600 to-orange-600",
    },
    {
      title: "⚙️ Exchange Settings",
      description: "Customize your trading preferences",
      path: "/exchange#settings",
      icon: Settings,
      color: "from-gray-600 to-slate-600",
    },
  ];

  return (
    <Card className="mb-8 border-blue-500/30 bg-blue-900/20">
      <CardHeader>
        <CardTitle className="text-blue-400 text-center text-2xl">
          🚀 Exchange Actions Hub
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {actions.map((action, index) => {
            const Icon = action.icon;

            return (
              <div key={index} className="group">
                <Link to={action.path}>
                  <Card className="h-full border-gray-700 bg-gray-900/50 hover:bg-gray-800/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <CardContent className="p-6 text-center">
                      <div
                        className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${action.color} flex items-center justify-center`}
                      >
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{action.title}</h3>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
