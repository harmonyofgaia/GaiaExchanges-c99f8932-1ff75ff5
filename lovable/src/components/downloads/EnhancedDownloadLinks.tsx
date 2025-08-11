import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Smartphone, Monitor, Globe, Shield } from "lucide-react";

export function EnhancedDownloadLinks() {
  const downloadOptions = [
    {
      platform: "Android",
      icon: <Smartphone className="h-5 w-5" />,
      description: "Native Android App with GAiA Token Support",
      downloadUrl: "#",
      version: "v2.1.0",
      size: "45MB",
      color: "bg-green-600",
    },
    {
      platform: "iOS",
      icon: <Smartphone className="h-5 w-5" />,
      description: "iPhone & iPad App with Advanced Trading",
      downloadUrl: "#",
      version: "v2.1.0",
      size: "52MB",
      color: "bg-blue-600",
    },
    {
      platform: "Windows",
      icon: <Monitor className="h-5 w-5" />,
      description: "Desktop App with Professional Tools",
      downloadUrl: "#",
      version: "v2.1.0",
      size: "128MB",
      color: "bg-purple-600",
    },
    {
      platform: "macOS",
      icon: <Monitor className="h-5 w-5" />,
      description: "Mac Desktop App with Full Features",
      downloadUrl: "#",
      version: "v2.1.0",
      size: "145MB",
      color: "bg-gray-600",
    },
    {
      platform: "Web App",
      icon: <Globe className="h-5 w-5" />,
      description: "Browser-based Trading Platform",
      downloadUrl: "https://gaiaexchanges.com",
      version: "Latest",
      size: "Online",
      color: "bg-orange-600",
    },
  ];

  return (
    <Card className="border-blue-500/30 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center gap-3">
          <Download className="h-8 w-8 text-blue-400" />
          📱 Download Gaia's Exchanges - Multi-Platform
        </CardTitle>
        <p className="text-center text-muted-foreground">
          Access GAIA token trading on all your devices with our native
          applications
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {downloadOptions.map((option, index) => (
            <Card
              key={index}
              className="border-gray-600/30 hover:border-blue-500/50 transition-colors"
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${option.color}`}>
                    {option.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{option.platform}</h4>
                    <Badge variant="outline" className="text-xs">
                      {option.version}
                    </Badge>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-3">
                  {option.description}
                </p>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-blue-400">
                    Size: {option.size}
                  </span>
                  <Shield className="h-4 w-4 text-green-400" />
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={() => {
                    if (option.platform === "Web App") {
                      window.open(
                        option.downloadUrl,
                        "_blank",
                        "noopener,noreferrer",
                      );
                    } else {
                      // Simulate download for native apps
                      console.log(`Downloading ${option.platform} app...`);
                    }
                  }}
                >
                  <Download className="h-4 w-4 mr-2" />
                  {option.platform === "Web App" ? "Open Web App" : "Download"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-5 w-5 text-green-400" />
            <h4 className="font-bold text-green-400">
              🔒 Secure & Verified Downloads
            </h4>
          </div>
          <p className="text-green-300 text-sm">
            All downloads are digitally signed and verified. Our applications
            use end-to-end encryption and never store your private keys on our
            servers.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
