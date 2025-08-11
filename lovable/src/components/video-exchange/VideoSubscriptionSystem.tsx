import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Subscription } from "@/types/ui-types";
import {
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  UserPlus,
  UserMinus,
} from "lucide-react";
import { toast } from "sonner";

export function VideoSubscriptionSystem() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching subscriptions from an API
    setLoading(true);
    setTimeout(() => {
      const mockSubscriptions: Subscription[] = [
        {
          id: "sub-1",
          subscribedAt: new Date(),
          isActive: true,
          tier: "Premium",
        },
        {
          id: "sub-2",
          subscribedAt: new Date(Date.now() - 86400000), // 24 hours ago
          isActive: false,
          tier: "Basic",
        },
      ];
      setSubscriptions(mockSubscriptions);
      setLoading(false);
    }, 1500);
  }, []);

  const handleSubscription = (subscription: Subscription) => {
    toast.promise(
      new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate successful subscription update
          subscription.isActive
            ? resolve("Unsubscribed successfully!")
            : resolve("Subscribed successfully!");
        }, 1000);
      }),
      {
        loading: "Updating subscription...",
        success: (data) => `${data}`,
        error: (err) => `Update failed: ${err}`,
      },
    );

    // Fix the property access
    if (subscription.isActive) {
      console.log("User is subscribed since:", subscription.subscribedAt);
    }
  };

  return (
    <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-blue-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-400">
          <UserPlus className="h-6 w-6" />
          Video Subscription System
        </CardTitle>
        <p className="text-muted-foreground">Manage your video subscriptions</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center">
            <RotateCcw className="h-6 w-6 animate-spin text-blue-400" />
            <span className="ml-2 text-blue-400">Loading subscriptions...</span>
          </div>
        ) : error ? (
          <div className="rounded-md border border-destructive bg-destructive/10 p-4 text-destructive">
            <AlertTriangle className="h-4 w-4" />
            <p>Error: {error}</p>
          </div>
        ) : (
          <div className="space-y-2">
            {subscriptions.map((subscription) => (
              <div
                key={subscription.id}
                className="flex items-center justify-between rounded-md border p-4"
              >
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {subscription.tier} Tier
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Subscribed on:{" "}
                    {subscription.subscribedAt.toLocaleDateString()}
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => handleSubscription(subscription)}
                  className={
                    subscription.isActive
                      ? "border-red-500 text-red-500 hover:bg-red-500/10"
                      : "border-green-500 text-green-500 hover:bg-green-500/10"
                  }
                >
                  {subscription.isActive ? (
                    <>
                      <UserMinus className="h-4 w-4 mr-2" />
                      Unsubscribe
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Subscribe
                    </>
                  )}
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
