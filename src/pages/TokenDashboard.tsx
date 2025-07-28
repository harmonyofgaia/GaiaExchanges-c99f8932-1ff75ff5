
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Coins, TrendingUp, Users, Leaf, Award, Gift } from 'lucide-react'

export default function TokenDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            GAiA Token Dashboard
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Track your GAiA tokens, badges, and earning progress in our sustainable ecosystem
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total GAiA Tokens</CardTitle>
              <Coins className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">1,247</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Earned This Month</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">156</div>
              <p className="text-xs text-muted-foreground">
                From 8 activities
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
              <Award className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">23</div>
              <p className="text-xs text-muted-foreground">
                Next badge at 25
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Community Rank</CardTitle>
              <Users className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">#47</div>
              <p className="text-xs text-muted-foreground">
                Top 5% globally
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="tokens" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="tokens">Tokens</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
          </TabsList>

          <TabsContent value="tokens" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Coins className="h-5 w-5 text-green-500" />
                    Token Balance
                  </CardTitle>
                  <CardDescription>Your current GAiA token holdings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-3xl font-bold text-green-600">1,247 GAiA</div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Earned tokens</span>
                      <span>947</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Bonus tokens</span>
                      <span>300</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-500" />
                    Earning Rate
                  </CardTitle>
                  <CardDescription>Your monthly earning progress</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-2xl font-bold text-blue-600">156 / 200</div>
                  <Progress value={78} className="w-full" />
                  <p className="text-sm text-muted-foreground">
                    78% of monthly goal achieved
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="badges" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "Eco Warrior", description: "Complete 10 green activities", earned: true, icon: Leaf },
                { name: "Community Leader", description: "Organize 5 events", earned: true, icon: Users },
                { name: "Token Master", description: "Earn 1000 GAiA tokens", earned: true, icon: Coins },
                { name: "Green Investor", description: "Invest in 3 projects", earned: false, icon: TrendingUp },
                { name: "Party Planner", description: "Host 10 community events", earned: false, icon: Gift },
                { name: "Sustainability Champion", description: "Complete all eco challenges", earned: false, icon: Award },
              ].map((badge, index) => (
                <Card key={index} className={badge.earned ? "border-green-200 bg-green-50" : "border-gray-200"}>
                  <CardContent className="p-4 text-center space-y-3">
                    <badge.icon className={`h-8 w-8 mx-auto ${badge.earned ? "text-green-600" : "text-gray-400"}`} />
                    <div>
                      <h3 className={`font-semibold ${badge.earned ? "text-green-800" : "text-gray-600"}`}>
                        {badge.name}
                      </h3>
                      <p className={`text-sm ${badge.earned ? "text-green-600" : "text-gray-500"}`}>
                        {badge.description}
                      </p>
                    </div>
                    <Badge variant={badge.earned ? "default" : "secondary"}>
                      {badge.earned ? "Earned" : "Locked"}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activities" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Your latest token-earning activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { activity: "Home Grown Food", tokens: 25, date: "Today", type: "growing" },
                    { activity: "GAiA Eco Bike Ride", tokens: 15, date: "Yesterday", type: "transport" },
                    { activity: "Community Party Event", tokens: 50, date: "2 days ago", type: "social" },
                    { activity: "Green Investment", tokens: 30, date: "3 days ago", type: "finance" },
                    { activity: "Sustainability Workshop", tokens: 20, date: "1 week ago", type: "education" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <p className="font-medium">{item.activity}</p>
                        <p className="text-sm text-muted-foreground">{item.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">+{item.tokens} GAiA</p>
                        <Badge variant="outline">{item.type}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="h-5 w-5 text-purple-500" />
                    Available Rewards
                  </CardTitle>
                  <CardDescription>Redeem your GAiA tokens for rewards</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "10% Green Store Discount", cost: 100, available: true },
                    { name: "Eco-Friendly Product Bundle", cost: 250, available: true },
                    { name: "Community Event Ticket", cost: 50, available: true },
                    { name: "Sustainability Course Access", cost: 500, available: false },
                  ].map((reward, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <p className="font-medium">{reward.name}</p>
                        <p className="text-sm text-muted-foreground">{reward.cost} GAiA tokens</p>
                      </div>
                      <Button 
                        size="sm" 
                        disabled={!reward.available}
                        variant={reward.available ? "default" : "secondary"}
                      >
                        {reward.available ? "Redeem" : "Locked"}
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Discount Codes</CardTitle>
                  <CardDescription>Your earned discount codes and promotions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                      <p className="font-mono font-bold text-green-800">GAIA25OFF</p>
                      <p className="text-sm text-green-600">25% off next purchase - Expires in 5 days</p>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                      <p className="font-mono font-bold text-blue-800">ECOBIKE15</p>
                      <p className="text-sm text-blue-600">15% off bike accessories - Valid for 10 days</p>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-50 border border-purple-200">
                      <p className="font-mono font-bold text-purple-800">PARTY50</p>
                      <p className="text-sm text-purple-600">50% off event hosting - Valid for 2 weeks</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
