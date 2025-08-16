import React from "react";
import NeonTreeBackground from "@/components/backgrounds/NeonTreeBackground";

export default function GreenInvestments() {
  return (
    <div className="relative min-h-[100svh]">
      <NeonTreeBackground />
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-emerald-300 drop-shadow-[0_0_8px_rgba(16,185,129,0.45)]">
            Green Investments
          </h1>
          <p className="mt-2 max-w-3xl text-base text-emerald-100/80">
            Backing living systems and regenerative projects with transparent impact.
          </p>
        </header>

        {/* Glass/contrast container for readability */}
        <div className="grid gap-6 lg:grid-cols-3">
          <section className="lg:col-span-2 rounded-xl border border-white/10 bg-neutral-900/60 p-6 shadow-xl backdrop-blur-md">
            <h2 className="text-xl font-semibold text-emerald-200">Opportunities</h2>
            <p className="mt-2 text-sm text-emerald-50/90">
              Explore curated green assets with verified climate and biodiversity outcomes.
            </p>
            {/* Existing content / list / cards go here */}
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Example card */}
              <div className="rounded-lg border border-white/10 bg-neutral-950/60 p-4 shadow-md backdrop-blur">
                <h3 className="font-medium text-emerald-200">Urban Canopy Bonds</h3>
                <p className="mt-1 text-xs text-emerald-50/80">Shade, cooling, and carbon uptake.</p>
              </div>
            </div>
          </section>

          <aside className="rounded-xl border border-white/10 bg-neutral-900/60 p-6 shadow-xl backdrop-blur-md">
            <h2 className="text-xl font-semibold text-emerald-200">Impact</h2>
            <ul className="mt-3 space-y-2 text-sm text-emerald-50/90">
              <li>Transparent metrics, geospatial verification</li>
              <li>Biodiversity credits and habitat protection</li>
              <li>Long‑term stewardship incentives</li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
}