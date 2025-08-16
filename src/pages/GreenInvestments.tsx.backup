import React from "react";
import GreenInvestmentsBackground from "@/components/backgrounds/GreenInvestmentsBackground";
import CarFreeProjectCard from "@/components/green-investments/CarFreeProjectCard";
import { GAiACommunityProjects } from "@/components/green-investments/GAiACommunityProjects";
import { SandProtectInvestmentProject } from "@/components/green-investments/SandProtectInvestmentProject";
import { WildfireSandProtection } from "@/components/green-investments/WildfireSandProtection";
import "@/styles/green-investments-new-background.css";

export default function GreenInvestments() {
  return (
    <div className="green-investments relative min-h-[100svh]">
      <GreenInvestmentsBackground />
      <div className="gi-content relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-emerald-300 drop-shadow-[0_0_8px_rgba(16,185,129,0.45)]">
            Green Investments
          </h1>
          <p className="mt-2 max-w-3xl text-base text-emerald-100/80">
            Backing living systems and regenerative projects with transparent impact.
          </p>
        </header>

        {/* GAiA Community Projects Section */}
        <div className="mb-12">
          <GAiACommunityProjects />
        </div>

        {/* Environmental Protection Projects */}
        <div className="mb-12 space-y-8">
          <h2 className="text-2xl font-bold text-emerald-300 mb-6">Environmental Protection Initiatives</h2>
          
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <SandProtectInvestmentProject />
            </div>
            <div className="space-y-6">
              <WildfireSandProtection />
            </div>
          </div>
        </div>

        {/* Glass/contrast container for other opportunities */}
        <div className="grid gap-6 lg:grid-cols-3 mb-8">
          <section className="lg:col-span-2 rounded-xl border border-white/10 bg-neutral-900/60 p-6 shadow-xl backdrop-blur-md">
            <h2 className="text-xl font-semibold text-emerald-200">Additional Opportunities</h2>
            <p className="mt-2 text-sm text-emerald-50/90">
              Explore curated green assets with verified climate and biodiversity outcomes.
            </p>
            {/* Project cards */}
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <CarFreeProjectCard />
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