import React from "react";

export default function CarFreeRewards() {
  return (
    <div className="relative min-h-[100svh] bg-gradient-to-b from-neutral-950 via-neutral-950 to-black">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-emerald-300">
          Car‑Free Rewards Initiative
        </h1>
        <p className="mt-3 max-w-3xl text-emerald-50/90">
          Earn meaningful rewards for choosing car‑free mobility. Verified miles, community
          benefits, and climate impact — transparently tracked and fairly distributed.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-neutral-900/60 p-6 backdrop-blur-md">
            <h2 className="text-lg font-semibold text-emerald-200">How it works</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-emerald-50/90">
              <li>Opt‑in with privacy‑preserving tracking</li>
              <li>Accrue "car‑free miles" and community bonuses</li>
              <li>Redeem for mobility, culture, and green goods</li>
            </ul>
          </div>
          <div className="rounded-xl border border-white/10 bg-neutral-900/60 p-6 backdrop-blur-md">
            <h2 className="text-lg font-semibold text-emerald-200">Safeguards</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-emerald-50/90">
              <li>Fraud‑resistant proofs and audits</li>
              <li>Local equity pools and community oversight</li>
              <li>Open metrics; no predatory lock‑ins</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}