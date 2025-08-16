import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GAIA_TOKEN } from "@/constants/gaia";
import { useFeatureFlag } from "@/hooks/useFeatureFlag";
import { Link } from "react-router-dom";

export function CarFreeProjectCard() {
  const show = useFeatureFlag("car_free_on_green_investments");
  if (!show) return null;

  return (
    <Card className="rounded-lg border border-white/10 bg-neutral-950/60 p-4 shadow-md backdrop-blur">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium text-emerald-200">Car‑Free Rewards</h3>
          <p className="mt-1 text-xs text-emerald-50/80">
            Verified car‑free streaks, fair rewards, and transparent impact.
          </p>
        </div>
        <div className="text-right">
          <div className="text-[10px] uppercase tracking-wide text-emerald-300/70">
            Wallet
          </div>
          <code className="text-[10px] text-emerald-200 font-mono">
            {GAIA_TOKEN.GREEN_INVESTMENTS_WALLET}
          </code>
        </div>
      </div>

      <CardContent className="px-0 pt-4">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-lg bg-neutral-900/60 border border-white/10 p-2">
            <div className="text-xs text-emerald-300/80">CO₂ Saved</div>
            <div className="text-sm text-emerald-200">Live Metrics</div>
          </div>
          <div className="rounded-lg bg-neutral-900/60 border border-white/10 p-2">
            <div className="text-xs text-emerald-300/80">Participants</div>
            <div className="text-sm text-emerald-200">Live Count</div>
          </div>
          <div className="rounded-lg bg-neutral-900/60 border border-white/10 p-2">
            <div className="text-xs text-emerald-300/80">Streaks</div>
            <div className="text-sm text-emerald-200">Milestones</div>
          </div>
        </div>

        <div className="mt-3 flex gap-2">
          <Link to="/wallet" className="w-full">
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
              Invest / Contribute
            </Button>
          </Link>
          <Link to="/earning-activities" className="w-full">
            <Button variant="outline" className="w-full border-emerald-500/30 text-emerald-300">
              View Earnings
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default CarFreeProjectCard;