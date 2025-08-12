import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, Shield, Crown } from "lucide-react";
import { toast } from "sonner";

export function CommunityIllustrations() {
  const [isAdminAccess, setIsAdminAccess] = useState(false);

  useEffect(() => {
    // Check if user has admin access
    const checkAdminAccess = () => {
      // This would normally check admin status
      // For now, we'll restrict access completely
      setIsAdminAccess(false);
    };

    checkAdminAccess();
  }, []);

  const handleAccessDenied = () => {
    toast.error("🔒 ACCESS RESTRICTED", {
      description:
        "Community artworks are now admin-only for background creation",
      duration: 4000,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-red-500/50 bg-gradient-to-br from-red-900/20 to-gray-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-red-400">
            <Lock className="h-8 w-8" />
            <div>
              <div className="text-3xl font-bold">🔒 RESTRICTED ACCESS</div>
              <div className="text-sm font-normal text-red-300">
                Community Artworks - Admin Only
              </div>
            </div>
            <Shield className="h-6 w-6 text-red-400" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-6">
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
              <Crown className="h-16 w-16 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-red-400 mb-2">
                Admin Authorization Required
              </h3>
              <p className="text-red-300 mb-4">
                Community artworks are now exclusively used for background
                creation and GAiA token sales. Only administrators can access
                this system to maintain quality and control.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>• All artworks moved to secure cloud storage</div>
                <div>• Background creation system active</div>
                <div>• GAiA token marketplace integration complete</div>
                <div>• Coin Crafter burn rate optimization enabled</div>
              </div>
            </div>

            <Button
              onClick={handleAccessDenied}
              className="bg-red-600 hover:bg-red-700"
              size="lg"
            >
              <Lock className="h-4 w-4 mr-2" />
              Request Admin Access
            </Button>

            <div className="text-xs text-muted-foreground">
              Contact administrator for access to the artwork management system
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
