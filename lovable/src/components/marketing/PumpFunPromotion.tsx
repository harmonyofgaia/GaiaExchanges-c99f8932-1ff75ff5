import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Rocket, TrendingUp, Zap } from "lucide-react";
import { toast } from "sonner";

export function PumpFunPromotion() {
  const [currentMessage, setCurrentMessage] = useState("");
  const [viralCount, setViralCount] = useState(0);

  const pumpFunMessages = [
    `🚀 BABY BOOM INCOMING: GAiA Token about to EXPLODE on pump.fun! 

🌍 Most secure eco-crypto launching NOW
💚 Zero fees, infinite potential, dragon-protected security
🔥 Get in before the massive pump - Last chance!
⚡ Flying high to save the world while making you rich

Contract: 5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh

#GAiAToken #PumpFun #CryptoRevolution #BabyBoom #ToTheMoon #EcoCrypto

Don't miss the flight! 🚀🌙`,

    `💎 BREAKING: GAiA Token - The baby boom that will change crypto forever!

🛡️ Quantum-level security + Zero trading fees
🌱 Environmental impact tracking built-in
🎮 Gaming ecosystem + NFT marketplace
💰 Infinite supply potential with controlled burns

This is NOT financial advice - This is LIFE ADVICE! 

#GAiA #PumpFun #NextBigThing #CryptoGems #MillionaireMaker`,

    `🔥 PUMP.FUN EXCLUSIVE: GAiA Token presale ending SOON!

Why GAiA will moon:
✅ Dragon-powered security (unhackable)
✅ Zero transaction fees (forever)
✅ Environmental focus (save the planet)
✅ Gaming integration (play to earn)
✅ Community-driven (true democracy)

Contract: 5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh

#LastChance #GAiAToken #PumpItUp #ToTheMoon`,

    `⚡ URGENT: GAiA Token baby boom starting in 24 hours!

🎯 Target: $1M market cap in first week
🚀 Prediction: 100x potential within 30 days
💚 Mission: Save Earth while getting rich
🛡️ Security: Military-grade dragon protection

Get your bag before the masses wake up!

#GAiA #PumpFun #BabyBoom #EarlyInvestor #CryptoAlpha`,

    `🌟 FINAL CALL: GAiA Token - The most secure crypto ever created!

🔒 Unhackable quantum security
🌍 Global environmental impact
💎 Limited presale spots remaining
🚀 Pump.fun launch imminent

This will be the last time you see these prices!

Contract: 5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh

#FinalCall #GAiAToken #CryptoRevolution #LastChance`,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomMessage = pumpFunMessages[Math.floor(Math.random() * pumpFunMessages.length)];
      setCurrentMessage(randomMessage);
      setViralCount((prev) => prev + Math.floor(Math.random() * 100));
    }, 10000);

    // Set initial message
    setCurrentMessage(pumpFunMessages[0]);

    return () => clearInterval(interval);
  }, [pumpFunMessages]);

  const copyMessage = () => {
    navigator.clipboard.writeText(currentMessage);
    toast.success("🚀 Pump.Fun Message Copied!", {
      description: "Ready to paste on pump.fun and social media",
      duration: 3000,
    });
  };

  const generateNewMessage = () => {
    const randomMessage = pumpFunMessages[Math.floor(Math.random() * pumpFunMessages.length)];
    setCurrentMessage(randomMessage);
    toast.success("🎯 New Viral Message Generated!", {
      description: "Optimized for maximum pump.fun engagement",
    });
  };

  return (
    <Card className="border-2 border-orange-500/50 bg-gradient-to-r from-orange-900/20 to-red-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-400">
          <Rocket className="h-6 w-6 animate-bounce" />
          🎯 PUMP.FUN VIRAL PROMOTION ENGINE
          <Badge className="bg-red-600 animate-pulse">BABY BOOM</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-900/30 rounded-lg">
            <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-400">{viralCount.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Viral Impressions</div>
          </div>
          <div className="text-center p-4 bg-purple-900/30 rounded-lg">
            <Zap className="h-8 w-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-400">100%</div>
            <div className="text-xs text-muted-foreground">Pump Rate</div>
          </div>
          <div className="text-center p-4 bg-red-900/30 rounded-lg">
            <Rocket className="h-8 w-8 text-red-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-red-400">ACTIVE</div>
            <div className="text-xs text-muted-foreground">Baby Boom</div>
          </div>
        </div>

        <div className="space-y-4">
          <Textarea
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            className="min-h-64 bg-black/20 border-orange-500/20 text-orange-100"
            placeholder="Viral pump.fun message will appear here..."
          />

          <div className="flex gap-4">
            <Button onClick={copyMessage} className="flex-1 bg-green-600 hover:bg-green-700">
              <Copy className="h-4 w-4 mr-2" />
              📋 Copy for Pump.Fun
            </Button>
            <Button
              onClick={generateNewMessage}
              className="flex-1 bg-purple-600 hover:bg-purple-700"
            >
              <Zap className="h-4 w-4 mr-2" />
              🎯 Generate New Message
            </Button>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-900/40 to-orange-900/40 p-4 rounded-lg border border-red-500/30">
          <h4 className="font-bold text-red-400 mb-2">🚀 Pump.Fun Strategy:</h4>
          <ul className="text-sm text-red-300 space-y-1">
            <li>• Post every 2-3 hours for maximum visibility</li>
            <li>• Use trending hashtags: #PumpFun #BabyBoom #ToTheMoon</li>
            <li>• Include GAiA contract address for easy buying</li>
            <li>• Emphasize security and environmental benefits</li>
            <li>• Create FOMO with limited time offers</li>
            <li>• Engage with other pump.fun communities</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
