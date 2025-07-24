import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { CheckCircle2, XCircle } from 'lucide-react'
import { toast } from 'sonner'

export default function CleanWaterProject() {
  const [currentProgress, setCurrentProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [isFailed, setIsFailed] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const handleComplete = () => {
    setIsComplete(true)
    toast.success('💧 Clean Water Project Completed!', {
      description: 'Successfully restored clean water access to the community',
    })
  }

  const handleFail = () => {
    setIsFailed(true)
    toast.error('⚠️ Clean Water Project Failed', {
      description: 'Contamination levels remain high. Further analysis required.',
    })
  }

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentProgress(prev => Math.min(prev + 1, 100))
    }, 100)
    
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <Card className="bg-white shadow-xl rounded-lg overflow-hidden">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-blue-600">
              💧 Clean Water Restoration Project
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-4">
              <Progress value={currentProgress} />
              <p className="text-sm text-gray-500 mt-2 text-center">
                {currentProgress}% Complete
              </p>
            </div>

            {isComplete && (
              <div className="flex items-center justify-center text-green-600 mb-4">
                <CheckCircle2 className="h-6 w-6 mr-2" />
                Project Completed Successfully!
              </div>
            )}

            {isFailed && (
              <div className="flex items-center justify-center text-red-600 mb-4">
                <XCircle className="h-6 w-6 mr-2" />
                Project Failed. Analysis Required.
              </div>
            )}

            <div className="space-y-2">
              <Button onClick={handleComplete} disabled={isComplete || isFailed} className="w-full bg-green-500 hover:bg-green-700 text-white">
                Mark as Complete
              </Button>
              <Button onClick={handleFail} disabled={isComplete || isFailed} className="w-full bg-red-500 hover:bg-red-700 text-white">
                Mark as Failed
              </Button>
              <Button onClick={toggleDetails} className="w-full bg-blue-500 hover:bg-blue-700 text-white">
                {showDetails ? 'Hide Details' : 'Show Details'}
              </Button>
            </div>

            {showDetails && (
              <div className="mt-4 p-4 border rounded-md bg-gray-50">
                <h4 className="text-lg font-semibold text-gray-700 mb-2">Project Details</h4>
                <p className="text-sm text-gray-600">
                  This project aims to restore clean water access to a community affected by industrial pollution.
                  We are implementing advanced filtration systems and conducting regular water quality tests.
                </p>
                <ul className="list-disc pl-5 mt-2 text-sm text-gray-600">
                  <li>Initial Assessment: Complete</li>
                  <li>Filtration System Installation: {currentProgress > 30 ? 'Complete' : 'In Progress'}</li>
                  <li>Water Quality Testing: {currentProgress > 60 ? 'Ongoing' : 'Pending'}</li>
                  <li>Community Education: {currentProgress > 90 ? 'Complete' : 'Pending'}</li>
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
