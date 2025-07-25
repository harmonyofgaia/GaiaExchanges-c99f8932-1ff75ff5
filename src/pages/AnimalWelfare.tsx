import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Heart, 
  PawPrint, 
  Shield, 
  Stethoscope, 
  MapPin, 
  Users, 
  Coins,
  Camera,
  AlertTriangle,
  CheckCircle,
  Star,
  Activity,
  TreePine,
  Home,
  Phone,
  Calendar,
  Award,
  Globe,
  Zap,
  Droplets,
  Sun
} from 'lucide-react';
import { toast } from 'sonner';
import { Navbar } from '@/components/Navbar';

interface AnimalRescue {
  id: string;
  name: string;
  species: string;
  age: string;
  location: string;
  status: 'urgent' | 'critical' | 'stable' | 'recovering' | 'rescued';
  description: string;
  medicalNeeds: string[];
  fundingGoal: number;
  currentFunding: number;
  images: string[];
  rescuer: string;
  dateReported: string;
  estimatedCost: number;
  urgencyLevel: 1 | 2 | 3 | 4 | 5;
}

interface Sanctuary {
  id: string;
  name: string;
  location: string;
  capacity: number;
  currentAnimals: number;
  specialties: string[];
  certifications: string[];
  contactInfo: {
    phone: string;
    email: string;
    website?: string;
  };
  fundingNeeds: {
    monthly: number;
    current: number;
  };
  recentRescues: number;
  impactMetrics: {
    animalsRescued: number;
    animalsRehabbed: number;
    animalsReleased: number;
  };
}

interface WelfareProgram {
  id: string;
  title: string;
  category: 'veterinary' | 'habitat' | 'education' | 'research' | 'prevention';
  description: string;
  targetSpecies: string[];
  fundingGoal: number;
  currentFunding: number;
  participants: number;
  location: string;
  startDate: string;
  duration: string;
  impactMetrics: {
    animalsHelped?: number;
    habitatRestored?: number; // hectares
    peopleEducated?: number;
    researchPublications?: number;
  };
  rewards: {
    tokens: number;
    nfts?: string[];
    badges?: string[];
  };
}

const AnimalWelfare: React.FC = () => {
  const [rescues, setRescues] = useState<AnimalRescue[]>([]);
  const [sanctuaries, setSanctuaries] = useState<Sanctuary[]>([]);
  const [programs, setPrograms] = useState<WelfareProgram[]>([]);
  const [userDonations, setUserDonations] = useState<Record<string, number>>({});
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [donationAmount, setDonationAmount] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Initialize sample data
    const sampleRescues: AnimalRescue[] = [
      {
        id: 'elephant-rescue-1',
        name: 'Maya',
        species: 'Asian Elephant',
        age: '15 years',
        location: 'Thailand Wildlife Reserve',
        status: 'critical',
        description: 'Maya was found with severe injuries from illegal logging activities. She needs immediate surgery and long-term rehabilitation.',
        medicalNeeds: ['Emergency Surgery', 'Antibiotics', 'Physical Therapy', 'Nutritional Support'],
        fundingGoal: 25000,
        currentFunding: 18750,
        images: ['elephant1.jpg', 'elephant2.jpg'],
        rescuer: 'Thailand Wildlife Protection',
        dateReported: '2025-01-15',
        estimatedCost: 25000,
        urgencyLevel: 5
      },
      {
        id: 'tiger-rescue-1',
        name: 'Kira',
        species: 'Bengal Tiger',
        age: '8 years',
        location: 'India National Park',
        status: 'stable',
        description: 'Kira was rescued from illegal captivity and is recovering well. Needs continued medical care and habitat preparation.',
        medicalNeeds: ['Regular Checkups', 'Dental Care', 'Behavioral Therapy'],
        fundingGoal: 15000,
        currentFunding: 12300,
        images: ['tiger1.jpg'],
        rescuer: 'Big Cat Sanctuary India',
        dateReported: '2025-01-10',
        estimatedCost: 15000,
        urgencyLevel: 2
      },
      {
        id: 'whale-rescue-1',
        name: 'Neptune',
        species: 'Humpback Whale',
        age: '12 years',
        location: 'Pacific Ocean Rescue Zone',
        status: 'urgent',
        description: 'Neptune is entangled in fishing nets and needs immediate rescue operation. Time is critical.',
        medicalNeeds: ['Emergency Rescue', 'Net Removal', 'Wound Treatment', 'Tracking Device'],
        fundingGoal: 35000,
        currentFunding: 28900,
        images: ['whale1.jpg', 'whale2.jpg', 'whale3.jpg'],
        rescuer: 'Ocean Guardian Alliance',
        dateReported: '2025-01-20',
        estimatedCost: 35000,
        urgencyLevel: 4
      }
    ];

    const sampleSanctuaries: Sanctuary[] = [
      {
        id: 'big-cat-sanctuary',
        name: 'Global Big Cat Sanctuary',
        location: 'Costa Rica',
        capacity: 50,
        currentAnimals: 34,
        specialties: ['Big Cats', 'Primates', 'Birds of Prey'],
        certifications: ['AZA Accredited', 'Global Federation of Animal Sanctuaries'],
        contactInfo: {
          phone: '+506-1234-5678',
          email: 'info@bigcatsanctuary.org',
          website: 'www.bigcatsanctuary.org'
        },
        fundingNeeds: {
          monthly: 45000,
          current: 32500
        },
        recentRescues: 8,
        impactMetrics: {
          animalsRescued: 156,
          animalsRehabbed: 134,
          animalsReleased: 89
        }
      },
      {
        id: 'marine-life-center',
        name: 'Pacific Marine Life Center',
        location: 'California, USA',
        capacity: 200,
        currentAnimals: 145,
        specialties: ['Marine Mammals', 'Sea Turtles', 'Seabirds'],
        certifications: ['NOAA Partnership', 'Marine Mammal Care Coalition'],
        contactInfo: {
          phone: '+1-555-123-4567',
          email: 'rescue@marinecenter.org',
          website: 'www.pacificmarinecenter.org'
        },
        fundingNeeds: {
          monthly: 65000,
          current: 48750
        },
        recentRescues: 23,
        impactMetrics: {
          animalsRescued: 423,
          animalsRehabbed: 378,
          animalsReleased: 312
        }
      }
    ];

    const samplePrograms: WelfareProgram[] = [
      {
        id: 'elephant-corridor',
        title: 'Elephant Migration Corridor Protection',
        category: 'habitat',
        description: 'Protecting and restoring critical elephant migration corridors to prevent human-wildlife conflict and ensure species survival.',
        targetSpecies: ['Asian Elephant', 'African Elephant'],
        fundingGoal: 150000,
        currentFunding: 89500,
        participants: 234,
        location: 'Kenya & Thailand',
        startDate: '2025-03-01',
        duration: '2 years',
        impactMetrics: {
          habitatRestored: 1250,
          animalsHelped: 450
        },
        rewards: {
          tokens: 500,
          badges: ['Elephant Guardian', 'Habitat Protector'],
          nfts: ['Elephant Migration NFT Collection']
        }
      },
      {
        id: 'veterinary-training',
        title: 'Wildlife Veterinary Training Program',
        category: 'veterinary',
        description: 'Training local veterinarians in wildlife medicine and emergency rescue procedures to improve animal care worldwide.',
        targetSpecies: ['All Wildlife'],
        fundingGoal: 75000,
        currentFunding: 52800,
        participants: 89,
        location: 'Global Online & Regional Centers',
        startDate: '2025-02-15',
        duration: '1 year',
        impactMetrics: {
          peopleEducated: 150,
          animalsHelped: 2000
        },
        rewards: {
          tokens: 300,
          badges: ['Veterinary Supporter', 'Education Advocate'],
          nfts: ['Wildlife Medicine NFT Certificate']
        }
      },
      {
        id: 'anti-poaching-tech',
        title: 'Anti-Poaching Technology Initiative',
        category: 'prevention',
        description: 'Deploying AI-powered cameras, drones, and tracking systems to prevent poaching and protect endangered species.',
        targetSpecies: ['Rhinos', 'Elephants', 'Tigers', 'Pangolins'],
        fundingGoal: 200000,
        currentFunding: 145600,
        participants: 567,
        location: 'Africa & Asia Protected Areas',
        startDate: '2025-01-01',
        duration: '3 years',
        impactMetrics: {
          animalsHelped: 1500,
          habitatRestored: 500
        },
        rewards: {
          tokens: 750,
          badges: ['Anti-Poaching Hero', 'Technology Pioneer'],
          nfts: ['Guardian Tech NFT Series']
        }
      }
    ];

    setRescues(sampleRescues);
    setSanctuaries(sampleSanctuaries);
    setPrograms(samplePrograms);

    // Load user donations
    const savedDonations = localStorage.getItem('animalWelfareDonations');
    if (savedDonations) {
      setUserDonations(JSON.parse(savedDonations));
    }
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-red-600';
      case 'urgent': return 'bg-orange-600';
      case 'stable': return 'bg-yellow-600';
      case 'recovering': return 'bg-blue-600';
      case 'rescued': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'critical': return AlertTriangle;
      case 'urgent': return AlertTriangle;
      case 'stable': return Activity;
      case 'recovering': return Heart;
      case 'rescued': return CheckCircle;
      default: return PawPrint;
    }
  };

  const getUrgencyStars = (level: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < level ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} 
      />
    ));
  };

  const handleDonate = async (itemId: string, type: 'rescue' | 'sanctuary' | 'program') => {
    if (!donationAmount || parseFloat(donationAmount) <= 0) {
      toast.error('Please enter a valid donation amount');
      return;
    }

    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const amount = parseFloat(donationAmount);
      const newDonations = { ...userDonations, [itemId]: (userDonations[itemId] || 0) + amount };
      setUserDonations(newDonations);
      localStorage.setItem('animalWelfareDonations', JSON.stringify(newDonations));

      // Update funding amounts
      if (type === 'rescue') {
        setRescues(prev => prev.map(r => 
          r.id === itemId ? { ...r, currentFunding: r.currentFunding + amount } : r
        ));
      } else if (type === 'sanctuary') {
        setSanctuaries(prev => prev.map(s => 
          s.id === itemId ? { ...s, fundingNeeds: { ...s.fundingNeeds, current: s.fundingNeeds.current + amount } } : s
        ));
      } else if (type === 'program') {
        setPrograms(prev => prev.map(p => 
          p.id === itemId ? { ...p, currentFunding: p.currentFunding + amount, participants: p.participants + 1 } : p
        ));
      }

      toast.success(
        `Thank you for your $${amount} donation!`,
        {
          description: 'Your contribution will directly help animal welfare efforts.'
        }
      );

      setDonationAmount('');
      setSelectedItem(null);
    } catch (error) {
      toast.error('Donation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'veterinary': return Stethoscope;
      case 'habitat': return TreePine;
      case 'education': return Award;
      case 'research': return Activity;
      case 'prevention': return Shield;
      default: return Heart;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
            <Heart className="text-red-400" />
            Animal Welfare & Protection
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl">
            Support global animal rescue efforts, wildlife sanctuaries, and conservation programs. 
            Every donation helps save lives, protect habitats, and build a more compassionate world for all creatures.
          </p>
        </div>

        <Tabs defaultValue="rescues" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800">
            <TabsTrigger value="rescues">Emergency Rescues</TabsTrigger>
            <TabsTrigger value="sanctuaries">Sanctuaries</TabsTrigger>
            <TabsTrigger value="programs">Welfare Programs</TabsTrigger>
            <TabsTrigger value="impact">Global Impact</TabsTrigger>
          </TabsList>

          <TabsContent value="rescues" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rescues.map((rescue) => {
                const StatusIcon = getStatusIcon(rescue.status);
                const fundingPercentage = (rescue.currentFunding / rescue.fundingGoal) * 100;
                
                return (
                  <Card key={rescue.id} className="bg-gray-800 border-gray-700 hover:border-red-500 transition-colors">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <PawPrint className="w-5 h-5 text-orange-400" />
                          {rescue.name}
                        </CardTitle>
                        <Badge className={`${getStatusColor(rescue.status)} text-white`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {rescue.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-400">
                        {rescue.species} • {rescue.age}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{rescue.location}</span>
                      </div>

                      <p className="text-gray-300 text-sm">{rescue.description}</p>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">Funding Progress</span>
                          <span className="text-sm font-semibold">
                            ${rescue.currentFunding.toLocaleString()} / ${rescue.fundingGoal.toLocaleString()}
                          </span>
                        </div>
                        <Progress value={fundingPercentage} className="h-2" />
                        <div className="text-xs text-gray-400">
                          {fundingPercentage.toFixed(1)}% funded
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold">Medical Needs</h4>
                        <div className="flex flex-wrap gap-1">
                          {rescue.medicalNeeds.slice(0, 3).map(need => (
                            <Badge key={need} variant="outline" className="text-xs">
                              {need}
                            </Badge>
                          ))}
                          {rescue.medicalNeeds.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{rescue.medicalNeeds.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-sm">Urgency:</span>
                        <div className="flex gap-1">
                          {getUrgencyStars(rescue.urgencyLevel)}
                        </div>
                      </div>

                      <Button 
                        className="w-full bg-red-600 hover:bg-red-700"
                        onClick={() => setSelectedItem({ ...rescue, type: 'rescue' })}
                      >
                        <Heart className="w-4 h-4 mr-2" />
                        Donate Now
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="sanctuaries" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {sanctuaries.map((sanctuary) => {
                const capacityPercentage = (sanctuary.currentAnimals / sanctuary.capacity) * 100;
                const fundingPercentage = (sanctuary.fundingNeeds.current / sanctuary.fundingNeeds.monthly) * 100;
                
                return (
                  <Card key={sanctuary.id} className="bg-gray-800 border-gray-700 hover:border-green-500 transition-colors">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Home className="w-5 h-5 text-green-400" />
                        {sanctuary.name}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <MapPin className="w-4 h-4" />
                        {sanctuary.location}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-gray-400 text-sm">Capacity</span>
                          <div className="font-semibold">{sanctuary.currentAnimals}/{sanctuary.capacity}</div>
                          <Progress value={capacityPercentage} className="h-2 mt-1" />
                        </div>
                        <div>
                          <span className="text-gray-400 text-sm">Recent Rescues</span>
                          <div className="font-semibold text-green-400">{sanctuary.recentRescues}</div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold mb-2">Specialties</h4>
                        <div className="flex flex-wrap gap-1">
                          {sanctuary.specialties.map(specialty => (
                            <Badge key={specialty} variant="secondary" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold mb-2">Certifications</h4>
                        <div className="flex flex-wrap gap-1">
                          {sanctuary.certifications.map(cert => (
                            <Badge key={cert} variant="outline" className="text-xs">
                              <Award className="w-3 h-3 mr-1" />
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gray-700 p-3 rounded-lg">
                        <h4 className="text-sm font-semibold mb-2">Impact Metrics</h4>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div className="text-center">
                            <div className="font-semibold text-green-400">{sanctuary.impactMetrics.animalsRescued}</div>
                            <div className="text-gray-400">Rescued</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-blue-400">{sanctuary.impactMetrics.animalsRehabbed}</div>
                            <div className="text-gray-400">Rehabbed</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-yellow-400">{sanctuary.impactMetrics.animalsReleased}</div>
                            <div className="text-gray-400">Released</div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">Monthly Funding</span>
                          <span className="text-sm font-semibold">
                            ${sanctuary.fundingNeeds.current.toLocaleString()} / ${sanctuary.fundingNeeds.monthly.toLocaleString()}
                          </span>
                        </div>
                        <Progress value={fundingPercentage} className="h-2" />
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          className="flex-1 bg-green-600 hover:bg-green-700"
                          onClick={() => setSelectedItem({ ...sanctuary, type: 'sanctuary' })}
                        >
                          <Coins className="w-4 h-4 mr-2" />
                          Support
                        </Button>
                        <Button variant="outline" size="sm">
                          <Phone className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="programs" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {programs.map((program) => {
                const fundingPercentage = (program.currentFunding / program.fundingGoal) * 100;
                const CategoryIcon = getCategoryIcon(program.category);
                
                return (
                  <Card key={program.id} className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CategoryIcon className="w-5 h-5 text-blue-400" />
                        {program.title}
                      </CardTitle>
                      <Badge variant="secondary" className="w-fit">
                        {program.category}
                      </Badge>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-300 text-sm">{program.description}</p>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Location</span>
                          <div className="font-semibold">{program.location}</div>
                        </div>
                        <div>
                          <span className="text-gray-400">Duration</span>
                          <div className="font-semibold">{program.duration}</div>
                        </div>
                        <div>
                          <span className="text-gray-400">Start Date</span>
                          <div className="font-semibold">{program.startDate}</div>
                        </div>
                        <div>
                          <span className="text-gray-400">Participants</span>
                          <div className="font-semibold">{program.participants}</div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold mb-2">Target Species</h4>
                        <div className="flex flex-wrap gap-1">
                          {program.targetSpecies.map(species => (
                            <Badge key={species} variant="outline" className="text-xs">
                              {species}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">Funding Progress</span>
                          <span className="text-sm font-semibold">
                            ${program.currentFunding.toLocaleString()} / ${program.fundingGoal.toLocaleString()}
                          </span>
                        </div>
                        <Progress value={fundingPercentage} className="h-2" />
                      </div>

                      <div className="bg-gray-700 p-3 rounded-lg">
                        <h4 className="text-sm font-semibold mb-2">Expected Impact</h4>
                        <div className="space-y-1 text-xs">
                          {program.impactMetrics.animalsHelped && (
                            <div className="flex justify-between">
                              <span>Animals Helped:</span>
                              <span className="text-green-400">{program.impactMetrics.animalsHelped.toLocaleString()}</span>
                            </div>
                          )}
                          {program.impactMetrics.habitatRestored && (
                            <div className="flex justify-between">
                              <span>Habitat Restored:</span>
                              <span className="text-green-400">{program.impactMetrics.habitatRestored} hectares</span>
                            </div>
                          )}
                          {program.impactMetrics.peopleEducated && (
                            <div className="flex justify-between">
                              <span>People Educated:</span>
                              <span className="text-blue-400">{program.impactMetrics.peopleEducated}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="bg-gray-700 p-3 rounded-lg">
                        <h4 className="text-sm font-semibold mb-2">Supporter Rewards</h4>
                        <div className="text-xs space-y-1">
                          <div className="flex justify-between">
                            <span>Tokens:</span>
                            <span className="text-yellow-400">{program.rewards.tokens}</span>
                          </div>
                          {program.rewards.badges && (
                            <div>
                              <span>Badges: </span>
                              <span className="text-purple-400">{program.rewards.badges.join(', ')}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        onClick={() => setSelectedItem({ ...program, type: 'program' })}
                      >
                        <Heart className="w-4 h-4 mr-2" />
                        Fund Program
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="impact" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-gradient-to-br from-red-900 to-red-800 border-red-700">
                <CardContent className="p-6 text-center">
                  <PawPrint className="w-12 h-12 mx-auto mb-4 text-red-400" />
                  <div className="text-2xl font-bold">
                    {rescues.reduce((total, rescue) => total + 1, 0) + 
                     sanctuaries.reduce((total, sanctuary) => total + sanctuary.impactMetrics.animalsRescued, 0)}
                  </div>
                  <div className="text-sm text-gray-300">Animals Rescued</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-900 to-green-800 border-green-700">
                <CardContent className="p-6 text-center">
                  <TreePine className="w-12 h-12 mx-auto mb-4 text-green-400" />
                  <div className="text-2xl font-bold">
                    {programs.reduce((total, program) => total + (program.impactMetrics.habitatRestored || 0), 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-300">Hectares Protected</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-900 to-blue-800 border-blue-700">
                <CardContent className="p-6 text-center">
                  <Users className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                  <div className="text-2xl font-bold">
                    {programs.reduce((total, program) => total + program.participants, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-300">Global Participants</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-yellow-900 to-yellow-800 border-yellow-700">
                <CardContent className="p-6 text-center">
                  <Coins className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
                  <div className="text-2xl font-bold">
                    ${(rescues.reduce((total, rescue) => total + rescue.currentFunding, 0) + 
                      programs.reduce((total, program) => total + program.currentFunding, 0)).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-300">Total Donations</div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Your Impact Summary</CardTitle>
              </CardHeader>
              <CardContent>
                {Object.keys(userDonations).length > 0 ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-green-400">
                          ${Object.values(userDonations).reduce((sum, amount) => sum + amount, 0).toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-400">Total Donated</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-400">
                          {Object.keys(userDonations).length}
                        </div>
                        <div className="text-sm text-gray-400">Projects Supported</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-400">
                          {Object.keys(userDonations).length * 50}
                        </div>
                        <div className="text-sm text-gray-400">Karma Points</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-yellow-400">
                          {Object.keys(userDonations).length * 25}
                        </div>
                        <div className="text-sm text-gray-400">Tokens Earned</div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-3">Your Donations</h3>
                      <div className="space-y-2">
                        {Object.entries(userDonations).map(([itemId, amount]) => {
                          const item = [...rescues, ...sanctuaries, ...programs].find(i => i.id === itemId);
                          return (
                            <div key={itemId} className="flex justify-between items-center p-2 bg-gray-700 rounded">
                              <span className="text-sm">{item?.name || item?.title || 'Unknown'}</span>
                              <span className="text-green-400 font-semibold">${amount}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Heart className="w-16 h-16 mx-auto mb-4 text-gray-500" />
                    <h3 className="text-xl font-semibold mb-2">Start Making a Difference</h3>
                    <p className="text-gray-400">
                      Support animal welfare initiatives and track your positive impact on wildlife conservation.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Donation Modal */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="bg-gray-800 border-gray-700 max-w-md w-full">
              <CardHeader>
                <CardTitle>
                  Support {selectedItem.name || selectedItem.title}
                </CardTitle>
                <p className="text-sm text-gray-400">
                  Your donation will directly contribute to {selectedItem.type === 'rescue' ? 'saving this animal' : selectedItem.type === 'sanctuary' ? 'supporting this sanctuary' : 'funding this program'}.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Donation Amount ($)</label>
                  <input
                    type="number"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500"
                    min="1"
                  />
                </div>

                <div className="bg-gray-700 p-3 rounded-lg">
                  <h4 className="font-semibold mb-2">Your Impact</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Tokens Earned:</span>
                      <span className="text-yellow-400">{donationAmount ? Math.floor(parseFloat(donationAmount) * 0.1) : 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Karma Points:</span>
                      <span className="text-purple-400">{donationAmount ? Math.floor(parseFloat(donationAmount) * 0.5) : 0}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setSelectedItem(null)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="flex-1 bg-red-600 hover:bg-red-700"
                    onClick={() => handleDonate(selectedItem.id, selectedItem.type)}
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : 'Donate Now'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimalWelfare;