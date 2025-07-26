import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { GraduationCap, BookOpen, Award, DollarSign, Users, Target, Zap, Heart } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { gaiaTokenService } from '@/services/gaiaTokenService'
import { GAIA_TOKEN } from '@/constants/gaia'
import { toast } from 'sonner'

interface ScholarshipData {
  id: string
  title: string
  category: 'environmental' | 'renewable_energy' | 'conservation' | 'sustainable_agriculture' | 'research'
  description: string
  amount: number // in GAIA tokens
  duration: number // months
  requirements: string[]
  deadline: Date
  applicants: number
  maxApplicants: number
  provider: string
  status: 'open' | 'closed' | 'funded' | 'completed'
  funded: number // current funding in GAIA
  targetFunding: number // target funding in GAIA
}

interface Application {
  id: string
  scholarshipId: string
  applicantName: string
  status: 'pending' | 'approved' | 'rejected' | 'funded'
  submittedDate: Date
  gaiaStaked: number
  documents: string[]
  score: number
}

interface ScholarshipProvider {
  id: string
  name: string
  totalScholarships: number
  totalFunded: number
  reputation: number
}

export default function Scholarship() {
  const [scholarships, setScholarships] = useState<ScholarshipData[]>([
    {
      id: '1',
      title: 'Green Technology Innovation Scholarship',
      category: 'renewable_energy',
      description: 'Support for students developing innovative renewable energy solutions',
      amount: 5000,
      duration: 12,
      requirements: [
        'Enrolled in engineering or environmental science program',
        'GPA above 3.5',
        'Demonstrated interest in renewable energy',
        'Community service in environmental causes'
      ],
      deadline: new Date('2024-06-30'),
      applicants: 127,
      maxApplicants: 200,
      provider: 'Gaia Environmental Foundation',
      status: 'open',
      funded: 4200,
      targetFunding: 5000
    },
    {
      id: '2',
      title: 'Conservation Biology Research Grant',
      category: 'conservation',
      description: 'Funding for graduate research in biodiversity conservation',
      amount: 8000,
      duration: 18,
      requirements: [
        'Masters or PhD program in biology/ecology',
        'Research proposal focused on conservation',
        'Publication record or strong academic performance',
        'Partnership with conservation organization'
      ],
      deadline: new Date('2024-08-15'),
      applicants: 89,
      maxApplicants: 100,
      provider: 'Wildlife Research Institute',
      status: 'open',
      funded: 6500,
      targetFunding: 8000
    },
    {
      id: '3',
      title: 'Sustainable Agriculture Innovation Fund',
      category: 'sustainable_agriculture',
      description: 'Support for developing climate-resilient farming techniques',
      amount: 3500,
      duration: 6,
      requirements: [
        'Agricultural studies or related field',
        'Experience with sustainable farming',
        'Business plan for implementation',
        'Community impact potential'
      ],
      deadline: new Date('2024-05-20'),
      applicants: 156,
      maxApplicants: 150,
      provider: 'Green Farming Collective',
      status: 'funded',
      funded: 3500,
      targetFunding: 3500
    }
  ])

  const [myApplications, setMyApplications] = useState<Application[]>([
    {
      id: '1',
      scholarshipId: '1',
      applicantName: 'Current User',
      status: 'pending',
      submittedDate: new Date('2024-01-15'),
      gaiaStaked: 100,
      documents: ['transcript.pdf', 'research_proposal.pdf', 'recommendation.pdf'],
      score: 85
    }
  ])

  const [userGaiaBalance, setUserGaiaBalance] = useState(0)
  const [isApplying, setIsApplying] = useState(false)
  const [selectedScholarship, setSelectedScholarship] = useState<string>('')

  useEffect(() => {
    const fetchBalance = async () => {
      const tokenData = await gaiaTokenService.fetchLiveTokenData()
      setUserGaiaBalance(1250)
    }
    fetchBalance()
  }, [])

  const applyForScholarship = async (scholarshipId: string, stakingAmount: number) => {
    if (userGaiaBalance < stakingAmount) {
      toast.error('Insufficient GAIA tokens', {
        description: `You need ${stakingAmount} GAIA tokens to apply`
      })
      return
    }

    const scholarship = scholarships.find(s => s.id === scholarshipId)
    if (!scholarship) return

    if (scholarship.applicants >= scholarship.maxApplicants) {
      toast.error('Scholarship application is full')
      return
    }

    setIsApplying(true)
    try {
      console.log(`Applying for scholarship ${scholarship.title} with ${stakingAmount} GAIA stake`)
      console.log(`Contract: ${GAIA_TOKEN.CONTRACT_ADDRESS}`)
      console.log(`Wallet: ${GAIA_TOKEN.WALLET_ADDRESS}`)
      
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      const newApplication: Application = {
        id: Date.now().toString(),
        scholarshipId,
        applicantName: 'Current User',
        status: 'pending',
        submittedDate: new Date(),
        gaiaStaked: stakingAmount,
        documents: ['application.pdf', 'transcript.pdf', 'essay.pdf'],
        score: Math.floor(Math.random() * 40) + 60 // Random score 60-100
      }
      
      setMyApplications(prev => [...prev, newApplication])
      setUserGaiaBalance(prev => prev - stakingAmount)
      
      // Update scholarship applicant count
      setScholarships(prev => prev.map(s => 
        s.id === scholarshipId 
          ? { ...s, applicants: s.applicants + 1 }
          : s
      ))
      
      toast.success('Application submitted successfully!', {
        description: `Staked ${stakingAmount} GAIA tokens. You'll be notified of results.`
      })
    } catch (error) {
      toast.error('Application failed', {
        description: 'Please try again later'
      })
    } finally {
      setIsApplying(false)
    }
  }

  const fundScholarship = async (scholarshipId: string, fundingAmount: number) => {
    if (userGaiaBalance < fundingAmount) {
      toast.error('Insufficient GAIA tokens for funding')
      return
    }

    try {
      console.log(`Funding scholarship ${scholarshipId} with ${fundingAmount} GAIA`)
      
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setScholarships(prev => prev.map(s => 
        s.id === scholarshipId 
          ? { 
              ...s, 
              funded: s.funded + fundingAmount,
              status: s.funded + fundingAmount >= s.targetFunding ? 'funded' : s.status
            }
          : s
      ))
      
      setUserGaiaBalance(prev => prev - fundingAmount)
      
      // Reward funder with bonus tokens
      const bonusAmount = Math.floor(fundingAmount * 0.1) // 10% bonus
      setTimeout(() => {
        setUserGaiaBalance(prev => prev + bonusAmount)
        toast.success(`Funding bonus: ${bonusAmount} GAIA tokens!`, {
          description: 'Thank you for supporting education'
        })
      }, 3000)
      
      toast.success('Scholarship funded successfully!', {
        description: `Contributed ${fundingAmount} GAIA tokens`
      })
    } catch (error) {
      toast.error('Funding failed')
    }
  }

  const createScholarship = async (scholarshipData: Partial<ScholarshipData>) => {
    const creationCost = 500
    if (userGaiaBalance < creationCost) {
      toast.error(`Need ${creationCost} GAIA tokens to create scholarship`)
      return
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 2500))
      
      const newScholarship: ScholarshipData = {
        id: Date.now().toString(),
        title: scholarshipData.title || 'New Scholarship',
        category: scholarshipData.category || 'environmental',
        description: scholarshipData.description || 'Educational scholarship',
        amount: scholarshipData.amount || 1000,
        duration: scholarshipData.duration || 6,
        requirements: scholarshipData.requirements || ['Basic requirements'],
        deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
        applicants: 0,
        maxApplicants: 100,
        provider: 'Community Provider',
        status: 'open',
        funded: 0,
        targetFunding: scholarshipData.amount || 1000
      }
      
      setScholarships(prev => [...prev, newScholarship])
      setUserGaiaBalance(prev => prev - creationCost)
      
      toast.success('Scholarship created successfully!', {
        description: 'Your scholarship is now open for applications'
      })
    } catch (error) {
      toast.error('Scholarship creation failed')
    }
  }

  const getStatusColor = (status: ScholarshipData['status']) => {
    switch (status) {
      case 'open': return 'text-green-400 border-green-400/20'
      case 'funded': return 'text-blue-400 border-blue-400/20'
      case 'closed': return 'text-red-400 border-red-400/20'
      case 'completed': return 'text-purple-400 border-purple-400/20'
      default: return 'text-gray-400 border-gray-400/20'
    }
  }

  const getCategoryIcon = (category: ScholarshipData['category']) => {
    switch (category) {
      case 'environmental': return '🌍'
      case 'renewable_energy': return '⚡'
      case 'conservation': return '🌲'
      case 'sustainable_agriculture': return '🌾'
      case 'research': return '🔬'
      default: return '📚'
    }
  }

  const getTotalStats = () => {
    const totalScholarships = scholarships.length
    const totalFunded = scholarships.reduce((sum, s) => sum + s.funded, 0)
    const totalStudentsSupported = scholarships.reduce((sum, s) => sum + (s.status === 'funded' ? 1 : 0), 0)
    
    return { totalScholarships, totalFunded, totalStudentsSupported }
  }

  const stats = getTotalStats()

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-blue-900/20">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-4">
            🎓 Scholarship Network
          </h1>
          <p className="text-xl text-muted-foreground">
            Fund education, support students, and earn GAIA tokens through educational impact
          </p>
        </div>

        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-indigo-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Scholarships</p>
                  <p className="text-2xl font-bold text-indigo-400">{stats.totalScholarships}</p>
                </div>
                <GraduationCap className="h-8 w-8 text-indigo-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Funded</p>
                  <p className="text-2xl font-bold text-purple-400">{stats.totalFunded.toLocaleString()} GAIA</p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Students Supported</p>
                  <p className="text-2xl font-bold text-blue-400">{stats.totalStudentsSupported}</p>
                </div>
                <Users className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">My Balance</p>
                  <p className="text-2xl font-bold text-green-400">{userGaiaBalance}</p>
                </div>
                <Zap className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="browse">Browse Scholarships</TabsTrigger>
            <TabsTrigger value="applications">My Applications</TabsTrigger>
            <TabsTrigger value="fund">Fund Scholarships</TabsTrigger>
            <TabsTrigger value="create">Create Scholarship</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {scholarships.map((scholarship) => (
                <Card key={scholarship.id} className="border-indigo-500/20">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{getCategoryIcon(scholarship.category)}</span>
                        <span className="text-indigo-400">{scholarship.title}</span>
                      </div>
                      <Badge className={getStatusColor(scholarship.status)}>
                        {scholarship.status}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {scholarship.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Amount</p>
                        <p className="font-bold text-yellow-400">{scholarship.amount.toLocaleString()} GAIA</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Duration</p>
                        <p className="font-bold">{scholarship.duration} months</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Applications</span>
                        <span>{scholarship.applicants}/{scholarship.maxApplicants}</span>
                      </div>
                      <Progress value={(scholarship.applicants / scholarship.maxApplicants) * 100} />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Funding Progress</span>
                        <span>{scholarship.funded}/{scholarship.targetFunding} GAIA</span>
                      </div>
                      <Progress value={(scholarship.funded / scholarship.targetFunding) * 100} />
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Requirements:</h4>
                      <ul className="text-xs space-y-1">
                        {scholarship.requirements.map((req, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-muted-foreground">•</span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        onClick={() => applyForScholarship(scholarship.id, 100)}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                        disabled={
                          isApplying || 
                          scholarship.status !== 'open' || 
                          scholarship.applicants >= scholarship.maxApplicants ||
                          userGaiaBalance < 100
                        }
                        size="sm"
                      >
                        <BookOpen className="h-3 w-3 mr-1" />
                        Apply (100 GAIA)
                      </Button>
                      <Button 
                        onClick={() => fundScholarship(scholarship.id, 200)}
                        className="flex-1 bg-purple-600 hover:bg-purple-700"
                        disabled={scholarship.status === 'funded' || userGaiaBalance < 200}
                        size="sm"
                      >
                        <Heart className="h-3 w-3 mr-1" />
                        Fund (200 GAIA)
                      </Button>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      Deadline: {scholarship.deadline.toLocaleDateString()} • Provider: {scholarship.provider}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <div className="space-y-4">
              {myApplications.length === 0 ? (
                <Card className="border-gray-500/20">
                  <CardContent className="p-8 text-center">
                    <GraduationCap className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">No Applications Yet</h3>
                    <p className="text-muted-foreground">
                      Browse scholarships and submit your first application
                    </p>
                  </CardContent>
                </Card>
              ) : (
                myApplications.map((application) => {
                  const scholarship = scholarships.find(s => s.id === application.scholarshipId)
                  if (!scholarship) return null

                  return (
                    <Card key={application.id} className="border-blue-500/20">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span className="text-blue-400">{scholarship.title}</span>
                          <Badge variant={
                            application.status === 'approved' ? 'default' :
                            application.status === 'funded' ? 'secondary' :
                            application.status === 'rejected' ? 'destructive' : 'outline'
                          }>
                            {application.status}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Submitted</p>
                            <p className="font-bold">{application.submittedDate.toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">GAIA Staked</p>
                            <p className="font-bold text-yellow-400">{application.gaiaStaked}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Application Score</p>
                            <p className="font-bold text-green-400">{application.score}/100</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Documents</p>
                            <p className="font-bold">{application.documents.length} files</p>
                          </div>
                        </div>

                        {application.status === 'pending' && (
                          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                            <p className="text-sm text-yellow-400">
                              Your application is under review. Results will be announced soon.
                            </p>
                          </div>
                        )}

                        {application.status === 'approved' && (
                          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                            <p className="text-sm text-green-400">
                              Congratulations! Your application has been approved. 
                              Funding will be released when the scholarship is fully funded.
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )
                })
              )}
            </div>
          </TabsContent>

          <TabsContent value="fund" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {scholarships.filter(s => s.status === 'open' && s.funded < s.targetFunding).map((scholarship) => (
                <Card key={scholarship.id} className="border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-xl">{getCategoryIcon(scholarship.category)}</span>
                      <span className="text-purple-400">{scholarship.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Funding Progress</span>
                        <span>{scholarship.funded}/{scholarship.targetFunding} GAIA</span>
                      </div>
                      <Progress value={(scholarship.funded / scholarship.targetFunding) * 100} />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Needed</p>
                        <p className="font-bold text-red-400">
                          {(scholarship.targetFunding - scholarship.funded).toLocaleString()} GAIA
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Applicants</p>
                        <p className="font-bold text-blue-400">{scholarship.applicants}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        onClick={() => fundScholarship(scholarship.id, 100)}
                        className="flex-1 bg-purple-600 hover:bg-purple-700"
                        disabled={userGaiaBalance < 100}
                        size="sm"
                      >
                        Fund 100 GAIA
                      </Button>
                      <Button 
                        onClick={() => fundScholarship(scholarship.id, 500)}
                        className="flex-1 bg-purple-600 hover:bg-purple-700"
                        disabled={userGaiaBalance < 500}
                        size="sm"
                      >
                        Fund 500 GAIA
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            <Card className="border-green-500/20">
              <CardHeader>
                <CardTitle className="text-green-400">Create New Scholarship</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center space-y-4">
                  <Award className="h-16 w-16 text-green-400 mx-auto" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Launch Your Scholarship</h3>
                    <p className="text-muted-foreground">
                      Create a scholarship to support students in environmental studies.
                      Cost: 500 GAIA tokens to create and manage.
                    </p>
                  </div>
                  
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-left">
                    <h4 className="font-bold text-green-400 mb-2">Scholarship Creation Benefits:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Build your reputation as an education supporter</li>
                      <li>• Earn GAIA rewards when students succeed</li>
                      <li>• Tax benefits and recognition</li>
                      <li>• Direct impact on environmental education</li>
                      <li>• Access to scholarship provider network</li>
                    </ul>
                  </div>

                  <Button 
                    onClick={() => createScholarship({
                      title: 'Community Environmental Scholarship',
                      category: 'environmental',
                      description: 'Supporting environmental studies students',
                      amount: 2000,
                      duration: 12
                    })}
                    className="bg-green-600 hover:bg-green-700"
                    disabled={userGaiaBalance < 500}
                    size="lg"
                  >
                    <Award className="h-5 w-5 mr-2" />
                    Create Scholarship (500 GAIA)
                  </Button>
                  
                  {userGaiaBalance < 500 && (
                    <p className="text-sm text-red-400">
                      Insufficient GAIA balance. You need 500 GAIA tokens.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}