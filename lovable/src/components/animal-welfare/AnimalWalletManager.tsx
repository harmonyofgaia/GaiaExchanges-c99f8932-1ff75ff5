import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Wallet, TrendingUp, Shield, Eye, Copy } from "lucide-react";
import { toast } from "sonner";

interface AnimalWalletManagerProps {
  animals: Array<{
    id: string;
    name: string;
    species: string;
    emoji: string;
    walletAddress: string;
    nftTokenId: string;
    fundingGoal: number;
    currentFunding: number;
    caretaker: string;
  }>;
}

export function AnimalWalletManager({ animals }: AnimalWalletManagerProps) {
  const copyWalletAddress = (address: string, animalName: string) => {
    navigator.clipboard.writeText(address);
    toast.success(`📋 Copied ${animalName}'s wallet address!`, {
      description: "You can now send GAiA tokens directly to this animal.",
      duration: 3000,
    });
  };

  const totalFunding = animals.reduce(
    (sum, animal) => sum + animal.currentFunding,
    0,
  );
  const totalGoals = animals.reduce(
    (sum, animal) => sum + animal.fundingGoal,
    0,
  );

  return (
    <div className="space-y-6">
      <Card className="border-yellow-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-400">
            <Wallet className="h-6 w-6" />
            💰 Individual Animal Wallet System
          </CardTitle>
          <p className="text-muted-foreground">
            Every animal in captivity has its own dedicated wallet. All
            contributions go directly to their care and release fund.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-900/30 rounded border border-green-500/20">
              <div className="text-2xl font-bold text-green-400">
                {totalFunding.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Raised</div>
            </div>
            <div className="text-center p-4 bg-blue-900/30 rounded border border-blue-500/20">
              <div className="text-2xl font-bold text-blue-400">
                {totalGoals.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">
                Combined Goals
              </div>
            </div>
            <div className="text-center p-4 bg-purple-900/30 rounded border border-purple-500/20">
              <div className="text-2xl font-bold text-purple-400">
                {((totalFunding / totalGoals) * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">
                Overall Progress
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {animals.map((animal) => (
          <Card key={animal.id} className="border-green-500/20">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{animal.emoji}</div>
                    <div>
                      <h3 className="font-bold text-lg">{animal.name}</h3>
                      <p className="text-muted-foreground text-sm">
                        {animal.species}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-xl">
                      {animal.currentFunding.toLocaleString()} GAiA
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Goal: {animal.fundingGoal.toLocaleString()}
                    </div>
                  </div>
                </div>

                <Progress
                  value={(animal.currentFunding / animal.fundingGoal) * 100}
                  className="h-3"
                />

                <div className="bg-black/40 p-4 rounded border border-green-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold text-green-400">
                      🔐 Dedicated Wallet
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        copyWalletAddress(animal.walletAddress, animal.name)
                      }
                    >
                      <Copy className="h-3 w-3 mr-2" />
                      Copy
                    </Button>
                  </div>
                  <div className="font-mono text-xs text-green-300 break-all mb-2">
                    {animal.walletAddress}
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-muted-foreground">NFT Token:</span>
                      <div className="font-mono text-blue-400">
                        {animal.nftTokenId}
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Caretaker:</span>
                      <div className="text-white">{animal.caretaker}</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-blue-500/50"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Transactions
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-purple-500/50"
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Usage Reports
                  </Button>
                </div>

                <div className="bg-blue-900/20 p-3 rounded border border-blue-500/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className="h-4 w-4 text-blue-400" />
                    <span className="text-sm font-semibold text-blue-400">
                      100% Transparent
                    </span>
                  </div>
                  <p className="text-xs text-blue-300">
                    Every transaction is recorded on the blockchain. Funds are
                    used exclusively for food, medical care, habitat
                    improvement, and release preparation.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
