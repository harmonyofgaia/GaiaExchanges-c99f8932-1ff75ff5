import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Shield, Settings, Trophy, Wallet } from "lucide-react";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-green-900/20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-400 mb-4">👤 USER PROFILE</h1>
          <p className="text-muted-foreground">Manage your GAIA ecosystem profile and settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="border-blue-500/30 bg-blue-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground">Username</label>
                <p className="font-medium">GaiaWarrior2024</p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Member Since</label>
                <p className="font-medium">January 2024</p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Status</label>
                <Badge className="bg-green-600 text-white">
                  <Shield className="h-3 w-3 mr-1" />
                  Dragon Protected
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-500/30 bg-green-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Trophy className="h-5 w-5" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span>GAIA Holder</span>
                <Badge className="bg-green-600">✓</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Dragon Protected</span>
                <Badge className="bg-blue-600">✓</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Early Adopter</span>
                <Badge className="bg-purple-600">✓</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-500/30 bg-purple-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Wallet className="h-5 w-5" />
                Wallet Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span>GAIA Balance</span>
                <span className="font-bold text-green-400">15,750</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Total Trades</span>
                <span className="font-bold text-blue-400">247</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Security Level</span>
                <span className="font-bold text-purple-400">Maximum</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 border-orange-500/30 bg-orange-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-400">
              <Settings className="h-5 w-5" />
              Profile Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700">Update Profile</Button>
              <Button className="bg-green-600 hover:bg-green-700">Security Settings</Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                Notification Preferences
              </Button>
              <Button className="bg-red-600 hover:bg-red-700">Privacy Settings</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
