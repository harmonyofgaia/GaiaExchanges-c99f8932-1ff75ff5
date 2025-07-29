
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Camera, Upload, Check, X, Clock, Shield } from 'lucide-react'
import { toast } from 'sonner'

interface PhotoSubmission {
  id: string
  activityType: string
  imageUrl: string
  description: string
  submittedAt: Date
  status: 'pending' | 'approved' | 'rejected'
  tokensEarned: number
  feedback?: string
}

export function PhotoVerificationSystem() {
  const [submissions, setSubmissions] = useState<PhotoSubmission[]>([
    {
      id: '1',
      activityType: 'Tree Planting',
      imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300',
      description: 'Planted 5 oak trees in Central Park community area',
      submittedAt: new Date('2024-01-20'),
      status: 'approved',
      tokensEarned: 50,
      feedback: 'Great work! Clear evidence of tree planting activity.'
    },
    {
      id: '2',
      activityType: 'Beach Cleanup',
      imageUrl: 'https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?w=300',
      description: 'Collected 3 bags of plastic waste from local beach',
      submittedAt: new Date('2024-01-22'),
      status: 'pending',
      tokensEarned: 0
    },
    {
      id: '3',
      activityType: 'Home Garden',
      imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300',
      description: 'Harvested organic tomatoes and herbs from backyard garden',
      submittedAt: new Date('2024-01-25'),
      status: 'approved',
      tokensEarned: 30,
      feedback: 'Excellent home growing setup! Bonus points for organic practices.'
    }
  ])

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [activityDescription, setActivityDescription] = useState('')
  const [selectedActivity, setSelectedActivity] = useState('')

  const activityTypes = [
    'Tree Planting',
    'Beach Cleanup', 
    'Home Garden',
    'Solar Installation',
    'Water Conservation',
    'Waste Reduction',
    'Bike Commuting',
    'Composting',
    'Wildlife Habitat'
  ]

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      toast.success('Photo selected!', {
        description: 'Ready to submit for verification',
        duration: 2000
      })
    }
  }

  const submitPhotoVerification = () => {
    if (!selectedFile || !selectedActivity || !activityDescription) {
      toast.error('Please complete all fields and select a photo')
      return
    }

    const newSubmission: PhotoSubmission = {
      id: Date.now().toString(),
      activityType: selectedActivity,
      imageUrl: URL.createObjectURL(selectedFile),
      description: activityDescription,
      submittedAt: new Date(),
      status: 'pending',
      tokensEarned: 0
    }

    setSubmissions(prev => [newSubmission, ...prev])
    setSelectedFile(null)
    setActivityDescription('')
    setSelectedActivity('')

    toast.success('Photo Verification Submitted!', {
      description: 'Your submission is under review. You\'ll be notified when verified!',
      duration: 4000
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <Check className="h-4 w-4 text-green-400" />
      case 'rejected': return <X className="h-4 w-4 text-red-400" />
      case 'pending': return <Clock className="h-4 w-4 text-yellow-400" />
      default: return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'border-green-500/50 bg-green-900/20'
      case 'rejected': return 'border-red-500/50 bg-red-900/20'
      case 'pending': return 'border-yellow-500/50 bg-yellow-900/20'
      default: return 'border-gray-500/50 bg-gray-900/20'
    }
  }

  const approvedSubmissions = submissions.filter(s => s.status === 'approved').length
  const totalTokensEarned = submissions
    .filter(s => s.status === 'approved')
    .reduce((sum, s) => sum + s.tokensEarned, 0)

  return (
    <div className="space-y-6">
      <Card className="border-orange-500/30 bg-gradient-to-br from-orange-900/20 to-red-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-400">
            <Camera className="h-6 w-6" />
            📸 Photo Verification System
            <Badge className="bg-orange-600">Phase 1</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Submission Form */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-orange-400">Submit New Activity</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-2">Activity Type</label>
                  <select 
                    value={selectedActivity}
                    onChange={(e) => setSelectedActivity(e.target.value)}
                    className="w-full p-2 bg-muted border border-border rounded-lg"
                  >
                    <option value="">Select activity type...</option>
                    {activityTypes.map((activity) => (
                      <option key={activity} value={activity}>{activity}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={activityDescription}
                    onChange={(e) => setActivityDescription(e.target.value)}
                    placeholder="Describe your environmental activity..."
                    className="w-full p-2 bg-muted border border-border rounded-lg h-20 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Upload Photo</label>
                  <div className="border-2 border-dashed border-orange-500/50 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label htmlFor="photo-upload" className="cursor-pointer">
                      <Upload className="h-12 w-12 text-orange-400 mx-auto mb-2" />
                      <p className="text-orange-400 font-medium">
                        {selectedFile ? selectedFile.name : 'Click to upload photo'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        JPG, PNG up to 10MB
                      </p>
                    </label>
                  </div>
                </div>

                <Button 
                  onClick={submitPhotoVerification}
                  className="w-full bg-orange-600 hover:bg-orange-700"
                  disabled={!selectedFile || !selectedActivity || !activityDescription}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Submit for Verification
                </Button>
              </div>

              {/* Stats */}
              <div className="p-4 bg-orange-900/20 rounded-lg border border-orange-500/30">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-orange-400">{approvedSubmissions}</div>
                    <div className="text-xs text-muted-foreground">Verified Activities</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400">{totalTokensEarned}</div>
                    <div className="text-xs text-muted-foreground">GAiA Earned</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submission History */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-orange-400">Verification History</h3>
              
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {submissions.map((submission) => (
                  <div
                    key={submission.id}
                    className={`p-4 rounded-lg border ${getStatusColor(submission.status)}`}
                  >
                    <div className="flex gap-3">
                      <img
                        src={submission.imageUrl}
                        alt={submission.activityType}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {getStatusIcon(submission.status)}
                          <h4 className="font-semibold text-sm">{submission.activityType}</h4>
                          <Badge className={`text-xs ${
                            submission.status === 'approved' ? 'bg-green-600' :
                            submission.status === 'rejected' ? 'bg-red-600' :
                            'bg-yellow-600'
                          }`}>
                            {submission.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          {submission.description}
                        </p>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-muted-foreground">
                            {submission.submittedAt.toLocaleDateString()}
                          </span>
                          {submission.status === 'approved' && (
                            <span className="text-green-400 font-bold">
                              +{submission.tokensEarned} GAiA
                            </span>
                          )}
                        </div>
                        {submission.feedback && (
                          <p className="text-xs text-green-300 mt-1 italic">
                            "{submission.feedback}"
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
