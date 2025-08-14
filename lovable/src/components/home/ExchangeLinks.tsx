import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { GAIA_TOKEN } from "@/constants/gaia";

interface Exchange {
  name: string;
  url: string;
  description: string;
  status: "ACTIVE" | "PENDING";
}

const exchangeLinks: Exchange[] = [
  {
    name: "Pump.fun",
    url: GAIA_TOKEN.PUMP_FUN_URL,
    description: "Primary trading platform - Verified GAiA Token",
    status: "ACTIVE",
  },
  {
    name: "Binance",
    url: "#",
    description: "World's largest exchange - Legal docs submitted",
    status: "PENDING",
  },
  {
    name: "Revolut",
    url: "#",
    description: "European trading platform - Documentation complete",
    status: "PENDING",
  },
  {
    name: "Coinbase",
    url: "#",
    description: "Most trusted US exchange - Compliance ready",
    status: "PENDING",
  },
  {
    name: "Kraken",
    url: "#",
    description: "Advanced trading features - Ready for listing",
    status: "PENDING",
  },
];

export function ExchangeLinks() {
  return (
    <div className="mb-12">
      <Card className="bg-gradient-to-r from-green-900/20 via-blue-900/20 to-purple-900/20 border-2 border-green-500/50 shadow-2xl shadow-green-500/20">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 mb-4">
              💰 BUY GAiA TOKEN ON LEADING EXCHANGES
            </h2>
            <p className="text-xl text-muted-foreground">
              Trade our verified GAiA Token on the world's most trusted platforms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {exchangeLinks.map((exchange, index) => (
              <div key={index} className="relative group">
                <div className="bg-gradient-to-br from-gray-900/50 to-blue-900/50 border border-blue-500/30 rounded-lg p-6 text-center hover:scale-105 transition-all duration-300">
                  <div className="flex items-center justify-center mb-4">
                    <img
                      src="/lovable-uploads/4a9da668-4d21-4c1f-8585-bcdbfcd6700c.png"
                      alt="Gaia of Harmony Logo"
                      className="w-12 h-12 object-contain adaptive-logo-bg"
                    />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{exchange.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{exchange.description}</p>

                  <div className="mb-4">
                    {exchange.status === "ACTIVE" ? (
                      <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                        ✅ ACTIVE
                      </span>
                    ) : (
                      <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                        📋 DOCS SUBMITTED
                      </span>
                    )}
                  </div>

                  <Button
                    asChild
                    className={`w-full ${
                      exchange.status === "ACTIVE"
                        ? "bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                        : "bg-gray-600 cursor-not-allowed"
                    }`}
                    disabled={exchange.status !== "ACTIVE"}
                  >
                    <a href={exchange.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      {exchange.status === "ACTIVE" ? "TRADE NOW" : "COMING SOON"}
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
