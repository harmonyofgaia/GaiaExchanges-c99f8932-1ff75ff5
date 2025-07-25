import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Vote, 
  Users, 
  Award, 
  Clock, 
  CheckCircle,
  Brain,
  Globe,
  Lightbulb,
  FileText,
  Calendar,
  Target,
  TrendingUp,
  Shield,
  Star,
  Play,
  Download,
  MessageSquare,
  Zap,
  Heart,
  TreePine,
  Coins
} from 'lucide-react';
import { toast } from 'sonner';
import { Navbar } from '@/components/Navbar';

interface Course {
  id: string;
  title: string;
  category: 'environment' | 'blockchain' | 'governance' | 'sustainability' | 'conservation';
  description: string;
  instructor: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string; // in hours
  modules: number;
  enrolledStudents: number;
  rating: number;
  price: number;
  rewards: {
    tokens: number;
    certificate: string;
    badges: string[];
  };
  completionRate: number;
  skills: string[];
  prerequisites?: string[];
  language: string;
  status: 'active' | 'coming-soon' | 'completed';
}

interface Proposal {
  id: string;
  title: string;
  category: 'environmental' | 'governance' | 'technical' | 'community' | 'funding';
  description: string;
  proposer: string;
  proposedDate: string;
  votingDeadline: string;
  status: 'active' | 'passed' | 'rejected' | 'implemented';
  votesFor: number;
  votesAgainst: number;
  totalVotes: number;
  requiredVotes: number;
  impactArea: string[];
  fundingRequired?: number;
  expectedOutcomes: string[];
  implementation: {
    timeline: string;
    responsible: string;
    milestones: string[];
  };
}

interface GovernanceStats {
  totalProposals: number;
  activeProposals: number;
  totalVoters: number;
  participationRate: number;
  implementedProposals: number;
  communityGrowth: number;
}

const EducationGovernance: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [governanceStats, setGovernanceStats] = useState<GovernanceStats | null>(null);
  const [userCourses, setUserCourses] = useState<string[]>([]);
  const [userVotes, setUserVotes] = useState<Record<string, 'for' | 'against'>>({});
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Initialize sample courses
    const sampleCourses: Course[] = [
      {
        id: 'blockchain-env-1',
        title: 'Blockchain for Environmental Impact',
        category: 'blockchain',
        description: 'Learn how blockchain technology can be leveraged to create transparent and verifiable environmental impact tracking systems.',
        instructor: 'Dr. Sarah Green',
        difficulty: 'intermediate',
        duration: '8',
        modules: 12,
        enrolledStudents: 2340,
        rating: 4.8,
        price: 0, // Free
        rewards: {
          tokens: 500,
          certificate: 'Blockchain Environmental Specialist',
          badges: ['Blockchain Pioneer', 'Green Tech Advocate']
        },
        completionRate: 87,
        skills: ['Blockchain Basics', 'Smart Contracts', 'Carbon Tracking', 'Impact Verification'],
        language: 'English',
        status: 'active'
      },
      {
        id: 'climate-governance',
        title: 'Climate Governance and Policy',
        category: 'governance',
        description: 'Understand the complexities of climate governance, international agreements, and how communities can effectively participate in environmental decision-making.',
        instructor: 'Prof. Michael Climate',
        difficulty: 'advanced',
        duration: '12',
        modules: 16,
        enrolledStudents: 1890,
        rating: 4.9,
        price: 50,
        rewards: {
          tokens: 750,
          certificate: 'Climate Governance Expert',
          badges: ['Policy Maker', 'Governance Leader', 'Climate Advocate']
        },
        completionRate: 92,
        skills: ['Policy Analysis', 'Stakeholder Engagement', 'International Law', 'Community Organizing'],
        prerequisites: ['Basic Environmental Science'],
        language: 'English',
        status: 'active'
      },
      {
        id: 'conservation-biology',
        title: 'Conservation Biology Fundamentals',
        category: 'conservation',
        description: 'Explore the science behind wildlife conservation, habitat protection, and biodiversity preservation strategies.',
        instructor: 'Dr. Wildlife Protector',
        difficulty: 'beginner',
        duration: '6',
        modules: 10,
        enrolledStudents: 3450,
        rating: 4.7,
        price: 25,
        rewards: {
          tokens: 400,
          certificate: 'Conservation Biology Certificate',
          badges: ['Wildlife Protector', 'Biodiversity Guardian']
        },
        completionRate: 89,
        skills: ['Ecosystem Analysis', 'Species Protection', 'Habitat Management', 'Research Methods'],
        language: 'English',
        status: 'active'
      },
      {
        id: 'sustainable-living',
        title: 'Sustainable Living Mastery',
        category: 'sustainability',
        description: 'Master the art of sustainable living with practical tips, zero-waste strategies, and eco-friendly lifestyle choices.',
        instructor: 'Emma EcoLiving',
        difficulty: 'beginner',
        duration: '4',
        modules: 8,
        enrolledStudents: 5670,
        rating: 4.6,
        price: 0, // Free
        rewards: {
          tokens: 300,
          certificate: 'Sustainable Living Expert',
          badges: ['Eco Warrior', 'Zero Waste Champion']
        },
        completionRate: 94,
        skills: ['Zero Waste', 'Renewable Energy', 'Sustainable Food', 'Green Transportation'],
        language: 'English',
        status: 'active'
      },
      {
        id: 'carbon-markets',
        title: 'Carbon Markets and Trading',
        category: 'environment',
        description: 'Deep dive into carbon credit markets, trading mechanisms, and how individuals and organizations can participate in carbon offsetting.',
        instructor: 'Dr. Carbon Expert',
        difficulty: 'advanced',
        duration: '10',
        modules: 14,
        enrolledStudents: 1234,
        rating: 4.8,
        price: 75,
        rewards: {
          tokens: 600,
          certificate: 'Carbon Markets Specialist',
          badges: ['Carbon Expert', 'Market Analyst', 'Climate Finance']
        },
        completionRate: 85,
        skills: ['Carbon Accounting', 'Market Analysis', 'Project Development', 'Verification Protocols'],
        prerequisites: ['Basic Finance', 'Environmental Science'],
        language: 'English',
        status: 'active'
      }
    ];

    const sampleProposals: Proposal[] = [
      {
        id: 'prop-solar-initiative',
        title: 'Community Solar Farm Initiative',
        category: 'environmental',
        description: 'Proposal to establish community-owned solar farms that will provide clean energy to underserved communities while generating revenue for token holders.',
        proposer: 'SolarCommunity DAO',
        proposedDate: '2025-01-15',
        votingDeadline: '2025-02-15',
        status: 'active',
        votesFor: 15670,
        votesAgainst: 3420,
        totalVotes: 19090,
        requiredVotes: 25000,
        impactArea: ['Clean Energy', 'Community Development', 'Carbon Reduction'],
        fundingRequired: 2500000,
        expectedOutcomes: [
          '50 MW of clean solar energy generation',
          'Power for 12,000 households',
          '25,000 tons CO2 reduction annually',
          'Job creation in rural communities'
        ],
        implementation: {
          timeline: '18 months',
          responsible: 'Solar Development Committee',
          milestones: ['Site Selection', 'Permitting', 'Construction', 'Grid Connection']
        }
      },
      {
        id: 'prop-governance-update',
        title: 'Governance System Enhancement',
        category: 'governance',
        description: 'Upgrade our governance system to include quadratic voting, delegate systems, and improved proposal creation processes.',
        proposer: 'Governance Working Group',
        proposedDate: '2025-01-10',
        votingDeadline: '2025-02-10',
        status: 'active',
        votesFor: 12450,
        votesAgainst: 8930,
        totalVotes: 21380,
        requiredVotes: 20000,
        impactArea: ['Platform Governance', 'Community Participation', 'Decentralization'],
        expectedOutcomes: [
          'More equitable voting system',
          'Increased community participation',
          'Better proposal quality',
          'Reduced voter apathy'
        ],
        implementation: {
          timeline: '6 months',
          responsible: 'Tech Development Team',
          milestones: ['System Design', 'Smart Contract Development', 'Testing', 'Deployment']
        }
      },
      {
        id: 'prop-education-fund',
        title: 'Global Environmental Education Fund',
        category: 'community',
        description: 'Create a dedicated fund to provide free environmental education to underserved communities worldwide.',
        proposer: 'Education Alliance',
        proposedDate: '2025-01-20',
        votingDeadline: '2025-02-20',
        status: 'active',
        votesFor: 18920,
        votesAgainst: 2100,
        totalVotes: 21020,
        requiredVotes: 25000,
        impactArea: ['Education', 'Global Access', 'Capacity Building'],
        fundingRequired: 1000000,
        expectedOutcomes: [
          'Free courses for 100,000 students',
          'Translated content in 20 languages',
          'Local educator training programs',
          'Scholarships for environmental studies'
        ],
        implementation: {
          timeline: '12 months',
          responsible: 'Education Committee',
          milestones: ['Curriculum Development', 'Platform Enhancement', 'Translation', 'Launch']
        }
      },
      {
        id: 'prop-reforestation',
        title: 'Global Reforestation Partnership',
        category: 'environmental',
        description: 'Partner with international organizations to fund large-scale reforestation projects with verified carbon credits.',
        proposer: 'Forest Guardians',
        proposedDate: '2025-01-12',
        votingDeadline: '2025-02-12',
        status: 'passed',
        votesFor: 28750,
        votesAgainst: 4250,
        totalVotes: 33000,
        requiredVotes: 25000,
        impactArea: ['Reforestation', 'Carbon Sequestration', 'Biodiversity'],
        fundingRequired: 5000000,
        expectedOutcomes: [
          'Plant 10 million trees',
          'Restore 50,000 hectares of forest',
          'Sequester 2 million tons CO2',
          'Create 5,000 green jobs'
        ],
        implementation: {
          timeline: '36 months',
          responsible: 'Reforestation Alliance',
          milestones: ['Partner Selection', 'Site Preparation', 'Planting Phase 1', 'Monitoring & Expansion']
        }
      }
    ];

    const sampleGovernanceStats: GovernanceStats = {
      totalProposals: 47,
      activeProposals: 3,
      totalVoters: 45670,
      participationRate: 68.4,
      implementedProposals: 32,
      communityGrowth: 15.3
    };

    setCourses(sampleCourses);
    setProposals(sampleProposals);
    setGovernanceStats(sampleGovernanceStats);

    // Load user data
    const savedCourses = localStorage.getItem('userCourses');
    if (savedCourses) {
      setUserCourses(JSON.parse(savedCourses));
    }

    const savedVotes = localStorage.getItem('userVotes');
    if (savedVotes) {
      setUserVotes(JSON.parse(savedVotes));
    }
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'environment': return TreePine;
      case 'blockchain': return Zap;
      case 'governance': return Vote;
      case 'sustainability': return Heart;
      case 'conservation': return Shield;
      default: return BookOpen;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'environment': return 'text-green-500';
      case 'blockchain': return 'text-blue-500';
      case 'governance': return 'text-purple-500';
      case 'sustainability': return 'text-yellow-500';
      case 'conservation': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-600';
      case 'intermediate': return 'bg-yellow-600';
      case 'advanced': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-600';
      case 'passed': return 'bg-green-600';
      case 'rejected': return 'bg-red-600';
      case 'implemented': return 'bg-purple-600';
      default: return 'bg-gray-600';
    }
  };

  const handleEnrollCourse = async (courseId: string) => {
    if (userCourses.includes(courseId)) {
      toast.error('You are already enrolled in this course!');
      return;
    }

    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const updatedCourses = [...userCourses, courseId];
      setUserCourses(updatedCourses);
      localStorage.setItem('userCourses', JSON.stringify(updatedCourses));

      // Update enrollment count
      setCourses(prev => prev.map(c => 
        c.id === courseId 
          ? { ...c, enrolledStudents: c.enrolledStudents + 1 }
          : c
      ));

      const course = courses.find(c => c.id === courseId);
      toast.success(
        `Successfully enrolled in ${course?.title}!`,
        {
          description: `You'll earn ${course?.rewards.tokens} tokens upon completion.`
        }
      );

    } catch (error) {
      toast.error('Enrollment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (proposalId: string, vote: 'for' | 'against') => {
    if (userVotes[proposalId]) {
      toast.error('You have already voted on this proposal!');
      return;
    }

    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const updatedVotes = { ...userVotes, [proposalId]: vote };
      setUserVotes(updatedVotes);
      localStorage.setItem('userVotes', JSON.stringify(updatedVotes));

      // Update vote counts
      setProposals(prev => prev.map(p => 
        p.id === proposalId 
          ? { 
              ...p, 
              votesFor: vote === 'for' ? p.votesFor + 1 : p.votesFor,
              votesAgainst: vote === 'against' ? p.votesAgainst + 1 : p.votesAgainst,
              totalVotes: p.totalVotes + 1
            }
          : p
      ));

      toast.success(
        `Vote cast successfully!`,
        {
          description: `Your vote ${vote === 'for' ? 'in favor of' : 'against'} the proposal has been recorded.`
        }
      );

    } catch (error) {
      toast.error('Voting failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'}`} 
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
            <BookOpen className="text-blue-400" />
            Education & Governance Hub
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl">
            Advance your environmental knowledge through expert-led courses and participate in community governance to shape the future of our platform. 
            Learn, earn, and have your voice heard in building a sustainable future.
          </p>
        </div>

        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800">
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="proposals">Governance</TabsTrigger>
            <TabsTrigger value="my-learning">My Learning</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courses.filter(course => course.status === 'active').map((course) => {
                const CategoryIcon = getCategoryIcon(course.category);
                const categoryColor = getCategoryColor(course.category);
                const isEnrolled = userCourses.includes(course.id);
                
                return (
                  <Card key={course.id} className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CategoryIcon className={`w-5 h-5 ${categoryColor}`} />
                        <Badge className={getDifficultyColor(course.difficulty)}>
                          {course.difficulty}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          {renderStars(course.rating)}
                          <span className="ml-1">({course.rating})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {course.enrolledStudents.toLocaleString()}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-300 text-sm">{course.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Duration</span>
                          <div className="font-semibold">{course.duration} hours</div>
                        </div>
                        <div>
                          <span className="text-gray-400">Modules</span>
                          <div className="font-semibold">{course.modules}</div>
                        </div>
                        <div>
                          <span className="text-gray-400">Instructor</span>
                          <div className="font-semibold">{course.instructor}</div>
                        </div>
                        <div>
                          <span className="text-gray-400">Price</span>
                          <div className="font-semibold">
                            {course.price === 0 ? 'Free' : `$${course.price}`}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold mb-2">Skills You'll Learn</h4>
                        <div className="flex flex-wrap gap-1">
                          {course.skills.slice(0, 3).map(skill => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {course.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{course.skills.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="bg-gray-700 p-3 rounded-lg">
                        <h4 className="text-sm font-semibold mb-2">Course Rewards</h4>
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span>Tokens:</span>
                            <span className="text-yellow-400">{course.rewards.tokens}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Certificate:</span>
                            <span className="text-green-400">{course.rewards.certificate}</span>
                          </div>
                          {course.rewards.badges.length > 0 && (
                            <div>
                              <span>Badges: </span>
                              <span className="text-purple-400">{course.rewards.badges.join(', ')}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <Button 
                        className={`w-full ${
                          isEnrolled 
                            ? 'bg-green-600 cursor-default' 
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                        onClick={() => !isEnrolled && handleEnrollCourse(course.id)}
                        disabled={isEnrolled || loading}
                      >
                        {isEnrolled ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Enrolled
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Enroll Now
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="proposals" className="space-y-6">
            {governanceStats && (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4 text-center">
                    <FileText className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                    <div className="text-2xl font-bold">{governanceStats.totalProposals}</div>
                    <div className="text-sm text-gray-400">Total Proposals</div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4 text-center">
                    <Vote className="w-8 h-8 mx-auto mb-2 text-green-400" />
                    <div className="text-2xl font-bold">{governanceStats.activeProposals}</div>
                    <div className="text-sm text-gray-400">Active Proposals</div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4 text-center">
                    <Users className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                    <div className="text-2xl font-bold">{governanceStats.totalVoters.toLocaleString()}</div>
                    <div className="text-sm text-gray-400">Total Voters</div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4 text-center">
                    <TrendingUp className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                    <div className="text-2xl font-bold">{governanceStats.participationRate}%</div>
                    <div className="text-sm text-gray-400">Participation Rate</div>
                  </CardContent>
                </Card>
              </div>
            )}

            <div className="space-y-6">
              {proposals.map((proposal) => {
                const userVote = userVotes[proposal.id];
                const votingProgress = (proposal.totalVotes / proposal.requiredVotes) * 100;
                const supportPercentage = proposal.totalVotes > 0 ? (proposal.votesFor / proposal.totalVotes) * 100 : 0;
                
                return (
                  <Card key={proposal.id} className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">{proposal.title}</CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(proposal.status)}>
                            {proposal.status}
                          </Badge>
                          <Badge variant="outline">
                            {proposal.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div>Proposed by: {proposal.proposer}</div>
                        <div>•</div>
                        <div>Deadline: {proposal.votingDeadline}</div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <p className="text-gray-300">{proposal.description}</p>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">Impact Areas</h4>
                            <div className="flex flex-wrap gap-1">
                              {proposal.impactArea.map(area => (
                                <Badge key={area} variant="secondary" className="text-xs">
                                  {area}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2">Expected Outcomes</h4>
                            <ul className="text-sm text-gray-300 space-y-1">
                              {proposal.expectedOutcomes.map((outcome, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                  {outcome}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {proposal.fundingRequired && (
                            <div>
                              <h4 className="font-semibold mb-2">Funding Required</h4>
                              <div className="text-lg font-bold text-green-400">
                                ${proposal.fundingRequired.toLocaleString()}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">Voting Progress</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Total Votes</span>
                                <span>{proposal.totalVotes.toLocaleString()} / {proposal.requiredVotes.toLocaleString()}</span>
                              </div>
                              <Progress value={votingProgress} className="h-2" />
                              <div className="text-xs text-gray-400">
                                {votingProgress.toFixed(1)}% of required votes
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2">Vote Distribution</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-green-400">For: {proposal.votesFor.toLocaleString()}</span>
                                <span className="text-green-400">{supportPercentage.toFixed(1)}%</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-red-400">Against: {proposal.votesAgainst.toLocaleString()}</span>
                                <span className="text-red-400">{(100 - supportPercentage).toFixed(1)}%</span>
                              </div>
                              <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div 
                                  className="absolute top-0 left-0 h-full bg-green-500 rounded-full"
                                  style={{ width: `${supportPercentage}%` }}
                                />
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2">Implementation Plan</h4>
                            <div className="text-sm space-y-1">
                              <div className="flex justify-between">
                                <span className="text-gray-400">Timeline:</span>
                                <span>{proposal.implementation.timeline}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Responsible:</span>
                                <span>{proposal.implementation.responsible}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {proposal.status === 'active' && (
                        <div className="border-t border-gray-700 pt-4">
                          {userVote ? (
                            <div className="text-center">
                              <Badge variant="secondary" className="text-sm">
                                You voted: {userVote}
                              </Badge>
                            </div>
                          ) : (
                            <div className="flex gap-3 justify-center">
                              <Button 
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => handleVote(proposal.id, 'for')}
                                disabled={loading}
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Vote For
                              </Button>
                              <Button 
                                variant="destructive"
                                onClick={() => handleVote(proposal.id, 'against')}
                                disabled={loading}
                              >
                                Vote Against
                              </Button>
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="my-learning" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {userCourses.map(courseId => {
                const course = courses.find(c => c.id === courseId);
                if (!course) return null;

                const CategoryIcon = getCategoryIcon(course.category);
                const categoryColor = getCategoryColor(course.category);

                return (
                  <Card key={courseId} className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CategoryIcon className={`w-5 h-5 ${categoryColor}`} />
                        {course.title}
                        <Badge variant="secondary">Enrolled</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Progress</span>
                          <div className="font-semibold">0% Complete</div>
                          <Progress value={0} className="h-2 mt-1" />
                        </div>
                        <div>
                          <span className="text-gray-400">Time Spent</span>
                          <div className="font-semibold">0 hours</div>
                        </div>
                      </div>

                      <div className="bg-gray-700 p-3 rounded-lg">
                        <h4 className="font-semibold mb-2">Potential Rewards</h4>
                        <div className="text-sm space-y-1">
                          <div className="flex justify-between">
                            <span>Tokens:</span>
                            <span className="text-yellow-400">{course.rewards.tokens}</span>
                          </div>
                          <div className="text-xs text-gray-400">
                            Complete course to earn rewards
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                          <Play className="w-4 h-4 mr-2" />
                          Continue Learning
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
              
              {userCourses.length === 0 && (
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-8 text-center">
                    <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-500" />
                    <h3 className="text-xl font-semibold mb-2">No Courses Enrolled</h3>
                    <p className="text-gray-400 mb-4">
                      Start your learning journey by enrolling in environmental courses.
                    </p>
                    <Button onClick={() => setActiveTab("courses")}>
                      Browse Courses
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-gradient-to-br from-blue-900 to-blue-800 border-blue-700">
                <CardContent className="p-6 text-center">
                  <Users className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                  <div className="text-2xl font-bold">
                    {courses.reduce((total, course) => total + course.enrolledStudents, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-300">Total Students</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-900 to-green-800 border-green-700">
                <CardContent className="p-6 text-center">
                  <Award className="w-12 h-12 mx-auto mb-4 text-green-400" />
                  <div className="text-2xl font-bold">
                    {courses.reduce((total, course) => total + course.rewards.tokens, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-300">Tokens Available</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-900 to-purple-800 border-purple-700">
                <CardContent className="p-6 text-center">
                  <Vote className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                  <div className="text-2xl font-bold">
                    {proposals.reduce((total, proposal) => total + proposal.totalVotes, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-300">Votes Cast</div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Community Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-400">
                        {userCourses.length}
                      </div>
                      <div className="text-sm text-gray-400">Courses Enrolled</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-400">
                        {Object.keys(userVotes).length}
                      </div>
                      <div className="text-sm text-gray-400">Proposals Voted</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-yellow-400">
                        {userCourses.length * 100}
                      </div>
                      <div className="text-sm text-gray-400">Potential Tokens</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-400">
                        {Math.floor((userCourses.length + Object.keys(userVotes).length) * 1.5)}
                      </div>
                      <div className="text-sm text-gray-400">Community Score</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EducationGovernance;