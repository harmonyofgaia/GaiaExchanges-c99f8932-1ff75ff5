import { InvestorOutreachSystem } from "@/components/marketing/InvestorOutreachSystem";
import { UltimateSecurityWall } from "@/components/security/UltimateSecurityWall";

const MarketingHub = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/10 to-pink-900/10">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
            🚀 MARKETING & INVESTOR OUTREACH HUB
          </h1>
          <p className="text-xl text-muted-foreground mt-4">
            Accelerating community growth with automated marketing & secure
            investor attraction
          </p>
          <p className="text-sm text-purple-400 mt-2">
            🦁🐬 Lions + Dolphins Power = Unstoppable Market Domination
          </p>
        </div>

        <div className="space-y-8">
          <InvestorOutreachSystem />
          <UltimateSecurityWall />
        </div>
      </div>
    </div>
  );
};

export default MarketingHub;
