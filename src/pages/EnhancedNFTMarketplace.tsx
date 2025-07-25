import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Sparkles, 
  Star, 
  Leaf, 
  Fish, 
  TreePine,
  Mountain,
  Sun,
  Eye,
  Heart,
  ShoppingCart,
  Coins,
  TrendingUp,
  Award,
  Shield,
  Activity,
  Camera,
  Globe,
  Users,
  Zap,
  Crown,
  Gem,
  Palette,
  Search,
  Filter,
  SortAsc,
  ExternalLink
} from 'lucide-react';
import { toast } from 'sonner';
import { Navbar } from '@/components/Navbar';

interface NFT {
  id: string;
  name: string;
  category: 'biodiversity' | 'conservation' | 'renewable' | 'climate' | 'ocean' | 'forest';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic';
  description: string;
  image: string;
  creator: string;
  owner: string;
  price: number;
  lastSale?: number;
  views: number;
  likes: number;
  minted: string;
  edition: {
    current: number;
    total: number;
  };
  attributes: {
    trait_type: string;
    value: string | number;
    rarity: number; // percentage
  }[];
  environmental_impact: {
    carbon_offset: number;
    trees_planted: number;
    conservation_fund: number;
    species_protected?: string[];
  };
  utility: string[];
  status: 'available' | 'sold' | 'auction' | 'not_for_sale';
  auction?: {
    highest_bid: number;
    bidders: number;
    ends_at: string;
  };
}

interface Collection {
  id: string;
  name: string;
  description: string;
  creator: string;
  total_items: number;
  floor_price: number;
  volume: number;
  owners: number;
  category: string;
  verified: boolean;
  featured: boolean;
}

const EnhancedNFTMarketplace: React.FC = () => {
  const [nfts, setNFTs] = useState<NFT[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [userNFTs, setUserNFTs] = useState<string[]>([]);
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterRarity, setFilterRarity] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('price_low');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Initialize sample NFTs
    const sampleNFTs: NFT[] = [
      {
        id: 'nft-001',
        name: 'Ancient Forest Guardian',
        category: 'forest',
        rarity: 'legendary',
        description: 'A mystical guardian that protects ancient forests and their biodiversity. This NFT represents 1000 trees planted in the Amazon rainforest.',
        image: '/api/placeholder/300/300',
        creator: 'EcoArtist',
        owner: 'ForestLover',
        price: 2.5,
        lastSale: 2.1,
        views: 2340,
        likes: 456,
        minted: '2024-12-15',
        edition: { current: 1, total: 10 },
        attributes: [
          { trait_type: 'Element', value: 'Forest', rarity: 15.2 },
          { trait_type: 'Power Level', value: 95, rarity: 8.7 },
          { trait_type: 'Age', value: 'Ancient', rarity: 3.2 },
          { trait_type: 'Magic Type', value: 'Nature', rarity: 12.1 }
        ],
        environmental_impact: {
          carbon_offset: 25.5,
          trees_planted: 1000,
          conservation_fund: 500,
          species_protected: ['Jaguar', 'Toucan', 'Tree Frog']
        },
        utility: ['Forest Access Pass', 'Conservation Voting Rights', 'Eco-Retreat Discount'],
        status: 'available'
      },
      {
        id: 'nft-002',
        name: 'Ocean Depths Protector',
        category: 'ocean',
        rarity: 'epic',
        description: 'Guardian of the deep seas, protecting marine life and coral reefs. Each NFT funds ocean cleanup initiatives.',
        image: '/api/placeholder/300/300',
        creator: 'MarineArt',
        owner: 'OceanGuardian',
        price: 1.8,
        views: 1890,
        likes: 234,
        minted: '2024-12-10',
        edition: { current: 3, total: 25 },
        attributes: [
          { trait_type: 'Element', value: 'Ocean', rarity: 18.5 },
          { trait_type: 'Depth', value: 'Abyssal', rarity: 6.3 },
          { trait_type: 'Coral Type', value: 'Rainbow', rarity: 4.1 },
          { trait_type: 'Marine Life', value: 'Whale Song', rarity: 2.8 }
        ],
        environmental_impact: {
          carbon_offset: 15.2,
          trees_planted: 0,
          conservation_fund: 350,
          species_protected: ['Blue Whale', 'Sea Turtle', 'Coral Reef']
        },
        utility: ['Marine Research Access', 'Ocean Cleanup Participation', 'Dive Trip Discounts'],
        status: 'auction',
        auction: {
          highest_bid: 2.1,
          bidders: 8,
          ends_at: '2025-01-30T18:00:00Z'
        }
      },
      {
        id: 'nft-003',
        name: 'Solar Phoenix Rising',
        category: 'renewable',
        rarity: 'mythic',
        description: 'A legendary phoenix powered by solar energy, symbolizing renewable energy transition and climate action.',
        image: '/api/placeholder/300/300',
        creator: 'SolarDreamer',
        owner: 'RenewableEnergy',
        price: 5.0,
        lastSale: 4.2,
        views: 3456,
        likes: 892,
        minted: '2024-11-28',
        edition: { current: 1, total: 1 },
        attributes: [
          { trait_type: 'Energy Type', value: 'Solar', rarity: 25.3 },
          { trait_type: 'Power Output', value: 'Maximum', rarity: 1.2 },
          { trait_type: 'Flight Pattern', value: 'Eternal', rarity: 0.8 },
          { trait_type: 'Flame Color', value: 'Golden', rarity: 2.5 }
        ],
        environmental_impact: {
          carbon_offset: 50.0,
          trees_planted: 2500,
          conservation_fund: 1000,
          species_protected: ['Desert Tortoise', 'Solar Butterfly']
        },
        utility: ['Solar Farm Access', 'Energy Trading Rights', 'Green Tech Conference Pass'],
        status: 'not_for_sale'
      },
      {
        id: 'nft-004',
        name: 'Mountain Spirit Protector',
        category: 'conservation',
        rarity: 'rare',
        description: 'Ancient mountain spirit that guards wildlife habitats and promotes biodiversity conservation.',
        image: '/api/placeholder/300/300',
        creator: 'MountainSage',
        owner: 'Available',
        price: 1.2,
        views: 1234,
        likes: 345,
        minted: '2024-12-20',
        edition: { current: 7, total: 50 },
        attributes: [
          { trait_type: 'Element', value: 'Earth', rarity: 22.1 },
          { trait_type: 'Altitude', value: 'Peak', rarity: 12.7 },
          { trait_type: 'Wildlife', value: 'Snow Leopard', rarity: 1.5 },
          { trait_type: 'Season', value: 'Winter', rarity: 25.0 }
        ],
        environmental_impact: {
          carbon_offset: 8.5,
          trees_planted: 300,
          conservation_fund: 200,
          species_protected: ['Snow Leopard', 'Mountain Goat', 'Golden Eagle']
        },
        utility: ['Mountain Access Pass', 'Wildlife Photography License', 'Conservation Project Voting'],
        status: 'available'
      },
      {
        id: 'nft-005',
        name: 'Climate Change Warrior',
        category: 'climate',
        rarity: 'uncommon',
        description: 'A warrior dedicated to fighting climate change through education and direct action initiatives.',
        image: '/api/placeholder/300/300',
        creator: 'ClimateActivist',
        owner: 'Available',
        price: 0.8,
        views: 890,
        likes: 123,
        minted: '2025-01-05',
        edition: { current: 15, total: 100 },
        attributes: [
          { trait_type: 'Action Type', value: 'Education', rarity: 35.2 },
          { trait_type: 'Impact Level', value: 'Global', rarity: 18.9 },
          { trait_type: 'Weapon', value: 'Knowledge', rarity: 45.1 },
          { trait_type: 'Armor', value: 'Solar Shield', rarity: 28.3 }
        ],
        environmental_impact: {
          carbon_offset: 5.2,
          trees_planted: 100,
          conservation_fund: 150,
        },
        utility: ['Climate Education Access', 'Action Network Membership', 'Green Events Discount'],
        status: 'available'
      },
      {
        id: 'nft-006',
        name: 'Biodiversity Bloom',
        category: 'biodiversity',
        rarity: 'common',
        description: 'A beautiful representation of biodiversity with multiple species coexisting in harmony.',
        image: '/api/placeholder/300/300',
        creator: 'NaturePhotographer',
        owner: 'Available',
        price: 0.3,
        views: 567,
        likes: 89,
        minted: '2025-01-10',
        edition: { current: 45, total: 500 },
        attributes: [
          { trait_type: 'Species Count', value: 12, rarity: 55.8 },
          { trait_type: 'Ecosystem', value: 'Rainforest', rarity: 32.1 },
          { trait_type: 'Season', value: 'Spring', rarity: 25.0 },
          { trait_type: 'Rarity Index', value: 'Common', rarity: 60.5 }
        ],
        environmental_impact: {
          carbon_offset: 2.1,
          trees_planted: 50,
          conservation_fund: 75,
          species_protected: ['Butterfly', 'Bee', 'Hummingbird']
        },
        utility: ['Nature Education Content', 'Community Garden Access'],
        status: 'available'
      }
    ];

    const sampleCollections: Collection[] = [
      {
        id: 'collection-001',
        name: 'Guardians of Gaia',
        description: 'Elite collection of environmental protectors with real-world conservation impact.',
        creator: 'GaiaStudios',
        total_items: 10000,
        floor_price: 0.5,
        volume: 2500.5,
        owners: 3456,
        category: 'conservation',
        verified: true,
        featured: true
      },
      {
        id: 'collection-002',
        name: 'Ocean Depths',
        description: 'Mystical creatures from the deepest parts of our oceans, each funding marine conservation.',
        creator: 'DeepSeaArt',
        total_items: 5000,
        floor_price: 0.8,
        volume: 1890.2,
        owners: 1234,
        category: 'ocean',
        verified: true,
        featured: true
      },
      {
        id: 'collection-003',
        name: 'Renewable Spirits',
        description: 'Energy beings representing different forms of renewable energy and sustainability.',
        creator: 'EcoEnergy',
        total_items: 2500,
        floor_price: 1.2,
        volume: 3456.8,
        owners: 890,
        category: 'renewable',
        verified: true,
        featured: false
      }
    ];

    setNFTs(sampleNFTs);
    setCollections(sampleCollections);

    // Load user NFTs
    const savedUserNFTs = localStorage.getItem('userNFTs');
    if (savedUserNFTs) {
      setUserNFTs(JSON.parse(savedUserNFTs));
    }
  }, []);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-600';
      case 'uncommon': return 'bg-green-600';
      case 'rare': return 'bg-blue-600';
      case 'epic': return 'bg-purple-600';
      case 'legendary': return 'bg-yellow-600';
      case 'mythic': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'forest': return TreePine;
      case 'ocean': return Fish;
      case 'renewable': return Sun;
      case 'conservation': return Shield;
      case 'climate': return Globe;
      case 'biodiversity': return Leaf;
      default: return Sparkles;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'forest': return 'text-green-500';
      case 'ocean': return 'text-blue-500';
      case 'renewable': return 'text-yellow-500';
      case 'conservation': return 'text-purple-500';
      case 'climate': return 'text-red-500';
      case 'biodiversity': return 'text-pink-500';
      default: return 'text-gray-500';
    }
  };

  const handlePurchaseNFT = async (nftId: string) => {
    const nft = nfts.find(n => n.id === nftId);
    if (!nft || nft.status !== 'available') return;

    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const updatedUserNFTs = [...userNFTs, nftId];
      setUserNFTs(updatedUserNFTs);
      localStorage.setItem('userNFTs', JSON.stringify(updatedUserNFTs));

      // Update NFT status
      setNFTs(prev => prev.map(n => 
        n.id === nftId 
          ? { ...n, status: 'sold' as const, owner: 'You' }
          : n
      ));

      toast.success(
        `Successfully purchased ${nft.name}!`,
        {
          description: `You now own this ${nft.rarity} NFT and contributed to environmental conservation.`
        }
      );

    } catch (error) {
      toast.error('Purchase failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceBid = async (nftId: string, bidAmount: number) => {
    const nft = nfts.find(n => n.id === nftId);
    if (!nft || nft.status !== 'auction') return;

    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Update auction data
      setNFTs(prev => prev.map(n => 
        n.id === nftId && n.auction
          ? { 
              ...n, 
              auction: { 
                ...n.auction, 
                highest_bid: bidAmount,
                bidders: n.auction.bidders + 1
              }
            }
          : n
      ));

      toast.success(
        `Bid placed successfully!`,
        {
          description: `Your bid of ${bidAmount} ETH has been recorded.`
        }
      );

    } catch (error) {
      toast.error('Bid placement failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filteredNFTs = nfts.filter(nft => {
    const matchesSearch = nft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         nft.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || nft.category === filterCategory;
    const matchesRarity = filterRarity === 'all' || nft.rarity === filterRarity;
    
    return matchesSearch && matchesCategory && matchesRarity;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price_low': return a.price - b.price;
      case 'price_high': return b.price - a.price;
      case 'rarity': 
        const rarityOrder = ['common', 'uncommon', 'rare', 'epic', 'legendary', 'mythic'];
        return rarityOrder.indexOf(b.rarity) - rarityOrder.indexOf(a.rarity);
      case 'newest': return new Date(b.minted).getTime() - new Date(a.minted).getTime();
      default: return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
            <Sparkles className="text-purple-400" />
            Enhanced NFT Marketplace
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl">
            Discover, collect, and trade environmental NFTs that make a real impact. Each NFT contributes to conservation, 
            renewable energy, and biodiversity protection while providing unique utility and exclusive access.
          </p>
        </div>

        <Tabs defaultValue="marketplace" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800">
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="collections">Collections</TabsTrigger>
            <TabsTrigger value="my-nfts">My NFTs</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>

          <TabsContent value="marketplace" className="space-y-6">
            {/* Search and Filter Bar */}
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="flex-1 min-w-64">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search NFTs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                  
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="all">All Categories</option>
                    <option value="biodiversity">Biodiversity</option>
                    <option value="conservation">Conservation</option>
                    <option value="renewable">Renewable Energy</option>
                    <option value="climate">Climate Action</option>
                    <option value="ocean">Ocean Protection</option>
                    <option value="forest">Forest Conservation</option>
                  </select>

                  <select
                    value={filterRarity}
                    onChange={(e) => setFilterRarity(e.target.value)}
                    className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="all">All Rarities</option>
                    <option value="common">Common</option>
                    <option value="uncommon">Uncommon</option>
                    <option value="rare">Rare</option>
                    <option value="epic">Epic</option>
                    <option value="legendary">Legendary</option>
                    <option value="mythic">Mythic</option>
                  </select>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="rarity">Rarity</option>
                    <option value="newest">Newest First</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* NFT Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredNFTs.map((nft) => {
                const CategoryIcon = getCategoryIcon(nft.category);
                const categoryColor = getCategoryColor(nft.category);
                const isOwned = userNFTs.includes(nft.id);
                
                return (
                  <Card key={nft.id} className="bg-gray-800 border-gray-700 hover:border-purple-500 transition-colors group">
                    <CardHeader className="pb-2">
                      <div className="relative aspect-square bg-gray-700 rounded-lg overflow-hidden mb-3">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                          <CategoryIcon className={`w-16 h-16 ${categoryColor}`} />
                        </div>
                        {nft.status === 'auction' && (
                          <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                            AUCTION
                          </div>
                        )}
                        <div className="absolute top-2 right-2 flex gap-1">
                          <Badge className={getRarityColor(nft.rarity)}>
                            {nft.rarity}
                          </Badge>
                        </div>
                        <div className="absolute bottom-2 left-2 flex items-center gap-2 text-xs">
                          <div className="flex items-center gap-1 bg-black/50 rounded px-2 py-1">
                            <Eye className="w-3 h-3" />
                            {nft.views}
                          </div>
                          <div className="flex items-center gap-1 bg-black/50 rounded px-2 py-1">
                            <Heart className="w-3 h-3" />
                            {nft.likes}
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <CardTitle className="text-lg flex items-center justify-between">
                          <span className="truncate">{nft.name}</span>
                          {isOwned && <Crown className="w-4 h-4 text-yellow-500 flex-shrink-0" />}
                        </CardTitle>
                        <div className="flex items-center justify-between text-sm text-gray-400">
                          <span>by {nft.creator}</span>
                          <span>#{nft.edition.current}/{nft.edition.total}</span>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <p className="text-gray-300 text-sm line-clamp-2">{nft.description}</p>
                      
                      {/* Environmental Impact */}
                      <div className="bg-green-900/20 border border-green-500/30 rounded p-3">
                        <h4 className="text-sm font-semibold text-green-400 mb-2">Environmental Impact</h4>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex justify-between">
                            <span>CO₂ Offset:</span>
                            <span className="text-green-400">{nft.environmental_impact.carbon_offset}t</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Trees:</span>
                            <span className="text-green-400">{nft.environmental_impact.trees_planted}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Fund:</span>
                            <span className="text-green-400">${nft.environmental_impact.conservation_fund}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Species:</span>
                            <span className="text-green-400">{nft.environmental_impact.species_protected?.length || 0}</span>
                          </div>
                        </div>
                      </div>

                      {/* Utility */}
                      <div>
                        <h4 className="text-sm font-semibold mb-2">Utility</h4>
                        <div className="flex flex-wrap gap-1">
                          {nft.utility.slice(0, 2).map(utility => (
                            <Badge key={utility} variant="outline" className="text-xs">
                              {utility}
                            </Badge>
                          ))}
                          {nft.utility.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{nft.utility.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Price and Actions */}
                      <div className="border-t border-gray-700 pt-4">
                        {nft.status === 'available' && (
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <div className="text-sm text-gray-400">Price</div>
                              <div className="text-xl font-bold flex items-center gap-1">
                                <Coins className="w-4 h-4 text-yellow-500" />
                                {nft.price} ETH
                              </div>
                              {nft.lastSale && (
                                <div className="text-xs text-gray-500">
                                  Last: {nft.lastSale} ETH
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {nft.status === 'auction' && nft.auction && (
                          <div className="mb-3">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-gray-400">Highest Bid</span>
                              <span className="text-sm">{nft.auction.bidders} bidders</span>
                            </div>
                            <div className="text-xl font-bold flex items-center gap-1">
                              <Coins className="w-4 h-4 text-yellow-500" />
                              {nft.auction.highest_bid} ETH
                            </div>
                            <div className="text-xs text-gray-500">
                              Ends: {new Date(nft.auction.ends_at).toLocaleDateString()}
                            </div>
                          </div>
                        )}

                        <div className="flex gap-2">
                          {nft.status === 'available' && !isOwned && (
                            <Button 
                              className="flex-1 bg-purple-600 hover:bg-purple-700"
                              onClick={() => handlePurchaseNFT(nft.id)}
                              disabled={loading}
                            >
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              Buy Now
                            </Button>
                          )}
                          
                          {nft.status === 'auction' && !isOwned && (
                            <Button 
                              className="flex-1 bg-orange-600 hover:bg-orange-700"
                              onClick={() => handlePlaceBid(nft.id, (nft.auction?.highest_bid || 0) + 0.1)}
                              disabled={loading}
                            >
                              <TrendingUp className="w-4 h-4 mr-2" />
                              Place Bid
                            </Button>
                          )}

                          {isOwned && (
                            <Button className="flex-1 bg-green-600 cursor-default" disabled>
                              <Crown className="w-4 h-4 mr-2" />
                              Owned
                            </Button>
                          )}

                          {nft.status === 'not_for_sale' && (
                            <Button className="flex-1 bg-gray-600 cursor-default" disabled>
                              Not for Sale
                            </Button>
                          )}

                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedNFT(nft)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="collections" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {collections.map((collection) => (
                <Card key={collection.id} className="bg-gray-800 border-gray-700 hover:border-purple-500 transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Palette className="w-5 h-5 text-purple-400" />
                        {collection.name}
                        {collection.verified && (
                          <Badge className="bg-blue-600">
                            <Award className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </CardTitle>
                      {collection.featured && (
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      )}
                    </div>
                    <div className="text-sm text-gray-400">
                      by {collection.creator}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-300 text-sm">{collection.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-gray-400 text-sm">Items</span>
                        <div className="font-semibold">{collection.total_items.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm">Owners</span>
                        <div className="font-semibold">{collection.owners.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm">Floor Price</span>
                        <div className="font-semibold text-purple-400">{collection.floor_price} ETH</div>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm">Volume</span>
                        <div className="font-semibold text-green-400">{collection.volume} ETH</div>
                      </div>
                    </div>

                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Collection
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my-nfts" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {userNFTs.map(nftId => {
                const nft = nfts.find(n => n.id === nftId);
                if (!nft) return null;

                const CategoryIcon = getCategoryIcon(nft.category);
                const categoryColor = getCategoryColor(nft.category);

                return (
                  <Card key={nftId} className="bg-gray-800 border-gray-700">
                    <CardHeader className="pb-2">
                      <div className="relative aspect-square bg-gray-700 rounded-lg overflow-hidden mb-3">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                          <CategoryIcon className={`w-16 h-16 ${categoryColor}`} />
                        </div>
                        <div className="absolute top-2 right-2 flex gap-1">
                          <Badge className={getRarityColor(nft.rarity)}>
                            {nft.rarity}
                          </Badge>
                        </div>
                        <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">
                          OWNED
                        </div>
                      </div>
                      
                      <CardTitle className="text-lg">{nft.name}</CardTitle>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Purchased</span>
                          <div className="font-semibold">{nft.price} ETH</div>
                        </div>
                        <div>
                          <span className="text-gray-400">Current Value</span>
                          <div className="font-semibold text-green-400">
                            {(nft.price * 1.2).toFixed(2)} ETH
                          </div>
                        </div>
                      </div>

                      <div className="bg-green-900/20 border border-green-500/30 rounded p-3">
                        <h4 className="text-sm font-semibold text-green-400 mb-2">Your Impact</h4>
                        <div className="text-xs space-y-1">
                          <div className="flex justify-between">
                            <span>CO₂ Offset:</span>
                            <span className="text-green-400">{nft.environmental_impact.carbon_offset}t</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Trees Planted:</span>
                            <span className="text-green-400">{nft.environmental_impact.trees_planted}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Conservation Fund:</span>
                            <span className="text-green-400">${nft.environmental_impact.conservation_fund}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1">
                          <Gem className="w-4 h-4 mr-2" />
                          List for Sale
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
              
              {userNFTs.length === 0 && (
                <Card className="bg-gray-800 border-gray-700 col-span-full">
                  <CardContent className="p-8 text-center">
                    <Sparkles className="w-16 h-16 mx-auto mb-4 text-gray-500" />
                    <h3 className="text-xl font-semibold mb-2">No NFTs Owned</h3>
                    <p className="text-gray-400 mb-4">
                      Start your collection by purchasing environmental NFTs that make a real impact.
                    </p>
                    <Button onClick={() => document.querySelector('[value="marketplace"]')?.click()}>
                      Browse Marketplace
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-gradient-to-br from-purple-900 to-purple-800 border-purple-700">
                <CardContent className="p-6 text-center">
                  <Sparkles className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                  <div className="text-2xl font-bold">
                    {nfts.length.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-300">Total NFTs</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-900 to-green-800 border-green-700">
                <CardContent className="p-6 text-center">
                  <TreePine className="w-12 h-12 mx-auto mb-4 text-green-400" />
                  <div className="text-2xl font-bold">
                    {nfts.reduce((total, nft) => total + nft.environmental_impact.trees_planted, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-300">Trees Planted</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-900 to-blue-800 border-blue-700">
                <CardContent className="p-6 text-center">
                  <Activity className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                  <div className="text-2xl font-bold">
                    {nfts.reduce((total, nft) => total + nft.environmental_impact.carbon_offset, 0).toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-300">Tons CO₂ Offset</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-yellow-900 to-yellow-800 border-yellow-700">
                <CardContent className="p-6 text-center">
                  <Coins className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
                  <div className="text-2xl font-bold">
                    ${nfts.reduce((total, nft) => total + nft.environmental_impact.conservation_fund, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-300">Conservation Fund</div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Personal Collection Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                {userNFTs.length > 0 ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-purple-400">{userNFTs.length}</div>
                        <div className="text-sm text-gray-400">NFTs Owned</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-400">
                          {userNFTs.reduce((total, id) => {
                            const nft = nfts.find(n => n.id === id);
                            return total + (nft?.environmental_impact.trees_planted || 0);
                          }, 0)}
                        </div>
                        <div className="text-sm text-gray-400">Your Trees</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-400">
                          {userNFTs.reduce((total, id) => {
                            const nft = nfts.find(n => n.id === id);
                            return total + (nft?.environmental_impact.carbon_offset || 0);
                          }, 0).toFixed(1)}
                        </div>
                        <div className="text-sm text-gray-400">Your CO₂ Offset</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-yellow-400">
                          {userNFTs.reduce((total, id) => {
                            const nft = nfts.find(n => n.id === id);
                            return total + (nft?.price || 0);
                          }, 0).toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-400">ETH Invested</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Gem className="w-16 h-16 mx-auto mb-4 text-gray-500" />
                    <h3 className="text-xl font-semibold mb-2">Start Your Impact Collection</h3>
                    <p className="text-gray-400">
                      Purchase environmental NFTs to track your conservation impact and exclusive benefits.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* NFT Detail Modal */}
        {selectedNFT && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="bg-gray-800 border-gray-700 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">{selectedNFT.name}</CardTitle>
                  <Button variant="outline" onClick={() => setSelectedNFT(null)}>
                    ×
                  </Button>
                </div>
                <div className="flex items-center gap-4">
                  <Badge className={getRarityColor(selectedNFT.rarity)}>
                    {selectedNFT.rarity}
                  </Badge>
                  <span className="text-gray-400">by {selectedNFT.creator}</span>
                  <span className="text-gray-400">#{selectedNFT.edition.current}/{selectedNFT.edition.total}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="aspect-square bg-gray-700 rounded-lg flex items-center justify-center">
                    <div className="text-6xl">{getCategoryIcon(selectedNFT.category)}</div>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-gray-300">{selectedNFT.description}</p>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Attributes</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedNFT.attributes.map((attr, index) => (
                          <div key={index} className="bg-gray-700 p-2 rounded">
                            <div className="text-xs text-gray-400">{attr.trait_type}</div>
                            <div className="font-semibold">{attr.value}</div>
                            <div className="text-xs text-purple-400">{attr.rarity}% rare</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Environmental Impact</h4>
                      <div className="bg-green-900/20 border border-green-500/30 rounded p-4 space-y-2">
                        <div className="flex justify-between">
                          <span>Carbon Offset:</span>
                          <span className="text-green-400">{selectedNFT.environmental_impact.carbon_offset} tons</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Trees Planted:</span>
                          <span className="text-green-400">{selectedNFT.environmental_impact.trees_planted}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Conservation Fund:</span>
                          <span className="text-green-400">${selectedNFT.environmental_impact.conservation_fund}</span>
                        </div>
                        {selectedNFT.environmental_impact.species_protected && (
                          <div>
                            <span>Species Protected:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {selectedNFT.environmental_impact.species_protected.map(species => (
                                <Badge key={species} variant="outline" className="text-xs">
                                  {species}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Utility & Benefits</h4>
                      <div className="space-y-1">
                        {selectedNFT.utility.map((utility, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-300">{utility}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedNFTMarketplace;