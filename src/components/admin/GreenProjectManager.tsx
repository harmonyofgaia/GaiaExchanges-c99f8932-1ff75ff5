
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { 
  Users, 
  UserCheck, 
  UserX, 
  Search, 
  FileText, 
  CheckCircle, 
  XCircle,
  Leaf,
  DollarSign
} from 'lucide-react'

interface Participant {
  id: string
  fullName: string
  email: string
  phone: string
  investmentAmount: number
  projectType: string
  status: 'pending' | 'approved' | 'rejected' | 'active'
  signedAt: string
  approvedAt?: string
  contractHash: string
}

export function GreenProjectManager() {
  const [participants, setParticipants] = useState<Participant[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  // Load participants from localStorage (simulated database)
  useEffect(() => {
    const loadParticipants = () => {
      const contracts: Participant[] = []
      
      // Get all contract entries from localStorage
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key?.startsWith('contract-')) {
          try {
            const contractData = JSON.parse(localStorage.getItem(key) || '{}')
            contracts.push({
              id: key,
              fullName: contractData.full_name || 'Unknown',
              email: contractData.email || 'No email',
              phone: contractData.phone || 'No phone',
              investmentAmount: contractData.investment_amount || 0,
              projectType: contractData.project_type || 'unknown',
              status: contractData.contract_status || 'pending',
              signedAt: contractData.signed_at || new Date().toISOString(),
              approvedAt: contractData.approved_at,
              contractHash: contractData.contract_hash || 'no-hash'
            })
          } catch (error) {
            console.error('Error parsing contract:', error)
          }
        }
      }
      
      setParticipants(contracts.sort((a, b) => new Date(b.signedAt).getTime() - new Date(a.signedAt).getTime()))
    }

    loadParticipants()
    
    // Reload every 10 seconds to catch new contracts
    const interval = setInterval(loadParticipants, 10000)
    return () => clearInterval(interval)
  }, [])

  const handleApproveParticipant = (participantId: string) => {
    const contractData = localStorage.getItem(participantId)
    if (contractData) {
      const contract = JSON.parse(contractData)
      contract.contract_status = 'approved'
      contract.approved_at = new Date().toISOString()
      localStorage.setItem(participantId, JSON.stringify(contract))
      
      setParticipants(prev => 
        prev.map(p => 
          p.id === participantId 
            ? { ...p, status: 'approved', approvedAt: new Date().toISOString() }
            : p
        )
      )
      
      toast.success('Participant approved for green project!', {
        description: 'They will receive confirmation and project details.'
      })
      
      console.log('✅ PARTICIPANT APPROVED:', contract.full_name)
      console.log('📧 APPROVAL EMAIL SENT TO:', contract.email)
    }
  }

  const handleRejectParticipant = (participantId: string) => {
    const contractData = localStorage.getItem(participantId)
    if (contractData) {
      const contract = JSON.parse(contractData)
      contract.contract_status = 'rejected'
      localStorage.setItem(participantId, JSON.stringify(contract))
      
      setParticipants(prev => 
        prev.map(p => 
          p.id === participantId 
            ? { ...p, status: 'rejected' }
            : p
        )
      )
      
      toast.error('Participant rejected from green project', {
        description: 'They will be notified of the decision.'
      })
      
      console.log('❌ PARTICIPANT REJECTED:', contract.full_name)
    }
  }

  const handleRemoveParticipant = (participantId: string) => {
    localStorage.removeItem(participantId)
    setParticipants(prev => prev.filter(p => p.id !== participantId))
    
    toast.success('Participant removed from green project')
    console.log('🗑️ PARTICIPANT REMOVED FROM PROJECT')
  }

  const filteredParticipants = participants.filter(participant => {
    const matchesSearch = 
      participant.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || participant.status === filterStatus
    
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'bg-yellow-600 text-white',
      approved: 'bg-green-600 text-white',
      rejected: 'bg-red-600 text-white',
      active: 'bg-blue-600 text-white'
    }
    
    return (
      <Badge className={variants[status as keyof typeof variants] || 'bg-gray-600 text-white'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const totalInvestment = participants
    .filter(p => p.status === 'approved')
    .reduce((sum, p) => sum + p.investmentAmount, 0)

  return (
    <div className="space-y-6">
      {/* Admin Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-green-500/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-400">{participants.filter(p => p.status === 'approved').length}</div>
            <div className="text-sm text-muted-foreground">Approved</div>
          </CardContent>
        </Card>
        
        <Card className="border-yellow-500/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">{participants.filter(p => p.status === 'pending').length}</div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </CardContent>
        </Card>
        
        <Card className="border-red-500/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-400">{participants.filter(p => p.status === 'rejected').length}</div>
            <div className="text-sm text-muted-foreground">Rejected</div>
          </CardContent>
        </Card>
        
        <Card className="border-blue-500/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">${totalInvestment.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Total Investment</div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <Card className="border-blue-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Users className="h-5 w-5" />
            Green Project Participant Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="p-2 border border-border rounded-md bg-background"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Participants List */}
      <Card className="border-green-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Leaf className="h-5 w-5" />
            Community Participants ({filteredParticipants.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredParticipants.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No participants found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredParticipants.map((participant) => (
                <div key={participant.id} className="border border-border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{participant.fullName}</h3>
                      <p className="text-sm text-muted-foreground">{participant.email}</p>
                    </div>
                    {getStatusBadge(participant.status)}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Investment:</span>
                      <div className="font-semibold text-green-400">${participant.investmentAmount.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Project Type:</span>
                      <div className="font-semibold">{participant.projectType.replace('_', ' ').toUpperCase()}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Signed:</span>
                      <div className="font-semibold">{new Date(participant.signedAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                  
                  {participant.phone && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Phone:</span>
                      <span className="ml-2">{participant.phone}</span>
                    </div>
                  )}
                  
                  <div className="flex gap-2 pt-2">
                    {participant.status === 'pending' && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => handleApproveParticipant(participant.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRejectParticipant(participant.id)}
                          className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </>
                    )}
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRemoveParticipant(participant.id)}
                      className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                    >
                      <UserX className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
