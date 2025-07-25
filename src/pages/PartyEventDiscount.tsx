import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  PartyPopper, 
  Calendar, 
  MapPin, 
  Users, 
  Ticket, 
  Gift, 
  Percent,
  Star,
  Clock,
  TreePine,
  Leaf,
  Heart,
  Globe,
  Music,
  Camera,
  Award,
  Zap,
  Crown
} from 'lucide-react';
import { toast } from 'sonner';
import { Navbar } from '@/components/Navbar';

interface Event {
  id: string;
  title: string;
  type: 'party' | 'workshop' | 'cleanup' | 'conference' | 'festival' | 'ceremony';
  description: string;
  date: string;
  time: string;
  location: string;
  maxAttendees: number;
  currentAttendees: number;
  price: number;
  discountedPrice?: number;
  organizer: string;
  tags: string[];
  image?: string;
  ecoImpact: {
    carbonOffset?: number;
    treesPlanted?: number;
    wasteReduced?: number;
  };
  rewards: {
    tokens: number;
    nfts?: string[];
    badges?: string[];
  };
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  isVIP?: boolean;
}

interface Discount {
  id: string;
  title: string;
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed' | 'bogo';
  value: number;
  minPurchase?: number;
  validUntil: string;
  usageLimit: number;
  usedCount: number;
  category: 'events' | 'nfts' | 'tokens' | 'merchandise' | 'all';
  isActive: boolean;
  ecoTheme: boolean;
}

const PartyEventDiscount: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [userEvents, setUserEvents] = useState<string[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Initialize with sample events
    const sampleEvents: Event[] = [
      {
        id: 'gaia-forest-party',
        title: 'Gaia Forest Regeneration Party',
        type: 'party',
        description: 'Join us for an eco-friendly celebration as we plant 1000 trees and dance under the stars! Live music, organic food, and environmental workshops.',
        date: '2025-02-15',
        time: '18:00',
        location: 'Central Forest Park, City Center',
        maxAttendees: 500,
        currentAttendees: 347,
        price: 50,
        discountedPrice: 35,
        organizer: 'Gaia Events Team',
        tags: ['eco-friendly', 'music', 'tree-planting', 'community'],
        ecoImpact: {
          treesPlanted: 1000,
          carbonOffset: 25
        },
        rewards: {
          tokens: 100,
          badges: ['Forest Guardian', 'Party Pioneer'],
          nfts: ['Rare Tree Spirit NFT']
        },
        status: 'upcoming',
        isVIP: false
      },
      {
        id: 'ocean-cleanup-festival',
        title: 'Ocean Cleanup Festival',
        type: 'festival',
        description: 'Three-day festival combining beach cleanup with live performances, marine conservation workshops, and sustainable living exhibitions.',
        date: '2025-03-01',
        time: '09:00',
        location: 'Sunset Beach Resort',
        maxAttendees: 2000,
        currentAttendees: 1456,
        price: 150,
        discountedPrice: 120,
        organizer: 'Ocean Guardians Collective',
        tags: ['ocean', 'festival', 'cleanup', 'education', 'music'],
        ecoImpact: {
          wasteReduced: 5000,
          carbonOffset: 75
        },
        rewards: {
          tokens: 300,
          badges: ['Ocean Protector', 'Festival Hero'],
          nfts: ['Limited Ocean Spirit Collection']
        },
        status: 'upcoming',
        isVIP: true
      },
      {
        id: 'climate-action-conference',
        title: 'Global Climate Action Conference',
        type: 'conference',
        description: 'World-class speakers, innovative solutions, and networking opportunities for climate activists and environmental professionals.',
        date: '2025-04-22',
        time: '08:00',
        location: 'Green Convention Center',
        maxAttendees: 1000,
        currentAttendees: 789,
        price: 200,
        organizer: 'Climate Leaders Network',
        tags: ['conference', 'professional', 'networking', 'climate'],
        ecoImpact: {
          carbonOffset: 100
        },
        rewards: {
          tokens: 500,
          badges: ['Climate Leader', 'Conference Participant'],
          nfts: ['Climate Action Achievement NFT']
        },
        status: 'upcoming',
        isVIP: true
      },
      {
        id: 'earth-day-ceremony',
        title: 'Earth Day Gratitude Ceremony',
        type: 'ceremony',
        description: 'Sacred ceremony honoring Mother Earth with meditation, indigenous wisdom sharing, and community pledge commitments.',
        date: '2025-04-22',
        time: '06:00',
        location: 'Sacred Grove Sanctuary',
        maxAttendees: 200,
        currentAttendees: 156,
        price: 25,
        organizer: 'Sacred Earth Circle',
        tags: ['ceremony', 'meditation', 'indigenous', 'spiritual'],
        ecoImpact: {
          treesPlanted: 222
        },
        rewards: {
          tokens: 75,
          badges: ['Earth Guardian', 'Sacred Participant'],
          nfts: ['Gratitude Spirit NFT']
        },
        status: 'upcoming',
        isVIP: false
      },
      {
        id: 'green-tech-workshop',
        title: 'Sustainable Technology Workshop',
        type: 'workshop',
        description: 'Hands-on workshop building solar panels, learning permaculture, and exploring renewable energy solutions.',
        date: '2025-02-28',
        time: '10:00',
        location: 'EcoTech Innovation Hub',
        maxAttendees: 50,
        currentAttendees: 34,
        price: 75,
        discountedPrice: 60,
        organizer: 'Green Tech Collective',
        tags: ['workshop', 'technology', 'hands-on', 'education'],
        ecoImpact: {
          carbonOffset: 15
        },
        rewards: {
          tokens: 150,
          badges: ['Tech Innovator', 'Workshop Graduate'],
          nfts: ['Solar Panel Builder NFT']
        },
        status: 'upcoming',
        isVIP: false
      }
    ];

    const sampleDiscounts: Discount[] = [
      {
        id: 'earth-lover-25',
        title: 'Earth Lover Special',
        code: 'EARTHLOVE25',
        description: '25% off all eco-events and environmental workshops',
        discountType: 'percentage',
        value: 25,
        minPurchase: 50,
        validUntil: '2025-03-31',
        usageLimit: 1000,
        usedCount: 234,
        category: 'events',
        isActive: true,
        ecoTheme: true
      },
      {
        id: 'tree-hugger-discount',
        title: 'Tree Hugger Bundle',
        code: 'TREEHUG50',
        description: '$50 off when you attend 2 or more tree-planting events',
        discountType: 'fixed',
        value: 50,
        minPurchase: 100,
        validUntil: '2025-12-31',
        usageLimit: 500,
        usedCount: 89,
        category: 'events',
        isActive: true,
        ecoTheme: true
      },
      {
        id: 'ocean-protector-bogo',
        title: 'Ocean Protector BOGO',
        code: 'OCEANBOGO',
        description: 'Buy one ocean cleanup event ticket, get one free!',
        discountType: 'bogo',
        value: 100,
        validUntil: '2025-06-30',
        usageLimit: 200,
        usedCount: 45,
        category: 'events',
        isActive: true,
        ecoTheme: true
      },
      {
        id: 'climate-hero-20',
        title: 'Climate Hero Discount',
        code: 'CLIMATE20',
        description: '20% off all NFTs and tokens for event participants',
        discountType: 'percentage',
        value: 20,
        validUntil: '2025-08-15',
        usageLimit: 750,
        usedCount: 312,
        category: 'all',
        isActive: true,
        ecoTheme: true
      },
      {
        id: 'early-bird-special',
        title: 'Early Bird Special',
        code: 'EARLYBIRD',
        description: '30% off events booked 30 days in advance',
        discountType: 'percentage',
        value: 30,
        minPurchase: 75,
        validUntil: '2025-12-31',
        usageLimit: 1500,
        usedCount: 678,
        category: 'events',
        isActive: true,
        ecoTheme: false
      }
    ];

    setEvents(sampleEvents);
    setDiscounts(sampleDiscounts);
    
    // Load user events from localStorage
    const savedUserEvents = localStorage.getItem('userEvents');
    if (savedUserEvents) {
      setUserEvents(JSON.parse(savedUserEvents));
    }
  }, []);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'party': return PartyPopper;
      case 'workshop': return Award;
      case 'cleanup': return TreePine;
      case 'conference': return Users;
      case 'festival': return Music;
      case 'ceremony': return Heart;
      default: return Calendar;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'party': return 'text-pink-500';
      case 'workshop': return 'text-blue-500';
      case 'cleanup': return 'text-green-500';
      case 'conference': return 'text-purple-500';
      case 'festival': return 'text-yellow-500';
      case 'ceremony': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const handleRegisterEvent = async (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    if (!event) return;

    if (event.currentAttendees >= event.maxAttendees) {
      toast.error('Event is fully booked!');
      return;
    }

    if (userEvents.includes(eventId)) {
      toast.error('You are already registered for this event!');
      return;
    }

    setLoading(true);

    try {
      // Simulate registration
      await new Promise(resolve => setTimeout(resolve, 1500));

      const updatedUserEvents = [...userEvents, eventId];
      setUserEvents(updatedUserEvents);
      localStorage.setItem('userEvents', JSON.stringify(updatedUserEvents));

      // Update event attendee count
      setEvents(prevEvents => prevEvents.map(e => 
        e.id === eventId 
          ? { ...e, currentAttendees: e.currentAttendees + 1 }
          : e
      ));

      toast.success(
        `Successfully registered for ${event.title}!`,
        {
          description: `You'll earn ${event.rewards.tokens} tokens and contribute to ${event.ecoImpact.treesPlanted || event.ecoImpact.carbonOffset || 'environmental'} impact.`
        }
      );

    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyDiscountCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success(`Discount code ${code} copied to clipboard!`);
  };

  const getDiscountIcon = (type: string) => {
    switch (type) {
      case 'percentage': return Percent;
      case 'fixed': return Gift;
      case 'bogo': return Star;
      default: return Ticket;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
            <PartyPopper className="text-pink-400" />
            Gaia Events & Celebrations
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl">
            Join environmental celebrations, educational workshops, and community gatherings that make a positive impact on our planet. 
            Earn rewards, connect with like-minded people, and contribute to global regeneration efforts.
          </p>
        </div>

        <Tabs defaultValue="upcoming-events" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800">
            <TabsTrigger value="upcoming-events">Upcoming Events</TabsTrigger>
            <TabsTrigger value="my-events">My Events</TabsTrigger>
            <TabsTrigger value="discounts">Discounts & Deals</TabsTrigger>
            <TabsTrigger value="impact-summary">Impact Summary</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming-events" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {events.filter(event => event.status === 'upcoming').map((event) => {
                const IconComponent = getEventIcon(event.type);
                const iconColor = getEventColor(event.type);
                const isRegistered = userEvents.includes(event.id);
                const isFullyBooked = event.currentAttendees >= event.maxAttendees;
                
                return (
                  <Card key={event.id} className={`bg-gray-800 border-gray-700 hover:border-green-500 transition-colors ${event.isVIP ? 'ring-2 ring-yellow-500' : ''}`}>
                    {event.isVIP && (
                      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-xs font-bold px-2 py-1 text-center">
                        <Crown className="w-3 h-3 inline mr-1" />
                        VIP EVENT
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <IconComponent className={`w-5 h-5 ${iconColor}`} />
                        {event.title}
                        {isRegistered && <Badge variant="secondary" className="text-xs">Registered</Badge>}
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {event.time}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-300 text-sm">{event.description}</p>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300">{event.location}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Price</span>
                          <div className="font-semibold">
                            {event.discountedPrice ? (
                              <>
                                <span className="line-through text-gray-500">${event.price}</span>
                                <span className="text-green-400 ml-2">${event.discountedPrice}</span>
                              </>
                            ) : (
                              <span>${event.price}</span>
                            )}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-400">Attendees</span>
                          <div className="font-semibold">{event.currentAttendees}/{event.maxAttendees}</div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {event.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="pt-2">
                        <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
                          <Globe className="w-4 h-4" />
                          Environmental Impact
                        </h4>
                        <div className="space-y-1 text-xs">
                          {event.ecoImpact.treesPlanted && (
                            <div className="flex justify-between">
                              <span>Trees to Plant:</span>
                              <span className="text-green-400">{event.ecoImpact.treesPlanted.toLocaleString()}</span>
                            </div>
                          )}
                          {event.ecoImpact.carbonOffset && (
                            <div className="flex justify-between">
                              <span>Carbon Offset:</span>
                              <span className="text-green-400">{event.ecoImpact.carbonOffset} tons</span>
                            </div>
                          )}
                          {event.ecoImpact.wasteReduced && (
                            <div className="flex justify-between">
                              <span>Waste Reduction:</span>
                              <span className="text-blue-400">{event.ecoImpact.wasteReduced} lbs</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="pt-2">
                        <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
                          <Award className="w-4 h-4" />
                          Rewards
                        </h4>
                        <div className="text-xs space-y-1">
                          <div className="flex justify-between">
                            <span>Tokens:</span>
                            <span className="text-yellow-400">{event.rewards.tokens}</span>
                          </div>
                          {event.rewards.badges && (
                            <div>
                              <span>Badges: </span>
                              <span className="text-purple-400">{event.rewards.badges.join(', ')}</span>
                            </div>
                          )}
                          {event.rewards.nfts && (
                            <div>
                              <span>NFTs: </span>
                              <span className="text-cyan-400">{event.rewards.nfts.join(', ')}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <Button 
                        className={`w-full ${
                          isRegistered 
                            ? 'bg-gray-600 cursor-not-allowed' 
                            : isFullyBooked 
                              ? 'bg-red-600 cursor-not-allowed'
                              : 'bg-green-600 hover:bg-green-700'
                        }`}
                        onClick={() => !isRegistered && !isFullyBooked && handleRegisterEvent(event.id)}
                        disabled={isRegistered || isFullyBooked || loading}
                      >
                        {isRegistered ? (
                          <>
                            <Ticket className="w-4 h-4 mr-2" />
                            Already Registered
                          </>
                        ) : isFullyBooked ? (
                          'Fully Booked'
                        ) : (
                          <>
                            <Ticket className="w-4 h-4 mr-2" />
                            Register Now
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="my-events" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {userEvents.map(eventId => {
                const event = events.find(e => e.id === eventId);
                if (!event) return null;

                const IconComponent = getEventIcon(event.type);
                const iconColor = getEventColor(event.type);

                return (
                  <Card key={eventId} className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <IconComponent className={`w-5 h-5 ${iconColor}`} />
                        {event.title}
                        <Badge variant="secondary">Registered</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Date & Time</span>
                          <div className="font-semibold">{event.date} at {event.time}</div>
                        </div>
                        <div>
                          <span className="text-gray-400">Location</span>
                          <div className="font-semibold">{event.location}</div>
                        </div>
                      </div>

                      <div className="bg-gray-700 p-3 rounded-lg">
                        <h4 className="font-semibold mb-2">Expected Rewards</h4>
                        <div className="text-sm space-y-1">
                          <div className="flex justify-between">
                            <span>Tokens:</span>
                            <span className="text-yellow-400">{event.rewards.tokens}</span>
                          </div>
                          {event.rewards.badges && (
                            <div className="text-xs text-purple-400">
                              Badges: {event.rewards.badges.join(', ')}
                            </div>
                          )}
                        </div>
                      </div>

                      <Button variant="outline" className="w-full">
                        <Calendar className="w-4 h-4 mr-2" />
                        Add to Calendar
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
              
              {userEvents.length === 0 && (
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-8 text-center">
                    <PartyPopper className="w-16 h-16 mx-auto mb-4 text-gray-500" />
                    <h3 className="text-xl font-semibold mb-2">No Events Registered</h3>
                    <p className="text-gray-400 mb-4">
                      Join environmental events to earn rewards and make a positive impact on the planet.
                    </p>
                    <Button onClick={() => setActiveTab("upcoming-events")}>
                      Browse Events
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="discounts" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {discounts.filter(discount => discount.isActive).map((discount) => {
                const IconComponent = getDiscountIcon(discount.discountType);
                
                return (
                  <Card key={discount.id} className={`bg-gray-800 border-gray-700 hover:border-green-500 transition-colors ${discount.ecoTheme ? 'ring-1 ring-green-500' : ''}`}>
                    {discount.ecoTheme && (
                      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-xs font-bold px-2 py-1 text-center">
                        <Leaf className="w-3 h-3 inline mr-1" />
                        ECO SPECIAL
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <IconComponent className="w-5 h-5 text-yellow-500" />
                        {discount.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-300 text-sm">{discount.description}</p>
                      
                      <div className="bg-gray-700 p-3 rounded-lg text-center">
                        <div className="text-xs text-gray-400 mb-1">Discount Code</div>
                        <div className="text-xl font-bold text-yellow-400 font-mono">{discount.code}</div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-2"
                          onClick={() => copyDiscountCode(discount.code)}
                        >
                          Copy Code
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Discount</span>
                          <div className="font-semibold">
                            {discount.discountType === 'percentage' && `${discount.value}%`}
                            {discount.discountType === 'fixed' && `$${discount.value}`}
                            {discount.discountType === 'bogo' && 'Buy 1 Get 1'}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-400">Valid Until</span>
                          <div className="font-semibold">{discount.validUntil}</div>
                        </div>
                        {discount.minPurchase && (
                          <>
                            <div>
                              <span className="text-gray-400">Min Purchase</span>
                              <div className="font-semibold">${discount.minPurchase}</div>
                            </div>
                          </>
                        )}
                        <div>
                          <span className="text-gray-400">Uses Left</span>
                          <div className="font-semibold">{discount.usageLimit - discount.usedCount}</div>
                        </div>
                      </div>

                      <Badge variant="outline" className="w-fit">
                        {discount.category.charAt(0).toUpperCase() + discount.category.slice(1)}
                      </Badge>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="impact-summary" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-gradient-to-br from-green-900 to-green-800 border-green-700">
                <CardContent className="p-6 text-center">
                  <TreePine className="w-12 h-12 mx-auto mb-4 text-green-400" />
                  <div className="text-2xl font-bold">
                    {events.reduce((total, event) => total + (event.ecoImpact.treesPlanted || 0), 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-300">Trees to be Planted</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-900 to-blue-800 border-blue-700">
                <CardContent className="p-6 text-center">
                  <Zap className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                  <div className="text-2xl font-bold">
                    {events.reduce((total, event) => total + (event.ecoImpact.carbonOffset || 0), 0)}
                  </div>
                  <div className="text-sm text-gray-300">Tons CO₂ Offset</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-900 to-purple-800 border-purple-700">
                <CardContent className="p-6 text-center">
                  <Users className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                  <div className="text-2xl font-bold">
                    {events.reduce((total, event) => total + event.currentAttendees, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-300">Total Participants</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-yellow-900 to-yellow-800 border-yellow-700">
                <CardContent className="p-6 text-center">
                  <Gift className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
                  <div className="text-2xl font-bold">
                    {events.reduce((total, event) => total + event.rewards.tokens, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-300">Total Tokens Rewarded</div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Personal Impact Summary</CardTitle>
              </CardHeader>
              <CardContent>
                {userEvents.length > 0 ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-green-400">
                          {userEvents.reduce((total, id) => {
                            const event = events.find(e => e.id === id);
                            return total + (event?.ecoImpact.treesPlanted || 0);
                          }, 0)}
                        </div>
                        <div className="text-sm text-gray-400">Your Trees</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-400">
                          {userEvents.reduce((total, id) => {
                            const event = events.find(e => e.id === id);
                            return total + (event?.ecoImpact.carbonOffset || 0);
                          }, 0)}
                        </div>
                        <div className="text-sm text-gray-400">CO₂ Offset</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-yellow-400">
                          {userEvents.reduce((total, id) => {
                            const event = events.find(e => e.id === id);
                            return total + (event?.rewards.tokens || 0);
                          }, 0)}
                        </div>
                        <div className="text-sm text-gray-400">Tokens Earned</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-400">{userEvents.length}</div>
                        <div className="text-sm text-gray-400">Events Joined</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Heart className="w-16 h-16 mx-auto mb-4 text-gray-500" />
                    <h3 className="text-xl font-semibold mb-2">Start Your Impact Journey</h3>
                    <p className="text-gray-400">
                      Register for events to track your environmental impact and earn rewards!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PartyEventDiscount;