import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useFeatureFlag } from "@/hooks/useFeatureFlag";
import { Link } from "react-router-dom";

export function CarFreeEarnTile() {
  const show = useFeatureFlag("car_free_on_earn_page");
  if (!show) return null;

  return (
    <Card className="rounded-xl border border-white/10 bg-neutral-900/60 p-4 backdrop-blur-md">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base font-semibold text-emerald-200">
            Car‑Free Rewards
          </h3>
          <p className="mt-1 text-xs text-emerald-50/90">
            Start or resume your car‑free streak. Longer streaks, bigger rewards.
          </p>
        </div>
        <div className="text-[10px] text-emerald-300/80">Anti‑cheat • Privacy‑first</div>
      </div>

      <CardContent className="px-0 pt-3">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-lg bg-neutral-950/60 border border-white/10 p-2">
            <div className="text-[11px] text-emerald-300/80">Tier I</div>
            <div className="text-sm text-emerald-200">Base</div>
          </div>
          <div className="rounded-lg bg-neutral-950/60 border border-white/10 p-2">
            <div className="text-[11px] text-emerald-300/80">Tier II</div>
            <div className="text-sm text-emerald-200">+Multiplier</div>
          </div>
          <div className="rounded-lg bg-neutral-950/60 border border-white/10 p-2">
            <div className="text-[11px] text-emerald-300/80">1‑Year</div>
            <div className="text-sm text-emerald-200">Solar Bike</div>
          </div>
        </div>

        <div className="mt-3 flex gap-2">
          <Link to="/earning-activities">
            <Button className="bg-emerald-600 hover:bg-emerald-700">Start / Resume Streak</Button>
          </Link>
          <Link to="/green-investments">
            <Button variant="outline" className="border-emerald-500/30 text-emerald-300">
              Learn More
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default CarFreeEarnTile;