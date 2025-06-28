
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Globe2,
  Github,
  Twitter,
  Youtube,
  Book,
  Rocket,
  MessageSquare,
  Image,
  Code,
  LayoutDashboard,
  Settings,
  HelpCircle,
  Users,
  BarChart,
  TrendingUp,
  Zap,
  Shield,
  Flame,
  Leaf,
  Activity,
  Eye,
  Heart,
  Coins,
  MapPin,
  Target,
  TreePine,
  Sparkles,
  Apple,
  Globe,
  Wallet,
  Camera,
  Home,
  Utensils,
  Star,
  Crown,
  Brain,
  Atom,
  Mountain,
  Waves,
  Sun,
  Moon
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { RobotAdvertisement } from "@/components/advertising/RobotAdvertisement";
import { ExoticDefenseSystem } from "@/components/security/ExoticDefenseSystem";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900/20 via-zinc-900/50 to-zinc-900/20 text-white">
      {/* Robot Advertisement - Only on Home Page */}
      <RobotAdvertisement />
      
      <div className="container mx-auto p-8">

        {/* Hero Section */}
        <section className="text-center space-y-6 mb-12">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Harmony of Gaia
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The most powerful ecosystem connecting real animals, virtual worlds, and sustainable innovation through blockchain technology.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-gradient-to-r from-green-600 to-blue-600">
              <a href="/animal-nft-community">🦅 Animal NFT Community</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="/transparency">🔥 Transparency & Crafting</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="/gaming">🎮 Gaming Hub</a>
            </Button>
          </div>
        </section>

        {/* Exotic Defense System Section */}
        <section className="mb-12">
          <ExoticDefenseSystem />
        </section>

        {/* Key Features */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="bg-zinc-900/30 border-zinc-500">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe2 className="h-5 w-5 text-green-500" />
                <span>Global Community</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              Connect with a worldwide network of animal lovers, gamers, and innovators.
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/30 border-zinc-500">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Rocket className="h-5 w-5 text-blue-500" />
                <span>Sustainable Innovation</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              Invest in projects that create real-world impact and drive positive change.
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/30 border-zinc-500">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-purple-500" />
                <span>Virtual Worlds</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              Explore immersive gaming experiences and build your own virtual landscapes.
            </CardContent>
          </Card>
        </section>

        {/* Call to Action */}
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Ready to Join the Ecosystem?</h2>
          <p className="text-lg text-muted-foreground">
            Discover the endless possibilities of Harmony of Gaia and start making a difference today.
          </p>
          <div className="mt-6">
            <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600">
              Get Started Now
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-muted-foreground py-8">
          <p>
            © 2024 Harmony of Gaia. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
