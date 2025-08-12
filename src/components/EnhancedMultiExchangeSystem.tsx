import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowUpRight, Clock, CheckCircle, AlertCircle, Zap, Shield } from 'lucide-react'
import { toast } from 'sonner'
import { ExchangeListing, AutoApplyStatus } from '@/types/ui-types'

export function EnhancedMultiExchangeSystem() {
  const [exchanges, setExchanges] = useState<ExchangeListing[]>([
    {
      id: 'PUMPFUN',
      name: 'PumpFun',
      tier: 'Tier 1',
      status: 'listed',
      autoApplyStatus: 'completed',
      lastUpdate: new Date(),
      progress: 100,
      estimatedTime: 'N/A',
      priority: 'critical',
      description: 'Fastest listing available'
    },
    {
      id: 'UNISWAP',
      name: 'Uniswap',
      tier: 'Tier 2',
      status: 'pending',
      autoApplyStatus: 'queued',
      lastUpdate: new Date(),
      progress: 5,
      estimatedTime: '3-5 days',
      priority: 'high',
      description: 'Decentralized exchange with high volume'
    },
    {
      id: 'COINBASE',
      name: 'Coinbase',
      tier: 'Tier 3',
      status: 'documenting',
      autoApplyStatus: 'pending',
      lastUpdate: new Date(),
      progress: 20,
      estimatedTime: '1-2 weeks',
      priority: 'medium',
      description: 'Centralized exchange with high security'
    },
    {
      id: 'REVOLUT',
      name: 'Revolut',
      tier: 'DeFi',
      status: 'contacting',
      autoApplyStatus: 'pending',
      lastUpdate: new Date(),
      progress: 10,
      estimatedTime: '5-7 days',
      priority: 'low',
      description: 'Global fintech platform'
    },
    {
      id: 'ZENGO',
      name: 'ZENGO',
      tier: 'DEX',
      status: 'reviewing',
      autoApplyStatus: 'pending',
      lastUpdate: new Date(),
      progress: 50,
      estimatedTime: '2-3 days',
      priority: 'high',
      description: 'Mobile-first crypto wallet'
    }
  ])

  const [autoApplyEnabled, setAutoApplyEnabled] = useState(true)

  const applyToExchange = (exchangeId: string) => {
    setExchanges(prev => prev.map(exchange => {
      if (exchange.id === exchangeId) {
        const updatedStatus: AutoApplyStatus = 'in-progress'
        return {
          ...exchange,
          status: 'pending' as const,
          lastUpdate: new Date(),
          autoApplyStatus: updatedStatus,
          progress: 10
        }
      }
      return exchange
    }))

    toast.success(`🚀 Application submitted to ${exchanges.find(e => e.id === exchangeId)?.name}`)
  }

  const simulateProgress = () => {
    setExchanges(prev => prev.map(exchange => {
      if (exchange.autoApplyStatus === 'in-progress') {
        const newProgress = Math.min(exchange.progress + Math.random() * 20, 100)
        const newStatus: AutoApplyStatus = newProgress >= 100 ? 'completed' : 'in-progress'
        
        return {
          ...exchange,
          autoApplyStatus: newStatus,
          lastUpdate: new Date(),
          progress: newProgress
        }
      }
      return exchange
    }))
  }

  useEffect(() => {
    if (autoApplyEnabled) {
      const interval = setInterval(simulateProgress, 5000)
      return () => clearInterval(interval)
    }
  }, [autoApplyEnabled])

  const toggleAutoApply = () => {
    setAutoApplyEnabled(!autoApplyEnabled)
    toast.info(`🤖 Auto-apply ${autoApplyEnabled ? 'disabled' : 'enabled'}`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'listed': return 'text-green-400'
      case 'pending': return 'text-blue-400'
      case 'documenting': return 'text-yellow-400'
      case 'contacting': return 'text-purple-400'
      case 'reviewing': return 'text-orange-400'
      default: return 'text-gray-400'
    }
  }

  const getAutoApplyStatusColor = (status: AutoApplyStatus) => {
    switch (status) {
      case 'completed': return 'text-green-400'
      case 'in-progress': return 'text-blue-400'
      case 'pending': return 'text-yellow-400'
      case 'failed': return 'text-red-400'
      case 'queued': return 'text-purple-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-400">
          <ArrowUpRight className="h-6 w-6" />
          📈 Enhanced Multi-Exchange System
        </CardTitle>
        <p className="text-muted-foreground">
          Automated listing and tracking across multiple exchanges
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Auto Apply Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className={`h-5 w-5 ${autoApplyEnabled ? 'text-green-400' : 'text-gray-400'}`} />
            <div>
              <h3 className="font-semibold text-blue-400">🤖 Auto-Apply</h3>
              <p className="text-sm text-gray-400">
                {autoApplyEnabled ? 'Automated application active' : 'Click to enable auto-apply'}
              </p>
            </div>
          </div>
          <Button size="sm" onClick={toggleAutoApply} className={autoApplyEnabled ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}>
            {autoApplyEnabled ? 'Disable Auto-Apply' : 'Enable Auto-Apply'}
          </Button>
        </div>

        {/* Exchange Listings */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">📊 Overview</TabsTrigger>
            <TabsTrigger value="tier1">🥇 Tier 1</TabsTrigger>
            <TabsTrigger value="tier2">🥈 Tier 2</TabsTrigger>
            <TabsTrigger value="tier3">🥉 Tier 3</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            {exchanges.map((exchange) => (
              <Card key={exchange.id} className="border-blue-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="space-y-1">
                      <h4 className="font-semibold text-blue-400">{exchange.name}</h4>
                      <p className="text-sm text-muted-foreground">{exchange.description}</p>
                    </div>
                    <Badge variant="secondary">{exchange.tier}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>Last Update: {exchange.lastUpdate.toLocaleTimeString()}</span>
                    </div>
                    <span className={`${getStatusColor(exchange.status)} font-bold`}>
                      {exchange.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-400">Progress</span>
                      <span className={`${getAutoApplyStatusColor(exchange.autoApplyStatus)} font-bold`}>
                        {exchange.autoApplyStatus.toUpperCase()}
                      </span>
                    </div>
                    <Progress value={exchange.progress} />
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => applyToExchange(exchange.id)}
                      disabled={exchange.status === 'listed' || exchange.autoApplyStatus === 'in-progress'}
                      className="border-blue-500/30 text-blue-400"
                    >
                      {exchange.status === 'listed' ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                          Listed
                        </>
                      ) : exchange.autoApplyStatus === 'in-progress' ? (
                        <>
                          <Zap className="h-4 w-4 mr-2 animate-pulse text-blue-400" />
                          Applying...
                        </>
                      ) : (
                        <>
                          <ArrowUpRight className="h-4 w-4 mr-2" />
                          Apply Now
                        </>
                      )}
                    </Button>
                    <span className="text-xs text-gray-400">Est. Time: {exchange.estimatedTime}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="tier1" className="space-y-4">
            {exchanges
              .filter((exchange) => exchange.tier === 'Tier 1')
              .map((exchange) => (
                <Card key={exchange.id} className="border-blue-500/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="space-y-1">
                        <h4 className="font-semibold text-blue-400">{exchange.name}</h4>
                        <p className="text-sm text-muted-foreground">{exchange.description}</p>
                      </div>
                      <Badge variant="secondary">{exchange.tier}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>Last Update: {exchange.lastUpdate.toLocaleTimeString()}</span>
                      </div>
                      <span className={`${getStatusColor(exchange.status)} font-bold`}>
                        {exchange.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-400">Progress</span>
                        <span className={`${getAutoApplyStatusColor(exchange.autoApplyStatus)} font-bold`}>
                          {exchange.autoApplyStatus.toUpperCase()}
                        </span>
                      </div>
                      <Progress value={exchange.progress} />
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => applyToExchange(exchange.id)}
                        disabled={exchange.status === 'listed' || exchange.autoApplyStatus === 'in-progress'}
                        className="border-blue-500/30 text-blue-400"
                      >
                        {exchange.status === 'listed' ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                            Listed
                          </>
                        ) : exchange.autoApplyStatus === 'in-progress' ? (
                          <>
                            <Zap className="h-4 w-4 mr-2 animate-pulse text-blue-400" />
                            Applying...
                          </>
                        ) : (
                          <>
                            <ArrowUpRight className="h-4 w-4 mr-2" />
                            Apply Now
                          </>
                        )}
                      </Button>
                      <span className="text-xs text-gray-400">Est. Time: {exchange.estimatedTime}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="tier2" className="space-y-4">
            {exchanges
              .filter((exchange) => exchange.tier === 'Tier 2')
              .map((exchange) => (
                <Card key={exchange.id} className="border-blue-500/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="space-y-1">
                        <h4 className="font-semibold text-blue-400">{exchange.name}</h4>
                        <p className="text-sm text-muted-foreground">{exchange.description}</p>
                      </div>
                      <Badge variant="secondary">{exchange.tier}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>Last Update: {exchange.lastUpdate.toLocaleTimeString()}</span>
                      </div>
                      <span className={`${getStatusColor(exchange.status)} font-bold`}>
                        {exchange.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-400">Progress</span>
                        <span className={`${getAutoApplyStatusColor(exchange.autoApplyStatus)} font-bold`}>
                          {exchange.autoApplyStatus.toUpperCase()}
                        </span>
                      </div>
                      <Progress value={exchange.progress} />
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => applyToExchange(exchange.id)}
                        disabled={exchange.status === 'listed' || exchange.autoApplyStatus === 'in-progress'}
                        className="border-blue-500/30 text-blue-400"
                      >
                        {exchange.status === 'listed' ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                            Listed
                          </>
                        ) : exchange.autoApplyStatus === 'in-progress' ? (
                          <>
                            <Zap className="h-4 w-4 mr-2 animate-pulse text-blue-400" />
                            Applying...
                          </>
                        ) : (
                          <>
                            <ArrowUpRight className="h-4 w-4 mr-2" />
                            Apply Now
                          </>
                        )}
                      </Button>
                      <span className="text-xs text-gray-400">Est. Time: {exchange.estimatedTime}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="tier3" className="space-y-4">
            {exchanges
              .filter((exchange) => exchange.tier === 'Tier 3')
              .map((exchange) => (
                <Card key={exchange.id} className="border-blue-500/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="space-y-1">
                        <h4 className="font-semibold text-blue-400">{exchange.name}</h4>
                        <p className="text-sm text-muted-foreground">{exchange.description}</p>
                      </div>
                      <Badge variant="secondary">{exchange.tier}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>Last Update: {exchange.lastUpdate.toLocaleTimeString()}</span>
                      </div>
                      <span className={`${getStatusColor(exchange.status)} font-bold`}>
                        {exchange.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-400">Progress</span>
                        <span className={`${getAutoApplyStatusColor(exchange.autoApplyStatus)} font-bold`}>
                          {exchange.autoApplyStatus.toUpperCase()}
                        </span>
                      </div>
                      <Progress value={exchange.progress} />
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => applyToExchange(exchange.id)}
                        disabled={exchange.status === 'listed' || exchange.autoApplyStatus === 'in-progress'}
                        className="border-blue-500/30 text-blue-400"
                      >
                        {exchange.status === 'listed' ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                            Listed
                          </>
                        ) : exchange.autoApplyStatus === 'in-progress' ? (
                          <>
                            <Zap className="h-4 w-4 mr-2 animate-pulse text-blue-400" />
                            Applying...
                          </>
                        ) : (
                          <>
                            <ArrowUpRight className="h-4 w-4 mr-2" />
                            Apply Now
                          </>
                        )}
                      </Button>
                      <span className="text-xs text-gray-400">Est. Time: {exchange.estimatedTime}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
