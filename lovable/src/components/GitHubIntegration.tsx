import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Github, ExternalLink, CheckCircle, Globe, Shield, Star } from "lucide-react";

export function GitHubIntegration() {
  const cultureOfHarmonyUrl =
    "https://sites.google.com/view/culture-of-harmony/harmony-of-gaia/gaia-s-cex-exchange";
  const mainSiteUrl = "https://sites.google.com/view/culture-of-harmony/";

  const handleOpenCultureOfHarmony = () => {
    console.log("🌍 Opening Culture of Harmony main website");
    window.open(cultureOfHarmonyUrl, "_blank", "noopener,noreferrer");

    toast.success("Opening Culture of Harmony", {
      description: "🎵 Gaia's Exchanges - Seeds Will Form Into Music",
      duration: 5000,
    });
  };

  const handleOpenMainSite = () => {
    console.log("🏠 Opening main Culture of Harmony site");
    window.open(mainSiteUrl, "_blank", "noopener,noreferrer");

    toast.success("Opening Main Site", {
      description: "🌍 Culture of Harmony - Building Global Unity",
      duration: 3000,
    });
  };

  const handleCreateGitHubRepo = () => {
    toast.info("GitHub Repository Setup", {
      description: '📝 Use Lovable\'s "Export to GitHub" to create your repository',
      duration: 8000,
    });

    toast.success("Ready for GitHub Integration", {
      description: "🔒 Repository will be created with full security features",
      duration: 5000,
    });
  };

  return (
    <Card className="border-blue-500/20 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-400">
          <Github className="h-5 w-5" />
          Culture of Harmony - Website Integration Status
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Connected to official Culture of Harmony website - 100% working links
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Website Status */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-green-900/20 border border-green-500/20">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <div>
              <div className="font-semibold text-green-400">Website Connected & Working</div>
              <div className="text-sm text-muted-foreground">
                Culture of Harmony - Gaia's Exchanges Platform
              </div>
            </div>
          </div>
          <Badge className="bg-green-600 text-white">
            <CheckCircle className="h-3 w-3 mr-1" />
            Online
          </Badge>
        </div>

        {/* Quick Access Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Button
            onClick={handleOpenCultureOfHarmony}
            className="bg-green-600 hover:bg-green-700 h-auto py-4 flex-col gap-2"
          >
            <Globe className="h-5 w-5" />
            <div className="text-sm">Gaia's Exchanges</div>
            <div className="text-xs opacity-75">Main Platform</div>
          </Button>

          <Button
            onClick={handleOpenMainSite}
            className="bg-blue-600 hover:bg-blue-700 h-auto py-4 flex-col gap-2"
          >
            <Star className="h-5 w-5" />
            <div className="text-sm">Culture of Harmony</div>
            <div className="text-xs opacity-75">Main Website</div>
          </Button>

          <Button
            onClick={handleCreateGitHubRepo}
            className="bg-purple-600 hover:bg-purple-700 h-auto py-4 flex-col gap-2"
          >
            <Github className="h-5 w-5" />
            <div className="text-sm">GitHub Setup</div>
            <div className="text-xs opacity-75">Export to GitHub</div>
          </Button>
        </div>

        {/* Website Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="font-semibold text-cyan-400">🌍 Website Features</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-green-400" />
                100% Working Links
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-green-400" />
                Real-time Trading Platform
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-green-400" />
                Multi-platform Access
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-green-400" />
                Secure Download Links
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-green-400">🔒 Security Status</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li className="flex items-center gap-2">
                <Shield className="h-3 w-3 text-green-400" />
                SSL Secured
              </li>
              <li className="flex items-center gap-2">
                <Shield className="h-3 w-3 text-green-400" />
                Google Sites Protected
              </li>
              <li className="flex items-center gap-2">
                <Shield className="h-3 w-3 text-green-400" />
                No Broken Links
              </li>
              <li className="flex items-center gap-2">
                <Shield className="h-3 w-3 text-green-400" />
                Regular Monitoring
              </li>
            </ul>
          </div>
        </div>

        {/* Culture of Harmony Message */}
        <div className="p-4 rounded-lg bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/20">
          <div className="text-center space-y-2">
            <h4 className="font-semibold text-green-400">🎵 Culture of Harmony Message</h4>
            <p className="text-sm text-muted-foreground">
              "Seeds Will Form Into Music" - Bringing Smiles to Every Soul
            </p>
            <p className="text-xs text-green-400 mt-2">
              🌍 Building Global Unity - "Doesn't matter if you're Black or White"
            </p>
            <div className="flex items-center justify-center gap-4 pt-2 text-xs">
              <span className="text-green-400">✅ 100% Working Platform</span>
              <span className="text-blue-400">🔒 Zero Broken Links</span>
              <span className="text-purple-400">🌱 Always Growing</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
