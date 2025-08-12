import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UniversalGaiaLogo } from "@/components/branding/UniversalGaiaLogo";
import { Mail, MessageCircle, Globe, Heart } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-green-900/20">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center mb-8">
          <UniversalGaiaLogo
            size="lg"
            animated={true}
            showText={true}
            className="hover:scale-105 transition-transform duration-300"
          />
        </div>

        <Card className="border-blue-500/30 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              📞 Contact GAiA Universe
            </CardTitle>
            <p className="text-center text-xl text-muted-foreground">
              Connect with our Harmony of Culture Community
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-blue-900/30 rounded-lg border border-blue-500/30">
                <Mail className="h-12 w-12 mx-auto text-blue-400 animate-pulse mb-4" />
                <div className="text-xl font-bold text-blue-400">Email</div>
                <div className="text-sm text-muted-foreground">
                  harmony@gaia-universe.com
                </div>
              </div>

              <div className="text-center p-6 bg-purple-900/30 rounded-lg border border-purple-500/30">
                <MessageCircle className="h-12 w-12 mx-auto text-purple-400 animate-pulse mb-4" />
                <div className="text-xl font-bold text-purple-400">
                  Community
                </div>
                <div className="text-sm text-muted-foreground">
                  Join our Discord
                </div>
              </div>

              <div className="text-center p-6 bg-green-900/30 rounded-lg border border-green-500/30">
                <Globe className="h-12 w-12 mx-auto text-green-400 animate-pulse mb-4" />
                <div className="text-xl font-bold text-green-400">Website</div>
                <div className="text-sm text-muted-foreground">
                  gaia-harmony.com
                </div>
              </div>

              <div className="text-center p-6 bg-pink-900/30 rounded-lg border border-pink-500/30">
                <Heart className="h-12 w-12 mx-auto text-pink-400 animate-pulse mb-4" />
                <div className="text-xl font-bold text-pink-400">Support</div>
                <div className="text-sm text-muted-foreground">
                  24/7 Quantum Help
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
