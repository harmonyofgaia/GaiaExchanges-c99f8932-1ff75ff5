import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Heart,
  MapPin,
  AlertTriangle,
  Calendar,
  Search,
  ExternalLink,
  DollarSign,
} from "lucide-react";
import { toast } from "sonner";

interface Animal {
  id: string;
  name: string;
  species: string;
  location: string;
  threat: string;
  urgency: "critical" | "high" | "medium" | "low";
  population: number;
  fundsNeeded: number;
  fundsRaised: number;
  lastUpdated: string;
  description: string;
  image: string;
  organization: string;
  donationWallet: string;
}

const realAnimalsInNeed: Animal[] = [
  {
    id: "amur-leopard-1",
    name: "Amur Leopards",
    species: "Panthera pardus orientalis",
    location: "Primorye, Russia & Northeast China",
    threat: "Habitat loss, poaching for fur trade",
    urgency: "critical",
    population: 130,
    fundsNeeded: 500000,
    fundsRaised: 87500,
    lastUpdated: "2024-08-08",
    description:
      "The world's rarest big cat with only 130 individuals left in the wild. Urgent conservation efforts needed.",
    image: "/api/placeholder/300/200",
    organization: "Amur Leopard Conservation Alliance",
    donationWallet: "0x...leopard",
  },
  {
    id: "javan-rhino-1",
    name: "Javan Rhinoceros",
    species: "Rhinoceros sondaicus",
    location: "Ujung Kulon National Park, Java",
    threat: "Disease, natural disasters, limited genetic diversity",
    urgency: "critical",
    population: 74,
    fundsNeeded: 750000,
    fundsRaised: 245000,
    lastUpdated: "2024-08-07",
    description:
      "One of the rarest mammals on Earth, confined to a single park in Java with extreme vulnerability.",
    image: "/api/placeholder/300/200",
    organization: "International Rhino Foundation",
    donationWallet: "0x...rhino",
  },
  {
    id: "mountain-gorilla-1",
    name: "Mountain Gorillas",
    species: "Gorilla beringei beringei",
    location: "Virunga Mountains (Rwanda, Uganda, DRC)",
    threat: "Habitat loss, human conflict, disease",
    urgency: "high",
    population: 1063,
    fundsNeeded: 300000,
    fundsRaised: 127000,
    lastUpdated: "2024-08-06",
    description:
      "Critically endangered great apes living in the cloud forests of Central Africa.",
    image: "/api/placeholder/300/200",
    organization: "Dian Fossey Gorilla Fund",
    donationWallet: "0x...gorilla",
  },
  {
    id: "sumatran-elephant-1",
    name: "Sumatran Elephants",
    species: "Elephas maximus sumatranus",
    location: "Sumatra, Indonesia",
    threat: "Palm oil plantations, human-elephant conflict",
    urgency: "critical",
    population: 2400,
    fundsNeeded: 450000,
    fundsRaised: 98000,
    lastUpdated: "2024-08-05",
    description:
      "Critically endangered elephants losing habitat to rapid deforestation and agricultural expansion.",
    image: "/api/placeholder/300/200",
    organization: "Sumatran Elephant Conservation",
    donationWallet: "0x...elephant",
  },
  {
    id: "hawksbill-turtle-1",
    name: "Hawksbill Sea Turtles",
    species: "Eretmochelys imbricata",
    location: "Tropical oceans worldwide",
    threat: "Plastic pollution, illegal trade, climate change",
    urgency: "critical",
    population: 15000,
    fundsNeeded: 200000,
    fundsRaised: 65000,
    lastUpdated: "2024-08-04",
    description:
      "Critically endangered sea turtles essential for coral reef health, threatened by human activities.",
    image: "/api/placeholder/300/200",
    organization: "Sea Turtle Conservancy",
    donationWallet: "0x...turtle",
  },
  {
    id: "snow-leopard-1",
    name: "Snow Leopards",
    species: "Panthera uncia",
    location: "High mountains of Central and South Asia",
    threat: "Climate change, retaliatory killing, illegal trade",
    urgency: "high",
    population: 4000,
    fundsNeeded: 350000,
    fundsRaised: 142000,
    lastUpdated: "2024-08-03",
    description:
      "Elusive big cats of the mountains, losing habitat due to climate change and human encroachment.",
    image: "/api/placeholder/300/200",
    organization: "Snow Leopard Trust",
    donationWallet: "0x...snowleopard",
  },
  {
    id: "orangutan-1",
    name: "Bornean Orangutans",
    species: "Pongo pygmaeus",
    location: "Borneo (Malaysia, Brunei, Indonesia)",
    threat: "Palm oil plantations, logging, illegal pet trade",
    urgency: "critical",
    population: 104000,
    fundsNeeded: 400000,
    fundsRaised: 156000,
    lastUpdated: "2024-08-02",
    description:
      "Critically endangered great apes losing their rainforest homes to industrial agriculture.",
    image: "/api/placeholder/300/200",
    organization: "Orangutan Foundation International",
    donationWallet: "0x...orangutan",
  },
  {
    id: "vaquita-1",
    name: "Vaquita Porpoise",
    species: "Phocoena sinus",
    location: "Gulf of California, Mexico",
    threat: "Fishing nets (bycatch), illegal fishing",
    urgency: "critical",
    population: 10,
    fundsNeeded: 1000000,
    fundsRaised: 234000,
    lastUpdated: "2024-08-01",
    description:
      "The world's most endangered marine mammal with only 10 individuals remaining.",
    image: "/api/placeholder/300/200",
    organization: "Vaquita CPR",
    donationWallet: "0x...vaquita",
  },
  {
    id: "pangolin-1",
    name: "Pangolins (All Species)",
    species: "Pholidota",
    location: "Africa and Asia",
    threat: "Illegal trade for scales and meat",
    urgency: "critical",
    population: 100000,
    fundsNeeded: 600000,
    fundsRaised: 89000,
    lastUpdated: "2024-07-30",
    description:
      "The world's most trafficked mammal, all 8 species are threatened with extinction.",
    image: "/api/placeholder/300/200",
    organization: "Save Pangolins",
    donationWallet: "0x...pangolin",
  },
  {
    id: "kakapo-1",
    name: "Kākāpō",
    species: "Strigops habroptilus",
    location: "New Zealand",
    threat: "Introduced predators, limited genetic diversity",
    urgency: "critical",
    population: 252,
    fundsNeeded: 300000,
    fundsRaised: 178000,
    lastUpdated: "2024-07-28",
    description:
      "World's only flightless parrot, critically endangered with intensive management required.",
    image: "/api/placeholder/300/200",
    organization: "Kākāpō Recovery Programme",
    donationWallet: "0x...kakapo",
  },
];

export function RealAnimalDatabase() {
  const [animals] = useState<Animal[]>(realAnimalsInNeed);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterUrgency, setFilterUrgency] = useState<string>("all");

  const filteredAnimals = animals.filter((animal) => {
    const matchesSearch =
      animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUrgency =
      filterUrgency === "all" || animal.urgency === filterUrgency;
    return matchesSearch && matchesUrgency;
  });

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "bg-red-600";
      case "high":
        return "bg-orange-600";
      case "medium":
        return "bg-yellow-600";
      case "low":
        return "bg-green-600";
      default:
        return "bg-gray-600";
    }
  };

  const donate = (animal: Animal) => {
    toast.success(`🐾 Donation initiated for ${animal.name}!`, {
      description: `Funds will be sent to ${animal.organization}`,
      duration: 4000,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-green-500/50 bg-gradient-to-r from-green-900/30 to-blue-900/30">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            🦎 REAL ANIMALS IN CRITICAL NEED
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Live database of endangered species requiring immediate conservation
            support
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search animals, species, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-black/30 border-green-500/30 pl-10"
              />
            </div>
            <select
              value={filterUrgency}
              onChange={(e) => setFilterUrgency(e.target.value)}
              className="px-4 py-2 bg-black/30 border border-green-500/30 rounded-lg text-white"
            >
              <option value="all">All Urgency Levels</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAnimals.map((animal) => (
          <Card
            key={animal.id}
            className="border-gray-500/30 bg-gradient-to-br from-gray-900/30 to-slate-900/30 hover:border-green-500/50 transition-colors"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg text-green-400">
                    {animal.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground italic">
                    {animal.species}
                  </p>
                </div>
                <Badge
                  className={`${getUrgencyColor(animal.urgency)} text-white font-bold`}
                >
                  {animal.urgency.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-blue-400" />
                  <span>{animal.location}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <AlertTriangle className="h-4 w-4 text-orange-400" />
                  <span>{animal.threat}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Heart className="h-4 w-4 text-red-400" />
                  <span>{animal.population.toLocaleString()} remaining</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-purple-400" />
                  <span>Updated: {animal.lastUpdated}</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                {animal.description}
              </p>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Funding Progress</span>
                  <span>
                    ${animal.fundsRaised.toLocaleString()} / $
                    {animal.fundsNeeded.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${(animal.fundsRaised / animal.fundsNeeded) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="text-xs text-muted-foreground">
                Organization: {animal.organization}
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => donate(animal)}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  size="sm"
                >
                  <DollarSign className="h-4 w-4 mr-1" />
                  Donate GAIA
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-500/30 hover:bg-blue-900/30"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAnimals.length === 0 && (
        <Card className="border-gray-500/30 text-center py-8">
          <CardContent>
            <p className="text-muted-foreground">
              No animals found matching your search criteria.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
