import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Handshake,
  Globe,
  Users,
  Building,
  Award,
  Target,
  TrendingUp,
  Mail,
  Phone,
  ExternalLink,
} from "lucide-react";

interface Partner {
  id: string;
  name: string;
  type: "NGO" | "Government" | "Technology" | "Research" | "Corporate";
  logo: string;
  description: string;
  website: string;
  projects: number;
  impact: string;
  status: "Active" | "Pending" | "Proposal";
  joinDate: string;
}

const Partnerships = () => {
  const [selectedType, setSelectedType] = useState("all");
  const [partnershipForm, setPartnershipForm] = useState({
    organization: "",
    type: "",
    description: "",
    contact: "",
  });

  const partners: Partner[] = [
    {
      id: "1",
      name: "World Wildlife Fund",
      type: "NGO",
      logo: "🐼",
      description:
        "Global wildlife conservation organization working to protect endangered species and their habitats.",
      website: "worldwildlife.org",
      projects: 12,
      impact: "2.5M trees planted",
      status: "Active",
      joinDate: "2024-01",
    },
    {
      id: "2",
      name: "CleanTech Innovations",
      type: "Technology",
      logo: "🚀",
      description:
        "Leading provider of renewable energy solutions and environmental monitoring technologies.",
      website: "cleantech-innovations.com",
      projects: 8,
      impact: "15 MW solar deployed",
      status: "Active",
      joinDate: "2024-02",
    },
    {
      id: "3",
      name: "Environmental Protection Agency",
      type: "Government",
      logo: "🏛️",
      description:
        "Government agency focused on environmental protection and public health safeguarding.",
      website: "epa.gov",
      projects: 6,
      impact: "500K tons CO2 reduced",
      status: "Active",
      joinDate: "2024-01",
    },
    {
      id: "4",
      name: "Ocean Research Institute",
      type: "Research",
      logo: "🔬",
      description:
        "Marine research organization studying ocean health and developing conservation strategies.",
      website: "oceanresearch.org",
      projects: 4,
      impact: "1000 sqkm protected",
      status: "Active",
      joinDate: "2024-03",
    },
    {
      id: "5",
      name: "Green Energy Corp",
      type: "Corporate",
      logo: "⚡",
      description:
        "Fortune 500 company committed to sustainable business practices and carbon neutrality.",
      website: "greenenergycorp.com",
      projects: 15,
      impact: "$2M funding provided",
      status: "Pending",
      joinDate: "2024-04",
    },
    {
      id: "6",
      name: "Climate Action Network",
      type: "NGO",
      logo: "🌡️",
      description: "Global network of organizations working together on climate change solutions.",
      website: "climatenetwork.org",
      projects: 9,
      impact: "50 communities reached",
      status: "Proposal",
      joinDate: "2024-05",
    },
  ];

  const handlePartnershipApplication = (e: React.FormEvent) => {
    e.preventDefault();

    if (!partnershipForm.organization || !partnershipForm.type || !partnershipForm.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success("Partnership application submitted! We will review and contact you soon.");
    setPartnershipForm({
      organization: "",
      type: "",
      description: "",
      contact: "",
    });
  };

  const filteredPartners =
    selectedType === "all" ? partners : partners.filter((partner) => partner.type === selectedType);

  const getStatusColor = (status: Partner["status"]) => {
    switch (status) {
      case "Active":
        return "bg-green-600";
      case "Pending":
        return "bg-yellow-600";
      case "Proposal":
        return "bg-blue-600";
    }
  };

  const getTypeIcon = (type: Partner["type"]) => {
    switch (type) {
      case "NGO":
        return <Users className="h-4 w-4" />;
      case "Government":
        return <Building className="h-4 w-4" />;
      case "Technology":
        return <Target className="h-4 w-4" />;
      case "Research":
        return <Award className="h-4 w-4" />;
      case "Corporate":
        return <TrendingUp className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-green-900/20">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <Card className="mb-8 border-2 border-blue-500/50 bg-gradient-to-r from-blue-900/40 to-purple-900/40">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              🤝 GLOBAL PARTNERSHIP NETWORK
            </CardTitle>
            <p className="text-center text-xl text-blue-300">
              Collaborate with leading organizations • Amplify environmental impact • Build stronger
              communities
            </p>
          </CardHeader>
        </Card>

        {/* Partnership Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card className="bg-gradient-to-r from-green-900/30 to-green-800/30 border-green-500/30">
            <CardContent className="p-4 text-center">
              <Handshake className="h-6 w-6 mx-auto text-green-400 mb-2" />
              <div className="text-2xl font-bold text-green-400">47</div>
              <div className="text-xs text-muted-foreground">Active Partners</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-900/30 to-blue-800/30 border-blue-500/30">
            <CardContent className="p-4 text-center">
              <Globe className="h-6 w-6 mx-auto text-blue-400 mb-2" />
              <div className="text-2xl font-bold text-blue-400">23</div>
              <div className="text-xs text-muted-foreground">Countries</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-900/30 to-purple-800/30 border-purple-500/30">
            <CardContent className="p-4 text-center">
              <Target className="h-6 w-6 mx-auto text-purple-400 mb-2" />
              <div className="text-2xl font-bold text-purple-400">156</div>
              <div className="text-xs text-muted-foreground">Joint Projects</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-900/30 to-yellow-800/30 border-yellow-500/30">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-6 w-6 mx-auto text-yellow-400 mb-2" />
              <div className="text-2xl font-bold text-yellow-400">$12M</div>
              <div className="text-xs text-muted-foreground">Combined Impact</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-red-900/30 to-red-800/30 border-red-500/30">
            <CardContent className="p-4 text-center">
              <Award className="h-6 w-6 mx-auto text-red-400 mb-2" />
              <div className="text-2xl font-bold text-red-400">95%</div>
              <div className="text-xs text-muted-foreground">Success Rate</div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Tabs */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-blue-400">Partner Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {["all", "NGO", "Government", "Technology", "Research", "Corporate"].map((type) => (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  onClick={() => setSelectedType(type)}
                  className="capitalize"
                >
                  {type === "all" ? "All Partners" : type}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Partners Directory */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPartners.map((partner) => (
                <Card
                  key={partner.id}
                  className="border-blue-500/30 hover:border-blue-400/50 transition-colors"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="text-4xl">{partner.logo}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-blue-400">{partner.name}</h3>
                          <Badge className={`${getStatusColor(partner.status)} text-white`}>
                            {partner.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          {getTypeIcon(partner.type)}
                          <span className="text-sm text-muted-foreground">{partner.type}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">{partner.description}</p>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span>Active Projects:</span>
                        <span className="font-bold">{partner.projects}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Impact:</span>
                        <span className="font-bold text-green-400">{partner.impact}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Partnership Since:</span>
                        <span className="font-bold">{partner.joinDate}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline" className="flex-1">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Visit
                      </Button>
                      <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                        <Mail className="h-3 w-3 mr-1" />
                        Contact
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Partnership Application */}
          <div className="space-y-6">
            <Card className="border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-purple-400">Join Our Network</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePartnershipApplication} className="space-y-4">
                  <Input
                    placeholder="Organization name"
                    value={partnershipForm.organization}
                    onChange={(e) =>
                      setPartnershipForm({
                        ...partnershipForm,
                        organization: e.target.value,
                      })
                    }
                  />
                  <select
                    className="w-full p-2 rounded-md border border-border bg-background"
                    value={partnershipForm.type}
                    onChange={(e) =>
                      setPartnershipForm({
                        ...partnershipForm,
                        type: e.target.value,
                      })
                    }
                  >
                    <option value="">Select organization type</option>
                    <option value="NGO">NGO</option>
                    <option value="Government">Government Agency</option>
                    <option value="Technology">Technology Company</option>
                    <option value="Research">Research Institution</option>
                    <option value="Corporate">Corporate</option>
                  </select>
                  <Textarea
                    placeholder="Tell us about your organization and how you'd like to collaborate..."
                    value={partnershipForm.description}
                    onChange={(e) =>
                      setPartnershipForm({
                        ...partnershipForm,
                        description: e.target.value,
                      })
                    }
                    rows={4}
                  />
                  <Input
                    placeholder="Contact email"
                    type="email"
                    value={partnershipForm.contact}
                    onChange={(e) =>
                      setPartnershipForm({
                        ...partnershipForm,
                        contact: e.target.value,
                      })
                    }
                  />
                  <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                    Apply for Partnership
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Partnership Benefits */}
            <Card className="border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-400">Partnership Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Access to global network</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>Collaborative funding opportunities</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>Shared resources and expertise</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span>Enhanced impact measurement</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span>Technology platform access</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Success Stories */}
            <Card className="border-yellow-500/30">
              <CardHeader>
                <CardTitle className="text-yellow-400">Success Stories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div className="p-3 bg-yellow-900/20 rounded-lg border border-yellow-500/30">
                    <div className="font-bold text-yellow-400 mb-1">Amazon Restoration</div>
                    <div className="text-muted-foreground">
                      WWF + CleanTech partnership planted 500K trees using IoT monitoring
                    </div>
                  </div>
                  <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-500/30">
                    <div className="font-bold text-blue-400 mb-1">Ocean Cleanup</div>
                    <div className="text-muted-foreground">
                      Research Institute + EPA removed 50 tons of plastic waste
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partnerships;
