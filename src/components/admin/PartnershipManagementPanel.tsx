import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import {
  Handshake,
  Building,
  Users,
  TrendingUp,
  Globe,
  Star,
  MessageSquare,
  Send,
  Mail,
} from "lucide-react";
import { toast } from "sonner";

export function PartnershipManagementPanel() {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    partnershipType: "general",
  });

  const [communityQuestions, setCommunityQuestions] = useState([
    {
      id: 1,
      user: "EcoWarrior23",
      question: "How can we partner with local schools for environmental education?",
      timestamp: new Date(),
      status: "pending",
      category: "education",
    },
    {
      id: 2,
      user: "GreenTechDev",
      question: "Are there opportunities for technology partnerships?",
      timestamp: new Date(),
      status: "answered",
      category: "technology",
    },
  ]);

  const handleContactSubmit = () => {
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Here would be the actual submission logic
    toast.success("🤝 Partnership inquiry sent successfully!", {
      description: "Our team will review your proposal and get back to you within 48 hours.",
      duration: 5000,
    });

    // Reset form
    setContactForm({
      name: "",
      email: "",
      subject: "",
      message: "",
      partnershipType: "general",
    });
  };

  const answerCommunityQuestion = (questionId: number) => {
    setCommunityQuestions((prev) =>
      prev.map((q) => (q.id === questionId ? { ...q, status: "answered" } : q))
    );
    toast.success("Community question answered!", {
      description: "Response sent to community member.",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Handshake className="h-6 w-6" />
            🤝 Partnership Management - Admin Only
          </CardTitle>
          <p className="text-muted-foreground">
            Manage strategic partnerships and community engagement
          </p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="partnerships" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="partnerships">🤝 Partnerships</TabsTrigger>
          <TabsTrigger value="community-contact">💬 Community Contact</TabsTrigger>
          <TabsTrigger value="questions">❓ Community Q&A</TabsTrigger>
          <TabsTrigger value="analytics">📊 Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="partnerships" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-green-900/20 to-black/50 border-green-500/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-green-400">
                  Active Partnerships
                </CardTitle>
                <Handshake className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">47</div>
                <p className="text-xs text-muted-foreground">+12% from last quarter</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/20 to-black/50 border-blue-500/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-400">Total Revenue</CardTitle>
                <TrendingUp className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">$2.4M</div>
                <p className="text-xs text-muted-foreground">Quarterly partnership revenue</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/20 to-black/50 border-purple-500/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-purple-400">
                  Impact Projects
                </CardTitle>
                <Globe className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">127</div>
                <p className="text-xs text-muted-foreground">Environmental initiatives</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-900/20 to-black/50 border-yellow-500/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-yellow-400">
                  Partner Rating
                </CardTitle>
                <Star className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">4.8/5</div>
                <p className="text-xs text-muted-foreground">Average satisfaction</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-green-900/20 to-black/50 border-green-500/20">
              <CardHeader>
                <CardTitle className="text-green-400">Strategic Partners</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["GreenTech Solutions", "Ocean Conservancy", "Wildlife Foundation"].map(
                    (partner, index) => (
                      <div
                        key={partner}
                        className="p-3 bg-green-900/20 rounded-lg border border-green-500/20"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-green-400">{partner}</h4>
                          <Badge
                            variant="outline"
                            className="border-green-500/30 text-green-400 text-xs"
                          >
                            Tier {index === 2 ? 2 : 1}
                          </Badge>
                        </div>
                        <Progress value={95 - index * 10} className="h-2" />
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/20 to-black/50 border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-blue-400">Partnership Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  <Button className="w-full bg-green-600 hover:bg-green-700 justify-start">
                    <Building className="h-4 w-4 mr-2" />
                    Add New Partner
                  </Button>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 justify-start">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Analytics Dashboard
                  </Button>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Partner Directory
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="community-contact" className="space-y-6">
          <Card className="bg-gradient-to-br from-blue-900/20 to-black/50 border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Community Partnership Contact Form
              </CardTitle>
              <p className="text-muted-foreground">
                Allow community members to reach out for partnership opportunities
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Name *</label>
                  <Input
                    value={contactForm.name}
                    onChange={(e) =>
                      setContactForm((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    placeholder="Your full name"
                    className="bg-black/50 border-blue-500/30"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Email *</label>
                  <Input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) =>
                      setContactForm((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    placeholder="your.email@example.com"
                    className="bg-black/50 border-blue-500/30"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">
                  Partnership Type
                </label>
                <select
                  value={contactForm.partnershipType}
                  onChange={(e) =>
                    setContactForm((prev) => ({
                      ...prev,
                      partnershipType: e.target.value,
                    }))
                  }
                  className="w-full p-2 bg-black/50 border border-blue-500/30 rounded text-white"
                >
                  <option value="general">General Partnership</option>
                  <option value="environmental">Environmental Initiative</option>
                  <option value="technology">Technology Partnership</option>
                  <option value="education">Educational Collaboration</option>
                  <option value="investment">Investment Opportunity</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Subject</label>
                <Input
                  value={contactForm.subject}
                  onChange={(e) =>
                    setContactForm((prev) => ({
                      ...prev,
                      subject: e.target.value,
                    }))
                  }
                  placeholder="Brief subject of your partnership proposal"
                  className="bg-black/50 border-blue-500/30"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Message *</label>
                <Textarea
                  value={contactForm.message}
                  onChange={(e) =>
                    setContactForm((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                  placeholder="Please describe your partnership proposal, goals, and how it aligns with our environmental mission..."
                  rows={6}
                  className="bg-black/50 border-blue-500/30"
                />
              </div>

              <Button
                onClick={handleContactSubmit}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <Send className="h-4 w-4 mr-2" />
                Submit Partnership Proposal
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="questions" className="space-y-6">
          <Card className="bg-gradient-to-br from-purple-900/20 to-black/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Community Questions & Engagement
              </CardTitle>
              <p className="text-muted-foreground">
                Manage and respond to community partnership questions
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {communityQuestions.map((question) => (
                  <div
                    key={question.id}
                    className="p-4 bg-purple-900/20 rounded-lg border border-purple-500/20"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium text-purple-400">{question.user}</h4>
                        <Badge
                          className={`text-xs ${
                            question.status === "answered" ? "bg-green-600" : "bg-yellow-600"
                          }`}
                        >
                          {question.status}
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {question.timestamp.toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-300 mb-3">{question.question}</p>
                    <div className="flex gap-2">
                      {question.status === "pending" && (
                        <Button
                          size="sm"
                          onClick={() => answerCommunityQuestion(question.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <MessageSquare className="h-3 w-3 mr-1" />
                          Answer
                        </Button>
                      )}
                      <Button size="sm" variant="outline" className="border-purple-500/30">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-green-900/20 to-black/50 border-green-500/20">
              <CardHeader>
                <CardTitle className="text-green-400">Contact Form Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>This Month:</span>
                    <span className="text-green-400 font-bold">23 inquiries</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Response Rate:</span>
                    <span className="text-blue-400 font-bold">94%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Conversion Rate:</span>
                    <span className="text-purple-400 font-bold">31%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/20 to-black/50 border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-blue-400">Community Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Active Questions:</span>
                    <span className="text-blue-400 font-bold">{communityQuestions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Answered Today:</span>
                    <span className="text-green-400 font-bold">7</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Community Satisfaction:</span>
                    <span className="text-yellow-400 font-bold">4.9/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
