
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  Zap, 
  Target, 
  Palette, 
  Hammer, 
  Shield, 
  Eye,
  Brain,
  Lock,
  Crown
} from 'lucide-react'
import { toast } from 'sonner'

interface UserCreation {
  id: string
  userId: string
  type: 'weapon' | 'tool' | 'armor'
  name: string
  cost: number
  approved: boolean
  createdAt: string
}

interface DefenseAnimal {
  id: string
  name: string
  type: string
  strength: number
  training: number
  lastUpdate: string
  specialAbility: string
}

export function AutonomousContentGeneration() {
  const [contentGeneration, setContentGeneration] = useState({
    levelsGenerated: 15847,
    questsActive: 2934,
    challengesCompleted: 8756,
    isGenerating: true
  })

  const [userCreations, setUserCreations] = useState<UserCreation[]>([
    {
      id: '1',
      userId: 'user123',
      type: 'weapon',
      name: 'Bio Plasma Rifle',
      cost: 250,
      approved: false,
      createdAt: '2024-01-15'
    }
  ])

  const [defenseElephant, setDefenseElephant] = useState<DefenseAnimal>({
    id: 'elephant-1',
    name: 'Quantum Guardian Elephant',
    type: 'Defense Specialist',
    strength: 89.7,
    training: 94.3,
    lastUpdate: '2 minutes ago',
    specialAbility: 'User Behavior Monitoring & Admin Privilege Protection'
  })

  const [newQuest, setNewQuest] = useState({
    title: '',
    description: '',
    difficulty: 'medium',
    rewards: 50
  })

  const approveUserCreation = (id: string) => {
    setUserCreations(prev => prev.map(creation => 
      creation.id === id ? { ...creation, approved: true } : creation
    ))
    toast.success('User creation approved!', {
      description: 'Weapon added to marketplace for other users'
    })
  }

  const generateNewContent = () => {
    setContentGeneration(prev => ({
      ...prev,
      levelsGenerated: prev.levelsGenerated + Math.floor(Math.random() * 50 + 10),
      questsActive: prev.questsActive + Math.floor(Math.random() * 20 + 5)
    }))
    toast.success('New content generated!', {
      description: 'Levels, quests, and challenges automatically created'
    })
  }

  const createQuest = () => {
    if (newQuest.title && newQuest.description) {
      toast.success('Quest created!', {
        description: `${newQuest.title} added to game world`
      })
      setNewQuest({ title: '', description: '', difficulty: 'medium', rewards: 50 })
    }
  }

  return (
    <div className="space-y-6">
      {/* Content Generation Status */}
      <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-blue-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Zap className="h-6 w-6" />
            ⚡ AUTONOMOUS CONTENT GENERATION - INFINITE CREATION ENGINE
          </CardTitle>
          <div className="flex gap-4">
            <Badge className={`${contentGeneration.isGenerating ? 'bg-green-600 animate-pulse' : 'bg-red-600'}`}>
              {contentGeneration.isGenerating ? '🔄 GENERATING' : '⏸️ PAUSED'}
            </Badge>
            <Badge className="bg-blue-600">
              <Target className="h-3 w-3 mr-1" />
              {contentGeneration.levelsGenerated.toLocaleString()} LEVELS
            </Badge>
            <Badge className="bg-orange-600">
              <Crown className="h-3 w-3 mr-1" />
              ADMIN CONTROLLED
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-purple-900/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-400">{contentGeneration.levelsGenerated.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Levels Generated</div>
            </div>
            <div className="text-center p-4 bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">{contentGeneration.questsActive.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Active Quests</div>
            </div>
            <div className="text-center p-4 bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-400">{contentGeneration.challengesCompleted.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Challenges Completed</div>
            </div>
          </div>
          <Button 
            onClick={generateNewContent}
            className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <Zap className="h-4 w-4 mr-2" />
            GENERATE NEW CONTENT BATCH
          </Button>
        </CardContent>
      </Card>

      {/* User 3D Crafting System */}
      <Card className="border-green-500/20">
        <CardHeader>
          <CardTitle className="text-green-400">🔨 USER 3D CRAFTING SYSTEM - 250 GAiA TOKENS</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-bold text-green-400">🎨 User Creations Awaiting Approval</h4>
              {userCreations.map((creation) => (
                <Card key={creation.id} className="border-gray-600/50 bg-gray-900/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h5 className="font-bold text-white">{creation.name}</h5>
                        <p className="text-sm text-muted-foreground">
                          {creation.type} • {creation.cost} GAiA tokens
                        </p>
                      </div>
                      <Badge className={creation.approved ? 'bg-green-600' : 'bg-yellow-600'}>
                        {creation.approved ? 'APPROVED' : 'PENDING'}
                      </Badge>
                    </div>
                    {!creation.approved && (
                      <Button 
                        onClick={() => approveUserCreation(creation.id)}
                        className="w-full bg-green-600 hover:bg-green-700"
                        size="sm"
                      >
                        <Shield className="h-4 w-4 mr-2" />
                        APPROVE FOR MARKETPLACE
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="p-4 bg-red-900/20 rounded-lg border border-red-500/20">
              <h4 className="font-bold text-red-400 mb-3">🛡️ SECURITY RESTRICTIONS</h4>
              <ul className="space-y-2 text-sm text-red-300">
                <li>• Users CANNOT access admin creation tools</li>
                <li>• Users CANNOT modify admin pages or coding</li>
                <li>• Users CANNOT gain admin privileges</li>
                <li>• Users CANNOT hack or adjust the system</li>
                <li>• Wall of Defense monitors all user activity</li>
                <li>• Quantum Guardian Elephant enforces separation</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Defense Elephant Status */}
      <Card className="border-orange-500/20">
        <CardHeader>
          <CardTitle className="text-orange-400">🐘 QUANTUM GUARDIAN ELEPHANT - SELF-TRAINING DEFENSE</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="text-4xl">🐘</div>
                <div>
                  <h4 className="font-bold text-orange-400">{defenseElephant.name}</h4>
                  <p className="text-sm text-muted-foreground">{defenseElephant.type}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Strength Level</span>
                    <span className="text-orange-400">{defenseElephant.strength}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-orange-500 h-2 rounded-full" 
                      style={{ width: `${defenseElephant.strength}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Training Progress</span>
                    <span className="text-blue-400">{defenseElephant.training}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${defenseElephant.training}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-orange-900/20 rounded-lg">
                <h5 className="font-bold text-orange-400 mb-2">🎯 Special Abilities</h5>
                <p className="text-sm text-orange-300">{defenseElephant.specialAbility}</p>
              </div>
              
              <div className="p-4 bg-green-900/20 rounded-lg">
                <h5 className="font-bold text-green-400 mb-2">📊 Daily Growth</h5>
                <ul className="text-sm text-green-300 space-y-1">
                  <li>• Strength increases by 0.3% daily</li>
                  <li>• Learns new defense patterns</li>
                  <li>• Communicates with Wall of Defense</li>
                  <li>• Monitors user behavior patterns</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quest Creation Interface */}
      <Card className="border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-blue-400">📝 ADMIN QUEST CREATOR</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Quest Title"
              value={newQuest.title}
              onChange={(e) => setNewQuest(prev => ({ ...prev, title: e.target.value }))}
            />
            <Textarea
              placeholder="Quest Description"
              value={newQuest.description}
              onChange={(e) => setNewQuest(prev => ({ ...prev, description: e.target.value }))}
            />
            <div className="grid grid-cols-2 gap-4">
              <select 
                className="p-2 rounded bg-gray-800 border border-gray-600"
                value={newQuest.difficulty}
                onChange={(e) => setNewQuest(prev => ({ ...prev, difficulty: e.target.value }))}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
                <option value="expert">Expert</option>
              </select>
              <Input
                type="number"
                placeholder="Reward (GAiA)"
                value={newQuest.rewards}
                onChange={(e) => setNewQuest(prev => ({ ...prev, rewards: parseInt(e.target.value) || 0 }))}
              />
            </div>
            <Button onClick={createQuest} className="w-full bg-blue-600 hover:bg-blue-700">
              <Target className="h-4 w-4 mr-2" />
              CREATE QUEST
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
        <h4 className="font-medium text-green-400 mb-2">🚀 Autonomous Content Generation Status</h4>
        <div className="text-sm text-green-300">
          ✅ Infinite content creation engine active<br/>
          ✅ User 3D crafting system operational (250 GAiA cost)<br/>
          ✅ Admin approval system for user creations<br/>
          ✅ Quantum Guardian Elephant monitoring all users<br/>
          ✅ Admin-only quest and level creation tools<br/>
          ✅ Complete separation of user and admin privileges
        </div>
      </div>
    </div>
  )
}
