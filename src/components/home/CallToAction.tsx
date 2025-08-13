import { Button } from "@/components/ui/button";
import { ArrowRight, Gamepad2, TrendingUp, Music } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function CallToAction() {
  const navigate = useNavigate();

  const handleGameClick = () => {
    console.log("🎮 Navigating to GAiA Fighter Game");
    navigate("/gaia-fighter");
  };

  const handleExchangeClick = () => {
    console.log("💰 Navigating to GAiA Exchange");
    navigate("/exchange");
  };

  const handleArtistClick = () => {
    console.log("🎵 Navigating to Artist Streaming");
    navigate("/artist-streaming");
  };

  const handleMarketsClick = () => {
    console.log("📈 Navigating to Markets");
    navigate("/markets");
  };

  const handleSwapClick = () => {
    console.log("🔄 Navigating to Swap");
    navigate("/swap");
  };

  return (
    <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Ready to Join the Green Revolution?
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Experience the future of sustainable finance and entertainment with
          GAiA's ecosystem
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 justify-center max-w-6xl mx-auto">
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
            onClick={handleGameClick}
          >
            <Gamepad2 className="mr-2 h-5 w-5" />
            Play GAiA Fighter
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <Button size="lg" variant="outline" onClick={handleExchangeClick}>
            <TrendingUp className="mr-2 h-5 w-5" />
            GAiA Exchange
          </Button>

          <Button size="lg" variant="outline" onClick={handleMarketsClick}>
            <TrendingUp className="mr-2 h-5 w-5" />
            Live Markets
          </Button>

          <Button size="lg" variant="outline" onClick={handleSwapClick}>
            <ArrowRight className="mr-2 h-5 w-5" />
            GAiA Swap
          </Button>

          <Button size="lg" variant="outline" onClick={handleArtistClick}>
            <Music className="mr-2 h-5 w-5" />
            Live Artists
          </Button>
        </div>
      </div>
    </section>
  );
}
