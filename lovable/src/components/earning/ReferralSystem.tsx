import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useEarningActivities } from "@/hooks/useEarningSystem";
import { Users, Copy } from "lucide-react";

export function ReferralSystem() {
  const [referralCode] = useState("GAIA-ECO-2024");
  const [referredUser, setReferredUser] = useState("");
  const { processReferral, loading } = useEarningActivities("user-123");

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast.success("Referral code copied to clipboard!");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!referredUser) {
      toast.error("Please enter referred user");
      return;
    }

    try {
      await processReferral({
        referredUser,
        bonusLevel: 1,
        ongoing: true,
      });

      toast.success("Referral processed! +50 points earned");
      setReferredUser("");
    } catch (error) {
      toast.error("Failed to process referral");
    }
  };

  return (
    <Card className="border-purple-500/30 bg-purple-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-400">
          <Users className="h-5 w-5" />
          👥 Referral System
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Your Referral Code
          </label>
          <div className="flex gap-2">
            <Input value={referralCode} readOnly className="bg-purple-900/20" />
            <Button onClick={copyReferralCode} variant="outline" size="icon">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Track Referral
            </label>
            <Input
              value={referredUser}
              onChange={(e) => setReferredUser(e.target.value)}
              placeholder="Username of referred user"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            {loading ? "Processing..." : "👥 Track Referral (+50 Points)"}
          </Button>
        </form>

        <div className="p-3 bg-purple-900/20 rounded-lg border border-purple-500/30">
          <p className="text-sm text-purple-300">
            💡 <strong>Earn:</strong> 50 points per referral + ongoing bonuses
            from their activities
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
